import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadAllNotes, loadProjects, buildGraph, EDGE } from '../lib/graph.js';
import { buildDashboard, buildTimeline, search } from '../lib/dashboard.js';

let root, vaults, projDir, noteMap, projects, graph;

const note = (o) => {
  const fm = Object.entries(o.fm).map(([k, v]) =>
    `${k}: ${Array.isArray(v) ? `[${v.join(', ')}]` : v}`).join('\n');
  return `---\n${fm}\n---\n\n# ${o.title}\n\n> ${o.summary || 'tóm tắt'}\n\n${o.body || ''}\n`;
};

before(async () => {
  root = await mkdtemp(join(tmpdir(), 'sb-graph-'));
  const ml = join(root, 'ml'), dl = join(root, 'dl');
  projDir = join(root, 'projects');
  await mkdir(ml); await mkdir(dl); await mkdir(projDir);
  await mkdir(join(ml, '_inbox'));

  // ml: a → b → c (chuỗi thứ tự); c liên môn sang dl/x; d mồ côi; b trỏ link chết
  await writeFile(join(ml, 'a.md'), note({ title: 'A', fm: { slug: 'a', vault: 'ml', type: 'concept', branch: 'A', order: 1, status: 'done', created: '2026-06-01' } }));
  await writeFile(join(ml, 'b.md'), note({ title: 'B', fm: { slug: 'b', vault: 'ml', type: 'concept', branch: 'A', order: 2, status: 'done', prev: ['a'], created: '2026-06-02' }, body: 'xem [[khong-ton-tai]]' }));
  await writeFile(join(ml, 'c.md'), note({ title: 'C', fm: { slug: 'c', vault: 'ml', type: 'concept', branch: 'A', order: 3, status: 'todo', prev: ['b'], related: ['dl/x'], created: '2026-07-05' } }));
  await writeFile(join(ml, 'd.md'), note({ title: 'D mồ côi', fm: { slug: 'd', vault: 'ml', type: 'concept', branch: 'B', order: 1, status: 'todo', created: '2026-07-06' } }));
  // file phải bị BỎ QUA
  await writeFile(join(ml, '_TEMPLATE-x.md'), '# Template\n');
  await writeFile(join(ml, 'SECOND_BRAIN_ML.md'), '# Hub\n');
  await writeFile(join(ml, '_inbox', 'tho.md'), note({ title: 'Thô', fm: { slug: 'tho', vault: 'ml', type: 'inbox', status: 'todo' } }));

  await writeFile(join(dl, 'x.md'), note({ title: 'X', fm: { slug: 'x', vault: 'dl', type: 'concept', branch: 'A', order: 1, status: 'done', created: '2026-08-01' } }));

  await writeFile(join(projDir, 'p1.md'), note({ title: 'Project 1', fm: { slug: 'p1', type: 'project', status: 'done' }, body: 'dùng [[ml/a]] và [[dl/x]]' }));
  await writeFile(join(projDir, 'INDEX.md'), '# Index\n'); // phải bị bỏ qua

  vaults = {
    ml: { label: 'ML', dir: ml, color: '#111', branches: { A: 'Nhánh A', B: 'Nhánh B' } },
    dl: { label: 'DL', dir: dl, color: '#222', branches: { A: 'Nhánh A' } },
  };
  noteMap = await loadAllNotes(vaults);
  projects = await loadProjects(projDir);
  graph = buildGraph(noteMap, projects, vaults);
});
after(async () => { await rm(root, { recursive: true, force: true }); });

// ───────────────────────────── loadAllNotes ─────────────────────────────

test('bỏ template, hub chữ hoa và thư mục con _inbox', () => {
  const ids = [...noteMap.keys()].sort();
  assert.deepEqual(ids, ['dl/x', 'ml/a', 'ml/b', 'ml/c', 'ml/d']);
  assert.ok(!ids.some((i) => i.includes('tho')), '_inbox/ không được đọc');
});

test('id node là vault/slug, không phải slug trần', () => {
  assert.ok(noteMap.has('ml/a'));
  assert.ok(!noteMap.has('a'));
});

test('loadProjects bỏ INDEX.md', () => {
  assert.deepEqual(projects.map((p) => p.slug), ['p1']);
});

// ─────────────────────────────── buildGraph ───────────────────────────────

test('cạnh thứ tự đi từ tiền đề sang note (chiều học)', () => {
  const e = graph.edges.find((x) => x.source === 'ml/a' && x.target === 'ml/b');
  assert.ok(e, 'thiếu cạnh a → b');
  assert.equal(e.kind, EDGE.ORDER);
  assert.equal(e.cross, false);
});

test('cạnh liên môn được đánh dấu cross', () => {
  const e = graph.edges.find((x) => x.source === 'ml/c' && x.target === 'dl/x');
  assert.ok(e, 'thiếu cạnh liên môn ml/c → dl/x');
  assert.equal(e.kind, EDGE.XLINK);
  assert.equal(e.cross, true);
});

test('field related sinh cạnh (không chỉ link trong thân note)', () => {
  // ml/c khai báo related: [dl/x] trong frontmatter, thân note không có [[ ]]
  assert.ok(graph.edges.some((x) => x.source === 'ml/c' && x.target === 'dl/x'));
});

test('project thành node riêng và nối sang note nó dùng', () => {
  assert.ok(graph.nodes.some((n) => n.id === 'project/p1' && n.type === 'project'));
  const pe = graph.edges.filter((x) => x.source === 'project/p1');
  assert.deepEqual(pe.map((x) => x.target).sort(), ['dl/x', 'ml/a']);
  assert.equal(pe[0].kind, EDGE.PROJECT);
});

test('link tới slug không tồn tại KHÔNG tạo node ma', () => {
  assert.ok(!graph.nodes.some((n) => n.id.includes('khong-ton-tai')));
  assert.ok(!graph.edges.some((e) => e.target.includes('khong-ton-tai')));
});

test('không có cạnh trùng và không có cạnh tự trỏ', () => {
  const keys = graph.edges.map((e) => `${e.source}→${e.target}:${e.kind}`);
  assert.equal(new Set(keys).size, keys.length, 'có cạnh trùng');
  assert.ok(!graph.edges.some((e) => e.source === e.target), 'có cạnh tự trỏ');
});

test('stats đếm đúng, crossVault gồm cả cạnh project', () => {
  assert.equal(graph.stats.nodes, 6);        // 5 note + 1 project
  assert.equal(graph.stats.crossVault, graph.edges.filter((e) => e.cross).length);
});

// ─────────────────────────────── dashboard ───────────────────────────────

test('đếm trạng thái theo vault và tổng', () => {
  const d = buildDashboard(noteMap, graph, vaults);
  const ml = d.vaults.find((v) => v.id === 'ml');
  assert.equal(ml.total, 4);
  assert.equal(ml.counts.done, 2);
  assert.equal(ml.counts.todo, 2);
  assert.equal(d.totals.all, 5);
  assert.equal(d.totals.done, 3);
});

test('tiến độ từng nhánh', () => {
  const d = buildDashboard(noteMap, graph, vaults);
  const ml = d.vaults.find((v) => v.id === 'ml');
  const A = ml.branches.find((b) => b.branch === 'A');
  assert.equal(A.total, 3);
  assert.equal(A.done, 2);
  assert.equal(A.pct, 67);
});

test('note mồ côi = không ai trỏ tới', () => {
  const d = buildDashboard(noteMap, graph, vaults);
  const ids = d.orphans.map((o) => o.id);
  assert.ok(ids.includes('ml/d'), 'ml/d phải là mồ côi');
  assert.ok(!ids.includes('ml/b'), 'ml/b có a trỏ tới, không phải mồ côi');
});

test('link gãy được liệt kê kèm nguồn', () => {
  const d = buildDashboard(noteMap, graph, vaults);
  const b = d.broken.find((x) => x.target === 'khong-ton-tai');
  assert.ok(b, 'không bắt được link gãy');
  assert.equal(b.from, 'ml/b');
});

test('"đọc tiếp" chỉ gợi ý note đã đủ tiền đề', () => {
  const d = buildDashboard(noteMap, graph, vaults);
  const ids = d.nextUp.map((x) => x.id);
  assert.ok(ids.includes('ml/c'), 'ml/c có prev=b (done) → phải sẵn sàng');
  assert.ok(ids.includes('ml/d'), 'ml/d không có tiền đề → sẵn sàng');
});

test('timeline gom theo tháng', () => {
  const t = buildTimeline(noteMap);
  const months = t.map((x) => x.month);
  assert.deepEqual(months, ['2026-06', '2026-07', '2026-08']);
  assert.equal(t[0].total, 2);
  assert.ok(t[0].vaults.ml);
});

// ───────────────────────────────── search ─────────────────────────────────

test('tìm theo tiêu đề, khớp chính xác slug được ưu tiên', () => {
  const raw = new Map([...noteMap.keys()].map((k) => [k, '']));
  const r = search(noteMap, raw, 'a');
  assert.equal(r[0].id, 'ml/a');
});

test('tìm bỏ dấu tiếng Việt', () => {
  const raw = new Map([...noteMap.keys()].map((k) => [k, '']));
  assert.ok(search(noteMap, raw, 'mo coi').some((x) => x.id === 'ml/d'), '"mo coi" phải khớp "mồ côi"');
});

test('tìm trong nội dung và trả đoạn khớp', () => {
  const raw = new Map([['ml/a', 'nội dung có chữ khoaidacbiet ở đây']]);
  const r = search(noteMap, raw, 'khoaidacbiet');
  assert.equal(r.length, 1);
  assert.match(r[0].snippet, /khoaidacbiet/);
});

test('truy vấn rỗng trả mảng rỗng', () => {
  assert.deepEqual(search(noteMap, new Map(), '   '), []);
});

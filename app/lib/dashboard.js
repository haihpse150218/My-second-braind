// Số liệu tiến độ học cho tab Dashboard.
// Trả về đúng những thứ hành động được: học gì tiếp, chỗ nào hổng, chỗ nào hỏng.
import { EDGE } from './graph.js';

const KEYS = ['todo', 'learning', 'done', 'review'];

/**
 * @param {Map} noteMap  'vault/slug' → note
 * @param {Object} graph {nodes, edges}
 * @param {Object} vaults cấu hình vaults.json
 */
export function buildDashboard(noteMap, graph, vaults) {
  // đếm bậc vào để tìm note mồ côi
  const inDeg = new Map();
  for (const e of graph.edges) inDeg.set(e.target, (inDeg.get(e.target) || 0) + 1);

  const out = { vaults: [], totals: zero(), orphans: [], broken: [], nextUp: [], recent: [] };

  for (const [vid, vcfg] of Object.entries(vaults)) {
    const notes = [...noteMap.values()].filter((n) => n.vault === vid);
    const counts = zero();
    for (const n of notes) counts[n.statusKey]++;

    // tiến độ từng nhánh
    const branches = [];
    for (const [b, label] of Object.entries(vcfg.branches || {})) {
      const list = notes.filter((n) => n.branch === b).sort((a, z) => (a.order ?? 0) - (z.order ?? 0));
      if (!list.length) { branches.push({ branch: b, label, total: 0, done: 0, pct: 0 }); continue; }
      const done = list.filter((n) => n.statusKey === 'done').length;
      branches.push({
        branch: b, label, total: list.length, done,
        pct: Math.round((done / list.length) * 100),
        first: list[0] ? `${vid}/${list[0].slug}` : null,
      });
    }

    const noBranch = notes.filter((n) => !n.branch && n.type === 'concept').length;

    out.vaults.push({
      id: vid,
      label: vcfg.label || vid,
      color: vcfg.color || '#7aa2f7',
      total: notes.length,
      counts,
      pct: notes.length ? Math.round((counts.done / notes.length) * 100) : 0,
      branches,
      noBranch,
    });
    for (const k of KEYS) out.totals[k] += counts[k];
  }

  for (const [id, n] of noteMap) {
    // MỒ CÔI: không ai trỏ tới. Note meta/inbox không tính (chúng vốn là điểm vào).
    if (!inDeg.get(id) && n.type === 'concept') {
      out.orphans.push({ id, title: n.title, vault: n.vault, branch: n.branch });
    }

    // LINK GÃY: trỏ tới slug không tồn tại
    for (const l of [...new Set([...n.links, ...n.prev, ...n.next, ...n.related])]) {
      if (!noteMap.has(`${n.vault}/${l}`)) {
        out.broken.push({ from: id, target: l, kind: 'cùng vault' });
      }
    }
    for (const x of n.xlinks) {
      if (!noteMap.has(`${x.vault}/${x.slug}`)) {
        out.broken.push({ from: id, target: `${x.vault}/${x.slug}`, kind: 'liên môn' });
      }
    }

    // ĐỌC TIẾP: chưa học, nhưng mọi tiền đề đã nắm → sẵn sàng học ngay
    if (n.statusKey === 'todo' || n.statusKey === 'learning') {
      const prevs = n.prev.filter((p) => noteMap.has(`${n.vault}/${p}`));
      const ready = prevs.every((p) => noteMap.get(`${n.vault}/${p}`).statusKey === 'done');
      if (ready) {
        out.nextUp.push({
          id, title: n.title, vault: n.vault, branch: n.branch, order: n.order,
          statusKey: n.statusKey, blockedBy: 0,
        });
      }
    }
  }

  // note sửa gần đây nhất
  out.recent = [...noteMap.entries()]
    .filter(([, n]) => n.updated || n.created)
    .sort((a, z) => String(z[1].updated || z[1].created).localeCompare(String(a[1].updated || a[1].created)))
    .slice(0, 12)
    .map(([id, n]) => ({ id, title: n.title, vault: n.vault, date: n.updated || n.created }));

  // ưu tiên: đang học trước, rồi theo nhánh/thứ tự
  out.nextUp.sort((a, z) =>
    (a.statusKey === z.statusKey ? 0 : a.statusKey === 'learning' ? -1 : 1) ||
    String(a.vault).localeCompare(String(z.vault)) ||
    String(a.branch).localeCompare(String(z.branch)) ||
    (a.order ?? 999) - (z.order ?? 999)
  );
  out.nextUp = out.nextUp.slice(0, 20);
  out.orphans.sort((a, z) => a.id.localeCompare(z.id));
  out.broken.sort((a, z) => a.from.localeCompare(z.from));

  out.totals.all = KEYS.reduce((s, k) => s + out.totals[k], 0);
  out.totals.pct = out.totals.all ? Math.round((out.totals.done / out.totals.all) * 100) : 0;
  out.totals.orphans = out.orphans.length;
  out.totals.broken = out.broken.length;
  out.totals.crossVault = graph.stats.crossVault;

  return out;
}

/** Timeline: gom note theo tháng tạo/sửa, tách theo vault để tô màu. */
export function buildTimeline(noteMap) {
  const byMonth = new Map();
  for (const [id, n] of noteMap) {
    const d = n.created || n.updated;
    if (!d || !/^\d{4}-\d{2}/.test(String(d))) continue;
    const m = String(d).slice(0, 7);
    if (!byMonth.has(m)) byMonth.set(m, {});
    const bucket = byMonth.get(m);
    (bucket[n.vault] ||= []).push({ id, title: n.title, date: d });
  }
  return [...byMonth.entries()]
    .sort((a, z) => a[0].localeCompare(z[0]))
    .map(([month, vaults]) => ({
      month,
      total: Object.values(vaults).reduce((s, a) => s + a.length, 0),
      vaults,
    }));
}

/** Tìm toàn kho: tiêu đề · tags · nội dung. Trả kèm đoạn khớp. */
export function search(noteMap, rawMap, q, limit = 40) {
  const needle = norm(q);
  if (!needle) return [];
  const hits = [];
  for (const [id, n] of noteMap) {
    const title = norm(n.title);
    const tags = norm(n.tags.join(' '));
    const body = norm(rawMap.get(id) || '');

    let score = 0;
    if (norm(n.slug) === needle) score += 100;
    if (title.includes(needle)) score += title.startsWith(needle) ? 50 : 30;
    if (norm(n.slug).includes(needle)) score += 20;
    if (tags.includes(needle)) score += 15;
    const bodyIdx = body.indexOf(needle);
    if (bodyIdx !== -1) score += 5;
    if (!score) continue;

    let snippet = n.summary || '';
    if (bodyIdx !== -1) {
      const src = rawMap.get(id) || '';
      snippet = src.slice(Math.max(0, bodyIdx - 60), bodyIdx + 120).replace(/\s+/g, ' ').trim();
    }
    hits.push({ id, vault: n.vault, slug: n.slug, title: n.title, status: n.status, type: n.type, score, snippet });
  }
  return hits.sort((a, z) => z.score - a.score).slice(0, limit);
}

// bỏ dấu tiếng Việt + hạ chữ thường → gõ 'dao ham' vẫn ra 'đạo hàm'
function norm(s) {
  return String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
}

function zero() { return { todo: 0, learning: 0, done: 0, review: 0 }; }
export { EDGE };

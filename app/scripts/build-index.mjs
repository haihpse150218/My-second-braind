// Đóng gói toàn kho thành dist/ tự chứa — mở bằng file:// hoặc đẩy GitHub Pages,
// không cần chạy Node.
//
//   node scripts/build-index.mjs
//
// Sinh ra:
//   dist/index.json   toàn bộ note (metadata + nội dung md) + graph + dashboard
//   dist/*            bản sao của public/ (html, css, js, vendor)
import { readFile, writeFile, mkdir, readdir, copyFile, stat, rm } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAllNotes, loadProjects, buildGraph } from '../lib/graph.js';
import { buildDashboard, buildTimeline } from '../lib/dashboard.js';
import { readNote } from '../lib/vault.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const DIST = resolve(APP, '../dist');
const PUBLIC = join(APP, 'public');

const cfg = JSON.parse(await readFile(join(APP, 'vaults.json'), 'utf8'));
const vaults = {};
for (const [id, v] of Object.entries(cfg)) vaults[id] = { ...v, dir: resolve(APP, v.dir) };

console.log('▸ đọc note…');
const noteMap = await loadAllNotes(vaults);
const projects = await loadProjects(resolve(APP, '../projects'));
const graph = buildGraph(noteMap, projects, vaults);
const dashboard = { ...buildDashboard(noteMap, graph, vaults), timeline: buildTimeline(noteMap) };

// nội dung markdown nhúng thẳng vào index → bản tĩnh đọc được note mà không cần server
console.log('▸ nhúng nội dung…');
const notes = {};
for (const [id, n] of noteMap) {
  let content = '';
  try { content = await readNote(vaults[n.vault].dir, n.slug); } catch { /* bỏ qua */ }
  notes[id] = { ...n, content };
}

const index = {
  generatedAt: new Date().toISOString(),
  vaults: Object.entries(cfg).map(([id, v]) => ({
    id, label: v.label || id, branches: v.branches || {}, color: v.color, type: v.type,
  })),
  stats: { notes: noteMap.size, projects: projects.length, ...graph.stats },
  graph,
  dashboard,
  notes,
  projects: projects.map((p) => ({ slug: p.slug, title: p.title, status: p.status, tags: p.tags })),
};

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await writeFile(join(DIST, 'index.json'), JSON.stringify(index), 'utf8');

// copy public/ sang dist/ (đệ quy, giữ nguyên cây thư mục vendor)
async function copyDir(src, dst) {
  await mkdir(dst, { recursive: true });
  for (const e of await readdir(src, { withFileTypes: true })) {
    const s = join(src, e.name), d = join(dst, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await copyFile(s, d);
  }
}
console.log('▸ copy public/…');
await copyDir(PUBLIC, DIST);

const size = (await stat(join(DIST, 'index.json'))).size;
console.log(`\n✅ dist/ sẵn sàng`);
console.log(`   index.json  ${(size / 1024 / 1024).toFixed(2)} MB`);
console.log(`   ${noteMap.size} note · ${projects.length} project · ${graph.stats.nodes} node · ${graph.stats.edges} cạnh`);
console.log(`\n   Xem thử:  npx serve ../dist      (hoặc: python -m http.server -d ../dist)`);
console.log('   Deploy:   đẩy cả thư mục dist/ lên GitHub Pages.');
console.log('\n   ⚠️ KHÔNG mở trực tiếp bằng file:// — trình duyệt chặn fetch() qua giao thức');
console.log('      file, nên index.json không nạp được. Phải phục vụ qua HTTP.');

// Kiểm toàn vẹn TOÀN KHO (mọi vault cùng lúc), không dừng ở vault đầu tiên.
// Khác `check-links.js` (chỉ 1 vault): script này hiểu cả link LIÊN MÔN nên
// [[dl/backpropagation]] trong vault ml không bị báo nhầm là link chết.
//
//   node scripts/check-all.mjs
import { readFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAllNotes, loadProjects, buildGraph } from '../lib/graph.js';
import { buildDashboard } from '../lib/dashboard.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');

const cfg = JSON.parse(await readFile(join(APP, 'vaults.json'), 'utf8'));
const vaults = {};
for (const [id, v] of Object.entries(cfg)) vaults[id] = { ...v, dir: resolve(APP, v.dir) };

const noteMap = await loadAllNotes(vaults);
const projects = await loadProjects(resolve(APP, '../projects'));
const graph = buildGraph(noteMap, projects, vaults);
const d = buildDashboard(noteMap, graph, vaults);

const pad = (s, n) => String(s).padEnd(n);
console.log(`\n📦 ${noteMap.size} note · ${projects.length} project · ${graph.stats.edges} cạnh · ${graph.stats.crossVault} liên môn\n`);

console.log(pad('VAULT', 8) + pad('NOTE', 6) + pad('✅', 5) + pad('🟡', 5) + pad('⬜', 5) + pad('%', 6) + 'NHÁNH');
for (const v of d.vaults) {
  const filled = v.branches.filter((b) => b.total).length;
  console.log(
    pad(v.id, 8) + pad(v.total, 6) + pad(v.counts.done, 5) + pad(v.counts.learning, 5) +
    pad(v.counts.todo, 5) + pad(v.pct + '%', 6) + `${filled}/${v.branches.length} có note`
  );
}

// gom link gãy theo đích để dễ quyết định viết note nào trước
const byTarget = new Map();
for (const b of d.broken) {
  if (!byTarget.has(b.target)) byTarget.set(b.target, []);
  byTarget.get(b.target).push(b.from);
}
const ranked = [...byTarget.entries()].sort((a, z) => z[1].length - a[1].length);

console.log(`\n🔗 Link gãy: ${d.broken.length} (tới ${byTarget.size} đích chưa tồn tại)`);
for (const [t, from] of ranked.slice(0, 10)) {
  console.log(`   ${pad(from.length + ' note chờ', 14)} [[${t}]]`);
}
if (ranked.length > 10) console.log(`   …và ${ranked.length - 10} đích nữa`);

console.log(`\n👻 Mồ côi: ${d.orphans.length}${d.orphans.length ? ' — ' + d.orphans.map((o) => o.id).join(', ') : ''}`);
console.log('   (note #1 của một nhánh không ai trỏ tới là BÌNH THƯỜNG — nó là điểm vào)');

console.log(`\n▶️ Sẵn sàng học tiếp: ${d.nextUp.length} note`);
for (const n of d.nextUp.slice(0, 5)) console.log(`   ${n.id}`);

// Không exit code khác 0: link gãy ở đây là BACKLOG (note dự kiến viết),
// không phải lỗi build. Xem hub/nguon-chua-xu-ly.md mục 4.
console.log('');

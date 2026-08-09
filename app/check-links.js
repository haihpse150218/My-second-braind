// Kiểm toàn vẹn vault: link chết · thiếu branch/order · order trùng.
//   node check-links.js ../../DeepLearning/note
import { resolve } from 'node:path';
import { listNotes } from './lib/vault.js';

const dir = resolve(process.argv[2] || '../note');
const notes = await listNotes(dir);
const have = new Set(notes.map((n) => n.slug));

let problems = 0;
const warn = (msg) => { console.log('  ' + msg); problems++; };

console.log(`Vault: ${dir}  (${notes.length} note)\n`);

// 1. link chết
const dead = new Map(); // slug đích -> [note nguồn]
for (const n of notes) {
  for (const l of [...n.links, ...n.prev, ...n.next]) {
    if (!have.has(l)) {
      if (!dead.has(l)) dead.set(l, []);
      if (!dead.get(l).includes(n.slug)) dead.get(l).push(n.slug);
    }
  }
}
console.log(`[1] Link chết: ${dead.size}`);
for (const [target, sources] of [...dead].sort()) warn(`✗ [[${target}]] ← ${sources.join(', ')}`);

// 2. thiếu branch / order
const noMeta = notes.filter((n) => !n.branch || n.order == null);
console.log(`\n[2] Thiếu branch/order: ${noMeta.length}`);
for (const n of noMeta) warn(`✗ ${n.slug} (branch=${n.branch} order=${n.order})`);

// 3. order trùng trong cùng nhánh
console.log('\n[3] Order trùng:');
const byBranch = {};
for (const n of notes) if (n.branch) (byBranch[n.branch] ||= []).push(n);
let dupCount = 0;
for (const b of Object.keys(byBranch).sort()) {
  const seen = new Map();
  for (const n of byBranch[b]) {
    if (seen.has(n.order)) { warn(`✗ Nhánh ${b} #${n.order}: ${seen.get(n.order)} vs ${n.slug}`); dupCount++; }
    else seen.set(n.order, n.slug);
  }
  const orders = byBranch[b].map((n) => n.order).sort((x, y) => x - y);
  console.log(`  Nhánh ${b}: ${byBranch[b].length} note, #${orders[0]}–#${orders[orders.length - 1]}`);
}
if (!dupCount) console.log('  (không có)');

console.log(`\n${problems ? `❌ ${problems} vấn đề` : '✅ Sạch'}`);
process.exit(problems ? 1 : 0);

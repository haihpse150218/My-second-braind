// P4.4 — sinh SECOND_BRAIN_NCKH.md TỪ chính các note đã import.
// Sinh ra thay vì chép tay INDEX.md cũ, để wikilink luôn khớp tên file thật —
// chép tay là cách chắc chắn nhất để đẻ ra link chết.
//
//   node scripts/build-nckh-hub.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNote } from '../lib/parse.js';
import { isValidSlug } from '../lib/vault.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const DIR = resolve(APP, '../vaults/nckh');

const cfg = JSON.parse(await readFile(join(APP, 'vaults.json'), 'utf8'));
const BRANCHES = cfg.nckh.branches;

const notes = [];
for (const f of (await readdir(DIR)).sort()) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const slug = f.slice(0, -3);
  if (!isValidSlug(slug)) continue;
  notes.push(parseNote(slug, await readFile(join(DIR, f), 'utf8'), 'nckh'));
}

const byGroup = {};
for (const n of notes) (byGroup[n.group || '?'] ||= []).push(n);
for (const g of Object.values(byGroup)) g.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const today = new Date().toISOString().slice(0, 10);
const groups = Object.keys(byGroup).sort();

const L = [];
L.push('# 🧠 Second Brain — Nghiên cứu khoa học');
L.push('');
L.push('> Trang trung tâm (Map of Content) cho kho paper của đề tài **Coding Agent Harness & Evaluation**.');
L.push('> Mỗi note = 1 paper, theo khung 10 mục cố định (xem `CONVENTIONS.md` §8).');
L.push('');
L.push(`**Cập nhật lần cuối:** ${today}`);
L.push('**Trạng thái:** 🌱 Đang phát triển');
L.push(`**Tổng số:** ${notes.length} note · ${groups.length} nhóm`);
L.push('**Nguồn gốc:** `D:\\MSA-FPT\\Methods of Learnning and scientific research\\NCKK-Docs\\de-tai`');
L.push('**Quay lại:** [[../hub/MASTER|🏠 MASTER]]');
L.push('');
L.push('> 🎯 **Cách dùng:** đọc theo nhóm chủ đề, không đọc tuần tự. Mỗi note đã tóm tắt sẵn *Vấn đề → Phương pháp → Hạn chế → Liên quan đến đề tài*, dùng mục 10 để quyết định paper nào đáng đọc bản đầy đủ.');
L.push('');
L.push('---');
L.push('');
L.push('## 🧭 Lộ trình đọc theo nhóm');
L.push('');

for (const g of groups) {
  const label = BRANCHES[g] || (g === 'S' ? 'Surveys tham khảo' : `Nhóm ${g}`);
  L.push(`**Nhóm ${g} · ${label}** *(${byGroup[g].length} paper)*`);
  L.push('');
  for (const n of byGroup[g]) {
    const who = n.authors.length ? n.authors[0].split(/\s+/).at(-1) : '?';
    const yr = n.year ? ` ${n.year}` : '';
    // bỏ phần sau dấu ':' cho tiêu đề ngắn lại, hub đọc mới dễ
    const short = String(n.title).replace(/^\[\d{4}\]\s*/, '').split(/\s+[—–]\s+/).slice(1).join(' — ') || n.title;
    L.push(`${n.order}. [[${n.slug}]] — *${who}${yr}* · ${short.split(':')[0].slice(0, 95)}`);
  }
  L.push('');
}

L.push('---');
L.push('');
L.push('## 📊 Thống kê');
L.push('');
L.push('| Nhóm | Chủ đề | Số paper | Năm mới nhất |');
L.push('|---|---|---|---|');
for (const g of groups) {
  const years = byGroup[g].map((n) => n.year).filter(Boolean);
  L.push(`| ${g} | ${BRANCHES[g] || 'Surveys tham khảo'} | ${byGroup[g].length} | ${years.length ? Math.max(...years) : '—'} |`);
}
L.push(`| **Tổng** | | **${notes.length}** | |`);
L.push('');
L.push('---');
L.push('');
L.push('## 🔗 Tài nguyên khác');
L.push('');
L.push('| Tài nguyên | Mô tả |');
L.push('|---|---|');
L.push('| [[gap-analysis]] | Phân tích khoảng trống nghiên cứu — cụm chủ đề, bảng landscape, gap xếp hạng |');
L.push('| [[table-characteristics]] | Bảng so sánh đặc điểm các công trình |');
L.push('| `_rename-map.md` | Ánh xạ tên file gốc ↔ slug mới |');
L.push('| `D:\\MSA-FPT\\Methods of Learnning and scientific research\\NCKK-Docs\\de-tai\\papers` | 49 file PDF gốc |');
L.push('| `D:\\MSA-FPT\\Methods of Learnning and scientific research\\NCKK-Docs\\de-tai\\de-cuong` | Đề cương luận văn (DE-CUONG*.md/.tex/.pdf) |');
L.push('| `D:\\MSA-FPT\\Methods of Learnning and scientific research\\NCKK-Docs\\de-tai\\thao-luan` | Phản biện / thảo luận (THAO-LUAN*.md) |');
L.push('| [[../projects/harness-eval-nckh\\|📦 Project harness-eval]] | Code + thực nghiệm của đề tài |');
L.push('');
L.push('## 🔗 Quy ước liên kết');
L.push('');
L.push('- `[[slug]]` — note trong cùng vault `nckh`');
L.push('- `[[dl/attention-qkv]]` — note ở vault khác (xem `CONVENTIONS.md` §6)');
L.push('- Trạng thái: ⬜ Chưa đọc · 🟡 Đang đọc · ✅ Đã tóm tắt · 🔁 Cần đọc lại');

await writeFile(join(DIR, 'SECOND_BRAIN_NCKH.md'), L.join('\n') + '\n', 'utf8');
console.log(`✓ SECOND_BRAIN_NCKH.md — ${notes.length} note, ${groups.length} nhóm: ${groups.join(', ')}`);

// P4.1–4.3 — nạp note tóm tắt paper vào vault nckh.
//   COPY (không MOVE) + slug hoá tên file + sinh frontmatter type: literature
//
//   node scripts/import-nckh.mjs [--dry-run]
//
// Vì sao phải đổi tên: 'A1_2026_Bui_OpenDev.md' có CHỮ HOA và '_' → isValidSlug()
// loại, listNotes() BỎ QUA IM LẶNG, note biến mất khỏi app mà không báo lỗi.
// Xem CONVENTIONS.md §3.
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringifyFrontmatter } from '../lib/frontmatter.js';
import { isValidSlug } from '../lib/vault.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

// Bản trong 'Methods of Learnning…' là CANONICAL (có de-cuong/, thao-luan/,
// harness-eval/). Bản 'D:\MSA-FPT\NCKK-Docs' là snapshot cũ → bỏ.
const SRC = 'D:/MSA-FPT/Methods of Learnning and scientific research/NCKK-Docs/de-tai';
const DST = resolve(APP, '../vaults/nckh');

// 'A1_2026_Bui_OpenDev' → 'a1-2026-bui-opendev'
const slugify = (base) =>
  base.toLowerCase().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');

function extract(raw, file) {
  const text = raw.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const one = (re) => { for (const l of lines) { const m = l.match(re); if (m) return m[1].trim(); } return null; };

  const title = (lines.find((l) => /^#\s+/.test(l)) || '').replace(/^#\s+/, '').trim() || file;
  const arxiv = one(/^-\s*\*\*arXiv:\*\*\s*(.+)$/);
  const venue = one(/^-\s*\*\*Venue:\*\*\s*(.+)$/);
  const yearS = one(/^-\s*\*\*Year:\*\*\s*(\d{4})/);
  const authorsS = one(/^-\s*\*\*Authors?:\*\*\s*(.+)$/);

  // '## 9. Keywords' — nguồn có HAI kiểu viết:
  //   (a) `coding-agent` `harness` …          → lấy trong backtick
  //   (b) Self-improving agents, meta-programming, …  → tách bằng dấu phẩy
  let tags = [];
  const kwIdx = lines.findIndex((l) => /^##\s*9\.\s*Keywords/i.test(l));
  if (kwIdx !== -1) {
    const block = [];
    for (let i = kwIdx + 1; i < lines.length && !/^##\s/.test(lines[i]); i++) block.push(lines[i]);
    const text = block.join(' ').trim();
    const ticked = [...text.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    const raw = ticked.length ? ticked : text.split(/\s*,\s*/);
    tags = raw.map((t) => slugify(t)).filter((t) => t && t.length >= 2 && t.length <= 40);
  }

  // 'A1' / 'B10' / 'S2' → nhóm + số thứ tự trong nhóm
  const gm = file.match(/^([A-Z])(\d+)/);

  return {
    title,
    group: gm ? gm[1] : null,
    order: gm ? Number(gm[2]) : null,
    year: yearS ? Number(yearS) : null,
    authors: authorsS ? authorsS.split(/\s*[,;]\s*|\s+and\s+/).map((s) => s.trim()).filter(Boolean) : [],
    arxiv,
    venue,
    tags: [...new Set(tags)].slice(0, 12),
  };
}

await mkdir(DST, { recursive: true });
const files = (await readdir(join(SRC, 'summary'))).filter((f) => f.endsWith('.md')).sort();

const renameMap = [];
let ok = 0, bad = 0, noPdf = 0;

for (const file of files) {
  const base = file.slice(0, -3);
  const slug = slugify(base);
  if (!isValidSlug(slug)) { console.log(`  ✗ slug không hợp lệ: ${file} → ${slug}`); bad++; continue; }

  const raw = await readFile(join(SRC, 'summary', file), 'utf8');
  const meta = extract(raw, base);

  // PDF gốc: giữ TÊN GỐC, chỉ trỏ tới bằng đường dẫn tuyệt đối.
  const pdfAbs = `${SRC}/papers/${base}.pdf`.replace(/\//g, '\\');
  let paper = pdfAbs;
  try { await access(join(SRC, 'papers', `${base}.pdf`)); } catch { paper = null; noPdf++; }

  const fm = {
    slug,
    title: meta.title,
    vault: 'nckh',
    type: 'literature',
    branch: meta.group,     // nhóm A–I/S đóng vai trò 'nhánh' để dùng chung UI lộ trình
    order: meta.order,
    status: 'done',         // đã đọc & tóm tắt xong
    group: meta.group,
    year: meta.year,
    authors: meta.authors,
    arxiv: meta.arxiv,
    venue: meta.venue,
    paper,
    tags: meta.tags,
  };

  const body = raw.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
  const out =
    stringifyFrontmatter(fm) + '\n\n' +
    body.replace(/^(#\s+.*\n)/, `$1\n**Nguồn PDF:** \`${paper || '(không tìm thấy)'}\`\n**Tên gốc:** \`${base}.md\`\n`);

  renameMap.push({ old: file, new: `${slug}.md`, group: meta.group, order: meta.order, title: meta.title });

  if (DRY) console.log(`  ${file}\n    → ${slug}.md  [${meta.group}${meta.order}] ${meta.year} · tags=${meta.tags.join(',') || '—'}`);
  else await writeFile(join(DST, `${slug}.md`), out, 'utf8');
  ok++;
}

// Bảng ánh xạ tên cũ ↔ mới — cần để đối chiếu ngược với papers/ và INDEX gốc.
if (!DRY) {
  const byGroup = {};
  for (const r of renameMap) (byGroup[r.group] ||= []).push(r);
  const md = [
    '# Ánh xạ tên file — vault nckh',
    '',
    '> Tên gốc dùng `_` và CHỮ HOA nên bị `isValidSlug()` loại (xem `CONVENTIONS.md` §3).',
    `> Nguồn: \`${SRC.replace(/\//g, '\\')}\\summary\``,
    '',
    '| Nhóm | Tên gốc | Slug mới | Tiêu đề |',
    '|---|---|---|---|',
    ...Object.keys(byGroup).sort().flatMap((g) =>
      byGroup[g].sort((a, b) => a.order - b.order)
        .map((r) => `| ${g}${r.order} | \`${r.old}\` | [[${r.new.slice(0, -3)}]] | ${r.title.replace(/\|/g, '\\|').slice(0, 80)} |`)
    ),
  ].join('\n');
  await writeFile(join(DST, '_rename-map.md'), md + '\n', 'utf8');
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}nckh: ${ok} note, ${bad} lỗi slug, ${noPdf} không tìm thấy PDF`);

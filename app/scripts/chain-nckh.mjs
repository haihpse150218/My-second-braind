// Nối các note paper trong CÙNG NHÓM thành chuỗi, để vault nckh không còn là
// 51 chấm rời rạc trên graph.
//
// Dùng `related` (cạnh 'liên kết', nét đứt) CHỨ KHÔNG dùng prev/next.
// Lý do: prev/next mang nghĩa "tiền đề — phải học cái này trước". Paper A2 không
// phải tiền đề của A3; chúng chỉ **cùng nhóm và liền nhau trong danh sách đọc**.
// Gán prev/next ở đây là khẳng định một quan hệ không có thật.
//
//   node scripts/chain-nckh.mjs [--dry-run]
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNote } from '../lib/parse.js';
import { parseFrontmatter, stringifyFrontmatter } from '../lib/frontmatter.js';
import { isValidSlug } from '../lib/vault.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(__dirname, '../../vaults/nckh');
const DRY = process.argv.includes('--dry-run');

const notes = [];
for (const f of (await readdir(DIR)).sort()) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const slug = f.slice(0, -3);
  if (!isValidSlug(slug)) continue;
  const raw = await readFile(join(DIR, f), 'utf8');
  notes.push({ slug, raw, n: parseNote(slug, raw, 'nckh') });
}

const byGroup = {};
for (const x of notes) if (x.n.group) (byGroup[x.n.group] ||= []).push(x);
for (const g of Object.values(byGroup)) g.sort((a, b) => (a.n.order ?? 0) - (b.n.order ?? 0));

let changed = 0;
for (const [g, list] of Object.entries(byGroup)) {
  for (let i = 0; i < list.length; i++) {
    const cur = list[i];
    const neighbours = [list[i - 1], list[i + 1]].filter(Boolean).map((x) => x.slug);
    if (!neighbours.length) continue;

    const { data, body } = parseFrontmatter(cur.raw);
    const before = JSON.stringify(data.related || []);
    data.related = [...new Set([...(data.related || []), ...neighbours])];
    if (JSON.stringify(data.related) === before) continue;

    if (DRY) console.log(`  ${g}${cur.n.order} ${cur.slug} → related: ${neighbours.join(', ')}`);
    else await writeFile(join(DIR, `${cur.slug}.md`), stringifyFrontmatter(data) + '\n\n' + body, 'utf8');
    changed++;
  }
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}${changed}/${notes.length} note nckh được nối chuỗi theo nhóm (${Object.keys(byGroup).sort().join(', ')})`);

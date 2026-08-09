// Sinh YAML frontmatter cho note đã có sẵn, suy từ khối metadata dòng đậm.
// Dòng đậm được GIỮ NGUYÊN (xem CONVENTIONS.md §5) — YAML chỉ bổ sung, không thay thế.
//
//   node scripts/migrate-frontmatter.mjs <vaultId> [--dry-run] [--reorder]
//
//   --dry-run   in ra frontmatter sẽ ghi, KHÔNG đụng file
//   --reorder   suy lại branch+order cho TOÀN vault từ lộ trình đọc trong file hub,
//               và đồng bộ luôn số '#N' trên dòng '**📖 Lộ trình:**' để YAML và
//               dòng đậm không mâu thuẫn nhau. Dùng khi vault thiếu order lung tung.
//
// Chạy lại nhiều lần cho kết quả như nhau (idempotent): lần sau parseNote đọc
// chính YAML vừa ghi nên giá trị không trôi.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNote, STATUS_KEY } from '../lib/parse.js';
import { parseFrontmatter, stringifyFrontmatter } from '../lib/frontmatter.js';
import { isValidSlug } from '../lib/vault.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');

const args = process.argv.slice(2);
const vaultId = args.find((a) => !a.startsWith('--'));
const DRY = args.includes('--dry-run');
const REORDER = args.includes('--reorder');

if (!vaultId) {
  console.error('Thiếu vaultId. VD: node scripts/migrate-frontmatter.mjs ml --dry-run --reorder');
  process.exit(2);
}

const cfg = JSON.parse(await readFile(join(APP, 'vaults.json'), 'utf8'));
if (!cfg[vaultId]) {
  console.error(`vault không tồn tại: ${vaultId}. Có: ${Object.keys(cfg).join(', ')}`);
  process.exit(2);
}
const dir = resolve(APP, cfg[vaultId].dir);

// ── Đọc lộ trình trong file hub → thứ tự đọc chuẩn của từng nhánh ──────────────
// Trả Map<slug, {branch, order}>. order = vị trí trong nhánh (1..N), không trùng.
async function readHubOrder() {
  const files = await readdir(dir);
  const hubName = files.find((f) => /^SECOND_BRAIN.*\.md$/.test(f));
  if (!hubName) return new Map();

  const raw = await readFile(join(dir, hubName), 'utf8');
  const map = new Map();
  let branch = null;
  let seq = 0;

  for (const lineRaw of raw.replace(/\r\n/g, '\n').split('\n')) {
    // Bỏ mọi thứ trong backtick: '`[[svd]]`' là note DỰ ĐỊNH viết, chưa tồn tại.
    const line = lineRaw.replace(/`[^`]*`/g, '');

    const head = line.match(/^(?:#{2,4}\s*|\*\*)Nhánh\s+([A-Z])\b/);
    if (head) { branch = head[1]; seq = 0; continue; }
    // Sang mục '## ...' khác (không phải nhánh) thì kết thúc vùng lộ trình.
    if (/^##\s/.test(line) && !/Nhánh/.test(line)) { branch = null; continue; }
    if (!branch) continue;
    if (!/^\s*(?:\d+\.|[-*])\s/.test(line)) continue;   // chỉ nhận dòng danh sách

    // Lấy MỌI wikilink trên dòng — hub hay viết '[[kiem-dinh-gia-thuyet]] + [[p-value]]',
    // chỉ bắt cái đầu là bỏ sót note thứ hai.
    for (const m of line.matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]*)?\]\]/g)) {
      if (map.has(m[1])) continue;                      // lần xuất hiện đầu mới tính
      map.set(m[1], { branch, order: ++seq });
    }
  }
  return map;
}

// ── Trích các field chỉ có ở dòng đậm, parseNote không trả về ──────────────────
function extraFromBody(body) {
  const lines = body.split('\n');
  const line = (label) => lines.find((l) => l.includes(label)) || '';

  const ngay = line('Ngày tạo');
  const created = (ngay.match(/Ngày tạo:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/) || [])[1] || null;
  const updated = (ngay.match(/Cập nhật:\*\*\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/) || [])[1] || null;

  // '**Tags:** #ml #toan' → ['ml','toan']
  const tagLine = line('**Tags:**');
  const tags = [...tagLine.matchAll(/#([a-z0-9-]+)/gi)].map((m) => m[1].toLowerCase());

  // '**Nguồn slide:** `L6_DecisionTree.pdf` — TS. …' → ['L6_DecisionTree.pdf']
  const srcLine = line('Nguồn slide');
  const sources = [...srcLine.matchAll(/`([^`]+)`/g)].map((m) => m[1]);

  return { created, updated, tags: [...new Set(tags)], sources };
}

// Ghi '#N' vào dòng '**📖 Lộ trình:**' cho khớp YAML (chỉ khi --reorder).
function syncLoTrinhLine(body, branch, order) {
  return body.replace(/^(.*\*\*[^*]*Lộ trình[^*]*\*\*.*)$/m, (line) => {
    if (/#\d+/.test(line)) return line.replace(/#\d+/, `#${order}`);
    // chưa có số → chèn ngay sau 'Nhánh X' (và sau phần ngoặc nếu có)
    return line.replace(
      new RegExp(`(Nhánh\\s+${branch}\\b(?:\\s*\\([^)]*\\))?)`),
      `$1 · #${order}`
    );
  });
}

// ── Chạy ──────────────────────────────────────────────────────────────────────
const hubOrder = REORDER ? await readHubOrder() : new Map();
if (REORDER) console.log(`Lộ trình từ hub: ${hubOrder.size} note có thứ tự\n`);

let written = 0, skipped = 0, reordered = 0;
const noBranch = [];

for (const name of (await readdir(dir)).sort()) {
  if (!name.endsWith('.md') || name.startsWith('_')) continue;
  const slug = name.slice(0, -3);
  if (!isValidSlug(slug)) { skipped++; continue; }   // hub SECOND_BRAIN_*.md rơi vào đây

  const p = join(dir, name);
  const raw = await readFile(p, 'utf8');
  const n = parseNote(slug, raw, vaultId);
  let { body } = parseFrontmatter(raw);
  const extra = extraFromBody(body);

  let branch = n.branch;
  let order = n.order;
  const hub = hubOrder.get(slug);
  if (REORDER && hub) {
    if (branch !== hub.branch || order !== hub.order) reordered++;
    branch = hub.branch;
    order = hub.order;
    body = syncLoTrinhLine(body, branch, order);
  }
  if (!branch) noBranch.push(slug);

  const fm = {
    slug,
    title: n.title,
    vault: vaultId,
    type: n.type || 'concept',
    branch,
    order,
    status: STATUS_KEY[n.status] || 'todo',
    tags: n.tags.length ? n.tags : extra.tags,
    prev: n.prev,
    next: n.next,
    related: n.related,
    sources: n.sources.length ? n.sources : extra.sources,
    created: n.created || extra.created,
    updated: n.updated || extra.updated,
  };

  const out = stringifyFrontmatter(fm) + '\n\n' + body.replace(/^\n+/, '');

  if (DRY) {
    console.log(`─── ${name}`);
    console.log(stringifyFrontmatter(fm).split('\n').map((l) => '  ' + l).join('\n'));
  } else {
    await writeFile(p, out, 'utf8');
  }
  written++;
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}vault ${vaultId}: ${written} note ghi frontmatter, ${skipped} bỏ qua (hub/template)`);
if (REORDER) console.log(`  ${reordered} note được gán lại branch/order theo hub`);
if (noBranch.length) console.log(`  ⚠️ ${noBranch.length} note KHÔNG có branch: ${noBranch.join(', ')}`);

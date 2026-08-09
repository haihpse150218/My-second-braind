// P7.2 — đổi link CHẾT trong vault ml thành link LIÊN MÔN tới note đã có bên dl.
// Một mũi tên trúng hai đích: xoá link chết, đồng thời tạo cạnh liên môn THẬT
// cho graph (trước bước này toàn kho có 0 cạnh liên môn).
//
// CHỈ đổi những cặp đã kiểm tra thủ công là cùng khái niệm — không đoán mò.
//
//   node scripts/fix-crossvault-links.mjs [--dry-run]
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ML = resolve(__dirname, '../../vaults/ml');
const DRY = process.argv.includes('--dry-run');

// slug chết trong ml → note tương ứng bên dl (đã đối chiếu nội dung)
const MAP = {
  'backpropagation':   'dl/backpropagation',       // trùng khớp hoàn toàn
  'transfer-learning': 'dl/transfer-learning',     // trùng khớp hoàn toàn
  'transformer':       'dl/transformer-block',     // 'transformer' của ml = khối transformer bên dl
  'resnet50':          'dl/resnet',                // resnet50 là một biến thể ResNet
  'cnn':               'dl/vi-sao-can-cnn',        // ml chỉ nhắc CNN ở mức 'vì sao cần'
};

let files = 0, total = 0;
const perTarget = {};

for (const name of (await readdir(ML)).sort()) {
  if (!name.endsWith('.md')) continue;
  const p = join(ML, name);
  const raw = await readFile(p, 'utf8');
  let out = raw, hits = 0;

  for (const [dead, target] of Object.entries(MAP)) {
    // chỉ khớp [[dead]] hoặc [[dead|nhãn]] — không đụng slug dài hơn chứa chuỗi này
    const re = new RegExp(`\\[\\[${dead}(\\|[^\\]]*)?\\]\\]`, 'g');
    const found = (out.match(re) || []).length;
    if (!found) continue;
    // giữ nhãn cũ nếu có; không có thì đặt nhãn = slug cũ cho câu văn không đổi nghĩa
    out = out.replace(re, (_m, label) => `[[${target}${label || `|${dead}`}]]`);
    hits += found;
    perTarget[target] = (perTarget[target] || 0) + found;
  }

  if (hits) {
    files++; total += hits;
    console.log(`  ${name}: ${hits}`);
    if (!DRY) await writeFile(p, out, 'utf8');
  }
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}${total} link đổi trong ${files} file`);
for (const [t, n] of Object.entries(perTarget).sort()) console.log(`  → ${t}: ${n}`);

// P6.3 — thêm dòng '**Dùng trong:**' vào note lý thuyết, trỏ ngược về thẻ project.
// Link một chiều (project → note) thì đọc note không biết nó từng được dùng ở đâu.
// Chèn ngay sau dòng '**Chủ đề cha:**' để nằm chung khối metadata dòng đậm.
// Chạy lại nhiều lần không nhân bản dòng (kiểm tra trước khi chèn).
//
//   node scripts/link-projects.mjs [--dry-run]
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const V = resolve(__dirname, '../../vaults');
const DRY = process.argv.includes('--dry-run');

// note (vault/slug) → các project dùng nó
const MAP = {
  'dl/attention-qkv':            ['viic-image-captioning'],
  'dl/lstm-cell-state':          ['viic-image-captioning'],
  'dl/beam-search':              ['viic-image-captioning'],
  'dl/kien-truc-cnn-4-tang':     ['viic-image-captioning', 'image-super-resolution', 'dsp-urbansound'],
  'dl/vi-sao-can-cnn':           ['image-super-resolution', 'dsp-urbansound'],
  'dl/transfer-learning':        ['viic-image-captioning'],
  'ml/danh-gia-mo-hinh':         ['viic-image-captioning', 'image-super-resolution', 'dsp-urbansound'],
  'ml/cross-validation':         ['dsp-urbansound'],
  'ml/xu-ly-du-lieu':            ['dsp-urbansound'],
  'ml/bias-variance':            ['viic-image-captioning', 'dsp-urbansound'],
  'ml/generative-ai':            ['image-super-resolution'],
  'ml/kiem-dinh-gia-thuyet':     ['harness-eval-nckh'],
  'ml/p-value':                  ['harness-eval-nckh'],
  'nckh/a1-2026-bui-opendev':    ['harness-eval-nckh'],
  'nckh/a2-2026-lou-autoharness':['harness-eval-nckh'],
  'nckh/gap-analysis':           ['harness-eval-nckh'],
};

let added = 0, already = 0, missing = 0;

for (const [ref, projects] of Object.entries(MAP)) {
  const p = resolve(V, `${ref}.md`);
  let raw;
  try { raw = await readFile(p, 'utf8'); } catch { console.log(`  ✗ không có: ${ref}`); missing++; continue; }

  if (raw.includes('**Dùng trong:**')) { already++; continue; }

  const links = projects.map((s) => `[[../../projects/${s}|📦 ${s}]]`).join(' · ');
  const line = `**Dùng trong:** ${links}`;

  // chèn sau 'Chủ đề cha'; không có thì sau 'Trạng thái'; vẫn không có thì sau H1
  let next;
  if (/^.*\*\*Chủ đề cha:\*\*.*$/m.test(raw)) next = raw.replace(/^(.*\*\*Chủ đề cha:\*\*.*)$/m, `$1\n${line}`);
  else if (/^.*\*\*Trạng thái:\*\*.*$/m.test(raw)) next = raw.replace(/^(.*\*\*Trạng thái:\*\*.*)$/m, `$1\n${line}`);
  else next = raw.replace(/^(#\s+.*)$/m, `$1\n\n${line}`);

  if (DRY) console.log(`  + ${ref}  ←  ${projects.join(', ')}`);
  else await writeFile(p, next, 'utf8');
  added++;
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}${added} note thêm link ngược, ${already} đã có sẵn, ${missing} không tìm thấy`);

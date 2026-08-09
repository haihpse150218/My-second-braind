// P5.2–5.4 — nạp note THÔ của DSP/IVP vào <vault>/_inbox/.
// COPY nguyên trạng, chỉ thêm frontmatter + dòng '**Nguồn gốc:**'.
// _inbox/ nằm trong thư mục con nên listNotes() không đọc → note thô KHÔNG lên
// graph, không làm nhiễu số liệu tiến độ. Chưng cất xong mới đưa lên gốc vault.
//
//   node scripts/import-inbox.mjs [--dry-run]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringifyFrontmatter } from '../lib/frontmatter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

const DSP = 'D:/MSA-FPT/Digital Signal Processing/workspaces/project/DSP501';
const IVP = 'D:/MSA-FPT/Image and video processing';

// slug: tên file trong _inbox (vẫn theo luật a-z0-9-) · plan: ghi chú kế hoạch chưng cất
const JOBS = [
  { vault: 'dsp', src: `${DSP}/description.md`,          slug: 'dsp501-tong-quan',    title: 'DSP501 — Tổng quan bài toán phân loại âm thanh đô thị', plan: 'Bài toán · pipeline tổng thể · thuật ngữ nền' },
  { vault: 'dsp', src: `${DSP}/dataset.md`,              slug: 'dsp501-dataset',      title: 'DSP501 — Bộ dữ liệu UrbanSound8K',                      plan: 'fold là gì · vì sao không tự shuffle · rò rỉ dữ liệu' },
  { vault: 'dsp', src: `${DSP}/model.md`,                slug: 'dsp501-mo-hinh',      title: 'DSP501 — Mô hình phân loại',                            plan: 'MFCC · mel-spectrogram · CNN trên phổ' },
  { vault: 'dsp', src: `${DSP}/analyze.md`,              slug: 'dsp501-phan-tich',    title: 'DSP501 — Phân tích kết quả',                            plan: 'confusion matrix · so sánh phương pháp' },
  { vault: 'dsp', src: `${DSP}/docs/SIGNAL_ANALYSIS.md`, slug: 'dsp501-phan-tich-tin-hieu', title: 'DSP501 — Phân tích tín hiệu',                     plan: 'miền thời gian vs tần số · FFT · STFT · ZCR · RMS' },
  { vault: 'dsp', src: `${DSP}/report.md`,               slug: 'dsp501-bao-cao',      title: 'DSP501 — Báo cáo',                                      plan: 'công thức LaTeX gốc, dùng khi viết note công thức' },

  { vault: 'ivp', src: `${IVP}/note.md`,                 slug: 'ivp-note-tho',        title: 'IVP — Ghi chép thô theo buổi',                          plan: 'brain-dump gốc, nguồn để tách khái niệm' },
  { vault: 'ivp', src: `${IVP}/note_mindmap.md`,         slug: 'ivp-mindmap-mo-rong', title: 'IVP — Mindmap mở rộng từ note thô',                      plan: 'đã cấu trúc sẵn → tách atomic note dễ nhất, LÀM TRƯỚC' },
  { vault: 'ivp', src: `${IVP}/mindmap.md`,              slug: 'ivp-mindmap',         title: 'IVP — Mindmap Lecture 0→6',                             plan: 'sơ đồ mermaid theo lecture' },
  { vault: 'ivp', src: `${IVP}/tom-tat-lectures.md`,     slug: 'ivp-tom-tat-lectures', title: 'IVP — Tóm tắt Lecture 0→12',                           plan: 'bảng thuật ngữ L0–L12 → mỗi dòng ~1 atomic note' },
];

const HUB = { dsp: 'SECOND_BRAIN_DSP', ivp: 'SECOND_BRAIN_IVP' };
let n = 0;

for (const j of JOBS) {
  const raw = (await readFile(j.src, 'utf8')).replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
  const abs = j.src.replace(/\//g, '\\');

  const fm = stringifyFrontmatter({
    slug: j.slug, title: j.title, vault: j.vault, type: 'inbox', status: 'todo',
    tags: [j.vault, 'chua-chung-cat'], sources: [basename(j.src)], created: today,
  });

  const header = [
    `# ${j.title}`, '',
    `**Nguồn gốc:** \`${abs}\``,
    '**Trạng thái:** ⬜ Chưa chưng cất',
    `**Chủ đề cha:** [[${HUB[j.vault]}]]`,
    `**Dự kiến tách:** ${j.plan}`, '',
    '> ⚠️ **Note thô** — nguyên trạng từ nguồn gốc, chưa chia thành khái niệm nguyên tử.',
    '> Nằm trong `_inbox/` nên app không đọc, không lên graph.', '',
    '---', '',
  ].join('\n');

  const out = fm + '\n\n' + header + raw;
  const dst = resolve(APP, `../vaults/${j.vault}/_inbox/${j.slug}.md`);

  if (DRY) console.log(`  ${j.vault}/_inbox/${j.slug}.md  ← ${abs}  (${raw.length} ký tự)`);
  else { await mkdir(dirname(dst), { recursive: true }); await writeFile(dst, out, 'utf8'); }
  n++;
}

console.log(`\n${DRY ? '[DRY-RUN] ' : ''}${n} note thô vào _inbox (dsp: ${JOBS.filter(j=>j.vault==='dsp').length}, ivp: ${JOBS.filter(j=>j.vault==='ivp').length})`);

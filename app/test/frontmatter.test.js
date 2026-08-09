import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, stringifyFrontmatter, withFrontmatter } from '../lib/frontmatter.js';
import { parseNote } from '../lib/parse.js';

// ─────────────────────────────── parseFrontmatter ───────────────────────────────

test('không có frontmatter → data rỗng, body nguyên vẹn', () => {
  const raw = '# Tiêu đề\n\nnội dung';
  const { data, body, hasFrontmatter } = parseFrontmatter(raw);
  assert.equal(hasFrontmatter, false);
  assert.deepEqual(data, {});
  assert.equal(body, raw);
});

test('parse scalar, list inline, list gạch đầu dòng', () => {
  const { data } = parseFrontmatter(`---
slug: gradient-descent
title: Gradient Descent
order: 4
year: 2025
status: done
tags: [ml, toan, toi-uu]
prev:
  - gradient
  - dao-ham
created: 2026-06-12
---

# Gradient Descent`);
  assert.equal(data.slug, 'gradient-descent');
  assert.equal(data.order, 4);          // số, không phải chuỗi
  assert.equal(typeof data.order, 'number');
  assert.equal(data.created, '2026-06-12'); // ngày giữ dạng chuỗi
  assert.deepEqual(data.tags, ['ml', 'toan', 'toi-uu']);
  assert.deepEqual(data.prev, ['gradient', 'dao-ham']);
});

test('chuỗi có nháy giữ nguyên dấu ":" và không bị suy ra số', () => {
  const { data } = parseFrontmatter(`---
title: "[2025] Chhikara — Mem0: Building Production-Ready AI Agents"
arxiv: "2504.19413"
---
x`);
  assert.equal(data.title, '[2025] Chhikara — Mem0: Building Production-Ready AI Agents');
  assert.equal(data.arxiv, '2504.19413');
  assert.equal(typeof data.arxiv, 'string'); // không được thành 2504.19413 (number)
});

test('bỏ comment ngoài nháy, giữ "#" trong nháy', () => {
  const { data } = parseFrontmatter(`---
branch: A   # nhánh giải tích
title: "Tag #ml là gì"
---
x`);
  assert.equal(data.branch, 'A');
  assert.equal(data.title, 'Tag #ml là gì');
});

test('bool và null', () => {
  const { data } = parseFrontmatter('---\na: true\nb: false\nc: null\nd: ~\n---\nx');
  assert.equal(data.a, true);
  assert.equal(data.b, false);
  assert.equal(data.c, null);
  assert.equal(data.d, null);
});

test('YAML hỏng KHÔNG được ném lỗi', () => {
  // mở '---' mà không đóng
  assert.doesNotThrow(() => parseFrontmatter('---\nslug: x\n# quên đóng\n\n# Tiêu đề'));
  const r1 = parseFrontmatter('---\nslug: x\n\n# Tiêu đề');
  assert.equal(r1.hasFrontmatter, false);
  assert.match(r1.body, /Tiêu đề/); // body không mất

  // dòng rác giữa frontmatter
  const r2 = parseFrontmatter('---\nslug: x\n!!! rác @@@\ntitle: Y\n---\nbody');
  assert.equal(r2.data.slug, 'x');
  assert.equal(r2.data.title, 'Y');
});

test('BOM ở đầu file không phá frontmatter', () => {
  const { data, hasFrontmatter } = parseFrontmatter('﻿---\nslug: x\n---\n# T');
  assert.equal(hasFrontmatter, true);
  assert.equal(data.slug, 'x');
});

// ─────────────────────────── stringify / round-trip ───────────────────────────

test('stringify theo thứ tự key chuẩn, bỏ field rỗng', () => {
  const out = stringifyFrontmatter({
    updated: '2026-08-09', slug: 'pca', title: 'PCA',
    order: null, tags: [], related: ['svd'],
  });
  const lines = out.split('\n');
  assert.equal(lines[0], '---');
  assert.equal(lines.at(-1), '---');
  assert.ok(lines.indexOf('slug: pca') < lines.indexOf('related: [svd]'));
  assert.ok(!out.includes('order:'));  // null → bỏ
  assert.ok(!out.includes('tags:'));   // mảng rỗng → bỏ
});

test('round-trip: stringify rồi parse lại ra đúng dữ liệu', () => {
  const data = {
    slug: 'e1-2025-chhikara-mem0',
    title: '[2025] Chhikara — Mem0: Building Production-Ready AI Agents',
    vault: 'nckh', type: 'literature', order: 1, year: 2025,
    arxiv: '2504.19413', tags: ['memory', 'agent'], related: ['dl/attention-qkv'],
  };
  const back = parseFrontmatter(stringifyFrontmatter(data) + '\n\n# X').data;
  assert.deepEqual(back, data);
});

test('withFrontmatter thay thế frontmatter cũ, giữ nguyên thân', () => {
  const raw = '---\nslug: cu\n---\n\n# Tiêu đề\n\nthân note';
  const out = withFrontmatter(raw, { slug: 'moi', title: 'T' });
  assert.ok(out.includes('slug: moi'));
  assert.ok(!out.includes('slug: cu'));
  assert.ok(out.includes('# Tiêu đề'));
  assert.ok(out.includes('thân note'));
});

// ───────────────────────── parseNote: YAML ⇄ dòng đậm ─────────────────────────

const BODY = `# Gradient Descent

> Tóm tắt 1 câu: đi ngược hướng gradient để giảm loss.

**Ngày tạo:** 2026-06-12
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #4 ← cần [[gradient]] · → kế tiếp [[loss-function]]
**Tags:** #ml
`;

test('chỉ có dòng đậm (note cũ) vẫn parse đúng', () => {
  const n = parseNote('gradient-descent', BODY);
  assert.equal(n.status, '🟡');
  assert.equal(n.statusKey, 'learning');
  assert.equal(n.branch, 'A');
  assert.equal(n.order, 4);
  assert.deepEqual(n.prev, ['gradient']);
});

test('YAML THẮNG khi cả hai cùng có', () => {
  const n = parseNote('gradient-descent', `---
title: Gradient Descent (YAML)
branch: B
order: 9
status: done
---

${BODY}`);
  assert.equal(n.title, 'Gradient Descent (YAML)');
  assert.equal(n.branch, 'B');
  assert.equal(n.order, 9);
  assert.equal(n.status, '✅');       // 'done' → emoji, tương thích frontend cũ
  assert.equal(n.statusKey, 'done');
});

test('YAML thiếu field nào thì rơi xuống dòng đậm field đó', () => {
  const n = parseNote('gradient-descent', `---
title: Chỉ có title
---

${BODY}`);
  assert.equal(n.title, 'Chỉ có title');
  assert.equal(n.branch, 'A');        // lấy từ dòng đậm
  assert.equal(n.order, 4);
  assert.equal(n.status, '🟡');
});

test('link liên môn [[vault/slug]] tách sang xlinks, không lẫn vào links', () => {
  const n = parseNote('pca', `---
vault: ml
related: [svd, dl/autoencoder]
---

# PCA

Xem thêm [[tri-rieng-vector-rieng]] và [[nckh/e1-2025-chhikara-mem0]].`);
  assert.deepEqual(n.links, ['tri-rieng-vector-rieng']);  // links vẫn CHỈ cùng vault
  assert.deepEqual(n.related, ['svd']);
  const keys = n.xlinks.map((x) => `${x.vault}/${x.slug}`).sort();
  assert.deepEqual(keys, ['dl/autoencoder', 'nckh/e1-2025-chhikara-mem0']);
});

test('field literature chỉ xuất hiện khi có trong YAML', () => {
  const plain = parseNote('x', BODY);
  assert.equal(plain.group, null);
  assert.deepEqual(plain.authors, []);

  const lit = parseNote('e1', '---\ntype: literature\ngroup: E\nyear: 2025\nauthors: [Chhikara]\n---\n# X');
  assert.equal(lit.type, 'literature');
  assert.equal(lit.group, 'E');
  assert.equal(lit.year, 2025);
  assert.deepEqual(lit.authors, ['Chhikara']);
});

test('vaultId truyền từ listNotes được gắn vào note', () => {
  assert.equal(parseNote('x', BODY, 'ml').vault, 'ml');
  // YAML khai báo vault thì YAML thắng
  assert.equal(parseNote('x', '---\nvault: dl\n---\n# X', 'ml').vault, 'dl');
});

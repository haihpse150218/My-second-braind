import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from '../server.js';
import { buildSystemPrompt, DEFAULT_BRANCHES } from '../lib/import.js';

let dirMl, dirDl, server, base;

before(async () => {
  dirMl = await mkdtemp(join(tmpdir(), 'sbml-'));
  dirDl = await mkdtemp(join(tmpdir(), 'sbdl-'));
  await writeFile(join(dirMl, 'pca.md'), '# PCA\n**Trạng thái:** ✅ Đã nắm\n');
  await writeFile(join(dirDl, 'lstm.md'), '# LSTM\n**Trạng thái:** 🟡 Đang học\n');
  server = createServer({
    ml: { label: 'Machine Learning', dir: dirMl, branches: { A: 'Giải tích' } },
    dl: { label: 'Deep Learning', dir: dirDl, branches: { E: 'Chuỗi · RNN · LSTM' } },
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.close();
  await rm(dirMl, { recursive: true, force: true });
  await rm(dirDl, { recursive: true, force: true });
});

test('GET /api/vaults liệt kê đủ vault kèm branches', async () => {
  const res = await fetch(`${base}/api/vaults`);
  assert.equal(res.status, 200);
  const { vaults } = await res.json();
  assert.deepEqual(vaults.map((v) => v.id), ['ml', 'dl']);
  assert.equal(vaults[1].label, 'Deep Learning');
  assert.equal(vaults[1].branches.E, 'Chuỗi · RNN · LSTM');
});

test('?vault= định tuyến đúng vault', async () => {
  const ml = await (await fetch(`${base}/api/notes?vault=ml`)).json();
  const dl = await (await fetch(`${base}/api/notes?vault=dl`)).json();
  assert.deepEqual(ml.notes.map((n) => n.slug), ['pca']);
  assert.deepEqual(dl.notes.map((n) => n.slug), ['lstm']);
});

test('không truyền vault → lấy vault đầu tiên', async () => {
  const { notes } = await (await fetch(`${base}/api/notes`)).json();
  assert.deepEqual(notes.map((n) => n.slug), ['pca']);
});

test('vault id lạ → 400', async () => {
  const res = await fetch(`${base}/api/notes?vault=khong-co`);
  assert.equal(res.status, 400);
});

test('ghi vault này KHÔNG đụng vault kia', async () => {
  const res = await fetch(`${base}/api/note/lstm?vault=dl`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content: '# LSTM v2\n' }),
  });
  assert.equal(res.status, 200);
  assert.equal(await readFile(join(dirDl, 'lstm.md'), 'utf8'), '# LSTM v2\n');
  // slug 'lstm' không tồn tại bên ml → phải 404, và file ml giữ nguyên
  const miss = await fetch(`${base}/api/note/lstm?vault=ml`);
  assert.equal(miss.status, 404);
  assert.match(await readFile(join(dirMl, 'pca.md'), 'utf8'), /# PCA/);
});

test('PATCH status áp đúng vault', async () => {
  const res = await fetch(`${base}/api/note/pca/status?vault=ml`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ status: '🔁' }),
  });
  assert.equal(res.status, 200);
  assert.match(await readFile(join(dirMl, 'pca.md'), 'utf8'), /\*\*Trạng thái:\*\* 🔁/);
});

test('POST tạo note vào đúng vault', async () => {
  const res = await fetch(`${base}/api/note?vault=dl`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ slug: 'gru', title: 'GRU' }),
  });
  assert.equal(res.status, 201);
  const dl = await (await fetch(`${base}/api/notes?vault=dl`)).json();
  assert.ok(dl.notes.some((n) => n.slug === 'gru'));
  const ml = await (await fetch(`${base}/api/notes?vault=ml`)).json();
  assert.ok(!ml.notes.some((n) => n.slug === 'gru'));
});

test('buildSystemPrompt nhận branches truyền vào, mặc định về ML', () => {
  const custom = buildSystemPrompt([], 'E: Chuỗi · RNN · LSTM');
  assert.match(custom, /E: Chuỗi · RNN · LSTM/);
  assert.ok(!custom.includes('Giải tích → Tối ưu hóa'));
  assert.match(buildSystemPrompt([]), /Giải tích → Tối ưu hóa/);
  assert.match(DEFAULT_BRANCHES, /^A: /);
});

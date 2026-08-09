import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, normalize, extname, sep } from 'node:path';
import { listNotes, readNote, writeNote, createNote, isValidSlug } from './lib/vault.js';
import { importSlide, assembleNote } from './lib/import.js';
import { loadAllNotes, loadProjects, buildGraph } from './lib/graph.js';
import { buildDashboard, buildTimeline, search } from './lib/dashboard.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, 'public');
const STATUSES = ['⬜', '🟡', '✅', '🔁'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
  res.end(body);
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

const TEMPLATE = (title) => `# ${title}

> Tóm tắt 1 câu: ...

**Ngày tạo:** (điền)
**Trạng thái:** ⬜ Chưa học
**📖 Lộ trình:** Nhánh _ · #_
**Chủ đề cha:** [[SECOND_BRAIN]] · [[note]]
**Tags:** #ml

---

## 💡 Ý chính

-
`;

async function serveStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = normalize(join(PUBLIC, urlPath));
  if (filePath !== PUBLIC && !filePath.startsWith(PUBLIC + sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      'content-type': MIME[extname(filePath)] || 'application/octet-stream',
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

// Chấp nhận cả 2 dạng:
//   createServer('/duong/dan/note')          → 1 vault, id 'default' (tương thích ngược)
//   createServer({ ml: {label, dir}, ... })  → nhiều vault
function normalizeVaults(input) {
  if (typeof input === 'string') {
    return { default: { label: 'Notes', dir: input } };
  }
  if (!input || typeof input !== 'object' || !Object.keys(input).length) {
    throw new Error('createServer: cần đường dẫn note hoặc map vault');
  }
  return input;
}

export function createServer(vaultsInput, opts = {}) {
  const vaults = normalizeVaults(vaultsInput);
  const vaultIds = Object.keys(vaults);
  const defaultVault = vaultIds[0];
  // Thư mục thẻ project (zone 3). Không phải vault nên phải quét riêng.
  const projectsDir = opts.projectsDir ?? resolve(__dirname, '../projects');

  // Nạp toàn kho cho các route liên môn (/api/graph · /api/search · /api/dashboard).
  // Không cache: kho ~240 file, đọc lại mỗi request là đủ nhanh và luôn phản ánh
  // đúng file trên đĩa — sửa note bằng editor ngoài là thấy ngay, không cần restart.
  async function loadWorld() {
    const noteMap = await loadAllNotes(vaults);
    const projects = await loadProjects(projectsDir);
    return { noteMap, projects, graph: buildGraph(noteMap, projects, vaults) };
  }

  // Trả vault theo ?vault=<id>; không truyền thì lấy vault đầu tiên. id lạ → null.
  const resolveVault = (url) => {
    const id = url.searchParams.get('vault') || defaultVault;
    return vaults[id] ? { id, ...vaults[id] } : null;
  };

  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://x');
      const parts = url.pathname.split('/').filter(Boolean); // ['api','note','slug',...]

      // GET /api/vaults — danh sách vault + tên nhánh cho frontend
      if (req.method === 'GET' && url.pathname === '/api/vaults') {
        return send(res, 200, {
          vaults: vaultIds.map((id) => ({
            id,
            label: vaults[id].label || id,
            branches: vaults[id].branches || {},
          })),
        });
      }

      // ── Route LIÊN MÔN: gộp mọi vault, không nhận ?vault= ────────────────
      // Phải đặt TRƯỚC đoạn resolveVault bên dưới, nếu không sẽ bị ép về 1 vault.

      // GET /api/graph — đồ thị gộp mọi vault + thẻ project
      if (req.method === 'GET' && url.pathname === '/api/graph') {
        const { graph } = await loadWorld();
        return send(res, 200, graph);
      }

      // GET /api/dashboard — tiến độ · note mồ côi · link gãy · đọc tiếp · timeline
      if (req.method === 'GET' && url.pathname === '/api/dashboard') {
        const { noteMap, graph } = await loadWorld();
        return send(res, 200, {
          ...buildDashboard(noteMap, graph, vaults),
          timeline: buildTimeline(noteMap),
        });
      }

      // GET /api/search?q=… — tìm toàn kho (tiêu đề · tag · nội dung)
      if (req.method === 'GET' && url.pathname === '/api/search') {
        const q = url.searchParams.get('q') || '';
        if (!q.trim()) return send(res, 200, { q, results: [] });
        const noteMap = await loadAllNotes(vaults);
        // đọc lại thân note để tìm trong nội dung
        const rawMap = new Map();
        for (const [id, n] of noteMap) {
          try { rawMap.set(id, await readNote(vaults[n.vault].dir, n.slug)); } catch { /* bỏ qua */ }
        }
        return send(res, 200, { q, results: search(noteMap, rawMap, q) });
      }

      // Mọi route /api/* còn lại đều gắn với 1 vault cụ thể.
      let vault = null;
      if (parts[0] === 'api') {
        vault = resolveVault(url);
        if (!vault) return send(res, 400, { error: `vault không tồn tại: ${url.searchParams.get('vault')}` });
      }
      const notesDir = vault ? vault.dir : null;

      // GET /api/notes
      if (req.method === 'GET' && url.pathname === '/api/notes') {
        return send(res, 200, { notes: await listNotes(notesDir) });
      }

      // POST /api/import-slide  { dataBase64 } -> { notes } (gọi Claude đọc PDF)
      if (req.method === 'POST' && url.pathname === '/api/import-slide') {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) return send(res, 400, { error: 'Chưa đặt biến môi trường ANTHROPIC_API_KEY' });
        const { dataBase64 } = await readBody(req);
        if (!dataBase64 || typeof dataBase64 !== 'string') return send(res, 400, { error: 'thiếu dataBase64' });
        const existingNotes = await listNotes(notesDir);
        // { A: 'Giải tích…' } → "A: Giải tích…\nB: …" cho prompt
        const branches = vault.branches
          ? Object.entries(vault.branches).map(([k, v]) => `${k}: ${v}`).join('\n')
          : undefined;
        const notes = await importSlide({ dataBase64, existingNotes, apiKey, branches });
        return send(res, 200, { notes });
      }

      // POST /api/import-save  { notes: [meta] } -> { saved, skipped }
      if (req.method === 'POST' && url.pathname === '/api/import-save') {
        const { notes } = await readBody(req);
        if (!Array.isArray(notes)) return send(res, 400, { error: 'thiếu notes' });
        const date = new Date().toISOString().slice(0, 10);
        const saved = [];
        const skipped = [];
        for (const meta of notes) {
          if (!isValidSlug(meta.slug)) {
            skipped.push({ slug: meta.slug, reason: 'slug không hợp lệ' });
            continue;
          }
          try {
            await createNote(notesDir, meta.slug, assembleNote(meta, date));
            saved.push(meta.slug);
          } catch (e) {
            skipped.push({ slug: meta.slug, reason: e.code === 'EEXIST' ? 'đã tồn tại' : String(e.message || e) });
          }
        }
        return send(res, 200, { saved, skipped });
      }

      // POST /api/note
      if (req.method === 'POST' && url.pathname === '/api/note') {
        const { slug, title } = await readBody(req);
        if (!isValidSlug(slug)) return send(res, 400, { error: 'invalid slug' });
        try {
          await createNote(notesDir, slug, TEMPLATE(title || slug));
          return send(res, 201, { ok: true, slug });
        } catch (e) {
          if (e.code === 'EEXIST') return send(res, 409, { error: 'exists' });
          throw e;
        }
      }

      // /api/note/:slug  and  /api/note/:slug/status
      if (parts[0] === 'api' && parts[1] === 'note' && parts[2]) {
        const slug = parts[2];
        if (!isValidSlug(slug)) return send(res, 400, { error: 'invalid slug' });

        if (parts[3] === 'status' && req.method === 'PATCH') {
          const { status } = await readBody(req);
          if (!STATUSES.includes(status)) return send(res, 400, { error: 'bad status' });
          let raw;
          try {
            raw = await readNote(notesDir, slug);
          } catch {
            return send(res, 404, { error: 'not found' });
          }
          const re = /(\*\*Trạng thái:\*\*\s*)(⬜|🟡|✅|🔁)?/;
          const next = re.test(raw)
            ? raw.replace(re, `$1${status}`)
            : raw.replace(/(# .*\n)/, `$1**Trạng thái:** ${status} \n`);
          await writeNote(notesDir, slug, next);
          return send(res, 200, { ok: true, status });
        }

        if (req.method === 'GET') {
          try {
            return send(res, 200, { slug, content: await readNote(notesDir, slug) });
          } catch {
            return send(res, 404, { error: 'not found' });
          }
        }

        if (req.method === 'PUT') {
          const { content } = await readBody(req);
          if (typeof content !== 'string') return send(res, 400, { error: 'no content' });
          await writeNote(notesDir, slug, content);
          return send(res, 200, { ok: true });
        }
      }

      // static
      if (req.method === 'GET') return serveStatic(req, res);
      send(res, 405, { error: 'method not allowed' });
    } catch (e) {
      send(res, 500, { error: String((e && e.message) || e) });
    }
  });
}

// Đọc vaults.json, resolve "dir" tương đối so với thư mục app.
async function loadVaults() {
  const raw = await readFile(join(__dirname, 'vaults.json'), 'utf8');
  const cfg = JSON.parse(raw);
  const out = {};
  for (const [id, v] of Object.entries(cfg)) {
    out[id] = { ...v, dir: resolve(__dirname, v.dir) };
  }
  return out;
}

// chạy trực tiếp
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // NOTES_DIR = chế độ 1 vault (ghi đè vaults.json), giữ cho tương thích cũ.
  const vaults = process.env.NOTES_DIR
    ? { default: { label: 'Notes', dir: resolve(process.env.NOTES_DIR) } }
    : await loadVaults();
  const port = Number(process.env.PORT) || 5173;
  createServer(vaults).listen(port, () => {
    console.log(`Second Brain App → http://localhost:${port}`);
    for (const [id, v] of Object.entries(vaults)) {
      console.log(`  · ${id.padEnd(8)} ${v.label} → ${v.dir}`);
    }
  });
}

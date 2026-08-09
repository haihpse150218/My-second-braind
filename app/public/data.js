// Lớp dữ liệu — cho phép trang chạy ở HAI chế độ:
//   server : có Node chạy nền, gọi /api/* như bình thường (đọc + ghi)
//   static : mở bằng file:// hoặc GitHub Pages, đọc dist/index.json (CHỈ ĐỌC)
//
// Toàn bộ việc chuyển chế độ gói gọn ở đây: app.js chỉ cần gọi api() như cũ,
// hàm này giả lập Response nên phần còn lại của app không phải biết gì.
(function () {
  const S = {
    on: false,      // true = đang chạy chế độ tĩnh
    idx: null,      // nội dung index.json
    notesByVault: new Map(),
  };

  // Giả lập đối tượng Response để app.js dùng y như fetch thật.
  const fake = (obj, ok = true, status = 200) => ({
    ok, status,
    json: async () => obj,
    text: async () => JSON.stringify(obj),
  });

  const READONLY = fake({ error: 'Chế độ chỉ đọc — không có server' }, false, 405);

  S.boot = async function boot() {
    try {
      const r = await fetch('/api/vaults', { cache: 'no-store' });
      if (r.ok) { S.on = false; return { mode: 'server', vaults: (await r.json()).vaults || [] }; }
    } catch { /* không có server → thử chế độ tĩnh */ }

    try {
      const r = await fetch('index.json', { cache: 'no-store' });
      if (!r.ok) throw new Error('no index');
      S.idx = await r.json();
      S.on = true;
      for (const [id, n] of Object.entries(S.idx.notes || {})) {
        const v = id.split('/')[0];
        if (!S.notesByVault.has(v)) S.notesByVault.set(v, []);
        S.notesByVault.get(v).push(n);
      }
      document.documentElement.classList.add('static-mode');
      return { mode: 'static', vaults: S.idx.vaults || [] };
    } catch {
      return { mode: 'none', vaults: [] };
    }
  };

  // Định tuyến offline. Chỉ phục vụ các route ĐỌC; mọi route ghi trả 405.
  S.handle = function handle(path, opts, vault) {
    const method = (opts && opts.method) || 'GET';
    if (method !== 'GET') return Promise.resolve(READONLY);

    const [p, qs] = path.split('?');
    const params = new URLSearchParams(qs || '');
    const v = params.get('vault') || vault;

    if (p === '/api/vaults') return Promise.resolve(fake({ vaults: S.idx.vaults || [] }));
    if (p === '/api/graph') return Promise.resolve(fake(S.idx.graph));
    if (p === '/api/dashboard') return Promise.resolve(fake(S.idx.dashboard));

    if (p === '/api/notes') {
      return Promise.resolve(fake({ notes: (S.notesByVault.get(v) || []).map(stripContent) }));
    }

    if (p.startsWith('/api/note/')) {
      const slug = p.slice('/api/note/'.length).split('/')[0];
      const n = (S.idx.notes || {})[`${v}/${slug}`];
      return Promise.resolve(n
        ? fake({ slug, content: n.content })
        : fake({ error: 'not found' }, false, 404));
    }

    if (p === '/api/search') {
      const q = norm(params.get('q') || '');
      if (!q) return Promise.resolve(fake({ q, results: [] }));
      const out = [];
      for (const [id, n] of Object.entries(S.idx.notes || {})) {
        const t = norm(n.title), sl = norm(n.slug), body = norm(n.content || '');
        let score = 0;
        if (sl === q) score += 100;
        if (t.includes(q)) score += t.startsWith(q) ? 50 : 30;
        if (sl.includes(q)) score += 20;
        if (norm((n.tags || []).join(' ')).includes(q)) score += 15;
        const bi = body.indexOf(q);
        if (bi !== -1) score += 5;
        if (!score) continue;
        let snippet = n.summary || '';
        if (bi !== -1) snippet = (n.content || '').slice(Math.max(0, bi - 60), bi + 120).replace(/\s+/g, ' ').trim();
        out.push({ id, vault: n.vault, slug: n.slug, title: n.title, status: n.status, type: n.type, score, snippet });
      }
      out.sort((a, b) => b.score - a.score);
      return Promise.resolve(fake({ q, results: out.slice(0, 40) }));
    }

    return Promise.resolve(fake({ error: 'not found' }, false, 404));
  };

  function stripContent(n) { const { content, ...rest } = n; return rest; }
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }

  window.SBStatic = S;
})();

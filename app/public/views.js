// 3 view liên môn + tìm kiếm toàn kho.
// Tách khỏi app.js: app.js lo view "Học" (1 vault), file này lo phần GỘP MỌI VAULT.
// Giao tiếp qua window.SBApp do app.js công bố (openNote, switchVault, state).
(function () {
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const V = { tab: 'learn', graph: null, dash: null, cyx: null, vaultColor: {}, filter: new Set() };

  const api = (path) =>
    (window.SBStatic && window.SBStatic.on)
      ? window.SBStatic.handle(path, {}, null)
      : fetch(path);

  // ───────────────────────────── chuyển tab ─────────────────────────────
  function setTab(tab) {
    V.tab = tab;
    for (const b of document.querySelectorAll('#view-tabs button')) {
      b.classList.toggle('active', b.dataset.tab === tab);
    }
    $('#main-learn').hidden = tab !== 'learn';
    $('#xview').hidden = tab === 'learn';
    $('#xgraph').hidden = tab !== 'cross';
    $('#xdash').hidden = tab !== 'dash';
    $('#xtime').hidden = tab !== 'time';

    if (tab === 'cross') loadGraph();
    if (tab === 'dash' || tab === 'time') loadDash();
  }

  // ─────────────────────────── graph liên môn ───────────────────────────
  async function loadGraph() {
    if (V.graph) { if (V.cyx) V.cyx.resize(); return; }
    const box = $('#xcy');
    box.innerHTML = '<div class="loading">Đang dựng đồ thị…</div>';
    try {
      const r = await api('/api/graph');
      V.graph = await r.json();
    } catch {
      box.innerHTML = '<div class="loading">Không tải được đồ thị.</div>';
      return;
    }
    box.innerHTML = '';
    for (const n of V.graph.nodes) V.vaultColor[n.vault] = n.color;
    renderVaultFilter();
    drawGraph();
    $('#xgraph-stats').textContent =
      `${V.graph.stats.nodes} node · ${V.graph.stats.edges} cạnh · ${V.graph.stats.crossVault} cạnh liên môn`;
  }

  function renderVaultFilter() {
    const box = $('#xgraph-filter');
    box.innerHTML = '';
    const vaults = [...new Set(V.graph.nodes.map((n) => n.vault))];
    V.filter = new Set(vaults);
    for (const v of vaults) {
      const b = el('button', 'chip active', v);
      b.style.borderColor = V.vaultColor[v];
      b.onclick = () => {
        if (V.filter.has(v)) V.filter.delete(v); else V.filter.add(v);
        b.classList.toggle('active');
        drawGraph();
      };
      box.appendChild(b);
    }
    const only = el('button', 'chip ghost', '🌉 chỉ cạnh liên môn');
    only.onclick = () => { only.classList.toggle('active'); drawGraph(only.classList.contains('active')); };
    box.appendChild(only);
  }

  function drawGraph(crossOnly = false) {
    const nodes = V.graph.nodes.filter((n) => V.filter.has(n.vault));
    const keep = new Set(nodes.map((n) => n.id));
    let edges = V.graph.edges.filter((e) => keep.has(e.source) && keep.has(e.target));
    if (crossOnly) {
      edges = edges.filter((e) => e.cross);
      // chỉ giữ node có ít nhất 1 cạnh liên môn — nếu không, màn hình đầy chấm rời
      const used = new Set(edges.flatMap((e) => [e.source, e.target]));
      for (let i = nodes.length - 1; i >= 0; i--) if (!used.has(nodes[i].id)) nodes.splice(i, 1);
    }

    const els = [
      ...nodes.map((n) => ({
        data: {
          id: n.id, label: n.title, vault: n.vault, color: n.color,
          type: n.type, status: n.statusKey,
        },
      })),
      ...edges.map((e, i) => ({
        data: { id: `e${i}`, source: e.source, target: e.target, kind: e.kind, cross: String(e.cross) },
      })),
    ];

    if (V.cyx) V.cyx.destroy();
    V.cyx = cytoscape({
      container: $('#xcy'),
      elements: els,
      style: [
        { selector: 'node', style: {
          'background-color': 'data(color)', width: 14, height: 14,
          label: 'data(label)', 'font-size': 7, color: '#c0caf5',
          'text-valign': 'bottom', 'text-margin-y': 3, 'text-max-width': 90,
          'text-wrap': 'ellipsis', 'text-opacity': 0, 'border-width': 0,
        } },
        { selector: 'node[type="project"]', style: { shape: 'diamond', width: 20, height: 20 } },
        { selector: 'node[status="done"]', style: { 'border-width': 2, 'border-color': '#9ece6a' } },
        { selector: 'edge', style: {
          width: 0.6, 'line-color': '#3b4261', 'curve-style': 'haystack', opacity: 0.5,
        } },
        // cạnh liên môn: đậm, sáng, có mũi tên — đây là thứ đáng nhìn nhất
        { selector: 'edge[cross="true"]', style: {
          width: 2, 'line-color': '#ff9e64', opacity: 1, 'curve-style': 'bezier',
          'target-arrow-shape': 'triangle', 'target-arrow-color': '#ff9e64', 'arrow-scale': 0.7,
        } },
        { selector: '.dim', style: { opacity: 0.06, 'text-opacity': 0 } },
        { selector: '.hot', style: { 'text-opacity': 1, width: 22, height: 22, 'z-index': 99 } },
        { selector: 'edge.hot', style: { width: 2.5, 'line-color': '#7dcfff', opacity: 1 } },
      ],
      layout: { name: 'cose', animate: false, nodeRepulsion: 9000, idealEdgeLength: 55, gravity: 0.6, numIter: 700 },
      wheelSensitivity: 0.25,
    });

    V.cyx.on('tap', 'node', (ev) => {
      const [vault, slug] = ev.target.id().split('/');
      if (vault === 'project') { window.open(`../projects/${slug}.md`, '_blank'); return; }
      if (window.SBApp) window.SBApp.gotoNote(vault, slug);
    });
    V.cyx.on('mouseover', 'node', (ev) => {
      const n = ev.target;
      const near = n.closedNeighborhood();
      V.cyx.elements().addClass('dim');
      near.removeClass('dim').addClass('hot');
    });
    V.cyx.on('mouseout', 'node', () => V.cyx.elements().removeClass('dim hot'));
    $('#xgraph-stats').textContent =
      `${nodes.length} node · ${edges.length} cạnh${crossOnly ? ' (chỉ liên môn)' : ''}`;
  }

  // ───────────────────────────── dashboard ─────────────────────────────
  async function loadDash() {
    if (V.dash) { renderDash(); renderTime(); return; }
    $('#xdash-body').innerHTML = '<div class="loading">Đang tính…</div>';
    try {
      const r = await api('/api/dashboard');
      V.dash = await r.json();
    } catch {
      $('#xdash-body').innerHTML = '<div class="loading">Không tải được số liệu.</div>';
      return;
    }
    renderDash();
    renderTime();
  }

  const STATUS_LABEL = { todo: '⬜ Chưa học', learning: '🟡 Đang học', done: '✅ Đã nắm', review: '🔁 Cần ôn' };

  function renderDash() {
    const d = V.dash;
    const box = $('#xdash-body');
    box.innerHTML = '';

    // hàng số liệu tổng
    const kpi = el('div', 'kpi-row');
    const kpis = [
      ['Tổng note', d.totals.all, ''],
      ['Đã nắm', `${d.totals.done}`, `${d.totals.pct}%`],
      ['Đang học', d.totals.learning, ''],
      ['Chưa học', d.totals.todo, ''],
      ['🌉 Cạnh liên môn', d.totals.crossVault, ''],
      ['🔗 Link gãy', d.totals.broken, d.totals.broken ? 'cần sửa' : 'sạch'],
      ['👻 Mồ côi', d.totals.orphans, ''],
    ];
    for (const [k, v, sub] of kpis) {
      const c = el('div', 'kpi');
      c.appendChild(el('div', 'kpi-v', String(v)));
      c.appendChild(el('div', 'kpi-k', k));
      if (sub) c.appendChild(el('div', 'kpi-s', sub));
      kpi.appendChild(c);
    }
    box.appendChild(kpi);

    // tiến độ từng vault + từng nhánh
    for (const v of d.vaults) {
      const card = el('div', 'dcard');
      const h = el('div', 'dcard-h');
      h.innerHTML = `<span class="vdot" style="background:${v.color}"></span>
        <b>${esc(v.label)}</b> <code>${esc(v.id)}</code>
        <span class="muted">${v.total} note</span>`;
      const go = el('button', 'mini', 'Mở →');
      go.onclick = () => window.SBApp && window.SBApp.gotoVault(v.id);
      h.appendChild(go);
      card.appendChild(h);

      card.appendChild(stackBar(v.counts, v.total));
      const legend = el('div', 'dlegend');
      for (const k of ['done', 'learning', 'review', 'todo']) {
        if (!v.counts[k]) continue;
        legend.appendChild(el('span', 'dlg', `${STATUS_LABEL[k]} ${v.counts[k]}`));
      }
      card.appendChild(legend);

      if (v.branches.some((b) => b.total)) {
        const tb = el('table', 'dtable');
        tb.innerHTML = '<thead><tr><th>Nhánh</th><th>Chủ đề</th><th>Tiến độ</th></tr></thead>';
        const tb2 = el('tbody');
        for (const b of v.branches) {
          const tr = el('tr');
          tr.innerHTML = `<td><b>${esc(b.branch)}</b></td><td>${esc(b.label)}</td>
            <td class="pcell">${b.total
              ? `<span class="pbar"><i style="width:${b.pct}%;background:${v.color}"></i></span>
                 <span class="pnum">${b.done}/${b.total}</span>`
              : '<span class="muted">chưa có note</span>'}</td>`;
          tb2.appendChild(tr);
        }
        tb.appendChild(tb2);
        card.appendChild(tb);
      }
      if (v.noBranch) card.appendChild(el('div', 'warn', `⚠️ ${v.noBranch} note chưa gán nhánh`));
      box.appendChild(card);
    }

    box.appendChild(listCard('▶️ Học tiếp — tiền đề đã đủ', d.nextUp,
      (x) => `${x.statusKey === 'learning' ? '🟡' : '⬜'} ${x.title}`,
      'Không còn note nào sẵn sàng.'));

    box.appendChild(listCard('👻 Note mồ côi — không ai trỏ tới', d.orphans,
      (x) => `${x.title} · ${x.vault}${x.branch ? '/' + x.branch : ''}`,
      'Không có note mồ côi.'));

    const brokenCard = listCard('🔗 Link gãy', d.broken,
      (x) => `${x.from} → [[${x.target}]] (${x.kind})`,
      'Không có link gãy.', (x) => x.from);
    box.appendChild(brokenCard);

    box.appendChild(listCard('🕒 Sửa gần đây', d.recent, (x) => `${x.date} · ${x.title}`, '—'));
  }

  function stackBar(counts, total) {
    const bar = el('div', 'stack');
    const COLOR = { done: '#9ece6a', learning: '#e0af68', review: '#7dcfff', todo: '#565f89' };
    for (const k of ['done', 'learning', 'review', 'todo']) {
      if (!counts[k]) continue;
      const s = el('i');
      s.style.width = `${(counts[k] / (total || 1)) * 100}%`;
      s.style.background = COLOR[k];
      s.title = `${STATUS_LABEL[k]}: ${counts[k]}`;
      bar.appendChild(s);
    }
    return bar;
  }

  function listCard(title, items, fmt, emptyMsg, idOf) {
    const c = el('div', 'dcard');
    c.appendChild(el('div', 'dcard-h', `${title}  (${items.length})`));
    if (!items.length) { c.appendChild(el('div', 'muted pad', emptyMsg)); return c; }
    const ul = el('ul', 'dlist');
    for (const x of items.slice(0, 25)) {
      const li = el('li');
      const a = el('a', '', fmt(x));
      a.href = '#';
      a.onclick = (e) => {
        e.preventDefault();
        const id = idOf ? idOf(x) : x.id;
        const [vault, slug] = String(id).split('/');
        if (window.SBApp) window.SBApp.gotoNote(vault, slug);
      };
      li.appendChild(a);
      ul.appendChild(li);
    }
    c.appendChild(ul);
    if (items.length > 25) c.appendChild(el('div', 'muted pad', `…và ${items.length - 25} mục nữa`));
    return c;
  }

  // ───────────────────────────── timeline ─────────────────────────────
  function renderTime() {
    const box = $('#xtime-body');
    box.innerHTML = '';
    const tl = (V.dash && V.dash.timeline) || [];
    if (!tl.length) { box.appendChild(el('div', 'muted pad', 'Chưa có note nào có ngày tạo.')); return; }

    const max = Math.max(...tl.map((t) => t.total));
    const colors = {};
    for (const v of V.dash.vaults) colors[v.id] = v.color;

    const wrap = el('div', 'tl');
    for (const t of tl) {
      const row = el('div', 'tl-row');
      row.appendChild(el('div', 'tl-m', t.month));

      const bars = el('div', 'tl-bars');
      for (const [vault, arr] of Object.entries(t.vaults)) {
        const b = el('div', 'tl-b');
        b.style.width = `${(arr.length / max) * 100}%`;
        b.style.background = colors[vault] || '#7aa2f7';
        b.title = `${vault}: ${arr.length} note`;
        b.textContent = arr.length >= 6 ? `${vault} ${arr.length}` : '';
        bars.appendChild(b);
      }
      row.appendChild(bars);
      row.appendChild(el('div', 'tl-n', String(t.total)));
      wrap.appendChild(row);
    }
    box.appendChild(wrap);

    const lg = el('div', 'dlegend');
    for (const v of V.dash.vaults) {
      const s = el('span', 'dlg');
      s.innerHTML = `<span class="vdot" style="background:${v.color}"></span>${esc(v.label)}`;
      lg.appendChild(s);
    }
    box.appendChild(lg);
  }

  // ──────────────────────── tìm kiếm toàn kho ────────────────────────
  let searchTimer = null;
  function openSearch() {
    $('#gsearch').hidden = false;
    const i = $('#gsearch-input');
    i.value = '';
    $('#gsearch-results').innerHTML = '<div class="muted pad">Gõ để tìm trong toàn bộ kho…</div>';
    i.focus();
  }
  function closeSearch() { $('#gsearch').hidden = true; }

  async function doSearch(q) {
    const box = $('#gsearch-results');
    if (!q.trim()) { box.innerHTML = '<div class="muted pad">Gõ để tìm trong toàn bộ kho…</div>'; return; }
    const r = await api(`/api/search?q=${encodeURIComponent(q)}`);
    const { results = [] } = await r.json();
    box.innerHTML = '';
    if (!results.length) { box.innerHTML = `<div class="muted pad">Không tìm thấy "${esc(q)}"</div>`; return; }
    for (const x of results) {
      const a = el('a', 'gs-item');
      a.href = '#';
      a.innerHTML = `<div class="gs-t">${x.status || ''} ${esc(x.title)}
          <code>${esc(x.vault)}</code></div>
        <div class="gs-s">${esc(x.snippet || '').slice(0, 160)}</div>`;
      a.onclick = (e) => {
        e.preventDefault();
        closeSearch();
        if (window.SBApp) window.SBApp.gotoNote(x.vault, x.slug);
      };
      box.appendChild(a);
    }
  }

  // ───────────────────────────────── init ─────────────────────────────────
  function init() {
    for (const b of document.querySelectorAll('#view-tabs button')) {
      b.onclick = () => setTab(b.dataset.tab);
    }
    $('#btn-gsearch').onclick = openSearch;
    $('#gsearch-close').onclick = closeSearch;
    $('#gsearch').addEventListener('click', (e) => { if (e.target.id === 'gsearch') closeSearch(); });
    $('#gsearch-input').addEventListener('input', (e) => {
      clearTimeout(searchTimer);
      const q = e.target.value;
      searchTimer = setTimeout(() => doSearch(q), 180);
    });
    $('#xgraph-fit').onclick = () => V.cyx && V.cyx.fit(undefined, 30);
    $('#xdash-reload').onclick = () => { V.dash = null; loadDash(); };

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape' && !$('#gsearch').hidden) closeSearch();
    });
  }

  window.SBViews = { init, setTab };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

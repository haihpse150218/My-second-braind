import { parseFrontmatter } from './frontmatter.js';

const STATUSES = ['⬜', '🟡', '✅', '🔁'];
const EXCLUDE_LINKS = new Set(['note']);

// Slug cùng vault. Link không khớp (vd [[SECOND_BRAIN_ML]]) không trỏ tới note nào
// → bỏ, tránh đẻ node ma trên graph.
const SLUG_RE = /^[a-z0-9-]+$/;
// Link liên môn: [[<vault>/<slug>]] — xem CONVENTIONS.md §6.
const XLINK_RE = /^([a-z0-9-]+)\/([a-z0-9-]+)$/;

// status: emoji (dòng đậm, cũ)  ⇄  từ khoá (YAML, mới)
const STATUS_EMOJI = { todo: '⬜', learning: '🟡', done: '✅', review: '🔁' };
const STATUS_KEY = { '⬜': 'todo', '🟡': 'learning', '✅': 'done', '🔁': 'review' };

// Lấy mọi đích từ [[slug]] / [[slug|nhãn]] trong một đoạn text.
function extractLinks(text) {
  const out = [];
  const re = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  let m;
  while ((m = re.exec(text)) !== null) out.push(m[1].trim());
  return out;
}

// Chia danh sách đích thành: cùng vault (chuỗi slug) và liên môn ({vault, slug}).
function splitTargets(targets) {
  const local = [];
  const cross = [];
  for (const t of targets) {
    if (SLUG_RE.test(t)) {
      if (!EXCLUDE_LINKS.has(t)) local.push(t);
      continue;
    }
    const m = t.match(XLINK_RE);
    if (m) cross.push({ vault: m[1], slug: m[2] });
  }
  return { local: [...new Set(local)], cross };
}

const asList = (v) => (Array.isArray(v) ? v : v == null || v === '' ? [] : [v]).map(String);

export function parseNote(slug, raw, vaultId = null) {
  // 1) Tách frontmatter. Không có / hỏng → data = {}, body = toàn văn.
  const { data: fm, body } = parseFrontmatter(raw);
  const text = body.replace(/\r\n/g, '\n');
  const lines = text.split('\n');

  // title: heading '#' đầu tiên
  const titleLine = lines.find((l) => /^#\s+/.test(l));
  const titleFromBody = titleLine ? titleLine.replace(/^#\s+/, '').trim() : slug;

  // summary: dòng '> Tóm tắt' hoặc blockquote đầu tiên
  const sumLine = lines.find((l) => /^>\s+/.test(l));
  const summaryFromBody = sumLine
    ? sumLine.replace(/^>\s+/, '').replace(/^Tóm tắt[^:]*:\s*/i, '').trim()
    : null;

  // Ưu tiên dòng metadata in đậm (**Trạng thái:** …). Chỉ khi không có mới
  // dò lỏng bằng includes — nếu không, một note có chữ "Trạng thái"/"Lộ trình"
  // trong TIÊU ĐỀ hoặc TÓM TẮT sẽ bị bắt nhầm dòng.
  const findMeta = (label) =>
    lines.find((l) => new RegExp(`\\*\\*\\s*(?:[^*]*\\s)?${label}\\s*:?\\s*\\*\\*`).test(l)) ||
    lines.find((l) => l.includes(label)) ||
    '';

  const statusLine = findMeta('Trạng thái');
  const statusFromBody = STATUSES.find((s) => statusLine.includes(s)) || null;

  // lộ trình: branch + order + prev + next
  const loTrinh = findMeta('Lộ trình');
  const branchM = loTrinh.match(/Nhánh\s+([A-Z])/);
  const orderM = loTrinh.match(/#(\d+)/);

  // tách phần sau '← cần' (prev) và sau '→ kế tiếp' (next)
  // Bỏ phần trong ngoặc trước — tên nhánh có thể chứa '→' (vd "Giải tích → Tối ưu").
  const loTrinhClean = loTrinh.replace(/\([^)]*\)/g, '');
  let prevFromBody = [];
  let nextFromBody = [];
  const arrowIdx = loTrinhClean.search(/←|→/);
  if (arrowIdx !== -1) {
    const tail = loTrinhClean.slice(arrowIdx);
    const nextSplit = tail.split('→');
    prevFromBody = extractLinks(nextSplit[0]);
    nextFromBody = extractLinks(nextSplit.slice(1).join('→'));
  }

  // 2) Gộp: YAML THẮNG, thiếu field nào mới rơi xuống dòng đậm.
  const pick = (yamlVal, bodyVal) =>
    yamlVal !== undefined && yamlVal !== null && yamlVal !== '' ? yamlVal : bodyVal;

  // status trong YAML là từ khoá ('done'); ra ngoài vẫn trả EMOJI để tương thích
  // frontend + route PATCH /api/note/:slug/status sẵn có.
  const statusRaw = fm.status;
  const status =
    (typeof statusRaw === 'string' && STATUS_EMOJI[statusRaw.toLowerCase()]) ||
    (STATUSES.includes(statusRaw) ? statusRaw : null) ||
    statusFromBody ||
    '⬜';

  const allTargets = extractLinks(text);
  const { local: bodyLocal, cross: bodyCross } = splitTargets(allTargets);

  const prevSplit = splitTargets(pick(asList(fm.prev).length ? asList(fm.prev) : null, prevFromBody));
  const nextSplit = splitTargets(pick(asList(fm.next).length ? asList(fm.next) : null, nextFromBody));
  const relSplit = splitTargets(asList(fm.related));

  // liên môn gộp từ mọi nguồn, khử trùng
  const xseen = new Set();
  const xlinks = [...bodyCross, ...prevSplit.cross, ...nextSplit.cross, ...relSplit.cross].filter(
    (x) => {
      const k = `${x.vault}/${x.slug}`;
      if (xseen.has(k)) return false;
      xseen.add(k);
      return true;
    }
  );

  return {
    slug,
    vault: pick(fm.vault, vaultId),
    title: pick(fm.title, titleFromBody),
    summary: pick(fm.summary, summaryFromBody),
    type: pick(fm.type, 'concept'),
    status,
    statusKey: STATUS_KEY[status] || 'todo',
    branch: pick(fm.branch, branchM ? branchM[1] : null),
    order: pick(fm.order, orderM ? Number(orderM[1]) : null),
    prev: prevSplit.local,
    next: nextSplit.local,
    related: relSplit.local,
    links: bodyLocal,
    xlinks,
    tags: asList(fm.tags),
    sources: asList(fm.sources),
    created: pick(fm.created, null),
    updated: pick(fm.updated, null),
    // chỉ có ở note paper (type: literature)
    group: pick(fm.group, null),
    year: pick(fm.year, null),
    authors: asList(fm.authors),
    arxiv: pick(fm.arxiv, null),
    venue: pick(fm.venue, null),
    paper: pick(fm.paper, null),
  };
}

export { STATUS_EMOJI, STATUS_KEY, STATUSES };

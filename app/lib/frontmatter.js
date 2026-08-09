// Parser + serializer YAML frontmatter tối giản, KHÔNG phụ thuộc thư viện ngoài.
// Chủ ý chỉ hỗ trợ đúng tập cú pháp mà CONVENTIONS.md quy định:
//   scalar · chuỗi nháy · số · bool · null · list inline [a, b] · list gạch đầu dòng
// KHÔNG hỗ trợ: object lồng nhau, multi-line string (| >), anchor/alias.
// Nguyên tắc: KHÔNG BAO GIỜ ném lỗi — YAML hỏng thì trả {} và giữ nguyên body,
// vì một note viết sai frontmatter không được phép làm sập cả vault.

const FENCE = /^---[ \t]*$/;

// Thứ tự key khi ghi ra — để mọi note trông giống nhau, diff sạch.
const KEY_ORDER = [
  'slug', 'title', 'vault', 'type', 'branch', 'order', 'status',
  'group', 'year', 'authors', 'arxiv', 'venue', 'paper',
  'tags', 'prev', 'next', 'related', 'sources',
  'repo_path', 'domain', 'period', 'stack', 'artifacts',
  'created', 'updated',
];

function stripBOM(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

// Bỏ comment '#' ở cuối dòng, nhưng KHÔNG đụng '#' nằm trong nháy.
function stripComment(s) {
  let q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === q) q = null;
    } else if (c === '"' || c === "'") {
      q = c;
    } else if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) {
      return s.slice(0, i);
    }
  }
  return s;
}

function unquote(s) {
  if (s.length >= 2 && ((s[0] === '"' && s.at(-1) === '"') || (s[0] === "'" && s.at(-1) === "'"))) {
    const inner = s.slice(1, -1);
    return s[0] === '"' ? inner.replace(/\\"/g, '"').replace(/\\n/g, '\n') : inner.replace(/''/g, "'");
  }
  return s;
}

function parseScalar(rawVal) {
  const s = rawVal.trim();
  if (!s) return null;
  // Chuỗi có nháy: giữ nguyên kiểu string, không suy diễn số/bool.
  if (s[0] === '"' || s[0] === "'") return unquote(s);
  if (s === 'null' || s === '~') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  // Ngày YYYY-MM-DD giữ dạng chuỗi (JSON-safe, không lệch timezone).
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^-?\d+$/.test(s)) return Number(s);
  if (/^-?\d*\.\d+$/.test(s)) return Number(s);
  return s;
}

function parseInlineList(s) {
  const inner = s.slice(1, -1).trim();
  if (!inner) return [];
  // Tách theo dấu phẩy NGOÀI nháy.
  const parts = [];
  let cur = '', q = null;
  for (const c of inner) {
    if (q) { if (c === q) q = null; cur += c; }
    else if (c === '"' || c === "'") { q = c; cur += c; }
    else if (c === ',') { parts.push(cur); cur = ''; }
    else cur += c;
  }
  parts.push(cur);
  return parts.map((p) => parseScalar(p)).filter((v) => v !== null && v !== '');
}

/**
 * Tách frontmatter khỏi thân note.
 * @returns {{data: Object, body: string, hasFrontmatter: boolean, raw: string|null}}
 *   `raw` = nguyên văn khối YAML (chưa parse), dùng để ghi lại nguyên trạng nếu cần.
 */
export function parseFrontmatter(input) {
  const text = stripBOM(String(input ?? '')).replace(/\r\n/g, '\n');
  const lines = text.split('\n');

  if (!lines.length || !FENCE.test(lines[0])) {
    return { data: {}, body: text, hasFrontmatter: false, raw: null };
  }
  const end = lines.findIndex((l, i) => i > 0 && FENCE.test(l));
  if (end === -1) {
    // Mở '---' mà không đóng → coi như không có frontmatter, giữ nguyên toàn bộ.
    return { data: {}, body: text, hasFrontmatter: false, raw: null };
  }

  const yamlLines = lines.slice(1, end);
  const body = lines.slice(end + 1).join('\n').replace(/^\n+/, '');
  const data = {};

  let listKey = null; // đang gom list gạch đầu dòng cho key nào
  for (const line of yamlLines) {
    if (!line.trim() || /^\s*#/.test(line)) continue;

    // '  - value' → phần tử của list đang mở
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      const v = parseScalar(stripComment(item[1]));
      if (v !== null && v !== '') data[listKey].push(v);
      continue;
    }

    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) { listKey = null; continue; } // dòng lạ → bỏ qua, không ném lỗi

    const key = kv[1];
    const val = stripComment(kv[2]).trim();

    if (!val) {                      // 'key:' trống → mở list gạch đầu dòng
      data[key] = [];
      listKey = key;
    } else if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = parseInlineList(val);
      listKey = null;
    } else {
      data[key] = parseScalar(val);
      listKey = null;
    }
  }

  // 'key:' trống mà không có phần tử nào theo sau → null, không phải mảng rỗng.
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v) && v.length === 0 && k !== 'tags') data[k] = null;
  }

  return { data, body, hasFrontmatter: true, raw: yamlLines.join('\n') };
}

function quoteIfNeeded(s) {
  const v = String(s);
  // Bọc nháy khi có ký tự làm YAML hiểu sai, hoặc trông giống số/bool mà thực ra là chuỗi.
  if (/^[\s]|[\s]$|[:#\[\]{}",]|^$|^-|^(true|false|null|~)$|^\d+(\.\d+)?$/.test(v)) {
    return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return v;
}

function dumpValue(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return '[' + v.map((x) => quoteIfNeeded(x)).join(', ') + ']';
  return quoteIfNeeded(v);
}

/** Sinh khối frontmatter (kèm cả 2 dòng `---`). Bỏ field null/undefined/mảng rỗng. */
export function stringifyFrontmatter(data) {
  const keys = [
    ...KEY_ORDER.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !KEY_ORDER.includes(k)),
  ];
  const out = ['---'];
  for (const k of keys) {
    const v = data[k];
    if (v === null || v === undefined || v === '') continue;
    if (Array.isArray(v) && !v.length) continue;
    out.push(`${k}: ${dumpValue(v)}`);
  }
  out.push('---');
  return out.join('\n');
}

/** Chèn mới hoặc thay thế frontmatter, giữ nguyên thân note. */
export function withFrontmatter(raw, data) {
  const { body } = parseFrontmatter(raw);
  return stringifyFrontmatter(data) + '\n\n' + body;
}

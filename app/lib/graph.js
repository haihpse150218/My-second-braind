// Gộp mọi vault thành MỘT đồ thị để vẽ graph liên môn.
// Node id = 'vault/slug' (không phải slug trần) — vì hai vault có thể trùng slug.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseNote } from './parse.js';
import { isValidSlug } from './vault.js';

// Loại cạnh, dùng để tô màu / lọc trên frontend.
export const EDGE = {
  ORDER: 'order',     // prev → note, thứ tự đọc trong cùng vault
  LINK: 'link',       // tham chiếu chéo trong cùng vault
  XLINK: 'xlink',     // LIÊN MÔN — vault này sang vault khác
  PROJECT: 'project', // thẻ project → note lý thuyết nó dùng
};

/** Đọc toàn bộ note của mọi vault. Vault lỗi/thiếu thư mục → bỏ qua, không sập. */
export async function loadAllNotes(vaults) {
  const out = new Map(); // 'vault/slug' → note
  for (const [id, v] of Object.entries(vaults)) {
    let entries;
    try { entries = await readdir(v.dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      if (!e.isFile() || !e.name.endsWith('.md') || e.name.startsWith('_')) continue;
      const slug = e.name.slice(0, -3);
      if (!isValidSlug(slug)) continue;
      const raw = await readFile(join(v.dir, e.name), 'utf8');
      out.set(`${id}/${slug}`, parseNote(slug, raw, id));
    }
  }
  return out;
}

/** Đọc thẻ project. Project KHÔNG nằm trong vault nên phải quét riêng. */
export async function loadProjects(dir) {
  const out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.md') || e.name === 'INDEX.md' || e.name.startsWith('_')) continue;
    const slug = e.name.slice(0, -3);
    if (!isValidSlug(slug)) continue;
    const n = parseNote(slug, await readFile(join(dir, e.name), 'utf8'), null);
    out.push({ ...n, type: 'project' });
  }
  return out;
}

/**
 * Dựng đồ thị liên môn.
 * @returns {{nodes: Array, edges: Array, stats: Object}}
 */
export function buildGraph(noteMap, projects = [], vaults = {}) {
  const nodes = [];
  const edges = [];
  const seenEdge = new Set();

  const addEdge = (source, target, kind) => {
    const key = `${source}→${target}:${kind}`;
    if (seenEdge.has(key) || source === target) return;
    seenEdge.add(key);
    edges.push({ source, target, kind, cross: source.split('/')[0] !== target.split('/')[0] });
  };

  for (const [id, n] of noteMap) {
    nodes.push({
      id,
      vault: n.vault,
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      status: n.status,
      statusKey: n.statusKey,
      branch: n.branch,
      order: n.order,
      type: n.type,
      tags: n.tags,
      created: n.created,
      updated: n.updated,
      color: vaults[n.vault]?.color || '#7aa2f7',
    });
  }

  for (const [id, n] of noteMap) {
    const v = n.vault;
    // thứ tự đọc: prev → note (mũi tên chỉ chiều học)
    for (const p of n.prev) if (noteMap.has(`${v}/${p}`)) addEdge(`${v}/${p}`, id, EDGE.ORDER);
    for (const nx of n.next) if (noteMap.has(`${v}/${nx}`)) addEdge(id, `${v}/${nx}`, EDGE.ORDER);
    // tham chiếu chéo cùng vault: cả link trong thân note lẫn field `related`
    // của frontmatter. Bỏ những cái đã là cạnh thứ tự để không vẽ trùng.
    for (const l of new Set([...n.links, ...n.related])) {
      if (l === n.slug || n.prev.includes(l) || n.next.includes(l)) continue;
      if (noteMap.has(`${v}/${l}`)) addEdge(id, `${v}/${l}`, EDGE.LINK);
    }
    // LIÊN MÔN
    for (const x of n.xlinks) {
      const t = `${x.vault}/${x.slug}`;
      if (noteMap.has(t)) addEdge(id, t, EDGE.XLINK);
    }
  }

  // project: node riêng + cạnh sang note nó dùng
  for (const p of projects) {
    const pid = `project/${p.slug}`;
    nodes.push({
      id: pid, vault: 'project', slug: p.slug, title: p.title, summary: p.summary,
      status: p.status, statusKey: p.statusKey, branch: null, order: null,
      type: 'project', tags: p.tags, created: p.created, updated: p.updated,
      color: '#f7768e',
    });
    for (const x of p.xlinks) {
      const t = `${x.vault}/${x.slug}`;
      if (noteMap.has(t)) addEdge(pid, t, EDGE.PROJECT);
    }
  }

  const byVault = {};
  for (const n of nodes) (byVault[n.vault] ||= { nodes: 0, edges: 0 }).nodes++;
  for (const e of edges) {
    const v = e.source.split('/')[0];
    if (byVault[v]) byVault[v].edges++;
  }

  return {
    nodes,
    edges,
    stats: {
      nodes: nodes.length,
      edges: edges.length,
      crossVault: edges.filter((e) => e.cross).length,
      byVault,
    },
  };
}

# 📐 CONVENTIONS — Quy ước Second Brain

> **Đây là nguồn sự thật duy nhất về schema.** Mọi note, mọi script, mọi phần của app phải theo file này.
> Sửa quy ước ở đây trước, rồi mới sửa code/note.

---

## 1. Ba zone lưu trữ

| Zone | Thư mục | Là gì | App đọc? |
|---|---|---|---|
| **Zone 1 — Vault** | `vaults/<id>/` | Note nguyên tử, mỗi file 1 khái niệm. Link được, graph được. | ✅ có |
| **Zone 2 — Hub** | `hub/` | MOC liên môn, lộ trình tổng, backlog. | ⚠️ chỉ đọc, không vào graph |
| **Zone 3 — Project** | `projects/` | **Thẻ tham chiếu** tới project ngoài. Chỉ metadata + `repo_path`. | ⚠️ hiển thị riêng |

**Luật cứng:** `projects/` **KHÔNG chứa** code, dataset, `.venv`, checkpoint, notebook. Chỉ chứa `.md` trỏ về thư mục gốc bằng đường dẫn tuyệt đối.

---

## 2. Cấu trúc một vault

```
vaults/<id>/
├── SECOND_BRAIN_<ID>.md    ← hub của vault (MOC + lộ trình đọc)
├── <slug>.md               ← note nguyên tử — PHẲNG, không thư mục con
├── <slug>.png              ← ảnh đặt ngay cạnh note dùng nó
├── _inbox/                 ← note thô chưa chưng cất (app BỎ QUA)
└── _archive/               ← note bỏ (app BỎ QUA)
```

**Vì sao phẳng:** `app/lib/vault.js › listNotes()` chỉ quét 1 cấp, không đệ quy. Đặt note trong thư mục con = app không thấy.

### Vault ID đang có

| ID | Môn | Loại note |
|---|---|---|
| `ml` | Machine Learning | `concept` |
| `dl` | Deep Learning | `concept` |
| `nckh` | Nghiên cứu khoa học | `literature` |
| `dsp` | Digital Signal Processing | `concept` (đang dựng) |
| `ivp` | Image & Video Processing | `concept` (đang dựng) |

---

## 3. ⚠️ Luật đặt tên file (quan trọng nhất)

Tên file **CHÍNH LÀ** slug, và **CHÍNH LÀ** đích của `[[wikilink]]`.

```
^[a-z0-9-]+\.md$
```

- chữ **thường** hết
- chỉ `a-z`, `0-9`, dấu `-`
- **KHÔNG** dấu tiếng Việt, **KHÔNG** `_`, **KHÔNG** khoảng trắng, **KHÔNG** chữ hoa

> 🚨 **Sai định dạng = `listNotes()` bỏ qua IM LẶNG, không báo lỗi.** Note biến mất khỏi app mà không có cảnh báo nào. Đây là lỗi số 1 dễ mắc.

| Sai | Đúng |
|---|---|
| `Gradient Descent.md` | `gradient-descent.md` |
| `E1_2025_Chhikara_Mem0.md` | `e1-2025-chhikara-mem0.md` |
| `đạo-hàm.md` | `dao-ham.md` |
| `PCA.md` | `pca.md` |

**Ngoại lệ có chủ đích** (app tự bỏ qua, đúng ý ta):
- `SECOND_BRAIN_*.md` — hub, chữ hoa nên bị `isValidSlug` loại → không thành node trên graph. Cố ý.
- `_*.md` — template, rename-map. `listNotes()` bỏ mọi file bắt đầu bằng `_`.

---

## 4. Frontmatter YAML

Đặt ở **đầu file**, kẹp giữa hai dòng `---`.

### 4.1 Note khái niệm — `type: concept`

```yaml
---
slug: gradient-descent
title: Gradient Descent
vault: ml
type: concept
branch: A
order: 4
status: done
tags: [ml, toan, toi-uu]
prev: [gradient]
next: [loss-function]
related: [dao-ham, dl/backpropagation]
sources: ["L1_Math_Overview.pdf"]
created: 2026-06-12
updated: 2026-08-09
---
```

### 4.2 Note paper — `type: literature`

```yaml
---
slug: e1-2025-chhikara-mem0
title: "[2025] Chhikara — Mem0: Building Production-Ready AI Agents"
vault: nckh
type: literature
group: E
year: 2025
authors: [Chhikara]
arxiv: "2504.19413"
venue: arXiv
paper: papers/E1_2025_Chhikara_Mem0.pdf
status: done
tags: [memory, agent, rag]
related: [dl/attention-qkv]
created: 2026-07-20
---
```

### 4.3 Bảng field

| Field | Bắt buộc | Kiểu | Ghi chú |
|---|---|---|---|
| `slug` | ✅ | string | Phải trùng tên file (bỏ `.md`) |
| `title` | ✅ | string | Có `:` thì phải bọc nháy kép |
| `vault` | ✅ | string | ID vault |
| `type` | ✅ | enum | `concept` · `literature` · `moc` · `inbox` · `project` |
| `status` | ✅ | enum | `todo` · `learning` · `done` · `review` |
| `branch` | | `A`–`Z` | Khớp `branches` trong `vaults.json` |
| `order` | | number | Thứ tự trong nhánh |
| `tags` | | list | Không dấu `#`, không dấu tiếng Việt |
| `prev` | | list slug | Tiền đề — cần biết TRƯỚC |
| `next` | | list slug | Học TIẾP sau note này |
| `related` | | list slug | Liên quan, không thứ tự |
| `sources` | | list string | Tên file slide/sách/URL |
| `created` / `updated` | | `YYYY-MM-DD` | |
| `group` | literature | `A`–`I` | Nhóm chủ đề paper |
| `year`,`authors`,`arxiv`,`venue`,`paper` | literature | | |
| `repo_path` | project | string | Đường dẫn tuyệt đối tới thư mục gốc |

---

## 5. Tương thích ngược — GIỮ dòng đậm

Dưới `# Tiêu đề` vẫn **giữ nguyên** khối metadata dòng đậm cũ:

```markdown
# Gradient Descent

> Tóm tắt 1 câu: ...

**Ngày tạo:** 2026-06-12
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #4 ← cần [[gradient]] · → kế tiếp [[loss-function]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]]
**Tags:** #ml #toan
```

**Thứ tự ưu tiên khi parse:** YAML frontmatter **thắng**. Field nào thiếu trong YAML mới rơi xuống đọc dòng đậm.

**Ánh xạ status:**

| Emoji dòng đậm | YAML | Nghĩa |
|---|---|---|
| ⬜ Chưa học | `todo` | Chưa đụng tới |
| 🟡 Đang học | `learning` | Đang đọc/viết dở |
| ✅ Đã nắm | `done` | Hiểu, giải thích lại được |
| 🔁 Cần ôn | `review` | Từng nắm, đang quên |

---

## 6. Link

| Kiểu | Cú pháp | Dùng khi |
|---|---|---|
| Cùng vault | `[[gradient-descent]]` | Note trong cùng môn |
| **Liên môn** | `[[dl/attention-qkv]]` | Note ở vault khác — `<vault>/<slug>` |
| Có nhãn | `[[pca\|Phân tích thành phần chính]]` | Muốn đổi chữ hiển thị |
| File ngoài kho | `[Notebook](D:\MSA-FPT\Machine learning\code-practice\x.ipynb)` | Markdown link, đường dẫn **tuyệt đối** |
| Web | `[SkLearn](https://...)` | |

**Luật:** trong `vaults/` chỉ dùng `[[wikilink]]` cho note. Mọi thứ trỏ ra ngoài kho phải là markdown link đường dẫn tuyệt đối — đường dẫn tương đối kiểu `../code-practice/` sẽ gãy sau khi migrate.

---

## 7. Khung note khái niệm

```markdown
## 💡 Ý chính            — diễn đạt bằng lời của mình
## 🧩 Trực giác / Ví dụ   — ẩn dụ, ví dụ cụ thể
## 🔢 Công thức / Định nghĩa — kèm bảng `Ký hiệu | Ý nghĩa`
## ⚙️ Khi nào dùng / Ứng dụng
## ⚠️ Lỗi thường gặp / Điều dễ nhầm
## 🔗 Liên kết            — Tiền đề / Dẫn tới / Liên quan
## ❓ Câu hỏi mở
## 📚 Nguồn
```

Emoji giữ cố định — chúng đóng vai trò **nhãn ngữ nghĩa** để mắt quét nhanh và để script grep được.

## 8. Khung note paper (10 mục — giữ nguyên từ NCKH)

```markdown
## Metadata
## 1. Van de (Problem)
## 2. Dong co / Gap
## 3. Phuong phap (Method)
## 4. Dong gop chinh
## 5. Diem manh
## 6. Han che
## 7. Dataset & Metric
## 8. Ket qua chinh
## 9. Keywords
## 10. Lien quan den de tai
```

---

## 9. Ngôn ngữ

- **Thân note: tiếng Việt.** Thuật ngữ kỹ thuật giữ nguyên tiếng Anh (gradient descent, overfitting, attention) — không dịch cưỡng ép.
- **Frontmatter, slug, tags: ASCII không dấu.**
- Note paper được phép giữ thân tiếng Anh (trích từ paper gốc).
- Tiêu đề `#` viết tiếng Việt có dấu đầy đủ.

---

## 10. Toán & sơ đồ

| Thứ | Cú pháp | Ghi chú |
|---|---|---|
| Công thức | `$...$` inline, `$$...$$` khối | KaTeX đã vendor offline trong `app/public/vendor/katex/` |
| Sơ đồ | ```` ```mermaid ```` | Dùng ở hub/mindmap, không dùng trong note nguyên tử |
| Pseudo-math nhanh | code fence trơn | Kiểu `h_t = tanh(W·h_{t-1} + U·x_t)` |
| Bảng | bảng markdown | Dùng nhiều — so sánh, bảng ký hiệu |

---

## 11. Ảnh

- Đặt **ngay cạnh** note dùng nó, trong cùng thư mục vault: `![Bias-Variance](bias-variance-target.png)`
- Tên ảnh cùng luật slug: `a-z0-9-`
- Có file `.excalidraw` nguồn thì để cạnh `.png` xuất ra, cùng tên.

---

## 12. Checklist thêm note mới

1. Tên file đúng `^[a-z0-9-]+\.md$` — **kiểm tra kỹ, sai là mất note im lặng**
2. Copy `templates/_TEMPLATE-atomic-note.md`
3. Điền frontmatter: tối thiểu `slug`, `title`, `vault`, `type`, `status`
4. Điền `branch` + `order` → note mới lên đúng chỗ trong lộ trình
5. Nối `prev`/`next` **hai chiều** — sửa cả note hàng xóm
6. Thêm vào lộ trình trong `SECOND_BRAIN_<ID>.md` của vault
7. Chạy `node app/check-links.js` xem có link gãy không

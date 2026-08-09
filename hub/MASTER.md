# 🏠 MASTER — Second Brain tổng hợp

> Trang chủ của toàn bộ kho kiến thức. Từ đây đi tới mọi môn, mọi project, mọi ghi chú.

**Cập nhật:** 2026-08-09 · **Tổng:** 239 note · 5 vault · 8 project
**Chạy web:** `cd app && npm start` → http://localhost:5173

---

## 📚 Các vault

| Vault | Môn | Note | Tiến độ | Nhánh | Hub |
|---|---|---:|---|---:|---|
| `ml` | Machine Learning | **65** | ⬜18 · 🟡47 | 6 | [[../vaults/ml/SECOND_BRAIN_ML\|→ vào]] |
| `dl` | Deep Learning | **123** | ✅123 | 9 | [[../vaults/dl/SECOND_BRAIN_DL\|→ vào]] |
| `nckh` | Nghiên cứu khoa học | **51** | ✅51 | 10 | [[../vaults/nckh/SECOND_BRAIN_NCKH\|→ vào]] |
| `dsp` | Digital Signal Processing | 0 | 🌱 khung + 6 file inbox | 4 | [[../vaults/dsp/SECOND_BRAIN_DSP\|→ vào]] |
| `ivp` | Image & Video Processing | 0 | 🌱 khung + 4 file inbox | 6 | [[../vaults/ivp/SECOND_BRAIN_IVP\|→ vào]] |

> `dl` và `nckh` toàn ✅ vì được viết một mạch rồi đánh dấu xong.
> `ml` còn 47 note 🟡 — đây là chỗ đáng ôn lại nhất.

## 📦 Project

**8 thẻ** → [[../projects/INDEX|xem bảng tổng]]

Nổi bật: [[../projects/viic-image-captioning|ViIC]] (CIDEr 119.95) · [[../projects/image-super-resolution|Siêu phân giải x4]] (8 phương pháp × 4 benchmark) · [[../projects/harness-eval-nckh|HarnessEval]] (luận văn, đang làm)

## 🗺️ Bản đồ liên môn

[[map-lien-mon|→ Cầu nối giữa các môn]] — chỗ cùng một ý xuất hiện ở nhiều môn dưới tên khác nhau.

## 🧭 Lộ trình học xuyên môn

[[lo-trinh-tong|→ Học theo thứ tự nào]] — từ toán nền → ML → DL → chuyên ngành → NCKH.

## 📥 Còn dở

[[nguon-chua-xu-ly|→ Backlog chưng cất]] — 10 file thô trong `_inbox/`, ước tính sinh ra ~57 note nữa.

---

## 🚦 Bắt đầu từ đâu

| Bạn muốn | Đi đây |
|---|---|
| Ôn lại một khái niệm cụ thể | Mở web, gõ vào ô tìm kiếm |
| Học một môn từ đầu | Hub của vault đó → mục **🧭 Lộ trình đọc** |
| Xem mình đang hổng chỗ nào | Web → tab **Dashboard** |
| Nhớ lại một project đã làm | [[../projects/INDEX]] |
| Viết note mới | `templates/_TEMPLATE-atomic-note.md` + đọc `CONVENTIONS.md` §12 |
| Chưng cất note thô | [[nguon-chua-xu-ly]] mục 4 — quy trình 8 bước |

---

## 🏗️ Kho này tổ chức thế nào

```
Second-brain/
├── vaults/        ZONE 1 — note nguyên tử, PHẲNG 1 cấp, app đọc, lên graph
├── hub/           ZONE 2 — MOC liên môn (chính là chỗ bạn đang đứng)
├── projects/      ZONE 3 — thẻ tham chiếu project (KHÔNG chứa code)
├── templates/     5 mẫu note
├── app/           web app (Node thuần, không framework)
└── dist/          index tĩnh để deploy
```

**Ba luật quan trọng nhất** (đầy đủ ở `CONVENTIONS.md`):

1. **Tên file phải khớp `^[a-z0-9-]+\.md$`.** Sai định dạng → app bỏ qua **im lặng**, note biến mất mà không báo lỗi. Đây là lỗi số 1 dễ mắc.
2. **Vault phẳng 1 cấp.** Note nằm trong thư mục con thì app không thấy. `_inbox/` và `_archive/` cố ý nằm ngoài tầm đọc.
3. **YAML frontmatter thắng, dòng đậm là dự phòng.** Giữ cả hai để 239 note cũ vẫn chạy.

## 🔗 Quy ước liên kết

| Kiểu | Cú pháp |
|---|---|
| Cùng vault | `[[gradient-descent]]` |
| Liên môn | `[[dl/attention-qkv]]` |
| Ra ngoài kho | `[Notebook](D:\MSA-FPT\...)` — đường dẫn **tuyệt đối** |

Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn

---

## 📄 Tài liệu kho

| File | Nội dung |
|---|---|
| `CONVENTIONS.md` | Đặc tả schema — nguồn sự thật duy nhất |
| `PROGRESS.md` | Nhật ký dựng kho + checkpoint |
| `README.md` | Cách dùng & cách chạy |

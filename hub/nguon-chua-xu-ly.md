# 📥 Nguồn chưa xử lý — backlog chưng cất

> Danh sách mọi thứ đã **đưa vào kho** nhưng **chưa thành atomic note**.
> Đây là hàng đợi công việc: mỗi mục xong thì đánh dấu và xoá khỏi đây.

**Cập nhật:** 2026-08-09
**Quay lại:** [[MASTER|🏠 MASTER]]

---

## 1. Đang nằm trong `_inbox/` (đã copy vào kho, chờ tách)

App **không đọc** `_inbox/` — note ở đó không lên graph, không tính vào tiến độ.

### `vaults/dsp/_inbox/` — 6 file

| File | Tách ra | Ước tính | Ưu tiên |
|---|---|---|---|
| `dsp501-phan-tich-tin-hieu.md` | miền thời gian vs tần số · FFT · STFT · ZCR · RMS | ~6 note | 🔴 |
| `dsp501-dataset.md` | fold · vì sao không tự shuffle · rò rỉ dữ liệu | ~4 note | 🔴 |
| `dsp501-mo-hinh.md` | MFCC · mel-spectrogram · CNN trên phổ | ~5 note | 🟡 |
| `dsp501-tong-quan.md` | bài toán · pipeline · thuật ngữ nền | ~3 note | 🟡 |
| `dsp501-phan-tich.md` | confusion matrix · so sánh phương pháp | ~2 note | 🟢 |
| `dsp501-bao-cao.md` | kho công thức LaTeX — tra cứu khi viết note | 0 (tra cứu) | 🟢 |

### `vaults/ivp/_inbox/` — 4 file

| File | Tách ra | Ước tính | Ưu tiên |
|---|---|---|---|
| `ivp-tom-tat-lectures.md` | bảng thuật ngữ L0–L12, **mỗi dòng ≈ 1 note** | ~20 note | 🔴 |
| `ivp-mindmap-mo-rong.md` | đã cấu trúc theo chủ đề, khớp thẳng nhánh A–C | ~12 note | 🔴 |
| `ivp-mindmap.md` | mermaid Lecture 0→6 — đối chiếu, chống sót | ~3 note | 🟡 |
| `ivp-note-tho.md` | brain-dump gốc, câu cụt | ~2 note | 🟢 |

**Tổng ước tính: ~57 atomic note** sẽ sinh ra từ 10 file thô này.

---

## 2. Nguồn ngoài kho — chưa đụng tới

Vẫn nằm nguyên ở thư mục gốc, chưa copy vào `Second-brain`.

| Nguồn | Nội dung | Xử lý thế nào |
|---|---|---|
| `D:\MSA-FPT\Digital Signal Processing\Slide` | 8 bài giảng PDF | Dùng `/api/import-slide` (Claude đọc PDF → sinh note) hoặc đọc tay |
| `D:\MSA-FPT\Image and video processing\_txt` | Lecture 0–12 dạng `.txt` (grep được) | Nguồn tốt để đối chiếu khi chưng cất IVP |
| `D:\MSA-FPT\Image and video processing\HPH_25MS23323` | 9 notebook `session1..9.ipynb` | Trích ví dụ code cho mục `⚙️ Khi nào dùng` |
| `D:\MSA-FPT\Coursera` | 2 khoá Agile (tiếng Anh) | → đã có thẻ [[../projects/coursera-agile]] |
| `D:\MSA-FPT\Python` | Bài tập môn Python | Gần như không có kiến thức atomic — **bỏ qua** |
| `D:\MSA-FPT\AI-base` | 1 PDF + 1 bookmark | Không đủ để thành vault — **bỏ qua** |
| `Methods of Learnning...\de-cuong` | Đề cương luận văn (`.md`/`.tex`/`.pdf`) | Là **sản phẩm**, không phải note → thuộc `projects/` |
| `Methods of Learnning...\thao-luan` | 4 file phản biện | Cân nhắc thành `type: moc` trong vault `nckh` |

---

## 3. Trùng lặp cần dọn

| Vấn đề | Quyết định |
|---|---|
| `D:\MSA-FPT\NCKK-Docs` vs `Methods of Learnning...\NCKK-Docs` | Bản trong `Methods...` là **canonical** (có `de-cuong/`, `thao-luan/`, `harness-eval/`). Bản ở gốc là snapshot cũ → **không import**, để nguyên, có thể xoá sau khi đối chiếu. |
| `Machine learning\template-checklist\` xuất hiện 3 nơi | Bản trong `note/` đã import thành [[../vaults/ml/template-checklist]]. Hai bản còn lại là bản sao dùng cho bài tập → kệ. |
| `Digital Signal Processing\workspaces\{final,project}\DSP501` | `project/` là bản làm việc (superset). Đã lấy note thô từ `project/`. |

---

## 4. Note dự kiến viết — 21 khái niệm đã được trỏ tới nhưng chưa có file

Đây là **35 link gãy** mà Dashboard đang báo ở vault `ml`. Chúng **không phải lỗi** — mỗi cái là một chỗ mà note hiện có đã nói *"cái này liên quan tới X"* trong khi X chưa được viết. Danh sách này chính là **thứ tự nên viết tiếp**, xếp theo số note đang chờ.

> ⚠️ **Cố ý KHÔNG tạo file stub rỗng cho chúng.** Tạo 21 note rỗng sẽ làm Dashboard báo 21 note `⬜ Chưa học` trong khi thực chất chẳng có nội dung gì — số liệu tiến độ sẽ nói dối.

| Note cần viết | Nhánh | Được trỏ tới từ |
|---|---|---|
| `chain-rule` | A | dao-ham · deep-learning · giai-tich · gradient · huan-luyen-vs-suy-luan |
| `dao-ham-rieng` | A | dao-ham · giai-tich · gradient |
| `naive-bayes` | E | chon-mo-hinh · dinh-ly-bayes · xac-suat |
| `svd` | B | pca · tri-rieng-vector-rieng |
| `ma-tran` | B | ma-tran-hiep-phuong-sai · tri-rieng-vector-rieng |
| `he-goi-y-recommender` | B | pca · tri-rieng-vector-rieng |
| `giam-chieu-du-lieu` | B | pca · tri-rieng-vector-rieng |
| `ham-so` | A | dao-ham · giai-tich |
| `fine-tuning` | F | dinh-huong-hoc · pytorch-vs-tensorflow |
| `vector` | B | tri-rieng-vector-rieng |
| `phep-bien-doi-tuyen-tinh` | B | tri-rieng-vector-rieng |
| `adam-optimizer` · `sgd` · `learning-rate` | A | gradient-descent |
| `kernel-pca` · `t-sne` | B | pca |
| `gioi-han` | A | dao-ham |
| `toi-uu-hoa` | A | giai-tich |
| `khoang-tin-cay` | C | thong-ke |
| `knn` | E | chon-mo-hinh |
| `xac-suat-co-dieu-kien` | C | xac-suat |

**Nên viết trước:** `chain-rule` (5 note đang chờ) → `dao-ham-rieng` (3) → `naive-bayes` (3). Ba cái này gỡ được 11/35 link gãy.

> 💡 Nhánh **B (đại số tuyến tính)** chiếm 7/21 — đây là mảng hổng lớn nhất của vault `ml`. Hiện chỉ có 3 note trong khi nhánh A có 8, nhánh C có 17.

**Đã xử lý xong (không còn trong danh sách):** 5 link chết được nối sang note có sẵn bên `dl` thay vì viết lại — `backpropagation`, `transfer-learning`, `transformer`→`transformer-block`, `resnet50`→`resnet`, `cnn`→`vi-sao-can-cnn`. Xem [[map-lien-mon]].

---

## 5. Quy trình chưng cất 1 file inbox

1. Mở file trong `_inbox/`, đọc hết, gạch ra danh sách khái niệm **độc lập**.
2. Với mỗi khái niệm: copy `templates/_TEMPLATE-atomic-note.md` → `vaults/<id>/<slug>.md`.
   - ⚠️ Tên file phải khớp `^[a-z0-9-]+$`, sai là app bỏ qua im lặng.
3. Viết mục `💡 Ý chính` **bằng lời của mình trước**, rồi mới chép công thức.
4. Nối `prev`/`next` hai chiều; tìm cơ hội nối **liên môn** `[[vault/slug]]`.
5. Đổi `` `slug` `` thành `[[slug]]` trong hub của vault.
6. Chạy `node app/scripts/migrate-frontmatter.mjs <vault> --reorder` để gán lại thứ tự.
7. Chạy `node app/check-links.js ../vaults/<vault>` — phải 0 link chết.
8. Đánh dấu tiến độ ở bảng mục 1 phía trên.

# 📥 Nguồn chưa xử lý — backlog chưng cất

> Danh sách mọi thứ đã **đưa vào kho** nhưng **chưa thành atomic note**.
> Đây là hàng đợi công việc: mỗi mục xong thì đánh dấu và xoá khỏi đây.

**Cập nhật:** 2026-08-10
**Quay lại:** [[MASTER|🏠 MASTER]]

---

## 1. `_inbox/` — ✅ **ĐÃ CHƯNG CẤT XONG CẢ HAI VAULT (2026-08-10)**

App **không đọc** `_inbox/`. 10 file thô ban đầu ước tính sinh ~57 note; thực tế nguồn giàu hơn nhiều → **86 note**.

### `vaults/dsp/_inbox/` — 6 file · ✅ **XONG** → 21 note, 5 nhánh A–E

| File | Kết quả |
|---|---|
| `dsp501-phan-tich-tin-hieu.md` | ✅ nguồn chính cho nhánh B (tần số) + D (đặc trưng) |
| `dsp501-bao-cao.md` | ✅ công thức LaTeX cho nhánh A, C, D, E |
| `dsp501-dataset.md` | ✅ toàn bộ [[../vaults/dsp/fold-va-ro-ri-du-lieu]] |
| `dsp501-mo-hinh.md` | ✅ phần model → [[../vaults/dsp/phan-loai-am-thanh]] |
| `dsp501-tong-quan.md` | ✅ đối chiếu, chống sót |
| `dsp501-phan-tich.md` | ✅ confusion matrix → bảng cặp lớp dễ nhầm |

> ➕ **Thêm nhánh E · Thực nghiệm & đánh giá.** Lộ trình cũ chỉ có A–D (kỹ thuật thuần), bỏ sót phần phương pháp trong báo cáo: fold/rò rỉ dữ liệu, kiểm định `p` + Cohen's `d`, SNR. Ba note này là **bài học dùng được ngoài môn DSP**.

### `vaults/ivp/_inbox/` — 4 file · ✅ **XONG 2026-08-10**

Cả 4 file đã chưng cất hết → **65 atomic note**, 10 nhánh A–J bám sát Lecture 1→12.
Ước tính ban đầu ~37 note; thực tế nguồn giàu hơn nhiều.

| File | Kết quả |
|---|---|
| `ivp-tom-tat-lectures.md` | ✅ nguồn chính — tách hết L1→L12 |
| `ivp-mindmap-mo-rong.md` | ✅ dùng hết cho nhánh C (phép số học) + D (histogram) |
| `ivp-mindmap.md` | ✅ đối chiếu L0–L6, chống sót |
| `ivp-note-tho.md` | ✅ đối chiếu L7–L12 |

> ⚠️ **Đã sửa lộ trình IVP.** Bản dự kiến cũ có nhánh *Nén ảnh* và *Video & chuyển động* — **không có trong tài liệu nguồn** (nén chỉ được nhắc 1 dòng ở L2; video thuộc Session 9 chưa học). Đã thay bằng 10 nhánh bám lecture thật; hai chủ đề cũ chuyển xuống mục 2 dưới đây.



---

## 2. Nguồn ngoài kho — chưa đụng tới

Vẫn nằm nguyên ở thư mục gốc, chưa copy vào `Second-brain`.

| Nguồn | Nội dung | Xử lý thế nào |
|---|---|---|
| `D:\MSA-FPT\Digital Signal Processing\Slide` | 8 bài giảng PDF | 🔴 **Còn thiếu: `bien-doi-z` và `chuoi-fourier`** — không có trong 6 file inbox, phải đọc thẳng từ PDF |
| `D:\MSA-FPT\Image and video processing\_txt` | Lecture 0–12 dạng `.txt` (grep được) | 🔴 **Còn thiếu: nén ảnh (DCT/JPEG/PSNR-SSIM) và video/optical flow** — hai chủ đề này không có trong 4 file inbox, phải đọc thẳng từ đây |
| `D:\MSA-FPT\Image and video processing\HPH_25MS23323` | 9 notebook `session1..9.ipynb` | Trích ví dụ code bổ sung vào mục `⚙️ Khi nào dùng` của 65 note IVP đã có |
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

## 4. Note dự kiến viết — ✅ **XONG 2026-08-10**

Toàn bộ **21 khái niệm** từng được trỏ tới mà chưa có file nay đã viết xong → **link gãy toàn kho: 35 → 0**.

| Nhánh | Note đã viết |
|---|---|
| **A · Giải tích → Tối ưu** (8) | [[../vaults/ml/ham-so]] · [[../vaults/ml/gioi-han]] · [[../vaults/ml/chain-rule]] · [[../vaults/ml/dao-ham-rieng]] · [[../vaults/ml/sgd]] · [[../vaults/ml/learning-rate]] · [[../vaults/ml/adam-optimizer]] · [[../vaults/ml/toi-uu-hoa]] |
| **B · Đại số tuyến tính** (8) | [[../vaults/ml/vector]] · [[../vaults/ml/ma-tran]] · [[../vaults/ml/phep-bien-doi-tuyen-tinh]] · [[../vaults/ml/svd]] · [[../vaults/ml/giam-chieu-du-lieu]] · [[../vaults/ml/kernel-pca]] · [[../vaults/ml/t-sne]] · [[../vaults/ml/he-goi-y-recommender]] |
| **C · Xác suất → Thống kê** (2) | [[../vaults/ml/xac-suat-co-dieu-kien]] · [[../vaults/ml/khoang-tin-cay]] |
| **E · Thuật toán** (2) | [[../vaults/ml/naive-bayes]] · [[../vaults/ml/knn]] |
| **F · Nhập môn** (1) | [[../vaults/ml/fine-tuning]] |

> 💡 Nhánh **B** từng là mảng hổng lớn nhất (3 note, 7/21 link gãy trỏ vào đó). Giờ có **12 note**, đi trọn từ vector → ma trận → SVD → PCA → hệ gợi ý.

**Việc tiếp theo của `ml`:** không còn link gãy nào, nên hàng đợi giờ là **soát lại 68 note 🟡** — vault duy nhất còn 0% ✅. Cách kiểm tra: đọc mục `💡 Ý chính`, gấp note lại, giải thích bằng lời mình.

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

# 🧠 Second Brain — Image & Video Processing

> Trang trung tâm (Map of Content) cho môn Xử lý ảnh và video.

**Cập nhật lần cuối:** 2026-08-10
**Trạng thái:** ✅ Chưng cất xong L1→L12 — 64 atomic note, 10 nhánh A–J
**Nguồn:** `D:\MSA-FPT\Image and video processing` — Lecture 0→12 (PDF + bản `.txt`), 9 notebook thực hành
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]]

> 🎯 **Kim chỉ nam:** ảnh chỉ là **ma trận số**. Mọi phép xử lý cổ điển đều rơi vào đúng ba nhóm: đổi **từng điểm** (biến đổi mức xám), đổi **theo lân cận** (tích chập), hoặc đổi **từng tần số** (miền Fourier). Nắm ba nhóm đó thì phần còn lại chỉ là biến thể.

---

## 🧭 Lộ trình đọc

> Nhánh bám sát thứ tự lecture. `` `slug` `` (backtick) = **chưa viết**, `[[slug]]` = đã có note.

**Nhánh A · Ảnh số & biểu diễn (L1–L3)**
1. [[anh-so-la-gi]] — ảnh = ma trận `f(x,y)`; mọi thứ khác là hệ quả
2. [[kieu-anh-va-do-sau-bit]] — nhị phân · xám · RGB · indexed + LUT
3. [[kieu-du-lieu-anh]] — `uint8` vs `double`; ⚠️ **ép kiểu ≠ đổi dải**, lỗi thực hành số 1
4. [[ba-tang-xu-ly-anh]] — low (ảnh→ảnh) · mid (ảnh→đặc trưng) · high (đặc trưng→ý nghĩa)
5. [[he-thi-giac-may]] — pipeline 5 bước MVS, **khung sườn của cả môn**
6. [[lan-can-va-lien-thong]] — lân cận 4/8; nghịch lý liên thông
7. [[khoang-cach-pixel]] — Euclid · D4 (hình thoi) · D8 (hình vuông)

**Nhánh B · Thu nhận & số hoá ảnh (L4)**
1. [[cam-bien-anh]] — CCD vs CMOS; Bayer + demosaicing: ảnh màu **được đoán ra**
2. [[lay-mau-anh]] — rời rạc hoá **toạ độ**; dpi ≠ số pixel
3. [[luong-tu-hoa-anh]] — rời rạc hoá **giá trị**; `L=2^m`; false contouring
4. [[aliasing-anh]] — Nyquist; ⚠️ **thu nhỏ ảnh phải lọc thông thấp trước**
   → 🌉 cùng định lý với `dsp/dinh-ly-lay-mau`, khác ở chỗ 2 chiều thay vì 1

**Nhánh C · Phép toán số học · logic · hình học (L5)**
1. [[phep-toan-so-hoc-anh]] — cộng (dịch histogram) vs nhân (giãn histogram)
2. [[tran-so-anh]] — overflow/underflow bị **kẹp im lặng**; chỉ ép kiểu ở bước cuối
3. [[phep-logic-va-roi]] — AND/OR/XOR + mask; vì sao ROI đổi cả kết quả chứ không chỉ tốc độ
4. [[bien-doi-affine]] — toạ độ đồng nhất; ⚠️ **backward mapping** mới đúng
5. [[noi-suy-anh]] — nearest · bilinear · bicubic; ⚠️ ảnh **nhãn** bắt buộc nearest
   → 🌉 [[dl/data-augmentation]] — augmentation hình học chính là affine + nội suy

**Nhánh D · Biến đổi mức xám & histogram (L6)**
1. [[bien-doi-diem]] — `s = T(r)`: chỉ nhìn chính pixel đó
2. [[anh-am-ban]] — `s = 255−r`; không thêm thông tin, chỉ đổi cách mắt đọc
3. [[bien-doi-log]] — nén dải động; **bắt buộc** khi hiển thị phổ Fourier
4. [[gamma-correction]] — `s = c·r^γ`; vì sao ảnh JPEG **không tuyến tính với ánh sáng**
5. [[bien-doi-tung-khuc]] — kéo giãn tương phản · gray-level slicing
6. [[lut-bang-tra]] — 256 giá trị đầu vào → tính trước, tra bảng
7. [[histogram-anh]] — PMF của mức xám; ⚠️ **vứt sạch thông tin không gian**
8. [[can-bang-histogram]] — CDF làm hàm biến đổi; false contouring
9. [[clahe]] — equalize theo ô + chặn trần tương phản
10. [[dac-ta-histogram]] — ép về phân phối đích qua trạm trung chuyển "phân phối đều"

**Nhánh E · Lọc không gian & phục hồi ảnh (L6–L7)**
1. [[tich-chap-2d]] — kernel trượt trên ảnh; **phép toán trung tâm của cả môn**
   → 🌉 cùng phép toán với `dsp/tich-chap` (1D) và [[dl/phep-tich-chap]] (kernel **học ra**)
2. [[loc-lam-min]] — trung bình · Gaussian; đánh đổi khử nhiễu ↔ giữ cạnh
3. [[loc-trung-vi]] — phi tuyến: khử muối tiêu mà **giữ cạnh sắc**
4. [[lam-sac-net]] — unsharp masking = ảnh gốc + (gốc − bản mờ)
5. [[mo-hinh-suy-hao]] — `g = f∗h + n`, **một phương trình gói cả L7**
6. [[nhieu-anh]] — Gaussian · muối tiêu · Rayleigh · Erlang · tuần hoàn
7. [[uoc-luong-nhieu]] — crop vùng đồng nhất → đọc histogram → ra loại nhiễu
8. [[loc-thong-ke-thu-tu]] — bảng chọn theo nhiễu + bộ lọc **thích nghi**
9. [[fourier-2d]] — phổ ảnh; **pha quan trọng hơn biên độ**
10. [[dinh-ly-tich-chap]] — tích chập ⟷ nhân; ⚠️ bẫy tích chập **vòng**
11. [[loc-tan-so]] — thông thấp/cao · notch; ⚠️ "lý tưởng" là **tệ nhất** (ringing)
12. [[loc-nguoc]] — `F = G/H`; ⚠️ chia cho `H` nhỏ là **nổ**
13. [[wiener-filter]] — lọc ngược **có phanh**, tối thiểu MSE

**Nhánh F · Hình thái học (L8)**
1. [[hinh-thai-hoc]] — ảnh là **tập hợp**; mọi phép đều ghép từ 2 phép nguyên thuỷ
2. [[phan-tu-cau-truc]] — SE quyết định kết quả, như kernel với tích chập
3. [[gian-no-va-co-hep]] — "chạm là nở, lọt là co"
4. [[opening-closing]] — dọn **ngoài** vật vs vá **trong** vật; luỹ đẳng
5. [[top-hat]] — sửa chiếu sáng không đều bằng đường khác hẳn [[clahe]]
6. [[thanh-phan-lien-thong]] — đếm vật thể; ảnh → **danh sách vật đo được**

**Nhánh G · Phát hiện biên (L9)**
1. [[bien-anh-la-gi]] — biên = đạo hàm lớn; đánh đổi làm mịn ↔ định vị
2. [[dao-ham-bac-1-anh]] — Sobel/Prewitt/Roberts; mọi mask có **tổng hệ số = 0**
3. [[laplacian-va-log]] — bậc 2 + Gaussian gộp thành "mũ Mexico"
4. [[canny]] — 4 bước; **non-max suppression** + **hysteresis 2 ngưỡng**
5. [[hough-transform]] — điểm bỏ phiếu cho đường; nối được biên **đứt**

**Nhánh H · Phân đoạn ảnh (L10)**
1. [[phan-doan-anh]] — gián đoạn (nhánh G) vs tương đồng (nhánh H)
2. [[nguong-hoa]] — cần histogram **bimodal**; xem histogram trước
3. [[otsu]] — tự chọn `T`; phân cụm 1D giải bằng vét cạn
4. [[nguong-cuc-bo]] — chuyển từ so sánh **tuyệt đối** sang **tương đối**
5. [[region-growing]] — lan từ seed; ⚠️ rò rỉ qua biên yếu
6. [[watershed]] — địa hình + distance transform → **tách vật dính nhau**
   → 🌉 so với hướng học sâu: [[dl/mask-rcnn]]

**Nhánh I · Ảnh màu (L11)**
1. [[mo-hinh-mau-rgb]] — 3 kênh đủ vì mắt có 3 loại tế bào nón (metamerism)
2. [[cmyk-va-mau-tru]] — mực **hấp thụ**; vì sao ảnh in khác ảnh màn hình
3. [[mo-hinh-mau-hsv]] — **tách tông màu khỏi độ sáng**; ⚠️ Hue là **góc**
4. [[ycbcr]] — tách chói/màu → **chroma subsampling** 4:2:0 của mọi ảnh & video
5. [[gamut-va-quan-ly-mau]] — bộ ba số vô nghĩa nếu thiếu profile; CIELAB & ΔE
6. [[pseudocolor]] — tô màu ảnh xám; ⚠️ **đừng dùng colormap `jet`**

**Nhánh J · Keypoint & video (L12)**
1. [[keypoint-la-gi]] — vì sao phải là **góc**: bài toán khẩu độ
2. [[fast-corner]] — 16 pixel trên vòng tròn; mẹo kiểm tra sớm 4 điểm
3. [[keypoint-tracking]] — 3 giả định của Lucas–Kanade; drift & RANSAC

---

## ⚠️ Lệch giữa kế hoạch cũ và nguồn thật

Bản lộ trình đầu (2026-08-09) vạch 6 nhánh trong đó có **Nén ảnh** và **Video & chuyển động**. Đọc kỹ nguồn thì:

- **Nén ảnh** — L2 chỉ nhắc lossy/lossless một dòng, không có DCT/JPEG.
- **Video & chuyển động** — thuộc Part II, theo lịch nằm ở Session 9, **chưa học**.

Viết note cho hai nhánh đó lúc này là bịa nội dung không có trong tài liệu. Đã **thay bằng nhánh bám sát L1→L12** và đẩy hai nhánh cũ vào [[../../hub/nguon-chua-xu-ly|backlog]] chờ học xong.

---

## 📥 Inbox — chờ chưng cất

> App **không đọc** `_inbox/`. Note ở đây là nguyên liệu thô, chưa lên graph.

| File | Tình trạng | |
|---|---|---|
| `_inbox/ivp-tom-tat-lectures.md` | ✅ **đã tách hết** L1→L12 → nhánh A–J | — |
| `_inbox/ivp-mindmap-mo-rong.md` | ✅ đã dùng hết cho nhánh C + D | — |
| `_inbox/ivp-mindmap.md` | ✅ đã đối chiếu L0–L6 | — |
| `_inbox/ivp-note-tho.md` | ✅ đã đối chiếu L7–L12 (restoration, morphology, edge) | — |

**Chưa lấy được từ nguồn nào** (không có trong 4 file inbox, cần đọc PDF/notebook gốc):
- **Nén ảnh** — DCT, JPEG, PSNR/SSIM (Session 6 theo lịch)
- **Video & chuyển động** — ước lượng chuyển động, optical flow (Session 9)
- Ví dụ code thực hành từ 9 notebook `session1..9.ipynb` → bổ sung vào mục `⚙️ Khi nào dùng` của các note đã có

## ❓ Câu hỏi mở

- Bộ lọc trung vị khử muối tiêu tốt hơn trung bình — chứng minh trực giác thế nào?
- Canny gồm 4 bước; bỏ bước non-maximum suppression thì hỏng ra sao?
- Kernel học được của CNN có tự tìm lại Sobel/Gaussian không?
- Ảnh JPEG đã mã hoá gamma — CNN huấn luyện trên đó đang học ở thang đo nào?

## 🔗 Tài nguyên khác

| Tài nguyên | Mô tả |
|---|---|
| `D:\MSA-FPT\Image and video processing` | Lecture 0→12 PDF + thư mục `_txt` (bản text để grep) |
| `D:\MSA-FPT\Image and video processing\HPH_25MS23323` | 9 notebook thực hành `session1..9.ipynb` |
| `D:\MSA-FPT\Image and video processing\image-super-resolution` | Sub-project siêu phân giải |
| [[../../projects/image-super-resolution\|📦 Project Image Super-Resolution]] | Thẻ project |

## 🔗 Quy ước liên kết

- `[[slug]]` — note cùng vault · `[[dsp/tich-chap]]` — note vault khác (xem `CONVENTIONS.md` §6)
- Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn

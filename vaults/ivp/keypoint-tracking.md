---
slug: keypoint-tracking
title: Theo dõi keypoint qua các khung hình
vault: ivp
type: concept
branch: J
order: 3
status: learning
tags: [ivp, keypoint, video]
prev: [fast-corner]
related: [keypoint-la-gi, phep-toan-so-hoc-anh]
sources: ["L12 — Keypoint Detection"]
created: 2026-08-10
---

# Theo dõi keypoint qua các khung hình

> Tóm tắt 1 câu: bám cùng một điểm qua nhiều khung hình để suy ra **chuyển động** — cửa ngõ từ xử lý ảnh sang xử lý video.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh J · #3 ← cần [[fast-corner]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #keypoint #video

---

## 💡 Ý chính

```
1. Phát hiện keypoint ở khung hình t
2. Tìm lại chính những điểm đó ở khung hình t+1
3. Vector nối hai vị trí = vector chuyển động của điểm đó
4. Từ tập vector → suy ra chuyển động của vật / của camera
```

Hai cách thực hiện bước 2:

| Cách | Làm gì | Hợp khi |
|---|---|---|
| **Tracking** (Lucas–Kanade) | Tìm **quanh** vị trí cũ, giả định dịch chuyển nhỏ | Khung hình liên tiếp, chuyển động chậm |
| **Detect + match** | Phát hiện lại toàn bộ rồi khớp descriptor | Hai ảnh **rời rạc**, góc chụp khác nhau nhiều |

Tracking rẻ hơn nhiều; detect+match bền hơn khi thay đổi lớn.

## 🧩 Ba giả định của Lucas–Kanade

| Giả định | Hỏng khi |
|---|---|
| **Độ sáng không đổi** — cùng một điểm giữ nguyên giá trị qua các khung | Đèn nhấp nháy, tự động phơi sáng của camera đổi, vật đi vào bóng râm |
| **Chuyển động nhỏ** giữa hai khung liên tiếp | Vật chạy nhanh, camera lắc mạnh → dùng kim tự tháp ảnh để bắt chuyển động lớn |
| **Lân cận cùng chuyển động** như nhau | Ngay tại biên giữa hai vật chuyển động khác nhau |

Ba giả định này rất hay bị vi phạm trong video thật — nên tracking luôn cần cơ chế **phát hiện điểm đã mất** và **bổ sung keypoint mới** định kỳ.

Và [[keypoint-la-gi|bài toán khẩu độ]] xuất hiện lại đúng ở đây: theo dõi một điểm nằm trên cạnh thì chỉ suy được thành phần chuyển động **vuông góc cạnh**, thành phần dọc cạnh **không quan sát được**. Đây chính là lý do phải theo dõi **góc** chứ không phải điểm bất kỳ.

## ⚙️ Ứng dụng

| Ứng dụng | Suy ra gì từ vector chuyển động |
|---|---|
| **Chống rung video** | Chuyển động **chung** của mọi keypoint = rung camera → bù ngược lại |
| **AR** | Tư thế camera so với cảnh → neo vật ảo đúng chỗ |
| **SLAM** | Vừa dựng bản đồ 3D vừa định vị robot |
| **Ghép panorama** | Biến đổi hình học giữa hai ảnh, xem [[bien-doi-affine]] |
| **Nén video** | Vector chuyển động cho phép mã hoá khung hình bằng "khối này dịch sang đây" thay vì lưu lại toàn bộ |

Cách đơn giản nhất để bắt chuyển động vẫn là **trừ hai khung hình** — xem [[phep-toan-so-hoc-anh]]. Nhưng phép trừ chỉ cho biết **chỗ nào có thay đổi**, không cho biết **thay đổi theo hướng nào**. Keypoint tracking cho cả hướng và độ lớn.

## ⚠️ Điều dễ nhầm

- **Trôi tích luỹ (drift).** Mỗi bước có sai số nhỏ; bám qua hàng nghìn khung hình thì sai số cộng dồn. Hệ nghiêm túc phải **định kỳ phát hiện lại** hoặc **đóng vòng lặp** (loop closure) khi quay về chỗ cũ.
- **Keypoint biến mất** do bị che khuất, ra khỏi khung, hoặc đổi góc quá nhiều. Phải theo dõi **số điểm còn sống** và bổ sung khi xuống thấp.
- **Khớp sai (outlier) là bình thường**, không phải ngoại lệ. Luôn cần bước lọc bằng **RANSAC** hoặc tương đương trước khi suy ra biến đổi hình học — một cặp khớp sai đủ làm hỏng cả ma trận biến đổi.
- **Chuyển động của keypoint ≠ chuyển động của vật.** Camera dịch cũng làm mọi keypoint dịch. Tách chuyển động camera khỏi chuyển động vật là bài toán riêng.

---

## 🔗 Liên kết
- **Tiền đề:** [[fast-corner]] · [[keypoint-la-gi]]
- **Liên quan:** [[bien-doi-affine]] · [[phep-toan-so-hoc-anh]] · [[noi-suy-anh]]
- **Liên môn:** [[dl/nam-dang-bai-sequence]] — video là dữ liệu chuỗi; đây là chỗ nhánh IVP nối sang xử lý chuỗi bên `dl`.

## ❓ Câu hỏi mở
- Optical flow dày đặc (mọi pixel) so với theo dõi keypoint thưa — khi nào cái nào đáng giá hơn?

## 📚 Nguồn
- Lecture 12 — Keypoint Detection

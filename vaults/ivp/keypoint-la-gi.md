---
slug: keypoint-la-gi
title: Keypoint & góc
vault: ivp
type: concept
branch: J
order: 1
status: learning
tags: [ivp, keypoint]
prev: [pseudocolor]
next: [fast-corner]
related: [bien-anh-la-gi, dao-ham-bac-1-anh]
sources: ["L12 — Keypoint Detection"]
created: 2026-08-10
---

# Keypoint & góc

> Tóm tắt 1 câu: điểm **nhận lại được** dù ảnh đổi góc, đổi cỡ, đổi sáng — và **góc** là loại điểm duy nhất thoả được điều đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh J · #1 ← cần [[pseudocolor]] · → kế tiếp [[fast-corner]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #keypoint

---

## 💡 Vì sao phải là góc

Xét một cửa sổ nhỏ và hỏi: *"dịch cửa sổ đi một chút thì nội dung đổi bao nhiêu?"*

| Loại vùng | Dịch theo hướng nào cũng đổi? | Định vị được không |
|---|---|---|
| **Vùng phẳng** | Không đổi theo **mọi** hướng | ❌ Không biết mình ở đâu |
| **Cạnh** | Đổi khi dịch **vuông góc** cạnh; **không đổi** khi dịch **dọc** cạnh | ⚠️ Chỉ định vị được 1 chiều — **bài toán khẩu độ** |
| **Góc** | Đổi theo **mọi** hướng | ✅ Định vị được **cả hai chiều** |

> 📌 **Bài toán khẩu độ (aperture problem)** là lý do cạnh không dùng làm keypoint được: nhìn qua một lỗ nhỏ vào một đường thẳng đang trượt dọc chính nó, ta **không thấy chuyển động nào cả**. Theo dõi cạnh thì luôn thiếu một chiều thông tin.

Chỉ **góc** cho định vị đầy đủ. Đây cũng là ý tưởng của Harris: xét ma trận moment bậc hai của gradient trong cửa sổ, **hai trị riêng đều lớn** ⟺ góc.

## 🧩 Bốn tính chất một keypoint tốt cần có

| Tính chất | Nghĩa |
|---|---|
| **Lặp lại được** (repeatable) | Chụp lại cùng cảnh khác góc/sáng vẫn tìm ra **đúng điểm đó** |
| **Phân biệt được** (distinctive) | Mô tả xung quanh nó đủ riêng để không nhầm với điểm khác |
| **Định vị chính xác** | Toạ độ ổn định tới mức pixel hoặc dưới pixel |
| **Hiệu quả** | Đủ nhanh cho thời gian thực |

Hai tính chất đầu quan trọng nhất — và chúng **mâu thuẫn nhau**: mô tả càng riêng biệt thì càng nhạy với biến đổi, càng bất biến thì càng dễ trùng lặp.

## ⚙️ Keypoint dùng để làm gì

Keypoint là **mốc neo** để nối hai ảnh với nhau:

| Ứng dụng | Cách dùng |
|---|---|
| **Ghép ảnh panorama** | Khớp keypoint hai ảnh → suy ra [[bien-doi-affine\|phép biến đổi]] → ghép |
| **Theo dõi chuyển động** | Bám keypoint qua các khung hình liên tiếp |
| **AR** | Neo vật ảo vào keypoint của cảnh thật |
| **SLAM** | Robot dựng bản đồ và tự định vị từ keypoint |
| **Đăng ký ảnh y tế** | Khớp hai lần chụp khác thời điểm |

Mọi ứng dụng đều theo cùng một mạch: **phát hiện** keypoint → **mô tả** vùng quanh nó → **khớp** giữa hai ảnh → **suy ra biến đổi hình học**.

## ⚠️ Điều dễ nhầm

- **Phát hiện ≠ mô tả.** Detector tìm *ở đâu* có keypoint; descriptor mã hoá *xung quanh nó trông thế nào* thành một vector để so khớp. Hai việc tách rời và có thể ghép chéo (ví dụ FAST detector + BRIEF descriptor = ORB).
- **Không bất biến vô điều kiện.** Mỗi phương pháp bất biến với một tập biến đổi nhất định: xoay thì hầu hết ổn, đổi tỉ lệ thì cần scale-space (SIFT), đổi góc nhìn mạnh thì gần như phương pháp cổ điển nào cũng gãy.
- **Vùng phẳng và vùng texture lặp lại là kẻ thù.** Tường trắng không có keypoint nào; gạch lát nền có hàng nghìn keypoint **giống hệt nhau** → khớp sai hàng loạt.
- Số keypoint nhiều **không** đồng nghĩa kết quả tốt — chất lượng khớp mới quan trọng.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-anh-la-gi]] · [[dao-ham-bac-1-anh]]
- **Dẫn tới:** [[fast-corner]] · [[keypoint-tracking]]
- **Liên quan:** [[bien-doi-affine]] · [[laplacian-va-log]]
- **Liên môn:** [[dl/metric-learning-la-gi]] — descriptor học được thay cho descriptor thiết kế tay; cùng mục tiêu "vector gần nhau ⟺ cùng một thứ".

## ❓ Câu hỏi mở
- Bài toán khẩu độ có biến mất khi dùng CNN không, hay chỉ bị giấu đi?

## 📚 Nguồn
- Lecture 12 — Keypoint Detection

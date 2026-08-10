---
slug: canny
title: Canny — dò biên 4 bước
vault: ivp
type: concept
branch: G
order: 4
status: learning
tags: [ivp, bien]
prev: [laplacian-va-log]
next: [hough-transform]
related: [dao-ham-bac-1-anh, bien-anh-la-gi]
sources: ["L9 — Edge Detection"]
created: 2026-08-10
---

# Canny — dò biên 4 bước

> Tóm tắt 1 câu: bộ dò biên tốt nhất trong họ cổ điển, vì nó **giải quyết cả ba vấn đề** mà các phương pháp trước bỏ ngỏ: nhiễu, biên dày, và ngưỡng.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #4 ← cần [[laplacian-va-log]] · → kế tiếp [[hough-transform]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #bien

---

## 💡 Bốn bước

| # | Bước | Giải quyết vấn đề gì |
|---|---|---|
| 1 | **Làm mịn Gaussian** (`σ`) | Nhiễu bị đạo hàm khuếch đại |
| 2 | **Tính gradient** (Sobel) — độ lớn **và hướng** | Tìm ứng viên biên |
| 3 | **Non-maximum suppression** | Biên **dày** → mảnh hoá còn **1 pixel** |
| 4 | **Hysteresis 2 ngưỡng** + nối | Một ngưỡng thì hoặc sót hoặc thừa |

Ba bước đầu các phương pháp khác ít nhiều cũng có. **Bước 3 và 4 là đóng góp riêng của Canny**, và cũng là lý do nó thắng.

## 🧩 Bước 3 — Non-maximum suppression

**Vấn đề:** ảnh gradient cho biên **dày vài pixel** (do biên thật là ramp). Ta muốn đúng một đường mảnh.

**Cách làm:** tại mỗi pixel, nhìn theo **hướng gradient** (vuông góc với biên) và so với **hai hàng xóm** theo hướng đó:
- Là **cực đại cục bộ** → giữ.
- Không phải → **xoá về 0**.

Kết quả: chỉ **đỉnh** của "sườn núi gradient" sống sót → biên mảnh đúng 1 pixel.

> 📌 Đây là lý do bước 2 phải tính **cả hướng** chứ không chỉ độ lớn. Bỏ bước này thì Canny thoái hoá thành Sobel + ngưỡng, biên dày và nhoè.

Hướng gradient thường được làm tròn về 4 hướng (`0°, 45°, 90°, 135°`) để tra hàng xóm cho gọn.

## 🧩 Bước 4 — Hysteresis với hai ngưỡng

**Vấn đề của một ngưỡng:**

| Ngưỡng | Hậu quả |
|---|---|
| Cao | Chỉ giữ biên mạnh → biên thật bị **đứt đoạn** ở chỗ mờ |
| Thấp | Giữ được biên yếu → nhưng **đầy biên nhiễu** |

**Giải pháp — dùng cả hai:**

| Độ lớn gradient | Phân loại | Xử lý |
|---|---|---|
| `> T_high` | **Strong** | **Chắc chắn là biên** — giữ |
| `T_low .. T_high` | **Weak** | Giữ **chỉ khi** nối được (qua chuỗi pixel weak) tới một pixel strong |
| `< T_low` | Nhiễu | Loại |

Ý tưởng cốt lõi: **biên thật thì liên tục**. Một pixel yếu nằm trên đường nối tiếp biên mạnh thì rất có thể là biên thật đang mờ đi; còn pixel yếu đứng lẻ loi giữa đồng trống thì gần như chắc chắn là nhiễu.

→ Ta dùng **thông tin ngữ cảnh không gian** thay vì chỉ nhìn giá trị từng pixel. Đó là bước tiến khái niệm quan trọng nhất của Canny.

Tỉ lệ khuyến nghị `T_high : T_low ≈ 2:1` đến `3:1`.

## ⚙️ Ba tham số

| Tham số | Tăng lên thì |
|---|---|
| `σ` | Ít nhiễu hơn, nhưng **mất chi tiết nhỏ** và biên **dịch vị trí** |
| `T_high` | Ít biên giả, nhưng **sót** biên mờ |
| `T_low` | Biên liền mạch hơn, nhưng **nhiễu lọt vào** |

## ⚠️ Điều dễ nhầm

- **Bỏ non-maximum suppression** → biên dày, nhoè, không dùng được cho [[hough-transform]] (mỗi biên đóng góp nhiều điểm → phiếu bầu bị nhân lên sai lệch).
- **Canny vẫn không cho đường bao khép kín.** Kết quả là các đoạn biên, có thể vẫn đứt. Muốn đường thẳng hoàn chỉnh thì nối bằng Hough.
- **Không tồn tại bộ tham số dùng chung cho mọi ảnh.** Đây là hạn chế thật sự trong ứng dụng thực tế — nếu ảnh đầu vào đa dạng thì phải chỉnh thích nghi.
- **Canny làm trên ảnh xám.** Với ảnh màu, chạy từng kênh rồi gộp cho kết quả khác với chuyển xám rồi chạy — và không có cách nào "đúng" hiển nhiên.

---

## 🔗 Liên kết
- **Tiền đề:** [[dao-ham-bac-1-anh]] · [[laplacian-va-log]] · [[loc-lam-min]]
- **Dẫn tới:** [[hough-transform]]
- **Liên quan:** [[bien-anh-la-gi]] · [[phan-doan-anh]]

## ❓ Câu hỏi mở
- Hysteresis dùng "biên thì liên tục" làm tiên nghiệm — còn tiên nghiệm nào khác về ảnh tự nhiên khai thác được kiểu tương tự?

## 📚 Nguồn
- Lecture 9 — Edge Detection

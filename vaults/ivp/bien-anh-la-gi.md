---
slug: bien-anh-la-gi
title: Biên ảnh là gì
vault: ivp
type: concept
branch: G
order: 1
status: learning
tags: [ivp, bien]
prev: [thanh-phan-lien-thong]
next: [dao-ham-bac-1-anh]
related: [dao-ham-bac-1-anh, canny]
sources: ["L9 — Edge Detection"]
created: 2026-08-10
---

# Biên ảnh là gì

> Tóm tắt 1 câu: biên = nơi cường độ **biến thiên mạnh** — nên tìm biên chính là tìm chỗ **đạo hàm lớn**, và mọi thuật toán dò biên đều là một cách xấp xỉ đạo hàm.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #1 ← cần [[thanh-phan-lien-thong]] · → kế tiếp [[dao-ham-bac-1-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #bien

---

## 💡 Ý chính

**Biên** là ranh giới giữa hai vùng khác nhau về đặc trưng (mức xám, màu, texture). Trên ảnh nó thể hiện thành **biến thiên cường độ mạnh trong khoảng ngắn**.

Từ đó suy ra công cụ: **đạo hàm**.

| Bậc đạo hàm | Ở vị trí biên | Cách dùng |
|---|---|---|
| **Bậc 1** (gradient) | Đạt **cực đại** | Tìm đỉnh → [[dao-ham-bac-1-anh]] |
| **Bậc 2** (Laplacian) | **Đổi dấu** (zero-crossing) | Tìm chỗ cắt 0 → [[laplacian-va-log]] |

Bậc 2 định vị **chính xác tâm biên** hơn (điểm cắt 0 là một điểm duy nhất, còn đỉnh của bậc 1 có thể tù), nhưng **nhạy nhiễu hơn hẳn** vì đạo hàm hai lần khuếch đại nhiễu hai lần.

## 🧩 Bốn kiểu biên

| Kiểu | Mặt cắt cường độ | Gặp ở |
|---|---|---|
| **Bậc thang** (step) | Nhảy dứt khoát | Lý tưởng, hiếm có trong ảnh thật |
| **Dốc** (ramp) | Chuyển dần qua vài pixel | **Phổ biến nhất** — do làm mờ quang học |
| **Mái nhà** (roof) | Lên rồi xuống | Đường mảnh, dây điện |
| **Đường** (line) | Gai hẹp | Nét bút, vết nứt |

Biên thật gần như luôn là **ramp** vì ống kính và cảm biến đều làm nhoè. Độ rộng ramp cho biết ảnh mờ cỡ nào.

## ⚙️ Ba bước chuẩn của dò biên

```
1. Khử nhiễu        → làm mịn trước, BẮT BUỘC
2. Dò điểm biên     → tính gradient, lấy ngưỡng
3. Định vị & nối    → mảnh hoá, nối đoạn đứt (Hough)
```

**Bước 1 không phải tuỳ chọn.** Đạo hàm **khuếch đại tần số cao**, mà nhiễu chính là tần số cao. Dò biên trên ảnh chưa lọc thì kết quả là một màn hình đầy điểm nhiễu, biên thật chìm trong đó.

Nhưng làm mịn cũng **làm mờ biên** → đây là đánh đổi trung tâm của nhánh này:

> **Làm mịn ít → nhiễu lọt vào. Làm mịn nhiều → biên nhoè và dịch vị trí.**

Tham số `σ` của Gaussian chính là núm điều khiển đánh đổi đó. [[laplacian-va-log|LoG]] và [[canny]] đều giải quyết bằng cách **gộp làm mịn vào thuật toán** thay vì coi là bước rời.

## ⚠️ Điều dễ nhầm

- **Biên ≠ đường bao vật thể.** Dò biên cho ra **những đoạn biên rời rạc**, không phải đường khép kín quanh vật. Muốn có vùng khép kín thì cần [[phan-doan-anh]] — đây là hai hướng khác nhau, xuất phát từ hai tính chất "gián đoạn" và "tương đồng".
- **Không phải mọi biên đều đáng quan tâm.** Bóng đổ, vệt sáng, texture đều tạo biên hợp lệ về mặt toán học nhưng vô nghĩa về mặt ngữ nghĩa. Thuật toán cổ điển **không phân biệt được** — đây là giới hạn căn bản, và là chỗ học sâu vượt lên.
- **Ngưỡng quyết định kết quả.** Ngưỡng cao → sót biên mờ; ngưỡng thấp → đầy biên giả. [[canny]] xử lý bằng **hai ngưỡng** thay vì một.

---

## 🔗 Liên kết
- **Tiền đề:** [[thanh-phan-lien-thong]] · [[tich-chap-2d]]
- **Dẫn tới:** [[dao-ham-bac-1-anh]] · [[laplacian-va-log]]
- **Liên quan:** [[loc-lam-min]] · [[phan-doan-anh]]
- **Liên môn:** [[dl/filter-va-feature-map]] — tầng đầu của CNN học ra chính những bộ dò biên này, nhưng học tiếp cả biên nào **có ý nghĩa**.

## ❓ Câu hỏi mở
- Con người phân biệt biên vật thật với biên do bóng đổ tức thì — máy cần thông tin gì để làm được?

## 📚 Nguồn
- Lecture 9 — Edge Detection

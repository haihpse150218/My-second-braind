---
slug: fast-corner
title: FAST corner detector
vault: ivp
type: concept
branch: J
order: 2
status: learning
tags: [ivp, keypoint]
prev: [keypoint-la-gi]
next: [keypoint-tracking]
related: [keypoint-la-gi]
sources: ["L12 — Keypoint Detection"]
created: 2026-08-10
---

# FAST corner detector

> Tóm tắt 1 câu: thay vì tính gradient và trị riêng, chỉ **so sánh độ sáng trên một vòng tròn 16 pixel** — nhanh tới mức chạy được thời gian thực trên điện thoại.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh J · #2 ← cần [[keypoint-la-gi]] · → kế tiếp [[keypoint-tracking]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #keypoint

---

## 💡 Ý chính

Tên viết tắt: **F**eatures from **A**ccelerated **S**egment **T**est.

```
1. Xét pixel p có độ sáng I_p, và ngưỡng t
2. Lấy vòng tròn Bresenham 16 pixel bán kính 3 quanh p
3. Nếu tồn tại N pixel LIÊN TIẾP trên vòng mà TẤT CẢ:
       sáng hơn  I_p + t      HOẶC      tối hơn  I_p − t
   → p là một góc
   (thường N = 9 hoặc 12)
```

**Không** đạo hàm, **không** ma trận, **không** trị riêng — chỉ **so sánh và đếm**.

## 🧩 Vì sao "N pixel liên tiếp" lại đúng nghĩa là góc

| Loại vùng | Vòng tròn quanh nó trông thế nào |
|---|---|
| **Vùng phẳng** | Mọi pixel xấp xỉ `I_p` → **không có** chuỗi nào sáng/tối hơn |
| **Cạnh** | Đúng **một nửa** vòng sáng hơn, nửa kia tối hơn → chuỗi dài ~8, **chưa đủ 12** |
| **Góc** | Một **cung** lớn khác biệt → chuỗi dài ≥ 12 ✅ |

Con số `N = 12` được chọn chính vì nó lớn hơn 8 — đủ để loại cạnh mà vẫn nhận góc.

## ⚙️ Mẹo tăng tốc — kiểm tra sớm

Đây là chỗ chữ "Accelerated" đến từ:

Với `N = 12`, chỉ cần kiểm **4 pixel ở 4 hướng chính** (trên, phải, dưới, trái) trước:
- Muốn có 12 pixel liên tiếp trong 16 thì **ít nhất 3 trong 4 điểm này** phải cùng sáng hơn hoặc cùng tối hơn.
- Không thoả → **loại ngay**, không cần xét 12 pixel còn lại.

Phần lớn pixel trong ảnh là vùng phẳng → bị loại sau **4 phép so sánh**. Đây là lý do FAST nhanh hơn Harris cả chục lần.

## ⚠️ Nhược điểm và cách vá

| Nhược điểm | Cách vá |
|---|---|
| Phát hiện **nhiều góc dính chùm** quanh cùng một góc thật | **Non-maximum suppression** — chấm điểm mỗi góc rồi giữ cực đại cục bộ (cùng ý tưởng với [[canny]]) |
| **Không bất biến tỉ lệ** — góc ở ảnh phóng to không còn là góc trên vòng bán kính 3 | Chạy trên **kim tự tháp ảnh** nhiều tỉ lệ |
| **Không có hướng** → không bất biến xoay | ORB gán hướng bằng **trọng tâm cường độ** của vùng lân cận |
| **Nhạy nhiễu** — chỉ so sánh, không trung bình hoá | Làm mịn nhẹ trước; tăng ngưỡng `t` |
| **Chỉ là detector**, không mô tả | Ghép với descriptor: **FAST + BRIEF = ORB** |

**ORB** (Oriented FAST and Rotated BRIEF) là bản vá gộp cả ba vấn đề trên, và là lựa chọn mặc định thực tế khi cần nhanh + không vướng bản quyền như SIFT/SURF.

## ⚠️ Điều dễ nhầm

- **Ngưỡng `t` quyết định số lượng góc.** `t` nhỏ → hàng vạn góc, phần lớn là nhiễu; `t` lớn → chỉ còn góc tương phản mạnh. Không có giá trị chung cho mọi ảnh.
- **FAST đơn thuần không dùng để khớp ảnh được** — thiếu descriptor thì không biết góc này ở ảnh A tương ứng góc nào ở ảnh B.
- **Nhanh không đồng nghĩa tốt hơn.** SIFT bất biến tốt hơn nhiều và khớp chính xác hơn; FAST/ORB đổi độ chính xác lấy tốc độ. Chọn theo ràng buộc thời gian thực hay không.

---

## 🔗 Liên kết
- **Tiền đề:** [[keypoint-la-gi]]
- **Dẫn tới:** [[keypoint-tracking]]
- **Liên quan:** [[canny]] · [[dao-ham-bac-1-anh]]

## ❓ Câu hỏi mở
- Bài báo gốc dùng học máy (decision tree) để tự sinh thứ tự kiểm tra pixel tối ưu — cây đó học được gì mà con người không nghĩ ra?

## 📚 Nguồn
- Lecture 12 — Keypoint Detection

---
slug: pooling
title: Pooling — 5 mục đích
vault: dl
type: concept
branch: B
order: 5
status: done
tags: [dl, cnn]
prev: [stride-padding]
next: [kien-truc-cnn-4-tang]
created: 2026-08-02
---

# Pooling — 5 mục đích

> Tóm tắt 1 câu: Không chỉ để giảm kích thước — đó là mục đích dễ thấy nhất nhưng không phải duy nhất.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #5 ← cần [[stride-padding]] · → kế tiếp [[kien-truc-cnn-4-tang]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn

---

## 💡 5 mục đích

1. **Giảm kích thước** feature map ⇒ giảm tính toán và bộ nhớ
2. **Giảm số tham số** ở các tầng sau ⇒ chống overfit
3. **Bất biến tịnh tiến cục bộ** — vật dịch vài pixel vẫn ra kết quả như cũ
4. **Mở rộng receptive field** nhanh hơn ⇒ tầng sau "nhìn" được vùng rộng hơn
5. **Giữ đặc trưng mạnh nhất** (max pooling) ⇒ lọc nhiễu

## ⚙️ Các loại

| Loại | Làm gì | Dùng ở |
|---|---|---|
| **Max pooling** | Lấy giá trị **lớn nhất** trong cửa sổ | Phổ biến nhất, giữa mạng |
| **Average pooling** | Lấy **trung bình** | Ít dùng giữa mạng |
| **Global Average Pooling (GAP)** ⭐ | Trung bình **cả feature map** → 1 số / channel | **Thay FC head** → xem [[flatten-vs-gap]] |

Pooling **không có tham số học** — chỉ là phép chọn/trung bình.

## ⚠️ Lỗi thường gặp

Pool quá nhiều lần → feature map teo còn `1×1` quá sớm, mất hết thông tin không gian. Đếm trước bằng `model.summary()`.

Bài **segmentation/detection cần vị trí chính xác** → pooling nhiều là có hại; đó là lý do các kiến trúc này dùng [[fpn]] hoặc upsampling để lấy lại độ phân giải.

---

## 🔗 Liên kết
- **Tiền đề:** [[stride-padding]]
- **Dẫn tới:** [[kien-truc-cnn-4-tang]] · [[flatten-vs-gap]]

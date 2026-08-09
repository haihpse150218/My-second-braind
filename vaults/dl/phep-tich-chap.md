---
slug: phep-tich-chap
title: Phép tích chập (Convolution)
vault: dl
type: concept
branch: B
order: 2
status: done
tags: [dl, cnn]
prev: [vi-sao-can-cnn]
next: [filter-va-feature-map]
created: 2026-08-02
---

# Phép tích chập (Convolution)

> Tóm tắt 1 câu: Trượt một cửa sổ nhỏ khắp ảnh, mỗi vị trí làm **nhân từng phần tử rồi cộng lại** thành 1 số.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #2 ← cần [[vi-sao-can-cnn]] · → kế tiếp [[filter-va-feature-map]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn

---

## 🔢 Cơ chế 1 bước conv

```
1. Đặt filter (kernel) lên một vùng của ảnh
2. Nhân từng phần tử tương ứng
3. Cộng tất cả lại + bias  →  1 số duy nhất
4. Trượt sang vị trí kế tiếp, lặp lại
```

Kết quả: một **feature map** — bản đồ cho biết đặc trưng đó xuất hiện mạnh ở đâu.

## 🔢 Công thức kích thước đầu ra

```
out = ⌊(in − k + 2p) / s⌋ + 1
```
`k` = kernel size · `p` = padding · `s` = stride

## ⚙️ Quy ước thực chiến

- Filter **3×3**, nhân đôi số filter mỗi block: `32 → 64 → 128`
- **Filter lẻ** (3, 5, 7) để có tâm rõ ràng — tránh filter lớn
- Thứ tự chuẩn: **`Conv → BN → ReLU`**

## ⚠️ Lỗi thường gặp

- ⚠️ **Preprocessing phải đồng nhất CẢ dataset**: cùng kích thước, cùng cách chuẩn hoá.
- **Resize về cùng kích thước** là bắt buộc nếu có FC layer.
- `print(model.summary())` → **đọc cột Output Shape**, kiểm tra shape teo đúng như tính.

---

## 🔗 Liên kết
- **Tiền đề:** [[vi-sao-can-cnn]]
- **Dẫn tới:** [[filter-va-feature-map]] · [[stride-padding]]

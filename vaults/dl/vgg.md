---
slug: vgg
title: VGG (2014)
vault: dl
type: concept
branch: B
order: 10
status: done
tags: [dl, cnn, kien-truc]
prev: [alexnet]
next: [resnet]
created: 2026-08-02
---

# VGG (2014)

> Tóm tắt 1 câu: Chỉ dùng `3×3` xếp chồng — rẻ hơn mà phủ bằng filter lớn, nhưng **FC head làm nó phình 138M param**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #10 ← cần [[alexnet]] · → kế tiếp [[resnet]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #kien-truc

---

## 🔑 Vì sao chỉ dùng 3×3 (slide chỉ vẽ sơ đồ, không giải thích)

- Xếp **2 tầng 3×3** = receptive field **5×5**; **3 tầng 3×3** ≈ **7×7**
- **Param**: 2 tầng 3×3 = `2·9C² = 18C²` **<** 1 tầng 5×5 = `25C²`
  ⇒ **rẻ hơn mà phủ bằng**
- Được thêm **1–2 lần phi tuyến (ReLU)** ở giữa ⇒ hàm biểu diễn **giàu hơn**

🔗 Nối về nguyên tắc *"ưu tiên filter lẻ, tránh filter lớn"* ở [[phep-tich-chap]].

## ⚠️ VGG nặng vì FC head

FC `4096-4096-1000` chiếm **~90% tham số** của VGG (~**138M** param cho VGG16).

→ Đúng cảnh báo: **nhiều param ở FC ≠ học nhiều hơn**, chủ yếu gây overfit.
→ [[resnet]] bỏ FC khổng lồ, dùng **GAP** ⇒ nhẹ hơn nhiều dù **sâu gấp ~8 lần**.

## ⚙️ Vẫn dùng làm gì

VGG16 hay được dùng làm **encoder** cho bài khác vì kiến trúc đơn giản, feature dễ hiểu — ví dụ [[image-captioning]] (cắt bỏ `FC-1000` + `softmax`, lấy `FC-4096`).

---

## 🔗 Liên kết
- **Tiền đề:** [[alexnet]] · [[filter-va-feature-map]]
- **Dẫn tới:** [[resnet]]
- **Liên quan tới:** [[flatten-vs-gap]] · [[image-captioning]]

---
slug: kien-truc-cnn-4-tang
title: 4 tầng của một CNN
vault: dl
type: concept
branch: B
order: 6
status: done
tags: [dl, cnn]
prev: [pooling]
next: [flatten-vs-gap]
created: 2026-08-02
---

# 4 tầng của một CNN

> Tóm tắt 1 câu: `Conv → Activation → Pooling` lặp lại nhiều block, rồi `FC head` ở cuối.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #6 ← cần [[pooling]] · → kế tiếp [[flatten-vs-gap]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/viic-image-captioning|📦 viic-image-captioning]] · [[../../projects/image-super-resolution|📦 image-super-resolution]] · [[../../projects/dsp-urbansound|📦 dsp-urbansound]]
**Tags:** #dl #cnn

---

## 💡 Cấu trúc

```
[Conv → BN → ReLU → Pool] × N   →   Flatten/GAP   →   Dense   →   output
└──────── phần trích đặc trưng ────┘   └──── phần phân loại ────┘
```

| Tầng | Vai trò |
|---|---|
| **Convolutional** | Trích đặc trưng |
| **Activation (ReLU)** | Tạo phi tuyến — xem [[ham-kich-hoat]] |
| **Pooling** | Giảm chiều, tăng bất biến |
| **Fully Connected** | Ra quyết định cuối |

## ⚙️ Quy ước dựng model

- Kiến trúc **thẳng 1 input 1 output** → `Sequential`. Có **skip/nhánh/đa input** → **`Functional`** (bắt buộc)
- **Giữ 2D suốt phần conv**, chỉ `Flatten` ở cuối
- Thứ tự chuẩn: **`Conv → BN → ReLU`**
- Nhân đôi số filter mỗi block: `32 → 64 → 128`
- Đếm param: **FC head có chiếm quá nhiều không?**

## 🪜 Baseline rồi mới nâng

`CNN nhỏ 2–3 block` → `thêm block/filter` → `transfer learning` → `fine-tune`.

---

## 🔗 Liên kết
- **Tiền đề:** [[pooling]]
- **Dẫn tới:** [[flatten-vs-gap]] · [[lenet]]
- **Liên quan tới:** [[quy-trinh-9-buoc]]

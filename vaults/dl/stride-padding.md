---
slug: stride-padding
title: Stride & Padding
vault: dl
type: concept
branch: B
order: 4
status: done
tags: [dl, cnn]
prev: [filter-va-feature-map]
next: [pooling]
created: 2026-08-02
---

# Stride & Padding

> Tóm tắt 1 câu: Hai núm điều khiển kích thước đầu ra — stride quyết định bước nhảy, padding quyết định có giữ nguyên kích thước không.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #4 ← cần [[filter-va-feature-map]] · → kế tiếp [[pooling]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn

---

## 💡 Ý chính

| | Là gì | Tác dụng |
|---|---|---|
| **Stride `s`** | Bước nhảy của filter | `s=2` ⇒ output **giảm một nửa** |
| **Padding `p`** | Đệm viền quanh ảnh | `'same'` ⇒ **giữ nguyên** kích thước · `'valid'` ⇒ **teo dần** |

```
out = ⌊(in − k + 2p) / s⌋ + 1
```

## ⚙️ Vì sao cần padding

Không padding thì:
- Ảnh **teo dần** mỗi tầng → giới hạn độ sâu mạng
- **Pixel ở viền bị quét ít lần hơn** pixel ở giữa → thông tin biên bị thiệt

## ⚠️ Lỗi thường gặp

🚩 **Stride tích luỹ là lý do vật nhỏ biến mất.** Backbone stride tổng 32 ⇒ vật `< 32px` **mất hẳn** ở `conv5`. Đây là bệnh mà [[fpn]] sinh ra để chữa.

Tính stride tích luỹ = **tích** stride của mọi tầng phía trước, không phải tổng.

---

## 🔗 Liên kết
- **Tiền đề:** [[filter-va-feature-map]]
- **Dẫn tới:** [[pooling]] · [[fpn]]

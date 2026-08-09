---
slug: selective-search
title: Selective Search
vault: dl
type: concept
branch: C
order: 5
status: done
tags: [dl, detection]
prev: [vi-sao-multi-object-kho]
next: [rcnn]
created: 2026-08-02
---

# Selective Search

> Tóm tắt 1 câu: Gộp dần superpixel giống nhau để đẻ ra ~2000 vùng khả nghi — thuật toán **thủ công, không học được**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #5 ← cần [[vi-sao-multi-object-kho]] · → kế tiếp [[rcnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Cách hoạt động (slide chỉ nói "blobby")

1. Phân đoạn ảnh thành **superpixel**
2. **Gộp dần** các vùng giống nhau theo **màu · kết cấu · kích thước · độ khít**
3. **Ghi lại box ở MỌI bước gộp** → ra proposal ở **nhiều scale**

Kết quả: **~2000 proposal**, mất **vài giây trên CPU**.

## ⚠️ Nút thắt

⇒ Thuật toán **thủ công, không học được**. Đó chính là lý do:
- Nó trở thành **cổ chai** khi [[fast-rcnn]] đã tăng tốc phần CNN
- **RPN** ([[faster-rcnn]]) thay thế được và **tốt hơn** — vì RPN học từ data

---

## 🔗 Liên kết
- **Tiền đề:** [[vi-sao-multi-object-kho]]
- **Dẫn tới:** [[rcnn]] · [[faster-rcnn]]

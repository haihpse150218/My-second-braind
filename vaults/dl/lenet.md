---
slug: lenet
title: LeNet (1998)
vault: dl
type: concept
branch: B
order: 8
status: done
tags: [dl, cnn, kien-truc]
prev: [flatten-vs-gap]
next: [alexnet]
created: 2026-08-02
---

# LeNet (1998)

> Tóm tắt 1 câu: CNN nổi tiếng đầu tiên — đã có đủ `Conv → Pool → FC`, chỉ thiếu ReLU và quy mô.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #8 ← cần [[flatten-vs-gap]] · → kế tiếp [[alexnet]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #kien-truc

---

## 💡 Kiến trúc

```
input 32×32 → Conv → Pool → Conv → Pool → FC → FC → output 10
```

Bài toán gốc: nhận dạng **chữ số viết tay** (MNIST, séc ngân hàng).

## 🧩 Vì sao đáng nhớ

Nó đã có **đúng bộ khung** mà mọi CNN sau này dùng lại ([[kien-truc-cnn-4-tang]]). Thiếu 3 thứ để bùng nổ:

| Thiếu | Được bù bởi |
|---|---|
| **ReLU** (dùng sigmoid/tanh) | [[alexnet]] 2012 |
| **Dữ liệu lớn** | ImageNet |
| **GPU** | CUDA |

📌 Ý tưởng có từ 1998 nhưng phải đợi **14 năm** mới có đủ 3 điều kiện trên — bài học về việc *"thuật toán tốt chưa đủ"*.

---

## 🔗 Liên kết
- **Tiền đề:** [[flatten-vs-gap]]
- **Dẫn tới:** [[alexnet]]

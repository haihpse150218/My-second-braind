---
slug: perceptron
title: Perceptron — đơn vị nhỏ nhất
vault: dl
type: concept
branch: A
order: 2
status: done
tags: [dl, nen-tang]
prev: [hoc-sau-la-gi]
next: [ham-kich-hoat]
created: 2026-08-02
---

# Perceptron — đơn vị nhỏ nhất

> Tóm tắt 1 câu: Tổ hợp tuyến tính `Σwx + b` rồi qua một hàm kích hoạt — đúng bằng một **logistic regression**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #2 ← cần [[hoc-sau-la-gi]] · → kế tiếp [[ham-kich-hoat]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 🔢 Công thức

```
z = Σᵢ wᵢxᵢ + b          ← tổ hợp tuyến tính
a = f(z)                  ← hàm kích hoạt
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `w` | trọng số — **cái được học** |
| `b` | bias — dịch ngưỡng kích hoạt |
| `f` | [[ham-kich-hoat]] |

## 🧩 Trực giác

📌 **Một neuron với sigmoid = đúng một logistic regression.**
Mạng nơ-ron chỉ là **rất nhiều logistic regression xếp chồng và nối với nhau** — hiểu vậy thì hết thấy huyền bí.

Xếp nhiều neuron thành **tầng (layer)**, nhiều tầng thành **MLP** (Multi-Layer Perceptron).

## ⚠️ Lỗi thường gặp

Quên bias. Không có `b` thì mọi siêu phẳng phân tách **bắt buộc đi qua gốc toạ độ** — mất một bậc tự do quan trọng.

---

## 🔗 Liên kết
- **Tiền đề:** [[hoc-sau-la-gi]]
- **Dẫn tới:** [[ham-kich-hoat]] · [[forward-pass]]

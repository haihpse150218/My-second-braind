---
slug: ham-kich-hoat
title: Hàm kích hoạt — vì sao BẮT BUỘC phi tuyến
vault: dl
type: concept
branch: A
order: 3
status: done
tags: [dl, nen-tang]
prev: [perceptron]
next: [relu-vs-sigmoid]
created: 2026-08-02
---

# Hàm kích hoạt — vì sao BẮT BUỘC phi tuyến

> Tóm tắt 1 câu: Không có activation thì chồng 100 tầng vẫn **thu gọn về đúng 1 tầng tuyến tính** — độ sâu thành vô nghĩa.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #3 ← cần [[perceptron]] · → kế tiếp [[relu-vs-sigmoid]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 🔢 Chứng minh

```
Không activation:
   W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂) = W'x + b'
```

⇒ **Chồng 100 lớp vẫn thu gọn về ĐÚNG 1 lớp tuyến tính.**
⇒ **Activation là thứ CHẶN phép thu gọn đó lại.**

## ⚠️ Bẫy: *"ReLU trông tuyến tính mà, sao tạo được phi tuyến?"*

ReLU **tuyến tính TỪNG KHÚC** nhưng **KHÔNG tuyến tính toàn cục** — **chỗ gãy tại 0 chính là phi tuyến**.

Chứng minh: chỉ **3 ReLU** dựng được cái "bướu" tam giác
```
f(x) = relu(x) − 2·relu(x−1) + relu(x−2)

x =  0   0.5   1    1.5   2    3
f =  0   0.5   1    0.5   0    0
```
Hàm tuyến tính **không làm được** hình này. Ghép nhiều bướu → xấp xỉ hàm liên tục bất kỳ (**universal approximation**).

📌 ReLU đạt được điều đó bằng **công cụ TỐI THIỂU: một chỗ gãy**.

## ⚙️ Chọn activation ở đâu

| Vị trí | Dùng |
|---|---|
| **Hidden layer** | **ReLU** (mặc định) |
| Output **nhị phân** | `sigmoid` |
| Output **đa lớp** | `softmax` |
| Output **regression** | không có activation |

---

## 🔗 Liên kết
- **Tiền đề:** [[perceptron]]
- **Dẫn tới:** [[relu-vs-sigmoid]]

---
slug: center-loss
title: "Center Loss (2016) — dùng KÈM, không dùng một mình"
vault: dl
type: concept
branch: D
order: 10
status: done
tags: [dl, metric-learning, loss, face]
prev: [infonce-ntxent]
next: [arcface-cosface-sphereface]
created: 2026-08-02
---

# Center Loss (2016) — dùng KÈM, không dùng một mình

> Tóm tắt 1 câu: Kéo mẫu về **tâm lớp** của nó — nhưng chỉ có lực **KÉO VÀO**, không có lực **ĐẨY RA**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #10 ← cần [[infonce-ntxent]] · → kế tiếp [[arcface-cosface-sphereface]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss #face

---

## 🔢 Công thức

```
L = L_softmax  +  λ · ½ Σ ‖f(xᵢ) − c_{yᵢ}‖²
                            └──────────────┘
                  kéo mẫu về TÂM LỚP của nó
                  (c cập nhật dần theo batch)
```

## ⚠️ Vì sao BẮT BUỘC dùng kèm softmax

**Chỉ có lực KÉO VÀO, không có lực ĐẨY RA.**

Dùng một mình → nghiệm tối ưu là **mọi embedding và mọi tâm sụp về cùng 1 điểm** (loss = 0 mà vô dụng). **Softmax lo phần đẩy.**

📌 Cùng dạng thất bại "sập về nghiệm suy biến" đã gặp ở [[hard-negative-mining]].

## 🧩 Đây là bước chuyển sang họ B

Center loss là **note đầu tiên của họ "so mẫu ↔ proxy của lớp"**: thay vì so mẫu với mẫu (phải đào cặp), so mẫu với **một đại diện của lớp** (`c_y`).

→ Ý này được đẩy tới cùng ở [[arcface-cosface-sphereface]], nơi **weight `W_j` của lớp softmax** đóng luôn vai proxy.

## ⚠️ Lỗi thường gặp

`λ` là siêu tham số thật — cùng vấn đề "2 loss khác thang" ở [[multitask-loss]].

---

## 🔗 Liên kết
- **Tiền đề:** [[infonce-ntxent]] · [[metric-learning-la-gi]]
- **Dẫn tới:** [[arcface-cosface-sphereface]]

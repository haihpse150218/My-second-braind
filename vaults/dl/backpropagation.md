---
slug: backpropagation
title: Backpropagation
vault: dl
type: concept
branch: A
order: 9
status: done
tags: [dl, nen-tang]
prev: [cac-loai-gradient-descent]
next: [vanishing-gradient]
created: 2026-08-02
---

# Backpropagation

> Tóm tắt 1 câu: Chain rule đi **ngược** từ loss về từng trọng số — và vì chain rule là phép **NHÂN**, nó sinh ra mọi vấn đề về sau.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #9 ← cần [[cac-loai-gradient-descent]] · → kế tiếp [[vanishing-gradient]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 💡 Ý chính

Muốn cập nhật `w` thì cần `∂L/∂w`. Nhưng `w` ở tầng sâu **không nối thẳng** với loss — phải đi qua mọi tầng phía trên.

**Chain rule**: nhân dồn đạo hàm từng chặng, đi **ngược** từ output về input.

## 🔢 Ví dụ chạy tay — mạng 2-2-1, sigmoid (HAY RA THI)

```
δ_o = (ŷ − y) · ŷ(1 − ŷ)              ← lỗi tại output
δ_h = δ_o · v · h(1 − h)              ← lan ngược về hidden
∂L/∂w = δ_h · x                        ← gradient của trọng số tầng vào
```

Nhìn `δ_h`: nó **nhân với `h(1−h)`** — đạo hàm sigmoid, **tối đa 0.25**.

## 🔑 Đây là gốc của mọi thứ về sau

Vì chain rule là phép **NHÂN**, mọi vấn đề đều là hệ quả:

| Nhân dồn theo | Sinh ra |
|---|---|
| **Số TẦNG** | [[vanishing-gradient]] |
| **Số BƯỚC THỜI GIAN** | [[vanishing-gradient-rnn]] (qua [[bptt]]) |

Và mọi cách chữa đều là **đổi nhân thành cộng**: [[resnet]] · [[lstm-cell-state]].

---

## 🔗 Liên kết
- **Tiền đề:** [[cac-loai-gradient-descent]] · [[forward-pass]]
- **Dẫn tới:** [[vanishing-gradient]] · [[bptt]]

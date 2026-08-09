---
slug: beam-search
title: Beam search vs Greedy decoding
vault: dl
type: concept
branch: E
order: 21
status: done
tags: [dl, sinh-chuoi, captioning]
prev: [teacher-forcing]
next: [attention-qkv]
created: 2026-08-02
---

# Beam search vs Greedy decoding

> Tóm tắt 1 câu: Giữ `k` câu ứng viên song song thay vì chọn cứng 1 từ mỗi bước — một bước lỡ tay không giết cả câu.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #21 ← cần [[teacher-forcing]] · → kế tiếp [[attention-qkv]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/viic-image-captioning|📦 viic-image-captioning]]
**Tags:** #dl #sinh-chuoi #captioning

---

## 💡 Ý chính

| | Cách làm | Vấn đề |
|---|---|---|
| **Greedy** *(slide chỉ dạy cái này)* | Lấy `argmax` mỗi bước | **Sai 1 bước là không quay lại được** |
| **Beam search** | Giữ `k` câu tốt nhất song song, mở rộng cả `k` rồi cắt lại còn `k` | Chậm hơn `k` lần |

Thường **+vài điểm BLEU/CIDEr miễn phí**, chỉ tốn thời gian inference — **không** cần train lại.

## 🧩 Trực giác / Ví dụ

Greedy như đi đường chỉ nhìn 1 bước trước mặt: rẽ vào ngõ cụt là xong.
Beam như giữ 3 lộ trình khả dĩ cùng lúc, tới cuối mới chọn cái tổng điểm cao nhất.

## ⚙️ Khi nào dùng

- `beam = 3–5`. Lớn hơn: lợi ít, chậm nhiều.
- Chỉ ảnh hưởng **inference** — bật/tắt tuỳ ý sau khi train xong.

## ⚠️ Lỗi thường gặp

⚠️ **Beam không chuẩn hoá độ dài thì thiên vị câu NGẮN** — vì xác suất là tích các số < 1, câu dài luôn có điểm thấp hơn. Phải chia điểm cho `len^α` (`α ≈ 0.7`), nếu không model toàn sinh caption cụt lủn.

---

## 🔗 Liên kết
- **Tiền đề:** [[teacher-forcing]]
- **Liên quan tới:** [[loi-tich-luy-chuoi-dai]] · [[metric-sinh-chuoi]]

---
slug: teacher-forcing
title: Teacher forcing & Exposure bias
vault: dl
type: concept
branch: E
order: 20
status: done
tags: [dl, rnn, captioning]
prev: [image-captioning]
next: [beam-search]
created: 2026-08-02
---

# Teacher forcing & Exposure bias

> Tóm tắt 1 câu: Train thì feed từ ĐÚNG, inference thì feed từ MODEL VỪA ĐOÁN — chênh lệch đó là lý do `val_loss` đẹp mà caption sinh ra rác.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #20 ← cần [[image-captioning]] · → kế tiếp [[beam-search]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #captioning

---

## 💡 Ý chính

| | Feed gì vào bước sau |
|---|---|
| **Lúc TRAIN** (teacher forcing) | **từ ĐÚNG của ground-truth** — nhanh, ổn định, song song hoá được |
| **Lúc INFERENCE** | **từ MODEL VỪA ĐOÁN** — vì làm gì có ground-truth |

→ **Exposure bias**: train toàn ăn input sạch, inference ăn input do chính nó đẻ ra.

## 🧩 Trực giác / Ví dụ

Như học sinh làm bài mà **mỗi câu sai đều được thầy sửa ngay** rồi mới làm câu tiếp. Đi thi thì không ai sửa → sai câu 2 kéo sai luôn câu 3, 4, 5.

Hệ quả định lượng ở [[loi-tich-luy-chuoi-dai]]: mỗi từ đúng 95% ⇒ caption 20 từ chỉ **~36%** đúng trọn.

## ⚙️ Cách chữa

1. **[[beam-search]]** — rẻ nhất, làm ngay
2. **Attention** ([[attention-qkv]]) — mỗi bước nhìn lại input gốc
3. **Scheduled sampling** — lúc train thỉnh thoảng feed từ model tự đoán, để nó quen ăn input bẩn *(chỉnh khó, làm sau)*

## ⚠️ Lỗi thường gặp

✅ **BẮT BUỘC: sinh thử vài caption bằng vòng lặp inference thật rồi ĐỌC BẰNG MẮT.**

Đừng chỉ nhìn `val_loss` — loss được tính **với input đúng ở mọi bước**, tức là **đúng cái điều kiện mà inference không hề có**. Nó về mặt cấu trúc **không thể** phát hiện lỗi này.

---

## 🔗 Liên kết
- **Tiền đề:** [[image-captioning]]
- **Dẫn tới:** [[beam-search]]
- **Liên quan tới:** [[loi-tich-luy-chuoi-dai]] · [[metric-sinh-chuoi]]

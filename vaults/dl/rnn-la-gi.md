---
slug: rnn-la-gi
title: RNN là gì
vault: dl
type: concept
branch: E
order: 1
status: done
tags: [dl, rnn, sequence]
next: [rnn-cong-thuc]
created: 2026-08-02
---

# RNN là gì

> Tóm tắt 1 câu: Mạng nơ-ron cho dữ liệu **có thứ tự** — nó rã chuỗi ra N bước, mỗi bước nhận đúng 2 tín hiệu: trạng thái tích luỹ từ quá khứ và giá trị hiện tại.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #1 → kế tiếp [[rnn-cong-thuc]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #sequence

---

## 💡 Ý chính

- Nhận diện bài trong 1 câu: dữ liệu có **trục thời gian / thứ tự**, phần tử **đứng trước ảnh hưởng phần tử đứng sau**.
- RNN **rã chuỗi ra N bước**. Mỗi bước nhận **đúng 2 tín hiệu**:
  - `h(t-1)` — trạng thái tích luỹ từ quá khứ
  - `x_t` — giá trị hiện tại
- Slide gọi đó là **"internal state"** được cập nhật dần khi chuỗi được xử lý.
- 🔑 **Bộ nhớ nằm ở `h`, không nằm ở kiến trúc** → mất `h` là mất sạch ngữ cảnh.

## 🧩 Trực giác / Ví dụ

Đọc một câu: tới từ thứ 5 thì trong đầu bạn đã có "cảm giác" về 4 từ trước đó. Cái "cảm giác" ấy chính là `h`.

Ảnh thì không cần thứ tự — đảo 2 vùng ảnh vẫn là ảnh đó. Câu thì có: *"chó cắn người"* ≠ *"người cắn chó"*. Đó là ranh giới quyết định dùng CNN hay RNN.

## ⚙️ Khi nào dùng

Dữ liệu **chuỗi**: câu chữ · chuỗi thời gian · video (chuỗi frame) · âm thanh · caption.
Xem [[rnn-uu-nhuoc]] để biết **3 điều kiện phải thoả** trước khi quyết định dùng.

## ⚠️ Lỗi thường gặp

- Gắn RNN cho bài mà **thứ tự không có nghĩa** — đảo thứ tự không đổi kết quả thì dùng CNN/MLP, RNN chỉ tốn thời gian.
- Tưởng RNN "không dự đoán được tương lai" — **sai**. Dự báo chuỗi thời gian là ứng dụng kinh điển. Ý đúng: khi tính `h_t`, model **không được nhìn input ở các bước SAU `t`**. Nó **đoán** tương lai, không **thấy** tương lai.

---

## 🔗 Liên kết
- **Dẫn tới:** [[rnn-cong-thuc]] · [[nam-dang-bai-sequence]]
- **Liên quan tới:** [[rnn-uu-nhuoc]] · [[bidirectional-rnn]]

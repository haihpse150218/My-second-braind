---
slug: rnn-uu-nhuoc
title: Ưu / nhược RNN — 3 điều kiện phải thoả
vault: dl
type: concept
branch: E
order: 3
status: done
tags: [dl, rnn]
prev: [rnn-cong-thuc]
next: [nam-dang-bai-sequence]
created: 2026-08-02
---

# Ưu / nhược RNN — 3 điều kiện phải thoả

> Tóm tắt 1 câu: RNN đổi **tốc độ** và **tầm nhìn 1 chiều** để lấy **khả năng nhớ ngữ cảnh theo thứ tự** — không cần cái được thì đừng trả cái mất.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #3 ← cần [[rnn-cong-thuc]] · → kế tiếp [[nam-dang-bai-sequence]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

| ✅ Ưu | ❌ Nhược |
|---|---|
| Xử lý input **dài bất kỳ** | **Chạy chậm** — tuần tự, không song song hoá theo thời gian |
| **Model size không phình** theo độ dài | **Khó với thông tin ở xa** (vanishing gradient) |
| Tính toán có tính đến **lịch sử** | **Không thấy được input tương lai** (1 chiều) |
| **Chia sẻ trọng số** qua thời gian | |

## ⚙️ Khi nào dùng — cổng chặn 3 điều kiện

Tự hỏi 3 câu này **trước khi** gõ `LSTM(...)`:

| # | Điều kiện | Nếu KHÔNG thoả |
|---|---|---|
| 1 | Cần học **mối liên hệ giữa các khối** — thứ tự có nghĩa | Các khối độc lập → dùng **CNN / MLP** |
| 2 | Chấp nhận **thời gian chờ lâu** — bước `t` đợi `t-1` | Cần nhanh / chuỗi rất dài → **Transformer** |
| 3 | Chấp nhận mỗi bước **chỉ nhìn được quá khứ** | Có trọn chuỗi + bài *hiểu* → [[bidirectional-rnn]] |

## ⚠️ Lỗi thường gặp

⚠️ **Viết sai hay bị trừ điểm:** *"RNN không dự đoán được tương lai"* — **sai**. RNN dự báo tương lai rất tốt (time-series forecasting là ứng dụng kinh điển). Ý đúng của slide: **khi tính `h_t`, model không được nhìn input ở các bước sau `t`** — *"cannot consider any future input for the current state"*.

---

## 🔗 Liên kết
- **Tiền đề:** [[rnn-cong-thuc]]
- **Liên quan tới:** [[bidirectional-rnn]] · [[vanishing-gradient-rnn]] · [[attention-qkv]]

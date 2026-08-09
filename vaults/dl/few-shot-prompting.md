---
slug: few-shot-prompting
title: Zero / One / Few-shot Prompting
vault: dl
type: concept
branch: I
order: 8
status: done
tags: [dl, llm, prompt, s08]
prev: [prompt-engineering]
next: [chain-of-thought]
created: 2026-08-09
---

# Zero / One / Few-shot Prompting

> Tóm tắt 1 câu: Cho model xem **0, 1 hay nhiều ví dụ** ngay trong prompt — học mà **không đụng tới một tham số nào**.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #8 ← cần [[prompt-engineering]] · → kế tiếp [[chain-of-thought]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #prompt #s08

---

## 💡 Ba mức (slide 39)

| Tên | Số ví dụ trong prompt |
|---|---|
| **Zero-shot** | **0** — chỉ mô tả việc cần làm |
| **One-shot** | **1** |
| **Few-shot** | **2 trở lên** |

Ví dụ few-shot cho sentiment tiếng Việt (slide 40):
```
Examples:
Hàng tốt i như trong hình.: POSITIVE
Giao hàng khá chậm : NEGATIVE
Áo đẹp, hơi mỏng : NEUTRAL

Predict the following statements:
Chất liệu vải tốt so với giá :
Mạng chạy chậm quá :
```

## 🧩 Điều kỳ lạ: học mà không train

📌 **Đây là chỗ đáng dừng lại suy nghĩ.** Mọi thứ đã học từ S01 tới S07 đều là: có nhãn → tính loss → backprop → **đổi trọng số**. Few-shot **không làm gì trong số đó**. Không có gradient, không có epoch, trọng số **y nguyên**.

Vậy nó "học" ở đâu? Trong **context** — tức trong chính activation của một lần forward. Tên gọi đúng là **in-context learning**.

| | **Fine-tune** | **Few-shot (in-context)** |
|---|---|---|
| Đổi trọng số | ✅ có | ❌ **không** |
| Cần bao nhiêu mẫu | hàng nghìn | **2–10** |
| Chi phí | GPU, giờ | **một lệnh gọi API** |
| Giữ được bao lâu | vĩnh viễn | **chỉ trong prompt đó** |
| Tốn gì khi chạy | không | **token của mỗi lần gọi** |

⇒ Đây là bậc **rẻ nhất** trong 4 cách thích nghi ở [[prompt-engineering]]. **Luôn thử trước khi nghĩ tới fine-tune.**

## ⚙️ Few-shot giỏi nhất ở việc gì

> Slide 40: *"guide the model to generate accurate and **appropriately structured** responses"*

🔑 **Chữ "structured" mới là chỗ mạnh nhất.** Ví dụ dạy model **ĐỊNH DẠNG** đầu ra hiệu quả hơn nhiều so với mô tả bằng lời:
- Muốn ra đúng `POSITIVE / NEGATIVE / NEUTRAL` (không kèm giải thích) → **cho xem 3 ví dụ** là xong
- Muốn JSON đúng schema → **cho xem 1 JSON mẫu** ăn đứt viết cả đoạn mô tả

⚙️ Đặc biệt hợp **tiếng Việt**: nhãn và cách diễn đạt tiếng Việt thường không có sẵn trong hướng dẫn tiếng Anh — vài ví dụ thật sẽ neo model lại.

## ⚠️ Lỗi thường gặp — và giới hạn cứng

- 🚩 **Few-shot KHÔNG cứu được suy luận.** Slide 41 chỉ thẳng: *"Models, even with advanced training like few-shot learning, can still make errors."* Bài toán số học nhiều bước vẫn sai. Đó chính là lý do đẻ ra [[chain-of-thought]].
- ⚠️ **Ví dụ lệch phân bố nhãn** ⇒ model **bắt chước tỉ lệ đó**. Cho 3 ví dụ đều POSITIVE thì nó thiên về POSITIVE. Giữ **cân bằng nhãn** trong ví dụ.
- ⚠️ **Thứ tự ví dụ có ảnh hưởng** — ví dụ cuối cùng thường nặng ký hơn (nó gần chỗ sinh nhất, đúng hình chữ U ở [[lost-in-the-middle]]). Đảo thứ tự rồi đo lại nếu kết quả sát nhau.
- ⚠️ **Nhiều ví dụ hơn ≠ tốt hơn.** Lợi ích bão hoà nhanh, mà **token thì tính tiền mỗi lần gọi**. Đo để tìm điểm dừng.
- 🚩 **Ví dụ sai hoặc nhập nhằng còn hại hơn không có ví dụ** — model học luôn cái sai đó.

---

## 🔗 Liên kết
- **Tiền đề:** [[prompt-engineering]]
- **Dẫn tới:** [[chain-of-thought]]
- **Liên quan tới:** [[transfer-learning]] · [[lost-in-the-middle]] · [[pretrained-embedding]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 39–41

---
slug: self-consistency
title: Self-Consistency — hỏi nhiều lần rồi bỏ phiếu
vault: dl
type: concept
branch: I
order: 10
status: done
tags: [dl, llm, prompt, reasoning, s08]
prev: [chain-of-thought]
next: [advanced-prompting]
created: 2026-08-09
---

# Self-Consistency — hỏi nhiều lần rồi bỏ phiếu

> Tóm tắt 1 câu: Sinh **nhiều đường suy luận khác nhau** cho cùng một câu hỏi, rồi lấy **đáp án xuất hiện nhiều nhất** — vì một bài toán có nhiều cách giải đúng nhưng chỉ có **một** kết quả đúng.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #10 ← cần [[chain-of-thought]] · → kế tiếp [[advanced-prompting]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #prompt #reasoning #s08

---

## 💡 Ý chính (slide 48)

CoT chỉ đi **một** đường. Đi trúng đường sai là hỏng cả bài — không có cơ hội sửa.

Self-consistency: **sample nhiều đường**, rồi **marginalize** (gộp bỏ đường đi, chỉ giữ đích đến):

```
                    ┌─→ "…16−3−4 = 9 trứng… 2×9"     → $18  ✅
Q + few-shot CoT ───┼─→ "…bán phần còn lại 2×(16−4−3)" → $26  ❌
                    └─→ "…ăn 3 còn 13, nướng 4 còn 9…" → $18  ✅
                                                          ↓
                                    Bỏ phiếu đa số  →  $18  ✅
```

🔑 **Hai chữ khoá của slide**: *"sample multiple, **diverse** reasoning paths"* và *"**marginalize out** reasoning paths to aggregate final answers"*.

## 🧩 Vì sao nó hoạt động

Một bài toán thường có **nhiều cách giải đúng** nhưng chỉ **một kết quả đúng**. Trong khi:

| | Đường **ĐÚNG** | Đường **SAI** |
|---|---|---|
| Đích đến | đều hội tụ về **một** giá trị | mỗi lần sai một kiểu khác nhau |
| Khi bỏ phiếu | **cộng dồn lại** | **phân tán**, không ai đủ phiếu |

⇒ Lỗi **triệt tiêu nhau**, cái đúng **cộng hưởng**. Đây chính là logic của **ensemble** — chỉ khác là ở đây "nhiều model" được thay bằng **nhiều lần sample từ cùng một model**.

📌 **Điều kiện bắt buộc: `temperature > 0`.** Để `temperature = 0` thì cả `k` lần sinh ra **y hệt nhau**, bỏ phiếu vô nghĩa. Cần **đa dạng thật sự** thì cơ chế mới chạy.

## 🎯 Nối thẳng vào bài học đã tự trải qua

> 🔴 Bài cá nhân: **ba họ decoder không phân biệt được vì `sd 3,52 > Δ 2,87`** — độ lệch giữa các lần chạy lớn hơn chênh lệch giữa các phương án.

Self-consistency là **cùng một bài toán, nhìn từ phía giải pháp**: khi một lần chạy có phương sai lớn, **chạy nhiều lần rồi gộp** là cách chuẩn để hạ nhiễu.

- Ở **đánh giá model**: chạy nhiều seed → báo cáo **trung bình ± độ lệch**
- Ở **suy luận LLM**: sample `k` lần → **bỏ phiếu**

🔑 **Cùng một nguyên tắc thống kê ở hai chỗ khác nhau: một mẫu duy nhất thì không kết luận được gì.**

## ⚙️ Dùng thế nào

- [ ] Đặt `temperature ≈ 0.7` (phải > 0), `k` = **5–10** đường
- [ ] Trích đáp án cuối của từng đường rồi **đếm phiếu** — nhớ **chuẩn hoá** trước khi đếm (`$18` / `18` / `18 đô` phải gộp làm một, đúng tinh thần bước chuẩn hoá ở [[squad-em-f1]])
- [ ] Hợp bài có **đáp án rời rạc, kiểm được**: số học, phân loại, trắc nghiệm
- [ ] 💰 **Cái giá: đắt gấp `k` lần.** Chỉ bật cho phần thật sự cần chính xác

## ⚠️ Lỗi thường gặp

- 🚩 **Không hợp bài sinh văn bản tự do.** Hai bản tóm tắt hay đều tốt nhưng **không lần nào trùng lần nào** ⇒ không đếm phiếu được. Chỉ dùng khi đáp án **so sánh bằng được**.
- ⚠️ **Đa số ≠ đúng.** Nếu model **sai một cách hệ thống** (hiểu nhầm đề), cả `k` đường cùng sai và bỏ phiếu **củng cố cái sai** — còn nguy hiểm hơn vì giờ nó tự tin. Bỏ phiếu chữa được **lỗi ngẫu nhiên**, không chữa được **lỗi thiên lệch**.
- ⚠️ **Quên tăng `temperature`** ⇒ `k` bản giống hệt, tốn tiền gấp `k` mà không được gì.
- 📌 **Tỉ lệ phiếu là một tín hiệu độ tin cậy rẻ tiền**: 9/10 đường đồng ý thì yên tâm hơn 4/10. Đây chính là thứ mà pipeline Watson ở [[question-answering]] có sẵn (confidence) còn LLM thì không — self-consistency lấy lại được phần nào. Cũng là ý tưởng nền của **Active prompting** ở [[advanced-prompting]].

---

## 🔗 Liên kết
- **Tiền đề:** [[chain-of-thought]]
- **Dẫn tới:** [[advanced-prompting]]
- **Liên quan tới:** [[question-answering]] · [[squad-em-f1]] · [[sau-noi-so-ao-tuong]] · [[beam-search]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 48

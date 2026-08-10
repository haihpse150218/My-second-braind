---
slug: so-sanh-thong-ke
title: So sánh có ý nghĩa thống kê
vault: dsp
type: concept
branch: E
order: 2
status: learning
tags: [dsp, danh-gia]
prev: [fold-va-ro-ri-du-lieu]
next: [snr]
related: [phan-loai-am-thanh]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# So sánh có ý nghĩa thống kê

> Tóm tắt 1 câu: "pipeline B cao hơn 0,3%" **không phải kết luận** — phải kiểm chứng xem chênh lệch đó có vượt được mức dao động ngẫu nhiên giữa các fold không.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #2 ← cần [[fold-va-ro-ri-du-lieu]] · → kế tiếp [[snr]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #danh-gia

---

## 💡 Vấn đề

Chạy 10-fold cross-validation cho hai pipeline → hai dãy 10 con số accuracy. Trung bình chênh nhau một chút. Câu hỏi: **chênh lệch đó là thật hay là ngẫu nhiên?**

Accuracy dao động giữa các fold vì mỗi fold có bản ghi khác nhau, độ khó khác nhau. Nếu dao động nội tại đã lớn hơn chênh lệch giữa hai pipeline thì **không kết luận được gì**.

## ⚙️ Hai công cụ, hai câu hỏi khác nhau

| Công cụ | Trả lời | Ngưỡng |
|---|---|---|
| **p-value** (paired t-test) | Chênh lệch có **thật** không? | `p < 0,05` mới coi là có |
| **Cohen's d** | Chênh lệch có **lớn** không? | `d < 0,2` nhỏ · `0,5` vừa · `0,8` lớn |

$$
d = \frac{\bar{x}_B - \bar{x}_A}{s_{\text{pooled}}}
$$

> 📌 **Hai câu hỏi này khác nhau và đều cần trả lời.** Với mẫu rất lớn, chênh lệch `0,01%` vô nghĩa về thực tiễn vẫn có thể cho `p < 0,05`. Ngược lại, chênh lệch lớn nhưng ít mẫu thì `p` không đạt. Chỉ báo cáo `p` là báo cáo một nửa.

**Paired t-test** (cặp đôi) chứ không phải t-test thường: hai pipeline chạy trên **cùng bộ 10 fold**, nên so sánh theo từng cặp fold sẽ **triệt tiêu độ khó riêng của từng fold** và nhạy hơn nhiều.

## 💡 Kết quả của project

> Mọi `p > 0,05` **và** mọi `|d| < 0,2` → **không có khác biệt**, cả về ý nghĩa thống kê lẫn độ lớn.

Hai chỉ số **đồng thuận** với nhau, nên kết luận vững: DSP preprocessing không cải thiện độ chính xác. Xem [[phan-loai-am-thanh]].

## ⚠️ Điều dễ nhầm — quan trọng nhất

> 🚨 **"Không bác bỏ được giả thuyết H₀" KHÔNG phải "chứng minh H₀ đúng".**

`p > 0,05` chỉ nghĩa là **dữ liệu hiện có không đủ bằng chứng** để khẳng định có khác biệt. Có thể vì:
- Thật sự không có khác biệt, **hoặc**
- Có khác biệt nhỏ mà 10 fold không đủ **năng lực thống kê** (statistical power) để phát hiện.

Cách phát biểu đúng: *"không tìm thấy bằng chứng về khác biệt"*, không phải *"đã chứng minh hai pipeline như nhau"*. Cohen's `d` rất nhỏ ở đây làm kết luận mạnh hơn — nó nói thêm rằng **nếu có** khác biệt thì nó cũng nhỏ tới mức không đáng quan tâm.

**Các bẫy khác:**

- **`p = 0,05` không thiêng liêng.** `p = 0,049` và `p = 0,051` gần như cùng một bằng chứng. Ngưỡng là quy ước, không phải ranh giới tự nhiên.
- **So sánh nhiều lần thì phải hiệu chỉnh.** Test 3 model × 2 pipeline = nhiều phép so sánh; mỗi phép có 5% cơ hội báo dương tính giả. Cần Bonferroni hoặc tương đương.
- **10 fold là mẫu nhỏ** cho t-test. Kiểm định phi tham số (Wilcoxon signed-rank) an toàn hơn khi không chắc phân phối chuẩn.

## ⚙️ Vì sao phần này thuộc về DSP

Vì kết luận của project **là một khẳng định khoa học**, không phải một con số. Nói "DSP preprocessing không giúp ích" mà không có kiểm định thì chỉ là quan sát trên một lần chạy. Phần thống kê là thứ biến quan sát thành kết luận.

Đây là bài học chung với [[../vaults/nckh/SECOND_BRAIN_NCKH|vault nckh]]: mọi so sánh hai phương pháp đều cần bước này, bất kể lĩnh vực.

---

## 🔗 Liên kết
- **Tiền đề:** [[fold-va-ro-ri-du-lieu]] · [[phan-loai-am-thanh]]
- **Dẫn tới:** [[snr]]
- **Liên môn:** [[ml/kiem-dinh-gia-thuyet]] · [[ml/p-value]] · [[ml/cross-validation]] · [[ml/danh-gia-mo-hinh]]

## ❓ Câu hỏi mở
- Cần bao nhiêu fold (hoặc bao nhiêu lần lặp) để phát hiện được khác biệt `0,5%` nếu nó có thật?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, Abstract · §5

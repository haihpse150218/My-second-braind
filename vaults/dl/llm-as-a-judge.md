---
slug: llm-as-a-judge
title: LLM-as-a-Judge
vault: dl
type: concept
branch: G
order: 13
status: done
tags: [dl, danh-gia, llm]
prev: [metric-sinh-chuoi]
next: [ragas]
created: 2026-08-02
---

# LLM-as-a-Judge

> Tóm tắt 1 câu: Dùng LLM chấm output của model mình — chấm được cái BLEU/ROUGE không chấm nổi, nhưng có **6 thiên vị bắt buộc biết**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #13 ← cần [[metric-sinh-chuoi]] · → kế tiếp [[ragas]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #danh-gia #llm

---

## 💡 Vì sao cần

Tầng ① và ② **không chấm nổi** tiêu chí **không có đáp án duy nhất**: mạch lạc · trôi chảy · đúng phong cách · có ích · an toàn.

## ⚙️ 3 cách dùng — xếp theo độ tin cậy

| Cách | Làm gì | Đánh giá |
|---|---|---|
| **Pairwise** ⭐ | Đưa **2 output**, hỏi *"cái nào tốt hơn?"* | **Ổn định nhất** — so sánh dễ hơn chấm tuyệt đối |
| **Reference-based** | Đưa kèm đáp án chuẩn | Khá ổn, cần reference |
| **Pointwise** | Chấm 1 output thang **1–5** | **Yếu nhất** — điểm trôi giữa các lần chạy |

Biến thể: **GPTScore** (log-likelihood) · **G-Eval** (CoT + điền form) · **Prometheus** (model mở train riêng để chấm).

## 🚩 6 thiên vị BẮT BUỘC biết

| Thiên vị | Biểu hiện | Cách chặn |
|---|---|---|
| **Position bias** | Đưa A trước B thì **hay chọn A** | Chạy **2 chiều**, chỉ tính khi **đồng thuận** |
| **Verbosity bias** | Thiên vị câu trả lời **DÀI hơn** | Ràng buộc độ dài trong rubric |
| **Self-enhancement** | LLM **thích văn do chính nó** sinh | ❌ Đừng dùng **cùng họ model** để vừa sinh vừa chấm |
| **Điểm dồn cục** | Hay cho **4/5**, hiếm khi 1 hoặc 5 | Dùng **pairwise** |
| **Không tất định** | Cùng input, **ra điểm khác** | `temperature = 0` · lặp nhiều lần |
| **Không tái lập** | Model cập nhật ⇒ **điểm cũ vô giá trị** | Ghi rõ **model + version + ngày** |

## ✅ Checklist dùng cho đúng

- Ưu tiên **pairwise**, `temperature = 0`, **đảo vị trí 2 chiều**
- **Rubric cụ thể** + few-shot. Prompt chung chung → kết quả là **rác**
- 🔑 **BẮT BUỘC kiểm chứng với người**: 50–100 mẫu, tính **tương quan Spearman/Kendall**.
  📌 Đây đúng nguyên tắc slide 42 nêu cho intrinsic metric: *"unless correlation to real task is established"* — **cùng một luật**. Xem [[danh-gia-embedding]].
- 📝 Báo cáo phải ghi: model + version · prompt · `temperature` · ngày · số lần lặp
- ⚠️ **Không bao giờ thay tầng ① bằng tầng ③**

---

## 🔗 Liên kết
- **Tiền đề:** [[metric-sinh-chuoi]]
- **Dẫn tới:** [[ragas]]
- **Liên quan tới:** [[danh-gia-embedding]]

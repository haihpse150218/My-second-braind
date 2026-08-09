---
slug: metric-sinh-chuoi
title: Metric cho bài SINH chuỗi
vault: dl
type: concept
branch: G
order: 12
status: done
tags: [dl, danh-gia, nlp]
prev: [bay-am-tham]
next: [llm-as-a-judge]
created: 2026-08-02
---

# Metric cho bài SINH chuỗi

> Tóm tắt 1 câu: **BLEU sợ BỊA · ROUGE sợ SÓT** — và cả hai đều mù hoàn toàn về nghĩa.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #12 ← cần [[bay-am-tham]] · → kế tiếp [[llm-as-a-judge]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #danh-gia #nlp

---

## 💡 Vì sao BLEU cho dịch, ROUGE cho tóm tắt

| | **BLEU** (dịch) | **ROUGE** (tóm tắt) |
|---|---|---|
| Nghiêng về | **Precision** | **Recall** — tên viết tắt có sẵn: **R**ecall-**O**riented… |
| Hỏi câu gì | *"n-gram máy sinh — có trong tham chiếu không?"* | *"n-gram tham chiếu — máy có bắt được không?"* |
| Hợp vì | Dịch: 1 câu ra 1 câu ⇒ rủi ro là **dịch sai / thêm thắt** | Tóm tắt: output ngắn hơn nhiều, **vô số bản đúng** ⇒ rủi ro là **bỏ sót ý** |

## 📐 Ví dụ — tham chiếu `Hôm nay trời mưa to ở Hà Nội` (7 token)

- Máy sinh **quá ngắn** `Trời mưa` → precision **100%** (trông hoàn hảo) nhưng recall **29%**
  👉 Đây chính là lý do **BLEU phải có brevity penalty** — không phạt thì cứ sinh 2 từ an toàn là ăn điểm
- Máy **bịa thêm** `…và có bão lớn sắp đổ bộ` → recall cao nhưng precision thấp
  👉 ROUGE-recall thuần **không bắt được**, nên thực tế báo **ROUGE F1**

## 🎯 Bảng tra theo tác vụ

| Tác vụ | Metric chính |
|---|---|
| **Dịch máy** | **BLEU-4** (+ chrF, COMET) |
| **Tóm tắt** | **ROUGE-1/2/L** — ROUGE-L = chuỗi con chung dài nhất, **không cần khớp liền mạch** |
| **[[image-captioning]]** | **CIDEr** (chính) + BLEU-4 |
| **Hỏi đáp trích xuất** | **EM + F1** — ❌ không dùng BLEU/ROUGE |
| **Phân loại ý định** | **macro-F1** |

## 🪜 3 tầng metric

| Tầng | Đại diện | Ưu | Nhược |
|---|---|---|---|
| **① Lexical** (khớp chữ) | BLEU · ROUGE · METEOR · **CIDEr** · chrF | Nhanh · rẻ · **tất định** · **so được với paper** | **Mù nghĩa** |
| **② Semantic** (khớp nghĩa) | **BERTScore** · BLEURT · COMET | Bắt được paraphrase | Điểm phụ thuộc backbone · dồn cục **0.85–0.95** |
| **③ LLM-judge** | GPTScore · G-Eval | Tương quan người cao nhất | Đắt · **không tái lập** → [[llm-as-a-judge]] |

## ⚠️ Lỗi thường gặp

- ⚠️ **Mù nghĩa**: `Tôi thích` vs `Tôi không thích` lệch **1 token**, nghĩa ngược nhau, điểm vẫn cao.
- 🇻🇳 **BERTScore tiếng Việt phải chỉ định backbone `PhoBERT`** — mặc định là model tiếng Anh, điểm **vô nghĩa mà không báo lỗi**.
- 🇻🇳 **Tách âm tiết hay tách từ cho điểm khác hẳn nhau** → ghi rõ tokenizer.
- 🚩 **Loss ≠ metric.** Loss là cross-entropy **theo token**, CIDEr là **theo câu** — **không cùng chiều**. `val_loss` thấp nhất **chưa chắc** CIDEr cao nhất → **chọn best checkpoint theo CIDEr trên validation**.
- 🚩 **Luật báo cáo**: tầng ① là **số chính** (tái lập được, so được với paper) · ② kèm theo · ③ **chỉ định tính**.

---

## 🔗 Liên kết
- **Tiền đề:** [[bay-am-tham]]
- **Dẫn tới:** [[llm-as-a-judge]]
- **Liên quan tới:** [[image-captioning]] · [[danh-gia-embedding]] · [[callbacks-keras]]

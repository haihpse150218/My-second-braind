---
slug: bay-am-tham
title: Bẫy âm thầm — code chạy ngon nhưng sai gốc
vault: dl
type: concept
branch: G
order: 11
status: done
tags: [dl, debug, thuc-chien]
prev: [sau-noi-so-ao-tuong]
next: [metric-sinh-chuoi]
created: 2026-08-02
---

# Bẫy âm thầm — code chạy ngon nhưng sai gốc

> Tóm tắt 1 câu: Độc hơn 6 nỗi sợ vì **không nổ lỗi**, không có traceback — phải chủ động đi kiểm.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #11 ← cần [[sau-noi-so-ao-tuong]] · → kế tiếp [[metric-sinh-chuoi]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #debug #thuc-chien

---

## 💡 Bẫy chung (mọi bài DL)

| Bẫy | Chết âm thầm thế nào | Fix |
|---|---|---|
| **Quên `/255`** | Vẫn chạy, chỉ hội tụ chậm/kém — dễ đổ tại "model dở" | `print(x.min(), x.max())`, phải là `[0,1]` |
| **Augment làm ĐỔI NHÃN** | Metric vẫn ra số, chỉ là model học điều sai | Hỏi từng phép: *"biến đổi này có đổi nhãn không?"* — `RandomFlip` ổn cho rác, **sai cho chữ số** (`6`→`9`) |
| **`categorical` vs `sparse_categorical`** | Shape mismatch, **hoặc tệ hơn: accuracy đứng im** | one-hot → `categorical`, số nguyên → `sparse_` |
| **`validation_split` cắt 10% cuối** | Val score vô nghĩa nếu data xếp theo nhãn | Shuffle + stratify |
| **⊕ residual đặt SAU relu** | Model vẫn train, chỉ kém hơn | Đúng: `conv → relu → conv → ⊕(+x) → relu` |
| **Augmentation áp cả val/test** | Val score nhiễu, chọn nhầm best epoch | Đặt augmentation **trong model** |
| **Group leakage** | Accuracy cao đẹp, deploy sụp | [[group-leakage]] |

## 🔁 Bẫy riêng của chuỗi/RNN

Quên masking · nhầm `return_sequences` · BiRNN nhìn trộm tương lai · `stateful` không reset · exposure bias · quên `max_length` · quên tiêm ảnh vào `h_0` · không clip gradient · `recurrent_dropout > 0` (tắt cuDNN, chậm gấp nhiều lần).

## 📝 Bẫy riêng của văn bản

Không tách từ tiếng Việt · `fit` TF-IDF trên cả tập · bỏ stopword làm đảo nhãn sentiment · coverage pretrained thấp · một vector cho từ đa nghĩa.

## 🎯 Bẫy riêng của detection

Augment ảnh mà không đổi box/mask · resize không scale box · nhầm format toạ độ · quên NMS · vật nhỏ biến mất.

## ⚠️ Nguyên tắc chung

📌 **Mọi con số / giả định phải kiểm trên data thật TRƯỚC khi tin — kể cả khi chính mình rất tự tin.**
Phiên verify 2026-07-26 bắt được **4 lần đoán sai**, trong đó 2 lần là do tự phán chắc nịch rồi số liệu bác bỏ.

---

## 🔗 Liên kết
- **Tiền đề:** [[sau-noi-so-ao-tuong]]
- **Dẫn tới:** [[metric-sinh-chuoi]]

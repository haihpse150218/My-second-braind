---
slug: callbacks-keras
title: Callbacks trong Keras
vault: dl
type: concept
branch: G
order: 9
status: done
tags: [dl, training, keras]
prev: [batch-size-va-learning-rate]
next: [sau-noi-so-ao-tuong]
created: 2026-08-02
---

# Callbacks trong Keras

> Tóm tắt 1 câu: Đặt epochs cao rồi để callback quyết định khi nào dừng — đừng đoán số epoch bằng tay.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #9 ← cần [[batch-size-va-learning-rate]] · → kế tiếp [[sau-noi-so-ao-tuong]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training #keras

---

## 💡 Bộ 3 mặc định

```python
EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
ReduceLROnPlateau(factor=0.5, patience=2, min_lr=1e-6)
ModelCheckpoint(save_best_only=True)     # trên Colab TRỎ VÀO GOOGLE DRIVE
```

## ⚙️ Vì sao `restore_best_weights=True` quan trọng

Không có nó thì EarlyStopping dừng ở epoch **xấu hơn** đáy `patience` bước — bạn giữ lại đúng cái model tệ hơn. Xem đáy chữ U ở [[error-chart]].

## ⚠️ Lỗi thường gặp

- ⚠️ **`ModelCheckpoint` lưu vào `/content` trên Colab là MẤT SẠCH** khi runtime ngắt → trỏ vào Drive. Xem [[colab-workflow]].
- 🚩 **`monitor` phải khớp metric thật của bài.** Bài sinh chuỗi mà monitor `val_loss` thì chọn nhầm checkpoint — loss token thấp **chưa chắc** CIDEr cao. Xem [[metric-sinh-chuoi]].
- ⚠️ Metric muốn `evaluate()` trả về thì phải khai **ngay ở `compile`**.

---

## 🔗 Liên kết
- **Tiền đề:** [[batch-size-va-learning-rate]]
- **Dẫn tới:** [[sau-noi-so-ao-tuong]] · [[colab-workflow]]
- **Liên quan tới:** [[metric-sinh-chuoi]]

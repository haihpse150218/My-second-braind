---
slug: chia-train-val-test
title: Chia train / val / test
vault: dl
type: concept
branch: G
order: 2
status: done
tags: [dl, pipeline, data]
prev: [quy-trinh-9-buoc]
next: [chong-ro-ri-du-lieu]
created: 2026-08-02
---

# Chia train / val / test

> Tóm tắt 1 câu: Tune trên validation, **test chạm đúng 1 lần** ở cuối — và coi chừng `validation_split` của Keras.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #2 ← cần [[quy-trinh-9-buoc]] · → kế tiếp [[chong-ro-ri-du-lieu]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #pipeline #data

---

## 💡 Ý chính

- Dùng **stratified** để mọi nhãn đúng tỉ lệ ở cả 3 tập
- **Chọn epoch dừng / threshold / kiến trúc → dựa validation.** **Test chạm đúng 1 lần.**
- Dữ liệu có **trục thời gian** → split **theo thời gian** (train quá khứ → test tương lai), **KHÔNG shuffle random**

## ⚠️ Lỗi thường gặp

🚩 **`validation_split=0.1` của Keras cắt 10% CUỐI mảng, KHÔNG shuffle.**
Data xếp theo nhãn là hỏng hoàn toàn — val set có thể chỉ chứa 1 lớp, val score **vô nghĩa** mà không có lỗi nào báo.
→ Tự tách bằng stratified split, hoặc truyền `validation_data=`.

🚩 **Chia theo dòng thay vì theo nhóm** → [[group-leakage]].

⚠️ Nếu `test_loss < val_loss` → test set có thể **dễ hơn** val → kết quả **lạc quan hơn thực tế**, phải **ghi rõ trong báo cáo**.

---

## 🔗 Liên kết
- **Tiền đề:** [[quy-trinh-9-buoc]]
- **Dẫn tới:** [[chong-ro-ri-du-lieu]] · [[group-leakage]]

---
slug: transfer-learning
title: Transfer Learning
vault: dl
type: concept
branch: B
order: 13
status: done
tags: [dl, cnn, thuc-chien]
prev: [batch-normalization]
next: [data-augmentation]
created: 2026-08-02
---

# Transfer Learning

> Tóm tắt 1 câu: Ít data thì **đừng train from scratch** — mạng càng to càng **đói data**, không phải ít hơn.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #13 ← cần [[batch-normalization]] · → kế tiếp [[data-augmentation]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/viic-image-captioning|📦 viic-image-captioning]]
**Tags:** #dl #cnn #thuc-chien

---

## 💡 Ý chính

Lấy model đã train trên tập lớn (ImageNet, COCO), **giữ phần trích đặc trưng**, thay **head** cho bài của mình.

Lý do nó hoạt động: tầng nông học **cạnh, màu, kết cấu** — những thứ **dùng chung cho mọi bài thị giác** ([[filter-va-feature-map]]).

## ⚙️ 2 chế độ

| | **Feature extraction** | **Fine-tuning** |
|---|---|---|
| Backbone | **Đóng băng** | Mở (thường vài block cuối) |
| Khi nào | **Data rất ít** · domain gần ImageNet | Data khá · domain đặc thù |
| LR | Bình thường | **Rất nhỏ** (1e-4 hoặc thấp hơn) |

Mẹo: **đóng băng vài epoch đầu rồi mới mở** — nếu mở ngay, gradient lớn từ head chưa train sẽ **phá nát** trọng số pretrain.

## 🧩 Cùng một ý ở các nhánh khác

| Lĩnh vực | Bản tương ứng |
|---|---|
| Detection | Lấy **pretrained COCO** rồi fine-tune — 90% trường hợp thực chiến |
| NLP | [[pretrained-embedding]] · PhoBERT |
| Captioning | CNN encoder pretrain ở [[image-captioning]] |

## ⚠️ Lỗi thường gặp

- ⚠️ **Phải dùng đúng cách preprocess của model pretrain** (mean/std của ImageNet, không phải `/255` tuỳ tiện).
- ⚠️ **Ràng buộc "cấm dùng pretrained"** trong đề bài sẽ **override** hết — phải train from scratch, cần nhiều data + augmentation mạnh hơn. Xem [[quy-trinh-9-buoc]].
- 🚩 **Đóng băng BN**: khi fine-tune với batch nhỏ, để BN cập nhật moving stats thường **hại** — cân nhắc đóng băng luôn BN.

---

## 🔗 Liên kết
- **Tiền đề:** [[batch-normalization]]
- **Dẫn tới:** [[data-augmentation]]
- **Liên quan tới:** [[pretrained-embedding]] · [[image-captioning]]

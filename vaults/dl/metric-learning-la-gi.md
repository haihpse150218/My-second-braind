---
slug: metric-learning-la-gi
title: Metric Learning là gì
vault: dl
type: concept
branch: D
order: 1
status: done
tags: [dl, metric-learning]
next: [face-verification-vs-recognition]
created: 2026-08-02
---

# Metric Learning là gì

> Tóm tắt 1 câu: **Không học classifier — học một HÀM KHOẢNG CÁCH.** Kéo gần cùng lớp, đẩy xa khác lớp, cộng một khoảng đệm.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #1 → kế tiếp [[face-verification-vs-recognition]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning

---

## 💡 Ý tưởng chung — mọi loss đều làm ĐÚNG MỘT VIỆC

```
KÉO GẦN cái cùng lớp  +  ĐẨY XA cái khác lớp  +  một KHOẢNG ĐỆM (margin)
```

⭐ **Vì sao cần margin**: không có margin thì model chỉ cần `d(cùng lớp) < d(khác lớp)` — **hơn 1 chút cũng tính là đúng**. Ra đời gặp nhiễu/góc chụp lạ là **lật ngay**. Margin ép phải **hơn một khoảng an toàn**.

## 🗺️ BẢN ĐỒ 2 HỌ LỚN

```
                    METRIC LEARNING
        ┌─────────────────┴──────────────────┐
  A. SO MẪU ↔ MẪU                     B. SO MẪU ↔ PROXY CỦA LỚP
  (pair / tuple-based)                (classification-based)
        │                                    │
  Contrastive (2006)                  Center loss (2016)
  Triplet (2015)                      SphereFace (2017)
  Quadruplet (2017)                   CosFace (2018)
  Lifted Structured (2016)            ArcFace (2019)
  N-pair (2016)
  InfoNCE/NT-Xent (2020)
        │                                    │
  ⚠️ PHẢI ĐÀO MẪU (sampling)         ✅ KHÔNG phải đào mẫu
  ⚠️ Phụ thuộc batch                  ✅ Train ổn định như softmax
  ✅ Không cần biết trước số lớp      ⚠️ Cần biết TRƯỚC số lớp
```

📌 **Mạch lịch sử một câu**: ngành đi từ *"so mẫu với mẫu"* (phải đào mẫu khó, mệt) sang *"so mẫu với **proxy của lớp**"* — **bỏ hẳn khâu đào mẫu**.

## ⚙️ Dùng cho

Face Recognition · Re-ID · Image Retrieval · Contrastive pretraining · **đồ án ViIC** nếu làm retrieval ảnh↔caption.

---

## 🔗 Liên kết
- **Dẫn tới:** [[face-verification-vs-recognition]] · [[contrastive-loss]]
- **Liên quan tới:** [[negative-sampling]] — cùng tinh thần kéo gần/đẩy xa

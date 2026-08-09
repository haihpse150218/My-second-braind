---
slug: danh-gia-embedding
title: Đánh giá embedding — Intrinsic vs Extrinsic
vault: dl
type: concept
branch: F
order: 12
status: done
tags: [dl, nlp, danh-gia]
prev: [pretrained-embedding]
next: [contextualized-embedding]
created: 2026-08-02
---

# Đánh giá embedding — Intrinsic vs Extrinsic

> Tóm tắt 1 câu: Intrinsic để **sàng nhanh**, extrinsic để **chốt** — và báo cáo phải lấy số extrinsic.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #12 ← cần [[pretrained-embedding]] · → kế tiếp [[contextualized-embedding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #danh-gia

---

> ⚠️ Mục này chỉ nói về đánh giá **bản thân embedding**. Đánh giá **văn bản do model SINH RA** là chuyện khác → [[metric-sinh-chuoi]].

## 💡 Ý chính (slide 42, 47)

| | **Intrinsic** | **Extrinsic** |
|---|---|---|
| Đo trên | **tác vụ con / trung gian** (analogy, similarity) | **tác vụ thật** (NER, sentiment, QA) |
| Tốc độ | **Nhanh** | **Chậm** |
| Ích lợi | Giúp **hiểu** hệ thống | Biết **thật sự** dùng được không |
| Điểm yếu | *"Not clear if really helpful **unless correlation to real task is established**"* | Sập thì **không biết lỗi ở đâu** — embedding hay model hay tương tác |

## 🔢 Các phép đo

- **Khoảng cách (slide 43)**: **Cosine** (chuẩn cho text — chỉ quan tâm **hướng**) · Euclidean · Manhattan
- **Analogy test (slide 44)**: `man : woman :: king : ?` → `d = argmax_i cos(x_b - x_a + x_c, x_i)`
- **Similarity vs người chấm (slide 45–46)**: dataset **WordSim353**, đo **tương quan** với điểm người cho. GloVe 42B thắng (WS353 **75.9**)
- **Extrinsic mẫu (slide 48)**: NER — *"**Chris Manning** lives in **Palo Alto**"*. GloVe dẫn đầu (Dev **93.2**)

## ⚠️ Lỗi thường gặp

⚠️ **2 cảnh báo slide 44 tự ghi về analogy test:**
1. *"Discarding the input words from the search (!)"* — phải **loại 3 từ đầu vào** khỏi kết quả, nếu không nó trả về chính chúng ⇒ bài test **đã được dàn xếp một phần**
2. *"What if the information is there but not linear?"* — quan hệ **phi tuyến** thì phép cộng vector **không bắt được**

→ Đừng tin điểm analogy đẹp mà bỏ qua extrinsic.

🔗 Nguyên tắc *"chưa chứng minh tương quan thì chưa có giá trị"* này áp dụng nguyên xi cho [[llm-as-a-judge]].

---

## 🔗 Liên kết
- **Tiền đề:** [[pretrained-embedding]]
- **Dẫn tới:** [[contextualized-embedding]]
- **Liên quan tới:** [[metric-sinh-chuoi]] · [[llm-as-a-judge]]

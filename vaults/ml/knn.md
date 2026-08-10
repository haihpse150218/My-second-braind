---
slug: knn
title: k-NN — k láng giềng gần nhất
vault: ml
type: concept
branch: E
order: 16
status: learning
tags: [thuat-toan, phan-loai]
prev: [naive-bayes]
next: [chon-mo-hinh]
related: [k-means, chuan-hoa-du-lieu]
created: 2026-08-10
---

# k-NN — k láng giềng gần nhất

> Tóm tắt 1 câu: đoán nhãn theo **`k` điểm gần nhất** — thuật toán **không có bước train**, đơn giản đến mức khó tin nhưng vẫn là baseline tốt.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán & Mô hình) · #16 ← cần [[naive-bayes]] · → kế tiếp [[chon-mo-hinh]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #thuat-toan #phan-loai

---

## 💡 Ý chính

```
Dự đoán cho điểm mới x:
1. Tính khoảng cách từ x tới TẤT CẢ điểm trong tập train
2. Lấy k điểm gần nhất
3. Phân loại → bỏ phiếu đa số  |  Hồi quy → lấy trung bình
```

**Không có bước train.** Model "học" bằng cách... **nhớ toàn bộ dữ liệu**. Gọi là **lazy learning** — mọi tính toán dồn sang lúc dự đoán.

| | Train | Dự đoán |
|---|---|---|
| k-NN | `O(1)` — chỉ lưu | ⚠️ `O(n·d)` **cho mỗi điểm** |
| Hầu hết model khác | Đắt | Rẻ |

Đây là đánh đổi ngược với mọi thuật toán khác, và là hạn chế lớn nhất khi triển khai: dataset càng lớn thì dự đoán càng chậm, và phải **giữ toàn bộ tập train trong bộ nhớ**.

## ⚙️ Chọn `k`

| `k` | Ranh giới quyết định | Rủi ro |
|---|---|---|
| **`k = 1`** | Rất gấp khúc, ôm sát từng điểm | **Overfit** — một điểm nhiễu tạo cả một vùng sai |
| **`k` vừa** | Mượt vừa phải | ⭐ |
| **`k` rất lớn** | Gần như phẳng | **Underfit** — tiến tới "luôn đoán lớp đa số" |

`k` chính là **núm điều khiển bias–variance**: `k` nhỏ → variance cao; `k` lớn → bias cao. Xem [[bias-variance]].

Mẹo: chọn `k` **lẻ** cho bài toán 2 lớp để tránh hoà phiếu. Tune bằng [[cross-validation]].

## ⚠️ Ba điều kiện bắt buộc

**1. 🚨 Phải [[chuan-hoa-du-lieu|chuẩn hoá]].** k-NN **hoàn toàn dựa vào khoảng cách**, nên cột có đơn vị lớn sẽ chi phối tất cả:

| Đặc trưng | Dải giá trị | Đóng góp vào khoảng cách |
|---|---|---|
| Tuổi | 20–70 | Gần như **0** |
| Thu nhập | 10⁷–10⁹ | Gần như **100%** |

Không chuẩn hoá thì k-NN thực chất chỉ đang so sánh thu nhập. Đây là thuật toán nhạy cảm nhất với việc này.

**2. Lời nguyền số chiều.** Ở chiều cao, **mọi điểm gần như cách đều nhau** → khái niệm "hàng xóm gần nhất" mất ý nghĩa. k-NN suy giảm rõ rệt từ khoảng vài chục chiều. Cách chữa: [[giam-chieu-du-lieu]] hoặc [[feature-selection]] trước.

**3. Chọn hàm khoảng cách phù hợp.**

| Khoảng cách | Dùng khi |
|---|---|
| **Euclid** | Mặc định, đặc trưng liên tục |
| **Manhattan** | Nhiều chiều, hoặc đặc trưng rời rạc |
| **Cosine** | Văn bản, embedding — quan tâm **hướng** hơn độ lớn |
| **Hamming** | Đặc trưng phân loại |

## ⚙️ Khi nào dùng

| ✅ Hợp | ❌ Không hợp |
|---|---|
| Dataset **nhỏ**, ít chiều | Dữ liệu lớn (dự đoán quá chậm) |
| Ranh giới quyết định **rất phi tuyến** | Nhiều chiều |
| Cần **baseline nhanh** | Cần dự đoán thời gian thực |
| Bài toán **so khớp** (tìm ảnh/văn bản giống) | Có nhiều đặc trưng nhiễu |

**Ứng dụng lớn nhất hiện nay không phải phân loại mà là tìm kiếm tương tự:** tìm vector gần nhất trong kho embedding. Đó là lõi của [[../vaults/dl/rag|RAG]] và tìm kiếm ngữ nghĩa — chỉ khác là dùng chỉ mục xấp xỉ (FAISS, HNSW) thay vì quét toàn bộ.

## ⚠️ Điều dễ nhầm

- **k-NN ≠ [[k-means]].** Trùng chữ `k` nhưng khác hẳn: k-NN là **có giám sát** (dự đoán nhãn), k-means là **không giám sát** (phân cụm). `k` của k-NN là số hàng xóm, `k` của k-means là số cụm.
- **"Không train" không nghĩa là miễn phí.** Chi phí chỉ **dời sang** lúc dự đoán, và thường đắt hơn.
- **Nhạy với mất cân bằng lớp** — lớp đa số dễ thắng phiếu. Dùng bỏ phiếu **có trọng số theo khoảng cách** để giảm bớt, xem [[class-imbalance]].

---

## 🔗 Liên kết
- **Tiền đề:** [[naive-bayes]] · [[vector]]
- **Dẫn tới:** [[chon-mo-hinh]]
- **Liên quan:** [[chuan-hoa-du-lieu]] · [[giam-chieu-du-lieu]] · [[bias-variance]] · [[k-means]]
- **Liên môn:** [[dl/rag]] · [[dl/retrieve-rerank]] — tìm hàng xóm gần nhất trong không gian embedding.

## ❓ Câu hỏi mở
- Chỉ mục xấp xỉ (HNSW) đánh đổi độ chính xác lấy tốc độ — mất bao nhiêu recall là chấp nhận được?

## 📚 Nguồn
- `L1_Math_Overview.pdf` · slide Chọn mô hình

---
slug: t-sne
title: t-SNE & UMAP
vault: ml
type: concept
branch: B
order: 11
status: learning
tags: [toan, giam-chieu, truc-quan-hoa]
prev: [kernel-pca]
next: [he-goi-y-recommender]
related: [pca, giam-chieu-du-lieu]
created: 2026-08-10
---

# t-SNE & UMAP

> Tóm tắt 1 câu: giảm chiều **chỉ để VẼ HÌNH** — giữ quan hệ hàng xóm cục bộ rất tốt, nhưng khoảng cách và kích thước cụm trên hình **không đọc được**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #11 ← cần [[kernel-pca]] · → kế tiếp [[he-goi-y-recommender]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giam-chieu #truc-quan-hoa

---

## 💡 Ý tưởng

Khác hẳn [[pca]]: t-SNE **không** tìm phép chiếu, nó **đặt lại điểm** trong 2D sao cho **quan hệ hàng xóm** giống với không gian gốc.

```
1. Ở chiều cao: chuyển khoảng cách thành XÁC SUẤT "j là hàng xóm của i" (phân phối Gauss)
2. Ở 2D: cũng tính xác suất tương tự (dùng phân phối t Student, đuôi dày)
3. Di chuyển các điểm 2D sao cho hai phân phối giống nhau nhất (tối thiểu KL divergence)
```

**Vì sao dùng phân phối t ở 2D:** đuôi dày hơn Gauss → các điểm không phải hàng xóm bị **đẩy xa hơn**, chống hiện tượng mọi thứ dồn cục vào giữa ("crowding problem") khi ép từ chiều cao xuống 2D.

## ⚠️ Ba điều KHÔNG được kết luận từ hình t-SNE

Đây là phần quan trọng nhất của note này — t-SNE bị đọc sai rất nhiều:

| ❌ Đừng kết luận | Vì sao |
|---|---|
| **"Cụm A to hơn cụm B"** | Kích thước cụm trên hình **không có ý nghĩa** — t-SNE giãn cụm dày và nén cụm thưa |
| **"Cụm A gần cụm B hơn cụm C"** | Khoảng cách **giữa các cụm** gần như vô nghĩa; chỉ quan hệ **trong** cụm là đáng tin |
| **"Có 5 cụm nên dữ liệu có 5 nhóm"** | `perplexity` khác nhau cho **số cụm khác nhau** trên cùng dữ liệu |

> 🚨 Với dữ liệu **nhiễu thuần tuý**, t-SNE vẫn vẽ ra những cụm trông rất thuyết phục. **Luôn chạy với vài giá trị `perplexity` khác nhau** (5, 30, 50) — cấu trúc nào bền qua các lần chạy mới đáng tin.

## ⚙️ So sánh ba phương pháp

| | **PCA** | **t-SNE** | **UMAP** |
|---|---|---|---|
| Mục đích | Tiền xử lý + vẽ hình | **Chỉ vẽ hình** | Vẽ hình + tiền xử lý |
| Giữ cấu trúc | Toàn cục | **Cục bộ** | Cục bộ **và** toàn cục (tốt hơn) |
| Tốc độ | Rất nhanh | **Chậm** `O(n²)` (Barnes-Hut: `n log n`) | Nhanh hơn t-SNE nhiều |
| Áp cho dữ liệu mới | ✅ | ❌ **Không** | ✅ Có |
| Xác định | ✅ | ❌ Mỗi lần chạy khác nhau | ❌ (nhưng ổn định hơn) |

> 📌 **t-SNE không có hàm `transform`.** Nó không học một phép ánh xạ mà chỉ **sắp xếp đúng tập điểm đó**. Thêm một điểm mới thì phải chạy lại từ đầu — nên **không dùng được trong pipeline sản xuất**, chỉ dùng để nhìn dữ liệu.

**UMAP** hiện được ưa hơn t-SNE trong hầu hết trường hợp: nhanh hơn, giữ cấu trúc toàn cục tốt hơn, và **áp được cho dữ liệu mới**.

## ⚙️ Dùng đúng cách

- **Chạy PCA xuống ~50 chiều trước, rồi mới t-SNE.** Vừa nhanh hơn nhiều vừa bớt nhiễu. Đây là quy trình chuẩn.
- Tô màu điểm theo **nhãn thật** — nếu các màu tách thành cụm riêng thì đó là dấu hiệu đặc trưng có sức phân biệt. Đây là ứng dụng hữu ích nhất: **kiểm tra chất lượng embedding**.
- Luôn ghi lại `perplexity` và random seed để tái lập được.

Ứng dụng thực tế trong kho: nhìn embedding của [[../vaults/dl/word2vec|dl/word2vec]] hoặc [[../vaults/dl/metric-learning-la-gi|metric learning]] xem các lớp có tách nhau không — xem [[../vaults/dl/danh-gia-embedding|dl/danh-gia-embedding]].

## ⚠️ Điều dễ nhầm

- **t-SNE không phải thuật toán phân cụm.** Nó không gán nhãn cụm; việc "thấy cụm" là do mắt người. Muốn phân cụm thì dùng [[k-means]] hoặc DBSCAN **trên dữ liệu gốc**, rồi tô màu lên hình t-SNE.
- **Không dùng t-SNE làm bước tiền xử lý cho model.** Nó không tổng quát hoá sang dữ liệu mới.
- **`perplexity` xấp xỉ "số hàng xóm cần quan tâm"** — mặc định 30, nên nhỏ hơn số mẫu khá nhiều.

---

## 🔗 Liên kết
- **Tiền đề:** [[kernel-pca]] · [[pca]]
- **Dẫn tới:** [[he-goi-y-recommender]]
- **Liên quan:** [[giam-chieu-du-lieu]] · [[k-means]]
- **Liên môn:** [[dl/danh-gia-embedding]] · [[dl/word2vec]] — dùng để nhìn xem embedding có tách lớp không.

## ❓ Câu hỏi mở
- UMAP giữ cấu trúc toàn cục tốt hơn t-SNE — nhờ đâu về mặt toán học?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính

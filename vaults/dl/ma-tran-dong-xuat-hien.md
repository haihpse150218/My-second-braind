---
slug: ma-tran-dong-xuat-hien
title: Ma trận đồng xuất hiện + SVD/PCA (cách ĐẾM)
vault: dl
type: concept
branch: F
order: 7
status: done
tags: [dl, nlp, embedding]
prev: [distributional-semantics]
next: [word2vec]
created: 2026-08-02
---

# Ma trận đồng xuất hiện + SVD/PCA (cách ĐẾM)

> Tóm tắt 1 câu: Đếm xem cặp từ nào hay đứng gần nhau thành ma trận `N×N`, rồi **phân rã** xuống 100–300 chiều.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #7 ← cần [[distributional-semantics]] · → kế tiếp [[word2vec]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Ý chính (slide 30 — Distributed Semantic Models)

Dựng **ma trận đồng xuất hiện** `N×N` (`N` = cỡ vocab), ô `(i,j)` = mức độ 2 từ hay đứng gần nhau, rồi **phân rã** (SVD / PCA) thành ma trận word vector.

## 🔢 Ví dụ nhỏ

Corpus: `"mèo ăn cá"` · `"chó ăn thịt"` · `"mèo ngủ"`, cửa sổ ±1:

| | mèo | chó | ăn | cá | thịt | ngủ |
|---|---|---|---|---|---|---|
| **mèo** | 0 | 0 | **1** | 0 | 0 | 1 |
| **chó** | 0 | 0 | **1** | 0 | 0 | 0 |
| ăn | 1 | 1 | 0 | 1 | 1 | 0 |

🔑 **Điểm cốt lõi, hơi phản trực giác:** `mèo` và `chó` **không bao giờ xuất hiện cạnh nhau**, nhưng **hàng của chúng giống nhau** (cùng đứng cạnh `ăn`)
⇒ **giống nhau vì có CHUNG hàng xóm, không phải vì đứng cạnh nhau.**

## ⚙️ Vì sao bắt buộc phải SVD/PCA

Vocab 50k ⇒ ma trận **50.000 × 50.000 = 2,5 tỷ ô**, gần như **toàn số 0**. Phân rã để nén xuống **100–300 chiều dày đặc**.

🔗 Đây đúng là **dimensionality reduction đã học ở môn ML** — cùng công cụ, chỉ khác đối tượng: ML nén **feature**, ở đây nén **ngữ cảnh từ**.

## 💡 So sánh ĐẾM vs ĐOÁN

| | ① **ĐẾM** (SVD/PCA) | ② **ĐOÁN** ([[word2vec]]) |
|---|---|---|
| Đại diện | LSA, HAL | ⭐ Word2Vec |
| Dùng thống kê | **toàn cục** — đọc cả corpus 1 lần | **cục bộ** — từng cửa sổ |
| Tốc độ | Nhanh (1 lần phân rã) | **Chậm**, lặp nhiều epoch |
| Thêm từ mới | Phải **dựng lại + phân rã lại** | Train tiếp được |
| Bắt quan hệ phức tạp | Kém hơn | **Tốt hơn** |
| Cần | Nhiều **RAM** cho ma trận `N×N` | Nhiều **thời gian** + data |

📌 **GloVe = bản LAI** — dùng thống kê đồng xuất hiện **toàn cục** (cách ①) nhưng huấn luyện bằng **hàm mục tiêu kiểu dự đoán** (cách ②). Đó là lý do tên nó là *Global Vectors*, và cũng là lý do nó **thắng trong bảng slide 46** (WS353 **75.9**).

---

## 🔗 Liên kết
- **Tiền đề:** [[distributional-semantics]]
- **Dẫn tới:** [[word2vec]] · [[pretrained-embedding]]

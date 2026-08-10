---
slug: region-growing
title: Region growing & Split-Merge
vault: ivp
type: concept
branch: H
order: 5
status: learning
tags: [ivp, phan-doan]
prev: [nguong-cuc-bo]
next: [watershed]
related: [lan-can-va-lien-thong, watershed]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Region growing & Split-Merge

> Tóm tắt 1 câu: hai hướng ngược nhau cùng dựa trên **tính tương đồng** — lớn dần từ hạt giống (bottom-up), hoặc chia nhỏ rồi gộp lại (top-down).

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #5 ← cần [[nguong-cuc-bo]] · → kế tiếp [[watershed]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Region growing (bottom-up)

```
1. Chọn pixel hạt giống (seed) trong vùng cần tách
2. Xét các pixel LÂN CẬN của vùng hiện tại
3. Pixel nào thoả tiêu chí đồng nhất → kết nạp vào vùng
4. Lặp cho tới khi không kết nạp được thêm
```

Tiêu chí đồng nhất thường là: `|pixel − trung bình vùng| < ngưỡng`, hoặc `|pixel − seed| < ngưỡng`.

**Ưu điểm so với [[nguong-hoa]]:** vùng luôn **liên thông theo xây dựng** (mọi pixel đều nối được về seed). Ngưỡng hoá thì cho ra các pixel rải rác khắp ảnh, phải chạy [[thanh-phan-lien-thong]] sau đó mới biết vùng nào là vùng nào.

Đồng thời nó dùng được cả khi độ sáng vật **chồng lấn với nền ở nơi khác** trong ảnh — vì nó chỉ so sánh cục bộ và chỉ lan từ seed.

## 💡 Split & Merge (top-down)

```
1. Bắt đầu với CẢ ẢNH là một vùng
2. SPLIT: vùng nào không đồng nhất → chia thành 4 phần (quadtree)
3. Lặp bước 2 cho tới khi mọi vùng đều đồng nhất
4. MERGE: gộp các vùng kề nhau nếu hợp lại vẫn đồng nhất
```

**Ưu điểm lớn nhất: không cần seed.** Đây là lý do chính để chọn nó — region growing đòi hỏi biết trước vật ở đâu, còn split-merge thì tự phát hiện.

Bước **merge bắt buộc phải có**: split theo quadtree cắt cứng theo lưới, nên một vật thể nằm vắt qua ranh giới ô sẽ bị chia làm nhiều mảnh dù nó đồng nhất. Merge dán lại.

## ⚠️ Điểm yếu chung

| Vấn đề | Ảnh hưởng |
|---|---|
| **Nhạy với seed** | Đặt seed lệch vài pixel ra kết quả khác hẳn — region growing không ổn định |
| **Nhạy với ngưỡng đồng nhất** | Nới lỏng một chút → vùng **rò rỉ** (leak) qua biên yếu, nuốt cả nền |
| **Phụ thuộc thứ tự duyệt** | Kết nạp theo thứ tự khác cho vùng khác — kết quả không đơn nhất |
| **Nhạy chọn 4 hay 8 lân cận** | Xem [[lan-can-va-lien-thong]] |
| **Split-Merge để lại artifact vuông** | Do quadtree cắt theo lưới |

**Rò rỉ** là chế độ hỏng đáng sợ nhất: chỉ cần một chỗ biên bị mờ hoặc nhiễu, vùng "chảy" xuyên qua và nuốt toàn bộ nền. Cùng bản chất với vấn đề của [[watershed]] khi chưa dùng marker.

## ⚙️ Khi nào dùng

- **Ảnh y tế** — bác sĩ click vào khối u làm seed, thuật toán lan ra theo mô đồng nhất. Việc có người chỉ seed lại thành **ưu điểm**, không phải nhược điểm.
- **Công cụ "magic wand"** trong phần mềm ảnh chính là region growing.
- Khi vật thể **đồng nhất bên trong** nhưng độ sáng của nó **không tách biệt toàn cục** khỏi nền.

## ⚠️ Điều dễ nhầm

- **Tiêu chí "so với trung bình vùng" trôi dần.** Vùng lớn lên thì trung bình đổi theo, và có thể trôi rất xa giá trị seed ban đầu — vùng cuối cùng chứa những pixel chẳng giống seed chút nào. So với **seed cố định** thì chặt hơn nhưng lại không chịu được gradient sáng nhẹ.
- **Không đảm bảo phủ hết ảnh.** Region growing từ vài seed chỉ cho vài vùng; phần còn lại không được gán — vi phạm điều kiện `⋃Rᵢ = R` của [[phan-doan-anh]] nếu không xử lý thêm.

---

## 🔗 Liên kết
- **Tiền đề:** [[nguong-cuc-bo]] · [[lan-can-va-lien-thong]]
- **Dẫn tới:** [[watershed]]
- **Liên quan:** [[thanh-phan-lien-thong]] · [[phan-doan-anh]]

## ❓ Câu hỏi mở
- Có cách chọn seed tự động đáng tin (vd cực trị cục bộ của distance transform) không?

## 📚 Nguồn
- Lecture 10 — Image Segmentation

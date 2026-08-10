---
slug: watershed
title: Watershed — tách vật dính nhau
vault: ivp
type: concept
branch: H
order: 6
status: learning
tags: [ivp, phan-doan]
prev: [region-growing]
next: [mo-hinh-mau-rgb]
related: [khoang-cach-pixel, thanh-phan-lien-thong]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Watershed — tách vật dính nhau

> Tóm tắt 1 câu: coi ảnh như **địa hình** rồi cho nước dâng từ các đáy — chỗ hai hồ nước gặp nhau là đường phân đoạn. Công cụ mạnh nhất cho bài toán **vật thể chồng lấn**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #6 ← cần [[region-growing]] · → kế tiếp [[mo-hinh-mau-rgb]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Ý chính — phép ẩn dụ địa hình

Coi mức xám là **độ cao**:

| Khái niệm địa hình | Trong ảnh |
|---|---|
| **Lưu vực** (catchment basin) | Một **vùng** phân đoạn |
| **Cực tiểu cục bộ** | Đáy hồ — nơi nước bắt đầu dâng |
| **Đường phân thuỷ** (watershed line) | **Ranh giới** giữa hai vùng |

Mô phỏng: đục lỗ ở mỗi cực tiểu, nhấn địa hình xuống nước. Nước dâng đều từ mọi lỗ. **Chỗ nào hai hồ sắp hoà vào nhau thì xây một con đập** — tập hợp các con đập chính là kết quả phân đoạn.

## 🧩 Vì sao nó tách được vật dính nhau

Đây là chỗ watershed vượt trội, và mẹo nằm ở việc **chạy trên distance transform** chứ không chạy thẳng trên ảnh:

Hai đồng xu chồng mép nhau, sau [[nguong-hoa]] thành **một khối liền** — [[thanh-phan-lien-thong]] đếm ra **1 vật**, sai.

```
1. Tính distance transform của ảnh nhị phân
   → mỗi pixel ← khoảng cách tới nền gần nhất, xem [[khoang-cach-pixel]]
2. TÂM mỗi đồng xu có khoảng cách LỚN NHẤT → hai "đỉnh núi"
3. Lấy ÂM của nó → hai "đáy hồ" riêng biệt
4. Watershed → nước dâng từ hai đáy, gặp nhau ở CHỖ THẮT giữa hai đồng xu
   → đập được xây đúng chỗ tiếp giáp ✅
```

Chìa khoá: distance transform **biến hình dạng thành độ cao**. Chỗ thắt eo giữa hai vật tròn có khoảng cách nhỏ hơn hai tâm → tự nhiên trở thành đường phân thuỷ. **Thông tin hình học được chuyển thành thông tin độ cao**, rồi giải bằng một thuật toán không biết gì về hình học.

## ⚠️ Over-segmentation — vấn đề lớn nhất

> 🚨 Chạy watershed thẳng trên ảnh gradient thì **mỗi cực tiểu cục bộ sinh ra một vùng**. Ảnh thật có hàng nghìn cực tiểu do nhiễu → ảnh bị chia thành **hàng nghìn mảnh vụn**.

Ba cách chữa, theo thứ tự hiệu quả:

| Cách | Làm gì |
|---|---|
| ⭐ **Marker-controlled watershed** | **Chỉ định trước** các cực tiểu hợp lệ (marker), ép mọi cực tiểu khác biến mất |
| Làm mịn mạnh trước | Bớt cực tiểu do nhiễu — nhưng cũng làm nhoè biên |
| Gộp vùng sau | Hậu xử lý, gộp các vùng quá nhỏ hoặc quá giống nhau |

**Marker-controlled là cách dùng thực tế.** Marker thường lấy từ: cực đại của distance transform (cho vật tròn), hoặc do người chỉ định, hoặc từ một bước phát hiện thô trước đó.

## ⚙️ Khi nào dùng

- **Vật thể tròn/lồi dính nhau**: đồng xu, tế bào, hạt, bọt khí. Đây là ứng dụng kinh điển và cũng là nơi nó hoạt động tốt nhất.
- Cần **vùng khép kín phủ hết ảnh** — watershed luôn cho ranh giới khép kín, khác với [[canny]] vốn có thể để hở.
- Sau khi mọi phương pháp đơn giản hơn ([[otsu]] + [[opening-closing]]) đã thất bại vì vật dính nhau.

## ⚠️ Điều dễ nhầm

- **Không phải phương pháp đầu tiên nên thử.** Nó phức tạp và dễ over-segment; ngưỡng hoá + morphology giải quyết được phần lớn trường hợp rồi.
- **Distance transform chỉ hợp với vật lồi.** Vật hình chữ L hay hình khuyên có nhiều cực đại khoảng cách → bị chia nhỏ sai.
- **Nhạy với chất lượng marker.** Marker sai chỗ thì đường phân thuỷ sai chỗ — chất lượng đầu ra gần như hoàn toàn do marker quyết định.
- **Chậm** hơn hẳn ngưỡng hoá.

---

## 🔗 Liên kết
- **Tiền đề:** [[region-growing]] · [[khoang-cach-pixel]] · [[thanh-phan-lien-thong]]
- **Dẫn tới:** [[mo-hinh-mau-rgb]]
- **Liên quan:** [[nguong-hoa]] · [[opening-closing]] · [[phan-doan-anh]]
- **Liên môn:** [[dl/mask-rcnn]] — cùng bài toán tách từng thể hiện (instance), giải bằng học ngữ nghĩa thay vì địa hình cường độ.

## ❓ Câu hỏi mở
- Với tế bào chồng lấn sâu (không chỉ chạm mép), distance transform hết tác dụng — có tiên nghiệm hình dạng nào thay thế?

## 📚 Nguồn
- Lecture 10 — Image Segmentation

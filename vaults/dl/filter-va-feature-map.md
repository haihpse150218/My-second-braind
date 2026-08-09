---
slug: filter-va-feature-map
title: Filter & Feature map
vault: dl
type: concept
branch: B
order: 3
status: done
tags: [dl, cnn]
prev: [phep-tich-chap]
next: [stride-padding]
created: 2026-08-02
---

# Filter & Feature map

> Tóm tắt 1 câu: Filter là **cái đi tìm**, feature map là **kết quả tìm được** — và filter không do người thiết kế, nó được **học**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #3 ← cần [[phep-tich-chap]] · → kế tiếp [[stride-padding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn

---

## 💡 Ý chính

| | Là gì |
|---|---|
| **Filter (kernel)** | Ma trận trọng số nhỏ — **cái đi tìm** một mẫu cụ thể. **Được HỌC**, không phải người thiết kế |
| **Feature map** | Đầu ra sau khi filter trượt hết ảnh — **bản đồ cho biết mẫu đó xuất hiện ở đâu, mạnh cỡ nào** |

Một tầng conv có `N` filter ⇒ đẻ ra `N` feature map ⇒ **độ sâu (channel) của output = số filter**.

## 🧩 Tầng nông học gì, tầng sâu học gì

| Tầng | Học được |
|---|---|
| **Nông** | Cạnh · góc · màu · gradient |
| **Giữa** | Kết cấu · hoạ tiết · bộ phận đơn giản |
| **Sâu** | Bộ phận vật thể (mắt, bánh xe) → cả vật thể |

📌 Đây chính là **"tự học đặc trưng"** ở [[hoc-sau-la-gi]] — thứ mà ML cổ điển phải để người làm tay.

## ⚙️ Receptive field

Càng lên sâu, mỗi neuron **"nhìn thấy" vùng ảnh gốc càng rộng**. Đây là lý do:
- Xếp **2 tầng 3×3** = receptive field **5×5**; **3 tầng 3×3** ≈ **7×7** → xem [[vgg]]
- Vật nhỏ **biến mất** ở tầng sâu (stride tích luỹ) → xem [[fpn]]

---

## 🔗 Liên kết
- **Tiền đề:** [[phep-tich-chap]]
- **Dẫn tới:** [[stride-padding]] · [[vgg]]

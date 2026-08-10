---
slug: he-thi-giac-may
title: Hệ thị giác máy (MVS) — pipeline 5 bước
vault: ivp
type: concept
branch: A
order: 5
status: learning
tags: [ivp, tong-quan, pipeline]
prev: [ba-tang-xu-ly-anh]
next: [lan-can-va-lien-thong]
related: [anh-so-la-gi]
sources: ["L1 — Introduction & Overview"]
created: 2026-08-10
---

# Hệ thị giác máy (MVS) — pipeline 5 bước

> Tóm tắt 1 câu: **khung sườn của cả môn** — mọi lecture từ L4 đến L12 đều là chi tiết của một trong năm ô trong sơ đồ này.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #5 ← cần [[ba-tang-xu-ly-anh]] · → kế tiếp [[lan-can-va-lien-thong]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #tong-quan #pipeline

---

## 💡 Ý chính

```
Acquisition → Preprocessing → Segmentation → Feature Extraction → Classification
   (L4)         (L5·L6·L7)      (L8·L10)          (L9·L12)          (thuộc dl)
                                     ↑                  ↑
                                     └── Knowledge Base ┘
```

| Bước | Làm gì | Note trong kho |
|---|---|---|
| **1. Thu nhận** | Cảm biến → ma trận số | [[cam-bien-anh]] · [[lay-mau-anh]] |
| **2. Tiền xử lý** | Làm sạch: khử nhiễu, chỉnh sáng, khử mờ | [[can-bang-histogram]] · [[loc-lam-min]] |
| **3. Phân đoạn** | Tách vật khỏi nền | [[nguong-hoa]] · [[hinh-thai-hoc]] |
| **4. Trích đặc trưng** | Vùng → con số mô tả (diện tích, biên, keypoint) | [[bien-anh-la-gi]] |
| **5. Phân loại** | Đặc trưng → nhãn | [[ml/chon-mo-hinh]] |

**Knowledge Base** không phải một bước mà là **tri thức miền** bơm ngang vào bước 3 và 4: biết trước biển số xe là hình chữ nhật tỉ lệ ~4:1 thì bước phân đoạn loại được ngay 99% ứng viên sai.

## 🧩 Ví dụ: nhận dạng biển số xe

1. **Thu nhận** — camera chụp xe đang vào cổng.
2. **Tiền xử lý** — ảnh ngược sáng → cân bằng histogram cho chữ nổi lên.
3. **Phân đoạn** — nhị phân hoá, tìm vùng chữ nhật có tỉ lệ đúng → cắt lấy vùng biển số.
4. **Trích đặc trưng** — cắt tiếp thành từng ký tự, mỗi ký tự lấy ma trận điểm.
5. **Phân loại** — mỗi ký tự → chữ/số cụ thể → ghép thành chuỗi biển số.

Hỏng ở bước 2 (ảnh vẫn ngược sáng) thì bước 3 cắt trượt, và **bước 5 dù dùng model gì cũng sai**.

## ⚙️ Vì sao đáng nhớ

Khi debug một hệ thị giác chạy sai, pipeline này cho **thứ tự kiểm tra**: soi ngược từ bước 1 lên, không phải nhảy thẳng vào chỉnh model ở bước 5. Đây là bài học lặp lại ở [[../../projects/INDEX|📦 chủ đề xuyên suốt]] của các project.

## ⚠️ HVS vs MVS — vì sao máy khó bằng người

Ba thứ mắt người làm được mà máy chật vật:

| Ưu thế của người | Vì sao máy khó |
|---|---|
| Kho ảnh trong đầu khổng lồ | Máy cần dataset gán nhãn tương đương — đắt |
| Nhận ra tức thì | Máy phải quét toàn ảnh, đắt tính toán |
| Hoạt động ở **mọi điều kiện** sáng/góc/che khuất | Máy nhạy với đổi phân bố dữ liệu |

Ngược lại, MVS thắng người ở **độ chính xác đo lường** và **khả năng nhân bản** — một hệ đo đúng 0,01 mm thì đo triệu lần vẫn đúng, không mỏi mắt.

---

## 🔗 Liên kết
- **Tiền đề:** [[ba-tang-xu-ly-anh]]
- **Dẫn tới:** [[lan-can-va-lien-thong]] · [[cam-bien-anh]]
- **Liên môn:** [[ml/xac-dinh-van-de]] — cùng tinh thần: định nghĩa đúng bài toán và pipeline trước khi chọn thuật toán.

## ❓ Câu hỏi mở
- Học sâu end-to-end gộp bước 2–5 vào một mạng; khi đó Knowledge Base đi đâu?

## 📚 Nguồn
- Lecture 1 — Introduction & Overview

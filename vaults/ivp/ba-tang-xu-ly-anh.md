---
slug: ba-tang-xu-ly-anh
title: Ba tầng xử lý ảnh — low · mid · high
vault: ivp
type: concept
branch: A
order: 4
status: learning
tags: [ivp, tong-quan]
prev: [kieu-du-lieu-anh]
next: [he-thi-giac-may]
related: [anh-so-la-gi]
sources: ["L1 — Introduction & Overview"]
created: 2026-08-10
---

# Ba tầng xử lý ảnh — low · mid · high

> Tóm tắt 1 câu: phân tầng theo **đầu vào → đầu ra là gì**: ảnh→ảnh (low), ảnh→đặc trưng (mid), đặc trưng→ý nghĩa (high).

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #4 ← cần [[kieu-du-lieu-anh]] · → kế tiếp [[he-thi-giac-may]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #tong-quan

---

## 💡 Ý chính

| Tầng | Vào → Ra | Việc điển hình | Nằm ở lecture |
|---|---|---|---|
| **Low-level** | ảnh → **ảnh** | khử nhiễu, tăng tương phản, làm sắc nét, khử mờ | L5 · L6 · L7 |
| **Mid-level** | ảnh → **đặc trưng** | trích biên, phân đoạn vùng, gán nhãn, keypoint | L8 · L9 · L10 · L12 |
| **High-level** | đặc trưng → **ý nghĩa** | nhận dạng vật thể, hiểu cảnh, phân loại | ngoài phạm vi môn — thuộc `dl` |

**Tiêu chí phân biệt chỉ có một:** nhìn vào **kiểu của đầu ra**. Nếu kết quả vẫn là ảnh xem được → low. Nếu kết quả là danh sách/toạ độ/nhãn vùng → mid. Nếu kết quả là *tên* của thứ trong ảnh → high.

## 🧩 Trực giác

Giống ba người làm ba việc khác nhau trên cùng bức ảnh CT:
- **Low:** kỹ thuật viên chỉnh sáng/tương phản cho ảnh dễ nhìn.
- **Mid:** phần mềm khoanh vùng khối u và đo diện tích.
- **High:** bác sĩ kết luận "u lành hay ác".

Mỗi tầng chỉ tin được khi tầng dưới đã làm tốt. Ảnh nhiễu → biên sai → vùng sai → chẩn đoán sai.

## ⚙️ Vì sao phân tầng này đáng nhớ

Nó trả lời câu hỏi **"nên sửa ở đâu"** khi pipeline cho kết quả tệ. Model phân loại kém không phải lúc nào cũng do model — rất thường là do tầng low-level chưa làm sạch, khiến đặc trưng ở tầng mid không ổn định. Đây chính là lý do [[../../projects/image-super-resolution|📦 image-super-resolution]] tồn tại: nâng chất lượng tầng thấp để tầng cao chạy được.

## ⚠️ Điều dễ nhầm

- **Học sâu không xoá bỏ phân tầng này, nó chỉ gộp mid + high vào một mạng.** CNN vẫn học ra bộ dò biên ở các tầng đầu — về bản chất là mid-level, chỉ khác là **kernel do dữ liệu quyết định** thay vì con người thiết kế. Xem [[dl/kien-truc-cnn-4-tang]].
- Tăng cường (enhancement) là **chủ quan** — "đẹp hơn" theo mắt người. Phục hồi (restoration) là **khách quan** — có mô hình suy hao để đảo ngược. Xem [[mo-hinh-suy-hao]].

---

## 🔗 Liên kết
- **Tiền đề:** [[anh-so-la-gi]]
- **Dẫn tới:** [[he-thi-giac-may]]
- **Liên môn:** [[dl/kien-truc-cnn-4-tang]] · [[dl/bon-muc-bai-toan-thi-giac]] — cách `dl` phân loại bài toán thị giác là bản mở rộng của tầng high-level ở đây.

## ❓ Câu hỏi mở
- Ranh giới low/mid nằm ở đâu với những phép vừa lọc vừa trích đặc trưng như top-hat?

## 📚 Nguồn
- Lecture 1 — Introduction & Overview

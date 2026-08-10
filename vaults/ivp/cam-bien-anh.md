---
slug: cam-bien-anh
title: Cảm biến ảnh — CCD, CMOS, Bayer
vault: ivp
type: concept
branch: B
order: 1
status: learning
tags: [ivp, phan-cung]
prev: [khoang-cach-pixel]
next: [lay-mau-anh]
related: [mo-hinh-mau-rgb, nhieu-anh]
sources: ["L4 — Image Sensing & Acquisition"]
created: 2026-08-10
---

# Cảm biến ảnh — CCD, CMOS, Bayer

> Tóm tắt 1 câu: cảm biến chỉ đếm được **số photon**, không phân biệt được màu — nên ảnh màu mà bạn nhận về đã là kết quả của một phép **nội suy đoán mò**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #1 ← cần [[khoang-cach-pixel]] · → kế tiếp [[lay-mau-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-cung

---

## 💡 Ý chính

Chuỗi biến đổi vật lý → số:

```
Ánh sáng (photon) → photosite (silicon) → điện tích → điện áp → ADC → số nguyên
```

Mỗi **photosite** chỉ trả lời được một câu hỏi: *"có bao nhiêu photon rơi vào tôi?"* — tức là **cường độ**, không phải màu.

| | CCD | CMOS |
|---|---|---|
| Đọc tín hiệu | Dồn điện tích qua một ngõ chung | Mỗi pixel tự khuếch đại tại chỗ |
| Chất lượng | Nhiễu thấp, đồng đều hơn | Nhiễu cao hơn |
| Điện & giá | Tốn điện, đắt | Rẻ, ít điện, tích hợp được mạch |
| Ngày nay | Thiết bị khoa học, thiên văn | **Gần như mọi camera & điện thoại** |

## 🧩 Bayer pattern — ảnh màu được "đoán" ra thế nào

Vì photosite mù màu, người ta dán **kính lọc màu** lên từng ô theo mẫu Bayer:

```
G R G R
B G B G      ← 50% G, 25% R, 25% B
G R G R
B G B G
```

Mỗi pixel do đó **chỉ đo thật 1 trong 3 kênh**; hai kênh còn lại được **nội suy từ hàng xóm** — bước này gọi là **demosaicing**.

Hệ quả đáng nhớ: ảnh RGB `12 MP` từ điện thoại **không có 36 triệu phép đo**, chỉ có **12 triệu phép đo và 24 triệu con số đoán**.

Vì sao G nhiều gấp đôi? Mắt người nhạy nhất với vùng xanh lá — đó cũng là lý do hệ số `0.587` trong công thức chuyển sang ảnh xám ở [[kieu-anh-va-do-sau-bit]].

**Máy 3-CCD** dùng lăng kính tách chùm sáng thành 3 đường tới 3 cảm biến riêng → đo thật cả 3 kênh, không cần đoán. Đắt và cồng kềnh nên chỉ có ở máy quay chuyên nghiệp.

## ⚠️ Blooming và các lỗi phần cứng

- **Blooming** — photosite bão hoà, điện tích **tràn sang ô bên cạnh**. Triệu chứng: chụp đèn/mặt trời thấy **vệt sáng kéo dài** quanh nguồn sáng. Đây là lỗi vật lý, không phải lỗi nén ảnh.
- **Méo quang học** — *pincushion* (gối) và *barrel* (thùng), do ống kính chứ không do cảm biến. Sửa bằng phép [[bien-doi-affine]] mở rộng (phi tuyến).
- Nhiễu cảm biến ở CMOS chính là nguồn gốc thực tế của **nhiễu Gaussian** trong [[nhieu-anh]] — nó không phải giả định toán học suông.

## ⚙️ Vì sao người xử lý ảnh phải quan tâm

- Artifact demosaicing (viền màu giả ở cạnh sắc) **trông hệt như** nhiễu — nếu không biết nguồn gốc, sẽ đi khử nhầm bằng bộ lọc và làm nhoè ảnh.
- Ảnh **RAW** là dữ liệu Bayer chưa nội suy. Muốn xử lý ở mức nghiêm túc thì làm trên RAW, vì JPEG đã qua demosaicing + nén mất mát rồi.

---

## 🔗 Liên kết
- **Tiền đề:** [[khoang-cach-pixel]]
- **Dẫn tới:** [[lay-mau-anh]]
- **Liên quan:** [[nhieu-anh]] · [[mo-hinh-mau-rgb]] · [[noi-suy-anh]]

## ❓ Câu hỏi mở
- Ảnh siêu phân giải học từ JPEG có học luôn cả artifact demosaicing của máy chụp không?

## 📚 Nguồn
- Lecture 4 — Image Sensing & Acquisition

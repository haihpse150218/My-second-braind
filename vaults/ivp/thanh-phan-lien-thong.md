---
slug: thanh-phan-lien-thong
title: Thành phần liên thông — đếm vật thể
vault: ivp
type: concept
branch: F
order: 6
status: learning
tags: [ivp, hinh-thai, phan-doan]
prev: [top-hat]
next: [bien-anh-la-gi]
related: [lan-can-va-lien-thong, watershed]
sources: ["L8 — Morphological Image Processing", "L2 — Image Processing Basics"]
created: 2026-08-10
---

# Thành phần liên thông — đếm vật thể

> Tóm tắt 1 câu: gán cho mỗi cụm pixel dính nhau một **nhãn số** riêng — bước biến ảnh nhị phân thành **danh sách vật thể đo đếm được**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #6 ← cần [[top-hat]] · → kế tiếp [[bien-anh-la-gi]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai #phan-doan

---

## 💡 Ý chính

Đầu vào là ảnh nhị phân, đầu ra là **ảnh nhãn**: mọi pixel thuộc vật thứ nhất mang giá trị `1`, vật thứ hai `2`, v.v. Nền là `0`.

```
0 0 1 1 0 0 1              0 0 1 1 0 0 2
0 0 1 1 0 0 1     ───►     0 0 1 1 0 0 2
0 0 0 0 0 0 1              0 0 0 0 0 0 2
```

**Đây là bước chuyển tầng quan trọng:** từ tầng "ảnh → ảnh" sang tầng "ảnh → **đặc trưng**", theo phân loại ở [[ba-tang-xu-ly-anh]]. Sau bước này ta không còn nói về pixel nữa mà nói về **vật thể**, mỗi vật có diện tích, chu vi, tâm, hình bao — tức là **những con số đưa vào model phân loại được**.

## 🧩 Cơ chế — quét hai lượt

1. **Lượt 1:** quét từ trên xuống. Mỗi pixel vật xem các hàng xóm **đã duyệt**: chưa có nhãn nào → cấp nhãn mới; có một nhãn → lấy nhãn đó; có **hai nhãn khác nhau** → lấy nhãn nhỏ hơn và **ghi nhận hai nhãn này tương đương**.
2. **Lượt 2:** gộp các lớp tương đương lại, đánh số lại liên tục.

Bước "tương đương" là cần thiết vì hình chữ **U**: hai nhánh được cấp nhãn khác nhau khi quét từ trên, mãi tới đáy mới lộ ra chúng là một vật.

## ⚠️ Connectivity quyết định con số

> 🚨 **Kết quả đếm phụ thuộc vào việc chọn lân cận 4 hay 8** — xem [[lan-can-va-lien-thong]].

Hai vật chỉ chạm nhau ở **góc chéo**: theo `N₄` là **2 vật**, theo `N₈` là **1 vật**. Không có đáp án nào đúng tuyệt đối — phải chọn theo bài toán và **ghi lại lựa chọn đó**, nếu không kết quả không tái lập được.

## ⚙️ Quy trình thực tế

```
ảnh xám → nguong-hoa → opening-closing → thanh-phan-lien-thong → lọc theo diện tích → đếm
```

Bước **lọc theo diện tích** rất quan trọng: sau khi gán nhãn, bỏ mọi vùng nhỏ hơn một ngưỡng. Đây là cách khử nhiễu **chính xác hơn** opening vì lọc theo **diện tích thật** chứ không theo việc có lọt SE hay không.

Từ ảnh nhãn tính được các đặc trưng:

| Đặc trưng | Dùng để |
|---|---|
| Diện tích, chu vi | Lọc, phân loại theo cỡ |
| Tâm (centroid) | Định vị, theo dõi qua các frame |
| Bounding box | Cắt vùng, đưa vào model phân loại |
| Độ tròn `4πA/P²` | Phân biệt hình tròn với hình dài |

## ⚠️ Điều dễ nhầm

- **Vật dính nhau bị đếm thành một.** Đây là hạn chế lớn nhất. Opening có thể cắt cầu nối mỏng, nhưng vật thật sự chồng lấn thì cần [[watershed]].
- **Vật bị thủng lỗ vẫn là một thành phần** (lỗ thuộc nền, không tách vật). Nhưng lỗ làm sai chu vi và độ tròn → nên `imfill` lấp lỗ trước khi đo.
- **Vật chạm mép ảnh nên loại bỏ** khi thống kê — chúng bị cắt cụt nên diện tích không đúng.
- **Đếm được ≠ phân loại được.** Thành phần liên thông cho biết *có bao nhiêu vật*, không cho biết *chúng là gì* — đó là việc của bước cuối trong [[he-thi-giac-may]].

---

## 🔗 Liên kết
- **Tiền đề:** [[top-hat]] · [[opening-closing]] · [[lan-can-va-lien-thong]]
- **Dẫn tới:** [[bien-anh-la-gi]] · [[watershed]]
- **Liên quan:** [[nguong-hoa]] · [[he-thi-giac-may]]

## ❓ Câu hỏi mở
- Với vật chồng lấn nhiều, watershed cũng hạn chế — instance segmentation học sâu giải bài này khác ở đâu?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing
- Lecture 2 — Image Processing Basics

---
slug: tran-so-anh
title: Tràn số & kẹp giá trị
vault: ivp
type: concept
branch: C
order: 2
status: learning
tags: [ivp, thuc-hanh, bay]
prev: [phep-toan-so-hoc-anh]
next: [phep-logic-va-roi]
related: [kieu-du-lieu-anh]
sources: ["L5 — Arithmetic, Logic & Geometric Operations"]
created: 2026-08-10
---

# Tràn số & kẹp giá trị

> Tóm tắt 1 câu: kết quả vượt `[0,255]` bị **kẹp im lặng** — thông tin mất mà không có lỗi nào được báo, nên phải tính ở `double` rồi mới co về.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #2 ← cần [[phep-toan-so-hoc-anh]] · → kế tiếp [[phep-logic-va-roi]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #thuc-hanh #bay

---

## 💡 Ý chính

| Tình huống | Tên gọi | Chuyện gì xảy ra |
|---|---|---|
| Kết quả > 255 | **Overflow** | Kẹp về `255` — vùng sáng **bệt thành một mảng trắng** |
| Kết quả < 0 | **Underflow** | Kẹp về `0` — vùng tối **bệt thành một mảng đen** |

Chữ quan trọng nhất là **"im lặng"**: không exception, không cảnh báo. Ảnh vẫn hiện ra, chỉ là đã mất một phần dữ liệu vĩnh viễn.

## 🧩 Vì sao đây không phải chuyện nhỏ

Vùng bị kẹp là vùng **đã mất hết cấu trúc**: mọi pixel bằng đúng 255. Tăng sáng ảnh chụp ngược sáng bằng `+80` thì bầu trời thành một mảng trắng phẳng lì — và **không có thao tác nào sau đó lấy lại được** chi tiết mây, vì đơn giản là dữ liệu đã bị ghi đè bằng cùng một con số.

Đây cùng bản chất với [[aliasing-anh]]: một loại mất mát **không đảo ngược được**, khác với mờ hay nhiễu vốn còn cứu vãn phần nào.

## ⚙️ Ba cách xử lý

| Cách | Làm gì | Đánh đổi |
|---|---|---|
| **Truncation** (kẹp) | Cắt về biên `0`/`255` | Nhanh, mặc định — nhưng **mất dữ liệu** |
| **Normalization** | Co toàn dải kết quả về `[0,255]` theo min/max thực | Giữ hết thông tin tương đối, nhưng **đổi độ sáng tổng thể** |
| **Tính ở `double`** | Làm mọi phép ở dải rộng, chỉ ép kiểu ở **bước cuối** | Cách đúng cho chuỗi nhiều phép — tốn bộ nhớ hơn |

> ✅ **Luật thực hành:** một chuỗi phép toán thì chỉ được ép về `uint8` **đúng một lần, ở cuối cùng**. Ép ở giữa chừng là kẹp nhiều lần, mỗi lần mất thêm.

Hàm `imlincomb` tồn tại chính vì lý do này: nó tính **tổ hợp tuyến tính** `k₁·A + k₂·B + …` toàn bộ ở `double` rồi mới ép kiểu một lần duy nhất, thay vì kẹp sau mỗi phép cộng trung gian.

## ⚠️ Điều dễ nhầm

- **Kẹp ≠ quay vòng.** Kiểu `uint8` trong thư viện ảnh **kẹp** (`260 → 255`). Nhưng số học C thuần thì **quay vòng** (`260 → 4`) — cho ra ảnh lốm đốm nhiễu loạn rất đặc trưng. Thấy triệu chứng đó là biết đang dùng phép cộng thô chứ không phải hàm ảnh.
- **Trừ ảnh rất dễ underflow** vì kết quả âm là bình thường. Đó là lý do phải dùng phép hiệu **trị tuyệt đối**.
- Ảnh đã bị kẹp thì [[histogram-anh]] có **một cột dựng đứng ở đúng 0 hoặc 255**. Đây là dấu hiệu chẩn đoán nhanh nhất, xem histogram là biết ngay.

---

## 🔗 Liên kết
- **Tiền đề:** [[phep-toan-so-hoc-anh]] · [[kieu-du-lieu-anh]]
- **Dẫn tới:** [[phep-logic-va-roi]]
- **Liên quan:** [[histogram-anh]] · [[gamma-correction]]

## ❓ Câu hỏi mở
- Normalization giữ được thông tin tương đối nhưng đổi độ sáng — khi nào thì cái giá đó chấp nhận được?

## 📚 Nguồn
- Lecture 5 — Arithmetic, Logic & Geometric Operations

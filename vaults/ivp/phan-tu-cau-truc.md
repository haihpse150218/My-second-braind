---
slug: phan-tu-cau-truc
title: Phần tử cấu trúc (SE)
vault: ivp
type: concept
branch: F
order: 2
status: learning
tags: [ivp, hinh-thai]
prev: [hinh-thai-hoc]
next: [gian-no-va-co-hep]
related: [tich-chap-2d, khoang-cach-pixel]
sources: ["L8 — Morphological Image Processing"]
created: 2026-08-10
---

# Phần tử cấu trúc (SE)

> Tóm tắt 1 câu: **"cây chổi"** dùng để quét ảnh — hình dạng và kích thước của nó quyết định toàn bộ kết quả, giống như kernel quyết định tác dụng của tích chập.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #2 ← cần [[hinh-thai-hoc]] · → kế tiếp [[gian-no-va-co-hep]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai

---

## 💡 Ý chính

**SE** (structuring element) là một tập nhỏ có **hình dạng** và một **điểm gốc** (thường ở tâm). Nó đóng vai trò trong hình thái học đúng như **kernel** đóng vai trò trong [[tich-chap-2d]].

| SE | Hình | Đặc trưng |
|---|---|---|
| `square` / `rect` | ⬛ | Ứng với [[khoang-cach-pixel\|D8]]; giữ góc vuông, làm vật vuông vắn |
| `disk` | ⚫ | Ứng với Euclid; **đẳng hướng**, không thiên hướng nào — mặc định an toàn |
| `diamond` | ◇ | Ứng với D4 |
| `line` | ▬ | **Có hướng** — chỉ tác động theo một phương |
| `cross` | ✚ | Lân cận 4 |

## 🧩 SE quyết định điều gì

**Kích thước ⇒ ngưỡng lọc theo kích thước.** Opening với SE `disk` bán kính `5` sẽ **xoá sạch** mọi vật nhỏ hơn đĩa đó, **giữ nguyên** mọi vật lớn hơn. Đây là bộ lọc *theo kích thước*, thứ mà không bộ lọc tuyến tính nào làm được.

**Hình dạng ⇒ chọn lọc theo hình.** Đây là điểm mạnh nhất:

| Muốn | Dùng SE |
|---|---|
| Giữ **đường ngang**, xoá đường dọc | `line` **ngang**, dài |
| Tìm vật **tròn** | `disk` |
| Không thiên vị hướng nào | `disk` |

**Ví dụ kinh điển — tách bảng khỏi chữ trong ảnh scan:**
- Opening với SE `line` ngang dài → chỉ còn **đường kẻ ngang** của bảng.
- Opening với SE `line` dọc dài → chỉ còn **đường kẻ dọc**.
- Ảnh gốc trừ đi hai kết quả trên → còn lại **chữ**.

Không có bộ lọc tuyến tính nào tách được như thế, vì chữ và đường kẻ có **cùng độ đậm** — chúng chỉ khác nhau về **hình dạng**.

## ⚙️ Chọn SE thế nào

1. **Hình dạng** — theo hình của thứ cần giữ hoặc cần xoá.
2. **Kích thước** — theo ngưỡng kích thước muốn cắt. SE lớn hơn vật cần xoá, nhỏ hơn vật cần giữ.
3. **Điểm gốc** — thường ở tâm; đặt lệch tâm thì kết quả **bị dịch đi**.
4. Không rõ thì bắt đầu bằng `disk` — nó trung tính nhất.

## ⚠️ Điều dễ nhầm

- **SE không phải kernel tích chập.** SE chỉ có `0`/`1` (thuộc hay không thuộc tập), không có trọng số, và phép toán là **so khớp tập hợp** chứ không phải tổng có trọng số.
- **SE lớn không "mạnh hơn" mà là "thô hơn".** Tăng kích thước SE để khử nhiễu tốt hơn thì đồng thời xoá luôn các chi tiết thật cùng cỡ.
- **SE vuông tạo artifact vuông.** Vật tròn sau nhiều lượt xử lý với SE `square` sẽ dần thành hình vuông — cùng bản chất với chuyện D8 bóp méo hình ở [[khoang-cach-pixel]].
- **SE có hướng thì kết quả phụ thuộc hướng của ảnh.** Ảnh scan bị nghiêng 5° thì SE `line` ngang không còn bắt được đường kẻ nữa — phải chỉnh nghiêng bằng [[bien-doi-affine]] trước.

---

## 🔗 Liên kết
- **Tiền đề:** [[hinh-thai-hoc]]
- **Dẫn tới:** [[gian-no-va-co-hep]] · [[opening-closing]]
- **Liên quan:** [[tich-chap-2d]] · [[khoang-cach-pixel]] · [[bien-doi-affine]]

## ❓ Câu hỏi mở
- Có cách nào **học** ra SE tối ưu từ dữ liệu, giống như CNN học ra kernel không?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing

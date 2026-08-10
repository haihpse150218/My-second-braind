---
slug: phan-doan-anh
title: Phân đoạn ảnh
vault: ivp
type: concept
branch: H
order: 1
status: learning
tags: [ivp, phan-doan]
prev: [hough-transform]
next: [nguong-hoa]
related: [bien-anh-la-gi, nguong-hoa]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Phân đoạn ảnh

> Tóm tắt 1 câu: chia ảnh thành các **vùng không chồng nhau** — cây cầu từ tầng xử lý pixel sang tầng phân tích vật thể.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #1 ← cần [[hough-transform]] · → kế tiếp [[nguong-hoa]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Ý chính

Chia ảnh `R` thành các vùng `R₁ ... R_n` thoả:

| Điều kiện | Nghĩa |
|---|---|
| `⋃ Rᵢ = R` | Phủ **hết** ảnh, không sót pixel nào |
| `Rᵢ ∩ Rⱼ = ∅` | **Không chồng lấn** |
| Mỗi `Rᵢ` **liên thông** | Vùng là một khối liền, xem [[lan-can-va-lien-thong]] |
| `P(Rᵢ) = TRUE` | Mỗi vùng **đồng nhất** theo một tiêu chí |
| `P(Rᵢ ∪ Rⱼ) = FALSE` | Hai vùng kề nhau **khác nhau** — nếu không thì phải gộp |

Hai điều kiện cuối là chỗ mọi thuật toán khác nhau: **"đồng nhất" định nghĩa thế nào**.

## 🧩 Hai hướng tiếp cận — từ hai tính chất đối lập

| | **Gián đoạn** (discontinuity) | **Tương đồng** (similarity) |
|---|---|---|
| Tìm cái gì | Chỗ **thay đổi đột ngột** | Chỗ **giống nhau** |
| Nhánh | [[bien-anh-la-gi\|Dò biên]] (nhánh G) | Phân vùng (nhánh H) |
| Phương pháp | Sobel, Canny, Hough | [[nguong-hoa]], [[region-growing]], [[watershed]] |
| Kết quả | Các **đoạn biên**, có thể đứt | Các **vùng khép kín**, phủ hết ảnh |

> 📌 Hai hướng này **bổ sung nhau chứ không thay thế nhau**. Dò biên cho ranh giới chính xác nhưng có thể hở; phân vùng cho vùng khép kín nhưng ranh giới có thể lệch. Nhiều hệ thực tế chạy cả hai rồi kết hợp.

Đây cũng là lý do L9 và L10 là hai lecture riêng: chúng nhìn cùng một bài toán từ hai phía.

## ⚙️ Bảng chọn phương pháp

| Đặc điểm ảnh | Nên dùng |
|---|---|
| Histogram **bimodal** rõ, chiếu sáng đều | [[nguong-hoa]] toàn cục + [[otsu]] |
| Chiếu sáng **không đều** | [[nguong-cuc-bo]], hoặc [[top-hat]] rồi ngưỡng toàn cục |
| Vùng đồng nhất nhưng độ sáng **chồng lấn** với nền | [[region-growing]] |
| Vật thể **dính nhau** | [[watershed]] |
| Ranh giới quan trọng hơn vùng | [[canny]] + [[hough-transform]] |
| Ngữ nghĩa phức tạp (người, xe, mèo) | ❌ cổ điển bó tay → [[dl/mask-rcnn]] |

## ⚠️ Điều dễ nhầm

- **Phân đoạn không cho biết vật đó LÀ GÌ.** Nó chỉ tách vùng. Gắn nhãn ngữ nghĩa là bước sau, thuộc tầng high-level của [[ba-tang-xu-ly-anh]].
- **Không có phân đoạn "đúng" duy nhất.** Ảnh một người mặc áo sọc: tách theo màu ra chục vùng, tách theo ngữ nghĩa ra một vùng "người". Cả hai đều thoả định nghĩa toán học. **Đúng hay sai phụ thuộc bài toán**, không phụ thuộc thuật toán.
- **Đây là bước dễ hỏng nhất trong pipeline** [[he-thi-giac-may]]. Phân đoạn sai thì mọi đặc trưng đo được sau đó đều sai, và model phân loại dù tốt đến mấy cũng vô nghĩa.
- **Phương pháp cổ điển chỉ dùng cường độ/màu/texture** — chúng không có khái niệm "vật thể". Đó là giới hạn nguyên tắc, không phải chuyện tinh chỉnh tham số.

---

## 🔗 Liên kết
- **Tiền đề:** [[hough-transform]] · [[bien-anh-la-gi]]
- **Dẫn tới:** [[nguong-hoa]] · [[region-growing]] · [[watershed]]
- **Liên quan:** [[he-thi-giac-may]] · [[ba-tang-xu-ly-anh]]
- **Liên môn:** [[dl/mask-rcnn]] · [[dl/bon-muc-bai-toan-thi-giac]] — học sâu phân đoạn **theo ngữ nghĩa**, thứ mà tiêu chí đồng nhất về cường độ không bao giờ đạt tới.

## ❓ Câu hỏi mở
- Có cách đánh giá chất lượng phân đoạn khách quan khi không có "đáp án đúng" duy nhất không?

## 📚 Nguồn
- Lecture 10 — Image Segmentation

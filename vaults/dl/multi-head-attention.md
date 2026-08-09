---
slug: multi-head-attention
title: Multi-head Attention
vault: dl
type: concept
branch: H
order: 5
status: done
tags: [dl, attention, transformer, s07]
prev: [self-vs-cross-attention]
next: [positional-encoding]
created: 2026-08-09
---

# Multi-head Attention

> Tóm tắt 1 câu: Chạy `h` bộ attention **song song trên các không gian con nhỏ hơn**, mỗi đầu học một **kiểu quan hệ** khác nhau — và vì mỗi đầu nhỏ đi đúng `h` lần nên **tổng chi phí không đổi**.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #5 ← cần [[self-vs-cross-attention]] · → kế tiếp [[positional-encoding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #transformer #s07

---

## 💡 Ý chính

Một lớp attention duy nhất chỉ cho ra **một** phân bố trọng số cho mỗi từ — tức là **một cách nhìn**. Nhưng một từ trong câu có nhiều quan hệ cùng lúc: quan hệ **ngữ pháp** (chủ ngữ nào chi phối động từ này), quan hệ **đồng tham chiếu** (đại từ này thay cho ai), quan hệ **chủ đề**.

Ép tất cả vào một softmax thì chúng **triệt tiêu lẫn nhau** — trọng số bị trung bình hoá. Multi-head cho mỗi quan hệ một "kênh" riêng.

## 🔢 Cơ chế (slide 39)

```
        ┌─ Linear ─┐
V,K,Q ──┼─ Linear ─┼──→ Scaled Dot-Product Attention  × h đầu
        └─ Linear ─┘                 │
                                  Concat
                                     │
                                  Linear     ← trộn kết quả của h đầu lại
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `h` | số đầu (head) — bản gốc dùng **8** |
| `d_model` | chiều làm việc chung — bản gốc **512** |
| `d_k = d_v = d_model / h` | 🔑 chiều **của mỗi đầu** — 512/8 = **64** |

## 🧩 Trực giác — vì sao "miễn phí"

Đây là chỗ nhiều người hiểu sai. Multi-head **không phải** chạy 8 lần attention full-size.

```
1 đầu 512 chiều  ≈  8 đầu × 64 chiều       ← cùng số phép tính, cùng số tham số
   1 cách nhìn         8 cách nhìn
```

Mỗi đầu bị **bóp xuống 64 chiều** trước khi tính attention, rồi 8 kết quả **nối lại** thành 512 và cho qua một `Linear` cuối để trộn. Nên đổi từ 1 đầu sang 8 đầu gần như **không tốn thêm gì**, mà được 8 góc nhìn.

Ví von: thay vì thuê **1 người đọc rất giỏi**, thuê **8 người mỗi người soi một khía cạnh** rồi họp lại — cùng ngân sách.

### 🔗 Đây chính là "nhiều FILTER trong một tầng conv", đặt sang chỗ khác

| | **Conv layer** | **Multi-head attention** |
|---|---|---|
| Đơn vị lặp | 1 **filter** | 1 **head** |
| Mỗi đơn vị bắt gì | một **kiểu hoạ tiết** (cạnh dọc, góc, vân) | một **kiểu quan hệ** (ngữ pháp, đồng tham chiếu, chủ đề) |
| Gộp kết quả | **xếp chồng thành các channel** | **Concat** |
| Ai trộn lại | tầng conv kế tiếp | `Linear` cuối |

🔑 Cùng một triết lý với [[filter-va-feature-map]]: **một bộ dò chỉ bắt được một kiểu — muốn nhiều kiểu thì chạy nhiều bộ song song rồi để tầng sau trộn.** Nhớ được cái này thì multi-head không còn là khái niệm mới, chỉ là **mẹo cũ đặt sang chỗ khác**.

⚠️ **Nhưng đừng suy diễn quá xa ở một điểm**: thêm filter cho conv là **tăng** chi phí và năng lực; thêm head (giữ nguyên `d_model`) là **chia nhỏ** một ngân sách cố định. Xem mục bẫy bên dưới.

## ⚙️ Khi nào dùng

- Mặc định trong **mọi** Transformer — xem [[transformer-block]]. Không có lý do gì dùng single-head trừ khi debug.
- `h` phải **chia hết** `d_model`. Chọn `h` = 4 (model nhỏ) · **8** (chuẩn) · 12–16 (model lớn).

## ⚠️ Lỗi thường gặp

- ⚠️ **Tăng `h` không tăng năng lực** nếu giữ nguyên `d_model` — chỉ chia nhỏ cái bánh. `h` quá lớn ⇒ mỗi đầu chỉ còn vài chiều ⇒ **không đủ chỗ biểu diễn**, kết quả tệ đi.
- ⚠️ **Đừng tin ngay các bài viết "đầu số 3 học ngữ pháp"**. Việc mỗi đầu học một quan hệ sạch sẽ là **kỳ vọng thiết kế**, không phải bảo đảm; thực tế nhiều đầu học trùng nhau và **cắt bỏ vẫn không tụt điểm**. Vẽ heatmap ra xem, đừng kể chuyện.
- 🚩 Trong đồ án, nếu vẽ attention heatmap để đưa vào báo cáo (xem [[show-attend-tell]]) thì phải **ghi rõ đang vẽ đầu nào**, hoặc trung bình qua các đầu — nếu không thì hình vẽ không tái lập được.

---

## 🔗 Liên kết
- **Tiền đề:** [[self-vs-cross-attention]] · [[general-attention-layer]]
- **Dẫn tới:** [[positional-encoding]] · [[transformer-block]]
- **Liên quan tới:** [[alignment-score]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 39

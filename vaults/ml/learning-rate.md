---
slug: learning-rate
title: Learning rate
vault: ml
type: concept
branch: A
order: 10
status: learning
tags: [toan, toi-uu-hoa, sieu-tham-so]
prev: [sgd]
next: [adam-optimizer]
related: [gradient-descent, hyperparameter-tuning]
created: 2026-08-10
---

# Learning rate

> Tóm tắt 1 câu: độ dài mỗi bước đi xuống dốc — **siêu tham số quan trọng nhất**, và cũng là thứ hỏng đầu tiên khi train không chạy.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #10 ← cần [[sgd]] · → kế tiếp [[adam-optimizer]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #toi-uu-hoa #sieu-tham-so

---

## 💡 Ý chính

$$
w \leftarrow w - \eta \, \nabla L(w)
$$

`η` (eta) là **learning rate**. [[gradient]] cho **hướng**; `η` quyết định **đi bao xa** theo hướng đó.

| `η` | Chuyện gì xảy ra | Dấu hiệu trên đường loss |
|---|---|---|
| **Quá nhỏ** | Đi từng bước tí một | Loss giảm **rất chậm**, thẳng đuồn đuột |
| **Vừa** | Hội tụ gọn | Loss giảm nhanh rồi phẳng dần |
| **Quá lớn** | **Nhảy vọt qua đáy**, dao động hai bên | Loss **răng cưa mạnh** hoặc đi ngang |
| **Rất lớn** | Bật ra xa, phân kỳ | Loss **tăng dần** hoặc thành `NaN` |

> 📌 **Đọc đường loss là cách chẩn đoán `η` nhanh nhất.** Loss thành `NaN` sau vài bước thì gần như chắc chắn `η` quá lớn — thử giảm 10 lần trước khi nghi ngờ bất cứ thứ gì khác.

## 🧩 Trực giác

Xuống núi trong sương mù. Gradient cho biết hướng dốc xuống; `η` là **độ dài sải chân**.

- Sải quá ngắn → tới nơi vào năm sau.
- Sải quá dài → bước qua luôn thung lũng, đáp lên sườn bên kia, rồi lại bước ngược về — **dao động mãi không xuống được đáy**.

## ⚙️ Learning rate schedule — giảm dần theo thời gian

Ý tưởng: **bước dài lúc đầu** (đi nhanh về vùng đúng), **bước ngắn lúc sau** (tinh chỉnh vào đáy).

| Lịch | Cách làm |
|---|---|
| **Step decay** | Nhân `η` với `0,1` sau mỗi `k` epoch |
| **Exponential** | `η_t = η₀ · e^{−kt}` |
| **Cosine annealing** | Giảm theo hình cosin về gần 0 — rất phổ biến hiện nay |
| **Warmup** | ⚠️ **Tăng** `η` từ rất nhỏ trong vài trăm bước đầu |

**Warmup** nghe ngược đời nhưng có lý do: lúc mới khởi tạo, trọng số ngẫu nhiên nên gradient rất lớn và hỗn loạn — bước dài ngay lập tức sẽ đẩy model vào vùng tệ. Warmup gần như bắt buộc khi train Transformer.

**ReduceLROnPlateau** — giảm `η` khi loss validation ngừng cải thiện. Đây là cách thích nghi đơn giản mà hiệu quả, xem [[../vaults/dl/callbacks-keras|dl/callbacks-keras]].

## ⚙️ Tìm `η` thế nào

1. **Bắt đầu bằng thang log**: thử `1e-1, 1e-2, 1e-3, 1e-4` — không dò tuyến tính, vì tác động của `η` là theo bậc độ lớn.
2. **LR range test**: tăng `η` dần trong một lần chạy ngắn, vẽ loss theo `η` → chọn giá trị ngay **trước** chỗ loss bắt đầu vọt lên.
3. Giá trị khởi đầu hợp lý: `1e-3` cho [[adam-optimizer|Adam]], `1e-2` cho SGD + momentum.
4. Tinh chỉnh bằng [[hyperparameter-tuning]] — nhưng `η` nên tune **trước** mọi siêu tham số khác.

**`η` gắn với batch size**: tăng batch size lên `k` lần thì thường tăng `η` theo `k` hoặc `√k`. Xem [[sgd]].

## ⚠️ Điều dễ nhầm

- **Không có `η` tốt cho mọi bài toán, thậm chí cho mọi tham số.** Đó chính là lý do có [[adam-optimizer]] — nó tự điều chỉnh bước riêng cho từng tham số.
- **`η` nhỏ không "an toàn".** Ngoài chuyện chậm, nó còn dễ **kẹt ở cực tiểu địa phương nông** vì không đủ động lượng để thoát ra.
- **Đổi `η` giữa chừng làm kết quả không tái lập được** nếu không ghi lại lịch. Lưu cả schedule vào cấu hình thí nghiệm.
- Loss `NaN` cũng có thể do dữ liệu chưa [[chuan-hoa-du-lieu|chuẩn hoá]] — nhưng thử giảm `η` trước vì rẻ hơn.

---

## 🔗 Liên kết
- **Tiền đề:** [[sgd]] · [[gradient-descent]]
- **Dẫn tới:** [[adam-optimizer]]
- **Liên quan:** [[hyperparameter-tuning]] · [[chuan-hoa-du-lieu]]
- **Liên môn:** [[dl/batch-size-va-learning-rate]] · [[dl/callbacks-keras]]

## ❓ Câu hỏi mở
- Warmup giúp Transformer ổn định lúc đầu — cơ chế cụ thể là gì, và có thể thay bằng khởi tạo tốt hơn không?

## 📚 Nguồn
- `L1_Math_Overview.pdf` · `L8_NeuralNetwork.pdf`

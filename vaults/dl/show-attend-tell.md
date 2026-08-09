---
slug: show-attend-tell
title: "Show, Attend and Tell — attention cho image captioning"
vault: dl
type: concept
branch: H
order: 11
status: done
tags: [dl, attention, captioning, s07, do-an-viic]
prev: [image-captioning, attention-qkv]
created: 2026-08-09
---

# Show, Attend and Tell — attention cho image captioning

> Tóm tắt 1 câu: Thay vì tiêm ảnh **đúng một lần** vào `h_0` rồi để model tự quên, mỗi bước sinh từ lại **tính lại** xem nên nhìn vùng ảnh nào.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #11 ← cần [[image-captioning]] · [[attention-qkv]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #captioning #s07 #do-an-viic

---

## 💡 Bệnh nó chữa

[[image-captioning]] bản gốc (slide 12–13): CNN → MLP → `h_0`, rồi `y_t = g(y_{t-1}, h_{t-1}, c)` với **`c = h_0` cố định**.

```
ảnh ──CNN──→ h_0 ──→ h_1 → h_2 → h_3 → h_4 → …
              ↑
        tiêm ĐÚNG 1 LẦN         tới từ thứ 15 thì model gần như QUÊN MẤT ẢNH
```

Cùng đúng bệnh nút thắt cổ chai của [[attention-qkv]], nhưng ở phía ảnh.

## 🔢 Cơ chế (slide 10–18)

**Encoder** — CNN pretrained **không** dùng vector cuối, mà giữ **lưới đặc trưng không gian**:

```
ảnh ──CNN──→ z (H × W × D)      vd 7×7×512 hoặc 3×3 như slide
             │
             └─ mỗi ô z_{i,j} = "đặc trưng của một VÙNG ảnh"
```

**Decoder** — mỗi bước `t` tính lại từ đầu:

| Bước | Công thức | Ý nghĩa |
|---|---|---|
| 1 | `e_{t,i,j} = f_att(h_{t-1}, z_{i,j})` | Chấm **H×W điểm**: state trước hợp với vùng `(i,j)` tới đâu |
| 2 | `a_{t,:,:} = softmax(e_{t,:,:})`, `0 < a < 1` | Thành **bản đồ trọng số**, cộng lại bằng 1 |
| 3 | `c_t = Σ_{i,j} a_{t,i,j} · z_{i,j}` | **Trung bình có trọng số** các vùng ⇒ context vector của riêng bước `t` |
| 4 | `y_t = g(y_{t-1}, h_{t-1}, c_t)` | 🔑 `c` **đổi mỗi bước**, không còn cố định |

Ánh xạ về Q/K/V của [[attention-qkv]]: **Q = `h_{t-1}`** (decoder đang cần gì) · **K = V = `z_{i,j}`** (các vùng ảnh). Tức đây là **cross-attention** — xem [[self-vs-cross-attention]].

## 🧩 Kết quả nhìn thấy được (slide 18)

Caption *"A bird flying over a body of water"* — vẽ `a_t` đè lên ảnh:

| Sinh từ | Sáng ở đâu |
|---|---|
| `bird` | thân con chim |
| `water` | vùng mặt nước |
| `over` | khoảng giữa chim và nước |

## ⚙️ Ứng dụng cho đồ án ViIC

- ⭐ **Giá trị cho BÁO CÁO, không chỉ cho điểm số**: trọng số attention **vẽ được thành heatmap** → chỉ ra model đang nhìn đâu khi sinh từ nào. Đây là thứ **giải thích được** hiếm hoi của deep learning, rất đáng đưa vào slide thuyết trình.
- ⭐ **Công cụ debug định tính — tách lỗi theo khâu:**

  | Triệu chứng | Kết luận |
  |---|---|
  | Caption sai **+** heatmap nhìn **nhầm chỗ** | Lỗi ở **encoder / attention** — model không định vị được vật |
  | Heatmap **đúng chỗ** **+** từ vẫn sai | Lỗi ở **decoder ngôn ngữ** — nhìn đúng mà gọi tên sai |
  | Heatmap **loang đều cả ảnh** mọi bước | Attention **không học được gì** — kiểm `√d_k`, LR, hoặc feature bị đóng băng sai tầng |

  🔗 Cùng logic tách lỗi theo khâu như [[ragas]] ở nhánh thực chiến — biết hỏng ở đâu mới sửa đúng chỗ.

## ⚠️ Lỗi thường gặp

- ⚠️ **Lấy sai tầng CNN.** Phải lấy feature map **trước** global pooling / FC. Lấy sau `GAP` ([[flatten-vs-gap]]) thì `H×W` sụp về `1×1` ⇒ **attention chỉ còn 1 vùng để nhìn** ⇒ vô nghĩa, nhưng code **vẫn chạy** và loss **vẫn giảm**. Bẫy im lặng ([[bay-am-tham]]).
- ⚠️ **Lưới quá thô.** `H×W = 3×3` chỉ có 9 vùng — heatmap nhìn rất xấu và không đủ tinh để chỉ vật nhỏ. Thực tế dùng **7×7** (đầu ra ResNet ở ảnh 224×224) trở lên.
- ⚠️ **Đừng đánh giá attention bằng cảm tính.** Heatmap đẹp **không chứng minh** model tốt; vẫn phải đo bằng [[metric-sinh-chuoi]] (CIDEr cho caption). Heatmap dùng để **giải thích và debug**, không dùng để **kết luận**.
- ⚠️ Attention **không cứu được** [[teacher-forcing|exposure bias]] — đó là bệnh khác, chữa bằng scheduled sampling / [[beam-search]].

---

## 🔗 Liên kết
- **Tiền đề:** [[image-captioning]] · [[attention-qkv]] · [[alignment-score]]
- **Liên quan tới:** [[general-attention-layer]] · [[self-vs-cross-attention]] · [[metric-sinh-chuoi]] · [[ragas]] · [[flatten-vs-gap]]
- **Đồ án:** `D:\MSA-FPT\DeepLearning\DoAn-ViIC\`

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 10–18

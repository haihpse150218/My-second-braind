---
slug: fine-tuning
title: Fine-tuning
vault: ml
type: concept
branch: F
order: 10
status: learning
tags: [huan-luyen, transfer-learning, thuc-hanh]
prev: [deep-learning]
related: [dinh-huong-hoc, pytorch-vs-tensorflow]
created: 2026-08-10
---

# Fine-tuning

> Tóm tắt 1 câu: lấy model đã học sẵn trên dữ liệu lớn rồi **huấn luyện tiếp** trên dữ liệu của mình — cách thực tế nhất để có model tốt khi không có triệu mẫu và cụm GPU.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F (Nhập môn ML/DL/GenAI) · #10 ← cần [[deep-learning]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #huan-luyen #transfer-learning #thuc-hanh

---

## 💡 Ý chính

```
Model pretrained (ImageNet / văn bản web)  →  thay đầu ra  →  train tiếp trên dữ liệu của mình
```

**Vì sao được:** các tầng đầu của mạng học những đặc trưng **tổng quát** (cạnh, texture, cấu trúc ngữ pháp) — chúng đúng cho **mọi** bài toán cùng miền. Chỉ các tầng cuối mới chuyên biệt cho nhiệm vụ gốc.

→ Giữ lại phần tổng quát, thay và học lại phần chuyên biệt. Đây là ứng dụng trực tiếp của phân tầng đặc trưng ở [[../vaults/dl/kien-truc-cnn-4-tang|dl/kien-truc-cnn-4-tang]].

## ⚙️ Ba mức, chọn theo lượng dữ liệu

| Mức | Làm gì | Dùng khi |
|---|---|---|
| **Feature extraction** | **Đóng băng** toàn bộ; chỉ train tầng phân loại mới | Dữ liệu **rất ít** (< 1.000 mẫu) |
| **Fine-tune một phần** ⭐ | Đóng băng tầng đầu; train vài tầng cuối | Dữ liệu **vừa** |
| **Fine-tune toàn bộ** | Train hết với learning rate **nhỏ** | Dữ liệu **nhiều**, miền khác xa |

**Quy tắc chọn:**

| | Miền **giống** dữ liệu gốc | Miền **khác xa** |
|---|---|---|
| **Ít dữ liệu** | Feature extraction | ⚠️ Khó nhất — thử fine-tune tầng giữa |
| **Nhiều dữ liệu** | Fine-tune một phần | Fine-tune toàn bộ |

## ⚠️ Learning rate phải NHỎ

> 🚨 Đây là lỗi số 1 khi fine-tune: dùng `η` như train từ đầu.

Trọng số pretrained **đã ở gần một nghiệm tốt**. Bước lớn sẽ **phá huỷ** những gì đã học — gọi là **catastrophic forgetting**.

| Tình huống | `η` khuyến nghị |
|---|---|
| Train từ đầu | `1e-3` |
| **Fine-tune** | **`1e-4` đến `1e-5`** (nhỏ hơn 10–100 lần) |

**Discriminative learning rate** là kỹ thuật đáng biết: `η` **tăng dần theo độ sâu** — tầng đầu (đặc trưng tổng quát, ít cần đổi) dùng `η` rất nhỏ, tầng cuối dùng `η` lớn hơn.

Xem [[learning-rate]] và [[../vaults/dl/transfer-learning|dl/transfer-learning]].

## ⚙️ Quy trình thực tế

```
1. Chọn model pretrained cùng miền (ảnh → ResNet/ViT; văn bản → BERT/LLM)
2. Thay tầng đầu ra cho khớp số lớp của mình
3. Đóng băng phần thân, train riêng đầu ra vài epoch  ← để đầu ra "ấm lên"
4. Mở băng dần từ tầng cuối, train tiếp với η nhỏ
5. Theo dõi validation loss — dừng sớm khi bắt đầu overfit
```

Bước 3 quan trọng: đầu ra khởi tạo ngẫu nhiên sẽ sinh **gradient rất lớn** ở những bước đầu, đủ để phá hỏng phần thân nếu mở băng ngay.

## ⚙️ PEFT — fine-tuning tiết kiệm tham số

Với model tỉ tham số thì fine-tune toàn bộ là bất khả thi (bộ nhớ, chi phí). Các phương pháp **PEFT** chỉ train một phần rất nhỏ:

| Phương pháp | Ý tưởng |
|---|---|
| **LoRA** ⭐ | Chèn ma trận **hạng thấp** cạnh trọng số gốc, chỉ train chúng — thường **< 1%** tham số |
| **Adapter** | Chèn module nhỏ giữa các tầng |
| **Prompt tuning** | Chỉ học vài vector "prompt mềm" ở đầu vào |

LoRA đáng chú ý vì nó là **ứng dụng trực tiếp của xấp xỉ hạng thấp** ở [[svd]]: giả thiết rằng phần cập nhật trọng số `ΔW` có hạng thấp, nên viết được thành tích hai ma trận gầy.

## ⚠️ Điều dễ nhầm

- **Fine-tuning ≠ transfer learning.** Transfer learning là khái niệm rộng (tận dụng tri thức từ nhiệm vụ khác); fine-tuning là **một cách** làm điều đó.
- **Nhiều dữ liệu hơn không luôn cần fine-tune sâu hơn.** Nếu miền rất giống dữ liệu gốc thì feature extraction có thể đã đủ, và ít rủi ro overfit hơn.
- **Vẫn phải chống rò rỉ dữ liệu.** Model pretrained có thể **đã thấy** tập test của bạn (nếu nó crawl web) — vấn đề nghiêm trọng khi đánh giá LLM. Cùng họ với [[../vaults/dsp/fold-va-ro-ri-du-lieu|rò rỉ dữ liệu]].
- **Chuẩn hoá đầu vào phải khớp với lúc pretrain** (cùng mean/std, cùng kích thước ảnh). Sai chỗ này thì model tệ mà không rõ lý do.

---

## 🔗 Liên kết
- **Tiền đề:** [[deep-learning]] · [[dinh-huong-hoc]]
- **Liên quan:** [[learning-rate]] · [[overfitting]] · [[pytorch-vs-tensorflow]] · [[svd]]
- **Liên môn:** [[dl/transfer-learning]] · [[dl/kien-truc-cnn-4-tang]] · [[dl/bert]]

## ❓ Câu hỏi mở
- LoRA giả định `ΔW` hạng thấp — giả định đó đúng tới đâu, và vì sao nó lại đúng?

## 📚 Nguồn
- `L2_Intro_ML_DL_GenAI.pdf` · `L8_NeuralNetwork.pdf`

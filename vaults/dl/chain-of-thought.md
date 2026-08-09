---
slug: chain-of-thought
title: Chain-of-Thought (CoT)
vault: dl
type: concept
branch: I
order: 9
status: done
tags: [dl, llm, prompt, reasoning, s08]
prev: [few-shot-prompting]
next: [self-consistency]
created: 2026-08-09
---

# Chain-of-Thought (CoT)

> Tóm tắt 1 câu: Bắt model **viết ra các bước suy nghĩ** trước khi trả lời — vì mỗi token sinh ra là **thêm một lượt tính toán**, nên viết ra chính là **mua thêm bước suy luận**.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #9 ← cần [[few-shot-prompting]] · → kế tiếp [[self-consistency]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #prompt #reasoning #s08

---

## 💡 Bệnh nó chữa (slide 41–42)

Few-shot bình thường — ví dụ **chỉ có đáp án**:
```
Q: Roger có 5 quả bóng. Mua thêm 2 hộp, mỗi hộp 3 quả. Giờ có mấy quả?
A: Đáp án là 11.                       ← chỉ đưa kết quả

Q: Căng-tin có 23 quả táo, dùng 20 quả, mua thêm 6. Còn mấy quả?
→ Model: "Đáp án là 27."   ❌ SAI
```

CoT — ví dụ **có kèm lời giải**:
```
A: Roger bắt đầu với 5 quả. 2 hộp × 3 quả = 6 quả. 5 + 6 = 11. Đáp án là 11.
                    ↑ viết ra ĐƯỜNG ĐI, không chỉ đích đến

→ Model: "Căng-tin có 23 quả. Dùng 20 nên còn 23 − 20 = 3. Mua thêm 6 nên 3 + 6 = 9."  ✅
```

Khác biệt **duy nhất** là ví dụ mẫu có kèm các bước. Model bắt chước **cách trình bày**, và bắt chước cách trình bày lại kéo theo cách **tính**.

## 🎯 Ý TƯỞNG CỐT LÕI — phát biểu trong một câu

> **Biến bộ nhớ TRONG (activation, bị giới hạn bởi số tầng) thành bộ nhớ NGOÀI (token đã viết ra, đọc lại được bằng attention).**

Lý do nằm ở một sự thật về cách Transformer sinh chữ:

🔑 **Giữa hai bước sinh token, thứ DUY NHẤT được mang sang là CHUỖI TOKEN đã viết.** Không có trạng thái ẩn nào được giữ lại — mỗi bước, model đọc lại toàn bộ chuỗi từ đầu và tính lại. Nghĩa là:

```
KHÔNG CoT:  toàn bộ phép tính phải xong TRONG MỘT LƯỢT forward
            → bị chặn cứng bởi N tầng (A7)
            → "tính nhẩm cả bài trong đầu"

CÓ CoT:     "23 − 20 = 3"  ──viết ra──→  số 3 giờ là một TOKEN ĐẦU VÀO
                                          bước sau ĐỌC LẠI nó bằng attention
            → "có giấy nháp"
```

Model **đẩy kết quả trung gian ra ngoài**, vào chỗ mà nó đọc lại được. Không còn phải nhớ trong đầu nữa.

### 📌 Đây đúng là mẹo của ATTENTION, đặt sang chỗ khác

| | Bệnh | Cách chữa |
|---|---|---|
| **Attention** (A1) | ép nhét cả câu nguồn vào **một vector `h`** | **giữ lại toàn bộ** hidden state, cần gì nhìn lại |
| **CoT** | ép tính cả bài trong **một lượt forward** | **viết ra hết**, cần gì đọc lại |

🔑 **Cùng một câu: ĐỪNG NÉN — GIỮ LẠI CHO TRUY CẬP ĐƯỢC.** Nhận ra thì CoT không phải mẹo prompt, mà là **nguyên tắc kiến trúc** áp lên tầng sử dụng.

### ⚠️ Và điều này giải thích luôn các lỗi

- **Sai một bước là hỏng cả chuỗi** — vì bước sai đó **đã nằm trong context** như một dữ kiện, các bước sau **attend vào nó và tin nó**
- **"Trả lời thật ngắn gọn" giết CoT** — cắt token là **cắt mất giấy nháp**
- **CoT tốn token** — đúng vậy, vì đang **trả tiền để mua bộ nhớ**
- 📌 **Ví dụ có kèm lời giải chỉ là CÁCH TRUYỀN ĐẠT, không phải bản chất.** Bằng chứng: `"Let's think step by step"` — **không ví dụ nào** — cũng chạy. Cái cốt lõi là **bắt nó VIẾT**, không phải **cho nó XEM**

## 🧩 Vì sao viết ra lại đúng hơn — nối thẳng về S07

🔑 Ở [[transformer-block]] đã ghi: **xếp `N` tầng mua được `N` bước suy luận** (không mua tầm nhìn — tầm nhìn đã tối đa từ tầng 1).

CoT mua **đúng thứ đó, nhưng theo trục khác**:

| | **Chiều SÂU** (số tầng `N`) | **Chiều NGANG** (CoT) |
|---|---|---|
| Mua bước suy luận bằng cách | xếp thêm tầng | **sinh thêm token** |
| Trả giá lúc nào | **lúc train** — cố định | **lúc chạy** — trả bằng token |
| Đổi được sau khi train? | ❌ không | ✅ **có, ngay trong prompt** |

Mỗi token sinh ra là **một lượt forward xuyên qua cả stack**. Model không CoT phải nhét toàn bộ phép tính vào **một** lượt; model CoT được **chia nhỏ ra nhiều lượt**, và mỗi bước trung gian được **viết ra giấy** để bước sau đọc lại.

📌 Nói gọn: **CoT là giấy nháp.** Bắt tính nhẩm cả bài trong đầu thì sai; cho giấy nháp thì đúng.

## 🔢 Bằng chứng và ĐIỀU KIỆN (slide 43)

Bài toán đố toán **GSM8K**, tỉ lệ giải đúng:

| Cấu hình | Điểm |
|---|---|
| GPT-3 175B **fine-tuned** | 33 |
| Prior best | 55 |
| PaLM 540B — prompting thường | **18** |
| PaLM 540B — **chain-of-thought** | **57** ⭐ |

🔑 **18 → 57 chỉ bằng cách đổi ví dụ trong prompt.** Cùng một model, không train thêm gì. Và nó **vượt cả bản fine-tune của GPT-3 175B** — một lời nhắc rằng *cách hỏi* đôi khi đáng giá hơn *train thêm*.

🚩 **Nhưng có điều kiện — slide trích Wei et al. 2022:**
> *"CoT **only yields performance gains when used with models of ~100B parameters**"*

Model nhỏ dùng CoT **có thể tệ đi**: nó sinh ra các bước nghe hợp lý nhưng sai, rồi **kết luận theo cái sai đó**.
⚠️ **Đây là kết luận năm 2022 trên các model thời đó.** Model nhỏ đời sau được train riêng cho suy luận thì làm CoT tốt hơn nhiều. **Cứ đo trên model mình dùng**, đừng áp con số 100B như một hằng số vật lý.

## ⚙️ Ba biến thể

### 1. Zero-shot CoT (slide 44–45) ⭐ rẻ nhất
Chỉ cần thêm một câu: **`"Let's think step by step."`**

Không cần ví dụ nào. Quy trình đầy đủ là **2 lần gọi**:
```
Lần 1 — Reasoning Extraction:  <câu hỏi> + "Let's think step by step."
                               → model xuất ra các bước
Lần 2 — Answer Extraction:     <câu hỏi> + <các bước> + "Therefore, the answer (arabic numerals) is"
                               → model xuất ra ĐÁP ÁN GỌN
```
📌 Lần 2 tồn tại vì lý do rất thực dụng: **đoạn suy luận khó parse tự động**. Lần gọi thứ hai ép model rút ra con số sạch để lấy bằng code.

### 2. Auto-CoT (slide 46–47) — tự chế ví dụ
Vấn đề: viết tay ví dụ CoT thì tốn. Auto-CoT làm 2 bước:
1. **Question Clustering** — gom câu hỏi trong dataset thành vài cụm
2. **Demonstration Sampling** — mỗi cụm lấy **một câu đại diện**, dùng **Zero-shot-CoT** sinh lời giải cho nó

🔑 Mẹo hay: **clustering để ví dụ ĐA DẠNG.** Lấy đại 8 câu ngẫu nhiên dễ trúng toàn một kiểu; chia cụm rồi mỗi cụm lấy một câu thì phủ được nhiều dạng bài.

### 3. Least-to-Most (slide 50) — chia bài trước, giải sau
CoT giải một mạch. LtM tách hẳn thành 2 giai đoạn:
```
Giai đoạn 1 — Problem Reduction:   "Muốn giải X, trước hết phải giải Y"
Giai đoạn 2 — Giải TUẦN TỰ:        giải Y  →  ĐƯA đáp án Y vào prompt  →  giải X
```
Khác CoT ở chỗ: đáp án câu con được **nối thẳng vào prompt** của câu sau ⇒ hợp bài **nhiều bước, phụ thuộc nhau**.

## ⚠️ Lỗi thường gặp

- 🚩 **Chuỗi suy luận nghe hợp lý KHÔNG bảo đảm đáp án đúng** — và ngược lại, model có thể ra đáp án đúng với lời giải sai. **Đừng dùng "lời giải nghe xuôi" làm bằng chứng.** Cùng cảnh báo với heatmap ở [[show-attend-tell]]: giải thích để **debug**, metric để **kết luận**.
- ⚠️ **CoT tốn token** — cả tiền lẫn độ trễ. Bài đơn giản không cần thì đừng bật.
- ⚠️ **Đừng đòi vừa CoT vừa trả lời cực ngắn** trong một lệnh gọi. Ép ngắn là cắt mất giấy nháp. Muốn output gọn thì tách 2 lần gọi như Zero-shot-CoT.
- 🚩 **Ví dụ CoT viết tay mà sai một bước** ⇒ model bắt chước **đúng cái sai đó** ở mọi câu. Kiểm kỹ ví dụ mẫu.

---

## 🔗 Liên kết
- **Tiền đề:** [[few-shot-prompting]]
- **Dẫn tới:** [[self-consistency]] · [[advanced-prompting]]
- **Liên quan tới:** [[transformer-block]] · [[show-attend-tell]] · [[prompt-engineering]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 41–47, 50

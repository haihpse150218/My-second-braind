---
slug: advanced-prompting
title: 5 kỹ thuật prompting nâng cao
vault: dl
type: concept
branch: I
order: 11
status: done
tags: [dl, llm, prompt, s08]
prev: [self-consistency]
created: 2026-08-09
---

# 5 kỹ thuật prompting nâng cao

> Tóm tắt 1 câu: Sau CoT và self-consistency, các kỹ thuật còn lại đều trả lời **một** câu hỏi: *"khâu nào trong prompt đang làm bằng tay — có tự động hoá được không?"*

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #11 ← cần [[self-consistency]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #prompt #s08

---

## 💡 Trục xuyên suốt

| Kỹ thuật | Tự động hoá / cải tiến khâu nào |
|---|---|
| **Generated Knowledge** | tự sinh **kiến thức nền** trước khi trả lời |
| **Tree of Thoughts** | thay **đi một đường** bằng **tìm kiếm trên cây** |
| **APE** | tự viết luôn **câu lệnh** |
| **Active Prompting** | chọn **ví dụ nào đáng cho người gán nhãn** |
| **Directional Stimulus** | train hẳn một model nhỏ để **sinh gợi ý** |

---

## 1. Generated Knowledge Prompting (slide 49)

```
Câu hỏi ──→ [Knowledge Generation] ──→ Kiến thức 1, 2, … ──→ [Knowledge Integration] ──→ Đáp án
                     ↑ chính LLM đó sinh ra
```

Bắt model **viết ra những gì nó biết** về chủ đề **trước**, rồi mới trả lời dựa trên đó.

📌 **Họ hàng gần với [[rag]]** — cùng ý *"nạp kiến thức vào context trước khi trả lời"*, khác ở **nguồn**: RAG lấy từ **kho ngoài** (kiểm chứng được), GKP lấy từ **chính model** (không kiểm chứng được).
🚩 Vì thế GKP **không chữa được bịa** — kiến thức bịa vẫn là bịa, chỉ khác là giờ nó được viết ra rõ ràng hơn. Cần đúng sự thật thì phải RAG.

---

## 2. Tree of Thoughts — ToT (slide 51–52)

### 🎯 Ý tưởng cốt lõi: sinh chữ là ĐI THAM LAM KHÔNG CÓ NÚT UNDO

Ở [[chain-of-thought]] đã ghi một cái bẫy: *"sai một bước là hỏng cả chuỗi — bước sai đó **đã nằm trong context như một dữ kiện**, các bước sau attend vào và tin nó."*

🔑 **Đó không phải lỗi vặt, đó là bản chất của sinh tự hồi quy**: token đã viết ra thì **không rút lại được**. Model đi **từ trái sang phải, mỗi bước chọn một lần, không quay đầu** — đúng định nghĩa **tham lam (greedy)**.

> **Ý tưởng ToT: bù vào đúng hai thứ mà thuật toán TÌM KIẾM có mà sinh chữ không có — KHÁM PHÁ nhiều lựa chọn, và QUAY LUI bỏ đường xấu.**

### 🔑 Điểm mấu chốt: CHẤM ĐIỂM LÚC NÀO

Đây mới là chỗ ToT khác self-consistency, không phải chuyện "cây hay không cây":

| | Chấm ở đâu | Hệ quả |
|---|---|---|
| **CoT** | không chấm | đi trúng đường sai là hỏng |
| **Self-Consistency** | 🔑 **chỉ ở ĐÍCH** | đường hỏng vẫn **chạy hết** rồi mới bị loại ⇒ **phí sạch** phần tính toán đó |
| **ToT** | 🔑 **ở TỪNG NÚT** | **cắt sớm** ngay khi biết nhánh vô vọng |

Hai loại prompt luân phiên chính là hai vai của một thuật toán tìm kiếm:

| Prompt | Vai | Hỏi gì |
|---|---|---|
| **Propose Prompt** | **sinh nước đi** | *"các bước tiếp theo có thể là gì?"* |
| **Value Prompt** | **hàm đánh giá** | *"nhánh này có tới đích được không?"* → **`sure` / `likely` / `impossible`** |

📌 **Phần phát minh thật của ToT không phải cái cây — mà là dùng chính LLM làm HÀM ĐÁNH GIÁ.** Tìm kiếm mà không cắt tỉa thì bùng nổ theo cấp số nhân; muốn cắt tỉa thì phải có ai đó chấm *"nhánh này còn hy vọng không"*. Trước đây hàm đó phải viết tay cho từng bài; giờ hỏi LLM.

### 📌 So với beam search (R6) — giống khung, khác thước đo

| | **Beam search** | **ToT** |
|---|---|---|
| Giữ nhiều ứng viên | ✅ | ✅ |
| Cắt tỉa mỗi bước | ✅ | ✅ |
| **Chấm bằng gì** | **xác suất token** của chính model | **một lệnh gọi LLM riêng** hỏi *"tới đích được không"* |
| Đo cái gì | **độ trôi chảy** | **khả năng GIẢI ĐƯỢC** |

🔑 **Đây là khác biệt quan trọng nhất.** Xác suất token cao nghĩa là *nghe xuôi*, **không** nghĩa là *đúng*. Một nhánh sai mà diễn đạt trơn tru vẫn được beam search cho điểm cao. Value Prompt hỏi **đúng câu cần hỏi**.



Hai loại prompt luân phiên:

| Prompt | Việc |
|---|---|
| **Propose Prompt** | *"các bước tiếp theo có thể là gì?"* → sinh nhánh |
| **Value Prompt** | *"nhánh này có tới đích được không?"* → chấm **`sure` / `likely` / `impossible`** |

Ví dụ trò 24: từ `4 9 10 13`, thử `4+9=13` (còn `10 13 13`) → Value Prompt đánh giá *"không có cách nào ra 24 với mấy số lớn này → **impossible**"* → **cắt nhánh**, quay lui.

🔑 **Điểm mới so với self-consistency**: ToT **loại bỏ nhánh xấu GIỮA CHỪNG**, không đợi chạy hết rồi mới bỏ phiếu. Đây là **tìm kiếm có cắt tỉa** — đúng họ với [[beam-search]] ở nhánh chuỗi, chỉ khác là điểm đánh giá do **chính LLM** chấm chứ không phải xác suất của model.

⚠️ **Rất đắt**: mỗi nút là vài lệnh gọi API. Chỉ dùng cho bài **thật sự cần tìm kiếm** (giải đố, lập kế hoạch), không dùng cho hỏi đáp thường.

---

## 3. Automatic Prompt Engineer — APE (slide 53–54)

Để **LLM tự viết câu lệnh** cho chính nó:

```
1. Cho LLM xem CẶP input→output mẫu   (prove→disprove, on→off)
2. LLM đoán: "câu lệnh nào sinh ra được các cặp này?"
3. Chấm điểm từng ứng viên bằng LOG PROBABILITY trên tập demo
4. Chọn cái điểm cao nhất  →  [tuỳ chọn] resample biến thể quanh nó
```

| Ứng viên | Log prob |
|---|---|
| *"write the opposite of the word given."* | **−0.16** ⭐ (sau resample) |
| *"write the antonym of the word."* | −0.26 ✅ |
| *"give the antonym of the word provided."* | −0.28 ✅ |
| *"reverse the input."* | −0.86 ❌ |

🔑 **Đây là [[gradient-descent-dl]] mà không có gradient**: sinh ứng viên → chấm điểm → giữ cái tốt → sinh biến thể quanh nó → lặp. Chính là **tìm kiếm cục bộ** trên không gian câu chữ.
📌 Và nó **đúng tinh thần định nghĩa** ở [[prompt-engineering]]: *refining a prompt over time*. APE chỉ là **tự động hoá vòng lặp đó**.

---

## 4. Active Prompting (slide 55–56)

**Vấn đề**: ví dụ CoT do người viết là **cố định**, mà *"the exemplars might not be the most effective examples"*.

**Ý tưởng — gán nhãn vào chỗ model đang LÚNG TÚNG nhất:**
```
1. Hỏi LLM k lần cho mỗi câu trong tập train
2. Tính ĐỘ KHÔNG CHẮC CHẮN = mức bất đồng giữa k đáp án
      u = 1/5 = 0.2  → 5 lần đều trả lời "3"          ⇒ chắc chắn, bỏ qua
      u = 5/5 = 1.0  → 5 lần ra 5 đáp án khác nhau    ⇒ RẤT lúng túng
3. Chọn các câu KHÔNG CHẮC CHẮN NHẤT
4. NGƯỜI gán nhãn đúng những câu đó → thành ví dụ mới
```

🔑 **Dùng lại đúng tín hiệu của [[self-consistency]]** (mức bất đồng giữa `k` lần chạy) nhưng cho mục đích khác: self-consistency dùng nó để **chọn đáp án**, active prompting dùng nó để **chọn chỗ đáng bỏ công người vào**.
📌 Đây là **active learning** kinh điển: ngân sách gán nhãn có hạn thì đừng gán ngẫu nhiên, hãy gán chỗ model yếu nhất. 🇻🇳 Rất đáng dùng khi tự gán nhãn dataset tiếng Việt — nguồn có sẵn xem [[SECOND_BRAIN_DL]] mục *🌐 Nguồn DATASET tiếng Việt*.

---

## 5. Directional Stimulus Prompting (slide 57–58)

Thay vì sửa prompt bằng tay, **train một model nhỏ chuyên sinh GỢI Ý** cho model lớn:

```
Bài báo ──→ [Policy LM nhỏ (T5) 🔥] ──→ Hint: "Bob Barker; TV; April 1; 2007; 91"
                                                    ↓
                                   [Black-box LLM ❄️] ──→ Bản tóm tắt
                                                    ↓
                              Reward = ROUGE ──train Policy LM bằng RL──┘
```

Kết quả tóm tắt: **ROUGE-1 = 48.39** (có hint) vs **34.48** (prompt thường).

🔑 **Điểm hay nhất**: LLM lớn là **hộp đen, không đụng vào được** (không có trọng số, hoặc quá đắt để fine-tune). DSP fine-tune **model nhỏ ở phía trước** nó. Train **cái mình sờ được**, để nguyên cái mình không sờ được.
📌 Hint ở đây là **từ khoá bắt buộc phải nhắc tới** — nó ép bản tóm tắt bám vào đúng thực thể quan trọng, chống bỏ sót. Cùng nỗi lo với **ROUGE sợ sót** ở [[metric-sinh-chuoi]].

---

## ⚠️ Lỗi chung của cả 5 kỹ thuật

- 🚩 **Đừng nhảy vào cái phức tạp trước.** Thứ tự đúng: `zero-shot` → `few-shot` → `CoT` → `self-consistency` → mấy cái ở đây. Mỗi bậc **đắt hơn hẳn** bậc trước; leo thang chỉ khi bậc dưới đã đo và không đủ.
- ⚠️ **Mọi kỹ thuật ở đây đều đổi TIỀN và ĐỘ TRỄ lấy chất lượng.** ToT có thể tốn hàng chục lệnh gọi cho **một** câu hỏi. Tính chi phí trước khi đưa lên production.
- 🚩 **Không có bộ test thì không biết mình có tiến bộ không** — xem [[prompt-engineering]]. Càng kỹ thuật phức tạp càng dễ tự huyễn hoặc là nó tốt hơn.

---

## 🔗 Liên kết
- **Tiền đề:** [[self-consistency]] · [[chain-of-thought]]
- **Liên quan tới:** [[rag]] · [[beam-search]] · [[gradient-descent-dl]] · [[metric-sinh-chuoi]] · [[prompt-engineering]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 49–58

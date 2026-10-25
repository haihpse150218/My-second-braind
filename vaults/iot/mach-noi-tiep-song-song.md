---
slug: mach-noi-tiep-song-song
title: Mạch nối tiếp và mạch song song
vault: iot
type: concept
branch: B
order: 2
status: learning
tags: [iot, dien-tu, nen-tang]
prev: [dinh-luat-ohm]
next: [so-do-nguyen-ly]
related: [uart-crossover-va-chia-ap]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Mạch nối tiếp và mạch song song

> Tóm tắt 1 câu: nối tiếp thì **chung dòng, chia áp**; song song thì **chung áp, chia dòng** — hai cách ghép duy nhất, mọi mạch phức tạp là tổ hợp của chúng.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #2 ← cần [[dinh-luat-ohm]] · → kế tiếp [[so-do-nguyen-ly]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #dien-tu #nen-tang

---

## 🔢 Định nghĩa

| | Nối tiếp (series) | Song song (parallel) |
|---|---|---|
| Dòng | `I` **bằng nhau** qua mọi phần tử | `I = I₁ + I₂ + I₃` |
| Áp | `V = V₁ + V₂ + V₃` | `V₁ = V₂ = V₃ = V` |
| Điện trở tương đương | `R = R₁ + R₂ + R₃` | `1/R = 1/R₁ + 1/R₂ + 1/R₃` |
| Hỏng một phần tử | **cả mạch tắt** | phần còn lại vẫn chạy |

Bài tập slide: *viết công thức tính R cho mạch song song* → `R = 1 / (1/R₁ + 1/R₂ + 1/R₃)`; với **đúng hai** điện trở: `R = R₁R₂ / (R₁ + R₂)` — ⚠️ nhớ ngoặc mẫu số; từ ba trở lên phải dùng dạng nghịch đảo hoặc gộp từng cặp.

| R₁ ‖ R₂ | Kết quả | Luật kiểm tra |
|---|---|---|
| 1 kΩ ‖ 2 kΩ | 0,667 kΩ | luôn **nhỏ hơn điện trở nhỏ nhất** |
| 1 kΩ ‖ 1 kΩ | 0,5 kΩ | n cái bằng nhau → `R/n` |
| 1 kΩ ‖ 100 kΩ | ≈ 0,99 kΩ | cái rất lớn gần như không có mặt |

### `U_tổng = U₁ + U₂ + …` khi nối tiếp — ba chỗ đã gặp nó

| Mạch nối tiếp | Cộng áp | Hệ quả |
|---|---|---|
| Nguồn 6 V → R → LED ([[dinh-luat-ohm]]) | `6 = U_R + U_LED = 4 + 2` | điện trở chỉ "thấy" **4 V**, nên `R = 4/0,02`, không phải `6/0,02` |
| Pin 2S = 2 cell nối tiếp ([[so-do-nguon-2s]]) | `8,4 = 4,2 + 4,2` (đầy) · `6,0 = 3,0 + 3,0` (cạn) | vì sao gọi là "2S" và vì sao 7,4 V danh định = 2 × 3,7 |
| Cầu chia áp R1 + R2 ([[uart-crossover-va-chia-ap]]) | `5 = U_R1 + U_R2 = 1,67 + 3,33` | áp trên mỗi điện trở **tỉ lệ với trị số** của nó: `U_R2 = U · R2/(R1+R2)` |

Cách nhớ: dòng `I` đi qua **mọi** phần tử như nhau, mỗi phần tử "ăn" `U_k = I·R_k`, tổng các phần ăn phải bằng nguồn (định luật Kirchhoff về áp). Phần tử nào điện trở lớn ăn áp nhiều — đó là lý do cầu chia áp hoạt động.

## 🧩 Trực giác

- Nối tiếp = một con đường, qua hết các trạm thu phí; tổng phí cộng dồn.
- Song song = nhiều làn đường cùng đi từ A tới B; xe chia ra các làn, càng nhiều làn càng "thông" (điện trở tương đương **nhỏ hơn** điện trở nhỏ nhất).

## ⚙️ Khi nào dùng

- **Nối tiếp**: điện trở hạn dòng + LED ([[dinh-luat-ohm]]); cầu chia áp ([[uart-crossover-va-chia-ap]]) — chính là hai điện trở nối tiếp, lấy áp ở giữa.
- **Song song**: nhiều thiết bị cùng dùng nguồn 5 V của Arduino — mỗi cái thấy đủ 5 V, nhưng **tổng dòng** phải nằm trong giới hạn nguồn.
- Quang trở + điện trở cố định mắc nối tiếp = cầu chia áp biến thiên theo ánh sáng → đọc bằng [[adc-analogread]].

## ⚠️ Điều dễ nhầm

- Hai LED mắc **nối tiếp** với nguồn 5 V: `2 V + 2 V = 4 V`, còn 1 V cho điện trở — được. Ba LED: `6 V > 5 V` → không sáng. Cộng sụt áp trước khi mắc.
- Mắc song song làm điện trở tương đương **giảm**, dòng tổng **tăng** — dễ vượt dòng của nguồn mà không nhận ra.

---

## 🔗 Liên kết
- **Tiền đề:** [[dinh-luat-ohm]]
- **Dẫn tới:** [[so-do-nguyen-ly]]
- **Liên quan:** [[uart-crossover-va-chia-ap]]

## ❓ Câu hỏi mở
- Mọi chân GND của HC-05, LCD, Arduino phải nối chung — đó là nối tiếp hay song song, và vì sao thiếu nó thì tín hiệu "loạn"?

## 📚 Nguồn
- Slide Part 1 — *Sơ đồ mạch nối tiếp*, *Mạch đấu song song (Parallel)*

---
slug: dinh-luat-ohm
title: Định luật Ohm và điện trở hạn dòng
vault: iot
type: concept
branch: B
order: 1
status: learning
tags: [iot, dien-tu, nen-tang]
prev: [co-cau-doi-huong-chuyen-dong]
next: [mach-noi-tiep-song-song]
related: [uart-crossover-va-chia-ap, so-do-nguyen-ly]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Định luật Ohm và điện trở hạn dòng

> Tóm tắt 1 câu: `V = I·R` — và ứng dụng đầu tiên trong môn là **tính điện trở nối tiếp LED** để dòng không vượt mức LED chịu được.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #1 ← cần [[co-cau-doi-huong-chuyen-dong]] · → kế tiếp [[mach-noi-tiep-song-song]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #dien-tu #nen-tang

---

## 💡 Ý chính

LED không tự giới hạn dòng. Nó "ăn" một điện áp gần như cố định (`V_LED`), phần điện áp còn lại của nguồn phải **rơi trên điện trở**, và chính điện trở đó quyết định dòng:

$$
R = \frac{V_{nguồn} - V_{LED}}{I}
$$

| Ký hiệu | Ý nghĩa | Ví dụ slide |
|---|---|---|
| `V_nguồn` | điện áp cấp (chân Arduino) | 5 V |
| `V_LED` | sụt áp thuận của LED (đỏ ≈ 2 V, xanh/trắng ≈ 3 V) | 2 V |
| `I` | dòng mong muốn, **≤ I_max** | 20 mA |
| `R` | điện trở cần nối tiếp | (5 − 2) / 0,02 = **150 Ω** |

Thực tế chọn trị số chuẩn **≥ 150 Ω** (150, 220, 330 Ω) — lớn hơn thì LED tối hơn chút nhưng an toàn.

### Làm lại với U = 6 V (rail servo 6 V, hoặc 4 pin AA)

> Ký hiệu: sách Việt viết **U** cho hiệu điện thế, sách Anh viết **V** — cùng một đại lượng. `U = I·R ⇒ R = U/I`.

| Bước | Tính | Kết quả |
|---|---|---|
| Điện áp **rơi trên điện trở** (không phải cả 6 V!) | `U_R = U_nguồn − U_LED = 6 − 2` | **4 V** |
| Điện trở cần | `R = U_R / I = 4 / 0,020` | **200 Ω** |
| Trị số chuẩn gần nhất, làm tròn **lên** | | **220 Ω** → `I = 4/220 ≈ 18 mA` ✅ |
| Nếu "nối ngu" — cắm LED thẳng 6 V không điện trở | `R ≈ 0 ⇒ I = 4/0 → ∞` | LED nhận hàng trăm mA trong tích tắc → **cháy đèn** |
| Nếu quên trừ `U_LED`, lấy `R = 6/0,02 = 300 Ω` | `I = 4/300 ≈ 13 mA` | vẫn sáng, hơi tối — sai theo hướng an toàn |

Quy tắc đọc nhanh: **nguồn tăng 1 V → điện trở tăng 50 Ω** (với LED 20 mA): 5 V → 150 Ω, 6 V → 200 Ω, 9 V → 350 Ω, 12 V → 500 Ω. Công suất trên R ở 12 V: `P = U_R·I = 10 × 0,02 = 0,2 W` — vượt điện trở 1/8 W thường dùng, phải lấy loại 1/4 W.

## 🧩 Trực giác

Điện trở là "vòi nước": nguồn đẩy, điện trở siết. LED chỉ cần một dòng nhỏ để sáng; không siết thì dòng tăng vô hạn cho tới khi LED hoặc chân vi điều khiển cháy.

## ⚙️ Khi nào dùng

- Mọi LED rời nối vào chân digital. (LED built-in chân 13 đã có điện trở sẵn.)
- Cùng công thức dùng cho **cầu chia áp** ở [[uart-crossover-va-chia-ap]]: hai điện trở nối tiếp chia điện áp theo tỉ lệ `R2/(R1+R2)`.

## ⚠️ Điều dễ nhầm

- Tính xong `150 Ω` rồi dùng `15 Ω` vì đọc nhầm vạch màu → LED cháy ngay. Đo bằng đồng hồ trước khi cắm.
- Lấy `R = U_nguồn / I` mà quên trừ `U_LED`: ở 5–6 V chỉ làm LED hơi tối (an toàn), nhưng tư duy sai — điện trở chỉ "thấy" phần áp **còn lại sau LED**.
- Mắc LED ngược chiều: không sáng nhưng không hỏng (LED chặn ngược); đổi chiều là xong.
- Nhiều LED chung **một** điện trở khi mắc song song → dòng chia không đều, LED có `V_LED` thấp hơn sáng hơn. Mỗi LED một điện trở.

---

## 🔗 Liên kết
- **Tiền đề:** [[co-cau-chap-hanh]]
- **Dẫn tới:** [[mach-noi-tiep-song-song]] · [[so-do-nguyen-ly]]
- **Liên quan:** [[uart-crossover-va-chia-ap]]

## ❓ Câu hỏi mở
- Chân Arduino ra tối đa 40 mA, cả chip 200 mA — bật 8 LED cùng lúc với 150 Ω mỗi cái có vượt không?

## 📚 Nguồn
- Slide Part 1 — *Schematic — Sơ đồ mạch nối tiếp, Áp dụng định luật Ohm*
- Ghi chú buổi học 2026-10-24 — ôn lại với U = 6 V sau khi "nối ngu cháy đèn"

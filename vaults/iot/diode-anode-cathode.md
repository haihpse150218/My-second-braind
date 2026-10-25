---
slug: diode-anode-cathode
title: Diode, LED — anode là dương, cathode là âm
vault: iot
type: concept
branch: B
order: 4
status: learning
tags: [iot, dien-tu, nen-tang]
prev: [so-do-nguyen-ly]
next: [so-do-nguon-2s]
related: [dinh-luat-ohm, co-cau-chap-hanh]
sources: ["Ghi chú buổi học 2026-10-24", "IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Diode, LED — anode là dương, cathode là âm

> Tóm tắt 1 câu: diode chỉ cho dòng đi **một chiều**, từ **anode (A, cực dương)** sang **cathode (K, cực âm)** — nhớ được hai chữ này thì cắm LED không ngược, đọc schematic không nhầm, và hiểu vì sao diode bảo vệ được mạch.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #4 ← cần [[so-do-nguyen-ly]] · → kế tiếp [[so-do-nguon-2s]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #dien-tu #nen-tang

---

## 💡 Ý chính

| | Anode | Cathode |
|---|---|---|
| Cực | **dương (+)** | **âm (−)** |
| Ký hiệu | A | K (tiếng Đức *Kathode*, tránh nhầm với C của tụ) |
| Trên schematic | đuôi tam giác | **vạch ngang** ở mũi tam giác |
| Dòng quy ước | **đi vào** | **đi ra** |
| LED | chân **dài** | chân **ngắn**, mép vỏ **vát phẳng** |
| Diode thường (1N4007, SS34) | đầu không vạch | đầu có **vạch bạc/trắng** |

Cách nhớ: tam giác là **mũi tên chỉ chiều dòng điện**, vạch ngang là **bức tường** — dòng chỉ chạy theo mũi tên, đâm vào tường thì dừng. Mũi tên đi **từ A sang K**.

### Quy ước màu dây khi nối pin

| Cực pin | Màu dây | Nối về |
|---|---|---|
| **positive (+)** | **đỏ** | **anode** của diode/LED (đầu tam giác), hoặc chân + của mạch |
| **negative (−)** | **đen** | **cathode** của diode/LED (đầu có vạch), hoặc GND |

Nhìn màu dây là biết chiều dòng: đỏ vào A, đi qua linh kiện, ra K về đen. Pin LiPo 2S bán sẵn cũng theo đúng màu này ở jack XT60/JST — cắm theo màu, không bao giờ ngược.

```
   A ──▶|── K        dòng chạy A → K (phân cực thuận, sụt ~0,7 V; LED ~2–3 V)
   A ──|◀── K        ngược lại: chặn (phân cực ngược)
```

## 🧩 Ví dụ trong môn

- Mạch LED ở [[dinh-luat-ohm]]: `5 V → R 150 Ω → A(LED) → K(LED) → GND`. Đảo LED thì không sáng, không hỏng.
- Diode **chống cắm ngược pin** trong [[so-do-nguon-2s]]: A nối cực + pin, K nối vào mạch; cắm ngược pin thì diode chặn, mạch sống.
- Diode **flyback** cạnh relay/motor ([[co-cau-chap-hanh]]): mắc **ngược** chiều nguồn (K lên +, A xuống −) — bình thường không dẫn, khi cuộn dây ngắt sinh áp ngược thì dẫn để xả.

## ⚠️ Điều dễ nhầm

- **Với pin đang xả thì ngược lại**: cực **âm** của pin là anode (nơi xảy ra oxy hoá), cực dương là cathode. "Anode = dương" chỉ đúng cho **linh kiện tiêu thụ** (diode, LED, tụ hoá). Trong môn này gần như chỉ gặp trường hợp diode → nhớ *anode = dương* là đủ, nhưng đọc datasheet pin thì cẩn thận.
- Tụ hoá cũng có cực: chân dài **+**, vạch trắng trên thân là **−**. Cắm ngược tụ hoá → phồng, nổ.
- Diode Schottky (SS34) sụt áp ~0,3 V, diode thường (1N4007) ~0,7 V. Ở mạch nguồn pin, 0,4 V chênh lệch đó là lý do chọn Schottky.

---

## 🔗 Liên kết
- **Tiền đề:** [[so-do-nguyen-ly]]
- **Dẫn tới:** [[so-do-nguon-2s]]
- **Liên quan:** [[dinh-luat-ohm]] · [[co-cau-chap-hanh]]

## ❓ Câu hỏi mở
- Diode chống ngược làm mất 0,3 V và toả nhiệt `0,3 V × I`; với 3 A là ~1 W. P-MOSFET làm cùng việc gần như không mất — đáng phức tạp thêm không?

## 📚 Nguồn
- Ghi chú buổi học 2026-10-24: *Cathode là âm, Anode là dương* · *pin + (đỏ) nối anode, pin − (đen) nối cathode*
- Slide Part 1 — mạch LED + điện trở

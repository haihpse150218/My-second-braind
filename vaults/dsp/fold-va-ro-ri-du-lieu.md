---
slug: fold-va-ro-ri-du-lieu
title: Fold & rò rỉ dữ liệu
vault: dsp
type: concept
branch: E
order: 1
status: learning
tags: [dsp, danh-gia, bay]
prev: [phan-loai-am-thanh]
next: [so-sanh-thong-ke]
related: [phan-loai-am-thanh]
sources: ["DSP501 — dataset UrbanSound8K"]
created: 2026-08-10
---

# Fold & rò rỉ dữ liệu

> Tóm tắt 1 câu: UrbanSound8K chia sẵn 10 fold và **cấm shuffle lại** — tự chia sẽ cho accuracy cao ảo mà model thực tế kém.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #1 ← cần [[phan-loai-am-thanh]] · → kế tiếp [[so-sanh-thong-ke]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #danh-gia #bay

---

## 💡 Vì sao KHÔNG được tự shuffle

8.732 clip **không độc lập** — chúng được cắt ra từ chỉ **1.297 bản ghi gốc** trên Freesound. Mỗi bản ghi (`fsID`) sinh ra nhiều clip.

Ví dụ cụ thể: `fsID = 100263` sinh ra 4 clip
```
100263-2-0-117.wav   (giây 58,5 – 62,5)
100263-2-0-121.wav   (giây 60,5 – 64,5)   ← CHỒNG LẤN 2 giây với clip trên
100263-2-0-126.wav
100263-2-0-137.wav
```

Shuffle ngẫu nhiên → clip `117` vào train, clip `121` vào test. Hai clip này **chồng lấn 2 giây âm thanh giống hệt nhau**.

→ Model chỉ cần **nhớ bản ghi gốc** là đoán đúng, không cần học đặc trưng gì. Accuracy tăng vọt nhưng **không phản ánh khả năng thật** trên âm thanh chưa từng nghe.

Đây là **data leakage** — cụ thể là **group leakage**, xem [[dl/group-leakage]] và [[dl/chong-ro-ri-du-lieu]].

## ⚙️ Fold được chia thế nào

Tác giả dataset đã chia sao cho **mọi clip từ cùng một `fsID` nằm chung một fold**.

| Fold | Số clip | Số bản ghi gốc |
|---|---|---|
| 1 | 873 | 134 |
| 4 | 990 | 134 |
| 8 | 806 | 126 |
| 10 | 837 | 124 |

Số clip mỗi fold **không đều nhau** — đó là cái giá phải trả để giữ nguyên nhóm. Chia đều số clip sẽ buộc phải xé nhóm.

**Cách dùng:** 10 lần, mỗi lần lấy 1 fold làm test và 9 fold còn lại làm train, rồi lấy trung bình.

```
Lần 1: train [2..10] → test [1]
Lần 2: train [1,3..10] → test [2]
...
```

## 🧩 Bài học tổng quát

> 📌 **Chia dữ liệu ngẫu nhiên chỉ đúng khi các mẫu THỰC SỰ độc lập.** Khi có cấu trúc nhóm, phải chia **theo nhóm**.

Cùng một cái bẫy xuất hiện khắp nơi:

| Lĩnh vực | Nhóm là gì |
|---|---|
| Âm thanh | Bản ghi gốc (`fsID`) |
| Ảnh y tế | **Bệnh nhân** — nhiều lát cắt CT của một người |
| Nhận dạng khuôn mặt | **Danh tính** — nhiều ảnh một người |
| Dữ liệu chuỗi thời gian | **Thời điểm** — không được lấy tương lai làm train |
| Văn bản | Tác giả, tài liệu gốc |

Đây là một trong ba bài học lặp lại xuyên suốt các project trong kho ([[../../projects/INDEX|📦 chủ đề xuyên suốt]]): **chia dữ liệu sai là hỏng hết**, không cách nào cứu ở bước sau.

## ⚠️ Hai chi tiết khác của dataset

**Salience** — mỗi clip có nhãn `1` (foreground, âm thanh mục tiêu rõ ràng) hoặc `2` (background, bị lẫn tiếng ồn). Có **3.030 clip (34,7%)** là background.
→ Một phần đáng kể dataset có âm thanh mục tiêu **bị che**. Đây là giới hạn trần của accuracy — kể cả người nghe cũng khó phân loại đúng những clip đó.

**Mất cân bằng lớp** — `gun_shot` 374 và `car_horn` 429 so với 1.000 của các lớp khác. Accuracy tổng sẽ bị các lớp đông chi phối, xem [[ml/class-imbalance]].

## ⚠️ Điều dễ nhầm

- **Accuracy cao bất thường là dấu hiệu cảnh báo, không phải tin vui.** Thấy `99%` trên bài toán khó thì nghi rò rỉ trước, mừng sau.
- **Rò rỉ không sửa được bằng model tốt hơn** — nó là lỗi ở tầng chia dữ liệu, mọi thứ phía trên đều thừa hưởng.
- **Chuẩn hoá cũng rò rỉ được:** fit scaler trên **toàn bộ** dữ liệu rồi mới chia là để thống kê của tập test lọt vào train. Phải fit **chỉ trên train**.

---

## 🔗 Liên kết
- **Tiền đề:** [[phan-loai-am-thanh]]
- **Dẫn tới:** [[so-sanh-thong-ke]]
- **Liên môn:** [[dl/group-leakage]] · [[dl/chong-ro-ri-du-lieu]] · [[ml/cross-validation]] · [[ml/class-imbalance]]

## ❓ Câu hỏi mở
- Với dataset tự thu thập, làm sao phát hiện cấu trúc nhóm ẩn mà mình không biết là có?

## 📚 Nguồn
- DSP501 — tài liệu dataset UrbanSound8K, §5
- Salamon et al., 2014

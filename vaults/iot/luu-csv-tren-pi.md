---
slug: luu-csv-tren-pi
title: Lưu dữ liệu cảm biến thành CSV — Practice 6.2, 6.3
vault: iot
type: concept
branch: F
order: 2
status: learning
tags: [iot, raspberry-pi, du-lieu, python, bai-tap]
prev: [giao-dien-iot]
next: [co-so-du-lieu-iot]
related: [dht11-dht22, led-4-so-3641as, pi-lam-cda-gda]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Lưu dữ liệu cảm biến thành CSV — Practice 6.2, 6.3

> Tóm tắt 1 câu: mỗi lần đọc cảm biến, **mở file ở chế độ `a`, ghi một dòng có timestamp**, và khi đọc lỗi vẫn ghi `NA` để biết lúc đó không có dữ liệu.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #2 ← cần [[giao-dien-iot]] · → kế tiếp [[co-so-du-lieu-iot]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #du-lieu #python #bai-tap

---

## 💡 Ý chính

| | Practice 6.2 (tr. 56) | Practice 6.3 (tr. 57) |
|---|---|---|
| Ghi | thời gian, nhiệt độ, độ ẩm | timestamp, nhiệt độ, độ ẩm |
| Định dạng số | **2** chữ số thập phân | **1** chữ số thập phân |
| Đọc lỗi | ghi NULL hoặc NA | ghi NA hoặc NULL |
| Thêm | — | tối thiểu 50 dòng, hiện nhiệt độ trên [[led-4-so-3641as]] |

## 🧩 Trực giác / Ví dụ

CSV là **sổ nhật ký**: mỗi lần đo viết thêm một dòng ở cuối (`mode='a'`), không bao giờ xóa dòng cũ. Mở rồi đóng ngay sau mỗi dòng thì khi mất điện cũng chỉ mất nhiều nhất một dòng.

## 🔢 Công thức / Định nghĩa

Bản đã sửa, dùng cho DHT11 (🔎 hàm `fmt` và phần ghi file đã chạy với giá trị giả lập, gồm cả trường hợp đọc lỗi; phần đọc cảm biến **chưa chạy trên Pi**):

```python
import time
import csv
from datetime import datetime
import board
import adafruit_dht

sensor = adafruit_dht.DHT11(board.D4)
filename = "dht11_data.csv"

def fmt(value, digits=1):                       # 6.2 dùng digits=2
    return "NA" if value is None else f"{value:.{digits}f}"

while True:
    try:
        temperature = sensor.temperature
        humidity = sensor.humidity
    except RuntimeError as error:
        print(error.args[0])
        temperature = humidity = None

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(filename, mode='a', newline='') as file:
        csv.writer(file).writerow([timestamp, fmt(temperature), fmt(humidity)])
    time.sleep(5.0)
```

Kết quả:

```text
2026-11-07 10:00:00,25.4,60.0
2026-11-07 10:00:05,NA,NA
```

## ⚙️ Khi nào dùng / Ứng dụng

- Lượng dữ liệu nhỏ, cần mở bằng Excel: CSV là đủ.
- Cần truy vấn hoặc nhiều chương trình cùng ghi → [[co-so-du-lieu-iot]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

Code trong slide có các lỗi sau, bản ở trên đã sửa:

- ⚠️ Tr. 53: `"dht11_data.csv“` đóng bằng **dấu nháy cong**, Python báo `SyntaxError`. Tr. 55 cũng vậy.
- ⚠️ Tr. 54: dữ liệu mẫu có **4 cột** (`26.0,78.8,60.0`) trong khi code ghi 3 cột. 🔎 Cột thừa là độ F: 26,0 °C = 78,8 °F.
- ⚠️ Tr. 55: `file.write()` **thiếu `\n`** nên mọi bản ghi dính thành một dòng, và không có `file.close()`. Có `else:` nhưng trang không có `if` tương ứng; có lẽ `if` bị thiếu.
- Tr. 55 "Cách 2" ghi `Temp=25.4C`, tức không còn là CSV.
- Tr. 53 mở file rồi đóng ngay mà không ghi gì. Khối đó chỉ có ích nếu ghi dòng tiêu đề.
- DHT11 có độ phân giải 1 °C, nên 2 chữ số thập phân ở 6.2 chỉ là định dạng, không làm số đo chính xác hơn.
- Tr. 57 nói "file database" nhưng lại yêu cầu "file TXT hoặc CSV": cần hỏi lại giảng viên.

## 🔗 Liên kết

- **Tiền đề:** [[dht11-dht22]]
- **Dẫn tới:** [[co-so-du-lieu-iot]]
- **Liên quan:** [[led-4-so-3641as]]

## ❓ Câu hỏi mở

- Ghi liên tục lên thẻ microSD trong nhiều tháng có làm thẻ mau hỏng không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 53–57

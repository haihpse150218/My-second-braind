# Practice 6.5 — Hệ thống Dashboard Flask+SQLite3 (chép nguyên văn)

> Nguồn: `D:\MSA-FPT\IOT\material\Practice 6_5.pdf` (3 trang, xuất từ Google Docs, nhận 2026-11-15). `pdftotext` mất dấu tiếng Việt, nên chép từ ảnh render.

## Hệ thống Dashboard Flask+SQLite3

Bài thực hành Practice 6.5:

- Arduino đọc dữ liệu từ cảm biến DHT11
- Raspberry Pi nhận dữ liệu từ Arduino
- Raspberry Pi đóng gói dữ liệu dạng JSON
- Raspberry Pi gửi dữ liệu về server bằng HTTP `POST`
- Server lưu dữ liệu vào SQLite
- Web dashboard hiển thị dữ liệu mới nhất của từng nhóm

## Chức năng của server (Cloud)

- Nhận dữ liệu tại API `POST /api/data`
- Lưu dữ liệu vào file SQLite `data/data.db`
- Hiển thị dashboard web tại `/`
- Theo dõi 6 nhóm: `group1` đến `group6`
- Hiển thị lịch sử dữ liệu gần nhất

## Cấu trúc dữ liệu gửi lên server

Raspberry Pi gửi `POST` đến đường dẫn:

http://<IP-server>:5000/api/data

Nội dung JSON mẫu:

```json
{
  "group_id": "group1",
  "device_id": "rpi-group1",
  "temperature": 29.4,
  "humidity": 70.2,
  "timestamp": "2026-03-14T09:40:00Z"
}
```

Ý nghĩa các trường:

- `group_id`: mã nhóm, từ `group1` đến `group6`
- `device_id`: tên thiết bị Raspberry Pi hoặc mã thiết bị
- `temperature`: nhiệt độ đo được
- `humidity`: độ ẩm đo được
- `timestamp`: thời điểm gửi dữ liệu theo chuẩn ISO 8601

## Server

- Dashboard: `http://<IP-raspberry>:5000/`
- API nhận dữ liệu: `http://<IP-raspberry>:5000/api/data`

## Ví dụ code Python trên Raspberry Pi

```python
import requests
from datetime import datetime, timezone

SERVER_URL = "http://192.168.1.100:5000/api/data"

payload = {
    "group_id": "group1",
    "device_id": "rpi-group1",
    "temperature": 29.1,
    "humidity": 65.3,
    "timestamp": datetime.now(timezone.utc).isoformat(),
}

response = requests.post(SERVER_URL, json=payload, timeout=10)
print(response.status_code)
print(response.json())
```

## Quy trình thực hành gợi ý

1. Arduino đọc dữ liệu từ DHT11.
2. Arduino gửi dữ liệu qua Serial cho Raspberry Pi.
3. Raspberry Pi đọc dữ liệu Serial.
4. Raspberry Pi đóng gói dữ liệu thành JSON.
5. Raspberry Pi gửi `POST` đến server Flask tại `/api/data`.
6. Server lưu dữ liệu vào SQLite.
7. Dashboard hiển thị dữ liệu mới nhất của từng nhóm.

## Ghi chú

- File cơ sở dữ liệu hiện tại là `data/data.db`
- Endpoint nhận dữ liệu hiện tại là `/api/data`
- Dashboard tự động làm mới để hiển thị dữ liệu mới

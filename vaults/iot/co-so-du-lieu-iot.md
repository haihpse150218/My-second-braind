---
slug: co-so-du-lieu-iot
title: Cơ sở dữ liệu trên Pi — SQLite và MariaDB
vault: iot
type: concept
branch: F
order: 3
status: learning
tags: [iot, raspberry-pi, du-lieu, sql]
prev: [luu-csv-tren-pi]
next: [flask-tren-pi]
related: [pi-lam-cda-gda, http-post-json]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Cơ sở dữ liệu trên Pi — SQLite và MariaDB

> Tóm tắt 1 câu: slide dùng cả hai: **SQLite** là một file, không cần server, có sẵn trong Python; **MariaDB** (lệnh vẫn là `mysql`) là server riêng có user và quyền.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #3 ← cần [[luu-csv-tren-pi]] · → kế tiếp [[flask-tren-pi]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #du-lieu #sql

---

## 💡 Ý chính

| | SQLite | MariaDB |
|---|---|---|
| Dạng | một file | server chạy nền |
| User, quyền | không | có |
| Trong Python | `import sqlite3`, có sẵn | cần thêm thư viện kết nối |
| Trong slide | tr. 59, 67 (GDA lưu dữ liệu) | tr. 64–66 (`temperature_db`) |
| Hợp với | một Pi, một chương trình ghi | nhiều client cùng dùng |

## 🧩 Trực giác / Ví dụ

SQLite là **cuốn sổ trong ngăn kéo** của mình. MariaDB là **thủ kho**: phải đăng ký tên và được cấp quyền mới vào được.

## 🔢 Công thức / Định nghĩa

**MariaDB, theo slide:**

```sql
-- chạy bằng: sudo mysql
CREATE USER 'pi'@'localhost';
CREATE DATABASE temperature_db;
GRANT ALL PRIVILEGES ON temperature_db.* TO 'pi'@'localhost';
exit
```

```sql
-- chạy bằng: mysql
USE temperature_db
CREATE TABLE tempLog (
  tempId int(11) AUTO_INCREMENT NOT NULL,
  temperature VARCHAR(20) NOT NULL,
  PRIMARY KEY (tempId)
);
DESCRIBE tempLog;
```

**SQLite, slide không có code** (🔎 đã chạy thử):

```python
import sqlite3

conn = sqlite3.connect("sensor.db")
conn.execute("""CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ts TEXT DEFAULT CURRENT_TIMESTAMP,
    temperature REAL,
    humidity REAL)""")
conn.execute("INSERT INTO readings (temperature, humidity) VALUES (?, ?)", (25.4, 60.7))
conn.commit()
conn.close()
```

## ⚙️ Khi nào dùng / Ứng dụng

- GDA lưu dữ liệu nhận từ CDA → [[pi-lam-cda-gda]], [[flask-tren-pi]].
- Bài lab trên một Pi: SQLite là đủ và ít việc cài đặt nhất.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ Tr. 59: `pip3 install flask sqlite3` **lỗi** vì không có gói `sqlite3` trên PyPI. 🔎 Đã thử: `No matching distribution found for sqlite3`. Module này có sẵn trong Python; `sudo apt install sqlite3` chỉ để có lệnh dòng lệnh.
- `ERROR 1698 (28000): Access denied for user 'pi'@'localhost'` ở tr. 65: chạy `mysql` khi chưa tạo user. Phải vào bằng `sudo mysql` trước.
- `temperature VARCHAR(20)` lưu số thành chuỗi nên khó tính trung bình; nên dùng kiểu số. Bảng `tempLog` cũng **không có cột thời gian**, không biết số đo thuộc lúc nào.
- User `pi` không có mật khẩu: chỉ tạm chấp nhận vì giới hạn ở `localhost`.
- Slide không có lệnh cài MariaDB. Thường là `sudo apt install mariadb-server` *(ngoài slide)*.
- Luôn dùng dấu `?` như trên, không tự ghép chuỗi SQL, để tránh SQL injection.

## 🔗 Liên kết

- **Tiền đề:** [[luu-csv-tren-pi]]
- **Dẫn tới:** [[flask-tren-pi]] · [[http-post-json]]

## ❓ Câu hỏi mở

- Slide tạo database MariaDB nhưng tr. 67 lại nói lưu vào SQLite. Practice 6_5.py dùng loại nào?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 59, 62–67

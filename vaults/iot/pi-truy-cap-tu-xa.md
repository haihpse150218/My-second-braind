---
slug: pi-truy-cap-tu-xa
title: Làm việc với Pi từ xa — OS, VNC, WinSCP, raspi-config
vault: iot
type: concept
branch: E
order: 3
status: learning
tags: [iot, raspberry-pi, cong-cu, linux]
prev: [pi-gpio-pinout]
next: [gpio-python]
related: [raspberry-pi-la-gi, arduino-toolchain]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Làm việc với Pi từ xa — OS, VNC, WinSCP, raspi-config

> Tóm tắt 1 câu: ở phòng lab không cần cắm màn hình cho Pi — **VNC/SSH để điều khiển, WinSCP để chép code, Thonny để chạy**, còn `raspi-config` bật các cổng giao tiếp.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #3 ← cần [[pi-gpio-pinout]] · → kế tiếp [[gpio-python]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #cong-cu #linux

---

## 💡 Ý chính

Quy trình mỗi buổi thực hành (Practice 4.1):

1. Kết nối vào Pi qua VNC, SSH hoặc Remote. IP và tài khoản: xem **trang 8 của PDF** (không chép vào repo public).
2. Tạo một thư mục tên nhóm trên Desktop của Pi.
3. Dùng WinSCP upload code từ máy mình lên Pi.
4. Mở **Start → Programming → Thonny** để chạy.

## 🧩 Trực giác / Ví dụ

Với Arduino, code đi một chiều qua cáp USB ([[arduino-toolchain]]). Với Pi, code **chỉ là file trên một máy tính khác trong mạng**: chép file sang rồi chạy ở đó, không có bước nạp.

## 🔢 Công thức / Định nghĩa

| Công cụ | Việc | Link |
|---|---|---|
| Raspberry Pi OS | hệ điều hành chính thức (tên cũ Raspbian), cài bằng Raspberry Pi Imager | https://www.raspberrypi.com/software |
| RealVNC Viewer | xem và điều khiển desktop Pi từ xa | https://www.realvnc.com/en/connect/download/vnc/ |
| Raspberry Pi Connect | truy cập desktop Pi qua trình duyệt | — |
| WinSCP | upload, sửa file trên Pi | https://winscp.net/eng/index.php |
| Thonny | IDE Python có sẵn trên Pi | — |
| `sudo raspi-config` | bật/tắt cổng giao tiếp (mục Interface Options) | — |

### Dùng VS Code thay cho VNC + WinSCP + Thonny *(ngoài slide, chưa thử trên Pi của lab)*

Extension **Remote - SSH** mở thẳng thư mục trên Pi: sửa file, mở terminal, chạy code đều trong VS Code, nên không cần chép file bằng WinSCP.

1. Bật SSH trên Pi: `sudo raspi-config` → Interface Options → SSH. Máy lab có thể đã bật sẵn.
2. Thử từ máy mình: `ssh <user>@<ip-cua-pi>`.
3. Cài extension **Remote - SSH** (`ms-vscode-remote.remote-ssh`).
4. `Ctrl+Shift+P` → **Remote-SSH: Connect to Host…** → nhập `<user>@<ip-cua-pi>`, chọn Linux.
5. **File → Open Folder** tới thư mục nhóm, rồi chạy `python3 ten_file.py` trong terminal của VS Code.

Lần đầu VS Code tự cài server lên Pi nên hơi lâu, và Pi cần ra được Internet. Pi 3B+ chỉ có 1 GB RAM nên nên hạn chế extension bên phía Pi. Nếu bị chậm hoặc không cài được, dùng SSH thuần trong terminal của máy mình.

## ⚙️ Khi nào dùng / Ứng dụng

- Cần thấy cửa sổ GUI (guizero, Thonny) → vẫn phải có màn hình Pi, tức VNC hoặc màn hình thật. SSH không hiện được các cửa sổ này.
- Chỉ chạy script, GPIO, cảm biến, Flask → VS Code Remote - SSH hoặc SSH thuần là đủ.
- Dùng UART hoặc I2C → vào `raspi-config` trước, xem [[uart-pi-arduino]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Máy mình phải **cùng mạng** với Pi; phòng lab khác nhau có dải IP khác nhau.
- Pi dùng chung cả lớp nên hãy để code trong thư mục nhóm để không đè bài nhau.
- Tài khoản mặc định chỉ hợp với mạng lab; Pi nối Internet thì phải đổi mật khẩu *(ngoài slide)*.

## 🔗 Liên kết

- **Tiền đề:** [[raspberry-pi-la-gi]]
- **Dẫn tới:** [[gpio-python]]
- **Liên quan:** [[arduino-toolchain]]

## ❓ Câu hỏi mở

- Raspberry Pi Connect có cần Pi ra được Internet không, hay chạy trong mạng lab được?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 5–9, 12, 15

---
slug: iot-slide-part2-raspberry-pi
title: "IAD591 — Slide Part 2: Raspberry Pi, GUI, CDA/GDA, dữ liệu"
vault: iot
type: inbox
status: done
tags: [iot, da-chung-cat]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# IAD591 — Slide Part 2: Raspberry Pi, GUI, CDA/GDA, dữ liệu

**Nguồn gốc:** `D:\MSA-FPT\IOT\material\IAD_MSA33_Part_2.pdf` (72 trang, tên gốc trong PDF: *Intro to IoT Programming - MSE34HCM*)
**Trạng thái:** ✅ Đã chưng cất — 17 note ở nhánh E, F, H
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]

> ⚠️ **Note thô** — chép tay từ ảnh render từng trang. `pdftotext` không dùng được: PDF xuất bằng *Microsoft Print To PDF* làm rơi dấu tiếng Việt, 21/72 trang gần như không có text.
> Nằm trong `_inbox/` nên app không đọc, không lên graph. Code giữ nguyên như slide, **kể cả chỗ sai**; lỗi được ghi ở các note đã chưng cất.
>
> 🔒 **Lược bỏ có chủ đích** vì repo public: trang 8 (bảng IP phòng lab + tài khoản đăng nhập Pi) và email giảng viên ở trang 26–27. Xem bản đầy đủ trong PDF gốc.

---

## 3. Raspberry Pi (tr. 1–9)

**Tr. 1 — 3. Raspberry Pi (model 3B+).** Ảnh trang raspberrypi.com: *The final revision of our third-generation single-board computer. 1.4GHz 64-bit quad-core processor, dual-band wireless LAN, Bluetooth 4.2/BLE, faster Ethernet, and Power-over-Ethernet support (with separate PoE HAT).*

**Tr. 2 — Raspberry Pi 3 Model B+ Overview** (ảnh Cytron):
- Broadcom BCM2837B, Quad-Core, 64-bit, 1.4 GHz · Dual Core VideoCore IV GPU · 1 GB RAM
- Shielded 802.11 b/g/n/ac dual band 2.4 GHz & 5 GHz WiFi · Bluetooth 4.2 & BLE · PCB antenna
- Pre-soldered 40-pin GPIO · PoE header pins · RUN & PEN pins for reset · 4× USB 2.0 · Ethernet (max 300 Mbps)
- Audio + Video composite 3.5 mm jack · MIPI CSI camera · MIPI DSI display · HDMI chuẩn · microSD (mặt dưới) · USB microB chỉ cấp nguồn
- LED xanh = activity, LED đỏ = nguồn 5 V · lỗ bắt vít 2,5 mm

**Tr. 3 — Pins.** Sơ đồ 40 chân (xem tr. 11).

**Tr. 4 — Pins.** Bảng chân + chú thích:
- OUTPUT: GPIO xuất dữ liệu hoạt động LOGIC cao 3.3V và LOGIC thấp là 0V. Cường độ dòng điện max. 16mA
- INPUT: đọc vào điện áp max 3.3V, min 0V. Các chân GPIO đều cho phép thiết lập và chọn tính năng điện trở kéo lên / kéo xuống. TRỪ CHÂN 2 VÀ 3 LÀ MẶC ĐỊNH ĐIỆN TRỞ KÉO LÊN
- LƯU Ý: khi đưa điện áp trực tiếp từ ngoài vào, VD: 5V → phải qua mạch hạ áp

**Tr. 5 — Raspberry Pi OS**, https://www.raspberrypi.com/software — *Raspberry Pi OS (previously called Raspbian) is our official supported operating system*; Raspberry Pi Imager cài OS lên microSD; có bản 64-bit, Legacy, Legacy 64-bit, Desktop.

**Tr. 6 — Remote control with RealVNC Viewer**, https://www.realvnc.com/en/connect/download/vnc/

**Tr. 7 — Raspberry Connect.** Ảnh Pi + giao diện web Connect (Devices, màn hình desktop Pi trong trình duyệt).

**Tr. 8 — IP address.** 🔒 Lược bỏ (xem đầu file). Nội dung: 2 phòng, mỗi phòng 6 Pi, cùng một tài khoản.

**Tr. 9 — Upload / Edit file with WinSCP**, https://winscp.net/eng/index.php — hỗ trợ SFTP, FTP, S3, WebDAV.

## 4. Interfacing with Raspberry Pi (tr. 10–25)

**Tr. 10 — 4. Interfacing with Raspberry Pi** (trang tiêu đề)

**Tr. 11 — Pins**

| Trái | Chân | Chân | Phải |
|---|---:|---:|---|
| 3V3 power | 1 | 2 | 5V power |
| GPIO 2 (SDA) | 3 | 4 | 5V power |
| GPIO 3 (SCL) | 5 | 6 | Ground |
| GPIO 4 (GPCLK0) | 7 | 8 | GPIO 14 (TXD) |
| Ground | 9 | 10 | GPIO 15 (RXD) |
| GPIO 17 | 11 | 12 | GPIO 18 (PCM_CLK) |
| GPIO 27 | 13 | 14 | Ground |
| GPIO 22 | 15 | 16 | GPIO 23 |
| 3V3 power | 17 | 18 | GPIO 24 |
| GPIO 10 (MOSI) | 19 | 20 | Ground |
| GPIO 9 (MISO) | 21 | 22 | GPIO 25 |
| GPIO 11 (SCLK) | 23 | 24 | GPIO 8 (CE0) |
| Ground | 25 | 26 | GPIO 7 (CE1) |
| GPIO 0 (ID_SD) | 27 | 28 | GPIO 1 (ID_SC) |
| GPIO 5 | 29 | 30 | Ground |
| GPIO 6 | 31 | 32 | GPIO 12 (PWM0) |
| GPIO 13 (PWM1) | 33 | 34 | Ground |
| GPIO 19 (PCM_FS) | 35 | 36 | GPIO 16 |
| GPIO 26 | 37 | 38 | GPIO 20 (PCM_DIN) |
| Ground | 39 | 40 | GPIO 21 (PCM_DOUT) |

**Tr. 12 — Cấu hình Enable/Disable các cổng giao tiếp.** CLI: `sudo raspi-config` (ảnh menu: System, Display, Interface, Performance, Localisation, Advanced, Update, About).

**Tr. 13 — Cài các thư viện.** gpiozero (thường đã được cài đặt sẵn); RPi.GPIO
```bash
sudo apt-get install python3-gpiozero
sudo apt-get install rpi.gpio
```

**Tr. 14 — LED Blink**
```cpp
// Arduino
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```
```python
# Raspberry Pi
from gpiozero import LED
from time import sleep

led = LED(17)

while True:
    led.on()
    sleep(1)
    led.off()
    sleep(1)
```

**Tr. 15 — Practice 4.1: Blink.** LED Red: GPIO 17 (số thứ tự trên Board: 11). Viết code điều khiển đèn với các library gpiozero hoặc RPi.GPIO. Yêu cầu: đèn nhấp nháy 1s. Kết nối vào host 192.xxx.yyy.zzz (VNC/SSH/Remote). Tạo 1 thư mục (tên nhóm) trên Desktop của Pi. Dùng WinSCP upload code từ local lên Pi. Start → Programming → Thonny.

**Tr. 16 — Nhắc lại cách đấu mạch công tắc on/off.** Push Button LED Circuit: nguồn 5V, nút nhấn, R1 330, LED nối tiếp; ảnh breadboard.

**Tr. 17 — Practice 4.2: Blink.** Kết nối host (VNC/SSH/Remote). LED Red: GPIO 17 (Board Pin 11). Button: GPIO 2 (Board Pin 3). Viết code với gpiozero, RPi.GPIO. Yêu cầu: không nhấn công tắc → đèn LED nhấp nháy; nhấn công tắc → đèn sáng liên tục. Tạo thư mục trên Desktop và upload code.

**Tr. 18 — Sơ đồ mạch Practice 2 (Button Blink).** Cùng chân như tr. 17, nhưng yêu cầu: không nhấn công tắc → LED tắt; nhấn công tắc → LED nhấp nháy.

**Tr. 19 — Sơ đồ mạch Practice 2 (Button Blink).** Ảnh mạch: dây xanh "Receive" (nút → Pi), dây cam "Control" (Pi → LED).

**Tr. 20 — Practice 4.3: PWM.** LED Red: GPIO 17 (Board Pin 11); Button: GPIO 2 (Board Pin 3); Library gpiozero / RPi.GPIO.

**Tr. 21 — Practice 4.3: PWM.** Dùng PWM để điều chỉnh độ sáng LED đỏ. Mỗi lần nhấn nút (GPIO 2), duty cycle tăng thêm 10%. Khi đạt 100%, nhấn thêm sẽ reset về 0% (LED tắt). Xem code mẫu.

**Tr. 22 — Practice 4.3: code mẫu**
```python
from gpiozero import PWMLED, Button
from time import sleep

# --- Cấu hình chân ---
led = PWMLED(17)      # GPIO 17 (Board Pin 11)
button = Button(2)    # GPIO 2  (Board Pin 3)

brightness = 0.0
step = 0.1  # tăng 10% mỗi lần nhấn

def adjust_brightness():
    global brightness
    brightness += step
    if brightness > 1.0:
        brightness = 0.0
    led.value = brightness
    print(f"LED brightness: {brightness:.1f}")

# Khi nhấn nút, gọi hàm adjust_brightness
button.when_pressed = adjust_brightness

# Giữ chương trình chạy
while True:
    sleep(0.1)
```

**Tr. 23 — Mạch hạ áp 5V → 3V.** Tín hiệu từ sensor/Arduino Vin → R1 → điểm giữa (tín hiệu input Pi Vout) → R2 → GND. Công thức: `Vout/R2 = Vin/(R1+R2)`, `R2 = Vout/(Vin − Vout) × R1`. "Kết quả:" để trống.

**Tr. 24 — Cảm biến siêu âm HC-SR04.** Specs: Operating voltage 5 V · current 15 mA · frequency 40 kHz · range 2–400 cm · resolution 3 mm · angle 15 degrees · trigger 10 µs high pulse. Ảnh nối với Arduino Uno.

**Tr. 25 — Practice 4.4.** Thiết kế mạch cho HC-SR04: VCC 5V -- GND; Trig GPIO 23; Echo kết nối với mạch chia điện áp, sau đó kết nối với GPIO 24. Điều chỉnh LED và buzzer nối tiếp tại GPIO 17 cảnh báo (*) theo khoảng cách đo được. Ngưỡng cảnh báo 100%: tùy chọn (0,5 m). (*) Cảnh báo: độ sáng đèn / âm thanh tăng giảm hoặc nhanh chậm.

## 5. GUI trên Pi và đa giao thức (tr. 26–45)

**Tr. 26 — Thiết kế GUI trên Raspberry Pi & thu thập dữ liệu đa giao thức.** Giảng viên: TS. Đoàn Xuân Huy Minh.

**Tr. 27 — Bộ công cụ phần mềm: chọn Tkinter hay Guizero?**
- Tkinter: thư viện tiêu chuẩn có sẵn của Python. Rất mạnh mẽ, tùy biến cao nhưng code dài dòng, phức tạp cho người mới.
- Guizero (khuyên dùng): là wrapper của Tkinter. Cực kỳ dễ học, code ngắn gọn, tối ưu cho các dự án IoT và người mới bắt đầu.
- Lệnh: `sudo apt-get install python3-guizero`

**Tr. 28 — Install GUI library on Raspberry.** Open Terminal.
```bash
sudo apt-get install python3-tk         # tkinter
sudo apt-get install python3-guizero    # GUIzero
sudo apt-get install pip3               # Easygui (cài thêm pip3 nếu cần)
pip install easygui
```

**Tr. 29 — Review: Điều khiển LED.** Ảnh mạch nút + LED như tr. 19.

**Tr. 30 — Practice 5.1: Thiết kế Button LED.** Cửa sổ "Điều Khiển LED" có 4 nút: BẬT LED · TẮT LED · Nháy LED · Đóng. Mạch: LED + điện trở nối Pi.

**Tr. 31 — Practice 5.2: Truyền / Hiện dữ liệu cảm biến.** Mục tiêu: GUI hiển thị dữ liệu cảm biến (nhiệt độ / khoảng cách) từ Arduino (hoặc nguồn dữ liệu khác): trực tiếp từ GPIO (UART); Serial (USB → bài kế tiếp); Bluetooth (→ tự chọn).

**Tr. 32 — Kết nối UART.** Ảnh Arduino + LM35 + breadboard + Pi; hình đầu header chỉ 3.3V (chân 1), GND (chân 6), TXD (chân 8), RXD (chân 10).

**Tr. 33 — Hướng dẫn kết nối HC-SR04.** VCC 5V; GND; Trig GPIO 23; Echo kết nối với mạch chia điện áp, sau đó kết nối với chân GPIO 24. Ngưỡng cảnh báo 0,5 m. `Distance (cm) = Time (s) × Speed of Sound (cm/s) / 2`.

**Tr. 34 — LED 7 đoạn 5161AS.** Hiển thị các số từ 0 đến 9 lên LED 7 đoạn 5161AS bằng Raspberry Pi, dùng Python và thư viện RPi.GPIO. Sơ đồ cathode chung.

**Tr. 35 — Sơ đồ chân LED 5161AS.** 1=e, 2=d, 3=chung, 4=c, 5=dp, 6=b, 7=a, 8=chung, 9=f, 10=g. Ảnh nối Pi.

**Tr. 36 — Sơ đồ chân LED 5161AS**

| Đoạn LED | Chân GPIO | Chân BOARD |
|---|---|---:|
| a | GPIO15 | 10 |
| b | GPIO02 | 3 |
| c | GPIO21 | 40 |
| d | GPIO20 | 38 |
| e | GPIO16 | 36 |
| f | GPIO17 | 11 |
| g | GPIO27 | 13 |
| GND | GND | GND |

**Tr. 37, 39, 40 — Code mẫu**
```python
# Nạp thư viện điều khiển GPIO và thư viện time
import RPi.GPIO as GPIO
import time

# Tắt cảnh báo và đặt chế độ đánh số chân theo BCM
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Khai báo các chân GPIO BCM điều khiển 7 đoạn: a, b, c, d, e, f, g
led_pins = [15, 2, 21, 20, 16, 17, 27]

# Khai báo các chân là OUTPUT
for pin in led_pins:
    GPIO.setup(pin, GPIO.OUT)

# Mỗi mẫu số là một danh sách 7 giá trị (tương ứng a -- g)
# Giá trị 1 là sáng, 0 là tắt
digit_patterns = [
    [1,1,1,1,1,1,0],  # 0
    [0,1,1,0,0,0,0],  # 1
    [1,1,0,1,1,0,1],  # 2
    [1,1,1,1,0,0,1],  # 3
    [0,1,1,0,0,1,1],  # 4
    [1,0,1,1,0,1,1],  # 5
    [1,0,1,1,1,1,1],  # 6
    [1,1,1,0,0,0,0],  # 7
    [1,1,1,1,1,1,1],  # 8
    [1,1,1,0,0,1,1]   # 9
]

# Hàm hiển thị 1 chữ số lên LED
def display_digit(pattern):
    for i in range(7):
        GPIO.output(led_pins[i], pattern[i])

# Vòng lặp chính hiển thị các số từ 0 đến 9
try:
    while True:
        for pattern in digit_patterns:
            display_digit(pattern)
            time.sleep(1)
except KeyboardInterrupt:
    print("Đã dừng chương trình")
finally:
    GPIO.cleanup()
```

**Tr. 38 — Practice 5.1.** Thiết kế GUI với các số từ 0-9. Click vào số trên GUI → hiện số trên LED.

**Tr. 41–42 — LED 4 số 3641AS.** Là loại LED 7 đoạn, 4 chữ số ghép lại. Có common cathode (cathode chung): mỗi chữ số có GND riêng. 12 chân: 8 chân điều khiển segment a-g + dp; 4 chân chọn (multiplexing) digit 1-4. Ảnh nhãn chân: hàng trên 12=digit 1, 11=A, 10=F, 9=digit 2, 8=digit 3, 7=B; hàng dưới 1=E, 2=D, 3=DP, 4=C, 5=G, 6=digit 4.

**Tr. 43 — IC 74HC595**

| Chân | Tên | Chức năng |
|---|---|---|
| 1–7, 15 | Q0 đến Q7 | Các chân xuất tín hiệu, giống như các chân Digital được cài đặt là OUTPUT (Q1–Q7 = chân 1–7, Q0 = chân 15) |
| 8 | GND | Ground, cực âm |
| 9 | Q7″ | Chân xuất ra tín hiệu Serial |
| 10 | MR | Master Reclear, nối cực dương để bật IC hoạt động |
| 11 | SH_CP | Shift register clock pin |
| 12 | ST_CP | Storage register clock pin (latch pin) |
| 13 | OE | Output enable, nối cực âm để các đèn LED có thể sáng được |
| 14 | DS | Serial data input |
| 16 | Vcc | Cấp nguồn cho IC và LED |

**Tr. 44 — Mạch LED 3641AS + IC 74HC595**

| 74HC595 (Qn) | Segment | | Chữ số LED | GPIO Pi (BCM) |
|---|---|---|---|---|
| Q0 (15) | a | | Digit 1 | GPIO5 |
| Q1 (1) | b | | Digit 2 | GPIO6 |
| Q2 (2) | c | | Digit 3 | GPIO13 |
| Q3 (3) | d | | Digit 4 | GPIO19 |
| Q4 (4) | e | | | |
| Q5 (5) | f | | | |
| Q6 (6) | g | | | |
| Q7 (7) | dp | | | |

| Raspberry Pi (BCM) | 74HC595 | Chức năng |
|---|---|---|
| GPIO17 | DS (14) | Dữ liệu vào (Data Serial) |
| GPIO27 | SHCP (11) | Clock dịch (Shift Clock) |
| GPIO22 | STCP (12) | Clock lưu (Storage Clock) |
| GND | GND (8) | Mass GND |
| 3.3V | VCC (16) | Cấp nguồn 3.3V |
| GND | OE (13) | GND để kích hoạt output |
| 3.3V (qua điện trở 10k) | MR (10) | Giữ ở mức HIGH để tránh reset |

**Tr. 45 — Practice 5.2.** Nhận tín hiệu về từ sensor HC-SR04. Thiết kế GUI với 2 button START / STOP. Bắt đầu LED = 00.00. Click vào START → hiện khoảng cách đo trên LED (đơn vị cm), VD: 50.20. Click vào STOP → LED hiện 00.00.

## 6. Constrained Device Application — CDA (tr. 46–57)

**Tr. 46 — 6. CDA.** Hai thành phần chính trong hệ thống IoT: ứng dụng trên thiết bị bị giới hạn (Constrained Device Application - CDA); ứng dụng trên thiết bị cổng (Gateway Device Application - GDA).

**Tr. 47 — CDA.** Định nghĩa: thiết bị thu thập dữ liệu cảm biến và gửi đến GDA. VD: Arduino, cảm biến nhiệt độ, độ ẩm, ánh sáng. Vai trò: cung cấp mô hình tương tác yêu cầu/phản hồi giữa các điểm cuối ứng dụng; giúp tương tác giữa các loại thiết bị khác nhau. Thách thức: tài nguyên hạn chế, độ tin cậy và bảo mật. Hình các loại cảm biến: temperature, acoustic & noise, gyroscope, actuators, light, motion, chemical, moisture, water level, presence & proximity, image.

**Tr. 48 — VD: Cài đặt và cấu hình cảm biến DHT.** `pip3 install requests RPi.GPIO adafruit-circuitpython-dht`. Ảnh các module AM2302/DHT22, DHT11.

**Tr. 49 — Thông số kỹ thuật**

| | DHT11 | DHT22 |
|---|---|---|
| Temperature range | 0 to 50 °C ±2 °C | -40 to 80 °C ±0.5 °C |
| Humidity range | 20 to 90% ±5% | 0 to 100% ±2% |
| Resolution | Humidity 1%, Temperature 1 °C | Humidity 0.1%, Temperature 0.1 °C |
| Operating voltage | 3 – 5.5 V DC | 3 – 6 V DC |
| Current supply | 0.5 – 2.5 mA | 1 – 1.5 mA |
| Sampling period | 1 second | 2 seconds |
| Price | $1 to $5 | $4 to $10 |

Nối chân: GND → GND; VCC → 3V3 (OUT); DAT → GPIO 4 (or any other digital pin).

**Tr. 50 — VD: Cài đặt và cấu hình cảm biến DHT.** Lưu ý: Nếu VCC 5V → làm mạch giảm áp từ Signal trước khi về Pi. Bảng: GPIO 4 → S (Signal Pin); 3.3 / 5 V → VCC (Power); GND → G (- / Ground).

**Tr. 51 — Thiết lập Raspberry Pi làm CDA.** Bảng: GPIO 4 Pin → S; 5 Volt → V; GND → G.
```text
import time
import board
import adafruit_dht

//Khởi tạo cảm biến DHT22 và kết nối tới chân GPIO4
//dhtDevice = adafruit_dht.DHT22(board.D4)

//Khởi tạo cảm biến DHT11 và kết nối tới chân GPIO4
dhtDevice = adafruit_dht.DHT11(board.D4)
```

**Tr. 52 — Thu dữ liệu từ cảm biến (6.1)**
```text
while True:
    try:
        #Đọc nhiệt độ từ cảm biến DHT22
        temperature = dhtDevice.temperature
        #Đọc độ ẩm từ cảm biến DHT22
        humidity = dhtDevice.humidity
        #In ra nhiệt độ và độ ẩm với một chữ số sau dấu thập phân
        print(f"Temp: {temperature:.1f} C  Humidity: {humidity:.1f} %")
    except RuntimeError as error:
        //In ra thông báo lỗi nếu có lỗi trong quá trình đọc cảm biến
        print(error.args[0])
    //DHT đôi khi trả về lỗi do chất lượng tín hiệu.
    Để hạn chế lỗi, đọc lại sau 5 giây.
    time.sleep(5.0)
```

**Tr. 53 — Lưu dữ liệu thành CSV**
```text
import time
import board
import adafruit_dht
import csv
from datetime import datetime

# Khởi tạo cảm biến DHT11 trên GPIO4
sensor = adafruit_dht.DHT11(board.D4)

# Tên file CSV để lưu dữ liệu
filename = "dht11_data.csv“

# Tạo file CSV
with open(filename, mode='a', newline='') as file:
    writer = csv.writer(file)

# Vòng lặp liên tục để đọc và lưu dữ liệu
while True:
    try:
        # Đọc nhiệt độ và độ ẩm
        temperature = sensor.temperature
        humidity = sensor.humidity

        # Lấy thời gian hiện tại (dạng chuỗi)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
```

**Tr. 54 — Lưu dữ liệu thành CSV (2)**
```text
# Mở file và ghi dữ liệu vào
with open(filename, mode='a', newline='') as file:
    writer = csv.writer(file)
    writer.writerow([timestamp, f"{temperature:0.1f}", f"{humidity:.1f}"])

2025-11-14 15:22:30,26.0,78.8,60.0
2025-11-14 15:22:33,26.1,79.0,59.5
2025-11-14 15:22:36,26.1,79.0,59.4
```

**Tr. 55 — Lưu dữ liệu thành CSV (3)**
```text
#Cách 2, ghi với định dạng
    file = open(filename,"a")
    file.write(“{0} Temp={1:0.1f}C Humidity={2:0.1f}%".format(timestamp, temperature, humidity))
else:
    file = open(filename,"a")
    file.write("NA")
```
Chú thích: giả sử temperature là 25.4 và humidity là 60.7; chuỗi định dạng `"Temp={1:0.1f}C Humidity={2:0.1f}%"`; sau khi định dạng `"Temp=25.4C Humidity=60.7%"`.

**Tr. 56 — Practice 6.2: ghi dữ liệu thành CSV.** Ghi thời gian hiện tại. Ghi giá trị nhiệt độ và độ ẩm vào file CSV với định dạng số thực có 2 chữ số thập phân. Nếu không đọc được giá trị từ cảm biến, ghi NULL hoặc NA.

**Tr. 57 — Practice 6.3.** Đọc dữ liệu từ cảm biến DHT11, lưu giá trị vào 1 file database trên Raspberry Pi. Hiện giá trị trên LED 7 đoạn 4 số: **nhiệt độ** (VD: 25 °C hoặc 25.4). Ghi nhận tối thiểu 50 dòng → file TXT hoặc CSV: ghi timestamp; ghi giá trị nhiệt độ và độ ẩm vào file CSV với định dạng float 1 chữ số thập phân; nếu lỗi không đọc được giá trị từ cảm biến, ghi NA hoặc NULL.

## 7. Raspberry Pi as Gateway Device Application (tr. 58–61)

**Tr. 58 — 7. GDA.** Định nghĩa: thiết bị trung gian giữa CDA và Cloud Server. Vai trò: thu thập, xử lý sơ bộ, lưu trữ tạm thời và truyền tải dữ liệu; các ví dụ: Raspberry Pi, máy chủ trung gian. Thách thức: xử lý dữ liệu lớn, bảo mật, và tính liên tục.

**Tr. 59 — Thiết lập máy chủ Flask và SQLite3**
```bash
sudo apt install python3 python3-pip
pip3 install flask sqlite3
# HOẶC
sudo apt install python3-flask
sudo apt install sqlite3
# Kiểm tra phiên bản:
sqlite3 --version
```

**Tr. 60 — Serial control Arduino**
```cpp
if (Serial.available() > 0) {
  // Đọc dữ liệu từ serial
  int data = Serial.read();

  // Kiểm tra dữ liệu và điều khiển đèn LED tương ứng
  if (data == '1') {
    digitalWrite(ledPin1, HIGH); // Bật đèn LED 1
  } else if (data == '2') {
    digitalWrite(ledPin1, LOW);  // Tắt đèn LED 1
```

**Tr. 61 — Exercise 3: Flask server.** Ảnh Arduino + 2 LED và trang "Arduino Web Server" trên Chromium tại `localhost/10/on`: mục "Các nút bật/tắt", PIN 10 "hiện tại đang bật" + link Tắt, PIN 11 "hiện tại đang tắt" + link Bật; mục "Các lệnh": LED chân 10: BẬT / TẮT, LED chân 11: BẬT…

## 8. Quản lý dữ liệu (tr. 62–72)

**Tr. 62 — 8. Quản lý dữ liệu** (trang tiêu đề)

**Tr. 63 — Kiểm tra nhận dữ liệu Serial từ Arduino.** `cat /dev/ttyS0`. Ảnh terminal: `Voltage: 0.28 V` / `Temperature: 27.86 °C`, `Voltage: 0.29 V` / `Temperature: 28.84 °C`.

**Tr. 64 — Tạo user và database**
```sql
sudo mysql
CREATE USER 'pi'@'localhost';
CREATE DATABASE temperature_db;
GRANT ALL PRIVILEGES ON temperature_db.* TO 'pi'@'localhost';
exit
```

**Tr. 65 — Tạo user và database.** Ảnh terminal: `mysql` khi chưa cấp quyền báo `ERROR 1698 (28000): Access denied for user 'pi'@'localhost'`.

**Tr. 66 — Kết quả tạo temperature_db.** Ảnh terminal, Server version 10.5.23-MariaDB-0+deb11u1 Debian 11:
```sql
USE temperature_db
CREATE TABLE tempLog (tempId int(11) AUTO_INCREMENT NOT NULL, temperature VARCHAR(20) NOT NULL, PRIMARY KEY (tempId));
DESCRIBE tempLog;
-- tempId      int(11)      NO  PRI  NULL  auto_increment
-- temperature varchar(20)  NO       NULL
```

**Tr. 67 — Xử lý và lưu trữ dữ liệu tại GDA.** Nhận dữ liệu từ CDA và lưu trữ vào cơ sở dữ liệu SQLite. Gửi dữ liệu lên Cloud Server bằng phương thức POST: Practice 6_4 (v1); Practice 6_5 (v2).

**Tr. 68 — Truyền tải dữ liệu đến GDA hoặc dịch vụ Cloud (Practice 6_4.py).** Đọc dữ liệu nhiệt độ và độ ẩm từ cảm biến DHT11/22 → đóng gói dữ liệu vào định dạng JSON → gửi dữ liệu đến máy chủ HTTP qua phương thức POST → kiểm tra phản hồi từ server để xác nhận rằng dữ liệu đã được gửi thành công.

**Tr. 69–71 — Practice 6_4.py**
```text
import requests
import json
import time
import board
import adafruit_dht

 Khởi tạo cảm biến DHT22 và kết nối tới chân GPIO4
dhtDevice = adafruit_dht.DHT22(board.D4)

 URL của máy chủ nơi dữ liệu sẽ được gửi tới
server_url = "http://<server_ip>:5000/post-data"

while True:
    try:
         Đọc nhiệt độ từ cảm biến DHT22
        temperature = dhtDevice.temperature
         Đọc độ ẩm từ cảm biến DHT22
        humidity = dhtDevice.humidity

         Tạo dữ liệu JSON từ giá trị nhiệt độ và độ ẩm
        data = {"temperature": temperature, "humidity": humidity}

         Gửi dữ liệu tới máy chủ bằng phương thức POST
        response = requests.post(server_url, json=data)

        #Kiểm tra trạng thái phản hồi từ máy chủ
        if response.status_code == 201:
            print("Data sent successfully")
            #Dữ liệu gửi thành công
        else:
            print(f"Failed to send data. Status code: {response.status_code}")
            #Dữ liệu không gửi được

    except RuntimeError as error:
        #In ra thông báo lỗi nếu có lỗi trong quá trình đọc cảm biến
        print(error.args[0])

    #Tạm dừng chương trình trong 10 giây trước khi đọc giá trị mới
    time.sleep(10.0)
```

**Tr. 72 — HTTP Flask + SQL.** Xem code Practice 6_5.py (file này **không** có trong PDF).

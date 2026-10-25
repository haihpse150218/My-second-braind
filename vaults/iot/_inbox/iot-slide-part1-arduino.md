---
slug: iot-slide-part1-arduino
title: "IAD591 — Slide Part 1: Giới thiệu IoT · Arduino & C"
vault: iot
type: inbox
status: todo
tags: [iot, chua-chung-cat]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# IAD591 — Slide Part 1: Giới thiệu IoT · Arduino & C

**Nguồn gốc:** `D:\MSA-FPT\IOT\material\IAD_MSA33_Part_1.pdf`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Dự kiến tách:** 4 thành phần IoT · cảm biến/chấp hành · Ohm · Arduino · digital/analog · UART · I2C LCD · LM35

> ⚠️ **Note thô** — text trích bằng `pdftotext -layout` từ PDF gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---

```text
IAD591
IoT Application Development

       Dr Đoàn Xuân Huy Minh
        minhdxh@fe.edu.vn
            09.1800.8030

           Assessments

Exercises:
                3 x 15%
Presentation:
                1 x 15%
Project:
                1 x 40%
Completion
Criteria:       Final Grade >= 5 /10

              Course content

         1. Introduction to            5.IoT Graphical             7.IoT Protocols
Part 1

                              Part 2

                                                          Part 3
           IoT and                       User Interface              and Connection
           embedded                    6.IoT Database              8.Integration: Flow
           systems                       Management                  & Dashboard
         2. Arduino & C                7.IoT Platforms             9.Capstone
         3. Raspberry Pi &               and Linux                   Project
           Python                                                    Showcase (9+10)
         4. Advanced
           Interfacing with
           Raspberry Pi

      Liêm chính học thuật

Tất cả bài nộp và dự án phải là công sức của nhóm/HV.

Tài liệu tham khảo (nếu có) cần được dẫn nguồn

Khuyến khích sử dụng AI để hỗ trợ code, nhưng sản phẩm cuối
cùng phải thể hiện sự hiểu biết và đóng góp của người học.

Textbook
• Programming the Internet of Things by Andy King

      Session 1: Introduction to IoT and
      Embedded Systems

• Overview of IoT concepts and applications
• Key components of IoT systems
• Introduction to schematic diagram
• Introduction to simulation

Embedded Systems

Hệ thống điều khiển chuyên dụng thực hiện
các nhiệm vụ cụ thể (trong 1 hệ thống lớn).

Ứng dụng:

• Thiết bị điện tử tiêu dùng
• Hệ thống ô tô
• Máy móc công nghiệp
• Thiết bị y tế và nhiều hơn nữa.

         Discussion:

                                                  Smart city

              Smart
                                      Smart car
              home

                         Industrial
                            IoT

            Healthcare                                         Agriculture

• Xe tự lái cần dữ liệu gì?
• Vai trò của IoT

    Main components of IoT

  Sensors và      • Sensors: Thu thập dữ liệu từ môi trường.
   Actuators      • Actuators: Thực hiện hành động dựa trên dữ liệu cảm biến.

Connectivity &    • Wi-Fi, Bluetooth,
Transmission      • Mạng di động.

Data Processing   • Phân tích và xử lý dữ liệu để ra quyết định.

                  • Tương tác và điều khiển thiết bị IoT
 User Interface   • Giám sát dữ liệu

         Sensors / Cảm biến

• Temperature Sensors:
   • e.g. LM35, DHT11
• Light Sensors:
   • e.g. photodiodes
• Motion Sensors:
   • e.g. PIR, ultrasonic
• Proximity Sensors:
   • e.g. IR sensors, capacitive sensors
• Humidity Sensors:
   • e.g. DHT22, SHT3x
• Pressure Sensors:
   • e.g. BMP180, MPL3115A2

iPhone/iPad: Sensors Toolbox

Android: Sensor Box

   Discussion / Thảo luận

Ghi lại 1-2 cảm biến         Cho biết các hướng ứng dụng
 trên App Sensor              sử dụng các cảm biến này

Light sensor (CB ánh sáng)

Accelerometer (CB gia tốc)

  Magnetometer (CB từ
       trường)

Gyroscope (con quay hồi
       chuyển)

      Actuators / Bộ điều khiển – truyền động

• LEDs
• Motors:
  • DC motors,
    stepper motors,
    servo motors
• Relays
• Buzzers
• Solenoids

Schematic (SĐ nguyên lý)
-- Sơ đồ mạch nối tiếp

          Áp dụng định luật Ohm

     𝑉    ô   −𝑉
𝑅=
          𝐼

         • Nguồn: 5V
         • VLED = 2V
         • Imax = 20mA

Schematic (SĐ nguyên lý)
-- Sơ đồ mạch song song

      Mạch đấu song song (Parallel)

• V1 = V2 = V3 = V
• I = I1 + I2 + I3
• Viết công thức tính R

Resistor /
Điện trở

TinkerCad.com

Vẽ sơ đồ mạch LED với điện trở bằng tay
hoặc trên TinkerCAD

Giới thiệu về Arduino

• Arduino: nền tảng điện tử
  nhỏ gọn, dễ sử dụng
    • Arduino board
    • IDE
    • Arduino shields
    • Cộng đồng mở

Components
• Vi điều khiển/Vi xử lý:
  Là bộ não của hệ thống nhúng,
  thực thi lệnh lập trình.
• Bộ nhớ: Lưu trữ mã và dữ liệu.
• Giao diện Input/Output:
  Kết nối với thiết bị ngoài (cảm
  biến, chấp hành, module
  truyền thông).

Arduino Uno Rev3

                   Bo mạch Arduino là một thiết
                   bị điện tử nhỏ gọn, sử dụng vi
                   điều khiển để thực hiện các tác
                   vụ điều khiển phần cứng.

Key components of an Arduino board

         Arduino toolchain

  Combine &                            Hex file
                Compile      Link
  Transform                            creation

Code
                             Library    Hex
       Code

  Arduino IDE

https://www.arduino.cc/en/software

Installing the IDE (Windows)

Arduino sketch

       Biên dịch và upload code trong Arduino IDE

• Compilation
  • Verify: Biên dịch mã để kiểm tra lỗi, không tải chương trình lên Arduino.
  • Upload: Vừa biên dịch vừa tải chương trình đã biên dịch lên Arduino.
• Output: thông tin về quá trình kiểm tra code, VD báo lỗi cú
  pháp (syntax error)
• Serial Monitor: gửi các lệnh và nhận dữ liệu từ Arduino

Example 1: Blink LED

Compiling / Upload

Show verbose  debug

Output

         Digital vs. Analog pins (1)

Digital Pins:                    Analog Pins:
• Tín hiệu digital (chỉ có hai   • Tín hiệu Analog: 0 - 1023 (10-
  mức: HIGH hoặc LOW).             bit resolution)
•  điều khiển thiết bị có 2     • Chuyển đổi giá trị điện áp đó
  trạng thái ON/OFF: LEDs,         thành một số nguyên nhờ bộ
  switches, v.v...                 chuyển đổi ADC (Analog-to-
                                   Digital Converter)
                                 • Dùng với cảm biến (sensor)
                                   như cảm biến ánh sáng, nhiệt
                                   độ, độ ẩm.

         Digital vs. Analog pins (2)

Digital Pins:                    Analog Pins:
• Digital signals: HIGH (1) or   • Analog signals: Range from
  LOW (0)                          0 to 1023 (10-bit resolution)
• Used for binary devices:       • Used for sensors with
  LEDs, switches, etc.             varying outputs: temperature
                                   sensors, light sensors, etc.

       Các lệnh điều khiển cơ bản / Digital Pins

• void setup()
  • pinMode(pin#, OUTPUT);  quy ước chân/pin xuất tín hiệu ra
  • pinMode(pin#, INPUT);  quy ước chân/pin nhận tín hiệu vào
  • Hoặc int ledPins[] = {2, 3, 4, 5, 6, 7, 8, 9}; // Array
• void loop()
  • digitalWrite(pin#, HIGH);  ra điện áp cao
  • digitalWrite(pin#, LOW);  ra điện áp thấp (tắt)
  • delay(milisecond);  thời gian chờ

       Các lệnh điều khiển cơ bản / Digital Pins

• void setup()
  • int ledPins[] = {2, 3, 4, 5, 6, 7, 8, 9}; // Array
• void loop()
  • digitalWrite(ledPins[i], HIGH); // Turn the LED on
  • digitalWrite(ledPins[i], LOW); // Turn the LED off

Simulation 1a: Blink LED

                • Built-in LED

      Practice 1b: LED Blink with pushButton

• Tinker sample  LED Blink with pushButton

• Pin #12  OUTPUT

• Student work  link

         Digital vs. Analog pins (1)

Digital Pins:                    Analog Pins:
• Tín hiệu digital (chỉ có hai   • Tín hiệu Analog: 0 - 1023 (10-
  mức: HIGH hoặc LOW).             bit resolution)
•  điều khiển thiết bị có 2     • Chuyển đổi giá trị điện áp đó
  trạng thái ON/OFF: LEDs,         thành một số nguyên nhờ bộ
  switches, v.v...                 chuyển đổi ADC (Analog-to-
                                   Digital Converter)
                                 • Dùng với cảm biến (sensor)
                                   như cảm biến ánh sáng, nhiệt
                                   độ, độ ẩm.

     Interfacing Sensors

Analog Sensors:
• Connect to analog pins (A0, A1-A5)
• Use analogRead(A#) to get sensor data

Digital Sensors:
• Connect to digital pins (D2, D3, etc.)
• Use digitalRead(pin#) to get sensor data

      Analog pins control

• analogRead(A#);
  //đọc giá trị analog
• Analog-Digital Converter (ADC): 0…1023  0…5V
• Ví dụ: Nếu cảm biến xuất ra 2.5V thì Arduino sẽ đọc là
  khoảng 512
       sensorValue = analogRead(A#);
       // Đọc giá trị từ cảm biến
       voltage = sensorValue * 5.0 / 1023.0;
       // Chuyển đổi giá trị cảm biến thành điện áp

     Serial Monitor

• UART                            • Ứng dụng phổ biến
 • Universal Asynchronous           • Debug lỗi chương trình
   Receiver/Transmitter             • Xem dữ liệu cảm biến (nhiệt
 • Giao tiếp giữa vi Arduino và       độ, độ ẩm, ánh sáng…)
   PC thông qua cổng nối tiếp       • Gửi lệnh từ máy tính (bật/tắt
   (serial port).                     LED, nhập số liệu,...)
                                    • Giao tiếp với các phần mềm
                                      khác như Python, MATLAB,
                                      Node-RED qua cổng COM

      Serial Monitor

• setup()
  • Serial.begin(9600);
    // Bắt đầu giao tiếp với tốc độ 9600 baud
• loop()
  • Serial.print("Text");
    hoặc Serial.println(variable);
    // Gửi dữ liệu ra Serial Monitor
  • Serial.read();
    hoặc Serial.available();
    // Đọc dữ liệu được gửi từ máy tính

       Practice 2: Photoresistor and Serial
       Monitor (no code)

• Practice 2a: Photoresistor  Serial Monitor
• Practice 2b: Analog Control
• Practice 2c: Analog Control Servo
• Arduino Datalogger - simple – Tinkercad

     Điều khiển servo motor

void setup() {
    servo.attach(servoPin);
}
void loop() {
    int reading = analogRead(A#);
    int angle = map(reading, 0, 1023, 0, 180);
    servo.write(angle);
}

           Kết nối truyền thống

https://voltiq.ru/lcd-1602-arduino-uno-connection/

LCD 1602 + I2C

      A4   SDA
      A5   SCL

SDA: Data
SCL: Control
               I2C là giao tiếp 2 dây:
               • SDA: dùng để gửi và nhận dữ liệu
               • SCL: dùng để đồng bộ hóa (điều phối
                 thời gian) cho việc truyền dữ liệu

                            D18   SDA
                            D19   SCL

Scan địa chỉ LCD

           • Example  Wire  i2c_scanner
           • Compile & Upload to Arduino
           • Ghi nhận address trên Serial Monitor

      Libraries

• Wire.h
  //default
• LiquidCrystal_I2C.h
  //old but stable
• LCDI2C_Multilingual.h
  //for Vietnamese
• LCD-I2C
  //new and nice

       LCD I2C basic controls

• lcd.init();
  hoặc lcd.begin();
  //Khởi tạo LCD trong void setup ()

• lcd.print(“Text”);
  //Gửi 1 chuỗi ký tự “Text” lên LCD
• lcd.clear();
  //Xóa màn hình
• lcd.setCursor(X, Y);
 //Con trỏ tới vị trí cần hiển thị vị trí X {0,16} dòng Y {0,1}

       Practice

• Practice 1: Hiển thị văn bản cơ bản sử dụng thư viện
  LiquidCrystal_I2C.h
  • Hello World
• Practice 2: Sử dụng thư viện LCDI2C_Multilingual
  Vietnamese
  • Xin chào lớp MSE##!

                       Hello Word!
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,16,2);

void setup()
{
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0,0);
    lcd.print("Dr Minh");
    lcd.setCursor(0,1);
    lcd.print("Xin chao cac ban");
}

void loop()
{
}

        Hiện ký tự từ Serial Monitor
void setup() {
  Serial.begin(9600); // Bắt đầu giao tiếp Serial với tốc độ 9600 baud
  Serial.println("Nhap mot ky tu:");
}

void loop() {
  // Kiểm tra nếu có dữ liệu được gửi đến
  if (Serial.available() > 0) {
    char c = Serial.read(); // Đọc một ký tự
    Serial.print("Ban da nhap: ");
    Serial.println(c);      // In ký tự đó ra lại
  }
}

       Serial control Arduino

if (Serial.available() > 0) {
   // Đọc dữ liệu từ serial
   int data = Serial.read();

  // Kiểm tra dữ liệu và điều khiển đèn LED tương ứng
  if (data == '1') {
    digitalWrite(ledPin1, HIGH); // Bật đèn LED 1
  } else if (data == '2') {
    digitalWrite(ledPin1, LOW); // Tắt đèn LED 1

Sensors and Devices

ADC: chuyển đổi Analog  Digital

Sensor / Actuator /
Control

• Outdoor camera
• 100K resistor
• Garden light
• Door alarm
• Moisture detector
• Internet
• Rain detector
• CPU
• Water valve
• Power supplies
• Relays

Practice 3 / Assgm 1: Nhiệt kế điện tử

                      • Mục tiêu:
                        • Hiển thị nhiệt độ từ cảm biến
                          LM35 trên màn hình LCD
                          1602.
                        • Điều khiển LED dựa trên nhiệt
                          độ đo được.
                      • Vout =10mV/oC
                      • Đèn / Còi báo hiệu khi nhiệt
                        độ >25oC
```

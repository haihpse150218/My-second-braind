---
slug: co-cau-doi-huong-chuyen-dong
title: Cơ cấu đổi hướng chuyển động cơ học
vault: iot
type: concept
branch: A
order: 6
status: learning
tags: [iot, phan-cung, actuator, co-khi, robot, nullpet]
prev: [co-cau-chap-hanh]
next: [dinh-luat-ohm]
related: [ham-map-va-servo, du-an-esp32-mcp, so-do-nguon-2s]
sources: ["D:/MSA-FPT/IOT/Actuators/co-cau-doi-huong-chuyen-dong.md"]
created: 2026-10-25
---

# Cơ cấu đổi hướng chuyển động cơ học

> Tóm tắt 1 câu: servo chỉ cho **chuyển động xoay quanh một trục**; muốn có tịnh tiến, lắc, đổi trục, co rút hay quay từng nấc thì phải đi qua một **cơ cấu cơ khí** — và mỗi tầng cơ cấu cộng thêm rơ, ma sát và điểm hỏng.

**Ngày tạo:** 2026-10-25
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #6 ← cần [[co-cau-chap-hanh]] · → kế tiếp [[dinh-luat-ohm]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #phan-cung #actuator #co-khi #robot #nullpet
**Bản gốc:** [co-cau-doi-huong-chuyen-dong.md](D:\MSA-FPT\IOT\Actuators\co-cau-doi-huong-chuyen-dong.md) · dùng cho dự án [[du-an-esp32-mcp]]

> 💡 **Liên hệ bài thực hành servo (2026-10-25):** SG90/MG90S là servo **vị trí** — có chốt chặn và biến trở đo góc bên trong, nên chỉ quay 0–180° rồi quay ngược lại, **không quay tròn mãi như cánh quạt được**. Muốn quay liên tục thì đổi linh kiện (servo 360° FS90R, motor DC + driver, stepper 28BYJ-48), còn muốn biến góc quay thành kiểu chuyển động khác thì dùng các cơ cấu bên dưới. Xem thêm [[ham-map-va-servo]].

> Tài liệu tham khảo cho phần actuator của NullPet (quadruped 8× MG90S, ESP32-S3).
> Viết theo góc nhìn kỹ sư cơ khí/robotics: mỗi cơ cấu gồm nguyên lý, ưu điểm, nhược điểm, case sử dụng thực tế và đánh giá khi áp vào NullPet.

---

## Mục lục

1. [Khái niệm nền](#1-khái-niệm-nền)
2. [Xoay → tịnh tiến](#2-xoay--tịnh-tiến)
3. [Xoay → lắc](#3-xoay--lắc)
4. [Xoay → xoay ở trục khác](#4-xoay--xoay-ở-trục-khác)
5. [Xoắn / kéo → co rút, bẻ góc](#5-xoắn--kéo--co-rút-bẻ-góc)
6. [Xoay liên tục → từng nấc](#6-xoay-liên-tục--từng-nấc)
7. [Tịnh tiến → xoay](#7-tịnh-tiến--xoay)
8. [Khuếch đại lực / đổi biên độ](#8-khuếch-đại-lực--đổi-biên-độ)
9. [Cơ cấu nâng cao cho robot chân](#9-cơ-cấu-nâng-cao-cho-robot-chân)
10. [Bảng so sánh nhanh](#10-bảng-so-sánh-nhanh)
11. [Chống sốc khi té và giảm rung](#11-chống-sốc-khi-té-và-giảm-rung)
12. [Khuyến nghị cho NullPet](#12-khuyến-nghị-cho-nullpet)

---

## 1. Khái niệm nền

Mọi cơ cấu truyền động đều là một phép đánh đổi. Năm khái niệm dưới đây quyết định chọn cơ cấu nào.

| Khái niệm | Ý nghĩa | Vì sao quan trọng |
|---|---|---|
| **Tỉ số truyền** | Tỉ lệ chuyển động ra / vào | Đổi tốc độ lấy lực (bảo toàn công suất, trừ ma sát) |
| **Rơ (backlash)** | Khe hở giữa các chi tiết ăn khớp | Gây lắc chân, sai vị trí, rung khi đổi chiều |
| **Tự hãm** | Đầu ra không quay ngược được đầu vào | Giữ vị trí khi ngắt điện, nhưng hiệu suất thấp |
| **Hiệu suất** | Phần công suất không mất vào ma sát | Ảnh hưởng thời lượng pin, nhiệt servo |
| **Back-drivability** | Có đẩy ngược được đầu ra bằng tay không | Quyết định khả năng chịu va đập và tương tác mềm |

**Quy tắc vàng:** mỗi tầng truyền động cộng thêm rơ, ma sát và điểm hỏng. Ít tầng hơn gần như luôn tốt hơn.

---

## 2. Xoay → tịnh tiến

### 2.1 Bánh răng – thanh răng (rack & pinion)

**Nguyên lý:** bánh răng quay ăn khớp với thanh răng thẳng. Quãng đường thanh răng đi = bán kính × góc quay (rad).

**Ưu điểm**
- Tỉ số tuyến tính, dễ tính toán và điều khiển
- Tốc độ cao, hành trình dài (chỉ giới hạn bởi chiều dài thanh răng)
- Back-drivable, hiệu suất cao (~90%+)

**Nhược điểm**
- Có rơ, càng rõ khi in 3D
- Không tự hãm: tải đè lên thì servo phải gồng liên tục
- Cần dẫn hướng cho thanh răng (ray, rãnh), không thì kẹt hoặc trượt răng

**Case sử dụng:** cơ cấu lái ô tô, máy CNC hành trình dài, cửa trượt tự động, ngăn kéo cơ giới.

**NullPet:** hợp cho cơ cấu phụ như ngăn kéo ở dock, cơ cấu rút đuôi. Không nên dùng cho chân vì rơ cộng dồn và cần ray dẫn nặng.

---

### 2.2 Vít me – đai ốc (lead screw / ball screw)

**Nguyên lý:** trục ren quay tại chỗ, đai ốc bị chặn xoay nên chạy dọc trục. Mỗi vòng quay đai ốc đi được một bước ren (lead).

**Ưu điểm**
- Khuếch đại lực rất lớn
- Chính xác cao, độ phân giải tốt
- Ren thang bước nhỏ thì **tự hãm**: ngắt điện vẫn giữ tải
- Ball screw: hiệu suất 90%+, gần như không rơ

**Nhược điểm**
- Chậm (cần quay nhiều vòng)
- Lead screw thường hiệu suất chỉ 30–50% do ma sát trượt
- Cần motor quay liên tục, không hợp với servo 180°
- Nhạy với bụi và lệch trục

**Case sử dụng:** máy in 3D (trục Z), kích nâng, actuator tuyến tính công nghiệp, bàn máy CNC.

**NullPet:** chỉ hợp nếu dùng motor DC hoặc stepper cho một cơ cấu nâng ở dock. Không dùng với MG90S.

---

### 2.3 Tay quay – con trượt (slider-crank)

**Nguyên lý:** tay quay xoay tròn, thanh truyền nối với con trượt chạy trên ray. Hành trình = 2 × bán kính tay quay.

**Ưu điểm**
- Đơn giản, bền, chịu tải tốt
- Chỉ cần khớp chốt, dễ chế tạo
- Motor quay một chiều liên tục vẫn ra chuyển động qua lại

**Nhược điểm**
- Tốc độ con trượt không đều (nhanh ở giữa, chậm ở hai đầu)
- Hành trình cố định theo hình học
- Có điểm chết ở hai đầu hành trình khi dùng ngược (piston đẩy)

**Case sử dụng:** động cơ đốt trong, máy nén khí, máy dập, máy cưa lọng.

**NullPet:** dùng được cho cơ cấu lặp lại như vẫy, gật đầu bằng motor nhỏ. Với servo, chỉ cần horn + thanh đẩy (xem 3.2) là đủ.

---

### 2.4 Scotch yoke

**Nguyên lý:** chốt trên tay quay trượt trong một rãnh thẳng đứng gắn với thanh ngang. Thanh ngang chạy qua lại theo hình sin thuần.

**Ưu điểm**
- Chuyển động hình sin hoàn hảo, dễ mô hình hóa
- Gọn hơn slider-crank (không cần thanh truyền dài)
- Lực đỉnh ở hai đầu hành trình tốt hơn

**Nhược điểm**
- Ma sát và mòn cao tại rãnh trượt
- Rơ ở rãnh gây tiếng kêu và rung
- Cần bôi trơn hoặc con lăn trong rãnh

**Case sử dụng:** van công nghiệp, máy rung, bàn lắc phòng thí nghiệm, một số động cơ hơi nước.

**NullPet:** hợp cho bộ tạo rung hoặc cử động "thở" của thân pet bằng motor nhỏ.

---

### 2.5 Cam – cần đẩy (cam & follower)

**Nguyên lý:** đĩa cam có biên dạng không tròn quay, cần đẩy tì lên mặt cam và chuyển động theo biên dạng đó.

**Ưu điểm**
- Quỹ đạo tùy ý: "lập trình bằng hình học"
- Có thể tạo dừng (dwell), tăng tốc, giảm tốc theo ý
- Một trục cam điều khiển được nhiều cần theo trình tự cố định

**Nhược điểm**
- Chỉ đẩy được một chiều, cần lò xo hoặc rãnh để giữ cần tì vào cam
- Mòn tại mặt tiếp xúc, cần con lăn để giảm ma sát
- Quỹ đạo cố định, muốn đổi phải thay cam

**Case sử dụng:** trục cam động cơ (mở xu-páp), automaton cơ, máy đóng gói, đồ chơi cơ học.

**NullPet:** rất đáng cân nhắc cho cử động biểu cảm (tai, mí mắt, đuôi). Một servo xoay một trục cam ra nhiều chuyển động có trình tự mà không tốn thêm servo.

---

### 2.6 Cam tang trống (barrel cam)

**Nguyên lý:** rãnh xoắn cắt trên bề mặt trụ. Trụ quay, chốt nằm trong rãnh chạy dọc theo trục.

**Ưu điểm**
- Chuyển động dọc trục, cơ cấu gọn theo phương ngang
- Rãnh giữ chốt cả hai chiều, không cần lò xo hồi
- Quỹ đạo tùy ý giống cam đĩa

**Nhược điểm**
- Khó chế tạo (in 3D được nhưng cần độ chính xác)
- Ma sát trong rãnh cao
- Khó thay đổi sau khi làm

**Case sử dụng:** máy may, máy dệt, cơ cấu đổi số xe máy (drum shifter), máy đóng gói tốc độ cao.

**NullPet:** hợp cho cơ cấu trong thân cần chuyển động thẳng theo trình tự, ví dụ đẩy chốt khóa dock.

---

### 2.7 Đai / cáp / dây cuốn quanh puly

**Nguyên lý:** đai hoặc cáp chạy vòng giữa hai puly. Một điểm trên đai chạy thẳng khi puly quay.

**Ưu điểm**
- Nhẹ, rẻ, hành trình dài
- Đai răng (GT2) không trượt, độ chính xác tốt
- Có thể đặt motor xa điểm tác động

**Nhược điểm**
- Cáp chỉ kéo được, không đẩy được
- Đai giãn theo thời gian, cần cơ cấu căng đai
- Đàn hồi nên có độ "nảy" khi tải thay đổi

**Case sử dụng:** máy in 3D (trục X/Y), máy vẽ (plotter), thang máy, cánh tay robot nhẹ.

**NullPet:** dùng cho cơ cấu trượt nhẹ ở dock. Với chân, đai có thể dùng để dời servo về thân nếu cần.

---

## 3. Xoay → lắc

### 3.1 Cơ cấu 4 khâu (four-bar linkage)

**Nguyên lý:** 4 thanh nối bằng 4 khớp chốt (1 thanh cố định). Tùy tỉ lệ chiều dài, tay quay có thể xoay đủ vòng trong khi khâu ra lắc qua lại (crank-rocker, theo điều kiện Grashof).

**Ưu điểm**
- Chỉ cần khớp chốt: dễ làm, ít rơ nếu chốt chặt
- Đổi tỉ số truyền và đổi góc tự do bằng cách chỉnh chiều dài thanh
- Tạo được quỹ đạo phức tạp tại điểm trên thanh truyền (coupler curve)

**Nhược điểm**
- Tỉ số truyền thay đổi theo góc (phi tuyến)
- Có thể có điểm chết hoặc cấu hình kẹt nếu thiết kế sai
- Cần tính toán hình học (nên mô phỏng trước khi in)

**Case sử dụng:** cần gạt nước, chân robot, cửa tủ bản lề, máy khâu, ghế ngả.

**NullPet:** đây là cơ cấu chủ lực cho chân. Đặt servo gần thân rồi dùng 4 khâu xuống gối giúp chân nhẹ, quán tính thấp, gait ổn định hơn.

---

### 3.2 Servo horn + thanh đẩy (pushrod linkage)

**Nguyên lý:** trường hợp riêng của 4 khâu: horn servo là tay quay, pushrod là thanh truyền, cần ra là khâu lắc.

**Ưu điểm**
- Đơn giản nhất, chuẩn trong mô hình RC
- Đổi tỉ số dễ: dời lỗ trên horn hoặc trên cần ra
- Dời điểm tác động ra xa servo

**Nhược điểm**
- Phi tuyến ở góc lớn
- Pushrod dài và mảnh có thể oằn khi đẩy
- Ball link rẻ thường có rơ

**Case sử dụng:** cánh lái máy bay RC, ga xe RC, khớp robot mini.

**NullPet:** dùng ngay được với MG90S. Chọn pushrod cứng (thép 2mm hoặc carbon) và khớp cầu tốt.

---

### 3.3 Cam – cần lắc (cam & rocker)

**Nguyên lý:** giống cam – cần đẩy nhưng cần ra quay quanh chốt thay vì chạy thẳng.

**Ưu điểm**
- Quỹ đạo lắc tùy ý
- Gọn hơn khi cần ra cần xoay

**Nhược điểm**
- Giống cam đẩy: cần lò xo giữ tiếp xúc, mòn mặt cam

**Case sử dụng:** cò mổ xu-páp, automaton, cơ cấu gõ.

**NullPet:** cho tai hoặc đuôi lắc theo nhịp, chạy chung trục cam với cử động khác.

---

## 4. Xoay → xoay ở trục khác

### 4.1 Bánh răng côn (bevel gear)

**Nguyên lý:** hai bánh răng hình nón ăn khớp, đổi trục quay thường 90°.

**Ưu điểm**
- Đổi trục gọn, hiệu suất cao (~95%)
- Có thể đổi tỉ số cùng lúc

**Nhược điểm**
- Cần căn chỉnh chính xác cả hai trục
- In 3D cho ra rơ đáng kể
- Lực dọc trục cần ổ đỡ

**Case sử dụng:** vi sai ô tô, máy khoan tay, cổ robot, hộp số góc.

**NullPet:** dùng khi cần đặt servo nằm ngang mà khớp quay dọc, ví dụ cổ xoay.

---

### 4.2 Trục vít – bánh vít (worm gear)

**Nguyên lý:** trục vít (dạng ren) ăn khớp với bánh vít, đổi trục 90°. Mỗi vòng trục vít đẩy bánh vít đi 1 răng (với vít 1 mối).

**Ưu điểm**
- Giảm tốc cực mạnh trong một tầng (10:1 đến 100:1)
- **Tự hãm:** bánh vít không quay ngược được trục vít
- Chạy êm

**Nhược điểm**
- Hiệu suất thấp (30–70%), sinh nhiệt
- Không back-drivable: va đập truyền thẳng vào răng, dễ gãy
- Mòn nhanh nếu vật liệu không phù hợp

**Case sử dụng:** khóa đàn guitar, tời, cổng tự động, cơ cấu nâng giữ tải.

**NullPet:** hợp cho khớp cần giữ tư thế lâu mà không tốn điện (đầu ngẩng). Tránh dùng cho chân vì chân chịu va đập liên tục.

---

### 4.3 Khớp các đăng (universal joint)

**Nguyên lý:** hai chạc nối qua một chữ thập, truyền xoay giữa hai trục lệch góc.

**Ưu điểm**
- Truyền xoay qua góc lệch thay đổi được
- Đơn giản, chịu mô-men tốt

**Nhược điểm**
- Một khớp đơn cho tốc độ ra **không đều** (dao động 2 lần mỗi vòng), càng lệch góc càng rõ
- Cần dùng cặp khớp đặt đúng pha để triệt tiêu
- Góc lệch tối đa giới hạn (~30–45°)

**Case sử dụng:** trục các đăng ô tô, trục lái, dụng cụ cầm tay nối dài.

**NullPet:** ít cần. Chỉ dùng nếu phải truyền xoay từ motor trong thân ra khớp không thẳng hàng.

---

### 4.4 Cáp Bowden

**Nguyên lý:** dây cáp chạy trong vỏ bọc chịu nén. Kéo một đầu thì đầu kia chuyển động, bất kể vỏ đi đường cong thế nào.

**Ưu điểm**
- Đặt actuator ở đâu cũng được, đi dây linh hoạt
- Giảm khối lượng ở khớp xa
- Rẻ, phụ tùng xe đạp có sẵn

**Nhược điểm**
- Ma sát lớn, tăng theo tổng góc uốn của vỏ
- Chỉ kéo một chiều (cần 2 cáp hoặc lò xo hồi)
- Có độ trễ và đàn hồi, điều khiển vị trí chính xác khó

**Case sử dụng:** phanh và đề xe đạp, exoskeleton, tay robot có actuator đặt ở cẳng tay.

**NullPet:** hợp cho đuôi hoặc tai khi không muốn đặt servo tại chỗ.

---

### 4.5 Bánh răng hành tinh (planetary gear)

**Nguyên lý:** bánh răng mặt trời ở giữa, các bánh hành tinh quay quanh, vành răng bên ngoài. Cố định một thành phần, hai thành phần còn lại là vào và ra.

**Ưu điểm**
- Giảm tốc lớn, đồng trục, rất gọn
- Tải chia đều cho nhiều hành tinh nên chịu mô-men cao
- Hiệu suất tốt (~95% mỗi tầng)

**Nhược điểm**
- Nhiều chi tiết, khó chế tạo chính xác
- Có rơ, in 3D thì rơ rõ
- Đắt hơn bánh răng thường

**Case sử dụng:** hộp số tự động, máy khoan pin, actuator robot (quasi-direct drive), hộp giảm tốc motor.

**NullPet:** là bên trong của nhiều servo. Nếu sau này nâng cấp lên BLDC + planetary thì chân sẽ back-drivable và chịu va đập tốt hơn hẳn.

---

## 5. Xoắn / kéo → co rút, bẻ góc

### 5.1 Twisted String Actuator (TSA)

**Nguyên lý:** motor xoắn 2 sợi dây song song. Dây xoắn lại thì chiều dài hiệu dụng ngắn đi, kéo tải. Độ co tỉ lệ phi tuyến với số vòng xoắn.

**Ưu điểm**
- Tỉ số truyền rất cao, không cần hộp số
- Cực nhẹ, rẻ (motor nhỏ + dây Dyneema)
- Đặt motor xa khớp, hoạt động giống cơ sinh học

**Nhược điểm**
- Chỉ kéo được, cần lò xo hoặc TSA đối kháng để hồi
- Phi tuyến, khó điều khiển chính xác
- Dây mòn và giãn theo thời gian
- Hành trình ngắn (khoảng 20–30% chiều dài dây)

**Case sử dụng:** tay robot nhẹ, exoskeleton, robot mềm, prosthetics.

**NullPet:** thú vị cho cử động gập như cụp tai, cuộn đuôi. Dùng N20 motor nhỏ thay vì servo.

---

### 5.2 Gân cáp (tendon-driven)

**Nguyên lý:** cáp chạy dọc theo các đốt, đi qua phía dưới tâm khớp. Kéo cáp thì cả chuỗi khớp gập. Lò xo hoặc dây đàn hồi phía trên kéo về.

**Ưu điểm**
- Một actuator điều khiển nhiều khớp
- Khớp xa rất nhẹ (actuator nằm ở gốc)
- Tự nhiên "ôm" theo vật thể (underactuated)

**Nhược điểm**
- Không điều khiển độc lập từng khớp
- Ma sát tại các điểm dẫn cáp
- Cáp giãn gây sai lệch vị trí

**Case sử dụng:** tay robot, ngón tay giả, đuôi robot, robot dạng rắn.

**NullPet:** rất hợp cho **đuôi**. Một servo kéo 2 cáp đối nhau là đuôi cong được cả hai phía.

---

### 5.3 Lò xo xoắn (torsion spring)

**Nguyên lý:** lò xo tích năng lượng khi bị xoắn và nhả ra thành chuyển động quay.

**Ưu điểm**
- Tích năng lượng chậm rồi nhả nhanh, cho công suất đỉnh vượt xa motor
- Tạo lực hồi vị không tốn điện
- Có thể bù trọng lực (gravity compensation)

**Nhược điểm**
- Cần cơ cấu khóa và nhả (latch)
- Lực thay đổi theo góc
- Mỏi lò xo theo thời gian

**Case sử dụng:** kẹp phơi đồ, bẫy chuột, robot nhảy, cửa tự đóng, bù trọng lực cho cánh tay.

**NullPet:** dùng để **bù trọng lực** ở khớp chân. Lò xo đỡ một phần trọng lượng thân thì servo đỡ tải hơn, ít nóng và ít rung khi đứng yên.

---

## 6. Xoay liên tục → từng nấc

### 6.1 Geneva drive

**Nguyên lý:** đĩa dẫn có chốt quay đều. Mỗi vòng chốt vào một rãnh của bánh Geneva và đẩy nó quay một bước (90° với 4 rãnh), sau đó bánh bị khóa đứng yên.

**Ưu điểm**
- Ra chuyển động từng bước có khóa vị trí giữa các bước
- Motor chạy liên tục, không cần điều khiển phức tạp

**Nhược điểm**
- Gia tốc giật ở đầu và cuối mỗi bước
- Số bước cố định theo số rãnh
- Cần chế tạo chính xác

**Case sử dụng:** máy chiếu phim cũ, đồng hồ cơ, bàn quay phân độ, máy đóng gói.

**NullPet:** dùng cho cơ cấu xoay theo nấc ở dock, ví dụ đĩa đổi phụ kiện.

---

### 6.2 Bánh cóc (ratchet & pawl)

**Nguyên lý:** bánh răng răng cưa và một con cóc tì vào. Bánh quay được một chiều, chiều ngược bị chặn.

**Ưu điểm**
- Chặn chiều ngược hoàn toàn, không tốn điện
- Đơn giản, bền

**Nhược điểm**
- Có tiếng kêu tách tách
- Độ phân giải giới hạn theo số răng
- Muốn quay ngược phải nhấc cóc ra

**Case sử dụng:** cờ lê cóc, tời, dây đai hàng, cơ cấu lên dây cót.

**NullPet:** dùng để giữ một tư thế bằng cơ khí (ví dụ khóa dock) mà không cần servo gồng.

---

## 7. Tịnh tiến → xoay

### 7.1 Piston – trục khuỷu

**Nguyên lý:** slider-crank chạy ngược: lực đẩy thẳng vào con trượt làm trục quay.

**Ưu điểm**
- Biến actuator tuyến tính (solenoid, xi lanh) thành quay

**Nhược điểm**
- Có 2 điểm chết, cần bánh đà hoặc nhiều piston lệch pha

**Case sử dụng:** động cơ đốt trong, máy hơi nước.

**NullPet:** hiếm khi cần.

---

### 7.2 Vít bước lớn (push drill / quick-lead screw)

**Nguyên lý:** ren bước rất dài. Đẩy đai ốc dọc trục thì trục bị buộc xoay.

**Ưu điểm**
- Biến nhấn thẳng thành xoay, đơn giản

**Nhược điểm**
- Ma sát cao, cần bước ren lớn mới không bị tự hãm

**Case sử dụng:** tua vít đẩy, con quay đồ chơi, bút bi bấm (dạng cam).

**NullPet:** có thể dùng cho nút bấm cơ trên dock kích hoạt xoay.

---

## 8. Khuếch đại lực / đổi biên độ

### 8.1 Đòn bẩy

**Nguyên lý:** thanh quay quanh điểm tựa. Tỉ lệ cánh tay đòn quyết định tỉ lệ lực và hành trình.

**Ưu điểm:** đơn giản nhất, không rơ nếu chốt tốt, dễ đổi tỉ số.
**Nhược điểm:** hành trình ra là cung tròn, không thẳng.
**Case sử dụng:** kìm, xà beng, bàn đạp, phanh tay.
**NullPet:** có mặt trong mọi khớp chân. Hiểu cánh tay đòn để chọn vị trí gắn pushrod.

---

### 8.2 Pantograph

**Nguyên lý:** hình bình hành khớp chốt. Điểm ra lặp lại quỹ đạo điểm vào với hệ số phóng to hoặc thu nhỏ cố định.

**Ưu điểm:** sao chép quỹ đạo chính xác, chỉ cần khớp chốt.
**Nhược điểm:** nhiều khớp nên rơ cộng dồn, cồng kềnh.
**Case sử dụng:** máy khắc sao chép, cần lấy điện tàu điện, chân robot dạng pantograph (giữ bàn chân song song mặt đất).
**NullPet:** chân pantograph giữ bàn chân luôn song song mặt đất, rất đáng cân nhắc.

---

### 8.3 Palăng (ròng rọc động)

**Nguyên lý:** ròng rọc động chia tải cho nhiều đoạn dây. Kéo dây 2 phần thì tải lên 1 phần, lực giảm một nửa.

**Ưu điểm:** khuếch đại lực bằng dây, nhẹ.
**Nhược điểm:** hành trình dây dài gấp bội, ma sát tại mỗi ròng rọc.
**Case sử dụng:** cần cẩu, buồm, cơ cấu nâng.
**NullPet:** kết hợp với tendon nếu servo thiếu lực.

---

### 8.4 Cơ cấu khuỷu (toggle linkage)

**Nguyên lý:** hai thanh nối khớp giữa. Khi gần thẳng hàng, một lực nhỏ đẩy khớp giữa tạo ra lực đầu ra rất lớn (về lý thuyết tiến tới vô cùng).

**Ưu điểm**
- Lực ra cực lớn ở cuối hành trình
- Khi thẳng hoặc hơi quá thẳng thì tự khóa, giữ tải không tốn lực

**Nhược điểm**
- Lực ra thay đổi rất mạnh theo vị trí
- Hành trình hữu ích ngắn

**Case sử dụng:** kẹp nhanh (toggle clamp), máy dập, càng đáp máy bay, đầu gối người khi đứng thẳng.

**NullPet:** **chân đứng gần thẳng** giúp servo gối gần như không chịu mô-men, ít nóng, ít rung khi đứng yên.

---

## 9. Cơ cấu nâng cao cho robot chân

### 9.1 Chân Jansen / Klann

**Nguyên lý:** liên kết nhiều thanh (Jansen 11 thanh, Klann 6 thanh). Một tay quay quay liên tục tạo quỹ đạo bàn chân hoàn chỉnh: chạm đất, đẩy ngang gần thẳng, nhấc lên, đưa về.

**Ưu điểm**
- Mỗi chân chỉ cần 1 actuator (hoặc nhiều chân chung 1 trục)
- Gait ổn định, không cần firmware phức tạp

**Nhược điểm**
- Chỉ đi được một kiểu gait cố định, khó rẽ, không biểu cảm
- Nhiều khớp, nặng, rơ cộng dồn

**Case sử dụng:** Strandbeest (Theo Jansen), robot đi bộ giáo dục.

**NullPet:** không hợp vì NullPet cần biểu cảm và nhiều pose. Tham khảo cho ý tưởng.

---

### 9.2 Watt / Chebyshev straight-line linkage

**Nguyên lý:** một điểm trên cơ cấu 4 khâu chạy gần như thẳng trong một đoạn.

**Ưu điểm:** chuyển động gần thẳng mà không cần ray trượt, chỉ dùng khớp chốt.
**Nhược điểm:** chỉ gần thẳng trong một đoạn giới hạn.
**Case sử dụng:** máy hơi nước Watt, hệ treo sau ô tô (Watt link), robot đi bộ.
**NullPet:** dùng nếu cần bàn chân đi ngang gần thẳng lúc đẩy đất.

---

### 9.3 Bánh răng quạt (sector gear)

**Nguyên lý:** bánh răng chỉ có một cung răng, dùng khi khớp quay giới hạn góc.

**Ưu điểm:** gọn, nhẹ hơn bánh răng tròn, hợp với servo 180°.
**Nhược điểm:** vẫn có rơ của bánh răng.
**Case sử dụng:** cơ cấu lái, khớp robot góc hẹp, đồng hồ đo.
**NullPet:** đổi tỉ số servo cho khớp chỉ cần quay khoảng 60–90°.

---

### 9.4 Harmonic drive / cycloidal drive

**Nguyên lý:** harmonic dùng vành răng đàn hồi biến dạng; cycloidal dùng đĩa biên dạng cycloid lăn trong vòng chốt. Cả hai giảm tốc rất mạnh trong một tầng.

**Ưu điểm:** tỉ số 30:1 đến 100:1+, gần như không rơ, gọn.
**Nhược điểm:** harmonic đắt; cycloidal in 3D được nhưng cần chính xác. Không back-drivable tốt ở tỉ số cao.
**Case sử dụng:** cánh tay robot công nghiệp, khớp robot hình người, rover.
**NullPet:** quá mức cho bản đầu. Hướng nâng cấp nếu chuyển sang BLDC.

---

### 9.5 Vi sai (differential)

**Nguyên lý:** hai đầu vào kết hợp ra hai bậc tự do. Cùng chiều thì ra chuyển động A, ngược chiều thì ra chuyển động B.

**Ưu điểm:** hai motor cùng gánh tải ở mọi chuyển động, tăng lực tổng; gọn cho khớp 2 bậc.
**Nhược điểm:** điều khiển phải trộn tín hiệu; cơ khí phức tạp hơn.
**Case sử dụng:** cổ tay robot, vi sai ô tô, khớp cổ robot.
**NullPet:** hợp cho **cổ** (gật + lắc) bằng 2 servo đặt trong thân.

---

### 9.6 Xích – đĩa xích

**Ưu điểm:** giống đai nhưng chịu lực lớn, không trượt.
**Nhược điểm:** nặng, ồn, cần bôi trơn.
**Case sử dụng:** xe đạp, xe máy, băng tải.
**NullPet:** không cần ở quy mô này.

---

### 9.7 Nêm (wedge)

**Nguyên lý:** đẩy nêm theo một phương làm vật đi theo phương vuông góc.
**Ưu điểm:** đơn giản, khuếch đại lực, có thể tự hãm.
**Nhược điểm:** ma sát lớn, hành trình nhỏ.
**Case sử dụng:** chêm cửa, cơ cấu kẹp, chốt khóa.
**NullPet:** dùng cho chốt khóa robot vào dock.

---

### 9.8 Lệch tâm (eccentric)

**Nguyên lý:** đĩa tròn quay quanh trục lệch tâm, biến thể gọn của tay quay.
**Ưu điểm:** rất gọn, chịu tải tốt.
**Nhược điểm:** hành trình nhỏ (= 2 × độ lệch tâm).
**Case sử dụng:** motor rung điện thoại, máy bơm, máy dập nhỏ.
**NullPet:** motor rung lệch tâm cho phản hồi xúc giác (pet "rung rừ rừ" khi được vuốt).

---

## 10. Bảng so sánh nhanh

| Cơ cấu | Rơ | Tự hãm | Hiệu suất | Chịu va đập | Độ khó in 3D | Hợp NullPet |
|---|---|---|---|---|---|---|
| Rack & pinion | Trung bình | Không | Cao | Trung bình | Dễ | Dock |
| Vít me | Thấp | Có | Thấp–TB | Kém | Trung bình | Dock |
| Slider-crank | Thấp | Không | Cao | Tốt | Dễ | Phụ |
| Scotch yoke | Trung bình | Không | Trung bình | Trung bình | Dễ | Rung, thở |
| Cam | Thấp | Tùy | Trung bình | Trung bình | Dễ | **Biểu cảm** |
| 4 khâu / pushrod | **Thấp** | Không | Cao | **Tốt** | **Dễ** | **Chân** |
| Bánh răng côn | Trung bình | Không | Cao | Trung bình | Trung bình | Cổ |
| Trục vít | Thấp | **Có** | Thấp | **Kém** | Trung bình | Giữ đầu |
| Các đăng | Thấp | Không | Cao | Tốt | Trung bình | Ít dùng |
| Bowden | Trung bình | Không | Thấp | Tốt | Dễ | Đuôi, tai |
| Hành tinh | Trung bình | Không | Cao | Tốt | Khó | Nâng cấp |
| TSA | Thấp | Không | Trung bình | Tốt | Dễ | Tai, đuôi |
| Tendon | Trung bình | Không | Trung bình | **Tốt** | Dễ | **Đuôi** |
| Lò xo xoắn | — | — | — | Tốt | Dễ | **Bù trọng lực** |
| Geneva | Thấp | Có (giữa bước) | Cao | Trung bình | Trung bình | Dock |
| Bánh cóc | Thấp | Có (1 chiều) | Cao | Tốt | Dễ | Khóa |
| Pantograph | Trung bình | Không | Cao | Trung bình | Dễ | Chân |
| Toggle | Thấp | Có (gần thẳng) | Cao | Tốt | Dễ | **Đứng** |
| Vi sai | Trung bình | Không | Cao | Tốt | Khó | **Cổ** |

---

## 11. Chống sốc khi té và giảm rung

### 11.1 Bảo vệ servo khi va đập (ưu tiên số 1)

- **Servo saver / ly hợp trượt** giữa horn và chân. Khi va đập, khớp trượt thay vì truyền lực vào bánh răng. MG90S hỏng chủ yếu do tuốt răng lúc té.
- **Thả lỏng servo khi rơi:** gắn IMU (MPU6050 hoặc ICM-42688, có ngắt free-fall). Phát hiện rơi thì `detach()` toàn bộ servo để robot "ngã mềm" thay vì gồng cứng chịu lực.
- **Khâu mềm có chủ đích:** in một số linkage bằng TPU hoặc infill thấp để hấp thụ năng lượng.

### 11.2 Cơ khí

- **Bàn chân đệm:** TPU infill thấp, cao su hoặc sorbothane. Giảm sốc khi đặt chân và tăng bám.
- **Chân nhẹ:** servo trong thân, truyền bằng pushrod. Quán tính chân thấp thì ít rung và ít va đập.
- **Trọng tâm thấp:** pin đặt thấp và ở giữa.
- **Vỏ / bumper TPU, bo góc:** khi lật, lực rơi vào vỏ.
- **Gắn mạch bằng đệm cao su:** ESP32, OLED, pin bắt qua grommet hoặc foam. Không đệm cao su cho servo chân vì chân sẽ lắc.

### 11.3 Điện

- **Tụ 470–1000µF** trên rail servo, đặt gần servo. Chống sụt áp gây giật servo và brownout reset ESP32.
- **Buck đủ dòng (≥ 5A).** Thiếu dòng là servo jitter ngay.
- **Connector có khóa (JST)** và strain relief cho dây.
- **Cố định pin chắc chắn.**

### 11.4 Firmware

- **Easing / nội suy góc:** không set góc nhảy thẳng; dùng ramp hoặc ease-in-out.
- **Giảm tốc độ** ở pose chuyển tiếp.
- **Gait tĩnh:** luôn ≥ 3 chân chạm đất, bước thấp.
- **Deadband:** chỉ gửi lệnh khi góc mới lệch đủ lớn.
- **Detach khi đứng yên lâu:** hết rung giữ, đỡ nóng, đỡ hao pin (kết hợp toggle + lò xo bù trọng lực để không sụp).

### 11.5 Thứ tự làm

1. Tụ + nguồn đủ dòng
2. Easing trong firmware
3. Bàn chân TPU
4. IMU free-fall → detach
5. Servo saver (sau khi khung chân đã chốt)

Bốn bước đầu rẻ và giải quyết khoảng 80% vấn đề.

---

## 12. Khuyến nghị cho NullPet

| Bộ phận | Cơ cấu đề xuất | Lý do |
|---|---|---|
| Chân (2-DOF × 4) | Servo trong thân + 4 khâu / pushrod xuống gối | Ít rơ, chân nhẹ, dễ in |
| Bàn chân | Pantograph (tùy chọn) + đệm TPU | Bàn chân song song mặt đất, giảm sốc |
| Tư thế đứng | Toggle (gối gần thẳng) + lò xo bù trọng lực | Servo ít tải, ít nóng, ít rung |
| Cổ | Vi sai 2 servo hoặc bánh răng côn | Gật + lắc, servo nằm trong thân |
| Đuôi | Tendon 2 cáp đối kháng, 1 servo | Nhẹ, cong hai phía, biểu cảm |
| Tai / mí mắt | Trục cam từ 1 servo | Nhiều cử động, ít actuator |
| Rung "rừ rừ" | Motor lệch tâm | Phản hồi xúc giác rẻ |
| Khóa vào dock | Nêm hoặc bánh cóc | Giữ cơ khí, không tốn điện |

**Tránh:** trục vít cho chân (không chịu va đập), rack in 3D cho chân (rơ), chuỗi nhiều tầng bánh răng in 3D.

---

*Tài liệu tổng hợp phục vụ thiết kế actuator NullPet. Thân robot dựa trên Sesame (Dorian Todd).*

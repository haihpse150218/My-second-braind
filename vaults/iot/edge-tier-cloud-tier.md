---
slug: edge-tier-cloud-tier
title: Edge Tier và Cloud Tier — đặt việc gì ở đâu
vault: iot
type: concept
branch: H
order: 2
status: learning
tags: [iot, kien-truc, textbook, edge, cloud]
prev: [dinh-nghia-he-thong-iot]
next: [cda-gda]
related: [bon-thanh-phan-iot, nhiet-ke-lm35]
sources: ["Programming the Internet of Things — Andy King, ch. 1 Architecting a Solution"]
created: 2026-10-24
---

# Edge Tier và Cloud Tier — đặt việc gì ở đâu

> Tóm tắt 1 câu: hệ IoT chia ít nhất **hai tầng** — *Edge* phải đứng cạnh thứ cần đo, *Cloud* có thể ở bất cứ đâu — và **5 nhóm hành động được cố ý đặt trùng ở cả hai tầng**, để quyết định khẩn cấp xảy ra tại chỗ, không phải đi vòng qua Internet.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #2 ← cần [[dinh-nghia-he-thong-iot]] · → kế tiếp [[cda-gda]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #kien-truc #textbook #edge #cloud

---

## 💡 Ý chính

| Tầng | Gồm | Ở đâu | Nhóm hành động |
|---|---|---|---|
| **Edge Tier** | thiết bị ràng buộc (cảm biến/actuator) + thiết bị gateway | **cùng chỗ** với hệ thống vật lý | data collection · data management · device triggers · configuration management · analytics |
| **Cloud Tier** | dịch vụ cloud | bất cứ đâu | data management · configuration management · analytics |

Chỉ **data collection** là độc quyền của Edge — cloud không cảm biến, không chấp hành. Ba nhóm còn lại **trùng ở hai tầng**, và textbook nói thẳng: trùng lặp ở đây là **lợi thế**, không phải lỗi thiết kế.

Ví dụ của sách: nhà 30 °C → Edge **bật điều hoà ngay**, hạ về 22 °C, không chờ cloud. Cloud chỉ được *thông báo* và lưu lịch sử để phân tích sau.

## 🧩 Trực giác

Edge là **phản xạ tuỷ sống**, Cloud là **vỏ não**. Tay chạm lửa thì rụt lại trước khi não kịp nghĩ; não sau đó ghi nhớ và lên kế hoạch tránh. Ranh giới giữa hai thứ ngày càng mờ vì chip ở edge ngày càng mạnh — xu hướng là **đẩy tính toán càng gần edge càng tốt**.

Trong [[bon-thanh-phan-iot]], khối "xử lý dữ liệu" không ghi rõ nằm đâu — chính là vì nó nằm ở **cả hai** tầng.

## ⚙️ Khi nào đặt ở Edge, khi nào ở Cloud

| Đặt ở Edge khi | Đặt ở Cloud khi |
|---|---|
| cần **độ trễ thấp** (an toàn, điều khiển) | cần **gom nhiều thiết bị** để so sánh |
| mất mạng vẫn phải hoạt động | cần lưu trữ dài hạn, scale "vô hạn" |
| dữ liệu nhạy cảm không muốn rời nhà | cần tính toán nặng (ML, trend nhiều tháng) |
| quy tắc đơn giản `if (T > ngưỡng)` | cần người dùng xem và chỉnh từ xa |

Bài [[nhiet-ke-lm35]] là **Edge thuần**: ngưỡng 25 °C nằm trên Arduino. Nếu muốn đổi ngưỡng từ điện thoại hay xem biểu đồ tuần, phải thêm tầng trên.

## ⚠️ Điều dễ nhầm

- Nghĩ "IoT = đẩy hết lên cloud". Sách khuyên ngược lại: cái gì quyết định được tại chỗ thì làm tại chỗ, cloud là nơi *ghi nhận và phân tích*.
- Để Edge **lộ ra Internet**: thiết bị ràng buộc không nên nói chuyện thẳng với cloud; mọi thứ đi qua gateway ([[cda-gda]]) — vừa bảo mật vừa gom luồng.
- Hai tầng cùng có *configuration management* nghĩa là ngưỡng có thể **lệch nhau** nếu không đồng bộ — phải định nghĩa bên nào là nguồn sự thật.

---

## 🔗 Liên kết
- **Tiền đề:** [[dinh-nghia-he-thong-iot]]
- **Dẫn tới:** [[cda-gda]] — hai ứng dụng tạo nên Edge Tier
- **Liên quan:** [[bon-thanh-phan-iot]] · [[nhiet-ke-lm35]]

## ❓ Câu hỏi mở
- Nếu "cloud" của mình chỉ là một LLM chạy trên laptop qua MCP ([[du-an-esp32-mcp]]) thì nó là Cloud Tier hay vẫn là Edge? Theo định nghĩa vị trí, nó là Edge; theo vai trò (analytics, không chạm cảm biến), nó giống Cloud.

## 📚 Nguồn
- Andy King, *Programming the Internet of Things*, ch. 1 §*Architecting a Solution* (tr. 7–9), hình 1-2, 1-3

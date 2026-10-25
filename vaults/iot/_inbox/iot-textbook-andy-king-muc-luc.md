---
slug: iot-textbook-andy-king-muc-luc
title: "Textbook — Programming the Internet of Things (Andy King, O'Reilly 2021) — mục lục"
vault: iot
type: inbox
status: todo
tags: [iot, chua-chung-cat]
sources: ["IAD_programming-the-internet-of-things-an-introduction-to-building-integrated-device-to-cloud-iot-solutions-1nbsped-1492081418-9781492081418.pdf"]
created: 2026-10-24
---

# Textbook — Programming the Internet of Things (Andy King, O'Reilly 2021) — mục lục

**Nguồn gốc:** `D:\MSA-FPT\IOT\material\IAD_programming-the-internet-of-things-an-introduction-to-building-integrated-device-to-cloud-iot-solutions-1nbsped-1492081418-9781492081418.pdf`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Dự kiến tách:** 12 chương · CDA/GDA · MQTT · CoAP · cloud (Ubidots, AWS IoT Core) · 3 use case

> ⚠️ **Note thô** — text trích bằng `pdftotext -layout` từ PDF gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---

> 📘 Sách 420 trang, giáo trình chính của môn. Đây **chỉ là mục lục** để biết sách có gì; nội dung chương sẽ trích dần khi học tới (nhánh G, H).
> Text toàn bộ sách đã trích sẵn, 847 nghìn ký tự — grep được khi cần: `pdftotext -layout <pdf> -`.

## Cấu trúc sách — 4 phần, 12 chương

| Phần | Chương | Dùng cho nhánh |
|---|---|---|
| I · Getting Started | 1 Getting Started · 2 Initial Edge Tier Applications | H |
| II · Connecting to the Physical World | 3 Data Simulation · 4 Data Emulation (Sense HAT) · 5 Data Management | H · E |
| III · Connecting to Other Things | 6 MQTT Python · 7 MQTT Java · 8 CoAP Server · 9 CoAP Client · 10 Edge Integration (TLS, DTLS) | G |
| IV · Connecting to the Cloud | 11 Cloud Services (Ubidots, AWS IoT Core) · 12 Taming the IoT (3 use case) | G · H |

**Hai ứng dụng xuyên suốt sách:** CDA — *Constrained Device App* (Python, chạy trên thiết bị ràng buộc / Raspberry Pi) và GDA — *Gateway Device App* (Java, chạy trên gateway). Mọi chương đều thêm tính năng vào 2 app này.

```text
Table of Contents

Foreword. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ix

Preface. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xi

Part I.          Getting Started
  1. Getting Started. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
        What You’ll Learn in This Chapter                                                                                                          3
        Defining Your System                                                                                                                       4
          Breaking Down the Problem                                                                                                                4
          Defining Relevant Outcomes                                                                                                               5
          Architecting a Solution                                                                                                                  7
        Setting Up Your Development and Test Environment                                                                                          11
          Step I: Prepare Your Development Environment                                                                                            14
          Step II: Define Your Testing Strategy                                                                                                   29
          Step III: Manage Your Design and Development Workflow                                                                                   34
          Thoughts on Automation                                                                                                                  40
        Programming Exercises                                                                                                                     43
          Testing the Constrained Device App                                                                                                      46
          Testing the Gateway Device App                                                                                                          47
        Conclusion                                                                                                                                47

  2. Initial Edge Tier Applications. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
        What You’ll Learn in This Chapter                                                                                                         49
        Design Concepts                                                                                                                           50
        Tracking Your Requirements                                                                                                                51
        Programming Exercises                                                                                                                     52

                                                                                                                                                    iii

             Add System Performance Tasks to the Constrained Device Application                                                            54
             Add System Performance Tasks to the Gateway Device Application                                                                63
            Additional Exercises                                                                                                           72
            Conclusion                                                                                                                     72

Part II. Connecting to the Physical World
     3. Data Simulation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 77
            What You’ll Learn in This Chapter                                                                                              77
            Simulating Sensors and Actuators                                                                                               78
              Generating Simulated Data Using a Sensor Data Generator Class                                                                78
            Programming Exercises                                                                                                          81
              Integrating Sensing and Actuation Simulation Within Your Application
                Design                                                                                                                    82
              Representing Sensor and Actuator Data Within the Application                                                                83
              Create Data Containers to Support Data Collection and Actuation                                                             84
              Simulating Sensors                                                                                                          89
              Simulating Actuators                                                                                                        93
              Connecting Simulated Sensors with the Sensor Adapter Manager                                                               100
              Connecting Simulated Actuators with the Actuator Adapter Manager                                                           108
              Create and Integrate the Device Data Manager                                                                               111
            Additional Exercises                                                                                                         119
              Hysteresis Management                                                                                                      119
            Conclusion                                                                                                                   119

     4. Data Emulation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 121
            What You’ll Learn in This Chapter                                                                                            121
            Emulating Sensors and Actuators                                                                                              122
              Setting Up and Configuring an Emulator                                                                                     123
              The Sense-Emu Sense HAT Emulator                                                                                           123
            Programming Exercises                                                                                                        124
              Integrating Sensing and Actuation Emulation Within Your Application
                Design                                                                                                                   125
              Emulating Sensors                                                                                                          126
              Emulating Actuators                                                                                                        128
              Connecting Emulated Sensors with the Sensor Adapter Manager                                                                131
              Connecting Emulated Actuators with the Actuator Adapter Manager                                                            134
            Additional Exercises                                                                                                         137
              Threshold Management                                                                                                       137
            Conclusion                                                                                                                   137

iv      |    Table of Contents

 5. Data Management. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
     What You’ll Learn in This Chapter                                                                                        139
     Data Translation and Management Concepts                                                                                 139
     Programming Exercises                                                                                                    140
       Data Translation in the Constrained Device App                                                                         142
       Data Translation in the Gateway Device App                                                                             146
     Additional Exercises                                                                                                     159
       Proactive Disk Utilization Management                                                                                  159
     Conclusion                                                                                                               160

Part III.       Connecting to Other Things
 6. MQTT Integration–Overview and Python Client. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 169
     What You’ll Learn in This Chapter                                                                                        170
     About MQTT                                                                                                               170
       Connecting to a Broker                                                                                                 171
       Message Passing                                                                                                        172
       Control Packets and the Structure of an MQTT Message                                                                   174
     Adding MQTT to Your Applications                                                                                         177
       Installing and Configuring an MQTT Broker                                                                              179
     Programming Exercises                                                                                                    179
       Create the MQTT Connector Abstraction Module                                                                           182
       Add Callbacks to Support MQTT Events                                                                                   191
       Add Publish, Subscribe, and Unsubscribe Functionality                                                                  192
       Integrate the MQTT Connector into Your CDA                                                                             197
       What About Security?                                                                                                   199
     Additional Exercises                                                                                                     199
     Conclusion                                                                                                               200

 7. MQTT Integration–Java Client. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
     What You’ll Learn in This Chapter                                                                                        201
     Programming Exercises                                                                                                    202
       Create the MQTT Connector Abstraction Module                                                                           203
       Add Callbacks to Support MQTT Events                                                                                   207
       Add Publish, Subscribe, and Unsubscribe Functionality                                                                  209
       Integrate the MQTT Connector into Your GDA                                                                             213
       What About Security and Overall System Performance?                                                                    218
     Additional Exercises                                                                                                     218
       Subscriber Callbacks                                                                                                   218
       CDA to GDA Integration                                                                                                 218
     Conclusion                                                                                                               218

                                                                                                        Table of Contents     |   v

     8. CoAP Server Implementation. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 221
            What You’ll Learn in This Chapter                                                                                      222
            About CoAP                                                                                                             222
              Client to Server Connections                                                                                         222
              Request Methods                                                                                                      223
              Message Passing                                                                                                      224
              Datagram Packets and the Structure of a CoAP Message                                                                 228
              Putting It All Together                                                                                              229
            Programming Exercises                                                                                                  234
              Add CoAP Server Functionality to the Gateway Device Application                                                      236
              Add CoAP Server Functionality to the Constrained Device Application
                (Optional)                                                                                                         250
            Additional Exercises                                                                                                   253
              Add More Resource Handlers                                                                                           253
              Add a Custom Discovery Service                                                                                       253
              Add Dynamic Resource Creation                                                                                        254
            Conclusion                                                                                                             254

     9. CoAP Client Integration. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 255
            What You’ll Learn in This Chapter                                                                                      255
            Concepts                                                                                                               256
            Programming Exercises                                                                                                  259
              Add CoAP Client Functionality to the Constrained Device Application                                                  260
              Add CoAP Client Functionality to the Gateway Device App (Optional)                                                   278
            Additional Exercises                                                                                                   279
              Add a Robust OBSERVE Cancel Feature                                                                                  279
              Add Support for DELETE and POST                                                                                      280
            Conclusion                                                                                                             280

10. Edge Integration. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 281
            What You’ll Learn in This Chapter                                                                                      281
            Concepts                                                                                                               282
            Security Exercises                                                                                                     283
              Adding TLS Support to Your MQTT Broker                                                                               283
              Add Security Features to Your Gateway Device App MQTT Client
                Connector                                                                                                          283
              Add Security Features to Your Constrained Device App MQTT Client
                Connector                                                                                                          289
            Functional Exercises                                                                                                   292
              Adding Business Logic to the Gateway Device App                                                                      292
              Adding Business Logic to the Constrained Device App                                                                  295
            Performance Testing Exercises                                                                                          296

vi      |    Table of Contents

        Additional Exercises                                                                                                                      298
         Add DTLS Support to Your CoAP Client and Server                                                                                          299
        Conclusion                                                                                                                                299

Part IV.           Connecting to the Cloud
11. Integrating with Various Cloud Services. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 303
        What You’ll Learn in This Chapter                                                                                                         304
        Concepts                                                                                                                                  304
        Programming Exercises                                                                                                                     307
          Add the Cloud Client and Other Related Components                                                                                       307
        Integrating with an IoT Cloud Service Provider (CSP)                                                                                      315
          Ubidots Connectivity Overview Using MQTT                                                                                                316
          AWS IoT Core Connectivity Overview Using MQTT                                                                                           322
        Additional Exercises                                                                                                                      336
          Analyzing and Acting on Time-Series Performance Data                                                                                    336
        Conclusion                                                                                                                                337

12. Taming the IoT. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 339
        What You’ll Learn in This Chapter                                    339
          IoT Ecosystem Enablers                                             339
        Sample IoT Use Cases                                                 342
          Shared Enablers and a Common Notional Design                       343
          Use Case 1: Home Environment Monitoring and Temperature Adjustment 345
          Use Case 2: Garden Monitoring and Water Adjustment                 347
          Use Case 3: Pond Quality Monitoring                                348
        Conclusion                                                           350

Appendix. Design Road Maps. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 351

Bibliography. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 371

Index. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 375

                                                                                                                     Table of Contents        |    vii
```

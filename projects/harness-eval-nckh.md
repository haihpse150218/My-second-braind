---
slug: harness-eval-nckh
title: HarnessEval — Đề tài luận văn Coding Agent Harness & Evaluation
type: project
domain: nckh
status: doing
period: 2026-04 → nay
stack: [python, docker, ollama, swe-agent, swe-bench, anova]
repo_path: "D:\\MSA-FPT\\Methods of Learnning and scientific research\\NCKK-Docs\\de-tai\\harness-eval"
artifacts: [HUONG-DAN-CHAY.md, docs/metrics-anova-explained.md, DE-CUONG-HarnessEval-v2.md]
tags: [nckh, luan-van, coding-agent, benchmark]
related: [nckh/a1-2026-bui-opendev, nckh/a2-2026-lou-autoharness, nckh/gap-analysis]
created: 2026-08-09
---

# 📦 HarnessEval — Đề tài luận văn *Coding Agent Harness & Evaluation*

> Đo xem **harness** (lớp điều phối quanh LLM: tool dispatch, quản lý context, cơ chế an toàn) ảnh hưởng bao nhiêu tới năng lực của coding agent — **tách biệt khỏi ảnh hưởng của model**.

**Môn:** Phương pháp NCKH · **Loại:** Đề tài luận văn (đang làm) · **Thời gian:** 2026-04 → nay
**Thư mục gốc:** `D:\MSA-FPT\Methods of Learnning and scientific research\NCKK-Docs\de-tai\harness-eval`
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Vấn đề

Benchmark hiện nay (SWE-Bench…) đo **cả cụm agent = model + harness** rồi quy hết công/tội cho model. Không ai tách riêng phần đóng góp của harness. Khoảng trống này ghi chi tiết trong [[nckh/gap-analysis]].

## 🛠️ Cách làm

- Kho paper nền: **49 note tóm tắt**, nhóm A–I + S → vault [[nckh/SECOND_BRAIN_NCKH|nckh]]
- Chạy thực nghiệm trên **SWE-agent + SWE-bench**, chạy trong Docker
- Dùng **Ollama** (qwen2.5:1.5b) để lặp thí nghiệm miễn phí trước khi đốt tiền vào model lớn
- Phân tích thống kê bằng **ANOVA** (`docs/metrics-anova-explained.md`) — để khẳng định chênh lệch là thật, không phải may rủi

## 📊 Trạng thái

| Hạng mục | Tình trạng |
|---|---|
| Khảo sát tài liệu (49 paper) | ✅ xong |
| Phân tích khoảng trống | ✅ [[nckh/gap-analysis]] |
| Đề cương (v2) | ✅ `de-cuong/DE-CUONG-HarnessEval-v2.md` (+ `.tex`/`.pdf`) |
| Phản biện thử | ✅ `thao-luan/THAO-LUAN*.md` — 10 câu hỏi khó nhất của hội đồng |
| Pipeline code | 🟡 chạy được với Ollama, đang mở rộng |
| Thực nghiệm chính thức | ⬜ chưa |

## 💡 Bài học

- **Đọc paper phải có khung cố định thì mới so được với nhau.** 49 note dùng chung khung 10 mục; mục 10 *"Liên quan đến đề tài"* là mục quyết định — nó biến việc đọc paper từ tiêu thụ thành sàng lọc.
- Tự viết phần phản biện (`THAO-LUAN*.md`) trước khi bảo vệ: lôi ra 10 câu hỏi khó nhất và tự trả lời — rẻ hơn nhiều so với bị hỏi thật.
- Dùng model nhỏ chạy local để debug pipeline trước, chỉ đổi sang model lớn khi pipeline đã đúng.

## 🔗 Khái niệm đã dùng

- [[nckh/a1-2026-bui-opendev]] — kiến trúc tham chiếu: phân biệt *scaffolding* vs *harness*
- [[nckh/a2-2026-lou-autoharness]] — tự động sinh harness
- [[nckh/gap-analysis]] — khoảng trống nghiên cứu, gap xếp hạng
- [[ml/kiem-dinh-gia-thuyet]] · [[ml/p-value]] — nền của ANOVA

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Đề cương | `…\de-tai\de-cuong\DE-CUONG-HarnessEval-v2.md` (+ `.tex` → `.pdf`) |
| Phản biện | `…\de-tai\thao-luan\THAO-LUAN*.md` |
| Hướng dẫn chạy | `…\harness-eval\HUONG-DAN-CHAY.md` |
| Giải thích chỉ số | `…\harness-eval\docs\metrics-anova-explained.md` |
| Kế hoạch | `…\Methods of Learnning...\plans\Plan-Coding-HarnessEval.md` |
| 49 PDF gốc | `…\de-tai\papers` |

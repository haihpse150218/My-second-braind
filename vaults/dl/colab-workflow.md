---
slug: colab-workflow
title: "Colab workflow — validate rẻ trước, trả tiền sau"
vault: dl
type: concept
branch: G
order: 15
status: done
tags: [dl, thuc-chien, colab]
prev: [ragas]
created: 2026-08-02
---

# Colab workflow — validate rẻ trước, trả tiền sau

> Tóm tắt 1 câu: Chạy thử 1 epoch trên GPU free để bắt lỗi kỹ thuật, qua hết mới thuê Pro chạy hàng loạt.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #15 ← cần [[ragas]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #thuc-chien #colab

---

## 💡 3 bước

- **B1**: Code sẵn **nhiều cấu hình**, chưa chạy full
- **B2**: Chạy thử **1 epoch mỗi cấu hình** trên **GPU free (T4)** — đúng không? OOM không?
- **B3**: Qua hết B2 → **thuê Pro**, bấm chạy hàng loạt

## ⚙️ 5 điều kiện để B3 chạy mà không phải ngồi canh

1. **Config-driven** — list dict + `for` loop, đừng sửa tay từng lần
2. **Checkpoint ra Google Drive** — lưu `/content` là **mất sạch** khi runtime ngắt
3. **Log CSV ra Drive sau mỗi config** — crash vẫn còn kết quả đã chạy
4. **Resume được** — có checkpoint thì load, không thì train từ đầu
5. **Set seed cố định** — so sánh mới công bằng

## 🧩 1 epoch trên free verify được gì

| ✅ Được | ❌ Không được |
|---|---|
| Shape · pipeline · **OOM** · loss có giảm | Model có **hội tụ** không · accuracy cuối · thời gian thật trên GPU khác |

## ⚠️ Gotcha Colab

- `!nvidia-smi` **đầu tiên** — free có lúc không cấp GPU
- Free bị **preempt** bất kỳ lúc nào + idle timeout ~90 phút
- Pro đáng tiền nhất ở **background execution**
- A100 **đốt compute unit nhanh** → đừng mặc định chọn mạnh nhất
- Dataset trên Drive **đọc chậm** → copy về `/content` rồi mới train

## 📦 Trước khi nộp

- **Fresh-run: `Restart & Run All`** — notebook phải chạy sạch từ đầu
- Seed cố định → người chấm chạy lại ra số gần giống
- Mọi con số trong báo cáo **trích từ output thật**, không gõ tay
- Ghi rõ **giới hạn** đã biết (test dễ hơn val · nhiễu run-to-run · chỉ 1 seed)
- Xuất PDF qua VS Code / Chromium (đừng LaTeX) để render được ảnh & Mermaid

---

## 🔗 Liên kết
- **Tiền đề:** [[ragas]] · [[callbacks-keras]]
- **Liên quan tới:** [[hai-chot-dung-train]]

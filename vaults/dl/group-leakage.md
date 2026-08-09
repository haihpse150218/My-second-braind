---
slug: group-leakage
title: Group leakage
vault: dl
type: concept
branch: G
order: 4
status: done
tags: [dl, leakage, data]
prev: [chong-ro-ri-du-lieu]
next: [hai-chot-dung-train]
created: 2026-08-02
---

# Group leakage

> Tóm tắt 1 câu: Cùng **một đối tượng / một người / một phiên chụp** xuất hiện ở **cả train lẫn test** → accuracy cao giả, model chỉ đang nhận ra *"đã thấy cái này rồi"*.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #4 ← cần [[chong-ro-ri-du-lieu]] · → kế tiếp [[hai-chot-dung-train]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #leakage #data

---

## 💡 Ý chính

Đây là **đặc thù ảnh/chuỗi**, checklist ML bảng thường không có.

Model không học "đặc điểm của lớp" mà học "khuôn mặt cụ thể này / cái bàn cụ thể này". Trên test nó **nhận ra vật quen** chứ không **phân loại**.

## 🧩 Hay gặp ở đâu

| Tình huống | Nhóm đúng là gì |
|---|---|
| Dataset ảnh cào web (nhiều ảnh cùng 1 sản phẩm) | **sản phẩm** |
| Ảnh y tế nhiều lát cắt / 1 bệnh nhân | **bệnh nhân** |
| **ViIC: 1 ảnh có nhiều caption** | **ẢNH**, không phải caption |
| Nhiều biến thể diễn đạt của cùng 1 câu hỏi | **câu hỏi gốc** |
| Video cắt thành frame | **video** |

## ⚙️ Cách chặn

Dùng **`GroupKFold` / `GroupShuffleSplit`** với cột nhóm rõ ràng. Split theo **nhóm/ảnh gốc**, không theo dòng.

## ⚠️ Lỗi thường gặp

Chết hoàn toàn âm thầm: **accuracy cao đẹp, không lỗi, deploy mới sụp**. Chỉ phát hiện được nếu **chủ động đi kiểm** — liệt kê nhóm rồi đếm xem nhóm nào nằm ở cả 2 tập.

---

## 🔗 Liên kết
- **Tiền đề:** [[chong-ro-ri-du-lieu]]
- **Liên quan tới:** [[image-captioning]] · [[sau-noi-so-ao-tuong]]

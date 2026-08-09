# 📦 Project — bảng tổng

> Zone 3 của kho: **thẻ tham chiếu** tới project thật, không phải nơi chứa code.
> Code · dataset · checkpoint · `.venv` vẫn nằm nguyên ở `repo_path` của từng thẻ.
> Xem `CONVENTIONS.md` §1.

**Cập nhật:** 2026-08-09 · **Số project:** 8
**Quay lại:** [[../hub/MASTER|🏠 MASTER]]

---

## Bảng tổng

| Project | Môn | Thời gian | Trạng thái | Kết quả nổi bật |
|---|---|---|---|---|
| [[viic-image-captioning]] | Deep Learning | 2026-06 → 08 | ✅ xong | CIDEr **119.95** · BLEU-4 42.91 (M3 × CLIP) |
| [[image-super-resolution]] | IVP | 2026-05 → 07 | ✅ xong | 8 phương pháp × 4 benchmark × 3 chỉ số |
| [[dsp-urbansound]] | DSP | 2026-03 → 05 | ✅ xong | ML cổ điển > CNN-2D khi dữ liệu ít |
| [[harness-eval-nckh]] | NCKH | 2026-04 → nay | 🟡 đang làm | 49 paper đã tóm tắt, đề cương v2 xong |
| [[pm-nhom4-tai-cau-truc]] | Project Manager | 2026-06 → 07 | ✅ xong | Báo cáo 16 chương, 5 Whys từng nguyên nhân |
| [[sem-hoi-thao]] | SEM501 | 2026-04 → 06 | ✅ xong | 3 bài thu hoạch, pipeline `record/`→`output/` |
| [[coursera-agile]] | — | 2026-02 → 04 | ✅ xong | 2 chứng chỉ UVA Darden |
| [[ivp-enhancement-suite]] | IVP | 2026-03 → 05 | ⏸️ dừng | 9 notebook; thư viện dừng, chuyển sang SR |

---

## Theo môn

| Vault | Project |
|---|---|
| [[../vaults/dl/SECOND_BRAIN_DL\|dl]] | [[viic-image-captioning]] |
| [[../vaults/ivp/SECOND_BRAIN_IVP\|ivp]] | [[image-super-resolution]] · [[ivp-enhancement-suite]] |
| [[../vaults/dsp/SECOND_BRAIN_DSP\|dsp]] | [[dsp-urbansound]] |
| [[../vaults/nckh/SECOND_BRAIN_NCKH\|nckh]] | [[harness-eval-nckh]] |
| *(chưa có vault)* | [[pm-nhom4-tai-cau-truc]] · [[sem-hoi-thao]] · [[coursera-agile]] |

---

## 🧵 Chủ đề xuyên suốt các project

Đọc ngang 8 thẻ thì ba bài học lặp lại — chúng đáng giá hơn từng project riêng lẻ:

**1. Mô hình mạnh hơn ≠ kết quả tốt hơn khi dữ liệu ít.**
[[viic-image-captioning]]: Transformer thua LSTM. [[dsp-urbansound]]: SVM/RF thắng CNN-2D. Cùng một hiện tượng, hai môn khác nhau → xem [[../vaults/ml/bias-variance]].

**2. Chọn chỉ số quyết định kết luận.**
[[image-super-resolution]]: SwinIR thắng PSNR, ESRGAN thắng LPIPS gấp đôi — đảo ngược hoàn toàn thứ hạng. [[dsp-urbansound]]: accuracy trung bình giấu mất CI 5.2% giữa các fold. → [[../vaults/ml/danh-gia-mo-hinh]].

**3. Chia dữ liệu sai là hỏng hết, không cứu được.**
[[dsp-urbansound]]: shuffle UrbanSound8K làm rò rỉ giữa các fold. [[viic-image-captioning]]: val không phân tầng làm số đo dao động. → [[../vaults/ml/xu-ly-du-lieu]] · [[../vaults/ml/cross-validation]].

---

## ➕ Thêm project mới

1. Copy `templates/_TEMPLATE-project.md` → `projects/<slug>.md`
2. Điền `repo_path` bằng đường dẫn **tuyệt đối**. **Không copy code vào đây.**
3. Mục `🔗 Khái niệm đã dùng` phải link tới note lý thuyết — đây là thứ biến project thành kiến thức thay vì một thư mục code chết.
4. Thêm 1 dòng vào bảng tổng phía trên.

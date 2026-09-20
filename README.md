# 🧠 Second Brain — MSA-FPT

Kho kiến thức gộp của toàn bộ chương trình học, kèm web app để xem đồ thị liên môn và theo dõi tiến độ.

**239 note · 5 vault · 8 project · 1193 cạnh đồ thị**

**🌐 Xem online (bản chỉ đọc): https://haihpse150218.github.io/My-second-braind/**

**Repo liên quan** — kho này là *thẻ tham chiếu*, code thật nằm ở các repo riêng:
[machine-learning](https://github.com/haihpse150218/machine-learning) (nguồn gốc kho + app) ·
[DSP501](https://github.com/haihpse150218/DSP501) ·
[Super-Resolution](https://github.com/haihpse150218/Super-Resolution) ·
[img_video_processing](https://github.com/haihpse150218/img_video_processing) ·
[Methods-of-Learning-and-Scientific-Research](https://github.com/haihpse150218/Methods-of-Learning-and-Scientific-Research) ·
[DoAn-ViIC](https://github.com/haihpse150218/DoAn-ViIC) 🔒

---

## Chạy

```bash
cd app
npm install     # lần đầu
npm start       # → http://localhost:5173
```

| Lệnh | Việc |
|---|---|
| `npm start` | Chạy web app (đọc + ghi) |
| `npm test` | 69 test |
| `npm run check` | Kiểm link gãy 3 vault chính |
| `npm run build` | Đóng gói `dist/` tĩnh để deploy |

**Bản tĩnh** (không cần Node): `npm run build` rồi phục vụ `dist/` qua HTTP — `npx serve ../dist`. App tự dò: không thấy `/api` thì đọc `index.json` và chuyển sang chế độ chỉ đọc.
Đừng mở `dist/index.html` bằng `file://` — trình duyệt chặn `fetch()` qua giao thức file.

## ⚖️ App Bàn biện chứng — không cần Node

Máy không có Node vẫn dùng được: app tĩnh một file, mở bằng double-click.

| | |
|---|---|
| Mở nhanh | [`app-bien-chung/index.html`](app-bien-chung/index.html) — chế độ copy prompt tay |
| **Claude tự chạy** | [`app-bien-chung/run.bat`](app-bien-chung/run.bat) → http://127.0.0.1:8787 — chạy cả pipeline 6 pha, **chỉ local, không cần API key** |
| Tài liệu | [`app-bien-chung/README.md`](app-bien-chung/README.md) |

11 điểm neo của phép biện chứng (2 nguyên lý · 6 phạm trù · 3 quy luật) thành **15 lăng kính** xếp theo 6 pha; system prompt lấy thẳng từ `.claude/agents/tbc-*.md` nên app và Claude Code không bao giờ lệch nhau. Mỗi note nhánh D của vault `triet` có nút mở đúng lăng kính của nó.

```bash
cd app-bien-chung
python build.py     # sinh lại data.js sau khi sửa agent/note
python serve.py     # hoặc double-click run.bat
```

## 4 tab

| Tab | Dùng để |
|---|---|
| 🎓 **Học** | Đọc note theo lộ trình từng môn — sidebar, đồ thị phụ thuộc, trình đọc, sửa tại chỗ |
| 🌉 **Liên môn** | Đồ thị gộp mọi vault. Bật *"chỉ cạnh liên môn"* để thấy chỗ các môn chạm nhau |
| 📊 **Dashboard** | Tiến độ từng vault/nhánh · gợi ý học tiếp · note mồ côi · link gãy |
| 🕒 **Timeline** | Số note viết theo tháng, tô màu theo môn |

`Ctrl+K` — tìm toàn kho (tiêu đề · tag · nội dung, bỏ dấu tiếng Việt: gõ `dao ham` ra `đạo hàm`).

---

## Cấu trúc

```
Second-brain/
├── vaults/       ZONE 1 — note nguyên tử. PHẲNG 1 cấp. App đọc, lên đồ thị.
│   ├── ml/       Machine Learning        86 note
│   ├── dl/       Deep Learning          123 note
│   ├── nckh/     Nghiên cứu khoa học     51 note (tóm tắt paper)
│   ├── dsp/      Digital Signal Proc.     0 note · 6 file trong _inbox/
│   └── ivp/      Image & Video Proc.      0 note · 4 file trong _inbox/
├── hub/          ZONE 2 — MOC liên môn (MASTER · map-lien-mon · lo-trinh-tong)
├── projects/     ZONE 3 — thẻ tham chiếu project (KHÔNG chứa code)
├── templates/    5 mẫu note
├── app/          web app — Node thuần, không framework, vendor offline
└── dist/         bản tĩnh (sinh ra bởi npm run build)
```

**Vào từ đâu:** [`hub/MASTER.md`](hub/MASTER.md)

---

## 3 luật phải nhớ

**1. Tên file phải khớp `^[a-z0-9-]+\.md$`**
Chữ thường, không dấu, không `_`, không khoảng trắng.
> 🚨 Sai định dạng → app **bỏ qua im lặng**, không báo lỗi. Note biến mất khỏi kho mà không có dấu hiệu gì. Đây là lỗi số 1 dễ mắc.

**2. Vault phẳng 1 cấp**
`listNotes()` không đệ quy. Note trong thư mục con thì app không thấy — `_inbox/` và `_archive/` cố ý nằm ngoài tầm đọc.

**3. YAML frontmatter thắng, dòng đậm là dự phòng**
Note giữ **cả hai**: frontmatter YAML (để máy đọc) và khối `**Trạng thái:** / **📖 Lộ trình:**` (tương thích ngược). Field nào thiếu trong YAML mới rơi xuống dòng đậm.

Đặc tả đầy đủ: [`CONVENTIONS.md`](CONVENTIONS.md)

---

## Thêm note mới

```bash
cp templates/_TEMPLATE-atomic-note.md vaults/ml/gradient-descent.md
```

1. Sửa `slug` trong frontmatter cho khớp tên file
2. Điền `vault` · `type` · `branch` · `order` · `status`
3. Nối `prev`/`next` **hai chiều** — sửa cả note hàng xóm
4. Thêm vào lộ trình trong `vaults/<id>/SECOND_BRAIN_*.md`
5. `node app/check-links.js ../vaults/ml` — phải 0 link chết

Liên kết: `[[cung-vault]]` · `[[dl/lien-mon]]` · `[Ra ngoài kho](D:\MSA-FPT\...)` (đường dẫn **tuyệt đối**)

---

## Script bảo trì

Đều nằm ở `app/scripts/`, đều có `--dry-run`:

| Script | Việc |
|---|---|
| `migrate-frontmatter.mjs <vault> [--reorder]` | Sinh YAML từ dòng đậm. `--reorder` suy `branch`+`order` từ lộ trình trong file hub |
| `build-index.mjs` | Đóng gói `dist/` tĩnh |
| `import-nckh.mjs` | Nạp note tóm tắt paper |
| `import-inbox.mjs` | Nạp note thô vào `_inbox/` |
| `chain-nckh.mjs` | Nối chuỗi note paper cùng nhóm |
| `link-projects.mjs` | Thêm `**Dùng trong:**` từ note ngược về project |
| `fix-crossvault-links.mjs` | Đổi link chết thành link liên môn |
| `build-nckh-hub.mjs` | Sinh lại `SECOND_BRAIN_NCKH.md` |

---

## Bản gốc

Kho này được **COPY** từ 13 thư mục trong `D:\MSA-FPT\`. **Bản gốc còn nguyên, không bị đụng tới** — có thể đối chiếu hoặc quay lại bất cứ lúc nào.

Nhật ký dựng kho + việc còn dở: [`PROGRESS.md`](PROGRESS.md)

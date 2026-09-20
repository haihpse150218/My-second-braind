# 📌 PROGRESS — Second Brain Tổng Hợp

**Cập nhật lần cuối:** 2026-09-20
**Bước đang làm:** P16 — ✅ Deck 20 slide đã dựng xong (PDF). Còn: phát phiếu ca ngành + 6 việc trong tuần. · P17 ✅ xong
**Tiến độ:** ✅ 61/61 bước cũ · ✅ P15 xong (trừ 15.7 ❌ không tải được giáo trình) · ✅ P17 xong
**Repo:** https://github.com/haihpse150218/My-second-braind (`main`)
**🌐 Web live:** https://haihpse150218.github.io/My-second-braind/

**Kho hiện tại:** **354 note** · **7 vault** · 8 project · 271 link gãy *(xem P15 — cố ý, là lộ trình đặt sẵn)*

> ⚠️ **Máy này KHÔNG có Node.js** → `npm run check` / `npm test` / `npm start` đều không chạy được.
> Số liệu trên đếm bằng script Python tạm ở scratchpad, **không phải** `check-all.mjs`. Cần đối chiếu lại khi về máy có Node.

> File này là **checkpoint**. Sau khi xong MỖI bước phải cập nhật ngay tại đây trước khi sang bước kế.
> Quy ước: `⬜ chưa làm` · `🟡 đang làm` · `✅ xong` · `⏸️ tạm dừng` · `❌ bỏ`

---

## Bảng checkpoint

| Phase | Bước | Nội dung | Trạng thái | Thời điểm | Ghi chú |
|---|---|---|---|---|---|
| **P0** | 0.1 | Dựng cây thư mục | ✅ | 2026-08-09 15:44 | 13 thư mục |
| P0 | 0.2 | Tạo `PROGRESS.md` | ✅ | 2026-08-09 15:46 | 50 bước |
| P0 | 0.3 | Viết `CONVENTIONS.md` | ✅ | 2026-08-09 15:50 | 12 mục |
| **P1** | 1.1 | COPY app → `app/` | ✅ | 2026-08-09 15:53 | 42 file, bỏ node_modules/srv.log/.git |
| P1 | 1.2 | Viết lại `app/vaults.json` (5 vault) | ✅ | 2026-08-09 15:55 | ml,dl,nckh,dsp,ivp + color + type |
| P1 | 1.3 | `npm i` + `node --test` (baseline xanh) | ✅ | 2026-08-09 15:58 | **33/33 pass** |
| **P2** | 2.1 | COPY `Machine learning/note` → `vaults/ml` | ✅ | 2026-08-09 16:01 | 66 md + 5 ảnh |
| P2 | 2.2 | COPY `DeepLearning/note` → `vaults/dl` | ✅ | 2026-08-09 16:01 | 125 md |
| P2 | 2.3 | Đổi hub `SECOND_BRAIN` → `SECOND_BRAIN_ML` + sửa link | ✅ | 2026-08-09 16:05 | 67 file; phẳng hoá `template-checklist/` |
| P2 | 2.4 | Sửa link tương đối gãy ra ngoài vault | ✅ | 2026-08-09 16:12 | 34 tham chiếu / 13 file → path tuyệt đối |
| P2 | 2.5 | Chạy `check-links.js`, ghi link gãy | ✅ | 2026-08-09 16:08 | DL sạch; ML 26 link chết + 37 thiếu order |
| **P3** | 3.1 | Viết `app/lib/frontmatter.js` (YAML zero-dep) | ✅ | 2026-08-09 16:20 | parse + stringify + withFrontmatter |
| P3 | 3.2 | Sửa `app/lib/parse.js` — YAML trước, fallback dòng đậm | ✅ | 2026-08-09 16:26 | +`xlinks` liên môn, +`statusKey` |
| P3 | 3.3 | Test `frontmatter.test.js` + mở rộng `parse.test.js` | ✅ | 2026-08-09 16:32 | **49/49 pass** (33→49) |
| P3 | 3.4 | Viết `scripts/migrate-frontmatter.mjs` (có `--dry-run`) | ✅ | 2026-08-09 16:38 | +`--reorder` suy order từ hub |
| P3 | 3.5 | Migrate `vaults/ml` (dry-run → thật) | ✅ | 2026-08-09 16:44 | 66 note; 6 nhánh sạch 1..N |
| P3 | 3.6 | Migrate `vaults/dl` | ✅ | 2026-08-09 16:44 | 123 note; vẫn ✅ Sạch |
| **P4** | 4.1 | COPY literature note → `vaults/nckh` | ✅ | 2026-08-09 17:02 | **49** note (không phải 60) |
| P4 | 4.2 | Slug hoá tên file + `_rename-map.md` | ✅ | 2026-08-09 17:02 | 0 lỗi slug |
| P4 | 4.3 | Sinh frontmatter `type: literature` | ✅ | 2026-08-09 17:05 | 49/49 có tags + PDF |
| P4 | 4.4 | `INDEX.md` → `SECOND_BRAIN_NCKH.md` (wikilink hoá) | ✅ | 2026-08-09 17:10 | **sinh tự động**, không chép tay |
| P4 | 4.5 | COPY `GAP-ANALYSIS.md`, `TABLE-Characteristics.md` | ✅ | 2026-08-09 17:13 | `type: moc` |
| P4 | 4.6 | Thêm branches A–I **+ S** của nckh vào `vaults.json` | ✅ | 2026-08-09 17:10 | S = Surveys |
| **P5** | 5.1 | Tạo hub `SECOND_BRAIN_DSP.md` + `SECOND_BRAIN_IVP.md` | ✅ | 2026-08-09 17:35 | lộ trình dự kiến 4 + 6 nhánh |
| P5 | 5.2 | COPY note thô DSP → `vaults/dsp/_inbox` | ✅ | 2026-08-09 17:28 | 6 file |
| P5 | 5.3 | COPY note thô IVP → `vaults/ivp/_inbox` | ✅ | 2026-08-09 17:28 | 4 file |
| P5 | 5.4 | Thêm frontmatter `type: inbox` + `**Nguồn gốc:**` | ✅ | 2026-08-09 17:28 | gộp vào `import-inbox.mjs` |
| P5 | 5.5 | Viết `hub/nguon-chua-xu-ly.md` (backlog chưng cất) | ✅ | 2026-08-09 17:40 | ước tính ~57 note sẽ sinh ra |
| — | +0.4 | Viết 4 template trong `templates/` | ✅ | 2026-08-09 17:20 | atomic · literature · vault-hub · inbox |
| **P6** | 6.1 | Tạo `templates/_TEMPLATE-project.md` | ✅ | 2026-08-09 17:45 | |
| P6 | 6.2 | Viết thẻ project trong `projects/` | ✅ | 2026-08-09 18:05 | **8 thẻ** (thêm `ivp-enhancement-suite`) |
| P6 | 6.3 | Link 2 chiều project ↔ note | ✅ | 2026-08-09 18:15 | 16 note có `**Dùng trong:**` |
| P6 | 6.4 | Viết `projects/INDEX.md` | ✅ | 2026-08-09 18:12 | + mục "chủ đề xuyên suốt" |
| **P7** | 7.1 | Viết `hub/MASTER.md` | ✅ | 2026-08-09 18:35 | số liệu thật: 239 note |
| P7 | 7.2 | Viết `hub/map-lien-mon.md` | ✅ | 2026-08-09 18:45 | + nối 9 cạnh liên môn THẬT |
| P7 | 7.3 | Viết `hub/lo-trinh-tong.md` | ✅ | 2026-08-09 18:52 | 6 chặng xuyên môn |
| P7 | 7.4 | Link ngược 5 hub vault → `MASTER.md` | ✅ | 2026-08-09 18:58 | + chuẩn hoá path tương đối |
| **P8** | 8.1 | `lib/graph.js` + `GET /api/graph` | ✅ | 2026-08-09 19:20 | 247 node · 1193 cạnh |
| P8 | 8.2 | Frontend: Graph liên môn (cytoscape) | ✅ | 2026-08-09 20:05 | lọc theo vault + "chỉ cạnh liên môn" |
| P8 | 8.3 | `GET /api/search?q=` | ✅ | 2026-08-09 19:20 | bỏ dấu tiếng Việt |
| P8 | 8.4 | `lib/dashboard.js` + `GET /api/dashboard` | ✅ | 2026-08-09 19:20 | + timeline |
| P8 | 8.5 | Frontend: trang Dashboard | ✅ | 2026-08-09 20:05 | KPI · nhánh · đọc tiếp · mồ côi · link gãy |
| P8 | 8.6 | Frontend: Timeline | ✅ | 2026-08-09 20:05 | cột chồng theo tháng, màu theo vault |
| P8 | 8.7 | Test graph/search/dashboard | ✅ | 2026-08-09 19:35 | **20 test mới → 69/69** |
| — | +8.8 | `scripts/chain-nckh.mjs` nối chuỗi note paper | ✅ | 2026-08-09 19:12 | nckh 0 → 78 cạnh |
| **P9** | 9.1 | `scripts/build-index.mjs` → `dist/index.json` | ✅ | 2026-08-09 20:25 | 1.56 MB |
| P9 | 9.2 | Frontend fallback chế độ tĩnh (chỉ đọc) | ✅ | 2026-08-09 20:30 | `data.js`, ẩn nút ghi |
| P9 | 9.3 | `npm run build` sinh `dist/` tự chứa | ✅ | 2026-08-09 20:30 | + `npm run check` |
| **P10** | 10.1 | Kiểm link gãy toàn kho | ✅ | 2026-08-09 20:40 | + `scripts/check-all.mjs` |
| P10 | 10.2 | Viết `README.md` gốc | ✅ | 2026-08-09 20:44 | |
| P10 | 10.3 | `git init` + `.gitignore` | ✅ | 2026-08-09 20:47 | + `.gitattributes` (ép LF) |
| P10 | 10.4 | Tổng kết cuối vào `PROGRESS.md` | ✅ | 2026-08-09 20:50 | |
| **P11** | 11.1 | Quét khoá/token/PII trước khi công khai | ✅ | 2026-08-09 21:05 | sạch |
| P11 | 11.2 | Commit toàn kho | ✅ | 2026-08-09 21:08 | `456aa59` · 346 file · 32.758 dòng |
| P11 | 11.3 | Push lên GitHub | ✅ | 2026-08-09 21:10 | nhánh `main` |
| P11 | 11.4 | Đặt description + topics | ✅ | 2026-08-09 21:12 | 11 topic |
| **P12** | 12.1 | Workflow `deploy-pages.yml` (CI build → Pages) | ✅ | 2026-08-10 08:28 | không cần `npm ci` |
| P12 | 12.2 | Bật Pages (`build_type=workflow`) | ✅ | 2026-08-10 08:28 | |
| P12 | 12.3 | Verify site live (HTTP 200 + JSON hợp lệ) | ✅ | 2026-08-10 08:32 | 239 note · 1193 cạnh |
| **P13** | 13.1 | Chưng cất `_inbox/` vault **ivp** → 65 note | ✅ | 2026-08-10 10:05 | 10 nhánh A–J · 0 link chết |
| P13 | 13.2 | Chưng cất `_inbox/` vault **dsp** → 21 note | ✅ | 2026-08-10 11:20 | 5 nhánh A–E · 0 link chết |
| **P14** | 14.1 | Link repo GitHub vào 8 thẻ project | ✅ | 2026-08-10 12:30 | 5 có repo (đã verify), 3 ghi rõ "chưa có" |
| P14 | 14.2 | Viết 21 note `ml` còn thiếu → **link gãy 35 → 0** | ✅ | 2026-08-10 13:40 | nhánh B: 3 → 12 note |
| **P15** | 15.0 | Cài PortableGit + clone repo về máy mới | ✅ | 2026-09-12 | máy không có Node/winget/choco |
| P15 | 15.1 | Tải slide Triết học 232 trang + bóc text | ✅ | 2026-09-12 | `vaults/triet/slides/` — PDF 14.8 MB |
| P15 | 15.2 | Dựng vault `triet` (hub 10 nhánh · 65 note dự kiến) | ✅ | 2026-09-12 | mỗi mục gắn sẵn số slide |
| P15 | 15.3 | Viết 5 atomic note `triet` | ✅ | 2026-09-12 | the-gioi-quan · chan-ly · nguyen-nhan-va-ket-qua · tat-nhien-va-ngau-nhien · vai-tro-cua-thuc-tien |
| P15 | 15.4 | Dựng vault `tamly` (hub 13 nhánh · 125 góc nhìn) | ✅ | 2026-09-12 | + ma trận 6 trục · 2 note seed |
| P15 | 15.5 | Đăng ký `triet` + `tamly` vào `app/vaults.json` | ✅ | 2026-09-12 | 7 vault, JSON parse OK |
| P15 | 15.6 | Skill `truy-ban-chat` + 11 agent lăng kính | ✅ | 2026-09-12 | `.claude/` + copy `~/.claude/`, khớp byte |
| P15 | 15.7 | Tải giáo trình chính thức 2021 | ❌ | 2026-09-12 | 5 nguồn đều hỏng — xem nhật ký |
| P15 | 15.8 | Commit + push P15 | ✅ | 2026-09-13 | 3 commit: vault · skill · PROGRESS |
| P15 | 15.9 | Quyết định `.gitignore` cho `*.pdf` | ✅ | 2026-09-13 | **chốt: commit cả PDF**, không ignore |
| **P16** | 16.1 | Nhận đề GK — bóc text `material/GK FSB ...pdf` | ✅ | 2026-09-20 | pypdf; 10 từ khoá · rubric 6 CLO |
| P16 | 16.2 | Chấm 10 từ khoá theo hồ sơ + chốt chủ đề | ✅ | 2026-09-20 | **chốt từ khoá #2 Việc làm** — AI × việc làm ngành gia công |
| P16 | 16.3 | Viết đề cương → `present/de-cuong-thuyet-trinh-gk.md` | ✅ | 2026-09-20 | 345 dòng · 11 mục · 6 lăng kính |
| P16 | 16.3b | Rà đề cương bằng **2 nguyên lý · 3 quy luật · 6 cặp phạm trù** | ✅ | 2026-09-20 | chủ đề gánh 11/11; sửa 2 chỗ chấm sai; thêm Vật chất–Ý thức + Nhận thức luận |
| P16 | 16.3c | Rà đề cương bằng **4 key word** (Phản biện · Pháp lý · Hệ thống · Thực tế) | ✅ | 2026-09-20 | 8 lỗi 🔴 · 5 sửa ngay · 3 câu chặn phải hỏi người dùng |
| P16 | 16.3d | Xoay chủ đề theo ràng buộc thật (nhóm trộn ngành · 15–20 phút · 1 tuần) | ✅ | 2026-09-20 | gia công phần mềm → **lao động tri thức**; gỡ luôn lỗi P1 |
| P16 | 16.3e | Dựng lại bài từ **điểm neo CLO × LLO** của rubric | ✅ | 2026-09-20 | đề cương v3 · 15 slide · mỗi slide neo CLO + lý thuyết + key word |
| P16 | 16.3f | Đọc nguồn Anthropic Institute WP 2026-02 + PDF chính sách | ✅ | 2026-09-20 | số liệu phân phối lao động–vốn; **là kịch bản, KHÔNG phải dự báo** |
| P16 | 16.3g | Chạy `truy-ban-chat` pha 1 — `tbc-dat-van-de` | ✅ | 2026-09-20 | bắt tiền đề hỏng *"không còn khớp"*; đổi điểm nghẽn sang **quy kết + ai chịu rủi ro** |
| P16 | 16.3h | Pha 2 — fan-out **8 lăng kính** song song | ✅ | 2026-09-20 | 3 lõi + 5 chọn; mỗi agent tự nêu 1 chỗ có thể sai |
| P16 | 16.3i | Pha 3 — đối chất *(tự làm, không agent)* | ✅ | 2026-09-20 | 5 hội tụ · 3 chỗ chỏi · **5 lỗi trong đề cương v3** |
| P16 | 16.3j | Pha 4 — `tbc-thuc-tien` chấm 🟢🟡🔴 | ✅ | 2026-09-20 | **🟢 5 · 🟡 10 · 🔴 6+1 bỏ**; tìm ra số VN thật; bác 3 chỗ trong file |
| P16 | 16.3k | Pha 5 — `tbc-phan-bien` | ✅ | 2026-09-20 | **3 đòn chí mạng** — sập kiến trúc, phải tái cấu trúc chứ không vá |
| P16 | 16.3l | Viết `present/de-tai-viec-lam-tri-thuc.md` — kịch bản 15 slide | ✅ | 2026-09-20 | **908 dòng · 15 slide · 3 phụ lục** · 0 link gãy |
| P16 | 16.4 | Viết note `triet` xương sống của bài | 🟡 | 2026-09-20 | **nhánh D đủ D1–D12** ✅; còn thiếu `hai-giai-doan-nhan-thuc` (E5) — không chặn bài |
| P16 | 16.5 | Thu dữ liệu — **phiếu ca ngành 6 câu** thay khảo sát | ⬜ | | mỗi thành viên 1 trang về ngành mình, thu trong 2 ngày |
| P16 | 16.3m | Tái cấu trúc sau pha 5 — hạ luận đề xuống mức bằng chứng chịu được | ✅ | 2026-09-20 | bỏ khung A/B, thay bằng **4 giả thuyết H1–H4** + 2 phép phân biệt |
| P16 | 16.6a | Tải 6 ảnh PD/CC0 + sinh biểu đồ | ✅ | 2026-09-20 | Wikimedia Commons · `present/img/` + `NGUON.md` |
| P16 | 16.6b | Dựng deck **HTML/SVG → PDF bằng Chrome** | ✅ | 2026-09-20 | **20 slide** (15 + 5 dự phòng) · 960×540pt = 16:9 · 3,3 MB |
| P16 | 16.6c | Dựng bản kịch bản nói | ✅ | 2026-09-20 | `notes.html` → PDF 9 trang A4 |
| P16 | 16.6d | Xuất bản **.pptx** qua PowerPoint COM | ✅ | 2026-09-20 | 20 slide · 16:9 · **speaker notes là text thật** · 6,9 MB |
| P16 | 16.6e | Sửa chữ *"khi nào lật"* → *"khi nào đổi chất"* | ✅ | 2026-09-20 | chữ tự bịa, không rõ nghĩa; **vault đã ghi đúng từ đầu** |
| P16 | 16.6f | **Deck v2** — cấu trúc *bày từ khoá trước, rồi gỡ từng cái* | ✅ | 2026-09-20 | 16 slide + 5 dự phòng · bản đồ 8 từ khoá + dải chỉ vị trí |
| P16 | 16.6g | Kịch bản nói bản v2 + vá tham chiếu chéo lệch số | ✅ | 2026-09-20 | PDF 10 trang A4; **9 chỗ trỏ sai slide** ở cả 2 đường sinh notes |
| P16 | 16.6h | **Deck v3** — trả phần chữ về slide, bỏ viết tắt | ✅ | 2026-09-20 | chữ/slide **28–42 → 150–300**; 8 từ khoá viết đủ nghĩa; 0 chữ nghiêng |
| P16 | 16.6i | Chia phần cho **7 người** (trước là 5) | ✅ | 2026-09-20 | N1–N7 · mốc giây từng slide · tổng **19'00"** · bảng ca ngành nới lên 7 dòng |
| P16 | 16.7 | Tổng duyệt bấm giờ | ⬜ | | cả nhóm |
| **P17** | 17.1 | Bóc toàn văn bài Anthropic *"Scenarios for Our Economic Future"* (9/2026) | ✅ | 2026-09-20 | curl + Python strip HTML → `NGUON.md` 18,4 KB. **PowerShell/Node vô dụng như thường lệ** |
| P17 | 17.2 | Pha 0 — `tbc-dat-van-de` chạy một mình | ✅ | 2026-09-20 | 9 tiền đề ngầm · 4 phép thử đảo chiều · 6 phép kiểm thiết kế sẵn |
| P17 | 17.3 | Pha 2 — fan-out **9 lăng kính** song song | ✅ | 2026-09-20 | 2 nguyên lý + 3 lõi + 2 chọn + 2 quy luật; ~5 phút/agent |
| P17 | 17.4 | Pha 3 — đối chất *(tự làm)* | ✅ | 2026-09-20 | 4 hội tụ · 5 chỗ chỏi · 3 mệnh đề chưa giải chuyển xuống pha 4 |
| P17 | 17.5 | Pha 4 — `tbc-thuc-tien` (có WebSearch) | ✅ | 2026-09-20 | **Tìm được báo cáo kỹ thuật gốc** → giải xong cả 3 câu treo · **bác 1 giả thuyết trung tâm** · kiểm số BLS/CBO thật |
| P17 | 17.6 | Pha 5 — `tbc-phan-bien` | ✅ | 2026-09-20 | **7 đòn, 4 chí mạng.** Đòn nặng nhất: *"hội tụ 5 hướng"* là giả — cùng tổ tiên pha 0 |
| P17 | 17.7 | Viết note `vaults/triet/ca-kich-ban-kinh-te-ai-anthropic.md` + vào hub J#4 | ✅ | 2026-09-20 | Ca thực hành đầu tiên chạy đủ 6 pha trên bài ngoài. **354 note** |

---

## Nhật ký

### 2026-08-09 15:44 — P0.1 ✅ Dựng cây thư mục
Tạo xong tại `D:\MSA-FPT\Second-brain\`:
`vaults/{ml,dl,nckh,dsp,ivp}`, `vaults/dsp/_inbox`, `vaults/ivp/_inbox`, `hub/`, `projects/`, `templates/`, `app/`, `dist/`.

### 2026-08-09 15:58 — P1 ✅ Chuyển app
COPY `Machine learning/secondbrain-app` → `app/` (42 file, bỏ `node_modules`/`srv.log`/`.git`).
`vaults.json` viết lại: 5 vault trỏ `../vaults/<id>`, thêm `type` + `color` (dùng để tô màu graph liên môn ở P8).
`npm i` + `node --test` → **33/33 pass**. Baseline xanh trước khi sửa gì.

### 2026-08-09 16:12 — P2 ✅ Migrate ml + dl
- `vaults/ml`: 66 md + 5 ảnh (`.png`/`.excalidraw`). `vaults/dl`: 125 md.
- Hub ML đổi `SECOND_BRAIN.md` → `SECOND_BRAIN_ML.md`; sửa `[[SECOND_BRAIN]]` → `[[SECOND_BRAIN_ML]]` trong **67 file**.
- **Phẳng hoá `template-checklist/`**: `template-checklist.md` + `eda-checklist.md` đưa lên gốc vault (trước đó nằm trong thư mục con nên `listNotes` không thấy → `[[template-checklist]]` là link chết). `README.md` của thư mục đó → `_archive/`.
- Sửa `vaults.json`: DL thực tế có **9 nhánh A–I**, không phải 8 — đã thêm nhánh I "QA · RAG · Prompt Engineering".
- Tuyệt đối hoá 34 tham chiếu đường dẫn trong 13 file (`code-practice/…` → `D:\MSA-FPT\Machine learning\code-practice\…`).

**Kết quả `check-links.js`:**
| Vault | Note | Link chết | Thiếu branch/order |
|---|---|---|---|
| dl | 123 | **0** ✅ | **0** ✅ |
| ml | 66 | 26 | 37 |

### 2026-08-09 16:46 — P3 ✅ Schema YAML + parser
- `lib/frontmatter.js` — parser YAML tối giản zero-dep. **Không bao giờ ném lỗi**: YAML hỏng → trả `{}` + giữ nguyên body, một note viết sai không được làm sập cả vault. Xử lý BOM, comment `#` ngoài nháy, chuỗi nháy không bị suy thành số (`arxiv: "2504.19413"` phải là string).
- `lib/parse.js` — đọc YAML trước, field nào thiếu mới rơi xuống dòng đậm. Thêm:
  - `statusKey` (`done`) song song `status` (`✅`) → **frontend + route PATCH cũ không phải sửa dòng nào**
  - `xlinks` = link liên môn `[[vault/slug]]`, **tách riêng khỏi `links`** → `check-links.js` cũ chạy y nguyên, không báo nhầm link chết
- `scripts/migrate-frontmatter.mjs` — suy frontmatter từ dòng đậm; cờ `--reorder` đọc lộ trình trong file hub để gán lại `branch`+`order`, đồng thời **ghi `#N` ngược vào dòng `**📖 Lộ trình:**`** cho YAML và dòng đậm không mâu thuẫn. Idempotent.
- Bug đã sửa: hub viết `[[kiem-dinh-gia-thuyet]] + [[p-value]]` trên cùng 1 dòng → bản đầu chỉ bắt link đầu, bỏ sót note thứ hai. Đổi `match` → `matchAll`.

**Trước → sau (vault ml):**
| | Trước | Sau |
|---|---|---|
| Thiếu branch/order | 37 | 4 (đều là note meta, đúng ý) |
| Order trùng | có (nhánh C) | **0** |
| Nhánh 1..N liền mạch | không | **cả 6 nhánh** |

- `hoi-quy-tuyen-tinh.md` (stub rỗng 359 byte, trùng `linear-regression.md` 11.7KB) → `_archive/`.
- 4 note meta gán `type` đúng: `dinh-huong-hoc`/`template-checklist`/`eda-checklist` → `moc`, `note` → `inbox`.
- Test: **49/49 pass** (33 cũ + 16 mới).

### 2026-08-09 17:13 — P4 ✅ Vault NCKH (49 note paper)
- Thực tế **49** note tóm tắt paper, không phải 60 như ước lượng ban đầu. Ghép 1:1 với 49 PDF trong `papers/`.
- `scripts/import-nckh.mjs` — COPY + slug hoá + sinh frontmatter một lượt. `A1_2026_Bui_OpenDev.md` → `a1-2026-bui-opendev.md`.
- Nhóm: A–I **+ S (Surveys, 4 paper)** — nhóm S không có trong `INDEX.md` gốc, đã thêm vào `vaults.json`.
- Bug đã sửa: mục `## 9. Keywords` có **hai kiểu viết** — backtick (`` `coding-agent` ``) và text phân tách bằng dấu phẩy. Bản đầu chỉ đọc backtick nên toàn bộ nhóm B mất tags. Sau khi sửa: **49/49 note có tags**.
- `SECOND_BRAIN_NCKH.md` **sinh tự động** từ chính note đã import (`scripts/build-nckh-hub.mjs`) thay vì chép tay `INDEX.md` — chép tay là cách chắc chắn nhất để đẻ link chết.
- `_rename-map.md` giữ ánh xạ tên gốc ↔ slug mới để đối chiếu ngược với `papers/`.

**check-links vault nckh: 0 link chết**, 10 nhóm đánh số liền mạch. (2 cảnh báo còn lại là `gap-analysis` + `table-characteristics` — note `type: moc`, không thuộc nhánh nào, đúng ý.)

### 2026-08-09 17:40 — P5 ✅ Vault DSP + IVP (khung + inbox)
- 4 template chuẩn trong `templates/`: atomic-note · literature-note · vault-hub · inbox.
- `scripts/import-inbox.mjs` — COPY 10 note thô (DSP 6, IVP 4) vào `_inbox/`, thêm frontmatter `type: inbox` + `**Nguồn gốc:**` đường dẫn tuyệt đối.
  **`_inbox/` là thư mục con → `listNotes()` không đọc** → note thô không lên graph, không làm nhiễu số liệu tiến độ. Chỉ khi chưng cất xong mới đưa file lên gốc vault.
- 2 hub viết tay với **lộ trình DỰ KIẾN**: DSP 4 nhánh (17 khái niệm), IVP 6 nhánh (21 khái niệm). Note chưa có ghi dạng `` `slug` `` (backtick) thay vì `[[slug]]` — cố ý, để không đẻ link chết; chưng cất xong mới đổi sang wikilink.
- Đã cắm sẵn **7 điểm nối liên môn** trong lộ trình, vd `dsp/tich-chap` ↔ `ivp/tich-chap-2d` ↔ `dl/cnn` (cùng một phép toán, khác số chiều).
- `hub/nguon-chua-xu-ly.md` — backlog đầy đủ: 10 file inbox (~57 note sẽ sinh ra), nguồn ngoài kho chưa đụng, các chỗ trùng lặp cần dọn, và quy trình chưng cất 8 bước.

### 2026-08-09 18:15 — P6 ✅ Zone projects (8 thẻ)
- 8 thẻ (kế hoạch ghi 7, thêm `ivp-enhancement-suite` — thư viện đã dừng, vẫn cần thẻ để biết vì sao dừng).
- Mỗi thẻ có **số liệu thật** lấy từ báo cáo gốc, không viết chung chung: ViIC CIDEr 119.95/BLEU-4 42.91; SR bảng 8 phương pháp × 4 benchmark; DSP CI giữa các fold 5.2%.
- `scripts/link-projects.mjs` — chèn `**Dùng trong:**` vào **16 note** lý thuyết, trỏ ngược về thẻ project. Idempotent (chạy lại không nhân bản dòng).
- Sửa 3 wikilink trỏ sai slug: `dl/cnn` → `dl/kien-truc-cnn-4-tang`, `dl/segmentation` → `dl/mask-rcnn`, `dl/gan` → `ml/generative-ai` (vault `dl` không có note GAN riêng; `ml/generative-ai` bao GAN/VAE/Diffusion).
- `projects/INDEX.md` có mục **"chủ đề xuyên suốt"** — đọc ngang 8 project thấy 3 bài học lặp lại ở nhiều môn khác nhau (mô hình mạnh ≠ tốt hơn khi ít dữ liệu · chọn sai chỉ số là kết luận sai · chia dữ liệu sai là hỏng hết). Đây là giá trị mà kho gộp tạo ra mà từng repo riêng không có.

**check-links sau P6: ml 26 link chết (backlog cũ, không phát sinh mới) · dl 0 · nckh 0.**

### 2026-08-09 18:58 — P7 ✅ Hub liên môn
- `hub/MASTER.md` — trang chủ với số liệu thật: **239 note** (ml 65 · dl 123 · nckh 51 · dsp 0 · ivp 0), 5 vault, 8 project.
- **`scripts/fix-crossvault-links.mjs` — bước có giá trị nhất của P7.** Trước đó toàn kho có **0 cạnh liên môn** (link `[[../../projects/…]]` không tính vì không khớp định dạng `vault/slug`). Script đổi 5 link CHẾT của `ml` thành link liên môn tới note đã có sẵn bên `dl` → **một mũi tên trúng hai đích**: link chết 26 → **21**, cạnh liên môn 0 → **9**.
  - `backpropagation` ×3 · `transfer-learning` ×4 · `transformer`→`transformer-block` · `resnet50`→`resnet` · `cnn`→`vi-sao-can-cnn`
- `hub/map-lien-mon.md` — 9 cạnh đã nối + 6 cầu nối đang chờ note đích. Cầu đáng giá nhất: **tích chập** xuất hiện ở cả 3 môn, khác biệt duy nhất là **ai quyết định kernel** — con người (DSP/IVP) hay dữ liệu (DL).
- `hub/lo-trinh-tong.md` — 6 chặng, kèm bảng "nếu chỉ có 1 buổi / 1 tuần / 1 tháng / 1 kỳ".
- Sửa link sai slug trong hub DSP/IVP: `dl/cnn`→`dl/vi-sao-can-cnn`, `dl/segmentation`→`dl/mask-rcnn`. Note DSP/IVP chưa viết thì để backtick, **không** để wikilink — tránh đẻ link chết.
- Chuẩn hoá đường dẫn tương đối: 3 hub dùng `../hub/MASTER` (sai 1 cấp) → `../../hub/MASTER`.

### 2026-08-09 20:05 — P8 ✅ Mở rộng web app
**Backend** — 3 route mới, tất cả đều GỘP MỌI VAULT (đặt trước đoạn `resolveVault` trong `server.js`, nếu không sẽ bị ép về 1 vault):
| Route | Trả về |
|---|---|
| `GET /api/graph` | 247 node · 1193 cạnh · 27 cạnh liên môn |
| `GET /api/dashboard` | tiến độ/vault + /nhánh · mồ côi · link gãy · "đọc tiếp" · timeline |
| `GET /api/search?q=` | tìm tiêu đề/tag/nội dung, **bỏ dấu tiếng Việt** (gõ `dao ham` ra `đạo hàm`) |

- Node id là **`vault/slug`** chứ không phải slug trần — hai vault có thể trùng slug.
- Thẻ project thành node hình thoi, nối sang note lý thuyết nó dùng (18 cạnh).
- Không cache: ~240 file, đọc lại mỗi request là đủ nhanh và luôn khớp file trên đĩa — sửa note bằng editor ngoài là thấy ngay, không cần restart.
- **Bug đã sửa:** `buildGraph` ban đầu chỉ đọc `prev/next/links/xlinks`, **quên `related`** → vault `nckh` ra 0 cạnh dù đã nối chuỗi. Sau khi sửa: nckh **78 cạnh**.
- `scripts/chain-nckh.mjs` nối 49 note paper cùng nhóm thành chuỗi. Dùng **`related`** chứ không dùng `prev/next` — paper A2 không phải *tiền đề* của A3, chúng chỉ liền nhau trong danh sách đọc; gán `prev/next` là khẳng định quan hệ không có thật.

**Frontend** — thêm 4 tab (`🎓 Học · 🌉 Liên môn · 📊 Dashboard · 🕒 Timeline`):
- `public/views.js` (mới) lo phần gộp vault; `app.js` cũ giữ nguyên vai trò view "Học" 1 vault. Giao tiếp qua `window.SBApp.gotoNote(vault, slug)`.
- Graph liên môn: lọc bật/tắt từng vault, nút **"🌉 chỉ cạnh liên môn"** (ẩn luôn node không có cạnh liên môn, tránh màn hình đầy chấm rời), rê chuột soi vùng lân cận.
- `public/data.js` (mới) — lớp dữ liệu chặn ngay trong hàm `api()`, nên **chỉ sửa 1 hàm** là cả app chạy được ở chế độ tĩnh.
- Test: **20 test mới** → tổng **69/69 pass**.

### 2026-08-09 20:50 — P9 + P10 ✅ Bản tĩnh & chốt
- `scripts/build-index.mjs` → `dist/` tự chứa, `index.json` **1.56 MB** (metadata + toàn bộ markdown + graph + dashboard).
- Chế độ tĩnh gọn vì chặn ngay trong hàm `api()` của `app.js` — **sửa đúng 1 hàm** là mọi call site đi qua. `data.js` giả lập đối tượng `Response` nên phần còn lại của app không cần biết đang chạy chế độ nào. Không có server → tự ẩn nút sửa/tạo/import.
- ⚠️ `dist/` **phải phục vụ qua HTTP** (`npx serve ../dist`). Mở bằng `file://` thì trình duyệt chặn `fetch()`, không nạp được `index.json`.
- `scripts/check-all.mjs` thay cho chuỗi `check-links.js && …` (bị dừng ở vault đầu do exit code 1). Bản mới kiểm cả 5 vault, **hiểu link liên môn** nên `[[dl/backpropagation]]` trong vault `ml` không bị báo nhầm là link chết, và **xếp hạng link gãy theo số note đang chờ** để biết viết note nào trước.
- `git init` + `.gitignore` (loại `node_modules/`, `dist/`) + `.gitattributes` ép LF cho `.md`/`.js` — script ghi file bằng LF, không ép thì Windows tạo diff giả toàn bộ kho mỗi lần checkout.
- **Chưa commit** — repo đã init, 344 file sẵn sàng, chờ quyết định.

### 2026-08-09 21:12 — P11 ✅ Đưa lên GitHub

**Repo:** https://github.com/haihpse150218/My-second-braind — nhánh `main`, commit `456aa59`, 346 file / 32.758 dòng.

> ⚠️ **Repo để PUBLIC.** Kho có ghi chú cá nhân, đề cương luận văn đang làm, và đường dẫn tuyệt đối trên máy (`D:\MSA-FPT\...`). Nếu không muốn công khai thì đổi sang private:
> `gh repo edit haihpse150218/My-second-braind --visibility private`

Quét trước khi đẩy:
| Kiểm tra | Kết quả |
|---|---|
| Khoá API / token / private key | ✅ sạch |
| `.claude/`, `.env`, `settings.local.json` lọt vào | ✅ không |
| `node_modules/`, `dist/` bị loại | ✅ đúng (`.gitignore`) |
| Mã sinh viên `25MS23323` | ⚠️ có ở 3 file (`hub/nguon-chua-xu-ly.md`, `projects/ivp-enhancement-suite.md`, `vaults/ivp/SECOND_BRAIN_IVP.md`) — chỉ là tên thư mục bài nộp, repo mang tên chính chủ nên giữ nguyên |
| PDF bài giảng / paper | ✅ **không copy** — chỉ trỏ bằng đường dẫn tuyệt đối, tránh vấn đề bản quyền |

Cấu hình repo: description + 11 topic (`second-brain`, `pkm`, `zettelkasten`, `knowledge-graph`, `machine-learning`, `deep-learning`, `digital-signal-processing`, `obsidian`, `markdown`, `cytoscape`, `vietnamese`).

`.gitattributes` ép LF cho `.md`/`.js` — script ghi file bằng LF, không ép thì mỗi lần checkout trên Windows sẽ tạo diff giả toàn kho.

### 2026-08-10 08:32 — P12 ✅ Deploy GitHub Pages

**🌐 Bản web live: https://haihpse150218.github.io/My-second-braind/**

Cách làm: `dist/` vẫn nằm trong `.gitignore` (sinh lại được, 2.7 MB, đổi mỗi lần sửa note → commit vào repo là tự tạo diff rác). Thay vào đó `.github/workflows/deploy-pages.yml` **build từ nguồn trong CI** rồi đẩy artifact thẳng lên Pages. Sửa note → `git push` → site tự cập nhật.

**Workflow không chạy `npm ci`** — `scripts/build-index.mjs` chỉ dùng module có sẵn của Node (`node:fs`, `node:path`, `node:url`) + `lib/` nội bộ. Dependency duy nhất `@anthropic-ai/sdk` chỉ được `lib/import.js` nạp, mà đó là đường của server. Đã kiểm chứng bằng cách build trong thư mục sạch không có `node_modules`. → build ~5 giây, không phụ thuộc mạng npm.

**`touch dist/.nojekyll` là bắt buộc.** Pages mặc định chạy Jekyll, mà Jekyll **bỏ qua im lặng** mọi file/thư mục bắt đầu bằng `_`. Không có file này thì một phần asset có thể biến mất mà không báo lỗi gì.

Chế độ tĩnh chạy đúng vì `data.js` dò server bằng `fetch('/api/vaults')` → trên Pages trả **404** → rơi sang đọc `index.json`. Mọi đường dẫn asset trong `index.html` đều **tương đối**, nên chạy được ở subpath `/My-second-braind/` mà không phải sửa gì.

**Đã verify sau khi deploy:**

| Đích | Kết quả |
|---|---|
| `/My-second-braind/` | 200 · 7.762 byte |
| `…/index.json` | 200 · 1.638.367 byte · JSON hợp lệ |
| `…/vendor/cytoscape.min.js` | 200 · 435 KB |
| `…/vendor/katex/fonts/KaTeX_Main-Regular.woff2` | 200 (xác nhận `.nojekyll` có tác dụng) |
| `/api/vaults` | 404 → đúng, kích hoạt chế độ chỉ đọc |
| Nội dung `index.json` | 239 note · 247 node · 1193 cạnh · 5 vault |

> ⚠️ **Site này CÔNG KHAI và bị search engine đánh chỉ mục.** Repo vốn đã public, nhưng có website thì nội dung dễ tìm thấy hơn hẳn. Kho có ghi chú cá nhân, đề cương luận văn đang làm, đường dẫn tuyệt đối trên máy (`D:\MSA-FPT\...`) và mã sinh viên ở 3 file.
> Muốn gỡ: `gh api -X DELETE repos/haihpse150218/My-second-braind/pages` (Pages chỉ chạy được với repo public ở gói free — chuyển repo sang private sẽ tự tắt site).

### 2026-08-10 10:05 — P13.1 ✅ Chưng cất inbox IVP → 65 note

Vault `ivp` từ **0 → 65 atomic note**, 10 nhánh A–J bám sát Lecture 1→12. `check-links`: **0 link chết · 0 thiếu branch/order · 10/10 nhánh đánh số liền mạch 1..N**.

| | Trước | Sau |
|---|---|---|
| Note toàn kho | 239 | **304** |
| Cạnh đồ thị | 1193 | **1601** |
| Cạnh liên môn | 27 | **53** |
| Link gãy | 35 | **35** (y nguyên — toàn bộ là backlog cũ của `ml`, ivp không đẻ thêm cái nào) |

**Quyết định đáng ghi nhất — sửa lộ trình cho khớp nguồn thật.** Lộ trình dự kiến hôm 2026-08-09 vạch 6 nhánh, trong đó có **Nén ảnh** và **Video & chuyển động**. Đọc hết 4 file inbox mới thấy:

- Nén ảnh: L2 chỉ nhắc `lossy/lossless` đúng một dòng, **không có** DCT/JPEG/PSNR.
- Video: thuộc Part II, theo lịch nằm ở Session 9 — **chưa học**.
- Ngược lại, nguồn có **thừa** ra những mảng lộ trình cũ bỏ sót: phục hồi ảnh (L7, rất dày), ảnh màu (L11), phép số học/affine/nội suy (L5), thu nhận ảnh (L4).

Viết note cho hai nhánh kia lúc này là **bịa nội dung không có trong tài liệu**. Đã dựng lại 10 nhánh A–J theo đúng lecture, và ghi hai chủ đề cũ vào [[nguon-chua-xu-ly]] kèm chỉ dẫn nguồn phải đọc (`_txt/`) khi học tới.

**Nhánh:** A ảnh số & biểu diễn (7) · B thu nhận & số hoá (4) · C số học·logic·hình học (5) · D mức xám & histogram (10) · E lọc & phục hồi (13) · F hình thái học (6) · G phát hiện biên (5) · H phân đoạn (6) · I ảnh màu (6) · J keypoint (3).

**Cách viết:** mỗi note bám khung `CONVENTIONS.md` §7, ưu tiên **vì sao** hơn **là gì** — chỗ nào có bẫy thực hành thì nói thẳng ra bẫy đó (ép kiểu `double()` vs `im2double()`, tràn số bị kẹp im lặng, ảnh nhãn bắt buộc nội suy nearest, `jet` là colormap tệ, chọn sai dấu `R` của contraharmonic là hỏng ảnh). Đây là loại thông tin không tra lại được nhanh, nên đáng để trong note nhất.

**26 cạnh liên môn mới** — đáng chú ý là ba cầu nối làm rõ quan hệ giữa các môn:
- `ivp/tich-chap-2d` ↔ [[../vaults/dl/phep-tich-chap]] — **cùng một phép toán**, khác biệt duy nhất là **ai quyết định kernel**: con người thiết kế (IVP) hay dữ liệu học ra (DL).
- `ivp/otsu` ↔ [[../vaults/ml/k-means]] — Otsu chính là phân cụm 1 chiều, giải bằng vét cạn nên tìm được tối ưu **toàn cục**, khác k-means vốn có thể kẹt ở tối ưu cục bộ.
- `ivp/wiener-filter` ↔ [[../vaults/ml/danh-gia-mo-hinh]] — "tối ưu MSE" không đồng nghĩa "trông đẹp nhất"; đúng bài học chọn sai chỉ số là tối ưu sai thứ.

Toàn bộ note để `status: learning` (🟡) — chúng được chưng cất từ tóm tắt của chính mình, nhưng chưa qua bước tự kiểm tra "gấp note lại và giải thích bằng lời". Đánh ✅ lúc này là để số liệu tiến độ nói dối.

### 2026-08-10 11:20 — P13.2 ✅ Chưng cất inbox DSP → 21 note

Vault `dsp` từ **0 → 21 note**, 5 nhánh A–E. `check-links`: **0 link chết · 0 thiếu branch/order · 5/5 nhánh liền mạch**.

**Mở rộng lộ trình từ 4 lên 5 nhánh.** Kế hoạch cũ chỉ có A–D (kỹ thuật thuần). Nhưng nguồn — báo cáo cuối kỳ DSP501 — có cả phần **thực nghiệm và đánh giá** rất đáng giá mà lộ trình cũ bỏ sót: fold/rò rỉ dữ liệu, kiểm định thống kê, SNR. Đã thêm **nhánh E · Thực nghiệm & đánh giá**.

**Ba note đắt nhất của nhánh E** — chúng là bài học phương pháp, dùng được ngoài môn DSP:

| Note | Bài học |
|---|---|
| [[../vaults/dsp/fold-va-ro-ri-du-lieu]] | 8.732 clip cắt từ chỉ **1.297 bản ghi gốc** → shuffle là rò rỉ. Chia ngẫu nhiên **chỉ đúng khi mẫu thực sự độc lập** |
| [[../vaults/dsp/so-sanh-thong-ke]] | `p` và Cohen's `d` trả lời **hai câu hỏi khác nhau**; "không bác bỏ được H₀" **không phải** "chứng minh H₀ đúng" |
| [[../vaults/dsp/snr]] | SNR **+4,5 dB** mà accuracy **không đổi** — chỉ số trung gian tốt lên không đảm bảo chỉ số cuối tốt lên |

**Cạnh liên môn 53 → 93** — bước nhảy lớn nhất từ trước tới nay, vì DSP nằm đúng giữa `ivp` và `ml`/`dl`:
- `dsp/tich-chap` ↔ [[../vaults/ivp/tich-chap-2d]] ↔ [[../vaults/dl/phep-tich-chap]] — **cầu 3 môn** đã cắm sẵn từ P5 nay nối được thật. Khác biệt duy nhất giữa ba nơi: **ai quyết định kernel**.
- `dsp/spectrogram-stft` ↔ [[../vaults/ivp/anh-so-la-gi]] — STFT biến âm thanh 1D thành ảnh 2D, từ đó mọi công cụ thị giác dùng được.
- `dsp/fold-va-ro-ri-du-lieu` ↔ [[../vaults/dl/group-leakage]] — cùng một cái bẫy, hai môn phát hiện độc lập.
- `dsp/mfcc` ↔ [[../vaults/ml/pca]] — DCT trong MFCC đóng đúng vai trò khử tương quan của PCA, chỉ khác là cơ sở cố định thay vì học từ dữ liệu.

**Chưa lấy được từ inbox** (phải đọc 8 PDF bài giảng gốc): `bien-doi-z` và `chuoi-fourier`. Đã ghi vào hub DSP thay vì tạo stub rỗng.

### 2026-08-10 13:40 — P14 ✅ Link repo + gỡ sạch link gãy

**14.1 — Link repo GitHub vào thẻ project.** 5/8 thẻ có repo. **Đã verify từng repo bằng cách soi nội dung**, không đoán theo tên: `DSP501` (có `notebooks/` + `report.md`), `Super-Resolution` (có `classic/` + `deeplearning/` — đúng "cổ điển vs học sâu"), `img_video_processing` (`EX1_1.png`… bài thực hành), `Methods-of-Learning-and-Scientific-Research` (chứa `NCKK-Docs/`), `DoAn-ViIC` (🔒 private).

3 thẻ còn lại (`coursera-agile`, `pm-nhom4-tai-cau-truc`, `sem-hoi-thao`) là bài nộp dạng tài liệu — ghi rõ **"chưa có" kèm lý do** thay vì để trống, để lần sau không phải đi tìm lại.

Phát hiện đáng ghi: repo `machine-learning` chính là **nguồn gốc của cả kho này** — nó chứa `note/` (đã thành vault `ml`) và `secondbrain-app/` (đã thành `app/`). Đã thêm mục "Repo nguồn của chính kho này" vào [[../projects/INDEX]] và `MASTER`.

**14.2 — Viết 21 note `ml` còn thiếu.**

> 🎉 **Link gãy toàn kho: 35 → 0.** Lần đầu tiên kho sạch hoàn toàn.

| | Trước | Sau |
|---|---|---|
| Note `ml` | 65 | **86** |
| Note toàn kho | 325 | **346** |
| Cạnh liên môn | 93 | **120** |
| Link gãy | 35 | **0** |

**Nhánh B (đại số tuyến tính) từ 3 → 12 note** — đây từng là mảng hổng lớn nhất, chiếm 7/21 link gãy. Giờ đi trọn mạch: `vector` → `ma-tran` → `phep-bien-doi-tuyen-tinh` → hiệp phương sai → trị riêng → `svd` → `giam-chieu-du-lieu` → `pca` → `kernel-pca` → `t-sne` → `he-goi-y-recommender`.

**Cách đánh số lại:** không sửa `order` bằng tay cho 86 note. Thay vào đó **cập nhật lộ trình trong hub** rồi chạy `migrate-frontmatter.mjs ml --reorder` — script suy `branch`+`order` từ hub và ghi ngược cả YAML lẫn dòng `**📖 Lộ trình:**`. **40 note được gán lại**, cả 6 nhánh liền mạch 1..N. Đây đúng là việc script được viết ra để làm ở P3.4.

**Ba note đáng chú ý nhất:**
- [[../vaults/ml/chain-rule]] — 5 note đang chờ nó. Chốt được rằng **backpropagation không phải thuật toán mới**, nó là chain rule có tổ chức; và vanishing/exploding gradient là hệ quả trực tiếp của phép nhân dài đó.
- [[../vaults/ml/svd]] — nối được `SVD → PCA → hệ gợi ý → LoRA`. Ghi lại chi tiết thực hành: **thư viện tính PCA bằng SVD chứ không phân rã hiệp phương sai**, vì tạo `XᵀX` làm bình phương số điều kiện.
- [[../vaults/ml/t-sne]] — dành hẳn một mục cho **ba điều KHÔNG được kết luận** từ hình t-SNE. Đây là công cụ bị đọc sai nhiều nhất trong ML.

4 note vẫn không có `branch` (`dinh-huong-hoc`, `eda-checklist`, `note`, `template-checklist`) — **đúng ý**, chúng là note meta không thuộc nhánh nào.

### 2026-09-12 — P15 ✅ Máy mới · 2 vault mới · skill biện chứng

> ✅ **Đã commit + push 2026-09-13** — 3 commit: vault · skill · PROGRESS.

**Bối cảnh:** phiên này chạy trên **máy khác** (`C:\Users\Admin\Desktop\Triết Ho`, user `Admin`), không phải `D:\MSA-FPT\Second-brain\` như các phase trước.

**15.0 — Môi trường máy mới.** Máy trắng: không Git, không Node.js, không winget/choco/scoop. Chỉ có Python 3.14.
- Đã cài **PortableGit 2.55.0** vào `%LOCALAPPDATA%\Programs\PortableGit`, đã thêm vào **PATH user** (mở terminal mới là gõ `git` được, không cần admin).
- Clone repo qua HTTPS public → **chưa cấu hình push**, cần PAT hoặc SSH key.
- ⚠️ **Không có Node.js** nên `npm run check`, `node --test`, `npm start` đều không chạy được suốt phiên. Mọi kiểm tra làm bằng script Python tạm.
- ⚠️ **PowerShell 5.1 đọc file UTF-8 sai** (`Get-Content` ra `ChÃ¢n lÃ½`) → mọi lần kiểm nội dung tiếng Việt phải dùng Python, không dùng PowerShell. Đã mắc bẫy này một lần: script PS báo "thiếu 8 mục" trong khi file hoàn toàn đúng.

**15.1–15.3 — Vault `triet`.** Nguồn: slide môn Triết học Mác – Lênin của **TS. Đặng Hoàng Vũ (FSB)**, 232 slide, 10 chương. Tải từ `https://ap.fsb.edu.vn/subject/document/0dd409ff0b20b071788944599.pdf`.
- PDF gốc **14.8 MB** + bản text đã bóc (88 KB, grep theo `=== PAGE n ===`) để ở `vaults/triet/slides/`.
- Hub `SECOND_BRAIN_TRIET.md`: 10 nhánh A–J, **65 note dự kiến, mỗi mục gắn sẵn số slide** — tra ngược được ngay.
- **5 note đã viết**, tất cả trích nguyên văn slide thay vì diễn giải:

| Note | Nhánh | Điểm chính |
|---|---|---|
| `the-gioi-quan` | A#1 | 3 biến số của thầy: **góc nhìn · hướng nhìn · tầm nhìn** (slide 3) |
| `chan-ly` | E#6 | 4 tính chất + **định kiến ngành** & 3 kiểu lỗi |
| `nguyen-nhan-va-ket-qua` | D#8 | Tách **nguyên nhân · điều kiện · nguyên cớ** (*"gà không gáy thì trời vẫn sáng"*) |
| `tat-nhien-va-ngau-nhien` | D#6 | Phép thử *"điều kiện như nhau → kết quả như nhau"* |
| `vai-tro-cua-thuc-tien` | E#4 | 3 vai trò · 3 hình thức · thang chấm 🟢🟡🔴 |

**Một ví dụ chạy xuyên suốt 3 note cuối** — chuỗi *"thương lái mua móng trâu → trộm cắt chân trâu → kinh tế đi xuống"*. Soi bằng 3 phạm trù thì lòi ra 4 lỗi: nhầm nguyên cớ thành nguyên nhân · nâng ngẫu nhiên thành tất nhiên · nhảy từ đơn nhất lên cái chung · chưa qua thực tiễn kiểm nghiệm. Dùng một ví dụ cho 3 note dễ nhớ hơn 3 ví dụ rời, và cho thấy các phạm trù ăn khớp nhau.

**15.4 — Vault `tamly`.** 13 nhánh A–M, **125 góc nhìn** từ Descartes tới predictive processing. Hub có 3 thứ dùng được ngay: bảng *"một người trầm cảm"* × 10 lăng kính · **ma trận 6 trục** để định vị bất kỳ trường phái nào · bảng 4 cuộc chuyển hệ hình. 2 note seed: `tam-ly-la-su-phan-anh` (nhánh E — trường phái Mác-xít, nối thẳng sang môn Triết) và `da-nguyen-luan-ly-thuyet`.

**15.6 — Skill `truy-ban-chat` + 11 agent.** Đóng gói khuôn phân tích đã dùng cho ví dụ con trâu thành công cụ tái dùng. Quy trình 6 pha, mục tiêu **truy bản chất và quy luật**.

Thiết kế đổi giữa chừng khi chốt được một điểm: **đặt vấn đề là khâu đòn bẩy cao nhất**, vì quan hệ này bất đối xứng — slide 121 (nhắc lại 123): *"Nhận thức đúng thì hành động **có đúng, có sai**; nhận thức sai thì hành động **không thể đúng**!"*. Nên `tbc-dat-van-de` thành **Pha 1 chạy một mình trước tất cả**.

Cùng lúc tách được 2 lỗi hay bị gộp làm một:

| | Sai ở đâu | Ví dụ |
|---|---|---|
| **Post hoc** | thứ tự thời gian | gà gáy rồi trời sáng → gà làm trời sáng |
| **Khẳng định hậu kiện** | hướng suy luận | **đường ướt → kết luận trời mưa** |

Mọi agent bắt buộc khai trường **⛔ Cái lăng kính này KHÔNG thấy** — cơ chế chống búa–đinh, vì agent nào được giao cặp phạm trù nào cũng sẽ luôn "tìm ra" cái đó.

Đặt ở **cả hai nơi**: `<repo>/.claude/` (commit được) và `~/.claude/` (dùng ở mọi project). 14 file, đã verify khớp byte. ⚠️ **Sửa ở repo phải copy lại sang user-level**, lệnh ghi ở cuối `SKILL.md`.

**15.7 — ❌ Không tải được giáo trình chính thức 2021.** Thử 5 nguồn:

| Nguồn | Kết quả |
|---|---|
| `dokumen.pub` (2 URL) | 403 Forbidden |
| `thuviendientutriethocc500.edu.vn` | **cert SSL không khớp hostname** (`SEC_E_WRONG_PRINCIPAL`) — không bypass |
| `giaotrinh.edu.vn` | 406, trả HTML |
| `thuvienso.hoasen.edu.vn` | *"No item found"* — record đã gỡ |
| `thuvien.qui.edu.vn` | trang giới thiệu, không có file |

Slide là bản rút gọn có chủ ý, nhiều chỗ chỉ ghi từ khoá → **cần định nghĩa chính xác để đi thi thì phải tra giáo trình giấy**. Đã ghi cảnh báo này vào `SKILL.md`.

**Về 271 link gãy.** Trong đó **240 cái là của 2 vault mới** (tamly 140, triet 100) — **cố ý, đúng thiết kế**: hub là lộ trình đặt sẵn chỗ cho note tương lai, `CONVENTIONS.md §6` cho phép. 31 cái còn lại nằm ở vault cũ (ml 12, ivp 9, dl 7, dsp 2, nckh 1) — **nhiều khả năng là chênh lệch cách đếm**, vì script Python tạm của tao quét cả file `SECOND_BRAIN_*.md` còn `check-all.mjs` có thể không. **Phải chạy `npm run check` trên máy có Node để biết con số thật.**

✅ **CI không bị ảnh hưởng** — `deploy-pages.yml` chỉ chạy `build-index.mjs`, không chạy `check-links.js` hay test. Push lên là site vẫn build, chỉ có link dangling.

---

## 📊 Kết quả cuối

| | |
|---|---|
| Note | **239** (ml 65 · dl 123 · nckh 51 · dsp 0 · ivp 0) |
| Project | 8 thẻ |
| Đồ thị | 247 node · 1193 cạnh · **27 cạnh liên môn** |
| Tiến độ | 174/239 ✅ (73%) — ml 0%, dl 100%, nckh 100% |
| Test | **69/69 xanh** (33 cũ + 36 mới) |
| Link gãy | 35 → 21 đích **chưa viết** (backlog, không phải bug) |
| Mồ côi | 2 — đều là note #1 của nhánh, đúng bản chất |
| Bản tĩnh | `dist/` 1.56 MB, deploy được |

**Bản gốc còn nguyên vẹn** — toàn bộ là COPY, `Machine learning/note` và `DeepLearning/note` không bị đụng.

---

## ⚠️ Việc còn dở / cần quyết định

**1. ML — 26 link chết = note dự kiến viết, CHƯA viết** (không phải bug, là backlog):
`adam-optimizer` · `backpropagation` · `chain-rule` · `cnn` · `dao-ham-rieng` · `fine-tuning` · `giam-chieu-du-lieu` · `gioi-han` · `ham-so` · `he-goi-y-recommender` · `kernel-pca` · `khoang-tin-cay` · `knn` · `learning-rate` · `ma-tran` · `naive-bayes` · `phep-bien-doi-tuyen-tinh` · `resnet50` · `sgd` · `svd` · `t-sne` · `toi-uu-hoa` · `transfer-learning` · `transformer` · `vector` · `xac-suat-co-dieu-kien`

→ Vài cái trong đó (`backpropagation`, `cnn`, `transformer`, `resnet50`, `transfer-learning`, `fine-tuning`) **đã có sẵn bên vault `dl`**. Ở P7 nên đổi thành link liên môn `[[dl/backpropagation]]` thay vì viết lại.

**2. ML — 37 note thiếu `order`** (có `branch` nhưng không có `#N`). Hub `SECOND_BRAIN_ML.md` đã có thứ tự đọc đầy đủ → **P3.4 sẽ suy `order` từ lộ trình trong hub**, không điền tay.

---

## 📋 Bối cảnh nhanh (để session mới đọc là hiểu)

**Mục tiêu:** gom kiến thức rải rác ở 13 thư mục trong `D:\MSA-FPT\` về một kho duy nhất `D:\MSA-FPT\Second-brain\`, rồi mở rộng web app để visualize.

**5 quyết định đã chốt:**
1. **COPY**, không MOVE — thư mục gốc (`Machine learning/note`, `DeepLearning/note`, ...) giữ nguyên, rollback được.
2. Metadata **YAML frontmatter + GIỮ dòng đậm** cũ (`**Trạng thái:**`, `**📖 Lộ trình:**`) → 180 note cũ vẫn chạy với parser hiện tại.
3. Phạm vi: ML, DL, NCKH, DSP, IVP + nhóm artifact (Coursera, PM, Hội thảo, Python, SR).
4. DSP/IVP chưa có atomic note → chỉ dựng khung + đẩy note thô vào `_inbox/`, chưng cất sau.
5. Web: **mở rộng** `secondbrain-app` có sẵn (Node thuần, zero-dep, cytoscape+katex+marked đã vendor offline), không xây mới.

**3 zone lưu trữ:**
- `vaults/` — note nguyên tử, flat 1 cấp (app đọc bằng `listNotes`, chỉ nhận slug `^[a-z0-9-]+$`, bỏ file `_*`)
- `hub/` — MOC liên môn
- `projects/` — thẻ tham chiếu tới project (metadata + `repo_path`, KHÔNG copy code/dataset)

**Nguồn app gốc:** `D:\MSA-FPT\Machine learning\secondbrain-app\`
**Plan đầy đủ:** `C:\Users\haihp\.claude\plans\duy-t-qua-t-ng-folder-reactive-pnueli.md`

---

### 2026-09-20 — P16 ✅ Chốt chủ đề thuyết trình GK Triết

**Đề:** thuyết trình **nhóm** giữa kỳ, chọn 1 trong 10 từ khoá, phác thành chủ đề cụ thể.
Bắt buộc trả lời 5 câu: *tính mới · áp dụng hạng mục nào · đơn vị nào áp dụng · tác động xã hội · ai thụ hưởng / ai chống đối*.
Rubric 6 CLO — **6/10 điểm nằm ở phân tích + đề xuất**, chỉ 1.0 cho mô tả.

**Chốt: từ khoá #2 — Việc làm.**
> Tái cấu trúc việc làm kỹ sư phần mềm dưới tác động của trợ lý lập trình AI — góc nhìn doanh nghiệp gia công phần mềm VN quy mô vừa.

**Ba lý do bỏ từ khoá #1 "Trí tuệ nhân tạo":** ví dụ mẫu của thầy dùng chính từ khoá đó → nửa lớp sẽ trùng; chọn "Việc làm" vẫn nói hết phần AI vì AI là *cơ chế* bên trong; và "Việc làm" có xung đột lợi ích **có địa chỉ cụ thể** → câu "ai chống đối" mới sắc được.

**Mâu thuẫn hạt nhân của bài:** LLSX (công cụ AI, năng suất/người tăng) ↔ QHSX (hợp đồng man-month, tháp nhân sự đông junior). Dùng AI càng giỏi càng tự cắt doanh thu mô hình cũ → giải quyết bằng cách đổi QHSX, không phải kìm LLSX.

**Đề cương:** `present/de-cuong-thuyet-trinh-gk.md` — 11 mục, 6 lăng kính (mâu thuẫn+LLSX/QHSX · bản chất-hiện tượng · nguyên nhân-nguyên cớ · lượng-chất · phủ định của phủ định · chung-riêng), có mục nói rõ **cố ý bỏ** 4 cặp phạm trù khác để ăn điểm CLO4.

⚠️ **Chưa có con số nào.** Toàn bộ số liệu còn ở dạng "cần thu thập" (§7). Không lên slide bất kỳ con số nào trước khi có nguồn.
⚠️ **Ranh giới bảo mật §7.3:** không đưa tên công ty/khách hàng/đơn giá/điều khoản hợp đồng lên slide khi chưa được duyệt.

**Rà lại v1 bằng bộ khí tài đầy đủ (2 nguyên lý → 3 quy luật → 6 cặp phạm trù):**
Chủ đề **gánh được 11/11** và **4/4 khối thầy liệt kê trong đề** — không chỗ nào gượng. Ba quy luật khớp ba câu hỏi khác nhau (*vì sao vận động · khi nào lật · đi về đâu*) và không giẫm chân nhau; đây là bằng chứng mạnh nhất cho thấy chọn đúng từ khoá.

**Hai chỗ v1 chấm sai, đã sửa:**
- `nội dung – hình thức` — v1 gạt vì tưởng trùng bản chất–hiện tượng. Không trùng: bản chất–hiện tượng dùng để **chẩn đoán**, nội dung–hình thức dùng để **kê đơn** (*hình thức lạc hậu kìm hãm nội dung* = chính luận điểm trung tâm). → đưa lên hàng cốt lõi.
- `khả năng – hiện thực` — v1 gạt vì nghĩ đã ngầm nằm trong lộ trình. Nó cho khung **nêu điều kiện**, đúng thứ CLO5 chấm, và là câu trả lời cho phản biện *"lấy gì đảm bảo"*. → đưa vào phần kiến nghị.
- Cả hai đều nằm trong danh sách **thầy nêu đích danh** trong đề → gạt là rủi ro không đáng.

**Hai khối bổ sung mới:**
- **Vật chất – Ý thức:** giải thích vì sao quản lý cấp trung chống đối — ý thức "đếm đầu người" là phản ánh đúng của tồn tại cũ, không phải thói bảo thủ. Thay quy kết đạo đức bằng giải thích khoa học, và tự sinh ra giải pháp: **đổi tồn tại (cách đo, KPI) chứ không đi thuyết phục**.
- **Nhận thức luận:** 1 slide phương pháp (khái niệm → phán đoán → suy luận) — rẻ, mà làm bài trông đúng như "dự án khoa học" đề yêu cầu.

Slide giãn 24 → **28**, có bảng map *khí tài → slide*. Note `triet` cần viết: 5 → **12**, chia 3 mức ưu tiên.

---

### 2026-09-20 (tối) — P16 ✅ Đề cương v3: xoay chủ đề + bám neo rubric

**Ba giả định ngầm của v1/v2 đều sai hết** — người dùng xác nhận: nhóm **trộn nhiều ngành** (không phải dân phần mềm) · **15–20 phút** (không phải 25–30) · **còn 1 tuần** (không kịp khảo sát). Đúng ba lỗi 🔴 T1/T2/T3 mà bộ lọc ④ Thực tế đã cảnh báo.

**Xoay chủ đề lên một tầng, giữ nguyên từ khoá #2 Việc làm:**
> *Khi AI tách năng suất khỏi thời gian: cách đo và trả công cho lao động tri thức — một mâu thuẫn chung, nhiều lời giải riêng.*

Mâu thuẫn cốt lõi (năng suất đổi nhưng vẫn đo theo thời gian) **vốn không phải chuyện riêng ngành phần mềm** — đúng với kế toán, kiểm toán, tư vấn, luật, marketing, thiết kế, hành chính. Nhờ vậy **nhóm trộn ngành từ điểm yếu thành điểm mạnh**: mỗi người một ngành một ca, và *cái chung – cái riêng – cái đơn nhất* thành **khung tổ chức của cả bài**.

Đổi này **gỡ luôn lỗi 🔴 P1**: giả định nền chuyển từ *"gia công VN bán man-month"* (hẹp, không nguồn) sang *"lao động tri thức đo theo thời gian"* (**quan sát trực tiếp được** ngay tại chỗ làm).

**Phát hiện đáng giá nhất — cột LLO trong rubric:**
- **CLO5 là mục duy nhất đòi LLO7 (Sáng tạo)** → "tính mới" phải dồn hết vào phần Hướng giải quyết, không rải đều. Nếu phần đó chỉ tóm tắt lại phân tích là mất 2.0đ.
- **CLO6 Hình thức chỉ đòi LLO 1–2–3** (Biết · Nhớ · Hiểu) → **2.0 điểm dễ nhất cả rubric**, chỉ cần slide sạch + đúng giờ. Nhóm nào bỏ là bỏ không.

**Bỏ hẳn khảo sát** → thay bằng **phiếu ca ngành 6 câu**, mỗi thành viên tự viết 1 trang về ngành mình, thu trong 2 ngày. Vẫn là dữ liệu sơ cấp, lại không chạm dữ liệu cá nhân của người thứ ba (gỡ luôn lỗi 🔴 L1). Câu 3 và 5 dùng để kiểm chính giả thuyết 🔬 *"quản lý cấp trung chống đối"*.

**Đề cương v3:** 15 slide, **mỗi slide neo sẵn CLO nào · lý thuyết nào · key word nào**. Phủ đủ 2 nguyên lý · 3 quy luật · 6 cặp phạm trù + 4/4 khối thầy nêu. Thêm §0 Điểm neo, §10 Bốn key word, §12 Bản rà 4 bộ lọc (P1–P7 · L1–L5 · H1–H4 · T1–T6 + checklist 9 việc còn lại).

⚠️ **Còn 3 việc 🔴 chưa gỡ:** H1 chưa chạy phương pháp thứ hai · L3 chưa tra Bộ luật Lao động · P7 nhóm phải tự rà lại §4 thay vì tin bảng chấm sao của AI.

---

### 2026-09-20 (khuya) — P16 · Chạy `truy-ban-chat` lên chính đề tài

Người dùng yêu cầu chốt 1 chủ đề, tạo file md mới hoàn chỉnh, và **chạy nhiều subagent quét từng khía cạnh rồi tổng hợp**. Việc này gỡ luôn lỗi 🔴 **H1** *("chưa chạy phương pháp thứ hai")* trong bản rà 4 bộ lọc.

**Nguồn mới:** người dùng đưa `anthropic.com/institute/econ-scenarios`. Đọc ra **3 tài liệu**, trong đó 2 PDF tải được. Con số đắt nhất cho môn này — tỷ trọng lao động **60% → 45,2%**, và nguyên văn *"All of the increase in GDP therefore accrues as capital income"*. Tức **LLSX–QHSX nói bằng số, bởi kinh tế gia chính thống**.
⚠️ Ba cấm kỵ đã xác minh: không trích trang web cho luận điểm **đo lường** và **entry-level** *(hai nội dung đó nằm ở PDF chính sách, tài liệu khác)*; **không được viết "Anthropic dự báo"** — tài liệu tự nói ba lần nó là **kịch bản, không phải dự báo**.

**Pha 1 bắt được tiền đề hỏng nằm ngay trong tiêu đề:** chữ *"không còn khớp"* giả định thước đo **từng** khớp. Phản đề: trả công theo thời gian **chưa bao giờ đo giá trị** — nó là **thoả hiệp phân bổ rủi ro** khi đầu ra không đo được. Điểm nghẽn dịch từ *"thước đo lạc hậu"* sang **"chưa quy kết được phần giá trị thuộc về ai, và chưa ai chịu rủi ro khi quy kết sai"**.

**Pha 2 — 8 lăng kính.** Năm chỗ **hội tụ qua các đường độc lập**: con số 60%→45,2% là **hiện tượng** không phải bản chất · **sở hữu công cụ** là mắt xích quyết định · AI là **tác nhân làm lộ** không phải nguyên nhân · giấu dùng AI là **hành vi hợp lý** do quan hệ phân phối sinh ra · và **hợp đề hai tầng** *(4 lăng kính, 4 ngôn ngữ, cùng kết luận)*.

**Chỗ chỏi nhau — đúng chỗ bản chất nằm.** `tbc-luong-chat` nghiêng **Khung A** *(khái niệm **Độ** đòi chất cũ phải thật sự vận hành)*, 7 cái còn lại nghiêng **B**. Giải bằng hợp đề: **B là mệnh đề về bản chất (S5, S8) · A là mệnh đề về Độ (S12)** — hai tầng, không phải hai lựa chọn. Bất đồng này **sinh ra kiến trúc bài**.
Một chỗ **chưa giải được**: AI **tập trung hoá** hay **phi tập trung hoá** tư liệu sản xuất — hai kịch bản ngược dấu, không lăng kính nào phân xử. Đưa lên S15 làm câu hỏi mở.

**Pha 3 — năm lỗi trong đề cương v3, mỗi slide trụ một lỗi:**
| Mục | Lỗi | Ai bắt |
|---|---|---|
| §4.1 S8 | Cặp *"AI ↔ chấm công"* **trượt phép thử tồn tại** | mâu thuẫn |
| §4.2 S5 | *"Thước đo dịch chuyển"* — **thước đo CHÍNH LÀ hình thức** → S5 chiếm chỗ S6 | nội dung–hình thức |
| §4.3 S7 | *"Nguyên nhân thật"* vẫn là **sự kiện kỹ thuật** = điều kiện | mâu thuẫn |
| §4.5 S13 | **Phủ định sai đối tượng** — vẽ *nghề* thay vì *thước đo phân phối* | phủ định |
| §3.5 §4.9 S10 | *"Ý thức lạc hậu"* vẫn là quy kết, chỉ đổi từ đạo đức sang nhận thức | xã hội |

Không chạy fan-out thì cả năm lỗi lên thẳng sân khấu, và **S7 đá S8, S5 đá S6 ngay trên slide**.

**Phát hiện riêng cho Việt Nam, dùng làm điểm chốt:**
> **Mỹ mất việc tri thức nhưng giữ được phần vốn. Việt Nam có thể mất việc mà không được phần vốn.**

Vì rent công nghệ chảy ra ngoài qua **phí thuê mô hình**, và không có kênh để người lao động VN tham gia sở hữu vốn AI → công cụ *"đánh thuế vốn bù cho lao động"* yếu hẳn vì **đối tượng đánh thuế không cư trú**. Cộng thêm: khu vực tri thức VN gần như **không có thương lượng tập thể** → không có chủ thể đàm phán quy tắc quy kết → phân phối rơi về **tương quan quyền lực**.

⚠️ **Vẫn chưa có một số liệu Việt Nam nào.** Mọi mệnh đề về VN là **giả thuyết cơ chế**. Phiếu ca ngành (8 câu, đã gộp từ 3 lăng kính đề xuất) là dữ liệu sơ cấp duy nhất, **chưa thu**.

---

### 2026-09-20 — P16 · Pha 4 kiểm nghiệm: bác 3 chỗ, và dịch trọng tâm bằng chứng cả bài

**Ba đính chính, đều nặng:**

| Đã viết sai | Thực tế |
|---|---|
| *"Không có một số liệu Việt Nam nào"* | **Có.** ITviec 2025, khảo sát **n=846**, thu 6–7/2025: **48,6%** dự định mở rộng đội IT *(thấp nhất từ 2021)* · **24,7%** nhóm hạn chế tuyển nêu lý do năng suất AI · **5,4%** tin hoàn toàn đầu ra AI |
| S8 dùng *"hai dấu ngược nhau −11,5% vs +33,6%"* làm bằng chứng | **Lập luận vòng tròn** — hai số nằm **trong cùng một mô hình**, là đầu ra của giả định. Đã thay bằng 3 chân đế quan sát thật |
| S7 trích *"0,30–0,45 log"* | **Vô nguồn** trong toàn bộ vật liệu. Đã bỏ |

**Trọng tâm bằng chứng dịch chỗ — đây mới là thay đổi lớn nhất.** Trước đó bài dồn trọng lượng vào **một tài liệu kịch bản mô hình hoá do chính hãng bán sản phẩm công bố**. Giờ đứng trên **ba nguồn quan sát thật**:
- **Humlum & Vestergaard (2025) NBER WP 33777** — Đan Mạch, **dữ liệu hành chính**, 25.000 LĐ: tiết kiệm ~3% thời gian, thu nhập và giờ công **null chính xác**, loại trừ hiệu ứng >2%
- **Canaries (2026), Stanford DEL** — Mỹ, **bảng lương ADP** tới 6/2026: nhóm 22–25 nghề phơi nhiễm cao **−19%**, doãng từ 15%; cơ chế **giảm tuyển** không phải sa thải
- **Lazear (2000) AER** — Safelite: lương giờ → trả theo sản phẩm, sản lượng/người **+44%**

> **Năng suất tăng lên đã đi đâu đó, và chỗ đó không phải là lương.**
> Đan Mạch có thương lượng lương **phi tập trung** — kênh chia phần **có tồn tại** — mà vẫn null. **Ống có, dòng chảy không đủ → vấn đề ở áp suất, không ở ống.**

**Chấm: 🟢 5 · 🟡 10 · 🔴 6 mệnh đề con + 1 kết luận bỏ trọn.**

**Ba lỗi phương pháp đã sửa trong file:**
1. **Đổi động từ mọi slide** — *"AI khiến…"* → *"trong các ca chúng tôi ghi nhận, xuất hiện cơ chế…"*. 5 ca n=1 chứng minh được **tồn tại**, không bao giờ chứng minh được **phổ biến**.
2. 🔴 **Bắt buộc gài "ca nghịch" vào phiếu** — nếu cả 5 người đều trả theo thời gian ở tổ chức bán man-day thì biến độc lập **không có biến thiên**, phiếu chỉ thu về 5 lần xác nhận. Tốn một cuộc gọi.
3. **Vách ngăn** giữa số kịch bản và chữ "Việt Nam".

**Câu hỏi mở bài không trả lời được, có thể là câu quan trọng nhất:** vì sao **Đan Mạch null mà Mỹ −19%**? Cùng công nghệ, hai thiết chế, hai kết quả. Nằm ở S15.

---

### 2026-09-20 — P16 · Pha 5 phản biện: ba đòn chí mạng, kiến trúc không vá được

**① S12 đòi đúng thứ cả bài nói là không có.** Chỉ số gãy thước cần **P90/P50 sản lượng CÁ NHÂN cùng bậc**, trong khi S7 nói *"đóng góp không quy kết được cho cá nhân"*, S8 nói *"không phép đo nào tách ra được phần của ai"*, S14 lùi về *"đo ở mức nhóm"*.
> Chỉ số cờ đầu (**CLO5 ⭐, mục duy nhất đòi LLO7**) chạy được **khi và chỉ khi điểm nghẽn trung tâm không tồn tại.**
Bồi thêm: chỉ số **mù với chính hiện tượng nó dựng ra để bắt** — AI nâng năng suất đều thì P90/P50 không đổi, mà Đan Mạch cho thấy mức lợi là **đại trà**.

**② Ba "chân đế quan sát được" ở S8 — không cái nào là quan sát.** (a) phân tích độ nhạy **là đầu ra mô hình** — tức đã bỏ cặp −11,5%/+33,6% vì vòng tròn rồi **thay bằng cặp số cũng từ mô hình đó**; (b) Canaries Fact 5 giữ thiết chế cố định, cho công nghệ biến thiên → chứng minh **AI CÓ hiệu lực nhân quả**, **chỉ ngược** hướng; (c) Đan Mạch vs Mỹ **so hai biến khác nhau** (thu nhập/giờ công vs số đầu việc) — hai nguồn thực ra **khớp nhau**.

**③ Bài có kiến trúc phân phối nhưng KHÔNG có con số nào về lượng của thứ đang được phân phối.** Cụm *"trừ khi bên bán có sức mặc cả"* là **chỗ bất khả bác bỏ thứ 5**. Câu *"năng suất tăng lên đã đi đâu đó"* **giả định luôn cái cần chứng minh** — nguồn chỉ có ~3% **tự báo**, thu nhập **null**, TFP **≤0,66%/thập kỷ**.

**Trả lời ba chỗ đã nghi:**
- **Hợp đề A/B là né việc phải chọn** — S2 đặt tiêu chuẩn cho A là *"lương tăng đúng bấy nhiêu"*, tức **đẳng thức chính xác** không quan hệ kinh tế nào đạt. **A bị loại bằng định nghĩa, không bằng dữ liệu.** Câu phân định ở phiếu **mất hết sức phân định trước khi phát**.
- **Đan Mạch null quay ra phá luận đề** — mức lợi nhỏ thì không có phần dôi để tranh chấp, và S14 đề nghị xây hệ quy kết–thẩm định–chia rủi ro để chia **một khoản bé hơn chi phí xây nó**.
- **Khách hàng bị cắt khỏi chỉnh thể** — S5 **tự liệt kê** *"khách ép giá"* rồi S8 vẽ chỉnh thể hai mặt. Nếu khách ép giá thành công thì phần dôi **chưa từng vào ống**, và nó giải thích Đan Mạch null **không kém luận đề của bài**.

**Ba lỗi thuần đã sửa ngay:** S9 vẫn dùng cặp số bị cấm ở S8 *(fix chưa hoàn tất)* · đếm sai trong bảng C1 *(🟡 11 không phải 10)* · S15 báo *"MỘT kết luận bị bỏ"* trong khi có **hai**.

**⏸️ Đang chờ quyết định.** Đề nghị: **tái cấu trúc theo bản hạ cấp**, không vá.
> Chưa ghi nhận điều chỉnh nào trên **biên tiền lương**; có ghi nhận trên **biên tuyển dụng**. Hình dạng đó tương thích với giả thuyết hợp đồng giao phần chênh lệch cho bên mua — **nhưng cũng tương thích với ba giả thuyết khác chưa loại trừ**: mức lợi thật còn nhỏ · khách hàng lấy qua cạnh tranh giá · độ trễ chưa lên sổ sách. **Dữ liệu hiện có không phân biệt được bốn giả thuyết này.**

Bài đổi từ *"biết phần dôi đi đâu"* sang *"chứng minh được nó không vào lương, và đây là bốn ứng viên cùng cách phân biệt"*. Câu bị bỏ sót — **phần dôi lớn bao nhiêu** — thành **câu hỏi trung tâm**.

---

### 2026-09-20 — P17 ✅ Chạy đủ 6 pha `truy-ban-chat` lên bài Anthropic *"Scenarios for Our Economic Future"*

**Đầu vào:** <https://www.anthropic.com/institute/econ-scenarios> (v1.0, 9/2026). Ba kịch bản Mỹ tới 2030 · tỷ trọng tư bản 40,6 → 43,9 → 54,8% · chốt *"thách thức không phải đạt tăng trưởng, mà là đảm bảo lợi ích được chia sẻ rộng rãi"*.

**11 agent, ~12–15 phút, model `opus`.** Pha 0 → 9 lăng kính song song → đối chất → `tbc-thuc-tien` → `tbc-phan-bien`.

#### Kết quả nội dung — đối tượng là HAI văn bản, không phải một

Phát hiện chính **không lăng kính nào dự tính**, và chỉ pha 4 tìm ra sau khi truy được **báo cáo kỹ thuật gốc** (Korinek, Jones, Sacher, Cotter, McCrory 2026): bài là **cặp văn bản** — paper + trang công bố — và **khoảng cách giữa hai tầng lặp bốn lần, luôn cùng một hướng**:

| Báo cáo kỹ thuật **CÓ** | Trang công bố |
|---|---|
| §4.5: nếu ε = 1 thay vì 3, *"wages would actually **fall**"* — substantial −0,4%, extreme −7,4% | *"average wages rise"* ở cả ba kịch bản. Không nhắc ε |
| footnote 14: bồi thường lao động nhận thức *"would consume **84 percent of the gains**"* | Không con số chi phí nào |
| *"**All of the increase in GDP** therefore accrues as capital income"* | Finding 4 không có câu này |
| *"the **median** respondent's answers are consistent with…"* | Cùng câu, cạnh đồ hoạ, đọc ra như đám đông bảo chứng |

Và cơ chế bị dịch sai: trang kể **câu chuyện giá cả** (*"tư bản hữu dụng hơn → cầu tăng → giá tăng"*), mô hình chạy **chuyển giao quỹ lương** (*"Automation transfers to capital the wage bill of the tasks it takes over"*).
→ **Bài không giấu số. Bài lọc mất ĐIỀU KIỆN sinh ra số, ở khâu dịch paper → trang phổ thông.**

#### ⚠️ Kết quả quy trình — quan trọng hơn kết quả nội dung

**Phân nửa kết luận của bộ lăng kính bị chính pha 4 + pha 5 bác bỏ.** Ghi lại vì đây là ground truth tốt nhất hiện có để sửa skill:

| Bị bác | Vì sao |
|---|---|
| **"5 hướng độc lập hội tụ"** | ⭐ **Lỗi quy trình, không phải lỗi agent.** Pha 0 phát biểu vấn đề thành *"chỉ ra bài đã tách rời phân phối khỏi sản xuất **NHƯ THẾ NÀO**"* rồi **nạp cho cả 9 lăng kính**. Câu hỏi chứa sẵn câu trả lời → "hội tụ" chỉ là một tiền đề nói lại 5 lần. Đúng lỗi **nguyên nhân thứ ba** trong `checklists.md` |
| "Tư bản tăng vì biến làm nó giảm đã bị loại" | Eq. 11 cho tỷ trọng lao động **tăng** khi `a > 2(1−ρ)` — mô hình *có* vùng đó. *Sống sót, sắc hơn:* ρ đặt ngoại sinh và **không nằm trong 5 nút gạt** |
| "σ < 1 thì kết luận đảo dấu" | σ **=0,5 thật** nhưng giả thuyết sai — lỗi phạm trù: áp trực giác CES tổng gộp vào mô hình task-based. Tham số chịu lực là **ε** |
| "Mô hình quên hiệu ứng cung lao động chéo" | **Có net-out.** 3 lăng kính hội tụ về một lỗ hổng **không tồn tại** |
| "Câu chốt không chủ ngữ" · "owners of capital bị xoá" · "người chịu thiệt không được gọi tên" | **Cả ba bị bác bằng chính văn bản.** Tao tự grep `NGUON.md` xác nhận |
| "Vùng trống 43,9→54,8" | Bài **có explorer liên tục 5 thanh trượt**. Hiện vật của việc chỉ đọc 3 kịch bản in sẵn, **không ai mở công cụ** |
| Toàn bộ nhánh Việt Nam | Áp **phép thử "bỏ đi"** của chính quy trình: xoá hết phân tích Anthropic → khuyến nghị VN **không đổi một mục nào**. Bộ lăng kính không sinh ra chúng, nó **trang trí** cho chúng |

**Bốn cấu trúc bất khả bác bỏ phải gỡ:** *"thêm vào / chỉ khai báo"* (thêm biến → "khung tiêu hoá được"; không thêm → "khai báo mà không tiêu hoá" — mọi kết quả đều xác nhận) · *"trung thực định nghĩa tập phản bác"* (cứu được, nhưng **chỉ khi luôn kèm điều kiện bác bỏ**) · *"thay người thiện chí hơn thì bảng lợi ích không đổi"* (vòng tròn, và bài **đã đổi thật** vì reviewer góp ý) · *"đỉnh giả"*.

**Phản biện cũng sai một chỗ** — cáo buộc 4 con số tái phân bổ *"không cộng ra 100 ⇒ artefact bóc HTML"*. Sai: đó là **sơ đồ luồng**, 59,7 + 0,7 + 39,6 = 100,0 ✓ và 59,7 + 0,7 + 1,8 = 62,2 ✓. Nó đếm *"2,5% displaced"* — nhãn luồng — như thành phần phân hoạch.

#### Số thật đã kiểm (không lấy từ bài)

Tỷ trọng lao động Mỹ phi nông nghiệp: 1980 ~63% · 2000 62,8% · 2011 56,0% · **2025 Q4 = 54,4%, thấp nhất chuỗi từ 1947** (BLS `PRS85006173`). **Hình dạng là bậc thang, không phải dốc đều** — phẳng 1980–2000, dốc mạnh 2000–2011 (~0,6 đ/năm, trùng khít cú sốc Trung Quốc + offshoring). ⇒ *"trôi ~0,1–0,15 đ/năm"* mà lăng kính tự đánh dấu CẦN KIỂM là **thấp hơn thực tế**; trung bình thật ~0,20.
Thất nghiệp 8/2026: U-3 **4,1%** · U-6 **7,7%** · LFPR **61,6%**. Thu ngân sách FY2025: TNCN 50,5% + payroll 33,6% ⇒ **chặn dưới ≥33,6%, chặn trên ≤84,1%** — **đừng trích "70–80%"**.
WGA/SAG-AFTRA 2023 và Alaska Permanent Fund Dividend: **cả hai có thật**, xác minh xong.

**Đang quan sát thấy:** tỷ trọng lao động giảm nhanh (95,999 → 93,446 trong ~3 quý) **trong khi U-3 đứng yên**. Đúng chữ ký *"vùng chuyển mà đèn báo không sáng"*. ⚠️ Vài quý là **nhiễu**, số đã bị điều chỉnh một lần (53,8 → 54,4). **Theo dõi hằng quý, không trích làm bằng chứng.**

**Đầu ra:** `vaults/triet/ca-kich-ban-kinh-te-ai-anthropic.md` (nhánh J #4, 🟡) + hub đã cập nhật. Độ tin cậy **🟡** — mọi con số từ báo cáo kỹ thuật đi qua **trích xuất tự động, chưa ai đọc PDF bằng mắt**.

---

### 2026-09-20 — P16 ✅ Deck 20 slide dựng xong

**Tái cấu trúc sau pha 5.** Ba đòn chí mạng làm sập kiến trúc cũ, không vá được. Luận đề hạ xuống mức bằng chứng thật chịu được:
> Dữ liệu nói rõ **một** điều: điều chỉnh **không** diễn ra trên tiền lương. Nó **không** nói được phần dôi lớn bao nhiêu và ai giữ nó. → **Bốn ứng viên H1–H4**, **hai phép đo phân biệt được**, chưa ai đo.

Bỏ hẳn khung A/B *(hoá ra là né việc phải chọn — A bị loại bằng định nghĩa, không bằng dữ liệu)*. Khách hàng vào lại chỉnh thể S8 thành **ba bên**. Câu bị bỏ sót — *phần dôi lớn bao nhiêu* — thành **trục chính**, và S12 đổi từ "chỉ số gãy thước" sang **cây bốn giả thuyết** — đây mới là chỗ ăn điểm LLO7.

**Đường dựng deck.** `python-pptx` **không có** trên máy và không được `pip install` → đường `.pptx` đóng; Marp cần Node → cũng đóng. Chốt **HTML/SVG → Chrome `--print-to-pdf`**, mọi mắt xích đều có sẵn.

| Sản phẩm | |
|---|---|
| `present/viec-lam-tri-thuc.pdf` | **20 trang** (15 slide + 5 dự phòng) · 960×540pt = 16:9 · 3,3 MB |
| `present/viec-lam-tri-thuc-notes.pdf` | kịch bản nói, 9 trang A4 |
| `present/slides/` | `index.html` · `style.css` · `notes.html` — sửa được bằng text editor |
| `present/img/` | 6 ảnh **PD/CC0** + biểu đồ + `NGUON.md` |
| `present/build.py` | tải ảnh · sinh biểu đồ · gọi Chrome |

**Hai bẫy đã né — ghi lại cho lần sau:**
1. **Font.** `Poppins` bản Google phủ **28/75** ký tự tiếng Việt; `Bebas` **0/75**. Và matplotlib tra tên `"Arial"` lại trúng `ARIALN.TTF` *(Arial Narrow, hỏng dấu)*. → **bắt buộc `FontProperties(fname=...)` đường dẫn tuyệt đối**. Đã dùng **Segoe UI** (100%).
2. **Wikimedia chặn theo nhịp.** UA chứa chữ `Bot` → **429 toàn bộ 11/11**. Gửi dồn → 429 ở 15/18. Phải dùng `Special:FilePath/...?width=1600` *(file gốc 8,4 MB timeout >120s)* + `sleep(2.5)`.

**Quyết định về ảnh AI — và nó là một luận điểm, không chỉ là quy tắc:** không dùng ảnh do AI sinh ra. Bài hỏi *"năng suất tăng lên đã đi đâu?"*; minh hoạ bằng ảnh AI là **tự trình diễn đúng cơ chế đang phê phán**. Slide B5 ghi thẳng: *"Toàn bộ hình là ảnh chụp thật, PD hoặc CC0. Không dùng ảnh do AI sinh ra."*

⚠️ **Còn lại, theo thứ tự giá trị:** gài **một ca nghịch** vào phiếu *(1 cuộc gọi — quyết định S11 có kiểm được không)* · phát **phiếu ca ngành 8 câu** · mở báo cáo gốc ITviec trích chính xác · mở PDF WP 2026-02 ghi số trang · đếm tay tin tuyển fresher theo quý · **tổng duyệt bấm giờ**.

---

### 2026-09-20 — P16 · Deck v2: bày từ khoá trước, rồi gỡ từng cái

Người dùng yêu cầu đổi cấu trúc để **có cái nhìn logic**: show keyword rồi mới phân tích từng cái.

**Tám từ khoá chịu lực** — rút từ chính nội dung bài, không bịa thêm:
① PHẦN DÔI · ② THỜI GIAN · ③ MỘT Ô · ④ NGUYÊN CỚ · ⑤ QUY KẾT · ⑥ QUYỀN HÃM · ⑦ KHOẢNG LỆCH · ⑧ KẾ THỪA

**S2 là bản đồ** — bày cả tám cùng lúc, mỗi cái một dòng nghĩa + số slide gỡ nó. Từ đó mỗi slide phân tích mang **chip từ khoá** + **dải 8 vạch** chỉ đang ở đâu.

**Chi tiết đắt nhất của cấu trúc này:** từ khoá ① **PHẦN DÔI quay lại ở S13** — dải hiện *"1 / 8 — QUAY LẠI"*. Cả bài khép về đúng câu hỏi nó mở ra, và người nghe **nhìn thấy** vòng khép đó chứ không phải tự ghép.

| Sản phẩm | |
|---|---|
| `viec-lam-tri-thuc-v2.pdf` · `-v2.pptx` | **21 slide** (16 + 5 dự phòng) · 16:9 · notes text thật |
| `slides/index-v2.html` | nguồn sửa được |
| `build_v2.py` · `make_pptx.ps1 -Ver v2` | dựng lại được |

Bản v1 giữ nguyên, không đụng.

---

### 2026-09-20 — P16 · Kịch bản nói v2 + một lỗi chỉ lộ ra khi đổi thứ tự slide

V2 đổi thứ tự slide nhưng **lời nói vẫn là chữ viết cho v1** — nên mọi câu trỏ chéo kiểu *"quay về câu hỏi ở slide hai"* đều **trỏ nhầm slide**. Không script nào báo lỗi: file vẫn dựng, PDF vẫn ra, chỉ có người trình bày đứng trên bục nói sai số.

**Chín chỗ, nằm ở hai đường sinh notes khác nhau** — đây mới là chỗ dễ sót:

| Đường | Nguồn | Chỗ lệch |
|---|---|---|
| `build_notes_v2.py` → `notes-v2.html` → PDF | `slides/notes.html` *(kịch bản viết tay)* | S3 `S14`→`S15` · S7 `slide hai`→`ba`, `slide 5`→`6` · S9 `slide năm`→`sáu`, `slide sáu`→`bảy` |
| `build_v2.py` → `png-v2/notes.txt` → **.pptx** | mục **Lời nói** trong file md | S7 `slide hai`→`ba` · S9 `slide năm`→`sáu`, `slide sáu`→`bảy` · S15 `slide hai`→`ba` |

Hai file nguồn có chữ **khác nhau**, nên vá một bên là còn sót bên kia. Bản .pptx có thêm một chỗ (*"trả lời vội ở slide hai"* ở S15) mà bản HTML không có.

**Ba điều rút ra:**

1. **Vá ở script sinh, không vá ở file ra.** Bảng `SUA_THAM_CHIEU` nằm trong cả `build_notes_v2.py` và `build_v2.py`, có `assert cu in t` — chạy lại là tự vá, và nếu chữ nguồn đổi thì **assert nổ** chứ không lặng lẽ bỏ qua.
2. **Thứ tự thay chuỗi là bẫy thật.** Ở S9 phải đổi `slide sáu`→`bảy` **trước** `slide năm`→`sáu`, không thì lần sau ăn vào chính chuỗi lần trước vừa tạo. Vì vậy neo dùng cụm dài (`ống dẫn ở slide sáu vẽ sai`) chứ không dùng `slide sáu` trần.
3. **Để yên số slide giáo trình.** `slide 87` · `93` · `89` · `112` là trang giáo trình, không phải slide của deck. Grep máy móc sẽ đổi nhầm cả bốn.

**Đã kiểm:** PDF 10 trang · 16 khối đúng chip · 21/21 slide có ghi chú · đọc ngược XML trong `.pptx` (`ppt/notesSlides/*.xml`) xác nhận chữ đã sửa nằm trong file.

⚠️ Console PowerShell in ra `kÃ½ tá»±` — **lỗi hiển thị của console, không phải lỗi file**. Kiểm nội dung tiếng Việt luôn phải bằng Python.

---

### 2026-09-20 — P16 · Deck v3: nhìn vào phải hiểu, không cần người nói

Phản hồi của người dùng: *"Slide hơi ít chữ quá mới nhìn vào tao chưa hiểu gì… hạn chế viết tắt, hạn chế italic note, viết keyword rõ ràng."*

**Gốc của lỗi** — không phải lỗi thiết kế, là lỗi chuyển nguồn. File `de-tai-viec-lam-tri-thuc.md` có sẵn mục **Chữ trên slide** đầy đủ cho từng slide. Khi dựng deck, phần chữ đó **bị vứt đi để lấy chỗ cho sơ đồ**. Kết quả: lập luận nằm hết trong kịch bản nói, slide chỉ còn tiêu đề + hình. Đếm thật: 8 slide lăng kính chỉ **28–42 chữ**.

**V3 trả phần chữ đó về**, đặt dưới sơ đồ thành 2–3 cột có nhãn. Chữ mỗi slide: **150 → 300**.

**Ba việc v3 làm:**

| | Việc | Cách làm |
|---|---|---|
| 1 | Trả chữ về | Bảng `GIAI` trong `build_v3.py` — mỗi slide 2–3 ô có nhãn chữ hoa + 1 khối **tự khai** |
| 2 | Bỏ viết tắt | Bảng `BO_VIET_TAT` — `LLSX–QHSX` · `TFP` · `JD` · `n=846` · `man-day` · `P90/P50` · `null` → viết đủ chữ |
| 3 | Bỏ chữ nghiêng | Xoá sạch thẻ `<em>` (14 chỗ), thay bằng nhãn chữ hoa có màu |

**Tên từ khoá viết lại cho đứng một mình cũng hiểu:**

`PHẦN DÔI` → **PHẦN NĂNG SUẤT DÔI RA** · `THỜI GIAN` → **TRẢ THEO THỜI GIAN** · `MỘT Ô` → **CHỈ MỘT Ô CHO LAO ĐỘNG** · `NGUYÊN CỚ` → **NGUYÊN CỚ KHÁC NGUYÊN NHÂN** · `QUY KẾT` → **QUY KẾT PHẦN GIÁ TRỊ** · `KHOẢNG LỆCH` → **KHOẢNG LỆCH HAI ĐẦU HỢP ĐỒNG** · `KẾ THỪA` → **CÁI MỚI KẾ THỪA GÌ**

**Bốn lỗi bố cục chỉ lộ ra khi render — script không bắt được cái nào:**

1. **`width:100%` cho sơ đồ làm vỡ slide xếp ngang.** S14 có `.than` hướng `row`; sơ đồ ăn hết bề ngang, ép cột ảnh còn một sợi chữ dọc. ⇒ dùng `max-width` chứ không `width`.
2. **`.than{flex:1}` nuốt chỗ trống rồi đẩy khối chữ xuống đè chân slide.** Bản v2 không có khối chữ nên không lộ. ⇒ `flex:0 1 auto` + `justify-content:flex-start`.
3. **Dải chỉ vị trí lấy mốc sai ở slide có ảnh nền.** Ảnh nền bọc thêm lớp `.tren{position:relative}` nên `top:30px` tính từ `.tren`, không từ `section` → đè lên tiêu đề. ⇒ `section.v3 .tren > .dai-tk{top:-36px}`.
4. **Dòng chữ cuối trong sơ đồ bị cụt chân chữ** — SVG cắt theo `viewBox`, chữ sát đáy mất phần dưới. ⇒ nới đáy **+16 đơn vị cho cả 10 sơ đồ**, chỉ thêm khoảng trắng.

**Chỗ chữ thêm vào bị lặp với sơ đồ thì phải bỏ bớt, không phải thêm nữa.** S8 có ô cảnh báo cũ trùng khối tự khai → xoá. S15 có sẵn việc số 0 + ba việc + hai ràng buộc **ở trong sơ đồ** → khối chữ chỉ giữ phần sơ đồ KHÔNG có.

**Một lỗ thật của bài được vá nhân tiện:** đề GK hỏi thẳng *"đơn vị nào sẽ áp dụng?"* mà cả v1 lẫn v2 **không có một danh xưng nào** — grep `C&B` 0, `Công đoàn` 0, `PMO` 0. S15 nay trả lời: ban giám đốc quyết · phòng nhân sự dựng thước đo · quản lý dự án chạy thí điểm · công đoàn cơ sở giám sát, và **bắt đầu ở hợp đồng trọn gói** vì ở đó phần dôi lộ ra trong nội bộ ngay kỳ đầu.

| Sản phẩm | |
|---|---|
| `viec-lam-tri-thuc-v3.pdf` · `-v3.pptx` | 21 slide · 16:9 · ghi chú text thật |
| `viec-lam-tri-thuc-v3-notes.pdf` | 10 trang A4 — lời nói giữ nguyên, thứ tự slide y hệt v2 |
| `slides/index-v3.html` · `build_v3.py` · `build_notes_v3.py` | dựng lại được |

Bản v1 và v2 giữ nguyên, không đụng.

⚠️ **Bẫy máy tái phát 3 lần trong phiên này:** heredoc `<<'EOF'` qua Bash tool **ăn mất dấu `\`** — `"\n"` thành xuống dòng thật, Python báo `unterminated string literal`. Nội dung có dấu thoát thì dùng Write/Edit, đừng dùng heredoc.

---

### 2026-09-20 — P16 · Chia phần cho bảy người

Nhóm là **7 người**, không phải 5 như đề cương ban đầu. Đề cương đã có sẵn dòng dặn *"nhiều hơn thì tách S9 và S10 cho 2 người"* — nhưng đó là số slide của bản v1, ở v3 là **S10 và S11**.

**Cách chia — cắt theo đơn vị lập luận, không cắt theo số slide chia đều:**

| Người | Slide v3 | Nói về | Giây |
|---|---|---|---|
| N1 | S1 · S2 · S3 | Mở đề · bản đồ tám từ khoá · câu hỏi của bài | 2'45" |
| N2 | S4 · S5 · S6 | Phương pháp · khung ba quy luật · bản chất–hiện tượng | 2'45" |
| N3 | S7 · S8 | Nội dung–hình thức · nguyên cớ khác nguyên nhân | 2'45" |
| N4 | S9 · S10 | Chỉnh thể ba bên · số liệu kịch bản | 3'00" |
| N5 | S11 · S12 | Quyền hãm · khoảng lệch hai đầu hợp đồng | 2'15" |
| N6 | S13 · S14 | Bốn ứng viên H1–H4 · phủ định của phủ định | 3'00" |
| N7 | S15 · S16 | Kiến nghị · chốt · điều phối hỏi đáp | 2'30" |

**Tổng 19'00" + ~1' chuyển người = sát trần 20 phút.** Đây là rủi ro thật của việc chia 7 người: 6 lần đổi vai ăn gần một phút, mà mạch bài lại là một chuỗi bắc cầu S3 → S13.

**Ba điều đã neo lại trong `build_notes_v3.py` để không trôi:**

1. **Mốc giây gắn thẳng vào từng khối kịch bản** — `N4 · 105 giây · ⭐⭐ · …`. Người nói tự bấm giờ được, không cần nhìn bảng riêng.
2. **Thứ tự cắt khi quá giờ**: S1 xuống 20 giây → S5 xuống 35 → S12 xuống 45. **Không được cắt S6–S9 và S13–S15** — đề cương ghi đó là 4.0/10 điểm *(đề cương đánh số theo v1 là S5–S8 và S12–S14, đã quy đổi sang v3)*.
3. **Luật hỏi chéo**: mỗi người đỡ câu thuộc slide mình; câu vắt qua nhiều phần thì N4 đỡ, vì sơ đồ ba bên ở S9 là chỗ cả bài quy về. Ai cũng phải vẽ lại được sơ đồ đó.

**Bài có neo cứng số 5 ở bốn chỗ, đã sửa hết:** `de-tai-viec-lam-tri-thuc.md` *(2 chỗ)* · `slides/index.html` · `slides/index-v2.html` · `slides/notes.html`. Câu *"nếu cả 5 người đều trả theo thời gian thì phiếu chỉ thu về 5 lần xác nhận"* nay là **7**. Bảng ca ngành ở S4 nới từ 4 lên **7 dòng** (6 ngành + 1 ca nghịch).

May là lập luận dùng chữ **"N ngành"** biến chứ không viết cứng "5 ngành", nên đổi sĩ số không phải viết lại phần nào.

⚠️ **Hệ quả cần nhớ:** 7 người là 7 phiếu ca ngành, và **vẫn bắt buộc ít nhất một ca nghịch** *(ăn theo gói / sản phẩm / hoa hồng)*. Bảy ca cùng trả theo thời gian thì biến độc lập không có biến thiên — phiếu chỉ thu về bảy lần xác nhận, kết luận #7 tụt xuống 🔴.

---

## ▶️ RESUME — đọc mục này trước tiên khi mở lại

> ✅ **P15 đã push xong 2026-09-13.** Working tree sạch, remote `origin/main` đã có đủ 3 commit.

### Làm ngay khi mở lại — theo thứ tự

**1. Đã chốt 2026-09-13:** PDF 14.8 MB **commit thẳng vào repo**, không gitignore (`.gitattributes` đã khai `*.pdf binary`). Git identity đặt ở level repo vì máy này không có `~/.gitconfig`.

**2. Chạy `npm run check` khi về máy có Node** — con số 271 link gãy hiện tại đếm bằng script Python tạm, **chưa đối chiếu với tooling thật của kho**. 31 link gãy ở vault cũ có thể chỉ là chênh lệch cách đếm.

### Việc dở của P15

| Việc | Ghi chú |
|---|---|
| 2 note nhánh E `triet` đang là link gãy | `thuc-tien` (E#3) · `hai-giai-doan-nhan-thuc` (E#5 — đã bàn kỹ: ma trận 2×2 kinh nghiệm/giáo điều, slide 133–136) |
| Chạy thử skill `truy-ban-chat` | Ném ví dụ **con trâu** vào — đã có sẵn phân tích đúng trong hội thoại làm **ground truth**. Nếu nó không tự tìm ra *"bản tin là nguyên cớ"* và không chấm 🔴 thì phải sửa agent |
| `note.md` ở thư mục gốc | Sơ đồ ASCII bị vỡ khi paste, chưa sửa. Bản đúng nằm trong `vaults/triet/the-gioi-quan.md` |
| 11 agent đang để `model: opus` | Chạy 5–8 agent Opus song song khá tốn. Thấy nặng thì sửa 1 dòng/file sang `sonnet` |
| Giáo trình 2021 | Chưa tải được. Kiếm link khác hoặc tự tải rồi bỏ vào `vaults/triet/slides/` |

### Việc dở của P17 — xếp theo tỷ lệ sức-bác-bỏ / chi phí

| # | Việc | Chi phí | Bác bỏ được gì |
|---|---|---|---|
| 1 | **Mở explorer của Anthropic**, đặt Productivity = 10×+ với Capabilities/Adoption thấp | **5 phút, miễn phí** | Lý thuyết nói tỷ trọng lao động tăng khi `a > 2(1−ρ)`. Xuống dưới 40,0 → mô hình **không** bị cài. Không bao giờ xuống → explorer đã **chặn** vùng đổi dấu. **Hai kết quả đều mang thông tin** |
| 2 | **Đọc trọn PDF báo cáo kỹ thuật bằng mắt** — file đã tải về `tool-results/webfetch-1789880562175-05mla4.pdf` | 2–3 giờ | 6 con số đang gánh gần hết kết luận (σ=0,5 · ρ=0,50/0,25/0 · ε=3 + bảng ε=1 · μ · footnote 14 · núm độ cứng lương) **đều đi qua trích xuất tự động** |
| 3 | Đối chứng quốc gia tỷ trọng lao động 2015–2026: Mỹ vs Đức/Đan Mạch/Nhật/Hàn *(AMECO, OECD, EU-KLEMS)* | 1–2 ngày | Phép kiểm **duy nhất** tách được "công nghệ" khỏi "thể chế" |
| 4 | Kiểm artefact đo lường *(Karabarbounis, NBER w31854)* | 2 giờ đọc | ~1/3 mức giảm tỷ trọng lao động quy cho **cách BLS phân bổ thu nhập tự doanh**. >50% biến mất → nền móng của 3 lăng kính hạ cấp cùng lúc |
| 5 | Corpus đối chứng thể loại: chạy 3 chỉ số ngữ pháp trên OECD/IMF/CBO/ILO | nửa ngày | Cùng mẫu → lập luận "đảo ngược thể thức" chỉ là **quy ước thể loại**, phải rút khỏi note |

### 🔧 Sửa skill `truy-ban-chat` — P17 cho ra ground truth

Lỗi cấu trúc P17 phát hiện, **chưa sửa**:

1. ⭐ **Pha 0 nạp kết luận cho cả 9 lăng kính.** Phải bắt `tbc-dat-van-de` phát biểu vấn đề ở dạng **câu hỏi lưỡng phân** (*"có hay không"*) thay vì *"như thế nào"*. Cân nhắc: cho **1 lăng kính chạy mù** với pha 0 làm nhóm đối chứng.
2. **Không agent nào mở công cụ / đọc nguồn cấp 1.** 9/9 lăng kính chỉ có `Read · Grep · Glob`; chỉ `tbc-thuc-tien` có web — và nó là agent **duy nhất** tìm ra báo cáo kỹ thuật, tức phát hiện lớn nhất. Cân nhắc cấp web cho ít nhất 1 lăng kính pha 2.
3. **Thiếu lớp đối chứng thể loại.** Không ai hỏi *"đặc điểm này có phải chuẩn mực của mọi mô hình kịch bản vĩ mô không?"* — CBO bị **luật bắt buộc** giả định luật hiện hành; counterfactual *"so với không có X"* là **định nghĩa** của ước lượng tác động. Nên thêm bước này vào `checklists.md`.
4. **`tbc-phan-bien` mạnh nhất trong bộ** — 7 đòn, 4 chí mạng, và tự khai phần yếu của chính nó. Nhưng nó cũng **tự phạm đúng lỗi nó đang bắt** (cộng sai sơ đồ luồng). ⇒ **kết quả phản biện cũng phải kiểm, không nhận thẳng.**

⚠️ **Nhắc lại:** sửa ở `<repo>/.claude/` xong **phải copy sang `~/.claude/`**, nếu không hai bên lệch — và nhớ chạy lại `python app-bien-chung/build.py`.

### ⚠️ Hai cái bẫy của máy này

1. **Không có Node.js** → `npm run check` / `npm test` / `npm start` đều chết. Muốn chạy web app phải cài Node trước.
2. **PowerShell 5.1 đọc UTF-8 sai** → kiểm nội dung tiếng Việt **phải dùng Python**. Dùng `Get-Content` sẽ ra `ChÃ¢n lÃ½` và báo lỗi giả.

---

## ▶️ Backlog cũ (từ P14, vẫn còn giá trị)

**Kế hoạch dựng kho đã xong 50/50.** Việc tiếp theo là *dùng* và *bồi đắp*, theo thứ tự giá trị giảm dần:

1. **Chạy thử web app** — `cd app && npm start` → http://localhost:5173. Xem tab 🌉 Liên môn, bật *"chỉ cạnh liên môn"*.
2. **Quyết định public hay private** — repo đang PUBLIC. Đổi: `gh repo edit haihpse150218/My-second-braind --visibility private`
3. **Viết 3 note gỡ được nhiều link gãy nhất:** `chain-rule` (5 note đang chờ) → `dao-ham-rieng` (3) → `naive-bayes` (3). Gỡ 11/35 link gãy. Xem [[hub/nguon-chua-xu-ly]] mục 4.
4. **Chưng cất `_inbox/`** — bắt đầu từ `vaults/ivp/_inbox/ivp-tom-tat-lectures.md` (bảng thuật ngữ L0–L12, mỗi dòng ≈ 1 note, tách nhanh nhất). Quy trình 8 bước ở [[hub/nguon-chua-xu-ly]] mục 5. Ước tính ~57 note sẽ sinh ra.
5. **Soát lại 47 note 🟡 của `ml`** — vault duy nhất còn 0% ✅. Cách kiểm tra: đọc mục `💡 Ý chính` rồi gấp lại giải thích bằng lời mình.

**Lệnh hay dùng:**
```bash
cd app
npm start                                       # web app
npm run check                                   # sức khoẻ toàn kho
npm run build                                   # đóng gói dist/
node scripts/migrate-frontmatter.mjs ml --reorder --dry-run   # sau khi sửa lộ trình trong hub

cd ..                                           # đồng bộ GitHub
git add -A && git commit -m "..." && git push
```

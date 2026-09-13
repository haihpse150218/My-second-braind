# 📌 PROGRESS — Second Brain Tổng Hợp

**Cập nhật lần cuối:** 2026-09-13
**Bước đang làm:** — (P15 đã commit + push xong)
**Tiến độ:** ✅ 61/61 bước cũ · ✅ P15 xong (trừ 15.7 ❌ không tải được giáo trình)
**Repo:** https://github.com/haihpse150218/My-second-braind (`main`)
**🌐 Web live:** https://haihpse150218.github.io/My-second-braind/

**Kho hiện tại:** **353 note** · **7 vault** · 8 project · 271 link gãy *(xem P15 — cố ý, là lộ trình đặt sẵn)*

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

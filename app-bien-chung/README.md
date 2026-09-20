# ⚖️ Bàn biện chứng — pipeline xét duyệt có giám sát

Biến **11 điểm neo của phép biện chứng duy vật** thành một pipeline chạy được trên vấn đề thật, có sơ đồ để nhìn, và **Claude chạy ngay bên dưới — hoàn toàn local**.

---

## Hai chế độ

| | **Chế độ tự động** ⭐ | Chế độ copy tay |
|---|---|---|
| Mở bằng | `run.bat` *(hoặc `python serve.py`)* → http://127.0.0.1:8787 | double-click `index.html` |
| Claude | **tự chạy** qua `claude` CLI trên máy | tự copy prompt sang Claude rồi dán kết quả về |
| Cần gì | Python 3 + `claude` CLI đã đăng nhập | không cần gì |

Chế độ tự động **không cần API key**: nó gọi lệnh `claude` đã đăng nhập sẵn trên máy này.

---

## Luồng chạy

```
 Nhập VẤN ĐỀ (hiện tượng trần, đừng đưa sẵn kết luận)
        ↓
 Tick ô ✓ bên trái các node muốn chạy
        ↓
 ▶ Chạy pipeline  ──►  pha 0 → 1 → 2 → 3 → 4 → 5
                        mỗi pha chạy song song (tối đa 3 lăng kính cùng lúc)
                        pha sau nhận kết quả các pha trước làm đầu vào đối chất
        ↓
 Node đổi màu ngay trên sơ đồ:  ◻ chờ → ◉ đang chạy (nhấp nháy) → 🟢🟡🔴 / ✗
        ↓
 Đọc lại từng kết quả · tự chấm lại · ghi chú
        ↓
 Xuất .md
```

**Mặc định chọn 10 node**: pha 0, hai nguyên lý, 3 lăng kính lõi (bản chất · nhân quả · mâu thuẫn), 2 quy luật còn lại, kiểm nghiệm, phản biện. Pha 2 còn 3 lăng kính nữa và 1 lăng kính bổ trợ — **tick thêm khi câu hỏi cần**, đừng bật hết: chạy thừa là hình thức chủ nghĩa.

---

## Chi phí & thời gian thật

Đo trên máy này (model `sonnet`, một lăng kính, vấn đề ngắn):

```
tbc-nhan-qua   66.8 giây   $0.197
```

→ Pipeline mặc định 10 lăng kính ≈ **$1.5–2.5** và **3–6 phút** (3 luồng song song). Chọn `opus` thì sâu hơn nhưng đắt hơn đáng kể. Cost tích luỹ hiện ngay trên thanh công cụ.

---

## Kiến trúc

```
.claude/agents/tbc-*.md ──┐
                          ├── build.py ──► data.js ──► index.html ◄── fetch /api/run ──► serve.py ──► claude CLI
vaults/triet/*.md       ──┘                                                                (local, 127.0.0.1)
```

| File | Việc |
|---|---|
| `index.html` | App: sơ đồ SVG 6 pha, panel lăng kính, chấm điểm, xuất báo cáo |
| `data.js` | **Tự sinh** — 15 node + system prompt nguyên văn từ file agent |
| `build.py` | `python build.py` — sinh lại `data.js` sau khi sửa agent hoặc note |
| `serve.py` | Cầu nối local: `POST /api/run` → gọi `claude` → trả văn bản |
| `run.bat` | Double-click: bật server + mở trình duyệt |

**System prompt trong app = nguyên văn file agent**, nên app và Claude Code không bao giờ lệch nhau. Sửa agent xong nhớ chạy lại `build.py`.

---

## Ranh giới an toàn (cố ý thiết kế như vậy)

- `serve.py` **chỉ bind `127.0.0.1`**, từ chối mọi request có `Host`/`Origin` không phải localhost. Không mở ra mạng.
- **Không có API key ở đâu cả** — dùng `claude` CLI đã đăng nhập. Không có gì bí mật nằm trong repo.
- Claude chạy với `--allowedTools ""`: **không đọc/ghi file, không chạy lệnh**. Mỗi lăng kính chỉ nhận chữ và trả chữ.
- `--no-session-persistence`: không lưu hội thoại ra đĩa.
- Kết quả nằm trong `localStorage` của trình duyệt. Đổi máy/trình duyệt hoặc xoá site data là mất → muốn giữ thì **Xuất .md**.

---

## ⚠️ Máy tự chấm chỉ là gợi ý

App đọc dòng *“Độ chắc: cao/vừa/thấp”* trong output rồi tự gắn 🟢🟡🔴. Đó là **lăng kính tự đánh giá chính nó** — không phải kiểm nghiệm thực tiễn. Điểm đó chỉ để nhìn cho nhanh; muốn dùng làm căn cứ thì phải tự đọc, tự chấm lại, và chạy `tbc-thuc-tien` + `tbc-phan-bien`.

Bốn bộ lọc (**Phản biện · Pháp lý · Hệ thống · Thực tế**) là **checklist nhắc việc**, không phải bộ kiểm tự động — xem `../vaults/triet/bon-bo-loc-kiem-ket-qua-ai.md`. Phần pháp lý chỉ nêu nhóm vấn đề cần kiểm, **không phải tư vấn pháp lý**; quyết định pháp lý cần người có thẩm quyền chuyên môn duyệt.

> Slide 65: *“Ta hiểu AI đang làm gì, nhưng AI thì không hiểu nó đang làm gì.”* — người bấm nút là người chịu trách nhiệm.

---

## Liên quan

- Trang neo 11 món: `../vaults/triet/diem-neo-11-noi-dung.md`
- Bốn bộ lọc AI: `../vaults/triet/bon-bo-loc-kiem-ket-qua-ai.md`
- Skill chạy trong Claude Code: `../.claude/skills/truy-ban-chat/SKILL.md` — cùng bộ 15 agent, chạy song song và tự đối chất thay vì bấm tay.

---
name: truy-ban-chat
description: Soi một hiện tượng bất kỳ bằng bộ công cụ phép biện chứng duy vật để truy ra BẢN CHẤT và QUY LUẬT bên dưới nó. Dùng khi cần phân tích sâu một sự việc, kiểm tra một chuỗi lập luận nghe có vẻ hợp lý, truy nguyên nhân thật thay vì nguyên cớ bề mặt, dự báo xu hướng, hoặc quyết định xem một kết luận đã đủ tư cách làm căn cứ hành động chưa. Chạy nhiều agent song song — mỗi agent một lăng kính — rồi đối chất, kiểm nghiệm bằng thực tiễn và chấm độ tin cậy.
---

# Truy bản chất

> **Mục tiêu duy nhất:** đi từ **hiện tượng** (cái bên ngoài, dễ thay đổi, ai cũng thấy) tới **bản chất** (cái bên trong, ổn định, quyết định) — và từ bản chất rút ra **quy luật**.
>
> *"Nếu bản chất và hiện tượng cùng là một, thì khoa học trở nên thừa."* — slide 87

Nguồn: `vaults/triet/slides/triet-hoc-mac-lenin-dang-hoang-vu.pdf` (232 slide, TS. Đặng Hoàng Vũ) + giáo trình Triết học Mác – Lênin không chuyên, NXB Chính trị Quốc gia Sự thật, 2021.

---

## Bốn nguyên tắc nền — vi phạm là hỏng cả quy trình

**① Đặt sai vấn đề thì hết cửa.** *"Nhận thức đúng thì hành động **có đúng, có sai**; nhận thức sai thì hành động **không thể đúng**!"* (slide 121, nhắc lại 123). Quan hệ này **bất đối xứng** — đặt đúng còn cửa sai, đặt sai thì không còn cửa đúng. Vì vậy **Pha 1 là pha có đòn bẩy cao nhất**, không được làm qua loa.

**② Bản chất ít khi lộ ra.** *"Muốn nhận thức bản chất phải thông qua xem xét nhiều, thậm chí rất nhiều hiện tượng để suy đoán"* (slide 88). **Một ca đơn lẻ không bao giờ đủ.** Nếu chỉ có một quan sát, kết quả tối đa đạt được là 🔴.

**③ Hợp lý ≠ đúng.** Một chuỗi lập luận trơn tru vẫn chỉ là **giả thuyết**. Chỉ thực tiễn phán xử được: *"Hãy nhìn kết quả họ làm, đừng nghe những gì họ nói!"* (slide 131).

**④ Chân lý luôn cụ thể.** *"Không có khách thể cụ thể thì không bàn đúng/sai"* (slide 139). Mọi kết luận phải kèm **điều kiện áp dụng** — đúng thời điểm, đúng nơi, đúng chủ thể. Kết luận không có điều kiện = giáo điều.

---

## Quy trình 5 pha

### Pha 1 — ĐẶT VẤN ĐỀ *(gọi `tbc-dat-van-de`, chạy MỘT MÌNH trước tất cả)* ⭐

**Đây là pha quan trọng nhất. Không bao giờ bỏ qua, không bao giờ gộp vào pha sau.**

> *"Khoa học đi tìm câu trả lời đúng! **Triết học đi tìm CÂU HỎI ĐÚNG!**"* (slide 7)

Output của pha này là **đầu vào cho mọi agent còn lại**. Agent `tbc-dat-van-de` sẽ:

1. Tách **quan sát / suy luận / kết luận** mà người dùng đang trộn làm một
2. Bới ra **tiền đề ngầm** trong câu hỏi — nhiều câu hỏi đã cài sẵn kết luận
3. Chạy **phép thử đảo chiều** cho mọi mệnh đề `A → B`
4. Chốt **khách thể vs đối tượng** (slide 127)
5. Chốt **toạ độ**: đúng thời điểm · đúng nơi · đúng chủ thể (slide 139)
6. Tìm **ĐIỂM NGHẼN** — khâu mà gỡ được thì mọi khâu khác thông
7. **Phát biểu lại vấn đề**

#### Phép thử đảo chiều — dùng thường xuyên nhất

> **Trời mưa thì đường ướt. Nhưng đường ướt thì chưa chắc do trời mưa.**

`A → B` **không** cho phép suy `B → A`. Thấy B rồi kết luận A là **lỗi khẳng định hậu kiện**.
Cách chạy: với mỗi `A → B`, liệt kê **ít nhất 2 nguyên nhân khác cũng cho ra B`.

⚠️ Khác với lỗi *"gà không gáy thì trời vẫn sáng"* (post hoc — sai ở **thứ tự thời gian**). Đảo chiều sai ở **hướng suy luận**. Hai lỗi khác nhau, kiểm cả hai.

⚠️ Nếu người dùng đưa sẵn một chuỗi nhân quả, **không nhận chuỗi đó làm đầu vào**. Đầu vào là **hiện tượng trần**; chuỗi kia là **một giả thuyết cần kiểm**.

### Pha 2 — Fan out lăng kính *(gọi agent song song, một message nhiều tool call)*

**Luôn chạy — 3 agent lõi:**

| Agent | Rút ra gì |
|---|---|
| `tbc-hien-tuong` | Đâu là vỏ, đâu là lõi |
| `tbc-nhan-qua` | Tách nguyên nhân / điều kiện / nguyên cớ |
| `tbc-mau-thuan` | Động lực bên trong — **quy luật hạt nhân** |

**Chạy thêm theo loại câu hỏi — chọn 1–4:**

| Câu hỏi của người dùng nghe như | Gọi thêm |
|---|---|
| *"Có phải quy luật không? Hay chỉ trùng hợp?"* | `tbc-tat-nhien` |
| *"Khi nào thì nó đổ / bùng / lật?"* | `tbc-luong-chat` |
| *"Rồi nó sẽ đi về đâu?"* | `tbc-phu-dinh` |
| *"Chuyện này có phổ biến không? Áp chỗ khác được không?"* | `tbc-chung-rieng` |
| *"Nó dính với cái gì? Bỏ sót yếu tố nào?"* | `tbc-toan-dien` |
| *"Nó đang đi lên hay đi xuống? Đổi chất hay chỉ to hơn?"* | `tbc-phat-trien` |
| *"Lỗi ở ruột hay ở khung? Có nên tái cấu trúc không?"* | `tbc-noi-dung-hinh-thuc` |
| Có kế hoạch, dự báo, cam kết, con số hứa hẹn | `tbc-kha-nang` |
| Vấn đề xã hội, kinh tế, chính sách, tổ chức, con người | `tbc-xa-hoi` |

> 🔑 **Không chạy hết 15 agent cho mọi câu hỏi.** Một ca điển hình dùng **5–8 agent**: `tbc-dat-van-de` → 3 lõi + 1–4 chọn → `tbc-thuc-tien` → `tbc-phan-bien`.
> Dùng đủ công cụ cần thiết — chính là *tính cụ thể*. Chạy thừa là hình thức chủ nghĩa.

**Toàn bộ 15 agent — phủ đủ 11 điểm neo của phép biện chứng** *(xem `vaults/triet/diem-neo-11-noi-dung.md`)*:

| Pha | Agent | Món |
|---|---|---|
| 1 | `tbc-dat-van-de` ⭐ | — |
| 2 lõi | `tbc-hien-tuong` · `tbc-nhan-qua` · `tbc-mau-thuan` | phạm trù 1, 5 · quy luật 1 |
| 2 nguyên lý | `tbc-toan-dien` · `tbc-phat-trien` | **2 nguyên lý** |
| 2 chọn | `tbc-chung-rieng` · `tbc-tat-nhien` · `tbc-noi-dung-hinh-thuc` · `tbc-kha-nang` | phạm trù 2, 3, 4, 6 |
| 3 quy luật | `tbc-luong-chat` · `tbc-phu-dinh` | quy luật 2, 3 |
| bổ trợ | `tbc-xa-hoi` | — |
| 4 | `tbc-thuc-tien` | — |
| 5 | `tbc-phan-bien` | — |

> 🖥️ **Bản thủ công:** cùng bộ agent này có giao diện bấm–copy ở `app-bien-chung/index.html` (mở bằng double-click, không cần Node) — dùng khi muốn tự chạy từng lăng kính và tự chấm 🟢🟡🔴.

### Pha 3 — Đối chất *(tự làm)*

Đặt kết quả các lăng kính cạnh nhau và tìm **chỗ chúng chỏi nhau**.

> ⭐ **Mâu thuẫn giữa các lăng kính không phải lỗi — đó thường là chỗ bản chất đang nằm.**
> *"Bi kịch thực sự không phải là xung đột giữa đúng và sai, mà là xung đột giữa hai điều đúng"* (Hegel, slide 108).

Ba câu phải trả lời:

1. Lăng kính nào **chỏi nhau**, và chỏi ở điểm nào cụ thể?
2. Có lăng kính nào chỉ **mô tả lại hiện tượng** bằng từ ngữ kêu hơn mà không thêm gì không? → loại bỏ
3. Các lăng kính có **hội tụ** về cùng một lõi không? Hội tụ từ nhiều hướng độc lập là dấu hiệu mạnh.

### Pha 4 — Kiểm nghiệm thực tiễn *(gọi `tbc-thuc-tien`)*

Với **từng** giả thuyết về bản chất/quy luật, agent này phải chỉ ra **cách kiểm cụ thể** qua ba hình thức thực tiễn (slide 130):

| Hình thức | Kiểm bằng |
|---|---|
| **Sản xuất vật chất** | Số liệu sản lượng, thống kê, báo cáo ngành |
| **Chính trị – xã hội** | Hồ sơ pháp lý, vụ án, chính sách, số liệu hành chính |
| **Thực nghiệm** | Thí nghiệm, thử nghiệm, truy nguồn, tái lập |

Mỗi giả thuyết nhận một nhãn:

- 🟢 **Đã kiểm** — có bằng chứng thực tiễn, nêu rõ bằng chứng
- 🟡 **Kiểm được, chưa kiểm** — nêu **chính xác** phải làm gì để kiểm
- 🔴 **Chưa kiểm được** — chỉ hợp lý về logic

### Pha 5 — Phản biện *(gọi `tbc-phan-bien`)*

Agent đối thủ, nhiệm vụ **duy nhất là đập kết luận**. Săn 5 thứ:

1. **Giáo điều** — bê công thức từ hoàn cảnh khác sang
2. **Kinh nghiệm chủ nghĩa** — khái quát từ vài ca lẻ
3. **Siêu hình** — nhìn "ảnh chụp", bỏ vận động, cắt rời mối liên hệ
4. **Khung bất khả bác bỏ** — lý thuyết mà **không dữ kiện nào bác được** → ra khỏi địa hạt nhận thức
5. **Nguỵ biện nhân quả** — post hoc, nhầm tương quan, một-thủ-phạm

### Pha 6 — Kết luận *(tự làm — dùng đúng khuôn dưới)*

```markdown
## Vấn đề đã đặt lại
<một câu, kèm toạ độ: thời điểm · nơi · chủ thể>
Khác câu hỏi gốc ở chỗ: <...>

## Điểm nghẽn
<khâu then chốt — gỡ được thì các khâu khác thông>

## Hiện tượng
<phát biểu trung tính, tách khỏi mọi kết luận>

## Bản chất
<cái bên trong, ổn định, quyết định — 1–3 câu>
Lăng kính hội tụ: <liệt kê agent nào chỉ về đây>

## Quy luật
<mối liên hệ bản chất, tất yếu, phổ biến, lặp lại>
Điều kiện áp dụng: <BẮT BUỘC — không có thì không phải quy luật>

## Độ tin cậy: 🟢 / 🟡 / 🔴
<lý do>

## Để nâng lên mức cao hơn, cần:
- <việc kiểm nghiệm cụ thể 1>
- <việc kiểm nghiệm cụ thể 2>

## Điều lăng kính KHÔNG trả lời được
<thẳng thắn — chỗ nào ngoài tầm bộ công cụ này>
```

---

## Checklist tổng — chạy trước khi chốt

Xem đầy đủ ở `references/checklists.md`. Bản rút gọn:

- [ ] **Vấn đề đã được đặt đúng chưa?** Câu hỏi có ngầm chứa sẵn câu trả lời không?
- [ ] Đã chạy **phép thử đảo chiều** cho mọi mệnh đề `A → B` chưa? *(đường ướt ⇏ trời mưa)*
- [ ] Đã xác định được **điểm nghẽn** chưa, hay mới chỉ liệt kê triệu chứng?
- [ ] Đã tách **quan sát / suy luận / kết luận** chưa?
- [ ] Có **nhiều hiện tượng** hay chỉ một ca? *(một ca → trần 🔴)*
- [ ] Đã phân biệt **nguyên nhân / điều kiện / nguyên cớ** chưa? Đã chạy phép thử *"bỏ nó đi, kết quả còn xảy ra không?"*
- [ ] Cái đang gọi là quy luật đã qua phép thử *"điều kiện như nhau → kết quả như nhau"* chưa?
- [ ] Có nhầm **ngẫu nhiên thành tất nhiên**, hoặc **cái đơn nhất thành cái chung** không?
- [ ] Kết luận có kèm **điều kiện áp dụng** không?
- [ ] Đã nêu **cách kiểm nghiệm cụ thể** chưa? Không nêu được thì tự động 🔴
- [ ] Có dữ kiện nào **bác bỏ được** kết luận này không? Không có → cảnh báo khung bất khả bác bỏ
- [ ] Đã tìm **mâu thuẫn bên trong** đối tượng chưa, hay mới chỉ đổ cho tác nhân bên ngoài?

---

## Ranh giới — khi KHÔNG dùng skill này

- **Câu hỏi kỹ thuật thuần** (*"hàm này lỗi ở đâu"*) — đọc code, đừng gọi lăng kính triết học
- **Câu hỏi tra cứu** (*"định nghĩa X là gì"*) — trả lời thẳng
- **Khi chỉ có đúng một quan sát và không có cách nào kiếm thêm** — nói rõ là không đủ dữ liệu, đừng chạy quy trình để ra một kết luận 🔴 nghe kêu

> ⚠️ **Bản thân skill này cũng bị búa–đinh.** Cầm bộ công cụ biện chứng rồi dán vào mọi thứ chính là **giáo điều cấp cao hơn**. Nói *"cái gì cũng là mâu thuẫn"* mà không chỉ ra được **mâu thuẫn cụ thể nào**, **điểm nút ở đâu** — đó là chém gió.
>
> *"Triết học + Khoa học cụ thể = Giải pháp thực tế. Thiếu khoa học cụ thể: chém gió. Thiếu triết học: mò mẫm."* (slide 39)
>
> Skill này lo vế triết học. **Vế khoa học cụ thể — dữ liệu thật của lĩnh vực — vẫn phải đi kiếm.**

---

## Tài liệu

| File | Nội dung |
|---|---|
| `references/bo-cong-cu.md` | Toàn bộ 2 nguyên lý · 6 cặp phạm trù · 3 quy luật · lý luận nhận thức · triết học xã hội — kèm số slide |
| `references/checklists.md` | Checklist đầy đủ cho từng công cụ + bảng 14 lỗi thường gặp |
| `vaults/triet/slides/…txt` | Text 232 slide đã bóc — grep theo `=== PAGE n ===` |
| `vaults/triet/*.md` | Atomic note đã viết, tra nhanh bằng slug |

**Nguồn đối chiếu ngoài slide:** *Giáo trình Triết học Mác – Lênin* (hệ không chuyên), NXB Chính trị Quốc gia Sự thật, Hà Nội 2021, 496 tr.
⚠️ **Chưa tải được về máy** — các nguồn công khai đều chặn (403) hoặc có lỗi chứng chỉ SSL. Slide là bản rút gọn có chủ ý, nhiều chỗ chỉ ghi từ khoá; khi cần **phát biểu chính xác một định nghĩa để đi thi**, phải tra giáo trình giấy hoặc thư viện trường.

---

## ⚙️ Đồng bộ hai vị trí

Skill và agent tồn tại ở **hai nơi**:

| Vị trí | Dùng khi | Commit lên GitHub? |
|---|---|---|
| `<repo>/.claude/` | Mở đúng thư mục second brain | ✅ có |
| `~/.claude/` | Mọi project trên máy này | ❌ không |

> 🔁 **Sửa ở repo thì phải copy lại sang user-level**, nếu không hai bên lệch nhau:
> ```powershell
> Copy-Item "<repo>\.claude\skills\truy-ban-chat" -Destination "$env:USERPROFILE\.claude\skills\" -Recurse -Force
> Copy-Item "<repo>\.claude\agents\tbc-*.md" -Destination "$env:USERPROFILE\.claude\agents\" -Force
> ```

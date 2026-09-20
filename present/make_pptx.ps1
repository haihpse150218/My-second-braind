# Lắp .pptx từ 20 ảnh slide + kịch bản nói, bằng PowerPoint COM.
# Chạy:  powershell -ExecutionPolicy Bypass -File make_pptx.ps1
#
# Không cần cài gì: PowerPoint đã có sẵn trên máy, COM gọi được từ PowerShell 5.1.
# Nội dung sửa ở present/slides/index.html — file .pptx này là BẢN XUẤT.

param([string]$Ver = "")

$ErrorActionPreference = "Stop"
$goc   = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($Ver -eq "") {
    $png  = Join-Path $goc "png"
    $dich = Join-Path $goc "viec-lam-tri-thuc.pptx"
} else {
    $png  = Join-Path $goc ("png-" + $Ver)
    $dich = Join-Path $goc ("viec-lam-tri-thuc-" + $Ver + ".pptx")
}

# 960 x 540 pt = 13.333in x 7.5in = 16:9
$W = 960.0
$H = 540.0

if (Test-Path $dich) { Remove-Item $dich -Force }

# ── đọc kịch bản nói ─────────────────────────────────────────
$raw = [System.IO.File]::ReadAllText((Join-Path $png "notes.txt"), [System.Text.Encoding]::UTF8)
$ghichu = @{}
foreach ($k in [regex]::Matches($raw, '@@SLIDE(\d+)@@\r?\n([\s\S]*?)(?=@@SLIDE|\z)')) {
    $ghichu[[int]$k.Groups[1].Value] = $k.Groups[2].Value.Trim()
}
Write-Host ("Đọc được ghi chú cho {0} slide" -f $ghichu.Count)

# ── dựng ─────────────────────────────────────────────────────
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Add(0)          # 0 = không mở cửa sổ

$pres.PageSetup.SlideSize = 15             # ppSlideSizeCustom
$pres.PageSetup.SlideWidth  = $W
$pres.PageSetup.SlideHeight = $H

$anh = Get-ChildItem -Path $png -Filter "slide*.png" | Sort-Object Name
Write-Host ("Tìm thấy {0} ảnh slide" -f $anh.Count)

$i = 0
foreach ($f in $anh) {
    $i++
    $s = $pres.Slides.Add($i, 12)          # 12 = ppLayoutBlank
    # msoFalse=0 (không link), msoTrue=-1 (nhúng vào file)
    $s.Shapes.AddPicture($f.FullName, 0, -1, 0, 0, $W, $H) | Out-Null

    $t = $ghichu[$i]
    if ($t) {
        $np = $s.NotesPage
        $dat = $false
        foreach ($sh in $np.Shapes) {
            if ($sh.HasTextFrame -eq -1 -and -not $dat) {
                try {
                    if ($sh.PlaceholderFormat.Type -eq 2) {   # ppPlaceholderBody
                        $sh.TextFrame.TextRange.Text = $t
                        $dat = $true
                    }
                } catch { }
            }
        }
        if (-not $dat -and $np.Shapes.Count -ge 2) {
            $np.Shapes.Item(2).TextFrame.TextRange.Text = $t
        }
    }
    Write-Host ("  slide {0,2} : {1}" -f $i, $f.Name) -NoNewline
    if ($t) { Write-Host (" + notes ({0} ký tự)" -f $t.Length) } else { Write-Host "" }
}

$pres.SaveAs($dich, 24)                    # 24 = ppSaveAsOpenXMLPresentation
$pres.Close()
$app.Quit()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($app)  | Out-Null
[GC]::Collect()

$kb = [math]::Round((Get-Item $dich).Length / 1KB)
Write-Host ""
Write-Host ("XONG: {0}  ({1:N0} KB)" -f $dich, $kb)

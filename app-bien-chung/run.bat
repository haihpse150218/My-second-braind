@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   Ban bien chung - cau noi local (Claude Code CLI)
echo   Dang mo trinh duyet... Dong cua so nay hoac Ctrl+C de dung server.
echo.
start "" http://127.0.0.1:8787
python serve.py
pause

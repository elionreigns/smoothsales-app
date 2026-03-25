@echo off
REM Double-click helper to open your local Diamond Rolodex app.
REM This file lives in the repo so GitHub pushes it, but it uses your local D:\ path.

set "ROLDEX_EXE=D:\Limitless Backup\Diamond Rolodex\src-tauri\target\debug\Diamond Rolodex.exe"
set "ROLDEX_DIR=D:\Limitless Backup\Diamond Rolodex"

if exist "%ROLDEX_EXE%" (
  echo Opening Diamond Rolodex...
  start "" "%ROLDEX_EXE%"
  exit /b 0
)

if exist "%ROLDEX_DIR%" (
  echo Diamond Rolodex exe not found at:
  echo   %ROLDEX_EXE%
  echo Opening the folder instead...
  start "" "%ROLDEX_DIR%"
  exit /b 0
)

echo Diamond Rolodex not found.
echo Expected:
echo   %ROLDEX_EXE%
echo   %ROLDEX_DIR%
pause
exit /b 1


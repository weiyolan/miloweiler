@echo off
title Milo's Website Preview
cd /d "C:\Users\miloW\Desktop\Website Code"

echo.
echo Pulling latest changes...
echo.
git pull
if %errorlevel% neq 0 (
    echo.
    echo Something went wrong with git pull. Ask Yolan for help!
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo Something went wrong with npm install. Ask Yolan for help!
    pause
    exit /b 1
)

echo.
echo Starting the website preview...
echo.
start http://localhost:3000
call npm run dev
pause

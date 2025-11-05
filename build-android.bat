@echo off
REM ========================================
REM Debt Destroyer - Android Build Script
REM ========================================
REM
REM This script builds a standalone Android APK with JavaScript bundled.
REM By default, creates DEBUG builds (faster, with debug symbols).
REM Use "build-android.bat release" for RELEASE builds.
REM
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   Debt Destroyer - Android Build
echo ========================================
echo.

REM Check if release build is requested
set BUILD_TYPE=debug
if /i "%1"=="release" (
    set BUILD_TYPE=release
    echo [INFO] Building RELEASE APK...
) else (
    echo [INFO] Building DEBUG APK with bundled JavaScript...
)

echo.
echo [1/4] Cleaning previous builds...
cd android
call gradlew.bat clean
if errorlevel 1 (
    echo [ERROR] Clean failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Bundling JavaScript...
cd ..
call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
if errorlevel 1 (
    echo [ERROR] JavaScript bundling failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Building APK...
cd android
if /i "%BUILD_TYPE%"=="release" (
    call gradlew.bat assembleRelease
) else (
    call gradlew.bat assembleDebug
)

if errorlevel 1 (
    echo [ERROR] APK build failed!
    pause
    exit /b 1
)

echo.
echo [4/4] Copying APK to builds folder...
cd ..

REM Create builds directory structure
if not exist "builds\debug" mkdir builds\debug
if not exist "builds\release" mkdir builds\release

REM Generate timestamp for filename
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "timestamp=%dt:~0,8%-%dt:~8,6%"

if /i "%BUILD_TYPE%"=="release" (
    copy "android\app\build\outputs\apk\release\app-release.apk" "builds\release\DebtDestroyer-%timestamp%-release.apk"
    echo.
    echo ========================================
    echo   BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Release APK created:
    echo builds\release\DebtDestroyer-%timestamp%-release.apk
    echo.
    echo File location:
    dir /b "builds\release\DebtDestroyer-%timestamp%-release.apk"
    echo.
) else (
    copy "android\app\build\outputs\apk\debug\app-debug.apk" "builds\debug\DebtDestroyer-%timestamp%-debug.apk"
    echo.
    echo ========================================
    echo   BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Debug APK created:
    echo builds\debug\DebtDestroyer-%timestamp%-debug.apk
    echo.
    echo NOTE: This is a standalone debug build with JavaScript bundled.
    echo It will work on your phone without Metro bundler.
    echo.
)

echo Total build time: %time%
echo.
echo You can now install this APK on your Android device!
echo.

pause

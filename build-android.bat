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
echo [1/4] Cleaning native build cache...
if exist "android\.cxx" rmdir /s /q "android\.cxx" 2>nul
if exist "android\app\.cxx" rmdir /s /q "android\app\.cxx" 2>nul
if exist "node_modules\react-native-gesture-handler\android\build" rmdir /s /q "node_modules\react-native-gesture-handler\android\build" 2>nul
if exist "node_modules\react-native-safe-area-context\android\build" rmdir /s /q "node_modules\react-native-safe-area-context\android\build" 2>nul
if exist "node_modules\react-native-screens\android\build" rmdir /s /q "node_modules\react-native-screens\android\build" 2>nul
echo Native cache cleaned (ignoring locked files).

echo.
echo [2/4] Bundling JavaScript...

REM Make sure we're in the project root
cd /d "%~dp0"

REM Create assets directory if it doesn't exist
if not exist "android\app\src\main\assets" mkdir android\app\src\main\assets

REM Bundle JavaScript - use node directly to avoid CLI issues
call node node_modules\react-native\cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android\app\src\main\assets\index.android.bundle --assets-dest android\app\src\main\res\ --reset-cache
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

REM Auto-increment version number
set VERSION_FILE=build-version.txt

REM Read current version or initialize
if exist "%VERSION_FILE%" (
    set /p CURRENT_VERSION=<"%VERSION_FILE%"
) else (
    set CURRENT_VERSION=1.0.0
)

REM Parse version (major.minor.patch)
for /f "tokens=1,2,3 delims=." %%a in ("%CURRENT_VERSION%") do (
    set MAJOR=%%a
    set MINOR=%%b
    set PATCH=%%c
)

REM Increment patch version
set /a PATCH+=1

REM Create new version string
set NEW_VERSION=%MAJOR%.%MINOR%.%PATCH%

REM Save new version for next build
echo %NEW_VERSION% > "%VERSION_FILE%"

REM Generate timestamp for additional uniqueness
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "timestamp=%dt:~0,8%-%dt:~8,6%"

if /i "%BUILD_TYPE%"=="release" (
    copy "android\app\build\outputs\apk\release\app-release.apk" "builds\release\DebtDestroyer-v%NEW_VERSION%-release.apk"
    echo.
    echo ========================================
    echo   BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Release APK created:
    echo builds\release\DebtDestroyer-v%NEW_VERSION%-release.apk
    echo Version: v%NEW_VERSION%
    echo.
    echo File location:
    dir /b "builds\release\DebtDestroyer-v%NEW_VERSION%-release.apk"
    echo.
) else (
    copy "android\app\build\outputs\apk\debug\app-debug.apk" "builds\debug\DebtDestroyer-v%NEW_VERSION%-debug.apk"
    echo.
    echo ========================================
    echo   BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Debug APK created:
    echo builds\debug\DebtDestroyer-v%NEW_VERSION%-debug.apk
    echo Version: v%NEW_VERSION%
    echo Build: %timestamp%
    echo.
    echo NOTE: This is a standalone debug build with JavaScript bundled.
    echo It will work on your phone without Metro bundler.
    echo.
    echo Next build will be: v%MAJOR%.%MINOR%.%PATCH%
    echo.
)

echo Total build time: %time%
echo.
echo ========================================
echo   POST-BUILD OPTIONS
echo ========================================
echo.
echo [1] Install APK on connected device (via ADB)
echo [2] Open Android Studio
echo [3] Exit
echo.
set /p CHOICE="Enter your choice (1-3): "

if "%CHOICE%"=="1" (
    echo.
    echo [INFO] Installing APK on connected device...
    echo.

    REM Check if device is connected
    adb devices | findstr "device$" >nul
    if errorlevel 1 (
        echo [ERROR] No Android device detected!
        echo Please connect your device via USB and enable USB debugging.
        echo.
        pause
        exit /b 1
    )

    REM Install the APK
    if /i "%BUILD_TYPE%"=="release" (
        adb install -r "builds\release\DebtDestroyer-v%NEW_VERSION%-release.apk"
    ) else (
        adb install -r "builds\debug\DebtDestroyer-v%NEW_VERSION%-debug.apk"
    )

    if errorlevel 1 (
        echo [ERROR] Installation failed!
        echo.
        pause
        exit /b 1
    )

    echo.
    echo ========================================
    echo   INSTALLATION SUCCESSFUL!
    echo ========================================
    echo.
    echo The app has been installed on your device.
    echo Look for "DebtDestroyer" in your app drawer.
    echo.

    set /p LAUNCH="Would you like to launch the app now? (Y/N): "
    if /i "%LAUNCH%"=="Y" (
        echo.
        echo [INFO] Launching app...
        adb shell am start -n com.debtdestroyer/.MainActivity
        echo.
    )

) else if "%CHOICE%"=="2" (
    echo.
    echo [INFO] Opening Android Studio...
    echo.

    REM Try to find Android Studio executable
    set STUDIO_PATH=

    if exist "C:\Program Files\Android\Android Studio\bin\studio64.exe" (
        set STUDIO_PATH=C:\Program Files\Android\Android Studio\bin\studio64.exe
    ) else if exist "C:\Program Files (x86)\Android\Android Studio\bin\studio64.exe" (
        set STUDIO_PATH=C:\Program Files (x86)\Android\Android Studio\bin\studio64.exe
    ) else if exist "%LOCALAPPDATA%\Programs\Android Studio\bin\studio64.exe" (
        set STUDIO_PATH=%LOCALAPPDATA%\Programs\Android Studio\bin\studio64.exe
    )

    if defined STUDIO_PATH (
        echo Opening Android Studio from: !STUDIO_PATH!
        echo Project path: %CD%\android
        echo.
        start "" "!STUDIO_PATH!" "%CD%\android"
        echo.
        echo Android Studio is opening with the android project folder.
        echo.
    ) else (
        echo [WARNING] Could not find Android Studio automatically.
        echo.
        echo Please open Android Studio manually and import the project from:
        echo %CD%\android
        echo.
    )

) else if "%CHOICE%"=="3" (
    echo.
    echo Exiting...
    echo.
) else (
    echo.
    echo Invalid choice. Exiting...
    echo.
)

pause

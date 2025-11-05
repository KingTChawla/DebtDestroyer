# React Native Development Environment Setup - Windows 11

**Complete setup guide for React Native CLI on Windows 11 with Android Studio + iOS cloud builds**

---

## ✅ Setup Status: COMPLETE

**Date Completed:** 2025-11-05
**Machine:** Windows 11 (Build 10.0.22631.6060)

### Verified Installation:

| Component | Version | Status |
|-----------|---------|--------|
| **Node.js** | v18.20.8 (LTS) | ✅ Installed |
| **npm** | 10.8.2 | ✅ Installed |
| **Java JDK** | 17.0.17 LTS | ✅ Installed |
| **Chocolatey** | 2.5.1 | ✅ Installed |
| **Watchman** | 2025.02.23 | ✅ Installed |
| **Android SDK** | API 33, 34, 36 | ✅ Installed |
| **Build Tools** | 35.0.0, 36.0.0, 36.1.0 | ✅ Installed |
| **ANDROID_HOME** | `C:\Users\Tanishq Chawla\AppData\Local\Android\Sdk` | ✅ Configured |
| **ADB** | 1.0.41 (v36.0.0) | ✅ In PATH |
| **React Native CLI** | 2.0.1 | ✅ Installed |
| **Android Emulator** | Medium_Phone_API_36.1 | ✅ Configured |

**Environment is ready for React Native development!**

---

## Table of Contents

1. [Requirements](#requirements)
2. [Windows Native Setup](#windows-native-setup)
3. [Android Studio Setup](#android-studio-setup)
4. [iOS Setup Options](#ios-setup-options)
5. [IDE Integration (Cursor/VS Code)](#ide-integration)
6. [Testing Workflow](#testing-workflow)
7. [Environment Verification](#environment-verification)
8. [Troubleshooting](#troubleshooting)

---

## Requirements

- **Windows 11** (native, not WSL)
- **Node.js 18 LTS** (recommended for React Native stability)
- **Java JDK 17+** (required for Android builds)
- **Android Studio** (SDK Platform 34+, Build-Tools, AVD)
- **Git** for Windows
- **React Native CLI**
- **Yarn or npm** (package manager)
- **Watchman** (optional, for file watching)
- **Xcode** (Mac only, for local iOS builds) OR cloud build service

---

## Windows Native Setup

### Step 1: Install Node.js 18 LTS

**Option A: Direct Download**
1. Download Node.js 18 LTS from https://nodejs.org
2. Run the installer
3. Ensure "Add to PATH" is checked

**Option B: Chocolatey (Recommended for Package Management)**

```powershell
# Install Chocolatey first (if not installed):
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js 18 LTS via Chocolatey
choco install nodejs-lts -y

# Verify installation
node -v  # Should show v18.x.x
npm -v
```

**Why Node.js 18 LTS?**
- Most stable for React Native ecosystem
- Best compatibility with native modules
- Avoid bleeding-edge versions (v20+, v25+) which may have compatibility issues

---

### Step 2: Install Java JDK 17

Java is required for building Android applications.

```powershell
# Via Chocolatey (recommended)
choco install microsoft-openjdk17 -y

# OR download manually from:
# https://learn.microsoft.com/en-us/java/openjdk/download

# Verify installation
java -version  # Should show version 17.x.x
```

**Note:** React Native supports JDK 11, 17, and 21. JDK 17 is the sweet spot for stability.

---

### Step 3: Install React Native CLI

```powershell
# Install globally
npm install -g react-native-cli

# Verify installation
npx react-native --version
```

---

### Step 4: Install Watchman (Optional but Recommended)

Watchman improves file watching performance and reliability.

```powershell
# Via Chocolatey
choco install watchman -y

# Verify
watchman --version
```

**Why Watchman?**
- Faster file change detection
- Prevents common Metro bundler issues
- Recommended by React Native team

---

## Android Studio Setup (Windows)

### Step 1: Install Android Studio

1. Download Android Studio from https://developer.android.com/studio
2. Run the installer
3. Select **"Standard"** installation type
4. Ensure these components are checked during setup:
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device (AVD)
   - ✅ Performance (Intel HAXM or Android Emulator Hypervisor Driver)

---

### Step 2: Configure Android SDK

1. Open Android Studio
2. Go to **Settings/Preferences** → **Appearance & Behavior** → **System Settings** → **Android SDK**

#### SDK Platforms Tab

Install these platforms:
- ✅ **Android 14.0 (UpsideDownCake)** - API Level 34 (recommended)
- ✅ **Android 13.0 (Tiramisu)** - API Level 33 (good compatibility)

**Tip:** You can install older versions if you need to support older devices, but API 33+ is recommended for modern apps.

#### SDK Tools Tab

Install these tools:
- ✅ Android SDK Build-Tools 34.0.0
- ✅ Android Emulator
- ✅ Android SDK Platform-Tools
- ✅ Android SDK Tools (Obsolete) - if available
- ✅ **Intel x86 Emulator Accelerator (HAXM)** (for Intel CPUs) OR **Android Emulator Hypervisor Driver** (for AMD CPUs)
- ✅ Google Play Services (if you plan to use Google services)

---

### Step 3: Set Environment Variables

**Critical Step:** React Native needs to know where your Android SDK is located.

1. Open **Start Menu** → Search for **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables"** button
4. Under **"User variables"** section, click **"New"**

#### Add ANDROID_HOME Variable

```ini
Variable Name: ANDROID_HOME
Value: C:\Users\<YOUR_USERNAME>\AppData\Local\Android\Sdk
```

**Replace `<YOUR_USERNAME>` with your actual Windows username.**

#### Update PATH Variable

1. Find the **Path** variable under "User variables"
2. Click **"Edit"**
3. Click **"New"** and add these entries one by one:

```ini
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

4. Click **OK** to save all changes

#### Apply Changes

**Important:** Close and reopen all terminal windows (including Cursor/VS Code) for changes to take effect.

---

### Step 4: Verify Android Setup

```powershell
# Check ADB (Android Debug Bridge)
adb --version
# Should show: Android Debug Bridge version X.X.X

# Check ANDROID_HOME
echo %ANDROID_HOME%
# Should show: C:\Users\<YOUR_USERNAME>\AppData\Local\Android\Sdk

# List installed SDK platforms
sdkmanager --list_installed
```

If any command fails, revisit the previous steps.

---

### Step 5: Create Android Virtual Device (AVD)

An AVD is an emulator configuration that mimics a physical Android device.

1. Open Android Studio
2. Go to **Tools** → **Device Manager** (or click the device icon in toolbar)
3. Click **"Create Device"**
4. **Select Hardware:**
   - Recommended: **Pixel 6** or **Pixel 7** (good screen size, modern specs)
   - Category: Phone
5. **Select System Image:**
   - Release Name: **UpsideDownCake** (Android 14, API 34)
   - ABI: **x86_64** (for better performance on Windows)
   - Click **Download** if not already installed
6. **Verify Configuration:**
   - Give it a name (e.g., "Pixel_6_API_34")
   - Click **Finish**
7. **Test Emulator:**
   - Click the **Play** ▶️ button next to your AVD
   - Wait for emulator to boot (first boot takes 1-2 minutes)

**Emulator Tips:**
- Enable "Use Host GPU" for better graphics performance
- Allocate at least 2GB RAM to the AVD
- Use "Cold Boot" for first launch, then use "Quick Boot" for subsequent launches

---

## iOS Setup Options

### Option A: Local Builds (Mac Required)

iOS apps can only be built on macOS due to Apple's restrictions.

**On macOS:**

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install CocoaPods (dependency manager for iOS)
brew install cocoapods

# Install Watchman
brew install watchman

# Navigate to your React Native project
cd /path/to/your/project

# Install iOS dependencies
cd ios
pod install
cd ..

# Run on iOS simulator
npx react-native run-ios
```

---

### Option B: Cloud Build Services (No Mac Required)

**Perfect for Windows developers without access to a Mac.**

You can develop and test Android fully on Windows, then use cloud services to build iOS versions:

#### Cloud Build Service Options:

1. **Expo EAS Build**
   - Works with React Native CLI apps (not just Expo)
   - $29/month for hobby plan
   - Easy setup, good documentation
   - https://expo.dev/eas

2. **Bitrise**
   - Free tier available
   - Good CI/CD integration
   - https://bitrise.io

3. **Codemagic**
   - Free tier: 500 build minutes/month
   - Good for indie developers
   - https://codemagic.io

4. **CircleCI with macOS Executors**
   - Free tier available
   - Requires more configuration
   - https://circleci.com

**Recommended Workflow:**
1. Develop and test on Android (Windows)
2. Push code to GitHub/GitLab
3. Cloud service builds iOS version
4. Download `.ipa` and test on physical iOS device or TestFlight

---

## IDE Integration

### Cursor / VS Code

#### Recommended Extensions:

- **ES7+ React/Redux/React-Native snippets**
- **React Native Tools** (Microsoft)
- **Prettier - Code formatter**
- **ESLint**
- **vscode-styled-components** (if using styled-components)
- **GitLens**

#### Cursor-Specific Settings:

✅ **Already Set Up** - Cursor is running natively on Windows 11

**Recommended Cursor Settings:**
- Set terminal to **PowerShell** or **Command Prompt** (not WSL)
- Configure AI context rules to include:
  - `/docs/**/*.md`
  - `/src/**/*`
  - `package.json`
  - `*.config.js`

#### Terminal Configuration:

1. Open Cursor/VS Code settings
2. Search for "terminal integrated shell"
3. Set to PowerShell or Command Prompt
4. Restart IDE

---

## Testing Workflow

### Android Testing

#### Method 1: Emulator (Recommended for Development)

**Start Emulator:**

```powershell
# Option A: From command line
emulator -avd <AVD_NAME>

# Example:
emulator -avd Pixel_6_API_34

# Option B: From Android Studio
# Tools → Device Manager → Click Play button
```

**Run React Native App:**

```powershell
# Navigate to your project
cd /path/to/your/react-native-project

# Run on Android
npx react-native run-android

# Or if using yarn
yarn android
```

**First Launch:**
- Metro bundler starts automatically
- App installs on emulator
- Opens automatically

---

#### Method 2: Physical Device (USB)

**Setup:**

1. **Enable Developer Options on Android device:**
   - Go to **Settings** → **About Phone**
   - Tap **Build Number** 7 times
   - Developer Options unlocked!

2. **Enable USB Debugging:**
   - Go to **Settings** → **Developer Options**
   - Toggle **USB Debugging** ON

3. **Connect device via USB cable**

4. **Verify connection:**

```powershell
adb devices

# Should show:
# List of devices attached
# ABC123XYZ    device
```

5. **Run app:**

```powershell
npx react-native run-android
```

**Troubleshooting USB:**
- Install device-specific USB drivers (Samsung, Google, etc.)
- Try different USB cable
- Enable "File Transfer" mode on device

---

#### Method 3: Wireless Debugging (Android 11+)

**Setup:**

1. **On Android device:**
   - Go to **Settings** → **Developer Options** → **Wireless Debugging**
   - Toggle **ON**
   - Tap **Pair device with pairing code**
   - Note the IP, Port, and Pairing code

2. **On Windows:**

```powershell
# Pair device (one-time setup)
adb pair <IP>:<PORT>
# Enter pairing code when prompted

# Connect to device
adb connect <IP>:<PORT>

# Verify connection
adb devices
# Should show device as "connected"
```

3. **Run app:**

```powershell
npx react-native run-android
```

**Benefits:**
- No USB cable needed
- Freedom to move around
- Great for testing gestures/motion

---

### iOS Testing

#### Local (Mac only)

```bash
# Run on iOS simulator
npx react-native run-ios

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Run on physical device (requires provisioning profile)
npx react-native run-ios --device
```

---

#### Cloud Build Testing

1. **Build `.ipa` file** via cloud service
2. **Distribute via TestFlight:**
   - Upload to App Store Connect
   - Add beta testers
   - Install via TestFlight app
3. **OR Direct Install:**
   - Use services like Diawi or TestFlight alternatives
   - Install via OTA link

---

### Fast Refresh & Hot Reload

React Native CLI supports **Fast Refresh** by default:

- ✅ **Automatic:** Save file → App updates instantly (preserves component state)
- 🔄 **Manual Reload:** Shake device/emulator → Tap "Reload"
- 🛠️ **Full Restart:** Shake → Tap "Reload" (loses state)

#### Debug Menu:

**Android:**
- **Emulator:** `Ctrl + M`
- **Physical Device:** Shake device

**iOS:**
- **Simulator:** `Cmd + D`
- **Physical Device:** Shake device

**Debug Menu Options:**
- Reload
- Enable Fast Refresh
- Enable Remote JS Debugging (Chrome DevTools)
- Enable Performance Monitor
- Toggle Inspector
- Show Element Inspector

---

## Environment Verification

**Run this checklist before starting any React Native project:**

```powershell
# Node.js (should be v18.x.x)
node -v

# npm (should be 9.x.x or 10.x.x)
npm -v

# Java (should be 17.x.x)
java -version

# Android SDK
echo %ANDROID_HOME%
# Should show: C:\Users\<YOU>\AppData\Local\Android\Sdk

# ADB
adb --version
# Should show version

# React Native CLI
npx react-native --version
# Should show version

# React Native Doctor (comprehensive check)
npx react-native doctor
```

**Expected Output from `npx react-native doctor`:**

```
✓ Node.js - Required version found
✓ npm - Required version found
✓ Android SDK - Required platforms and tools found
✓ Android Emulator - At least one emulator configured
✓ ANDROID_HOME - Environment variable is set
```

**Fix any ❌ issues before proceeding.**

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: `adb: command not found`

**Solution:**
- Verify ANDROID_HOME is set correctly
- Verify PATH includes `%ANDROID_HOME%\platform-tools`
- Restart terminal/IDE
- If still failing, manually add: `C:\Users\<YOU>\AppData\Local\Android\Sdk\platform-tools` to PATH

---

#### Issue: `INSTALL_FAILED_INSUFFICIENT_STORAGE`

**Solution:**
- Free up space on emulator
- Wipe emulator data: Device Manager → AVD → Wipe Data
- Create new AVD with more storage

---

#### Issue: Metro bundler port 8081 already in use

**Solution:**

```powershell
# Find process using port 8081
netstat -ano | findstr :8081

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different port
npx react-native start --port 8088
```

---

#### Issue: Emulator won't start or is very slow

**Solutions:**
- **Enable Hardware Acceleration:**
  - Intel CPUs: Install HAXM
  - AMD CPUs: Enable Android Emulator Hypervisor Driver
- **Allocate more RAM:** Edit AVD → Advanced → RAM (2GB+)
- **Enable GPU:** Edit AVD → Graphics: Hardware - GLES 2.0
- **Close other apps:** Free up system resources

---

#### Issue: `Could not connect to development server`

**Solution:**

```powershell
# Restart Metro bundler
npx react-native start --reset-cache

# Reverse ADB port (for physical devices)
adb reverse tcp:8081 tcp:8081

# Check firewall isn't blocking port 8081
```

---

#### Issue: Build fails with "SDK location not found"

**Solution:**

Create `local.properties` file in `android/` directory:

```properties
sdk.dir=C:\\Users\\<YOUR_USERNAME>\\AppData\\Local\\Android\\Sdk
```

**Note:** Use double backslashes `\\` in path.

---

#### Issue: React Native version mismatch

**Solution:**

```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules
npm install

# Clear Metro bundler cache
npx react-native start --reset-cache

# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
npx react-native run-android
```

---

## ✅ Setup Complete! (2025-11-05)

**Your development environment is fully configured and verified.**

### Next Steps for Debt Destroyer Project:

Refer to the [Debt Destroyer App Specification](./Debt_Destroyer_App_Specification.md) for:
- Phase 1: UI/UX System development
- Complete project architecture
- Tech stack details
- Build phases

### Quick Reference - Useful Commands:

```powershell
# Start Android emulator
emulator -avd Medium_Phone_API_36.1

# Run React Native app on Android
npx react-native run-android

# Start Metro bundler manually
npx react-native start

# Clear Metro cache if needed
npx react-native start --reset-cache
```

### Additional Resources (Reference Only):

- **Official Docs:** https://reactnative.dev/docs/environment-setup
- **React Native Community:** https://github.com/react-native-community
- **Troubleshooting:** See sections above for common issues

---

**Ready to build Debt Destroyer! 🚀**

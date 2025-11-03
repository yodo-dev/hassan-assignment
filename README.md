# YodoAssignment - Battery Level Reader App

A React Native application that demonstrates custom native module development by reading and displaying the device's battery level on both Android and iOS platforms.

## 📱 Project Overview

This project is a React Native application that implements a **custom native module** to access device battery information. The app displays the current battery level with a visual progress bar and provides a refresh mechanism to update the battery reading in real-time.

### Key Features

- ✅ **Cross-platform native module** implementation (Android & iOS)
- ✅ **Real-time battery level** monitoring
- ✅ **Visual battery indicator** with color-coded progress bar
- ✅ **Dark mode support** for enhanced user experience
- ✅ **Async/await** promise-based API
- ✅ **Error handling** with user-friendly messages
- ✅ **Modern UI** with smooth animations

---

## 🏗️ Project Structure

```
YodoAssignment/
├── android/                          # Android native code
│   └── app/
│       └── src/main/java/com/yodoassignment/
│           ├── BatteryModule.kt      # Android native module (Kotlin)
│           ├── BatteryPackage.kt     # Android package registration
│           ├── MainActivity.kt       # Android main activity
│           └── MainApplication.kt    # Android application class
│
├── ios/                              # iOS native code
│   └── YodoAssignment/
│       ├── BatteryModule.swift       # iOS native module (Swift)
│       ├── BatteryModule.m           # Objective-C bridge file
│       ├── AppDelegate.swift         # iOS app delegate
│       └── Info.plist               # iOS configuration
│
├── App.tsx                           # Main React Native component
├── BatteryModule.ts                  # TypeScript bridge for native module
│
├── package.json                      # Node.js dependencies
├── tsconfig.json                     # TypeScript configuration
├── babel.config.js                   # Babel transpiler config
├── metro.config.js                   # Metro bundler config
└── README.md                         # This file
```

---

## 🛠️ Technical Stack

### Core Technologies
- **React Native**: 0.82.1
- **React**: 19.1.1
- **TypeScript**: 5.8.3
- **Node.js**: >=20

### Android Stack
- **Language**: Kotlin
- **Gradle**: Latest (via wrapper)
- **Minimum SDK**: Configured in `build.gradle`
- **Target SDK**: Configured in `build.gradle`

### iOS Stack
- **Language**: Swift 5.0
- **Objective-C**: For module bridging
- **CocoaPods**: Dependency management
- **Minimum iOS Version**: 15.1

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
1. **Node.js** (v20 or higher)
2. **npm** or **yarn**
3. **React Native CLI**

### Android Development
- **Java Development Kit (JDK)** 11 or higher
- **Android Studio** (latest version)
- **Android SDK** (API level 33+ recommended)
- **Android Emulator** or physical device
- **Environment variables**:
  - `ANDROID_HOME` pointing to Android SDK location
  - `JAVA_HOME` pointing to JDK installation

### iOS Development (macOS only)
- **Xcode** (latest version)
- **CocoaPods** (installed via Ruby bundler)
- **iOS Simulator** or physical device
- **Command Line Tools** for Xcode

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd YodoAssignment
```

### 2. Install Node Dependencies

```bash
npm install
```

### 3. iOS Setup (macOS only)

#### Install CocoaPods (first time only)

```bash
# Install Ruby dependencies
bundle install
```

#### Install iOS Dependencies

```bash
cd ios
bundle exec pod install
cd ..
```

**Note**: Run `bundle exec pod install` whenever you update native iOS dependencies.

### 4. Android Setup

No additional setup required. Gradle will automatically download required dependencies on first build.

---

## ▶️ Running the Project

### Start Metro Bundler

In the project root, start the Metro bundler:

```bash
npm start
```

Or use yarn:

```bash
yarn start
```

### Run on Android

```bash
npm run android
```

Or:

```bash
yarn android
```

**Prerequisites**:
- Android emulator running, OR
- Physical Android device connected with USB debugging enabled

### Run on iOS (macOS only)

```bash
npm run ios
```

Or:

```bash
yarn ios
```

**Prerequisites**:
- iOS Simulator running, OR
- Physical iOS device connected

### Building from IDEs

#### Android Studio
1. Open `android/` folder in Android Studio
2. Wait for Gradle sync to complete
3. Click "Run" or press `Shift + F10`

#### Xcode
1. Open `ios/YodoAssignment.xcworkspace` (not `.xcodeproj`)
2. Select target device/simulator
3. Click "Run" or press `Cmd + R`

---

## 📁 Configuration Files Explained

### `package.json`
Contains project metadata, dependencies, and npm scripts:
- **Dependencies**: React, React Native, safe-area-context
- **Dev Dependencies**: TypeScript, ESLint, Jest, Babel
- **Scripts**:
  - `start`: Start Metro bundler
  - `android`: Run on Android
  - `ios`: Run on iOS
  - `test`: Run Jest tests
  - `lint`: Run ESLint

### `tsconfig.json`
TypeScript configuration extending React Native's base config:
- Includes all `.ts` and `.tsx` files
- Excludes `node_modules` and `Pods`

### `babel.config.js`
Babel transpiler configuration:
- Uses `@react-native/babel-preset` for React Native transformation

### `metro.config.js`
Metro bundler configuration:
- Merges default React Native config with custom settings
- Handles JavaScript bundling for the app

### `app.json`
React Native app configuration:
- App name and display name

### Android Configuration

#### `android/app/build.gradle`
- Android app build configuration
- SDK versions, dependencies, signing configs
- Namespace: `com.yodoassignment`

#### `android/build.gradle`
- Project-level Gradle settings
- Android Gradle Plugin version

#### `android/gradle.properties`
- Gradle build properties
- Hermes engine settings
- New Architecture flags

### iOS Configuration

#### `ios/Podfile`
- CocoaPods dependency management
- React Native pod configuration
- Autolinking setup

#### `ios/YodoAssignment/Info.plist`
- iOS app metadata and permissions
- Bundle identifier
- Supported orientations
- App Transport Security settings

---

## 🔧 Native Module Implementation

### Architecture Overview

The app uses **custom native modules** to access platform-specific battery APIs:

```
JavaScript Layer (App.tsx)
    ↓
TypeScript Bridge (BatteryModule.ts)
    ↓
React Native Bridge
    ↓
Native Layer
    ├── Android: BatteryModule.kt
    └── iOS: BatteryModule.swift
    ↓
Platform APIs
    ├── Android: BatteryManager
    └── iOS: UIDevice
```

### Android Implementation

#### Files:
1. **`BatteryModule.kt`** - Core native module
   - Extends `ReactContextBaseJavaModule`
   - Implements `getBatteryLevel()` method
   - Uses Android's `BatteryManager` to read battery info
   - Returns percentage via Promise

2. **`BatteryPackage.kt`** - Module registration
   - Implements `ReactPackage` interface
   - Registers `BatteryModule` with React Native

3. **`MainApplication.kt`** - App initialization
   - Adds `BatteryPackage` to React Native package list

#### How it works:
- Uses `Intent.ACTION_BATTERY_CHANGED` sticky broadcast
- Extracts `EXTRA_LEVEL` and `EXTRA_SCALE` from battery intent
- Calculates percentage: `(level / scale) * 100`

### iOS Implementation

#### Files:
1. **`BatteryModule.swift`** - Core native module
   - Swift class marked with `@objc(BatteryModule)`
   - Implements `getBatteryLevel()` method
   - Uses `UIDevice.current` to read battery info
   - Returns percentage via Promise

2. **`BatteryModule.m`** - Objective-C bridge
   - Uses `RCT_EXTERN_MODULE` macro
   - Exposes Swift module to React Native bridge
   - Automatically discovered by React Native runtime

#### How it works:
- Enables battery monitoring: `isBatteryMonitoringEnabled = true`
- Reads `batteryLevel` (0.0 to 1.0)
- Converts to percentage: `batteryLevel * 100.0`
- React Native auto-discovers via Objective-C runtime

---

## 📱 Application Features

### UI Components

#### Battery Display Screen
- **Large percentage display**: Shows battery level in large, bold text
- **Visual progress bar**: Color-coded indicator
  - 🟢 Green: > 50%
  - 🟠 Orange: 20% - 50%
  - 🔴 Red: < 20%
- **Refresh button**: Manually update battery level
- **Loading state**: Shows spinner while fetching data
- **Error handling**: Displays error messages if battery info unavailable

#### Dark Mode Support
- Automatically adapts to system theme
- Dark and light color schemes
- Smooth theme transitions

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Files
- `__tests__/App.test.tsx`: Basic app component test

---

## 🐛 Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear Metro cache and restart
npm start -- --reset-cache
```

#### Android Build Issues
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

#### iOS Build Issues
```bash
# Clean iOS build
cd ios
rm -rf build Pods Podfile.lock
bundle exec pod install
cd ..
npm run ios
```

#### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### CocoaPods Issues
```bash
# Reinstall pods
cd ios
bundle exec pod deintegrate
bundle exec pod install
cd ..
```

### Android Specific

#### Gradle Sync Failed
- Ensure `ANDROID_HOME` environment variable is set
- Check Java version: `java -version` (should be JDK 11+)

#### Emulator Not Found
- Start Android Studio → AVD Manager
- Create/start an emulator

### iOS Specific

#### "No Podfile found"
- Ensure you're in the `ios/` directory
- Run `bundle exec pod install` from `ios/` folder

#### Build Errors in Xcode
- Clean build folder: `Product → Clean Build Folder` (Cmd + Shift + K)
- Delete derived data
- Reinstall pods

#### Module Not Found Errors
- Ensure you opened `.xcworkspace` not `.xcodeproj`
- Run `bundle exec pod install` again

---

## 📚 Code Architecture

### JavaScript/TypeScript Layer

#### `App.tsx`
Main React component:
- Manages battery level state
- Handles async battery reading
- Renders UI with battery display
- Error handling and loading states

#### `BatteryModule.ts`
TypeScript bridge:
- Type-safe interface for native module
- Exports module for JavaScript consumption
- Platform-agnostic API

### Native Layer Communication

#### Promise Pattern
All native methods return Promises:
```typescript
const level = await BatteryModule.getBatteryLevel();
```

#### Error Handling
Native modules reject promises on errors:
```typescript
try {
  const level = await BatteryModule.getBatteryLevel();
} catch (error) {
  // Handle error
}
```

---

## 🔐 Permissions

### Android
No special permissions required for battery level reading.

### iOS
No special permissions required. Battery monitoring is available via `UIDevice` API.

---

## 🚢 Building for Production

### Android Release Build

```bash
cd android
./gradlew assembleRelease
```

APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

### iOS Release Build

1. Open `ios/YodoAssignment.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Follow App Store submission process

---

## 📖 Development Guidelines

### Adding New Native Methods

#### Android
1. Add method to `BatteryModule.kt` with `@ReactMethod` annotation
2. Update `BatteryModule.ts` TypeScript interface
3. Rebuild app

#### iOS
1. Add method to `BatteryModule.swift` with `@objc` annotation
2. Add method declaration to `BatteryModule.m`
3. Update `BatteryModule.ts` TypeScript interface
4. Rebuild app

### Code Style
- Follow React Native style guidelines
- Use TypeScript for type safety
- Maintain consistent error handling
- Document complex logic

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both Android and iOS
5. Submit a pull request

---

## 📄 License

This project is for educational/demonstration purposes.

---

## 🔗 Useful Resources

- [React Native Documentation](https://reactnative.dev)
- [Native Modules Guide](https://reactnative.dev/docs/native-modules-intro)
- [Android Native Modules](https://reactnative.dev/docs/native-modules-android)
- [iOS Native Modules](https://reactnative.dev/docs/native-modules-ios)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)

---

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review React Native documentation
3. Search existing issues

---

## 🎯 Project Status

✅ **Fully Functional**
- Android implementation complete
- iOS implementation complete
- UI/UX implemented
- Error handling implemented
- Dark mode supported

---

**Built with ❤️ using React Native**

# FirstStore - React Native Expo App

A mobile grocery delivery app built with React Native and Expo, featuring a complete onboarding flow, authentication, and shopping interface.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device

### Installation

1. **Download and extract** the project files
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Test on your mobile device:**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 Features

### **Complete User Flow:**
- **Splash Screen** with FirstStore branding
- **Onboarding Carousel** (3 screens with smooth transitions)
- **Authentication Flow** (Mobile number → OTP → Profile completion)
- **Dashboard** with product browsing and categories

### **UI Components:**
- Custom status bar matching design
- Product cards with add-to-cart functionality
- Category filters
- Hero banner with carousel indicators
- Trending products section
- Responsive design for all screen sizes

## 🎨 Design System

### **Colors:**
- Primary: `#00BFA6` (FirstStore Teal)
- Dark: `#161616` (Almost Black)
- Text: `#343434`
- Gray variants for UI elements

### **Typography:**
- **Inter**: Primary app font
- **Montserrat**: Brand and accent text

## 🛠 Development

### **Project Structure:**
```
├── App.tsx                 # Main app entry point
├── components/             # React Native components
│   ├── SplashScreen.tsx   # Splash screen with logo
│   ├── OnboardingCarousel.tsx
│   ├── MobileSignup.tsx   # Auth flow (3 steps)
│   └── Dashboard.tsx      # Main shopping interface
├── constants/
│   └── Colors.ts          # Design system colors
└── assets/                # Images and icons
```

### **Key Features:**
- **Native Performance**: Built with React Native for smooth animations
- **Expo Compatibility**: Easy testing with Expo Go
- **TypeScript**: Full type safety
- **Vector Icons**: Using @expo/vector-icons
- **Cross Platform**: Works on iOS and Android

## 📦 Dependencies

### **Core:**
- `expo` - Development platform
- `react-native` - Mobile framework
- `@react-navigation/native` - Navigation
- `react-native-gesture-handler` - Touch gestures

### **UI & Icons:**
- `@expo/vector-icons` - Icon library
- `react-native-svg` - SVG support
- `expo-linear-gradient` - Gradient effects

## 🔧 Scripts

```bash
# Start development server
npm start

# Run on Android device/emulator
npm run android

# Run on iOS device/simulator
npm run ios

# Run in web browser (for debugging)
npm run web
```

## 📝 Usage

1. **Testing Flow:**
   - App starts with splash screen (2 seconds)
   - Proceed through onboarding (3 screens)
   - Complete signup process (phone → OTP → profile)
   - Browse products in dashboard

2. **Features to Test:**
   - Smooth animations between screens
   - Product filtering by categories
   - Add to cart functionality
   - Horizontal scrolling in trending section
   - Responsive layout on different screen sizes

## 🎯 Design Fidelity

This React Native version maintains **100% pixel-perfect** fidelity to the original Figma design:
- Exact colors, spacing, and typography
- Matching animations and transitions
- Authentic mobile status bar
- Native scrolling and gestures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

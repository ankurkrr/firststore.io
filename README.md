# FirstStore - Web Application
https://firststore-io.vercel.app/

A modern grocery delivery web app built with React, TypeScript, and Tailwind CSS, featuring a complete onboarding flow, authentication, and shopping interface.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:8080`
   - The app is responsive and works on mobile, tablet, and desktop

## 📱 Features

### **Complete User Flow:**
- **Splash Screen** with FirstStore branding
- **Onboarding Carousel** (3 screens with smooth transitions)
- **Authentication Flow** (Mobile number → OTP → Profile completion)
- **Dashboard** with product browsing and categories

### **UI Components:**
- Custom status bar matching mobile design
- Product cards with add-to-cart functionality
- Category filters
- Hero banner with carousel indicators
- Trending products section
- Fully responsive design

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
├── client/                 # React web application
│   ├── components/         # React components
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingCarousel.tsx
│   │   ├── MobileSignup.tsx
│   │   ├── Dashboard.tsx
│   │   └── ui/            # Shadcn UI components
│   ├── pages/             # Route components
│   └── global.css         # Styling with FirstStore theme
├── server/                # Express backend
└── shared/                # Shared TypeScript interfaces
```

### **Tech Stack:**
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Express.js
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React

## 📦 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Type checking
npm run typecheck
```

## 🚀 Deployment

### **Vercel (Recommended):**
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### **Other Platforms:**
- Netlify
- AWS Amplify
- Any static hosting provider

## 🎯 Design Fidelity

This web application maintains **100% pixel-perfect** fidelity to the original Figma design:
- Exact colors, spacing, and typography
- Matching animations and transitions
- Authentic mobile-like experience on web
- Responsive design for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test responsiveness on all screen sizes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

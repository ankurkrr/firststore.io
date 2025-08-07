import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingCarousel } from './components/OnboardingCarousel';
import { MobileSignup } from './components/MobileSignup';
import { Dashboard } from './components/Dashboard';

const Stack = createNativeStackNavigator();

type AppState = 'splash' | 'onboarding' | 'signup' | 'dashboard';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');

  const handleSplashComplete = () => {
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentState('signup');
  };

  const handleSignupComplete = () => {
    setCurrentState('dashboard');
  };

  const handleSignupBack = () => {
    setCurrentState('onboarding');
  };

  const getCurrentComponent = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'onboarding':
        return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
      case 'signup':
        return (
          <MobileSignup
            onComplete={handleSignupComplete}
            onBack={handleSignupBack}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {getCurrentComponent()}
    </NavigationContainer>
  );
}

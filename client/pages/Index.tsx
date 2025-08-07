import { useState } from 'react';
import { SplashScreen } from '../components/SplashScreen';
import { OnboardingCarousel } from '../components/OnboardingCarousel';
import { MobileSignup } from '../components/MobileSignup';
import { Dashboard } from '../components/Dashboard';

type AppState = 'splash' | 'onboarding' | 'signup' | 'dashboard';

export default function Index() {
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

  if (currentState === 'splash') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      </div>
    );
  }

  if (currentState === 'onboarding') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <OnboardingCarousel onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  if (currentState === 'signup') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <MobileSignup
            onComplete={handleSignupComplete}
            onBack={handleSignupBack}
          />
        </div>
      </div>
    );
  }

  // Dashboard - Main app
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
      <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
        <Dashboard />
      </div>
    </div>
  );
}

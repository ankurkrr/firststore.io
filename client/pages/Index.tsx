import { useState } from 'react';
import { SplashScreen } from '../components/SplashScreen';
import { OnboardingCarousel } from '../components/OnboardingCarousel';
import { MobileSignup } from '../components/MobileSignup';

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

  // Dashboard placeholder - this would be the main app
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-firststore-teal rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-firststore-dark font-montserrat mb-4">
          Welcome to FirstStore!
        </h1>
        <p className="text-firststore-gray mb-8">
          Your account has been successfully created. You can now start shopping for groceries.
        </p>
        <button
          onClick={() => setCurrentState('splash')}
          className="bg-firststore-teal text-white px-8 py-3 rounded-lg font-montserrat font-semibold"
        >
          Start Over (Demo)
        </button>
      </div>
    </div>
  );
}

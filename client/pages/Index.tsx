import { useState, useCallback, useEffect } from 'react';
import { SplashScreen } from '../components/SplashScreen';
import { OnboardingCarousel } from '../components/OnboardingCarousel';
import { MobileSignup } from '../components/MobileSignup';
import { Dashboard } from '../components/Dashboard';
import ErrorBoundary from '../components/ErrorBoundary';

type AppState = 'splash' | 'onboarding' | 'signup' | 'dashboard';

export default function Index() {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [error, setError] = useState<string | null>(null);

  // Persist state in sessionStorage
  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem('firststore-app-state');
      if (savedState && ['splash', 'onboarding', 'signup', 'dashboard'].includes(savedState)) {
        setCurrentState(savedState as AppState);
      }
    } catch (error) {
      console.warn('Failed to load saved state:', error);
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem('firststore-app-state', currentState);
    } catch (error) {
      console.warn('Failed to save state:', error);
    }
  }, [currentState]);

  const handleSplashComplete = useCallback(() => {
    try {
      setError(null);
      setCurrentState('onboarding');
    } catch (error) {
      console.error('Error completing splash:', error);
      setError('Failed to proceed. Please try again.');
    }
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    try {
      setError(null);
      setCurrentState('signup');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError('Failed to proceed. Please try again.');
    }
  }, []);

  const handleSignupComplete = useCallback(() => {
    try {
      setError(null);
      setCurrentState('dashboard');
    } catch (error) {
      console.error('Error completing signup:', error);
      setError('Failed to proceed. Please try again.');
    }
  }, []);

  const handleSignupBack = useCallback(() => {
    try {
      setError(null);
      setCurrentState('onboarding');
    } catch (error) {
      console.error('Error going back from signup:', error);
      setError('Failed to go back. Please try again.');
    }
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
          <h2 className="text-lg font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-firststore-teal text-white px-4 py-2 rounded-lg hover:bg-firststore-teal/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (currentState === 'splash') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <ErrorBoundary>
            <SplashScreen onComplete={handleSplashComplete} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  if (currentState === 'onboarding') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <ErrorBoundary>
            <OnboardingCarousel onComplete={handleOnboardingComplete} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  if (currentState === 'signup') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
        <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
          <ErrorBoundary>
            <MobileSignup
              onComplete={handleSignupComplete}
              onBack={handleSignupBack}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  // Dashboard - Main app
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:bg-gray-200">
      <div className="w-full max-w-sm mx-auto bg-white md:rounded-3xl overflow-hidden md:shadow-2xl">
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </div>
    </div>
  );
}

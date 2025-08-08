import { useState, useEffect, useCallback } from 'react';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const onboardingData = [
  {
    id: 1,
    title: "Groceries at Your Doorstep in 10–30 Minutes",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/d4d7a54db84daab01cb13111fc494cf55bdcf854?width=672",
    buttonText: "Next"
  },
  {
    id: 2,
    title: "Trusted Franchise Stores Near You",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5f829c3611cd7d8b61946138b1feb81fd6b179f6?width=672",
    buttonText: "Next"
  },
  {
    id: 3,
    title: "Real-Time Tracking & Easy Returns",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e06a5512d73176cbf00205b2687052a034c3242c?width=672",
    buttonText: "Get Started!"
  }
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        try {
          if (currentSlide < onboardingData.length - 1) {
            setCurrentSlide(currentSlide + 1);
          } else {
            onComplete();
          }
        } catch (error) {
          console.error('Error in auto-progression:', error);
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [progress, currentSlide, onComplete]);

  const handleNext = useCallback(() => {
    try {
      if (currentSlide < onboardingData.length - 1) {
        setCurrentSlide(currentSlide + 1);
        setProgress(0);
      } else {
        onComplete();
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
    }
  }, [currentSlide, onComplete]);

  const handleSkip = useCallback(() => {
    try {
      onComplete();
    } catch (error) {
      console.error('Error in handleSkip:', error);
    }
  }, [onComplete]);

  const handleImageError = useCallback((slideIndex: number) => {
    setImageError(prev => ({ ...prev, [slideIndex]: true }));
  }, []);

  // Ensure currentSlide is within bounds
  const safeCurrentSlide = Math.min(Math.max(currentSlide, 0), onboardingData.length - 1);
  const currentData = onboardingData[safeCurrentSlide];

  return (
    <div className="min-h-screen bg-firststore-dark flex flex-col">
      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Progress Indicators */}
        <div className="flex space-x-2 pt-8 px-12 relative z-10">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                index === safeCurrentSlide
                  ? 'w-32 bg-gray-600 relative overflow-hidden'
                  : index < safeCurrentSlide
                  ? 'w-6 bg-firststore-teal'
                  : 'w-6 bg-gray-600'
              }`}
            >
              {index === safeCurrentSlide && (
                <div
                  className="absolute top-0 left-0 h-full bg-firststore-teal transition-all duration-75 ease-linear transform origin-left"
                  style={{
                    width: `${progress}%`,
                    transform: `scaleX(${progress / 100})`,
                    transformOrigin: 'left center'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-8 right-6 text-firststore-teal font-normal text-base tracking-tight z-10 hover:text-firststore-teal/80 transition-colors duration-200"
        >
          Skip →
        </button>

        {/* Title */}
        <div className="px-12 mt-20">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight transition-all duration-700 ease-in-out transform">
            {currentData?.title || 'Welcome to FirstStore'}
          </h1>
        </div>

        {/* Image */}
        <div className="px-12 mt-16">
          {imageError[safeCurrentSlide] ? (
            <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-sm">Image unavailable</p>
              </div>
            </div>
          ) : (
            <img
              src={currentData?.image || ''}
              alt={currentData?.title || 'Onboarding slide'}
              onError={() => handleImageError(safeCurrentSlide)}
              className="w-full h-80 object-cover rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          )}
        </div>

        {/* Next Button */}
        <div className="px-12 mt-8 pb-8">
          <button
            onClick={handleNext}
            className="w-full bg-firststore-teal text-firststore-dark font-bold text-base py-3.5 rounded-2xl tracking-tight transition-all duration-300 ease-in-out hover:bg-firststore-teal/90 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentData?.buttonText || 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

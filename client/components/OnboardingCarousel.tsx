import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentSlide < onboardingData.length - 1) {
            setCurrentSlide(currentSlide + 1);
            return 0;
          } else {
            onComplete();
            return prev;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentSlide, onComplete]);

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentData = onboardingData[currentSlide];

  return (
    <div className="min-h-screen bg-firststore-dark flex flex-col">
      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Progress Indicators */}
        <div className="flex space-x-2 pt-8 px-12 relative z-10">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'w-32 bg-firststore-teal relative overflow-hidden'
                  : index < currentSlide
                  ? 'w-6 bg-firststore-teal'
                  : 'w-6 bg-firststore-gray'
              }`}
            >
              {index === currentSlide && (
                <div
                  className="absolute top-0 left-0 h-full bg-firststore-teal/60 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
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
            {currentData.title}
          </h1>
        </div>

        {/* Image */}
        <div className="px-12 mt-16">
          <img
            src={currentData.image}
            alt={currentData.title}
            className="w-full h-80 object-cover rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Next Button */}
        <div className="px-12 mt-8 pb-8">
          <button
            onClick={handleNext}
            className="w-full bg-firststore-teal text-firststore-dark font-bold text-base py-3.5 rounded-2xl tracking-tight transition-all duration-300 ease-in-out hover:bg-firststore-teal/90 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentData.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

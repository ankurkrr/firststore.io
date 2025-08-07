import { useState } from 'react';

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

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentData = onboardingData[currentSlide];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-8 pt-3 h-11">
        <div className="bg-firststore-dark rounded-full px-3 py-1 flex items-center">
          <span className="text-white text-sm font-normal tracking-tight">9:41</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Signal Bars */}
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-firststore-dark rounded-sm"></div>
            <div className="w-1 h-4 bg-firststore-dark rounded-sm"></div>
            <div className="w-1 h-2 bg-firststore-dark rounded-sm"></div>
            <div className="w-1 h-1 bg-firststore-dark rounded-sm"></div>
          </div>
          {/* WiFi */}
          <svg className="w-4 h-3 text-firststore-dark" fill="currentColor" viewBox="0 0 20 16">
            <path d="M10 12.5C10.8284 12.5 11.5 11.8284 11.5 11C11.5 10.1716 10.8284 9.5 10 9.5C9.17157 9.5 8.5 10.1716 8.5 11C8.5 11.8284 9.17157 12.5 10 12.5Z"/>
            <path d="M10 7.5C12.2091 7.5 14.2091 8.2909 15.7136 9.7954L14.2993 11.2097C13.1404 10.0508 11.57 9.5 10 9.5C8.43 9.5 6.85957 10.0508 5.70067 11.2097L4.28645 9.7954C5.79091 8.2909 7.79091 7.5 10 7.5Z"/>
            <path d="M10 4.5C13.3137 4.5 16.3137 5.7909 18.5355 8.0127L17.1213 9.427C15.5563 7.862 13.2781 7 10 7C6.72188 7 4.44375 7.862 2.87868 9.427L1.46447 8.0127C3.68625 5.7909 6.68625 4.5 10 4.5Z"/>
          </svg>
          {/* Battery */}
          <div className="w-6 h-3 border border-firststore-dark/35 rounded-sm flex items-center">
            <div className="w-4 h-2 bg-firststore-dark rounded-xs mx-0.5"></div>
            <div className="w-0.5 h-1 bg-firststore-dark/40 rounded-r"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-firststore-dark rounded-t-2xl mx-4 mt-4 relative overflow-hidden">
        {/* Progress Indicators */}
        <div className="flex space-x-2 pt-6 px-13">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full ${
                index === currentSlide
                  ? 'w-32 bg-firststore-teal'
                  : index < currentSlide
                  ? 'w-6 bg-firststore-teal'
                  : 'w-6 bg-firststore-gray'
              }`}
            />
          ))}
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-firststore-teal font-normal text-base tracking-tight"
        >
          Skip →
        </button>

        {/* Title */}
        <div className="px-13 mt-20">
          <h1 className="text-white text-5xl font-bold leading-tight tracking-tight">
            {currentData.title}
          </h1>
        </div>

        {/* Image */}
        <div className="px-13 mt-16">
          <img
            src={currentData.image}
            alt={currentData.title}
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Next Button */}
        <div className="px-13 mt-8 pb-6">
          <button
            onClick={handleNext}
            className="w-full bg-firststore-teal text-firststore-dark font-bold text-base py-3.5 rounded-2xl tracking-tight"
          >
            {currentData.buttonText}
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-5 pt-3">
        <div className="w-33 h-1.5 bg-firststore-dark rounded-full"></div>
      </div>
    </div>
  );
}

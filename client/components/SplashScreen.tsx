import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-firststore-dark flex flex-col items-center justify-center transition-opacity duration-300 z-50 ${
        showSplash ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-8 pt-3">
        <div className="bg-white rounded-full px-3 py-1 flex items-center">
          <span className="text-firststore-dark text-sm font-normal tracking-tight">9:41</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Signal Bars */}
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white rounded-sm"></div>
            <div className="w-1 h-4 bg-white rounded-sm"></div>
            <div className="w-1 h-2 bg-white rounded-sm"></div>
            <div className="w-1 h-1 bg-white rounded-sm"></div>
          </div>
          {/* WiFi */}
          <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 20 16">
            <path d="M10 12.5C10.8284 12.5 11.5 11.8284 11.5 11C11.5 10.1716 10.8284 9.5 10 9.5C9.17157 9.5 8.5 10.1716 8.5 11C8.5 11.8284 9.17157 12.5 10 12.5Z"/>
            <path d="M10 7.5C12.2091 7.5 14.2091 8.2909 15.7136 9.7954L14.2993 11.2097C13.1404 10.0508 11.57 9.5 10 9.5C8.43 9.5 6.85957 10.0508 5.70067 11.2097L4.28645 9.7954C5.79091 8.2909 7.79091 7.5 10 7.5Z"/>
            <path d="M10 4.5C13.3137 4.5 16.3137 5.7909 18.5355 8.0127L17.1213 9.427C15.5563 7.862 13.2781 7 10 7C6.72188 7 4.44375 7.862 2.87868 9.427L1.46447 8.0127C3.68625 5.7909 6.68625 4.5 10 4.5Z"/>
          </svg>
          {/* Battery */}
          <div className="w-6 h-3 border border-white/35 rounded-sm flex items-center">
            <div className="w-4 h-2 bg-white rounded-xs mx-0.5"></div>
            <div className="w-0.5 h-1 bg-white/40 rounded-r"></div>
          </div>
        </div>
      </div>

      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-firststore-teal rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
          </svg>
        </div>
        <h1 className="text-white text-2xl font-montserrat font-bold">FirstStore</h1>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <div className="w-33 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  );
}

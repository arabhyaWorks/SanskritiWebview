import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.png';
import banner3 from '../assets/banner/banner3.png';

const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full px-4 py-5">
      <div 
        className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-lg"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          
          const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const diff = startX - touch.clientX;
            
            if (Math.abs(diff) > 50) {
              if (diff > 0) {
                handleNext();
              } else {
                handlePrev();
              }
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          
          document.addEventListener('touchmove', handleTouchMove, { once: true });
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
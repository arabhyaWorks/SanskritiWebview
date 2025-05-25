import React from 'react';
import panjikaran from '../assets/Panjikaran.png';

const PanjikaranSection: React.FC = () => {
  return (
    <div className="w-full px-4 py-3">
      <div className="relative w-full rounded-[13px] overflow-hidden">
        <img 
          src={panjikaran} 
          alt="Panjikaran" 
          className="w-full object-cover"
        />
        <div 
          className="absolute bottom-0 left-0 w-full pb-1"
        >
          <h2 
            className="font-['Baloo_2'] font-bold text-[30px] leading-[107%] text-[#652211] pl-5"
          >
            कलाकार पंजीकरण करें
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PanjikaranSection;
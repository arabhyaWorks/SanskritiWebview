import React from 'react';
import abstract from '../assets/abstract.png';

const CultureSection: React.FC = () => {
  return (
    <div className="w-full px-4  flex flex-col items-center">
      <h1 className="font-['Inter'] font-bold text-[24px] text-[#5A1616] text-center leading-tight">
        संस्कृति विभाग, उत्तर प्रदेश
      </h1>
      <h2 className="font-['Inter'] font-semibold text-[16px] text-[#D25454] text-center ">
        कला, इतिहास और परंपरा का संगम
      </h2>
      <img 
        src={abstract} 
        alt="Abstract Design"
        className="w-[40%]  mt-1"
      />
    </div>
  );
};

export default CultureSection;
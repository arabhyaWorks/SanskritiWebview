import React from 'react';
import abstract from '../assets/abstract.png';
import { TranslatableText } from './TranslatableText';

const CultureSection: React.FC = () => {
  return (
    <div className="w-full px-4  flex flex-col items-center">
      <TranslatableText
        text="संस्कृति विभाग, उत्तर प्रदेश"
        className="font-['Inter'] font-bold text-[24px] text-[#5A1616] text-center leading-tight"
        as="h1"
      />
      <TranslatableText
        text="कला, इतिहास और परंपरा का संगम"
        className="font-['Inter'] font-semibold text-[16px] text-[#D25454] text-center"
        as="h2"
      />
      <img 
        src={abstract} 
        alt="Abstract Design"
        className="w-[40%]  mt-1"
      />
    </div>
  );
};

export default CultureSection;
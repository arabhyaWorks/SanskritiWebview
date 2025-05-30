import React from 'react';
import footerImg from '../assets/footer/footerImg.png';
import upLogo from '../assets/footer/upLogo.svg';

const Footer: React.FC = () => {
  return (
    <div className="relative w-full mt-8 mb-20 bg-white">

      <div className="absolute inset-0 flex flex-col items-center pt-4">
        <img 
          src={upLogo} 
          alt="UP Logo" 
          className="w-[70px] h-[70px] mb-2"
        />
        <div className="text-center -mt-3">
          <h1 className="font-['Inter'] font-bold text-[22px] leading-[37px] text-[#903603]">
            संस्कृति विभाग,
          </h1>
          <h1 className="font-['Inter'] font-bold text-[22px] leading-[37px] text-[#903603] -mt-3 mb-5">
            उत्तर प्रदेश सरकार
          </h1>
        </div>

              <img 
        src={footerImg} 
        alt="Footer Background" 
        className="w-full h-[180px] object-contain"
        style={{ objectPosition: 'bottom' }}
      />
      </div>
    </div>
  );
};

export default Footer;
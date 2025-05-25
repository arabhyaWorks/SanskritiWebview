import React from 'react';
import upLogo from '../assets/icons/upLogo.svg';
import bgHeader from '../assets/bgHeader.png';
import languageIcon from '../assets/icons/language.png';

const Header: React.FC = () => {
  return (
    <div className="relative w-full h-[65px]">
      <div className="flex w-full h-full">
        <div className="relative w-[80%] h-full">
          <img 
             style={{borderBottomRightRadius: '180px' }}
            src={bgHeader} 
            alt="Header Background" 
            className="absolute inset-0 w-full object-cover"
          />
          <div className="relative flex items-center h-full px-4">
            <div className="flex items-center">
              <img src={upLogo} alt="UP Government Logo" className="w-14 h-14" />
              <div className="ml-3">
                <h1 className="text-white font-['Inter'] text-xl leading-tight">
                  संस्कृति विभाग
                </h1>
                <h2 className="text-white font-['Inter'] text-xl leading-tight">
                  उत्तर प्रदेश सरकार
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-end px-4">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img src={languageIcon} alt="Language" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
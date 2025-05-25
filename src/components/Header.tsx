import React from 'react';
import { useState } from 'react';
import upLogo from '../assets/icons/upLogo.svg';
import bgHeader from '../assets/bgHeader.png';
import languageIcon from '../assets/icons/language.png';
import LanguageModal from './LanguageModal';
import { useLanguage } from '../contexts/LanguageContext';
import { TranslatableText } from './TranslatableText';

const Header: React.FC = () => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setIsLanguageModalOpen(false);
  };

  return (
    <>
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
                <TranslatableText
                  text="संस्कृति विभाग"
                  className="text-white font-['Inter'] text-xl leading-tight"
                  as="h1"
                />
                <TranslatableText
                  text="उत्तर प्रदेश सरकार"
                  className="text-white font-['Inter'] text-lg leading-tight"
                  as="h2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-end px-4">
          <button 
            onClick={() => setIsLanguageModalOpen(true)}
            className="bg-white p-2 rounded-lg shadow-lg active:scale-95 transition-transform"
          >
            <img src={languageIcon} alt="Language" className="w-10 h-10" />
          </button>
        </div>
      </div>
      </div>
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onSelectLanguage={handleLanguageSelect}
      />
    </>
  );
};

export default Header;
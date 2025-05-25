import React from 'react';
import { X } from 'lucide-react';
import { supportedLanguages } from '../utils/languages';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (code: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose, onSelectLanguage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-xl">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-brown-100 flex justify-between items-center">
          <h2 className="font-['Baloo_2'] text-xl font-bold text-[#5A1616]">
            भाषा चुनें / Select Language
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3 max-h-[60vh]">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLanguage(lang.code);
                onClose();
              }}
              className="flex items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-[#903603] hover:bg-[#903603]/5 transition-colors"
            >
              <span className="font-['Inter'] text-base text-[#903603] font-bold">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import orgStructure from '../assets/Org_page-0001.jpg';

interface OrgStructureProps {
  onClose: () => void;
}

const OrgStructure: React.FC<OrgStructureProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="संगठनात्मक ढांचा"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg">
          <img
            src={orgStructure}
            alt="Organizational Structure"
            className="w-full "
          />
        </div>
      </div>
    </div>
  );
};

export default OrgStructure;
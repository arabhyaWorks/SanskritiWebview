import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';
import Archaeology from './Archaeology'; // Import the Archaeology component
import Museum from './Museum';
import Archives from './Archives';
import MusicDramaAcademy from './MusicDramaAcademy';
import FineArtsAcademy from './FineArtsAcademy';
import BhatkhadeInstitute from './BhatkhadeInstitute';
import BhartenduAcademy from './BhartenduAcademy';
import AyodhyaInstitute from './AyodhyaInstitute';
import TribalFolkInstitute from './TribalFolkInstitute';
import BuddhistInstitute from './BuddhistInstitute';

interface DepartmentProps {
  onClose: () => void;
}

const Department: React.FC<DepartmentProps> = ({ onClose }) => {
  const [showArchaeology, setShowArchaeology] = useState(false);
  const [showMuseum, setShowMuseum] = useState(false);
  const [showArchives, setShowArchives] = useState(false);
  const [showMusicDrama, setShowMusicDrama] = useState(false);
  const [showFineArts, setShowFineArts] = useState(false);
  const [showBhatkhande, setShowBhatkhande] = useState(false);
  const [showBhartendu, setShowBhartendu] = useState(false);
  const [showAyodhya, setShowAyodhya] = useState(false);
  const [showTribalFolk, setShowTribalFolk] = useState(false);
  const [showBuddhistInstitute, setShowBuddhistInstitute] = useState(false);

  const departments = [
    'उ०प्र० राज्य पुरातत्व निदेशालय',
    'उ०प्र० संग्रहालय निदेशालय',
    'उ०प्र० राजकीय अभिलेखागार',
    'भातखण्डे संगीत संस्थान',
    'भारतेन्दु नाट्य अकादमी',
    'संगीत नाटक अकादमी',
    'ललित कला अकादमी',
    'अयोध्या शोध संस्थान',
    'जनजाति एवं लोक कला संस्कृति संस्थान',
    'उ०प्र० जैन विद्या शोध संस्थान',
    'आचार्य नरेन्द्र देव अन्तर्राष्ट्रीय बौध विधा शोध संस्थान',
    'बिरजू महाराज कथक संस्थान',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundAttachment: 'fixed',
          zIndex: -1,
        }}
      />
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="विभाग"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img src={abstract} alt="Abstract Design" className="w-40 mx-auto mb-6" />

          <div className="grid gap-4">
            {departments.map((department, index) => (
              <div
                key={index}
                className="bg-[#5A1616]/5 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all border-l-4 border-[#903603] group cursor-pointer flex items-center justify-between active:scale-98 hover:bg-[#5A1616]/10"
                onClick={() => {
                  if (index === 0) {
                    setShowArchaeology(true);
                  } else if (index === 1) {
                    setShowMuseum(true);
                  } else if (index === 2) {
                    setShowArchives(true);
                  } else if (index === 5) {
                    setShowMusicDrama(true);
                  } else if (index === 3) {
                    setShowBhatkhande(true);
                  } else if (index === 4) {
                    setShowBhartendu(true);
                  } else if (index === 6) {
                    setShowFineArts(true);
                  } else if (index === 7) {
                    setShowAyodhya(true);
                  } else if (index === 8) {
                    setShowTribalFolk(true);
                  } else if (index === 10) {
                    setShowBuddhistInstitute(true);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-12 bg-[#903603] rounded-r-full opacity-20 group-hover:opacity-40 transition-opacity" />
                  <TranslatableText
                    text={department}
                    className="text-[#5A1616] text-lg font-['Baloo_2'] font-extrabold group-hover:text-[#903603] transition-colors"
                  />
                </div>
                <ChevronRight className="w-5 h-5 text-[#903603] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>

          <img src={abstract} alt="Abstract Design" className="w-40 mx-auto mt-8" />
        </div>
      </div>

      {showArchaeology && <Archaeology onClose={() => setShowArchaeology(false)} />}
      {showMuseum && <Museum onClose={() => setShowMuseum(false)} />}
      {showArchives && <Archives onClose={() => setShowArchives(false)} />}
      {showMusicDrama && <MusicDramaAcademy onClose={() => setShowMusicDrama(false)} />}
      {showFineArts && <FineArtsAcademy onClose={() => setShowFineArts(false)} />}
      {showBhatkhande && <BhatkhadeInstitute onClose={() => setShowBhatkhande(false)} />}
      {showBhartendu && <BhartenduAcademy onClose={() => setShowBhartendu(false)} />}
      {showAyodhya && <AyodhyaInstitute onClose={() => setShowAyodhya(false)} />}
      {showTribalFolk && <TribalFolkInstitute onClose={() => setShowTribalFolk(false)} />}
      {showBuddhistInstitute && <BuddhistInstitute onClose={() => setShowBuddhistInstitute(false)} />}

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Department;
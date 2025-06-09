import React, { useState } from 'react';
import { TranslatableText } from './TranslatableText';
import humareBareMein from '../assets/icons/Humare-bare-mein.png';
import vibhag from '../assets/icons/Vibhag.png';
import kalakarPanjikaran from '../assets/icons/KalakarPanjikaran.png';
import sanskritikKaryakram from '../assets/icons/SanskritikKaryakram.png';
import uttarPradesh from '../assets/icons/UttarPradesh.png';
import dirgha from '../assets/icons/Dirgha.png';
import Gallery from './Gallery';
import CulturalPartner from './CulturalPartner';
import kalyankariYojnayen from '../assets/icons/KalyankariYojnayen.png';
import prekshagrihaBooking from '../assets/icons/PrekshagrihaBooking.png';
import nagrikCharter from '../assets/icons/NagrikCharter.png';
import Kalyankari from './Kalyankari';
import CitizenCharter from './CitizenCharter';
import DirectorApplications from './DirectorApplications';
import PensionScheme from './PensionScheme';

interface IconsSectionProps {
  onAboutUsClick: () => void;
  onDepartmentClick: () => void;
  onProfileClick: () => void;
  onEventsClick:() => void; 
  
}

const IconsSection: React.FC<IconsSectionProps> = ({ onAboutUsClick, onDepartmentClick, onProfileClick, onEventsClick }) => {
  const [showKalyankari, setShowKalyankari] = useState(false);
  const [showCitizenCharter, setShowCitizenCharter] = useState(false);
  const [showCulturalPartner, setShowCulturalPartner] = useState(false);
  const [showDirectorApplications, setShowDirectorApplications] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showPensionScheme, setShowPensionScheme] = useState(false);

  const icons = [
    { img: humareBareMein, text: 'हमारे बारे में', key: 'about-us', onClick: onAboutUsClick, 'data-about-us': true },
    { img: vibhag, text: 'विभाग', key: 'department', onClick: onDepartmentClick },
    { img: kalakarPanjikaran, text: 'कलाकार\nपंजीकरण', key: 'artist-registration' , onClick:onProfileClick },
    { img: sanskritikKaryakram, text: 'सांस्कृतिक कार्यक्रम', key: 'cultural-program', onClick:onEventsClick},
    { img: uttarPradesh, text: 'उत्तर प्रदेश की संरचना', key: 'up-structure', url: 'https://upculture.up.nic.in/sites/default/files/documents/Coffee-table-book-final-new-resize-cdr.pdf'  },
    { img: dirgha, text: 'दीर्घा', key: 'gallery', onClick: () => setShowGallery(true) },
    { img: kalyankariYojnayen, text: 'कल्याणकारी योजनायें', key: 'welfare-schemes', onClick: () => setShowKalyankari(true) },
    { img: prekshagrihaBooking, text: 'प्रेक्षागृह\nबुकिंग', key: 'auditorium-booking', url: 'https://artistdirectoryupculture.com/ebooking' },
    { img: nagrikCharter, text: 'नागरिक\nचार्टर', key: 'citizen-charter', onClick: () => setShowCitizenCharter(true) },
  ];

  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-3 gap-4">
        {icons.map((icon, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="bg-white rounded-2xl shadow-lg pb-2 w-24 h-24 flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
              onClick={icon.url ? () => window.open(icon.url, '_blank') : icon.onClick}
            >
              <img src={icon.img} alt={icon.text} className="w-16 h-16" />
              <p
                className="font-['Baloo_2'] font-bold text-center text-[15px] whitespace-pre-line text-[#9C0505]"
                style={{ marginTop: '-5px', lineHeight: '1.1' }}
              >
                <TranslatableText text={icon.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
      {showKalyankari && (
        <Kalyankari 
          onClose={() => setShowKalyankari(false)} 
          onCulturalPartnerClick={() => {
            setShowKalyankari(false);
            setShowCulturalPartner(true);
          }}
          onDirectorApplicationClick={() => {
            setShowKalyankari(false);
            setShowDirectorApplications(true);
          }}
          onPensionSchemeClick={() => {
            setShowKalyankari(false);
            setShowPensionScheme(true);
          }}
        />
      )}
      {showCulturalPartner && (
        <CulturalPartner onClose={() => setShowCulturalPartner(false)} />
      )}
      {showDirectorApplications && (
        <DirectorApplications onClose={() => setShowDirectorApplications(false)} />
      )}
      {showPensionScheme && (
        <PensionScheme onClose={() => setShowPensionScheme(false)} />
      )}
      {showGallery && (
        <Gallery onClose={() => setShowGallery(false)} />
      )}
      {showCitizenCharter && (
        <CitizenCharter onClose={() => setShowCitizenCharter(false)} />
      )}
    </div>
  );
};

export default IconsSection;

import React from 'react';
import humareBareMein from '../assets/icons/Humare-bare-mein.png';
import vibhag from '../assets/icons/Vibhag.png';
import kalakarPanjikaran from '../assets/icons/KalakarPanjikaran.png';
import sanskritikKaryakram from '../assets/icons/SanskritikKaryakram.png';
import uttarPradesh from '../assets/icons/UttarPradesh.png';
import dirgha from '../assets/icons/Dirgha.png';
import kalyankariYojnayen from '../assets/icons/KalyankariYojnayen.png';
import prekshagrihaBooking from '../assets/icons/PrekshagrihaBooking.png';
import nagrikCharter from '../assets/icons/NagrikCharter.png';

const IconsSection: React.FC = () => {
  const icons = [
    { img: humareBareMein, text: 'हमारे बारे में' },
    { img: vibhag, text: 'विभाग' },
    { img: kalakarPanjikaran, text: 'कलाकार\nपंजीकरण' },
    { img: sanskritikKaryakram, text: 'सांस्कृतिक कार्यक्रम' },
    { img: uttarPradesh, text: 'उत्तर प्रदेश की संरचना' },
    { img: dirgha, text: 'दीर्घा' },
    { img: kalyankariYojnayen, text: 'कल्याणकारी योजनायें' },
    { img: prekshagrihaBooking, text: 'प्रेक्षागृह\nबुकिंग' },
    { img: nagrikCharter, text: 'नागरिक\nचार्टर' },
  ];

  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-3 gap-4">
        {icons.map((icon, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-lg  pb-2 w-24 h-24 flex flex-col items-center">
              <img src={icon.img} alt={icon.text} className="w-16 h-16" />
              <p
                className="font-['Baloo_2'] font-bold text-center text-[15px] whitespace-pre-line text-[#9C0505]"
                style={{ marginTop: '-5px', lineHeight: '1.1' }}
              >
                {icon.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconsSection;
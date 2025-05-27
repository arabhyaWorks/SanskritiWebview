import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, FileText } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif'; 
import AdoptHeritage from './AdoptHeritage';

interface KalyankariProps {
  onClose: () => void;
  onCulturalPartnerClick: () => void;
  onDirectorApplicationClick: () => void;
  onPensionSchemeClick: () => void;
}

const Kalyankari: React.FC<KalyankariProps> = ({ onClose, onCulturalPartnerClick, onDirectorApplicationClick, onPensionSchemeClick }) => {
  const [showAdoptHeritage, setShowAdoptHeritage] = useState(false);

  const schemes = [
    {
      title: 'गैर सरकारी संस्थाओं का पंजीकरण',
      isNew: true,
      onClick: onCulturalPartnerClick
    },
    { 
      title: 'भारतीय वायु सेना- अग्रिवीर वायु (सीनियर)/(एग्जिक्यूटिव) अधिसूचना/विज्ञापन', 
      isNew: true,
      url: 'https://upculture.up.nic.in/sites/default/files/2025-04/AV_Musician_Rally_01-2026_0.pdf'
    },
    { 
      title: 'जैन पुरस्कारों हेतु आवेदन फॉर्म', 
      url: 'https://upjvri.org.in/wp-content/uploads/2024/11/%E0%A4%A8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%82%E0%A4%95%E0%A4%A8-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0-2024_UPJVRI.pdf'
    },
    { 
      title: 'संस्कृति विभाग, उत्तर प्रदेश की अधीनस्थ स्वायत्तशासी संस्थाओं में, निदेशक के पद पर नियुक्ति हेतु आवेदन-पत्र',
      onClick: onDirectorApplicationClick
    },
    { 
      title: 'लोक कलाकार हेतु वाद्य यन्त्र अनुदान योजना', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/vadya%20yantra%20form%20new.pdf'
    },
    { 
      title: 'कलाकारों का टर्म-मनदेय के संबंध में', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/kalakar%20manday.pdf'
    },
    { 
      title: 'अडॉप्ट ए हेरिटेज योजना के अंतर्गत रूचि की अभिव्यक्ति हेतु आमंत्रण',
      onClick: () => setShowAdoptHeritage(true)
    },
    { 
      title: 'उ0 प्र0 वृद्ध एवं विपन्न कलाकारों की मासिक पेंशन योजना',
      onClick: onPensionSchemeClick
    },
    { 
      title: 'संत, महात्माओं,महापुरुषों आदि की प्रतिमा स्थापित किए जाने के संबंध में', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/murti%20nirman_merged.pdf'
    },
    { 
      title: 'लोक कलाकार वाद्ययंत्र क्रय योजना', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/vadya%20yantra%20form.pdf'
    },
    { 
      title: 'उत्तर प्रदेश गौरव सम्मान २०२१-२२', 
      url: 'https://artistdirectoryupculture.com/upcalture/gaurav-samman-form.pdf'
    },
    { title: 'भारत सरकार की अनुदान की योजनायें' },
        { 
      title: 'उ0 प्र0 वृद्ध एवं विपन्न कलाकारों को आर्थिक सहायता - 2009', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/gomadical.pdf'
    },
    { 
      title: 'अवध महोत्सव 2023 हेतु आवेदन पत्र', 
      url: 'https://upculture.up.nic.in/sites/default/files/documents/Form%20Awadh%20Mahotsav-2023.pdf'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundAttachment: 'fixed',
          zIndex: -1
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
            text="कल्याणकारी योजनायें"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-3 py-4 shadow hover:shadow-md transition-all border border-[#903603]/10 hover:border-[#903603]/30 group cursor-pointer"
                onClick={scheme.url ? () => window.open(scheme.url, '_blank') : scheme.onClick}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <FileText className="w-5 h-5 text-[#903603]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start gap-2">
                      <TranslatableText
                        text={scheme.title}
                        className="text-[#5A1616] font-['Baloo_2'] text-sm font-bold group-hover:text-[#903603] transition-colors leading-tight break-words"
                      />
                      {scheme.isNew && (
                        <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide shrink-0">
                          New
                        </div>
                      )}
                    </div>
                    {scheme.details && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                        <span>
                          <TranslatableText text={`आकार: ${scheme.details.size}`} />
                        </span>
                        <span>•</span>
                        <span>
                          <TranslatableText text={`प्रारूप: ${scheme.details.format}`} />
                        </span>
                        <span>•</span>
                        <span>
                          <TranslatableText text={`भाषा: ${scheme.details.language}`} />
                        </span>
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#903603] opacity-50 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showAdoptHeritage && (
        <AdoptHeritage onClose={() => setShowAdoptHeritage(false)} />
      )}

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Kalyankari;
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface BuddhistInstituteProps {
  onClose: () => void;
}

const BuddhistInstitute: React.FC<BuddhistInstituteProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-4xl mx-auto">
          <button
            onClick={onClose}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="आचार्य नरेन्द्र देव अन्तर्राष्ट्रीय बौध विधा शोध संस्थान"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="संक्षिप्त परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="आचार्य नरेन्द्र देव अन्तर्राष्ट्रीय बौद्घ विद्या शोध संस्थान का गठन वर्ष १९८५ में संस्कृति विभाग, उ०प्र० शासन के अन्तर्गत स्वायत्तशासी संस्थान के रूप में हुआ। संस्थान की स्थापना राष्ट्रीय एवं अन्तर्राष्ट्रीय स्तर पर बौद्घ धर्म, दर्शन, कला एवं संस्कृति के विकास को प्रतिस्थापित करने के उद्‌देश्य से की गयी है। बौद्घ धर्म एवं दर्शन की सांस्कृतिक महत्व की परम्परागत एवं आधारभूत मान्यताओ, मानवीय मूल्यों, कला अवशेषों का संरक्षण एवं विश्लेषण की जानकारी उपलब्ध कराता है।" />
                </p>
              </div>
            </section>

            <div className="bg-[#903603]/5 rounded-lg p-6 mt-8">
              <p className="text-[#5A1616]/80 text-sm">
                <TranslatableText text="नोटः- यह विभाग शासनादेश संख्या-667/चार-09-13(25)/86ए टीसी दिनांक 24 फरवरी, 2009 को आवास एवं शहरी नियोजन विभाग, उ0प्र0 को हस्तान्तरित हो चुका है।" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default BuddhistInstitute;
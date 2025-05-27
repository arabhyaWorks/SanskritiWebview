import React from 'react';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import Footer from './Footer';
import abstract from '../assets/abstract.png';
import backgroundImage from '../assets/VibhgaBG.avif';

interface CulturalPartnerProps {
  onClose: () => void;
}

const CulturalPartner: React.FC<CulturalPartnerProps> = ({ onClose }) => {
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
            text="कल्चरल पार्टनर"
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
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#903603] text-center">
              <TranslatableText text="उत्तर प्रदेश संस्कृति विभाग की नई पहल !" />
            </h2>
            
            <h3 className="text-xl font-bold text-[#5A1616] text-center">
              <TranslatableText text="कल्चरल पार्टनर बनें!" />
            </h3>

            <img
              src="https://upculture.up.nic.in/sites/default/files/inline-images/culture%20partner_0.jpeg"
              alt="Cultural Partner"
              className="w-full rounded-lg shadow-md"
            />

            <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
              <TranslatableText 
                text="उत्तर प्रदेश संस्कृति विभाग ने राज्य की समृद्ध सांस्कृतिक विरासत को संरक्षित करने और नई पीढ़ी को उससे जोड़ने के लिए उत्तर प्रदेश में कला एवं संस्कृति के क्षेत्र में कार्य करने वाली गैर सरकारी संस्थाओं का पंजीकरण आमंत्रित किया जा रहा है।"
              />
            </p>

            <div className="space-y-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScvKWQYDFYJtE3LZnwXbHq1tBrWRiZJbNSBGF3_mVK2vsetVw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#903603] text-white py-3 px-6 rounded-lg text-center font-bold hover:bg-[#5A1616] transition-colors flex items-center justify-center gap-2 group"
              >
                <TranslatableText text="पंजीकरण करें" />
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="https://drive.google.com/file/d/18djD6P-QTgPbTgEaPSpXXbltwhtcnJjo/view"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white border-2 border-[#903603] text-[#903603] py-3 px-6 rounded-lg text-center font-bold hover:bg-[#903603] hover:text-white transition-colors flex items-center justify-center gap-2 group"
              >
                <TranslatableText text="शासनादेश डाउनलोड करें" />
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
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

export default CulturalPartner;
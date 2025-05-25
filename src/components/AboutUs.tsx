import React from 'react';
import { TranslatableText } from './TranslatableText';
import { ChevronLeft, LayoutTemplate, Users2, PhoneCall } from 'lucide-react';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface AboutUsProps {
  onClose: () => void;
  onOrgStructureClick: () => void;
  onWhoClick: () => void;
  onContactClick: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose, onOrgStructureClick, onWhoClick, onContactClick }) => {
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
            text="हमारे बारे में"
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
            className="w-60 mx-auto mb-6 opacity-100"
          />
          <TranslatableText
            text={`संस्कृति, वैज्ञानिक अनुसंधान एवं ललित कला सम्बन्धी विविध गतिविधियों के संवर्धन एवं सम्पयक् समन्वय हेतु <strong>सन् 1957</strong> में <strong>'इन्डोलाॅजी, संस्कृति एवं साइन्टिफिक रिसर्च'</strong> नामक विभाग की स्थापना की गयी। इस नवसृजित विभाग के कार्यक्षेत्र में <strong>संग्रहालय, पुरातत्व, भूविज्ञान एवं खनन, राजकीय वेधशाला, नैनीताल, 'गवर्नमेंट कॉलेज ऑफ फाइन आर्ट्स एंड क्राफ्ट'</strong>, वैज्ञानिक अनुसंधान कमेटी एवं अन्य संस्थाये जैसे रजा लाइब्रेरी, रामपुर; जी.एन. झाा शोध संस्थान, इलाहाबाद (वर्तमान प्रयागराज); नागरी प्रचारिणी सभा, वाराणसी; यू.पी. हिस्टाॅरिकल सोसायटी; भातखण्डे काॅलेज ऑफ हिन्दुस्तानी म्यूजिक आदि सम्मिलितत थे। सन् 1959 में इसे <strong>सांस्कृतिक कार्य एवं वैज्ञानिक अनुसंधान</strong> की संज्ञा दी गई। सन् 1961 में भूविज्ञान एवं खनन सम्बन्धी कार्य उद्योग विभाग को स्थानान्तरित किया गया। कालान्तर में नैनीताल स्थित वेधशाला को इससे पृथक कर सन् 1975 में विभाग का नाम <strong>सांस्कृतिक कार्य विभाग</strong> रखा गया जिसे बाद में <strong>संस्कृति विभाग</strong> की संज्ञा दी गई।`}
            className="text-[#5A1616] text-mb leading-relaxed mb-12 font-['Inter'] text-justify"
            as="p"
          />

          <img
            src={abstract}
            alt="Abstract Design"
            className="w-60 mx-auto mb-6 opacity-100"
          />

          <div className="grid grid-cols-1 gap-6">
            <button
              className="group w-full bg-[#FFF5F5] hover:bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex items-start gap-4 border border-red-400"
              onClick={onOrgStructureClick}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shrink-0 shadow-sm group-hover:shadow transition-shadow">
                <LayoutTemplate className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <TranslatableText
                  text="संगठनात्मक ढांचा"
                  className="text-lg font-bold text-[#5A1616] block"
                />
                <TranslatableText
                  text="संगठन की संरचना और विभाग"
                  className="text-sm text-gray-500 block"
                />
              </div>
            </button>

            <button
              className="group w-full bg-[#F5F8FF] hover:bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex items-start gap-4 border border-blue-400"
              onClick={onWhoClick}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shrink-0 shadow-sm group-hover:shadow transition-shadow">
                <Users2 className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <TranslatableText
                  text="कौन क्या है"
                  className="text-lg font-bold text-[#5A1616] block"
                />
                <TranslatableText
                  text="हमारे बोर्ड सदस्य और नेतृत्व"
                  className="text-sm text-gray-500 block"
                />
              </div>
            </button>

            <button
              className="group w-full bg-[#F5FFF8] hover:bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex items-start gap-4 border border-green-400"
              onClick={onContactClick}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shrink-0 shadow-sm group-hover:shadow transition-shadow">
                <PhoneCall className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <TranslatableText
                  text="हमसे संपर्क करें"
                  className="text-lg font-bold text-[#5A1616] block"
                />
                <TranslatableText
                  text="संपर्क विवरण और पता"
                  className="text-sm text-gray-500 block"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
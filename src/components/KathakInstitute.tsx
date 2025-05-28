import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface KathakInstituteProps {
  onClose: () => void;
}

const KathakInstitute: React.FC<KathakInstituteProps> = ({ onClose }) => {
  const performances = [
    'मनीषा मिश्रा', 'मरमी मेधी', 'अरचना तिवारी एवं विकास पाण्डेय', 
    'आदि देव महादेव एवं कुमकुम आदर्श', 'स्मृति मिश्रा', 'रूकमणि जयसवाल',
    'प्रवीण गंगानी', 'विधि नागर', 'रूपा रानी बोरा', 'शर्मिष्ठा शाहा',
    'मधुमिता राय', 'प्रदीप अडवानी'
  ];

  const kathakFestival = [
    'हरीश गंगानी', 'शमा भाटे', 'चेतना जालान', 'अर्जुन मिश्र, अनुज एवं स्मृति',
    'विनाहरि देश पाण्डेय', 'नलिनी, कमलिनी'
  ];

  const rasrang = [
    'सिमरन', 'अदिति मंगल दास', 'शाश्वती सेन', 'रूचि खरे',
    'विद्याहरि देश पाण्डेय', 'असीम बन्धु भट्‌टाचार्य', 'वासुदेवा'
  ];

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
            text="राष्ट्रीय कथक संस्थान"
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
                  <TranslatableText text="राष्ट्रीय कथक संस्थान, लखनऊ की स्थापना संस्कृति विभाग के अन्तर्गत स्वायत्शासी संस्थान के रूप में वर्ष १९८८-१९८९ में हुई थी। इस संस्थान का उद्‌देश्य राष्ट्रीय स्तर पर कथक के विविध घरानों की परम्पराओं का अभिलेखीकरण, युवा प्रतिभाओं को प्रोत्साहन, वरिष्ठ कलाकारों का संरक्षण एवं कथक नृत्य का संवर्धन है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="हाबी कोर्स" />
              </h2>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="राष्ट्रीय कथक संस्थान द्वारा पूर्व में प्रशिक्षण प्राप्त कर रही द्दात्राओं को अग्रिम शिक्षा प्रदान करने के लिए एडवांस प्रथम, द्वितीय एवं तृतीय तथा प्रथमा, मंध्यमा एवं विशारद प्रथम एवं विशारद द्वितीय की कक्षायेँ चलायी जा रहीं।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="कथक संध्या" />
              </h2>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-[#5A1616] mb-4 font-['Inter']">
                  <TranslatableText text="कथक संध्या संस्थान द्वारा प्रत्येक माह के तृतीय शुक्रवार को मासिक कथक संध्या आयोजित की जाती है। इस कथक संध्या के अन्तर्गत अब तक निम्नलिखित कलाकारों द्वारा अपने दल के साथ प्रस्तुतिया दी जा चुकी है:" />
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {performances.map((artist, index) => (
                    <div key={index} className="bg-[#903603]/5 p-3 rounded-lg">
                      <TranslatableText text={artist} className="text-[#5A1616]" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="कथक समारोह" />
              </h2>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-[#5A1616] mb-4 font-['Inter']">
                  <TranslatableText text="उत्तर भारत की कथक नृत्य की शास्त्रीय शैली को संरक्षित कर संवर्धन देने के उद्‌देश्य से अब तक के समारोहों में निम्नांकित कलाकारों की प्रस्तुतियॉ कराई जा चुकी है:" />
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {kathakFestival.map((artist, index) => (
                    <div key={index} className="bg-[#903603]/5 p-3 rounded-lg">
                      <TranslatableText text={artist} className="text-[#5A1616]" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="रसरंग" />
              </h2>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-[#5A1616] mb-4 font-['Inter']">
                  <TranslatableText text="इस श्रंखला के अन्तर्गत अब तक निम्नांकित कलाकारों की प्रस्तुतियॉ कराई जा चुकी है:" />
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {rasrang.map((artist, index) => (
                    <div key={index} className="bg-[#903603]/5 p-3 rounded-lg">
                      <TranslatableText text={artist} className="text-[#5A1616]" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="सम्पर्क" />
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold">
                    <TranslatableText text="राष्ट्रीय कथक संस्थान" />
                  </p>
                  <p>
                    <TranslatableText text="२७/३, कैसरबाग" />
                  </p>
                  <p>
                    <TranslatableText text="लखनऊ" />
                  </p>
                  <p>
                    <TranslatableText text="फोन/फैक्स नं० ०५२२ २६१८९१८" />
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default KathakInstitute;
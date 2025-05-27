import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface AbhilekhikaranProps {
  onClose: () => void;
}

const Abhilekhikaran: React.FC<AbhilekhikaranProps> = ({ onClose }) => {
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
            text="अभिलेखीकरण की योजनायें"
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
            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="उ0प्र0 राजकीय अभिलेखागार का संक्षिप्त परिचय" />
              </h2>
              <div className="text-[#5A1616] space-y-4 text-justify font-['Inter']">
                <TranslatableText
                  text="उ0प्र0 राजकीय अभिलेखागार की स्थापना सन् 1949 में सेन्ट्रल रिकार्ड आफिस के रूप में शिक्षा विभाग, उ0प्र0 इलाहाबाद के कार्यालय में हुई थी, जिसे पृथक इमारत का आवंटन 53 महात्मा गांधी मार्ग, इलाहाबाद में सन् 1951 में किया गया। उ0प्र0 राजकीय अभिलेखागार को जुलाई, 1973 में अपने नवनिर्मित भवन (बी-44, महानगर विस्तार, लखनऊ) में स्थानान्तरित कर दिया गया।"
                />
              </div>
            </section>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-32 mx-auto my-6"
            />

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="मुख्य उद्देश्य" />
              </h2>
              <ul className="list-disc list-inside space-y-3 text-[#5A1616] font-['Inter']">
                <li>
                  <TranslatableText text="उत्तर प्रदेश सरकार के विभिन्न विभागों, मण्डलीय एवं जिला स्तर के कार्यालयों एवं अर्द्धशासकीय संस्थाओं में उपलब्ध ऐतिहासिक एवं प्रशासनिक दृष्टिकोण से महत्वपूर्ण अभिलेखों का स्थानान्तरण करना।" />
                </li>
                <li>
                  <TranslatableText text="स्थानान्तरित अभिलेखों का समुचित वैज्ञानिक संरक्षण करना।" />
                </li>
                <li>
                  <TranslatableText text="शोध-छात्रों को शोध कार्य हेतु सहायता प्रदान करना।" />
                </li>
                <li>
                  <TranslatableText text="अभिलेखों की रिप्रोग्राफी सम्बन्धी सुविधाएं उपलब्ध कराना।" />
                </li>
                <li>
                  <TranslatableText text="व्यक्तिगत अधिकार में संरक्षित दुर्लभ पाण्डुलिपियों, प्रपत्रों, अभिलेखों, दुर्लभ पुस्तकों को प्राप्त करना एवं वैज्ञानिक संरक्षण सुनिश्चित करना।" />
                </li>
              </ul>
            </section>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-32 mx-auto my-6"
            />

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="गतिविधियाँ" />
              </h2>
              <ul className="list-disc list-inside space-y-3 text-[#5A1616] font-['Inter']">
                <li>
                  <TranslatableText text="मौखिक इतिहास योजना के अन्तर्गत विशिष्ट व्यक्तियों के संस्मरण टेप कराकर संरक्षित करना।" />
                </li>
                <li>
                  <TranslatableText text="राज्य के विभिन्न कार्यालयों के अभिलेख कक्षों में कार्यरत कर्मचारियों को दो सप्ताह का अभिलेख प्रशिक्षण दिया जाना।" />
                </li>
                <li>
                  <TranslatableText text="अभिलेखागार द्वारा समय-समय पर संरक्षित अभिलेखों पर आधारित महत्वपूर्ण प्रकाशन करना।" />
                </li>
                <li>
                  <TranslatableText text="प्रदेश की समृद्ध सांस्कृतिक विरासत के एक महत्वपूर्ण अंग-अभिलेखीय धरोहर के प्रति जन-सामान्य एवं छात्र-छात्राओं में जागरूकता उत्पन्न करने के निमित्त समय-समय पर प्रदेश के विभिन्न स्थानों पर अभिलेख प्रदर्शनियों एवं संगोष्ठियों आदि का आयोजन करना।" />
                </li>
              </ul>
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

export default Abhilekhikaran;
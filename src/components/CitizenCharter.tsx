import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface CitizenCharterProps {
  onClose: () => void;
}

const CitizenCharter: React.FC<CitizenCharterProps> = ({ onClose }) => {
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
            text="नागरिक चार्टर"
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
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="उद्‌देश्य" />
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter']">
                <TranslatableText text="उत्तर प्रदेश की समृद्घ एवं सत्‌त गतिशील संस्कृति के विविध तत्वों के संरक्षण, पोषण, प्रचार, प्रसार एवं सकारात्मक पक्षों का उन्नयन।" />
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="लक्ष्य (मिशन)" />
              </h2>
              <ul className="list-disc list-inside space-y-3 text-[#5A1616] font-['Inter']">
                <li><TranslatableText text="प्राचीन स्थलों, स्मारकों, प्रतिभाओं, वास्तु-अवशेषों, अभिलेखों आदि पुरा-सम्पदा को संरक्षित तथा अभिलिखित करना।" /></li>
                <li><TranslatableText text="विभिन्न अंचलो की शास्त्रीय, लोक एवं जनजातीय पंरपराओं का संरक्षण, नवीनीकरण, प्रशिक्षण एवं प्रोत्साहन।" /></li>
                <li><TranslatableText text="विविध सांस्कृतिक अभिव्यक्तियों के संवर्धन एवं उन्हें लोकप्रिय बनाने के उपाय करना।" /></li>
                <li><TranslatableText text="संगीत, नृत्य, नाटक एवं ललित कलाओं की परम्परा बनाये रखने हेतु शिक्षण एवं शोध को बढ़ावा देना तथा उक्त विधाओं के कलाकारों को रचनात्मक अभिव्यक्ति के अवसर प्रदान करना।" /></li>
                <li><TranslatableText text="प्राचीन संस्कृति, पुरातत्व तथा संग्रहालय सम्बन्धी शोध को आगे बढ़ाना।" /></li>
                <li><TranslatableText text="उपर्युक्त कार्यकलापों से सम्बन्धित प्रकाशनों द्वारा उक्त कार्यो को प्रोत्साहित करने तथा शोध - सम्बन्धी निष्कर्षो को स्थायी रूप से अभिलिखित करना।" /></li>
                <li><TranslatableText text="सांस्कृतिक विकास हेतु आवश्यक आधारभूत संसाधनों की स्थापना, विस्तार, आधुनिकीकरण हेतु आवश्यक सुविधाएं उपलब्ध कराना।" /></li>
                <li><TranslatableText text="राष्ट्रीय नेताओं /महापुरूषों के सम्मान/स्मृति को अक्षुण्ण बनाने की दिशा में आवश्यक कार्य करना। वृद्घ एवं विपन्न कलाकारों के कल्याण हेतु आवश्यक सहयोग प्रदान करना।" /></li>
                <li><TranslatableText text="प्रदेश की उन विभूतियों को सम्मानित करना, जिन्होंने अपने कृतित्वों से प्रदेश का नाम गौरवान्वित किया है।" /></li>
                <li><TranslatableText text="प्रदेश के प्रतिष्ठित कलाकारों, विशिष्ट व्यक्तियों एवं प्रतिभाओं को समय समय पर पुरस्कार एवं अन्य सम्मानों से अलंकृत करना।" /></li>
              </ul>
            </section>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-40 mx-auto my-6"
            />

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="कार्यकलाप" />
              </h2>
              <ul className="list-disc list-inside space-y-3 text-[#5A1616] font-['Inter']">
                <li><TranslatableText text="पुरातात्विक, ऐतिहासिक, कलात्मक और वास्तुगत महत्व के स्मारको, स्थलों एवं पुरा-सामग्री का सर्वेक्षण, संरक्षण, संग्रह तथा अनुरक्षण करना।" /></li>
                <li><TranslatableText text="पुरातत्व सम्बन्धी अन्वेषण, उत्खनन तथा प्रकाशन करना।" /></li>
                <li><TranslatableText text="प्रदेश सरकार के विभिन्न विभागों, मण्डलीय एवं जिला स्तरीय कार्यालयों एवं अद्घशासकीय संस्थाओं में उपलब्ध अभिलेखो को अभिलेखागारों में संग्रहीत कर उनका संरक्षण एवं अभिलेखीकरण करना तथा उन पर शोध एवं प्रकाशन कराना।" /></li>
                <li><TranslatableText text="उपर्युक्त विषयों में लोकरूचि जगाने हेतु शैक्षिक कार्यक्रम, प्रदर्शनी, संगोष्ठी जैसे आयोजन करना।" /></li>
                <li><TranslatableText text="संगीत एवं ललित कला के क्षेत्र मे छात्रवृत्ति प्रदान करना तथा कलाकारों के लिये कल्याणकारी योजनाओं का संचालन करना।" /></li>
                <li><TranslatableText text="प्रदेश के विभिन्न अंचलों में समय-समय पर संगीत, नृत्य एवं नाटक आदि संस्कृतिक कार्यक्रमों का आयोजन करना, उनके माध्यम से प्रतिष्ठित कलाकारों के साथ-साथ नवोदित कलाकारों को अपनी प्रतिभा के प्रदर्शन के अवसर देना तथा अपनी संस्कृति के सकारात्मक पक्षों से जनमानस को जोड़ना।" /></li>
              </ul>
            </section>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-40 mx-auto my-6"
            />

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="हमारी सेवाएं" />
              </h2>
              <ul className="list-disc list-inside space-y-3 text-[#5A1616] font-['Inter']">
                <li><TranslatableText text="अधोलिखित योजनाओं के माध्यम से सहायता अनुदान के द्वारा कला एवं संस्कृति का परिरक्षण, संवर्धन, प्रसार।" /></li>
                <li><TranslatableText text="जनजातीय / लोक कला और संस्कृति का संवर्धन एवं प्रसार।" /></li>
                <li><TranslatableText text="प्राचीन संस्कृति के विविध पक्षों आदि का अध्ययन, संवर्धन एवं प्रसार।" /></li>
                <li><TranslatableText text="प्राचीन विरासत तथा स्मारकों, स्थलों, पुरावोशों का संरक्षण एवं अनुरक्षण।" /></li>
                <li><TranslatableText text="प्राचीन अभिलेखों को सुव्यवस्थित ढंग से रखने एवं उनके वैज्ञानिक संरक्षण के लिए परामर्श देना।" /></li>
              </ul>
            </section>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-40 mx-auto my-6"
            />

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="हमारी प्रतिबद्धता" />
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter']">
                <TranslatableText text="संस्कृति के विभिन्न पक्षों के संरक्षण, संवर्धन एवं प्रोत्साहन, सांस्कृतिक विरासत के संरक्षण एवं शोध, कलाकारों एवं सांस्कृतिक संगठनों के सकारात्मक प्रयासों को बढ़ावा देने के लिए हम प्रतिबद्ध है।" />
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="नागरिकों के शिकायतों के निवारण के प्रति हमारी प्रतिबद्धता" />
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter']">
                <TranslatableText text="विभाग को प्राप्त जन-शिकायतों के त्वरित निस्तारण के लिए संयुक्त सचिव संयुक्त सचिव का पद रिक्त होने पर विशेष सचिव, उ०प्र० भासन, जैसी स्थित हो, नामित अधिकारी है। सुझाव एवं शिकायतें निम्नलिखित पते पर भेजी जा सकती हैं।" />
              </p>
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

export default CitizenCharter;
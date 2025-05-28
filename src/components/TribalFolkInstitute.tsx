import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface TribalFolkInstituteProps {
  onClose: () => void;
}

const TribalFolkInstitute: React.FC<TribalFolkInstituteProps> = ({ onClose }) => {
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
            text="जनजाति एवं लोक कला संस्कृति संस्थान"
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
                <TranslatableText text="परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="उत्तर प्रदेश के जनजातीय एवं लोक संस्कृति के संरक्षण, संवर्धन एवं प्रदर्शन हेतु जनजाति एवं लोक कला संस्कृति संस्थान की स्थापना सन्‌ १९९६ में की गयी है जिसके द्वारा लोक संस्कृति की लुप्त होती विधाओं की मंच प्रदान करना इनसे सम्बन्धित सर्वेक्षण/दस्तावेजीकरण आदि का महत्वपूर्ण कार्य किया जाता है। संस्थान द्वारा नियमित मासिक श्रृखला का आयोजन किया जा रहा है। इस वर्ष संस्थान द्वारा लुप्त प्राय कलारूपों तथा लोक संस्कृति के विविध पक्षों का सर्वेक्षण एवं दस्तावेजीकरण प्राथमिकताओं पर रहा है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="उद्‌देश्य" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="उ०प्र० की लोक और जनजाति कलाओं एवं शिल्प का संयोजन एवं विकास।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="लोक कलाओं संस्कृति एवं शिल्प के क्षेत्र में शोध का विकास एवं बढ़ावा देना इसके लिए पुस्तकालय, अभिलेखागार, संग्रहालय, पुस्तके, टेपरिकार्डस आदि स्थापित करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="लोक कलाओं, संस्कृति एवं शिल्प विकास हेतु भारत की अन्य संस्थाओं एवं विदेशो से सहयोग।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="विभिन्न क्षेत्रों की लोक एवं जाति कला संस्कृति, शिल्प की तकनीक एवं आदर्शो का आदान प्रदान।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="ऐसी संस्थाओं की स्थापना को बढ़ावा जो लोक एवं जनजाति कला शिल्प एवं संस्कृति के संरक्षण तथा विकास हेतु प्रशिक्षण के क्षेत्र में सक्रिय हो।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="लोक एवं जनजाति कला, शिल्प एवं संस्कृति के क्षेत्र में सर्वेक्षण, अभिलेखीकरण एवं प्रचार को बढ़ावा देना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="लोक एवं जनजाति कला शिल्प एवं संस्कृति के क्षेत्र में सेमिनार कार्यशाला का आयोजन तथा शोध एवं सर्वेक्षण हेतु अनुदान देना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="जनजाति एवं लोक कला का कार्य संगीत, नृत्य एवं नाटक, त्यौहारों तथा शिल्प मेलों को राज्य तथा राज्य के बाहर प्रायोजित करना।" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="गतिविधियॉ" />
              </h2>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="मई में संस्थान द्वारा संगीत नाटक अकादमी परिसर में मुक्ताकाशी मंच पर बौद्ध मठ के पारम्परिक लोकनृत्य ⁄ लोकगायन की प्रस्तुति की गयी।" />
                </p>
              </div>
            </section>

            <div className="bg-[#903603]/5 rounded-lg p-6 mt-8">
              <p className="text-[#5A1616]/80 text-sm">
                <TranslatableText text="नोटः- इस अकादमी का विस्तृत कार्य विवरण इनके सम्बन्धित साइट पर देखा जा सकता है।" />
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

export default TribalFolkInstitute;
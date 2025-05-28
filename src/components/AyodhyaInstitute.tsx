import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface AyodhyaInstituteProps {
  onClose: () => void;
}

const AyodhyaInstitute: React.FC<AyodhyaInstituteProps> = ({ onClose }) => {
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
            text="अयोध्या शोध संस्थान"
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
                  <TranslatableText text="अयोध्या शोध संस्थान की स्थापना संस्कृति विभाग, उ०प्र० शासन द्वारा एतिहासिक तुलसी भवन, अयोध्या में १८ अगस्त, १९८६ को की गयी। यह संस्कृति विभाग की स्वायत्तशासी संस्था है। वस्तुतः अयोध्या की पावन भूमि पर सरयु के तट स्थित रामघाट के निकट गोस्वामी तुलसीदास जी ने सम्वत्‌ १६३१ की नवमी तिथि भौमवार को श्रीरामचरित मानस की रचना प्रारम्भ की इस संदर्भ मे निम्न पंक्ति महत्वपूर्ण हैं :-" />
                </p>

                <div className="bg-[#903603]/5 rounded-lg p-4 my-6 text-center italic">
                  <p className="text-[#5A1616] font-['Inter']">
                    <TranslatableText text="संवत्‌ सोहल सौ इक्तीसा, करौ कथा हरिपद धरि सीसा।" />
                  </p>
                  <p className="text-[#5A1616] font-['Inter']">
                    <TranslatableText text="नवमी भौमवार मधुमासा, अवध पुरी यह चरित प्रकाशा॥" />
                  </p>
                </div>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="मानस की रचना प्ररम्भ करने के उपरान्त गोस्वामी तुलसीदास जी काशी गये और वही पर निवास करने लगें परिणामतः यह स्थान रिक्त था। सम्वत्‌ १६८० श्रावण शुक्ल सप्तमी को गंगा के किनारे अस्सी नामक स्थान पर उनका देहावसान हुआ। वर्तमान समय में अयोध्या के प्रमुख संतो की विशेष मांग पर अयोध्या के इस स्थान जहॉ मानस की रचना प्रारम्ीा हुयी थी, पर गोस्वामी तुलसीदास जी की समृति में तुलसी स्मारक ीावन के निर्माण की मांग शासन से की गयी।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="प्रमुख उद्‌देश्य" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="सामान्य रूप से अयोध्या की कला संस्कृति एवं साहित्य, लोक साहित्य, इतिहास और परम्पराओं की पाण्डुलिपियों तथा वस्तुओं और शिल्प तथ्वों का संग्रह संरक्षण एवं अध्ययन करना है" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="अवध की संस्कृतिक विरासत से संबंधित नष्ट और विलुप्त हो रही पुरालेखीय सामग्री को सुरक्षित रखना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="अवध की भारतीय विद्या, कला, संस्कृति और इतिहास में विशेष रूप से अयोध्या, रामायण और तुलसीदास के साहित्य और दर्शन से संबंधित शोध कार्य को प्रोत्साहन देना और पूरा करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="सामाजिक, धार्मिक, साहित्यक, कलात्मक और ऐतिहासिक महत्व पाण्डुलिपियों पुरालेखीय सामग्री और अन्य वस्तुओं का उनके उन्नयन संरक्षण और अध्ययन हेतु एक संग्रहालय स्थापित करना।" />
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
                    <TranslatableText text="अयोध्या शोध संस्थान" />
                  </p>
                  <p>
                    <TranslatableText text="तुलसी स्मारक भवन अयोध्या-फैजाबाद" />
                  </p>
                  <p>
                    <TranslatableText text="फोन नं०-०५२७८-२३२९८२" />
                  </p>
                  <p>
                    <TranslatableText text="कैम्प कार्यालय-नवम्‌ तल, जवाहर भवन, लखनऊ" />
                  </p>
                  <p>
                    <TranslatableText text="फोन/फैक्स नं०-०५२२-२२८६६०९" />
                  </p>
                  <p>
                    <TranslatableText text="वेबसाइट -www.ayodhya.co" />
                  </p>
                </div>
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

export default AyodhyaInstitute;
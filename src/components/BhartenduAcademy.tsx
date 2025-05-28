import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface BhartenduAcademyProps {
  onClose: () => void;
}

const BhartenduAcademy: React.FC<BhartenduAcademyProps> = ({ onClose }) => {
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
            text="भारतेन्दु नाट्य अकादमी"
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
                <TranslatableText text="स्थापना व परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="भारतेन्दु नाट्य अकादमी की स्थापना ०२ जुलाई,१९७५ को उ० प्र० संगीत नाटक अकादमी के अन्तर्गत एक नाट्य केन्द्र के रूप में हुई। पदेमभूषण स्व० अमृतलाल नागर इसके प्रथम अध्यक्ष नामित किये गये। कालान्तर में भारतेन्दु नाट्य अकादमी एक स्वतन्त्र स्वायत्तजासी संस्था के रूपﾠमें स्थापित हुई। इस विशाल हिन्दी प्रदेश के रंगकर्मियों, बुद्घजीवियों एवं चिन्तको के मन में भी राष्ट्रीय नाट्य विद्यालय के समकक्ष नाट्य प्रशिक्षण संस्थान स्थापित करने का यह एक सशक्त प्रयास था। वर्ष १९८१ से द्विवर्षीय पूर्णकालीन डिप्लोमा पाठेयक्रम में प्रशिक्षण के साथ भारतेन्दु नाट्य अकादमी ने नाट्य प्रशिक्षण के क्षेत्र में अपनी एक विशिष्ट पहचान बनायी।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="उद्‌देश्य" />
              </h2>
              <div className="bg-white/50 rounded-xl p-6">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="भारतेन्दु नाटेय अकादमी के प्रशिक्षण का मुख्य उददेश्य द्दात्रों को नाटय एवं रंगमच विद्या मे दक्षता प्रदान कर उन्हे इसे व्यवसाय के रूप में अपनाने के लिए सशक्त पृष्ठभूमि तैयार कराना है। प्रशिक्षण काल में सभी विषयों का सैद्घान्तिक एवं व्यवहारिक ज्ञान देकर द्दात्रो की सृजनात्मकता का विकास करना उनकी कल्पनाशक्ति को सौन्दर्यबोद्घ के साथ रचनात्मक एवं कलात्मक शक्ति अभिव्यक्ति प्रदान करना है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="सम्पर्क" />
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold">
                    <TranslatableText text="भारतेन्दु नाट्‌य अकादमी" />
                  </p>
                  <p>
                    <TranslatableText text="विकास खण्ड-१, गोमती नगर, लखनऊ-२२६०१०" />
                  </p>
                  <p>
                    <TranslatableText text="फोन व फैक्स ०५२२-२३००५९८' २३९८४६६" />
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

export default BhartenduAcademy;
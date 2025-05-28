import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface ArchivesProps {
  onClose: () => void;
}

const Archives: React.FC<ArchivesProps> = ({ onClose }) => {
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
            text="उ०प्र० राजकीय अभिलेखागार"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <img
                src="https://upculture.up.nic.in/sites/default/files/inline-images/RAJ4.gif"
                alt="Archives Building"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>

            <section>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="उ०प्र० राजकीय अभिलेखागार की स्थापना सन्‌ १९४९ में 'सेन्ट्रल रिकार्ड आफिस' के नाम से इलाहाबाद में हुई थी। जुलाई,१९७३ में यह अभिलेखागार अपने नवनिर्मित भवन बी४४, महानगर विस्तार, लखनऊ में स्थानान्तरित किया गया। इसका मुख्य उद्‌देश्य उ०प्र० सरकार के विभिन्न विभागों, मण्डलीय एवं जिला स्तर के कार्यालयो एवं अर्द्घशासकीय स्रोतो में उपलब्ध अप्रचलित अभिलेखों का स्थानान्तरण एवं समुचित संरक्षण करना है।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="इसका कार्य स्थानान्तरित अभिलेखों का वैज्ञानिक संरक्षण, शोध द्दात्रों को सुविधा देना, शासन को आवश्यक सूचनाये उपलब्ध कराना, अभिलेखों की माइक्रोफिल्मिंग से सम्बन्धित सुविधाये देना, व्यक्तिगत अधिकार से दुर्लभ पाण्डुलिपियाँ एवं प्रपत्रों को प्राप्त करना है। इस अभिलेखागार में अभिलेखों के रखरखाव, वैज्ञानिक संरक्षण एवं माइक्रोफिल्मिंग से सम्बन्धित सभी प्रकार के आधुनिक उपकरण उपलब्ध हैं।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="यहाँ मौखिक इतिहास योजना के अन्तर्गत स्वतंत्रता संग्राम सेनानियो एवं अन्य विशिष्ट व्यक्तियो के संस्मरण भी टेप किये जाते हैं। अभिलेखों के रखरखाव से सम्बन्धित दो सप्ताह का प्रशिक्षण भी विभिन्न कार्यालयो के अभिलेख कक्ष में कार्यरत्‌ कर्मचारियो को दिया जाता है। इस अभिलेखागार द्वारा समयसमय पर प्रकाशन भी किये जाते हैं।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="इस अभिलेखागार में संरक्षित राजकीय अभिलेख सन्‌ १७७६ से तथा व्यक्तिगत अधिकार से प्राप्त अभिलेख सन्‌ १५४० से प्रारम्भ होते हैं। इस के अन्तर्गत तीन क्षेत्रीय अभिलेखागार क्रमशः इलाहाबाद, वाराणसी एवं आगरा में तथा एक पाण्डुलिपि पुस्तकालय इलाहाबाद में स्थापित है। संस्कृत निदेशालय के अधीन उत्तर प्रदेश राजकीय अभिलेखागार अपनी इकाईयो एवं कर्मचारियो के साथ विधिवत कार्यरत है।" />
                </p>
              </div>
            </section>

            <div className="bg-[#903603]/5 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="वेबसाइट" />
              </h2>
              <a 
                href="http://uparchives.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#903603] hover:text-[#5A1616] transition-colors font-medium"
              >
                http://uparchives.up.nic.in
              </a>
              <p className="text-[#5A1616]/80 text-sm mt-2">
                <TranslatableText text="नोट:- अभिलेखागार का विस्तृत विवरण इनकी सम्बन्धित साइट पर देखा जा सकता है।" />
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

export default Archives;
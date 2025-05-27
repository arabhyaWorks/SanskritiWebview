import React from 'react';
import { ChevronLeft, FileText, Download } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface PensionSchemeProps {
  onClose: () => void;
}

const PensionScheme: React.FC<PensionSchemeProps> = ({ onClose }) => {
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
            text="वृद्ध एवं विपन्न कलाकारों की मासिक पेंशन योजना"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-[#FFF8F0] backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="space-y-6">
            <div className="bg-white/80 rounded-xl p-6 shadow-md border border-[#903603]/10">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="योजना का विवरण" />
              </h2>
              <div className="space-y-4 text-[#5A1616] text-justify font-['Inter']">
                <p>
                  <TranslatableText text="संस्कृति निदेशालय द्वारा निर्धारित प्रपत्र पर निम्न योजना हेतु उ०प्र० के विभिन्न कलाकारों से आवेदन पत्र आमंत्रित किये जाते हैः-" />
                </p>
                <p>
                  <TranslatableText text="वृद्ध एवं विपन्न कलाकारों, ऐसे ख्याति प्राप्त कलाकार जिन्होने संबंधित कला विधा/क्षेत्र में न्यूनतम 10 वर्षो तक कला प्रदर्शन किया हो तथा जिनकी आयु 60 वर्ष से कम न हो तथा आय (रू० 2000/-प्रतिमाह) रू० 24000.00 प्रति वर्ष से अधिक न हो।" />
                </p>
                <p className="text-sm italic">
                  <TranslatableText text="(आय का प्रमाण-पत्र तहसीलदार द्वारा प्रमाणित होना चाहिये तथा आयु के प्रमाण हेतु हाईस्कूल का प्रमाण पत्र या मुख्य चिकित्साधिकारी द्वारा दिया गया प्रमाण-पत्र मान्य होगा)" />
                </p>
              </div>
            </div>

            <div className="bg-white/80 rounded-xl p-6 shadow-md border border-[#903603]/10">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="आवेदन प्रक्रिया" />
              </h2>
              <div className="space-y-4 text-[#5A1616] text-justify font-['Inter']">
                <p>
                  <TranslatableText text="योजना के लिये आवेदन हेतु निम्नांकित निर्धारित प्रपत्र पर वांछित सूचनाएं स्पष्ट रूप से अंकित कर प्रेषित किया जाना है। केवल निदेशालय द्वारा निर्धारित प्रपत्र पर ही आवेदन मान्य होंगे।" />
                </p>
                <p>
                  <TranslatableText text="आवेदन पत्र, आवश्यक प्रमाण पत्रों के साथ जनपद के जिलाधिकारी/जिला सूचना अधिकारी से संस्तुत/अग्रसारित कराकर संस्कृति निदेशालय, उ०प्र० नवम्‌ तल, जवाहर भवन, लखनऊ, पिन कोड -226001 में जमा किये जायेंगे।" />
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-700 font-semibold">
                    <TranslatableText text="महत्वपूर्ण नोट:" />
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    <TranslatableText text="अपूर्ण एवं प्राधिकृत अधिकारी की संस्तुति रहित एवं विलम्ब से प्राप्त आवेदन-पत्रों पर विचार नहीं होगा।" />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-xl p-6 shadow-md border border-[#903603]/10">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="आवेदन फॉर्म" />
              </h2>
              <a
                href="https://upculture.up.nic.in/sites/default/files/documents/pension-form-last-date-28-august-2021.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#903603] text-white py-4 px-6 rounded-lg hover:bg-[#5A1616] transition-colors group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold">
                  <TranslatableText text="आवेदन फॉर्म डाउनलोड करें" />
                </span>
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

export default PensionScheme;
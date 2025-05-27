import React from 'react';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface GovernmentSchemesProps {
  onClose: () => void;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ onClose }) => {
  const schemes = [
    {
      title: 'स्टूडियो थियेटर सहित निर्माण अनुदान',
      url: 'https://www.indiaculture.gov.in/hi/स्टूडियो-थियेटर-सहित-निर्माण-अनुदान-0'
    },
    {
      title: 'बौद्ध तिब्बती संस्कृति कला',
      url: 'https://www.indiaculture.gov.in/hi/बौद्ध-और-तिब्बती-संस्कृति-कला'
    },
    {
      title: 'संग्रहालय व्‍यावसायिकों के लिए उत्‍कृष्‍टता प्रमाण पत्र संबंधी स्‍कीम',
      url: 'https://www.indiaculture.gov.in/hi/संग्रहालय-व्‍यावसायिकों-के-लिए-उत्‍कृष्‍टता-प्रमाण-पत्र-संबंधी-स्‍कीम'
    },
    {
      title: 'संग्रहालय अनुदान योजना',
      url: 'https://www.indiaculture.gov.in/hi/संग्रहालय-अनुदान-योजना-0'
    },
    {
      title: 'राष्ट्रीय स्मारक',
      url: 'https://www.indiaculture.gov.in/hi/राष्ट्रीय-स्मारक-0'
    },
    {
      title: 'पेंशन अनुदान',
      url: 'https://www.indiaculture.gov.in/hi/कलाकार-पेंशन-योजना-और-कल्याण-कोष'
    },
    {
      title: 'युवा कलाकार के लिए छात्रवृत्ति',
      url: 'https://www.indiaculture.gov.in/hi/युवा-कलाकार-के-लिए-छात्रवृत्ति'
    },
    {
      title: 'वरिष्ठ / जूनियर फैलोशिप',
      url: 'https://www.indiaculture.gov.in/hi/वरिष्ठ-जूनियर-फैलोशिप-0'
    },
    {
      title: 'हिमालय की सांस्कृतिक विरासत',
      url: 'https://www.indiaculture.gov.in/hi/हिमालय-की-सांस्कृतिक-विरासत'
    },
    {
      title: 'नई विज्ञान शहरों और विज्ञान केंद्र की स्थापना के लिए मानदंड / दिशानिर्देश',
      url: 'https://www.indiaculture.gov.in/hi/नई-विज्ञान-शहरों-और-विज्ञान-केंद्र-की-स्थापना-के-लिए-मानदंड-दिशानिर्देश'
    },
    {
      title: 'सांस्कृतिक समारोह अनुदान योजनाएं (सिएफजीएस)',
      url: 'https://www.indiaculture.gov.in/hi/सांस्कृतिक-समारोह-अनुदान-योजनाएं-cfgs'
    },
    {
      title: 'सांस्कृतिक अनुसंधान के लिए टैगोर राष्ट्रीय फैलोशिप की योजना',
      url: 'https://www.indiaculture.gov.in/hi/सांस्कृतिक-अनुसंधान-के-लिए-टैगोर-राष्ट्रीय-फैलोशिप-की-योजना'
    },
    {
      title: 'टैगोर सांस्कृतिक परिसर',
      url: 'https://www.indiaculture.gov.in/hi/टैगोर-सांस्कृतिक-परिसर'
    },
    {
      title: 'सांस्कृतिक विरासत युवा नेतृत्व कार्यक्रम',
      url: 'https://www.indiaculture.gov.in/hi/सांस्कृतिक-विरासत-युवा-नेतृत्व-कार्यक्रम'
    },
    {
      title: 'अमूर्त सांस्कृतिक विरासत की सुरक्षा के लिए योजना',
      url: 'https://www.indiaculture.gov.in/hi/अमूर्त-सांस्कृतिक-विरासत-की-सुरक्षा-के-लिए-योजना'
    },
    {
      title: 'प्राकृतिक उपस्थिति के साथ सांस्कृतिक संगठन को वित्तीय सहायता',
      url: 'https://www.indiaculture.gov.in/hi/प्राकृतिक-उपस्थिति-के-साथ-सांस्कृतिक-संगठन-को-वित्तीय-सहायता'
    },
    {
      title: 'योजना इंटरनेशनल कल्चरल रिलेशन बढ़ावा देने के लिए',
      url: 'https://www.indiaculture.gov.in/hi/योजना-इंटरनेशनल-कल्चरल-रिलेशन-बढ़ावा-देने-के-लिए'
    }
  ];

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
            text="भारत सरकार की अनुदान की योजनाएं"
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
          
          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <a
                key={index}
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition-all border border-[#903603]/10 hover:border-[#903603]/30 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-grow">
                    <TranslatableText
                      text={scheme.title}
                      className="text-[#5A1616] font-['Baloo_2'] font-bold group-hover:text-[#903603] transition-colors"
                    />
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#903603] opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default GovernmentSchemes;
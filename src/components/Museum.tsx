import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface MuseumProps {
  onClose: () => void;
}

const Museum: React.FC<MuseumProps> = ({ onClose }) => {
  const tabs = [
    { id: 'brief', label: 'संक्षिप्त परिचय' },
    { id: 'list', label: 'संग्रहालय सूची' },
    { id: 'gallery', label: 'चित्र विथिका' }
  ];

  const timings = [
    { label: 'साप्ताहिक अवकाश', value: 'रविवार' },
    { label: 'अन्य अवकाश', value: 'प्रत्येक शनिवार व रविवार एवं अन्य राजपत्रित अवकाश।' },
    { label: 'कार्यालय खुलने/बन्द होने का समय प्रातः', value: '9:30 बजे से सायं 6:00 बजे तक।' },
    { label: 'दूरभाष / फैक्स', value: '0522-2205142' },
    { label: 'वेबसाइट', value: 'http://upmuseum.upsdc.gov.in/default.aspx', isLink: true },
    { label: 'ईमेल', value: 'museumdirectorate@gmail[dot]com' }
  ];

  const museums = [
    { name: 'राज्य संग्रहालय लखनऊ', year: '1863' },
    { name: 'राजकीय संग्रहालय मथुरा', year: '1874' },
    { name: 'राजकीय संग्रहालय झांसी', year: '1978' },
    { name: 'रामकथा संग्रहालय अयोध्या फैजाबाद', year: '1988' },
    { name: 'राजकीय बौद्ध संग्रहालय गोरखपुर', year: '1988' },
    { name: 'लोक कला संग्रहालय लखनऊ', year: '1989' },
    { name: 'जनपदीय संग्रहालय सुल्तानपुर', year: '1989' },
    { name: 'राजकीय बौद्ध संग्रहालय कुशीनगर', year: '1995' },
    { name: 'राजकीय पुरातत्व संग्रहालय कन्नौज', year: '1996' }
  ];

  const newMuseums = [
    'राजकीय स्वतंत्रता संग्राम सेनानी संग्रहालय मेरठ',
    'अम्बेडकर संग्रहालय एवं पुस्तकालय रामपुर',
    'राजकीय संग्रहालय पिपरहवां',
    'राजकीय जैन संग्रहालय मथुरा'
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
            text="उ०प्र० संग्रहालय निदेशालय"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="flex overflow-x-auto gap-2 pb-3 mb-6 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="px-5 py-2 whitespace-nowrap rounded-full bg-[#903603]/5 text-[#903603] hover:bg-[#903603] hover:text-white transition-all font-medium"
              >
                <TranslatableText text={tab.label} />
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <section>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="संग्रहालय सांस्कृतिक सम्पदा ऐतिहासिक एवं पुरातात्विक धरोहरों को सुरक्षित एवं संरक्षित रखने का वह केन्द्र है, जहाँ प्राचीन कलाकृतियों को संग्रहीत कर राष्ट्र के अतीत की गौरवशाली संस्कृति का दर्शन शोद्यार्थियों, बुद्धिजीवियों तथा सामान्य जनमानस को कराया जाता है। संग्रहालय का कार्य कलाकृतियों का संग्रह करना, संरक्षित करना, शोध करना तथा उन्हे प्रदर्शित करना है। संग्रहालय वर्तमान में औपचारिक शिक्षा तथा शोध का केन्द्र भी है। जो समय पर प्रर्दशनियों व्याख्यान तथा संगोष्ठी आयोजित कर सामान्य जनमानस को शिक्षा देने का कार्य भी करते है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="स्थापित संग्रहालय" />
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {museums.map((museum, index) => (
                  <div key={index} className="bg-white/50 rounded-lg p-4 flex items-center justify-between">
                    <TranslatableText 
                      text={museum.name}
                      className="text-[#5A1616] font-['Baloo_2'] font-bold"
                    />
                    <span className="text-[#903603] font-medium">{museum.year}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="नवस्थापित संग्रहालय" />
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {newMuseums.map((museum, index) => (
                  <div key={index} className="bg-white/50 rounded-lg p-4">
                    <TranslatableText 
                      text={museum}
                      className="text-[#5A1616] font-['Baloo_2'] font-bold"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="कार्यालय समय एवं संपर्क" />
              </h2>
              <div className="bg-white/50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {timings.map((timing, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white/30' : ''}>
                        <td className="py-3 px-4 border-b border-[#903603]/10">
                          <TranslatableText 
                            text={timing.label}
                            className="text-[#5A1616] font-medium"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-[#903603]/10">
                          {timing.isLink ? (
                            <a 
                              href={timing.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {timing.value}
                            </a>
                          ) : (
                            <TranslatableText 
                              text={timing.value}
                              className="text-[#5A1616]"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Museum;
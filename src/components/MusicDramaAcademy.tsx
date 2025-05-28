import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface MusicDramaAcademyProps {
  onClose: () => void;
}

const MusicDramaAcademy: React.FC<MusicDramaAcademyProps> = ({ onClose }) => {
  const sections = [
    { id: 'academy', label: 'अकादमी' },
    { id: 'survey', label: 'सर्वेंक्षण' },
    { id: 'cultural', label: 'सांस्कृतिक दल' },
    { id: 'kathak', label: 'कथक केन्द्र' }
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
            text="संगीत नाटक अकादमी"
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
                <TranslatableText text="अकादमी का परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="उत्तर प्रदेश संगीत नाटक अकादमी की स्थापना 13 नवम्बर, 1963 को संस्कृति विभाग उ०प्र० की स्वायत्तशासी इकाई के रूप में हुई थी। अकादमी के अन्तर्गत चार एकांश कार्यरत है जिनका विवरण निम्नवत् हैं" />
                </p>

                <div className="space-y-4 my-8">
                  {sections.map((section, index) => (
                    <div key={index} className="bg-[#903603]/5 rounded-xl p-4 hover:bg-[#903603]/10 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="text-[#903603] font-bold text-xl font-['Baloo_2']">{index + 1}.</span>
                        <h3 className="text-[#903603] font-bold text-xl font-['Baloo_2']">
                        <TranslatableText text={section.label} />
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="अपने स्थापना के वर्ष से अकादमी संगीत, नृत्य, लोक संगीत, लोक नाट्य की परम्पराओं के प्रचार–प्रसार, संवद्धर्न एवं परिरक्षण का महत्वपूर्ण कार्य कर रही हैं। उत्तर प्रदेश एक विशाल सांस्कृतिक क्षेत्र है जिसकी विविध समृद्ध सांस्कृतिक परम्पराओं के परिरक्षण एवं संवद्धर्न की दिशा में अभी बहुत कुछ किया जाना है।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="अत्यधिक सीमित संसाधन है। जबकि इतने वृहद प्रदेश के लिये अधिक आर्थिक संसाधनों की आवश्यकता हैं जिससे प्रदेश की सांस्कृतिक गतिविधियों को और अधिक गतिशील व क्रियाशील बनाया जा सके। प्रदेश में संगीत नृत्य नाटक लोक विधाओं सम्बन्धी परम्पराओं के विषय में अधिक जागरूकता एवं जानकारी नवोदित प्रतिभाशाली युवा कलाकारों को प्रोत्साहन, नवीन प्रतिभाओं का विकास एवं उन्हे आवश्यक प्रशिक्षण, सांस्कृतिक कार्यकलापों का विकेन्द्रीकरण, प्रदेश के विभिन्न अंचलों में कार्यरत स्वैच्छिक संस्थानों से सम्पर्क एवं उनके कार्यकलापों में सहायता, लुप्त हो रही विधाओं के परिरक्षण एवं प्रदर्शनी की योजनाओं को प्राथमिकता के आधार पर सम्पन्न कराना, साथ ही सर्वेक्षण एवं सर्वेक्षण के आधार पर कार्यक्रमों को तैयार कर उन्हें जनता के समक्ष लाना अकादमी की गतिविधियों में शामिल है।" />
                </p>
              </div>
            </section>

            <div className="bg-[#903603]/5 rounded-lg p-6 mt-8">
              <p className="text-[#5A1616]/80 text-sm">
                <TranslatableText text="नोट - इस अकादमी का विस्तृत कार्य विवरण इनके सम्बंधित साइट पर देखा जा सकता है।" />
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

export default MusicDramaAcademy;
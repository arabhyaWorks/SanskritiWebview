import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface FineArtsAcademyProps {
  onClose: () => void;
}

const FineArtsAcademy: React.FC<FineArtsAcademyProps> = ({ onClose }) => {
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
            text="ललित कला अकादमी"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="space-y-8">
            <section>
              <div className="flex justify-center mb-8">
                <img
                  src="https://upculture.up.nic.in/sites/default/files/inline-images/lalit.gif"
                  alt="Lalit Kala Academy"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>

              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="स्थापना" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="राज्य ललित कला अकादमी, उ०प्र० की स्थापना ०८ फरवरी, १९६२ में उत्तर प्रदेश शासन के संस्कृति विभाग की पूर्णतः वित्त पोषित स्वायत्तशासी इकाई के रूप में हुई। इसके प्रथम अध्यक्ष डॉ. सम्पूर्णानन्द (तत्कालीन मुख्यमंत्री, उ०प्र०) नामित हुए। अकादमी का कार्यालय ऐतिहासिक स्मारक लाल बारादरी में स्थित है। लाल बारादरी भवन का निर्माण १७७८-१८१४ के मध्य अवध के नवाबों की ताजपोशी के लिये हुआ था।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="उद्‌देश्य" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="अकादमी की स्थापना दृश्यकलाओं एवं व्यावहारिक कलाओं की गतिविधियों एवं कलाकारों को प्रोत्साहन एवं सहयोग प्रदान करने के उद्‌देश्य से हुई।" />
                </p>
                <div className="flex justify-center my-8">
                  <img
                    src="https://upculture.up.nic.in/sites/default/files/inline-images/lalit_img5.gif"
                    alt="Art Exhibition"
                    className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="कला संस्थाओं को मान्यता" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="flex justify-center mb-8">
                  <img
                    src="https://upculture.up.nic.in/sites/default/files/inline-images/lalit_img4.gif"
                    alt="Art Recognition"
                    className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                </div>
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="इस प्रकार के आयोजन की अवधारणा कलाकारों को सामूहिक रूप से इकठ्‌ठे कर अपने-अपने सृजन का परिचय व विचार-विमर्श के द्वारा समकालीन मान्यताओं का आदान-प्रदान करना है। प्रायः कलाकार अपने-अपने स्टूडियों में स्वतंत्र रूप से सृजन करते हैं। जन सामान्य तथा कलाकारों में एक सहज जिज्ञासा होती है कि अमुक कलाकार अपनी कलाकृति में विभिन्न पक्षों, माध्यमों से सृजन/संयोजक कैसे करता है। इन्हीं सब स्थितियों से जन सामान्य तथा जिज्ञाषु युवा कलाकारों को परिचित कराने हेतु राज्य स्तरीय/राष्ट्रीय कलाकार शिविरों का आयोजन किया जाता है।" />
                </p>
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="अकादमी द्वारा प्रदेश विदेश के वरिष्ठ/युवा कलाकारों को अलग-अलग क्षेत्रों से आमंत्रित कर प्रदेश के सुदूर अंचलों/पर्यटक स्थलों पर शिविर का आयोजन किया जाता है। कलाकारों को आवागमन व आवास, भोजन, कृति सृजक सामग्री अकादमी द्वारा उपलब्ध करायी जाती है। अधिकांशतः दस दिवसीय शिविर में सृजित कृतियां चित्रकला विधा में सृजित दो कलाकृतियों में से एक कृति कलाकार की होती है। शेष विधाओं ग्राफिक व मूर्ति में सृजित प्रत्येक द्वारा एक कृति अकादमी के स्थायी कला संग्रह में अधिगृहीत कर ली जाती है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="पुस्तकालय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="अकादमी में कला के अध्येताओं, कला समीक्षकों को कला की संदर्भ सामग्री उपलब्ध कराने के उद्‌देश्य से पुस्तकालय की स्थापना की गयी है। इसमें भारतीय कला की पुस्तकों के साथ विदेशी कला साहित्य भी उपलब्ध है। कला विषयक फिल्में और पारदर्शियां भी संग्रहीत की गयी हैं।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="संपर्क" />
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold">
                    <TranslatableText text="राज्य ललित कला अकादमी, उ० प्र०" />
                  </p>
                  <p>
                    <TranslatableText text="लाल बारादरी भवन, ललित कला अकादमी मार्ग," />
                  </p>
                  <p>
                    <TranslatableText text="निकट हाईकोर्ट, लखनऊ-२२६००१" />
                  </p>
                  <p>
                    <TranslatableText text="दूरभाष - २६२८४५३" />
                  </p>
                  <p>
                    <TranslatableText text="ईमेल: slka_up@yahoo.com" />
                  </p>
                  <p>
                    <TranslatableText text="वेबसाइट : fineartakademiup.nic.in" />
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

export default FineArtsAcademy;
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface JainInstituteProps {
  onClose: () => void;
}

const JainInstitute: React.FC<JainInstituteProps> = ({ onClose }) => {
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
            text="उ०प्र० जैन विद्या शोध संस्थान"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="space-y-8">
            {/* परिचय Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="जैन विद्या शोध संस्थान की स्थापना वर्ष १९९० में संस्कृति विभाग, उ०प्र० शासन के अंतर्गत स्वायत्तशासी संस्थान के रूप में हुई। संस्थान भारत के विभिन्न भागों में प्रचलित जैन विद्या का राष्ट्रीय संदर्भ में अध्ययन, तत्संबंधी शोध तथा जैन तीर्थकारों की सांस्कृतिक महत्व की परंपरागत एवं आधारभूत मान्यताओं, मानवीय मूल्यों, कला अवशेषों का संरक्षण एवं विश्लेषण की जानकारी उपलब्ध कराता है।" />
                </p>
              </div>
            </section>

            {/* उद्देश्य Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="उद्देश्य" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान का उद्देश्य नैतिक आध्यात्मिक अनुशीलन अनुसंधान के द्वारा उन मानवीय मूल्यों का आकलन करना है जो व्यापक मानव संस्कृति एवं सभ्यता के विकास का आधार बन सके और जिसके लिए जैन तीर्थकारों के उदार तत्वों से अर्थवती प्रेरणा प्राप्त की जा सके। इन उद्देश्यों की पूर्ति के लिए संस्थान निम्नलिखित कार्य कर रहा है:" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="1. भारत में उपलब्ध जैन विद्या संबंधी सामग्री का संकलन शोधकार्य, संबंधित ग्रंथों का विकासात्मक अध्ययन, उपलब्ध सामग्री का भारतीय भाषाओं तथा अंग्रेजी में प्रमाणित भाषांतर कार्य करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="2. जैन विद्या संबंधी सामग्री के सुसंबद्ध अध्ययन हेतु विभिन्न सांस्कृतिक महत्व की परंपरागत मान्यताओं की जानकारी के लिए रचनात्मक कार्य एवं शोध कार्य करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="3. जैन विद्या संबंधी आधारभूत और मानवीय मूल्यों को, जिसे सदियों से भारत में संजोये रखा गया है, इस प्रकार से सुरक्षित रखना ताकि वह नष्ट न हो।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="4. जैन विद्या के भारतीय एवं विदेशी विद्वानों का अध्ययन-अध्यापन की सुविधा उपलब्ध कराना जो भारत और विदेशों में प्राप्त जैन विद्या के तुलनात्मक अध्ययन में उपयोगी हो सके।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="5. ऐसे अध्येता एवं शोध कार्य विद्वानों को पुरस्कार एवं उपाधि आदि प्रदान करने के लिए शासन एवं विश्वविद्यालयों की सहमति से नियम बनाना और अनुमति प्राप्त करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="6. जैन विद्या के अंतरराष्ट्रीय संदर्भ में ग्रंथ सूची, समीक्षात्मक अध्ययन, अनुवाद शोध पत्रिका, शब्दकोश आदि ग्रंथों का प्रकाशन।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="7. छात्रवृत्ति, शोधवृत्ति, अध्ययन वृत्ति, मात्रावृत्ति आदि उपलब्ध कराना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="8. उद्देश्य के अनुरूप परिचर्चा, चरित्रवाद, परिगोष्ठी, व्याख्यान, सम्मेलन आदि आयोजित करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="9. संबंधित एवं संदर्भित ग्रंथों, पांडुलिपियों, माइक्रोफिल्म्स आदि का पुस्तकालय स्थापित करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="10. जैन तीर्थ क्षेत्रों व सांस्कृतिक केंद्रों की मर्यादा पवित्रता और सामान्य स्वच्छता सुनिश्चित करने के लिए आवश्यक कार्य करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="11. जैन तीर्थ क्षेत्रों पर प्रदूषण की रोकथाम के लिए जिसमें नदी, जल, स्थान, तालाब, सरोवर, एवं कुंड सम्मिलित है, कार्य करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="12. जैन तीर्थ क्षेत्रों के विभिन्न केंद्रों में घाटों, सरोवरों, कुंडों और सांस्कृतिक व वास्तुकला के महत्व के अन्य स्मारकों/स्थानों का पुनर्स्थापन, सुधार और अनुरक्षण करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="13. जैन तीर्थ केंद्रों में पर्यटकों की सुविधा के लिए आवास, सड़क और जल परिवहन संबंधी सुविधाओं की व्यवस्था करना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="14. संस्थान की वित्तीय स्थिति को सुदृढ़ करने के लिए केंद्रीय व राज्य सरकारों, व्यक्तियों, संस्थाओं से दान अनुदान व अंशदान, भूमि तथा भवन प्राप्त करना जो संस्थान की भावना और उद्देश्य के प्रतिकूल न हो।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="15. संस्थान के आय तथा व्यय का लेखाजोखा सुनियोजित एवं सही ढंग से रखने की प्रक्रिया निर्धारित करने के लिए नियम बनाना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="16. संस्थान के उद्देश्यों की उपलब्धि के लिए कार्यों को सुविधाजनक ढंग तथा तत्परता से कराने के उद्देश्य से समितियां एवं उपसमितियां गठित करना एवं उनके संचालन के लिए आवश्यक और प्रासंगिक नियम बनाना।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="17. संस्थान के उद्देश्यों की उपलब्धि के लिए उन सभी कार्यों को सम्पादित करना जो आवश्यक एवं प्रमाणिक हो।" />
                </div>
              </div>
            </section>

            {/* गतिविधियाँ Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="गतिविधियाँ" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान द्वारा देश-विदेश के जैन विद्वानों को विभिन्न पुरस्कारों से सम्मानित किया जाता है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान द्वारा विद्वानों को शोध कार्य के लिए आर्थिक सहायता उपलब्ध करायी जाती है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान द्वारा समय-समय पर संगोष्ठी, व्याख्यान, निबंध प्रतियोगिता, वाद-विवाद का आयोजन किया जाता है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="सरकार द्वारा प्राप्त अनुदान अपर्याप्त होने के कारण विभिन्न संस्थाओं से आर्थिक सहायता प्राप्त करना जिससे कि संस्थान की गतिविधियाँ सुचारू रूप से चल सके।" />
                </div>
              </div>
            </section>

            {/* सुविधाएँ Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="सुविधाएँ" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान द्वारा निम्न सुविधाएँ उपलब्ध करायी जाती हैं:" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="1. पुस्तकालय, जिसमें मुख्यतः जैन धर्मदर्शन संबंधी साहित्य उपलब्ध है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="2. शोधार्थियों के शोधकार्य हेतु आर्थिक सहायता उपलब्ध करायी जाती है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="3. आचार्यों तथा उपाचार्यों द्वारा शोधार्थियों को शोध से संबंधित विशेष सहायता उपलब्ध करायी जाती है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="4. जैन धर्मदर्शन से संबंधित नवीनतम जानकारी पत्र-पत्रिकाओं तथा आधुनिक संसाधनों द्वारा उपलब्ध करायी जाती है।" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="5. संस्थान द्वारा जैन धर्मदर्शन से संबंधित एक वेबसाइट शीघ्र ही जारी की जायेगी।" />
                </div>
              </div>
            </section>

            {/* प्रकाशन Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="प्रकाशन" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान की पत्रिका 'जैन विद्या' में निम्नलिखित लेख प्रकाशित हो चुके हैं:" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="1. जैन विद्या के अध्ययन की तकनीक -\n- डॉ. सागरमल जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="2. सर्वोदय की भाव भूमि पर अनेकान्तवाद\n- डॉ. फूलचन्द जैनडोमी" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="3. भारत तथा विदेशों में जैन विद्या का अध्ययन\n- डॉ. गोकुलचन्द्र जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="4. शरीर में अतीन्द्रिय ज्ञान के स्थान समणी\n- नियोजिका मंगलप्रज्ञा" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="5. जैन वाड्‌मय में प्रातिहार्यः\n- प्रो. धर्मचन्द्र जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="6. उत्तराध्ययन में रंग चिकित्सा पद्धति\n- समणी सन्मति प्रज्ञा" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="7. जैन संस्कृत एवं प्राकृत व्याकरण\n- डॉ. रामसागर मिश्र" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="8. जैन दर्शन का वैशिष्ट्य\n- डॉ. विजय कुमार जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="9. प्राकृत के मुक्तक एवं खण्डकाव्य\n- प्रो. सुदर्शन लाल जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="10. भगवान महावीर के नामों का विवेचन\n- डॉ. हरिशंकर पाण्डेय" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="11. अकलंकदेवकृत आत्ममीमांसा एवं लघीयस्त्रय के उद्घरणों का अध्ययन\n- डॉ. कमलेश कुमार जैन" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="12. बीसवीं शताब्दी की जैन संस्कृत रचनायें उनका वैशिष्ट्य और प्रदेय\n- डॉ. भागचन्द्र जैन ‘भागेन्दु’" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="13. जैन योग के विभिन्न भेद\n- प्रो. शिव बहादुर सिंह" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="14. काशी की जैन मूर्तियाँ\n- प्रो. कमल गिरी" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="15. बड़भानु के जैन स्तूप का एक अध्ययन\n- डॉ. एम.एल. निगम" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="16. कुषाण युग में जैन मूर्तियाँ\n- प्रो. मारूतिनन्दन तिवारी" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="17. हरियाणा में जैन वास्तुकला\n- प्रो. एस.पी. शुक्ल" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="18. प्रतिहार शासकों के समय जैन कला एवं वास्तुकला\n- डॉ. बृजेश कृष्णा" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="19. भारतीय कला में आस्था मांगलिक का सामूहिक प्रत्यक्षीकरण\n- डॉ. एल. श्रीवास्तव" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="20. मध्ययुगीन भारतीय कला में नेमिनाथ\n- डॉ. अमर सिंह" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="21. पन्द्रहवीं शताब्दी में पश्चिमी भारतीय कला में जैन एवं नान जेनी का तुल्नात्मक अध्ययन\n- डॉ. रश्मिकला अग्रवाल" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="22. जैन विद्या में मंत्रों और परम्पराओं का पक्ष एवं उनका प्रयोग\n- श्री एम.सी. जोशी" />
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="23. जैदशवीं शताब्दी के जैनिया के व्यापारिक सूचना\n- प्रो. श्याम मनोहर मिश्र" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="पुस्तकालय" />
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4">
                  <TranslatableText text="संस्थान का पुस्तकालय संकलन की दृष्टि एवं सेवा की प्रकृति के अनुसार विशिष्ट पुस्तकालय की श्रेणी में आता है। इस पुस्तकालय में देश-विदेश के विद्वान अध्ययन कर चुके हैं। संस्थान का मुख्य अंग पुस्तकालय होने के कारण उसमें लगभग १५०० दुर्लभ ग्रंथ, पुस्तकें एवं पत्रिकाएँ संग्रहित हैं। इस पुस्तकालय में जैन संस्कृति से संबंधित जैन दर्शन, धर्म, इतिहास, हिन्दी साहित्य, शब्दकोश, विश्व शब्दकोश, पुरातत्व सर्वेक्षण, मूर्तिकला, वास्तुकला, संस्कृत आदि के संदर्भ ग्रंथ उपलब्ध हैं। संस्थान के कार्य दिवसों में शोधार्थियों, जैन विद्वानों एवं पाठकों के निःशुल्क अध्ययनार्थ पुस्तकालय में खुला रहता है।" />
                </div>
              </div>
            </section>

            {/* सम्पर्क Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="सम्पर्क" />
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold">
                    <TranslatableText text="उत्तर प्रदेश जैन विद्या शोध संस्थान" />
                  </p>
                  <p>
                    <TranslatableText text="विपिन खण्ड, गोमती नगर लखनऊ २२६०१०" />
                  </p>
                  <p>
                    <TranslatableText text="दूरभाष/फैक्स : ०५२२ २३००५०४" />
                  </p>
                </div>
              </div>
            </section>

            {/* Note Section */}
            <div className="bg-[#903603]/5 rounded-lg p-6 mt-8">
              <p className="text-[#5A1616]/80 text-sm">
                <TranslatableText text="नोटः- इस संस्थान का विस्तृत कार्य विवरण इनके सम्बन्धित साइट पर देखा जा सकता है।" />
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

export default JainInstitute;
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface ArchaeologyProps {
  onClose: () => void;
}

const Archaeology: React.FC<ArchaeologyProps> = ({ onClose }) => {
  const tabs = [
    { id: 'establishment', label: 'स्थापना' },
    { id: 'introduction', label: 'परिचय पुस्तिका' },
    { id: 'structure', label: 'संगठनात्मक ढांचा' },
    { id: 'work', label: 'प्रमुख कार्य योजनाओं एवं दायित्व' },
    { id: 'contact', label: 'संपर्क' }
  ];

  return (
    <div className="fixed inset-0  z-50 overflow-y-auto">
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
            text="उ०प्र० राज्य पुरातत्व निदेशालय"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-0 max-w-5xl mx-auto">
        <div className=" backdrop-blur-sm rounded-none ">
          {/* <img
            src={abstract}
            alt="Abstract Design"
            className="w-32 mx-auto mb-6 opacity-70"
          /> */}

          <div className="flex overflow-x-auto gap-2 pb-3 mb-6 px-4 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="px-5 py-2 mt-5 whitespace-nowrap rounded-full bg-[#903603]/5 text-[#903603] hover:bg-[#903603] hover:text-white transition-all font-medium"
              >
                <TranslatableText text={tab.label} />
              </button>
            ))}
          </div>

          <div className="space-y-6 px-4">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <img
                src="https://upculture.up.nic.in/sites/default/files/inline-images/uparch7.gif"
                alt="Archaeological Site 1"
                className="w-full rounded-lg shadow hover:shadow-lg transition-all"
              />
              <img
                src="https://upculture.up.nic.in/sites/default/files/inline-images/uparch8.gif"
                alt="Archaeological Site 2"
                className="w-full rounded-lg shadow hover:shadow-lg transition-all"
              />
            </div>

            <section>
              <div className="bg-white/50 rounded-lg p-6 mb-6">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="१९४७ में आजादी प्राप्त होने के उपरान्त उत्तर प्रदेश के तत्कालीन शिक्षा मंत्री डा० सम्पूण्नन्द की अध्यक्षता में गठित समिति की संस्तुति पर वर्ष १९५१ में प्रदेश के पुरातात्विक सर्वेक्षण पुरास्थलों, स्मारको के संरक्षण, प्रकाशन और इस संदर्भ में जन चेतना जगाने हेतु पुरातत्व विभाग की स्थापना की गई। डा० कृष्ण दत्त बाजपेई इस विभाग के पुरातत्व अधिकारी आसीन हुए। विभाग का कार्यालय आर्य नगर मुहल्ले के एक भवन में प्रारम्भ हुआ। डा० कृष्ण दत्त बाजपेई ने १८ माह की अल्प अवधि में पुरातत्व के क्षेत्र में सराहनीय योगदान दिया, परन्तु वर्ष १९५३ में यह विभाग समाप्त करके तद्‌सम्बन्धी कार्य राज्य संग्रहालय, लखनऊ को सौंप दिया गया। वर्ष १९५८-५९ में पुरातत्व विभाग पुनः स्वतंत्र रूप से स्थापित हुआ, लेकिन वर्ष १९६२ तक इसके कार्य पुरातत्व अभियन्ता और उसके बाद वर्ष १९६५ में पुरातत्व सहायक द्वारा संचालित होते रहे। वर्ष १९६५ में ही पुरातत्व अधिकारी की नियुक्ति के साथ विभाग ने अधिक सुनिश्चितता के साथ कार्य आरम्भ किया। वर्ष १९७४ में पुरातत्व अधिकारी के पद को निदेशक के पद में परिवर्तित कर दिया गया। विभाग का कार्यालय वर्ष १९८१-८२ तक राज्य संग्रहालय, लखनऊ एवं जवाहर भवन के नवम्‌ तल से संचालित होता रहा। पुनः कैसरबाग स्थित रोशनउद्‌दौला कोठी में स्थानान्तरित हो गया। सांस्कृतिक कार्य विभाग के अधीन होने के कारण संस्था का नाम 'उ०प्र० राज्य पुरातत्व संगठन' रखा गया। पर्वतीय क्षेत्र के पुरातत्व का विधिवत अध्ययन करने एवं स्मारकों के संरक्षण हेतु वर्ष १९७९-८० में 'गढ़वाल' क्षेत्र में इसकी एक इकाई की स्थापना की गयी जिसे कालान्तर में अल्मोड़ा स्थानान्तरित कर दिया गया। नवें दशक में पौड़ी और झांसी तथा पिछले पांच वर्षो में आगरा, गोरखपुर, वाराणसी एवं इलाहाबाद में क्षेत्रीय इकाईयां की स्थापना की गयी।" />
                </p>
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="राज्य में पुरातत्व सम्बन्धी गतिविधियों को और अधिक गति प्रदान करने हेतु उत्तर प्रदेश शासन, संस्कृति अनुभाग द्वारा २७ अगस्त, १९९६ द्वारा उ०प्र० राज्य पुरातत्व संगठन को 'उत्तर प्रदेश राज्य पुरातत्व विभाग' तथा निदेशक, राज्य पुरातत्व संगठन को स्वतंत्र रूप से विभागाध्यक्ष घोषित कर दिया गया। लगभग तीन दशक से अधिक समय से विभाग द्वारा प्रदेशों में अनेकों पुरातात्विक सर्वेक्षण एवं उत्खनन के अभियान संचालित कराया गया। पुरातत्व निदेशालय स्तर पर अविभाजित उत्तर प्रदेश के हिमालयी क्षेत्र, विन्ध्य के पठारी, बधेल खण्ड, बुन्देलखण्ड एवं मध्य उत्तर प्रदेश के नैमिषारण्य क्षेत्र, लखनऊ मण्डल एवं कानपुर देहात स्थित मूसानगर क्षेत्र में योजनाबद्घ ढंग से पुरातात्विक अभियान संचालित किया गया। उक्त अभियानों में उत्तरी विन्ध्य क्षेत्र में लगभग १५० चित्रित शैलाश्रय प्रकाश में लाया गया तथा यमुना नदी घाटी में ४५००० वर्ष प्राचीन मानवीय गतिविधियो के साक्ष्य काल्पी से पाया गया। इसके अतिरिक्त मध्य गंगा घाटी के सरयूपार क्षेत्र में द्दठी सहस्त्राब्दी ई०पू० में लहुरादेवा से धान की खेती के प्राचीनतम प्रमाण प्राप्त हुये हैं। चन्दौली जनपद के मलहर उत्खनन तथा राजानल (जिला सोनभद्र) के उत्खनन से लोहे की प्रचीनता लगभग १७००-१८०० ई०पू० सिद्घ हुयी है। पुरातात्विक सर्वेक्षणों के तहत अनेकों प्रोटोहिस्टारिक स्थल, प्राचीन मन्दिरो, मूर्तियो, पात्रों के अवशेष पाया गया, जिनसे उत्तर प्रदेश के पुरातत्व पर पर्याप्त प्रकाश पड़ा है। अनेक पुरातात्विक अभियानों के परिणाम वार्षिक शोध पत्रिका प्राग्धारा में प्रकाशित हुये हैं। विगत डेढ़ दशक में प्राग्धारा ने भारतीय पुरातत्व ही नहीं अपितु विश्व पुरातत्व में अपना अलग स्थान बनाया है।" />
                </p>
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="उ०प्र० राज्य पुरातत्व विभाग द्वारा समय-समय पर संचालित सर्वेक्षण अभियानों के माध्यम से प्रदेश के भिन्न-भिन्न भागो से अनेक उल्लेखनीय पुरातात्विक महत्व के अवशेष प्राप्त हुये हैं, इनमें प्रमुख रूप से मिर्जापुर एवं सोनभद्र में स्थित सौ से अधिक चित्रित शैलाश्रय, शैल चित्रों के अध्ययन को नया आयाम देते हैं। इसके साथ-साथ सोनभद्र जिले में स्थित राजानल का टीला, लूसा, लेखहिया कानपुर देहात जिले में काटर एवं मूसानगर, अल्मोड़ा जिले की बमनसुयाल, नवदेवल एवं कपिलेश्वर महादेव, पौड़ी गढ़वाल स्थित पैठाणी शिव मन्दिर, उत्तर काशी का थानगांव मन्दिर, टिहरी जिले का इन्द्र वैकुण्ठ आदि ऐसे अनेक पुरावशेष प्रकाश में आया हैं जिनसे प्रदेश व देश में पुरातात्विक शोध को नई दिशा मिली है।" />
                </p>
              </div>

              <div className="bg-white/50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                  <TranslatableText text="संगठनात्मक ढांचा" />
                </h2>
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mb-4">
                  <TranslatableText text="उत्तर प्रदेश राज्य पुरातत्व विभाग, संस्कृति विभाग, उ०प्र० शासन के अधीन कार्यरत तीन निदेशालयों में से है। अन्य दो संस्कृति निदेशालय तथा राज्य संग्रहालय निदेशालय है। पुरातत्व निदेशालय उ०प्र० राज्य पुरातत्व विभाग की सभी गतिविधियों का विधिवत संचालन एवं नियंत्रण करता है। पुरातात्विक उत्खनन एवं शोध परक कार्य की प्रमुख परियोजनायें पुरातत्व निदेशालय के माध्यम से संचालित होती हैं। पुरातात्विक गतिविधियों को सम्पूर्ण उत्तर प्रदेश में विधिवत नियंत्रित करने के उद्देश्य से गोरखपुर, वाराणसी, इलाहाबाद, झांसी एवं आगरा में क्षेत्रीय पुरातत्व इकाई की स्थापना की गयी है तथा ये समस्त इकाईयॉ पुरातत्व निदेशालय के नियंत्रण में अन्य कर्मचारियों के साथ पुरातत्व विभाग के उद्देश्य की पूर्ति हेतु विधिवक्त कार्यरत है।" />
                </p>
                                <p className="text-md font-bold text-[#903603] mb-4 font-['Baloo_2']">
                  <TranslatableText text="नोट : इस विभाग ⁄ निदेशालय का विस्तृत कार्य विवरण इनके सम्बन्धित साइट पर देखा जा सकता है।" />
                </p>
              </div>

              <div className="bg-white/50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                  <TranslatableText text="संपर्क" />
                </h2>
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold text-lg"><TranslatableText text="निदेशक" /></p>
                  <p className="font-semibold"><TranslatableText text="उ०प्र० राज्य पुरातत्व निदेशालय" /></p>
                  <p className="text-[#5A1616]/80"><TranslatableText text="रोशन–उर्दू दोला कोठी" /></p>
                  <p className="text-[#5A1616]/80"><TranslatableText text="कैसरबाग लखनऊ" /></p>
                  <p className="text-[#5A1616]/80"><TranslatableText text="फोन– (0522) 2623045; 2622768" /></p>
                  <p className="text-[#5A1616]/80"><TranslatableText text="ईमेल– upstatearchaeology@gmail.com" /></p>
                </div>
              </div>
            </section>

            <div className="flex justify-center mt-12">
              <a
                href="https://upculture.up.nic.in/sites/default/files/inline-images/Paricahy-Pusitika-UP-State-Archaeology-Department-compressed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#903603] text-white rounded-full hover:bg-[#5A1616] transition-all font-medium"
              >
                <TranslatableText text="परिचय पुस्तिका डाउनलोड करें" />
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

export default Archaeology;
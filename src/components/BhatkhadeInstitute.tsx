import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface BhatkhadeInstituteProps {
  onClose: () => void;
}

const BhatkhadeInstitute: React.FC<BhatkhadeInstituteProps> = ({ onClose }) => {
  const courses = [
    { level: 'विद्यालय', duration: '२ साल', eligibility: 'कक्षा पांचवी', courses: [
      { name: 'प्रवेशिका', duration: '२ साल' },
      { name: 'परिचय', duration: '२ साल' }
    ]},
    { level: 'महाविद्यालय', duration: '२ साल', courses: [
      { name: 'प्रवेश', duration: '२ साल' },
      { name: 'प्रवीण', duration: '२ साल' }
    ]},
    { level: 'विश्वविद्यालय', courses: [
      { name: 'संगीत में डिप्लोमा', duration: '२ साल', eligibility: 'उच्चविद्यालय' },
      { name: 'बैचलर ऑफ परफॉर्मिंग आर्ट्स', duration: '३ साल', eligibility: 'डिप्लोमा' },
      { name: 'मास्टर इन परफॉर्मिंग आर्ट्स', duration: '२ साल', eligibility: 'बी०पी०ए०' },
      { name: 'पी०एच०डी०', duration: '२ साल (न्यूनतम)', eligibility: 'एम०पी०ए०' }
    ]},
    { level: 'विशेष सर्टिफिकेट कोर्स', courses: [
      { name: 'ध्रुपद धामार और होरी\nअर्ध शास्त्रीय\n(ठुमरी दादरा आदि)', duration: '२ साल', eligibility: 'प्रवेश' },
      { name: 'गायन', duration: '२ साल', eligibility: 'परिचय' },
      { name: 'हार्मोनियम', duration: '२ साल', eligibility: '-' }
    ]}
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
            text="भातखण्डे संगीत संस्थान"
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
                <TranslatableText text="संक्षिप्त परिचय" />
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="भारत में संगीत शिक्षा का प्रारम्भ प्राचीनकाल की गुरूकुल/आश्रम व्यवस्था के साथ हुआ, जहॉ महान सन्त, ऋषि, मुनि आदि विद्वान सामान्य शिक्षा के साथ साथ संगीत शिक्षा भी प्रदान किया करते थें। समय के साथ-साथ संगीत शिक्षा की व्यवस्था में अनेक परिवर्तन हुये तथा १९ वीं शती के मध्य में ब्रिटिश राज्य में संगीत शिक्षा का आधुनिक संस्थागत स्वरूप उभर कर सामने आया। गुरू-शिष्य परम्परा पर आधारित संगीत शिक्षा प्रणाली को २० वीं शती में एक नया आयाम मिला, जब शती के दो महान संगीत पुरोधाओं-पण्डित विष्णु दिगम्बर पलुस्कर तथा पण्डित विष्णु नारायण भातखण्डे ने संगीत शिक्षा एवं प्रशिक्षण प्रणाली की दो समानान्तर परम्पराओं को विकसित किया।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="सन्‌ १९२६ में पण्डित विष्णु नारायण भातखण्डे ने लखनऊ में एक संगीत सम विश्वविद्यालय की स्थापना राय उमानाथ बली, राय राजेश्वर बली, लखनऊ के संगीत संरक्षको एवं अवध के संगीत प्रेमियों के सहयोग से की। इस संस्था का उद्‌घाटन अवध प्रान्त के तत्कालीन गर्वनर सर विलियम मौरीस के द्वारा किया गया तथा उन्ही के नाम पर इस संस्था का नाम मौरीस कालेज ऑफ म्यूजिक रखा गया है। २६ मार्च,१९६६ को उत्तर प्रदेश राज्य सरकार ने इस संस्था को अपने नियन्त्रण में लेकर इसके स्थापक के नाम पर इसे भातखण्डे हिन्दुस्तानी संगीत विद्यालय नाम प्रदान किया।" />
                </p>

                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed mt-4">
                  <TranslatableText text="राज्य सरकार के अनुरोध पर भारत सरकार ने इस संस्थान को २४ अक्टूबर, २००० को सम विश्वविद्यालय घोषित कर इसे भारत का एक मात्र संगीत सम विश्वविद्यालय होने का गौरव प्रदान किया। भातखण्डे संगीत संस्थान रजिस्ट्रेशन ऑफ सोसाइटीज एक्ट, १८६० के अर्न्तगत पंजीकृत है। २ नवम्बर, २००२ को उत्तर प्रदेश के महामहिम राज्यपाल ने इस संस्थान का अध्यक्ष पद स्वीकार कर लिया है।" />
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="पाठ्यक्रम और व्यवस्था" />
              </h2>
              <div className="space-y-6">
                <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                  <TranslatableText text="भातखण्डे संगीत संस्थान दो भागो में विभाजित है। पहला है विश्वविद्यालय अनुभाग, जिसके अन्तर्गत २ वर्षीय प्री ग्रेजुएशन, ३ वर्षीय ग्रेजुएशन, २ वर्षीय पोस्ट ग्रेजुएशन और पी०एच०डी० आदि पाठ्यक्रम आते है। द्वितीय अनुभाग के अन्तर्गत दो वर्षीय डिप्लोमा पाठ्यक्रम आते है।" />
                </p>

                <div className="bg-white/50 rounded-xl p-6">
                  <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                    <TranslatableText text="संस्थान में संगीत की प्रायः सभी विधाओं में यथा-गायन (शास्त्रीय, उपशास्त्रीय एवं सुगम संगीत), स्वर वाद्य (सितार, सरोद, सारंगी, बांसुरी, वायलिन, गिटार, हारमोनियम), ताल वाद्य (तबला, पखावज), नृत्य (कथक, भरतनाट्यम, मणिपुरी और विविध लोक नृत्य) आदि की शिक्षा प्रदान की जाती है। यहॉ ध्रुपद-धामर, ठुमरी गायन आदि के विशेष पाठ्यक्रम भी संचालित किये जाते है। इसी के साथ संगीत उपकरणों की मरम्मत/रखरखाव, संगीत संस्थाओं का प्रबन्धन, समारोह आयोजन, संगीत पत्रकारिता आदि विभिन्न व्यवहारिक पाठ्यक्रमों का संचालन भी किया जाता है। संगीत के क्षेत्र में शोध कार्य की सुविधा भी संस्थान में उपलब्ध है।" />
                  </p>
                </div>

                <div className="space-y-6">
                  {courses.map((level, index) => (
                    <div key={index} className="bg-white/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                        <TranslatableText text={level.level} />
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#903603]/5">
                              <th className="py-2 px-4 text-left text-[#903603] font-['Baloo_2']">
                                <TranslatableText text="पाठ्यक्रम" />
                              </th>
                              <th className="py-2 px-4 text-left text-[#903603] font-['Baloo_2']">
                                <TranslatableText text="अवधि" />
                              </th>
                              <th className="py-2 px-4 text-left text-[#903603] font-['Baloo_2']">
                                <TranslatableText text="योग्यता" />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {level.courses.map((course, courseIndex) => (
                              <tr key={courseIndex} className="border-b border-[#903603]/10">
                                <td className="py-3 px-4 text-[#5A1616] font-['Inter']">
                                  <TranslatableText text={course.name} />
                                </td>
                                <td className="py-3 px-4 text-[#5A1616] font-['Inter']">
                                  <TranslatableText text={course.duration} />
                                </td>
                                <td className="py-3 px-4 text-[#5A1616] font-['Inter']">
                                  <TranslatableText text={course.eligibility || '-'} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2']">
                <TranslatableText text="सम्पर्क हेतु पता" />
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <div className="space-y-2 text-[#5A1616] font-['Inter']">
                  <p className="font-bold">
                    <TranslatableText text="भातखण्डे संगीत संस्थान (सम विश्वविद्यालय)" />
                  </p>
                  <p>
                    <TranslatableText text="कैसरबाग, लखनऊ" />
                  </p>
                  <p>
                    <TranslatableText text="वेबसाइट- www.bhatkhandemusic.com" />
                  </p>
                </div>
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

export default BhatkhadeInstitute;
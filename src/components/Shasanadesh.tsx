import React from 'react';
import { ChevronLeft, FileText, ExternalLink } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface ShasanadeshProps {
  onClose: () => void;
}

interface OrderType {
  शासनादेश_संख्या: string;
  अपडेट_तिथि: string;
  विवरण: string;
  दस्तावेज़: string;
  आकार?: string;
  प्रारूप?: string;
  भाषा?: string;
}

const Shasanadesh: React.FC<ShasanadeshProps> = ({ onClose }) => {
  const latestOrders = [
  {
    "शासनादेश संख्या": "238/2023/3056/चार-2023",
    "अपडेट तिथि": "25/07/2023",
    "विवरण": "सांस्कृतिक मण्डलियों से संबंधित दलों के पंजीकरण के संबंध में",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/2023-07/bhajan-kirtan-mandali.pdf"
  },
  {
    "शासनादेश संख्या": "1992/चार-2023",
    "अपडेट तिथि": "22/06/2023",
    "विवरण": "कल्चरल क्लब की स्थापना के संबंध में",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/2023-05/cultuiral%20club%20GO.pdf"
  },
  {
    "शासनादेश संख्या": "192/2023/1254/चार-2023",
    "अपडेट तिथि": "9/5/23",
    "विवरण": "सांस्कृतिक कार्यक्रमों हेतु कलाकारों को अनुबन्ध किये जाने के सम्बन्ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/artist%20go.pdf"
  },
  {
    "शासनादेश संख्या": "27/चार-2023",
    "अपडेट तिथि": "4/1/23",
    "विवरण": "वादों में प्रभावी पैरवी हेतु नोडल अधिकारी का नामांकन",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/nodal%20officer.pdf"
  },
  {
    "शासनादेश संख्या": "21/2021/435 /चार-2021",
    "अपडेट तिथि": "26/02/2021",
    "विवरण": "दिनांक 04 फरवरी, 2021 को चौरी-चौरा शताब्‍दी महोत्‍सव के उद्घाटन अवसर पर डाक टिकट जारी किये जाने के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user6.pdf"
  },
  {
    "शासनादेश संख्या": "19/2021/60 /चार-2021",
    "अपडेट तिथि": "23/02/2021",
    "विवरण": "वित्‍तीय वर्ष 2020-21 में अयोध्‍या शोध संस्‍थान, अयोध्‍या को राम संस्‍कृति की विश्‍व यात्रा का दस्‍तावेजीकरण, शोध, सर्वेक्षण एवं प्रकाशन मद में प्राविधानित धनराशि के सापेक्ष द्वितीय किश्‍त की वित्‍तीय स्‍वीकृति के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user5.pdf"
  },
  {
    "शासनादेश संख्या": "20/2021/110 /चार-2021-75(बजट)/2007",
    "अपडेट तिथि": "23/02/2021",
    "विवरण": "वित्‍तीय वर्ष 2020-21 में अखिल भारतीय संस्‍कृत परिषद लखनऊ को गैर वेतन मद में प्राविधानित धनराशि के सापेक्ष द्वितीय किश्‍त की वित्‍तीय स्‍वीकृति के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user4.pdf"
  },
  {
    "शासनादेश संख्या": "17/2021/426 /चार-2021",
    "अपडेट तिथि": "22/02/2021",
    "विवरण": "वित्‍तीय वर्ष 2020-21 में राय उमानाथ बली प्रेक्षागृह, लखनऊ के नवीनीकरण एवं जीर्णोद्धार कराये जाने हेतु वित्‍तीय स्‍वीकृति के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user3.pdf",
    "आकार": "1.8 एम बी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "18/2021/243 /चार-2021",
    "अपडेट तिथि": "22/02/2021",
    "विवरण": "दिनांक 08 अक्‍टूबर, 2020 को मा0 मुख्‍यमंत्री जी द्वारा गोरखपुर में वर्चुअल शिलान्‍यास कार्यक्रम के अवसर पर सांस्‍कृतिक कार्यक्रमों के आयोजन की प्रशासनिक एवं वित्‍तीय स्‍वीकृति प्रदान करने के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user2.pdf",
    "आकार": "3.63 एम बी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "16/2021/287/ चार-2021",
    "अपडेट तिथि": "16/02/2021",
    "विवरण": "वित्‍तीय वर्ष 2020-21 में डा0 भीमराव अम्‍बेडकर संग्रहालय एवं पुस्‍तकालय, रामपुर की बाउण्‍ड्रीवाल एवं अन्‍य निर्माण कार्यो को कराये जाने की अवशेष धनराशि को अवमुक्‍त करने की प्रशासकीय एवं वित्‍तीय स्‍वीकृति निर्गत किये जाने के सम्‍बन्‍ध मे।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ViewGOPDF_list_user1.pdf",
    "आकार": "363 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "15/2021/1908 / चार-2020",
    "अपडेट तिथि": "8/2/21",
    "विवरण": "58- आउट सोर्सिग मद में पुनर्विनियोग के माध्यम से धन आवंटन कराये जाने के सम्बन्ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/58-outsourcing%20GO.pdf",
    "आकार": "363 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "12/2021/101 /चार-2021-64(वि0)/2007",
    "अपडेट तिथि": "2/2/21",
    "विवरण": "वित्तीय वर्ष 2020-21 में राष्ट्री य कथक संस्थान, लखनऊ को 20-सहायता अनुदान-सामान्य (गैर वेतन) आयोजनेत्तर पक्ष में प्राविधानित धनराशि के सापेक्ष तृतीय किश्त की वित्तीय स्वीकृति के सम्बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Kathak_santhan_GO.pdf",
    "आकार": "489 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "13/2021/59/चार-2021-66(बजट)/2007",
    "अपडेट तिथि": "2/2/21",
    "विवरण": "वित्तीय वर्ष 2020-21 में उ0प्र0 ललित कला अकादमी , लखनऊ को गैर वेतन मद में प्राविधानित धनराशि के सापेक्ष तृतीय किश्त की वित्तीय स्वीकृति के सम्बन्ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Lalit_kala_academi_GO.pdf",
    "आकार": "611 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "14/2021/102 /चार-2021-83(बजट)/2006",
    "अपडेट तिथि": "2/2/21",
    "विवरण": "वित्तीय वर्ष 2020-21 में भातखण्डे् संगीत संस्‍थान सम विश्व‍विद्यालय, लखनऊ को गैर वेतन मद में प्राविधानित धनराशि के सापेक्ष द्वितीय किश्त की वित्ती य स्वी कृति के सम्‍बन्‍ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/bhatkhande_music_institute_GO.pdf",
    "आकार": "609 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "10/2021/1923 /चार-2020-63(बजट)/2007",
    "अपडेट तिथि": "29/01/2021",
    "विवरण": "वित्तीय वर्ष 2020-21 में भारतेन्‍दु नाट्य अकादमी लखनऊ को 20-सहायता अनुदान-सामान्य (गैर वेतन) आयोजनेत्तर पक्ष में प्राविधानित धनराशि के सापेक्ष तृतीय किश्त की वित्तीय स्वीकृति के सम्बन्ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Bhartendu_natya_academi_GO.pdf",
    "आकार": "671 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "11/2021/1951 /चार-2020-65(वि0)/2007",
    "अपडेट तिथि": "29/01/2021",
    "विवरण": "वित्तीय वर्ष 2020-21 में उ0प्र0 संगीत नाटक अकादमी, लखनऊ को गैर वेतन मद में प्राविधानित धनराशि के सापेक्ष तृतीय किश्त की वित्तीय स्वीकृति के सम्बन्ध में।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Sangeet_natak_academi_GO.pdf",
    "आकार": "642 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "05/2020/1936/चार-2020",
    "अपडेट तिथि": "2/12/20",
    "विवरण": "दिनांक 12 से 13 जनवरी,2021 की अवधि में गोरखपुर में गोरखपुर महोत्सव-2021 के आयोजन के सम्बन्ध में",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Gorakhpur%20mahotsav%202021.pdf",
    "आकार": "621 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "152/2020/1050/चार-2020",
    "अपडेट तिथि": "1/12/20",
    "विवरण": "अयोध्या में सावन झूला हेतु",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/ayodhya%20sawan%20jhula%2001.12.2020.pdf",
    "आकार": "182 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "151/2020/1040/चार-2020",
    "अपडेट तिथि": "1/12/20",
    "विवरण": "मा० प्रधानमंत्री जी के दिनांक 05अगस्त,2020 को अयोध्या आगमन के अवसर पर आयोजित किये जाने वाले कार्यक्रमों हेतु",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/PM%20ayodhya%20aagaman.pdf",
    "आकार": "118 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "136/2020/1507/चार-2020",
    "अपडेट तिथि": "23/10/2020",
    "विवरण": "श्री श्री रामलीला समिति, रावतगंज, गोरखपुर द्वारा नौ दिवसीय रामलीला के मंचन हेतु",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/shri%20shri%20ramlila%20samiti%20rawatganj%20GO.pdf",
    "आकार": "110 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "136/2020/1506/चार-2020",
    "अपडेट तिथि": "23/10/2020",
    "विवरण": "आदर्श रामलीला समिति त्रिवेणी नगर , लखनऊ द्वारा रामलीला के आयोजन हेतु",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/Adarsh%20ramlila%20samiti%20GO.pdf",
    "आकार": "114.6 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "8/2015/3097/चार-2014-231 (वि)/12",
    "अपडेट तिथि": "16/01/2015",
    "विवरण": "वित्तीय वर्ष 2014-15 में जनपद इटावा में इटावा नुमाइश पण्डाल का विस्तावरीकरण (सीसी फर्श व अवशेष क्षेत्र का पण्डाल ग्रीन रूम का निर्माण) कराये जाने हेतु प्रशासकीय एवं वित्तीय स्वीकृत",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/3097.pdf",
    "आकार": "121 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "3189/चार-2015",
    "अपडेट तिथि": "15/01/2015",
    "विवरण": "उ0प्र0 राजकीय अभिलेखागार, लखनऊ में आर्काइब गैलरी के निर्माण हेतु संस्था नामित",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/3189.pdf",
    "आकार": "113 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "9/3182 /चार-2014-30(बजट)13 टीसी",
    "अपडेट तिथि": "23/12/2014",
    "विवरण": "सैफई महोत्सव-2014 के आयोजन हेतु प्रशासनिक एवं वित्तीय स्वीकृति के सम्बन्ध मे।",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/3182.pdf",
    "आकार": "304 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "3061/चार-2014-14(बजट)/14",
    "अपडेट तिथि": "24/11/2014",
    "विवरण": "पुरातत्व संग्रहालय, कन्नौज में संग्रहालय संचालित करने हेतु नये कार्य हेतु कार्यदायी संस्था को नामित करना",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/3061.pdf",
    "आकार": "301 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  },
  {
    "शासनादेश संख्या": "2088/चार-2014-406(वि)/2004टीसी2",
    "अपडेट तिथि": "18/11/2014",
    "विवरण": "अयोध्या फैजाबाद में अन्तर्राष्ट्रीय रामलीला केंद्र के अंतर्गत थीम पार्क हेतु वित्तीय स्वीकृति",
    "दस्तावेज़": "https://upculture.up.nic.in/sites/default/files/documents/2088.pdf",
    "आकार": "294 केबी",
    "प्रारूप": "पीडीएफ",
    "भाषा": "हिंदी"
  }
];

  const quickLinks = [
    {
      title: "नवीन शासनादेश",
      url: "http://shasanadesh.up.gov.in/"
    },
    {
      title: "मूर्ति निर्माण सम्बंधित शासनादेश",
      url: "http://upculture.up.nic.in/sites/default/files/documents/murti%20sambandhit%20GO.pdf"
    },
    {
      title: "शासनादेश 2009-10",
      url: "https://upculture.up.nic.in/sites/default/files/documents/GO.pdf"
    },
    {
      title: "शासनादेश 2009-10",
      url: "https://upculture.up.nic.in/sites/default/files/documents/GO2.pdf"
    },
    {
      title: "शासनादेश",
      url: "https://upculture.up.nic.in/sites/default/files/documents/go_naveen_123.pdf"
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
            text="शासनादेश"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="त्वरित लिंक" />
              </h2>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-[#903603]/10 group"
                  >
                    <FileText className="w-5 h-5 text-[#903603]" />
                    <span className="flex-grow font-['Baloo_2'] text-[#5A1616]">
                      <TranslatableText text={link.title} />
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#903603] opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-40 mx-auto my-6"
            />

            <div>
              <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
                <TranslatableText text="नवीनतम शासनादेश" />
              </h2>
              <div className="space-y-4">
                {latestOrders.map((order, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border border-[#903603]/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <TranslatableText
                        text={order.शासनादेश_संख्या}
                        className="text-[#903603] font-semibold"
                      />
                      <TranslatableText
                        text={order.अपडेट_तिथि}
                        className="text-gray-500 text-sm"
                      />
                    </div>
                    <TranslatableText
                      text={order.विवरण}
                      className="text-[#5A1616] mb-3 font-['Baloo_2']"
                    />
                    <a
                      href={order.दस्तावेज़}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#903603] hover:text-[#5A1616] transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <TranslatableText text="दस्तावेज़ देखें" />
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
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

export default Shasanadesh;
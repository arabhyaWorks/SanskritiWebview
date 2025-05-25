import React from 'react';
import { ChevronLeft, Mail, Phone, Globe } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import Footer from './Footer';
import abstract from '../assets/abstract.png';

interface ContactProps {
  onClose: () => void;
}

interface ContactCardProps {
  title: string;
  name: string;
  designation?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  name,
  designation,
  address,
  phone,
  email,
  website,
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border-l-4 border-[#903603]">
    <h3 className="text-[#903603] font-bold text-lg mb-1 font-['Inter']">
      <TranslatableText text={title} />
    </h3>
    <h4 className="text-[#5A1616] font-semibold mb-1 font-['Inter']">
      <TranslatableText text={name} />
    </h4>
    {designation && (
      <p className="text-gray-600 text-sm mb-2">
        <TranslatableText text={designation} />
      </p>
    )}
    {address && (
      <p className="text-gray-600 text-sm mb-3">
        <TranslatableText text={address} />
      </p>
    )}
    <div className="space-y-2">
      {phone && (
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{phone}</span>
        </div>
      )}
      {email && (
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${email}`} className="text-sm hover:text-[#903603] break-all">
            {email}
          </a>
        </div>
      )}
      {website && (
        <div className="flex items-center gap-2 text-gray-600">
          <Globe className="w-4 h-4" />
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#903603] break-all">
            {website}
          </a>
        </div>
      )}
    </div>
  </div>
);

interface DepartmentRowProps {
  name: string;
  webAdmin: string;
  designation: string;
  contact: string;
}

const DepartmentRow: React.FC<DepartmentRowProps> = ({
  name,
  webAdmin,
  designation,
  contact,
}) => (
  <tr className="border-b border-gray-200">
    <td className="py-3 px-4">
      <TranslatableText text={name} />
    </td>
    <td className="py-3 px-4">
      <TranslatableText text={webAdmin} />
    </td>
    <td className="py-3 px-4">
      <TranslatableText text={designation} />
    </td>
    <td className="py-3 px-4">{contact}</td>
  </tr>
);

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="हमसे संपर्क करें"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6 border border-gray-200">
        <ContactCard
          title="निदेशक"
          name="श्री विशाल सिंह"
          designation="संस्कृति निदेशालय, उ0प्र0"
          address="नवम तल, जवाहर भवन लखनऊ"
          phone="0522-2286672"
          website="https://upculture.up.nic.in"
          email="directorcultureup@gmail.com"
        />

<ContactCard
  title="अपर निदेशक"
  name="डॉ सृष्टि धवन"
  designation="अपर निदेशक"
  phone="9580194221"
/>

<ContactCard
  title="वित्त नियंत्रक"
  name="श्री दिलीप कुमार गुप्ता"
  designation="वित्त नियंत्रक"
  phone="9935870592"
/>

<ContactCard
  title="सहायक निदेशक (विधि)"
  name="श्री तुहिन द्विवेदी"
  designation="सहायक निदेशक (विधि)"
  phone="7060064089"
/>

<ContactCard
  title="सहायक निदेशक (संगीत/निष्पादन कला)"
  name="डॉ राजेश अहिरवार"
  designation="सहायक निदेशक (संगीत/निष्पादन कला)"
  phone="8839923506"
/>

<ContactCard
  title="सहायक निदेशक"
  name="श्रीमती रीनू रंगभारती"
  designation="सहायक निदेशक"
  phone="9415506831"
/>

<ContactCard
  title="सहायक लेखाधिकारी"
  name="श्री सुशील कुमार"
  designation="सहायक लेखाधिकारी"
  phone="9453310555"
/>

<ContactCard
  title="कार्यक्रम अधिकारी"
  name="श्री कमलेश कुमार पाठक"
  designation="कार्यक्रम अधीशाशी"
  phone="9335201465"
/>

<ContactCard
  title="प्रशासनिक अधिकारी"
  name="श्री धर्मेंद्र यादव"
  designation="प्रशासनिक अधिकारी"
  phone="9415014678"
/>

<ContactCard
  title="वैयक्तिक सहायक ग्रेड-1 (निदेशक)"
  name="श्री गौरव पाठक"
  designation="वैयक्तिक सहायक ग्रेड-1 (निदेशक)"
  phone="9415484719"
/>

        <div>
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto my-8"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
            <TranslatableText text="अनुषंग - संस्कृति विभाग की प्रमुख शाखायें" />
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#903603]/5 text-[#903603]">
                  <th className="py-3 px-4 text-left">
                    <TranslatableText text="विभाग का नाम" />
                  </th>
                  <th className="py-3 px-4 text-left">
                    <TranslatableText text="वेब प्रभारी" />
                  </th>
                  <th className="py-3 px-4 text-left">
                    <TranslatableText text="पद" />
                  </th>
                  <th className="py-3 px-4 text-left">
                    <TranslatableText text="संपर्क" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <DepartmentRow
                  name="संस्कृति निदेशालय, उत्तर प्रदेश"
                  webAdmin="श्री गोविन्द मिश्रा"
                  designation="वेब अधिकारी"
                  contact="+919415484719"
                />
                <DepartmentRow
                  name="उ०प्र० संग्रहालय निदेशालय"
                  webAdmin="श्री विनय कुमार सिंह"
                  designation="मुद्राशास्त्र अधिकारी"
                  contact="+917007365315"
                />
                <DepartmentRow
                  name="उ०प्र० राज्य पुरातत्व विभाग"
                  webAdmin="डॉ0 राजीव त्रिवेदी"
                  designation="सहायक पुरातत्‍व अधिकारी"
                  contact="+919415159033"
                />
                <DepartmentRow
                  name="उ०प्र० राजकीय अभिलेखागार"
                  webAdmin="श्री अंजनी कुमार त्रिपाठी"
                  designation="प्राविधिक  सहायक"
                  contact="+919415918121"
                />
                <DepartmentRow
                  name="संगीत नाटक अकादमी"
                  webAdmin="श्री सौरभ सक्सेना"
                  designation="आशुलिपिक"
                  contact="+919453435668"
                />
                <DepartmentRow
                  name="ललित कला अकादमी"
                  webAdmin="श्री साहब बक्‍श"
                  designation="वरिष्‍ठ सहायक (नि.वे.)"
                  contact="+919838116933 "
                />
                <DepartmentRow
                  name="भारतेन्दु नाट्य अकादमी"
                  webAdmin="श्रीमती रश्मि अस्थाना"
                  designation="प्रशासनिक अधिकारी"
                  contact="+919452851525"
                />
                <DepartmentRow
                  name="अयोध्या शोध संस्थान"
                  webAdmin="सुश्री रूपाली श्रीवास्‍तव"
                  designation="लेखाकार"
                  contact="+919532744231"
                />
                <DepartmentRow
                  name="जैन विद्या शोध संस्थान"
                  webAdmin="श्री अमित कुमार अग्निहोत्री"
                  designation="निदेशक"
                  contact="+919451989884"
                />
                <DepartmentRow
                  name="अंतरराष्ट्रीय बौद्ध शोध संस्थान"
                  webAdmin="श्री राकेश सिंह"
                  designation="निदेशक"
                  contact="+919415666477"
                />
                <DepartmentRow
                  name="बिरजू महाराज कथक संस्थान"
                  webAdmin="श्रीमती सरिता श्रीवास्तव"
                  designation="कोषाध्यक्ष"
                  contact="+919935041964"
                />
                <DepartmentRow
                  name="उत्तर प्रदेश लोक एवं जनजाति संस्कृति संस्थान"
                  webAdmin="श्री राजेश अहिरवार  "
                  designation="कोषाध्यक्ष"
                  contact="+919415068031"
                />
                <DepartmentRow
                  name="भातखंडे संस्कृति विश्वविद्यालय "
                  webAdmin="श्री राम कुमार"
                  designation="प्रशासनिक अधिकारी"
                  contact="+918299203585"
                />
                <DepartmentRow
                  name="संत कबीर अकादमी"
                  webAdmin="श्री आशुतोष द्विवेदी "
                  designation="कंसलटेंट (आउटसोर्सिंग)"
                  contact="+916388280542"
                />
                <DepartmentRow
                  name="वृंदावन शोध संस्थान"
                  webAdmin="श्री रजत शुक्ला"
                  designation="प्रशासनिक अधिकारी"
                  contact="+9199927461604"
                />
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto my-8"
          />
        </div>

        {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className="text-xl font-bold text-[#903603] mb-4 border-l-4 border-[#903603] pl-3">
            <TranslatableText text="संस्कृति विभाग उत्तर प्रदेश के कार्यालयों के संपर्क सूत्र" />
          </h2>
          
          <div className="space-y-4">
            <ContactCard
              title="कार्यक्रम अनुभाग"
              name=""
              email="cultureprogramme73@gmail.com"
            />
                        <ContactCard
              title="कार्यक्रम अनुभाग"
              name=""
              email="cultureprogramme73@gmail.com"
            />
          </div>
        </div> */}
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
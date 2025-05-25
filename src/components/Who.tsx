import React from 'react';
import { ChevronLeft, Mail, Phone } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import Footer from './Footer';

interface WhoProps {
  onClose: () => void;
}

interface OfficialProps {
  position: string;
  name: string;
  phone?: string;
  email?: string;
}

const Official: React.FC<OfficialProps> = ({ position, name, phone, email }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border-l-4 border border-[#903603]">
    <h3 className="text-[#903603] font-bold text-lg mb-1 font-['Inter']">
      <TranslatableText text={position} />
    </h3>
    <h4 className="text-[#5A1616] font-semibold mb-2 font-['Inter']">
      <TranslatableText text={name} />
    </h4>
    {(phone || email) && (
      <div className="space-y-1 mt-3">
        {phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm break-all">{email}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

const Who: React.FC<WhoProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-xl">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={() => {
              onClose();
              // Navigate back to AboutUs
              setTimeout(() => {
                const aboutUsButton = document.querySelector('[data-about-us]');
                if (aboutUsButton) {
                  (aboutUsButton as HTMLElement).click();
                }
              }, 100);
            }}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="कौन क्या है"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <Official 
          position="माननीय मंत्री संस्कृति एवं पर्यटन"
          name="श्री जयवीर सिंह"
          phone="0522-2239251"
          email="tourismminister.up@gmail.com"
        />
        
        <Official 
          position="प्रमुख सचिव"
          name="श्री मुकेश कुमार मेश्राम"
          phone="0522-2237191, 0522-2241754"
          email="psecup.culture@nic.in, pscultureup@gmail.com"
        />
        
        <Official 
          position="विशेष सचिव"
          name="श्री रवींद्र कुमार"
          phone="0522-2214602"
        />
        
        <Official 
          position="विशेष सचिव एवं निदेशक"
          name="श्री विशाल सिंह"
          phone="0522-2286672"
        />
        
        <Official 
          position="संयुक्त सचिव"
          name="श्रीमती उमा द्विवेदी"
        />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-[#5A1616]/10">
          <h3 className="text-[#903603] font-bold text-lg mb-1 font-['Inter'] border-l-4 border-[#903603] pl-3">
            <TranslatableText text="अनुभाग" />
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">0522-2214598 (एक्सटेंशन)</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Who;
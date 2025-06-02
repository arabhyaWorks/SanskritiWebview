import React from 'react';
import { ChevronLeft, UserCog, Calendar, History, CalendarCheck } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';
import { useNavigate } from 'react-router-dom';

const ArtistHome: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <UserCog className="w-6 h-6" />,
      title: "प्रोफ़ाइल अपडेट करें",
      description: "अपनी प्रोफ़ाइल जानकारी अपडेट करें",
      color: "bg-blue-500",
      onClick: () => navigate('/artist/profile')
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "कार्यक्रम अनुरोध",
      description: "नए कार्यक्रम के लिए अनुरोध करें",
      color: "bg-green-500",
      onClick: () => navigate('/artist/request-event')
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "पिछले कार्यक्रम",
      description: "अपने पिछले कार्यक्रमों को देखें",
      color: "bg-purple-500",
      onClick: () => navigate('/artist/past-events')
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "आगामी कार्यक्रम",
      description: "आने वाले कार्यक्रमों की जानकारी",
      color: "bg-orange-500",
      onClick: () => navigate('/artist/upcoming-events')
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
            onClick={() => navigate('/')}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="कलाकार डैशबोर्ड"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="grid gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-[#903603]/10 text-left flex items-center gap-4 group active:scale-[0.99]"
              >
                <div className={`${item.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#5A1616] mb-1 font-['Baloo_2']">
                    <TranslatableText text={item.title} />
                  </h3>
                  <p className="text-sm text-[#5A1616]/70">
                    <TranslatableText text={item.description} />
                  </p>
                </div>
              </button>
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

export default ArtistHome;
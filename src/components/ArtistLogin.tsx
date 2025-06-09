import React, { useState } from 'react';
import { ChevronLeft, Phone, ArrowRight } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import { loginArtist } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import abstract from '../assets/abstract.png';
import ArtistRegistration from './ArtistRegistration';
import backgroundImage from '../assets/VibhgaBG.avif';

interface ArtistLoginProps {
  onClose: () => void;
}

const ArtistLogin: React.FC<ArtistLoginProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [storedOtp, setStoredOtp] = useState('');

  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      setError('कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }

    try {
      const response = await loginArtist(mobile);
      if (response.status === 1) {
        localStorage.setItem('artistId', response.data.id);
        localStorage.setItem('artistMobile', response.data.mobile);
        setStoredOtp(response.data.mobile_otp);
        setIsOtpSent(true);
        setError('');
      } else {
        setError('कुछ गलत हो गया। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      setError('कुछ गलत हो गया। कृपया पुनः प्रयास करें।');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === storedOtp) {
      navigate('/artisthome');
    } else {
      setError('गलत OTP। कृपया पुनः प्रयास करें।');
    }
  };

  const [showRegistration, setShowRegistration] = useState(false);

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
            text="कलाकार लॉगिन"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto mt-8">
        <div className="bg-[#FFF8F0]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#903603]/10">
          <img
            src={abstract}
            alt="Welcome Design"
            className="w-32 mx-auto mb-6 opacity-90"
          />
          
          <div className="text-center mb-8">
            <h2 className="text-[#903603] text-xl font-bold font-['Baloo_2'] mb-2">
              <TranslatableText text="कलाकार पोर्टल में आपका स्वागत है" />
            </h2>
            <p className="text-[#5A1616]/80 text-sm">
              <TranslatableText text="अपनी कला को प्रदर्शित करने के लिए लॉगिन करें" />
            </p>
          </div>

          {!isOtpSent ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[#903603] font-bold text-lg font-['Baloo_2'] flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <TranslatableText text="मोबाइल नंबर" />
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#903603] font-medium">+91</span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-14 pr-4 py-4 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-lg font-['Inter'] tracking-wide"
                    placeholder="मोबाइल नंबर दर्ज करें"
                  />
                  <p className="mt-2 text-xs text-[#903603]/70 font-medium">
                    <TranslatableText text="* आपका मोबाइल नंबर आपकी पहचान का प्रमाण होगा" />
                  </p>
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 mt-8"
              >
                <TranslatableText text="OTP भेजें" />
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <TranslatableText 
                  text="एक कदम और..."
                  className="text-[#903603] font-bold text-lg font-['Baloo_2']"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[#903603] font-bold text-lg font-['Baloo_2']">
                  <TranslatableText text="OTP दर्ज करें" />
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-center text-3xl tracking-[0.5em] font-bold font-['Inter'] letter-spacing-wide"
                  placeholder="******"
                  maxLength={6}
                />
                <p className="text-sm text-[#903603]/70 text-center mt-3 font-medium flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <TranslatableText text={`OTP ${mobile} पर भेजा गया है`} />
                </p>
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 mt-8"
              >
                <TranslatableText text="सत्यापित करें" />
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-center text-sm text-[#903603]/70">
                <TranslatableText text="OTP नहीं मिला?" />
                {' '}
                <button 
                  onClick={handleSendOtp}
                  className="text-[#903603] font-medium hover:underline"
                >
                  <TranslatableText text="पुनः भेजें" />
                </button>
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm text-center font-medium animate-shake">
              {error}
            </div>
          )}
          
          <p className="mt-8 text-center text-xs text-[#903603]/60">
            <TranslatableText text="लॉगिन करके आप हमारी नियम और शर्तों से सहमत हैं" />
          </p>
          
          <div className="mt-12 pt-8 border-t border-[#903603]/10">
            <div className="text-center space-y-2">
              <h3 className="text-[#903603] font-bold font-['Baloo_2']">
                <TranslatableText text="तकनीकी सहायता के लिए संपर्क करें" />
              </h3>
              <p className="text-[#5A1616]/70 text-sm">
                <TranslatableText text="सोमवार से शनिवार (10:00 AM - 6:00 PM)" />
              </p>
              <div className="flex items-center justify-center gap-2 text-[#903603] font-medium">
                <Phone className="w-4 h-4" />
                <span>1800-XXX-XXXX</span>
              </div>
              <p className="text-[#5A1616]/70 text-xs">
                <TranslatableText text="टोल फ्री नंबर" />
              </p>
            </div>
          </div>
        </div>
      </div>
      {showRegistration && (
        <ArtistRegistration onClose={() => setShowRegistration(false)} />
      )}
    </div>
  );
};

export default ArtistLogin;
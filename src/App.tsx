import React from 'react';
import { useState } from 'react';
import bgImg from './assets/bgImg.png';
import Header from './components/Header';
import OrgStructure from './components/OrgStructure';
import Banner from './components/Banner';
import CultureSection from './components/CultureSection';
import IconsSection from './components/IconsSection';
import VideoSection from './components/VideoSection';
import PanjikaranSection from './components/PanjikaranSection';
import KaryakalapSection from './components/KaryakalapSection';
import Others from './components/Others';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Who from './components/Who';

function App() {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showOrgStructure, setShowOrgStructure] = useState(false);
  const [showWho, setShowWho] = useState(false);

  return (
    <LanguageProvider>
      <div 
        className="min-h-screen w-full sm:hidden relative"
        style={{
          WebkitTouchCallout: 'none',
          userSelect: 'none'
        }}
      >
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            background: `url(${bgImg}) center/cover no-repeat`,
            backgroundAttachment: 'fixed',
            zIndex: -1
          }}
        />
        <div className="relative flex flex-col">
          <Header />
          <Banner />
          <CultureSection />
          <IconsSection onAboutUsClick={() => setShowAboutUs(true)} />
          <PanjikaranSection />
          <Others />
          <KaryakalapSection />
          <VideoSection />
          <Footer />
          {showAboutUs && (
            <AboutUs 
              onClose={() => setShowAboutUs(false)}
              onContactClick={() => {
                setShowAboutUs(false);
                setShowContact(true);
              }}
              onOrgStructureClick={() => {
                setShowAboutUs(false);
                setShowOrgStructure(true);
              }}
              onWhoClick={() => {
                setShowAboutUs(false);
                setShowWho(true);
              }}
            />
          )}
          {showContact && (
            <Contact onClose={() => setShowContact(false)} />
          )}
          {showOrgStructure && (
            <OrgStructure onClose={() => setShowOrgStructure(false)} />
          )}
          {showWho && (
            <Who onClose={() => setShowWho(false)} />
          )}
        </div>
        <div className="hidden sm:block fixed inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-lg">This experience is designed for mobile devices only</p>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
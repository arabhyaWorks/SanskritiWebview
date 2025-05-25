import bgImg from './assets/bgImg.png';
import Header from './components/Header';
import Banner from './components/Banner';
import CultureSection from './components/CultureSection';
import IconsSection from './components/IconsSection';
import VideoSection from './components/VideoSection';
import PanjikaranSection from './components/PanjikaranSection';
import KaryakalapSection from './components/KaryakalapSection';
import Others from './components/Others';
import Footer from './components/Footer';

function App() {
  return (
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
        <IconsSection />
        <PanjikaranSection />
        <Others />
        <KaryakalapSection />
                <VideoSection />
        <Footer />
      </div>
      <div className="hidden sm:block fixed inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">This experience is designed for mobile devices only</p>
      </div>
    </div>
  );
}

export default App;
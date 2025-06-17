import React from "react";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import bgImg from "./assets/bgImg.png";
import Header from "./components/Header";
import ArtistHome from "./components/ArtistHome";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail";
import BottomNav from "./components/BottomNav";
import Department from "./components/Department";
import OrgStructure from "./components/OrgStructure";
import Banner from "./components/Banner";
import CultureSection from "./components/CultureSection";
import IconsSection from "./components/IconsSection";
import VideoSection from "./components/VideoSection";
import PanjikaranSection from "./components/PanjikaranSection";
import KaryakalapSection from "./components/KaryakalapSection";
import Others from "./components/Others";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Who from "./components/Who";
import Artists from "./components/artists";

import ArtistLogin from "./components/ArtistLogin";
import ArtistRegistration from "./components/ArtistRegistration";

import ContestRegister from "./Pages/contestRegister";
import ContestLogin from './Pages/contestLogin';
import ContestDashboard from './Pages/contestDashboard';
import ContestProfile from './Pages/contestProfile';

import RestASRPage from "./components/chatbot/index";

function App() {
  const navigate = useNavigate();

  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showOrgStructure, setShowOrgStructure] = useState(false);
  const [showWho, setShowWho] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showArtists, setShowArtists] = useState(false);

  const HomePage = () => {
    return (
      <div className="min-h-screen w-full relative">
        <div
          className="min-h-screen w-full sm:hidden relative"
          style={{
            WebkitTouchCallout: "none",
            userSelect: "none",
          }}
        >
          <div
            className="fixed inset-0 w-full h-full"
            style={{
              background: `url(${bgImg}) center/cover no-repeat`,
              backgroundAttachment: "fixed",
              zIndex: -1,
            }}
          />
          <div className="relative flex flex-col pb-32">
            <Header />
            <Banner />
            <CultureSection />
            <IconsSection
              onAboutUsClick={() => navigate("/about-us")}
              onDepartmentClick={() => navigate("/department")}
              onProfileClick={() => navigate("/artist")}
              onEventsClick={() => navigate("/events")}
            />
            <PanjikaranSection />
            <Others />
            <KaryakalapSection />
            <VideoSection />
            <Footer />
            <BottomNav />
            {showAboutUs && (
              <AboutUs
                onClose={() => setShowAboutUs(false)}
                onContactClick={() => {
                  //setShowAboutUs(false);
                  setShowContact(true);
                }}
                onOrgStructureClick={() => {
                  //setShowAboutUs(false);
                  setShowOrgStructure(true);
                }}
                onWhoClick={() => {
                  //setShowAboutUs(false);
                  setShowWho(true);
                }}
              />
            )}
            {showContact && <Contact onClose={() => setShowContact(false)} />}
            {showOrgStructure && (
              <OrgStructure onClose={() => setShowOrgStructure(false)} />
            )}
            {showWho && <Who onClose={() => setShowWho(false)} />}
            {showDepartment && (
              <Department onClose={() => setShowDepartment(false)} />
            )}
            {showEvents && <Events onClose={() => setShowEvents(false)} />}
            {showArtists && <Artists onClose={() => setShowArtists(false)} />}
          </div>
        </div>
        <div className="flex items-center justify-center hidden sm:flex min-h-screen w-full  bg-gray-100">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-lg text-center">
              This experience is designed for mobile devices only
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <LanguageProvider>
      <Routes>
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy onClose={() => navigate("/")} />}
        />

        <Route
          path="/about-us"
          element={
            <AboutUs
              onClose={() => navigate("/")}
              onContactClick={() => navigate("/contact")}
              onOrgStructureClick={() => navigate("/org-structure")}
              onWhoClick={() => navigate("/who")}
            />
          }
        />
        <Route
          path="/contact"
          element={<Contact onClose={() => navigate("/")} />}
        />
        <Route
          path="/org-structure"
          element={<OrgStructure onClose={() => navigate("/")} />}
        />
        <Route path="/who" element={<Who onClose={() => navigate("/")} />} />
        <Route
          path="/department"
          element={<Department onClose={() => navigate("/")} />}
        />
        <Route
          path="/events"
          element={<Events onClose={() => navigate("/")} />}
        />
        <Route
          path="/events/:eventId"
          element={<EventDetail onClose={() => navigate("/")} />}
        />
        <Route
          path="/artist"
          element={<ArtistHome  />}
        />

        <Route
          path="/artist-login"
          element={<ArtistLogin onClose={() => navigate("/")} />}
        />
        <Route
          path="/profile"
          element={<ArtistRegistration  />}
        />
        <Route
          path="/contest/register"
          element={<ContestRegister  />}
        />

        <Route
          path="/contest/login"
          element={<ContestLogin  />}
        />
        <Route
          path="/contest/dashboard"
          element={<ContestDashboard  />}
        />
        <Route
          path="/contest/profile"
          element={<ContestProfile  />}
        />
        <Route
          path="/chatbot"
          element={<RestASRPage  />}
        />



         {/* <Route path="/artisthome" element={<ArtistHome />} /> */}

        <Route path="/" element={<HomePage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;

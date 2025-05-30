import React from 'react';
import { ChevronLeft, Calendar, MapPin, Users } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import BottomNav from './BottomNav';
import backgroundImage from '../assets/VibhgaBG.avif';

interface EventDetailsProps {
  onClose: () => void;
  event: {
    date: string;
    name: string;
    organizer: string;
    venue: string;
    image: string;
    description?: string;
    time?: string;
    contact?: string;
    registrationLink?: string;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ onClose, event }) => {
  return (
    <>
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
              text="कार्यक्रम विवरण"
              className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
              as="h1"
            />
          </div>
        </div>

        <div className="p-4 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#5A1616]/10">
            <div className="w-full aspect-video">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm text-[#903603] bg-[#903603]/5 w-fit px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
                {event.time && <span>• {event.time}</span>}
              </div>

              <h2 className="text-2xl font-bold text-[#5A1616] font-['Baloo_2']">
                {event.name}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[#5A1616]">
                  <Users className="w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">आयोजक</p>
                    <p className="text-sm">{event.organizer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#5A1616]">
                  <MapPin className="w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">स्थान</p>
                    <p className="text-sm">{event.venue}</p>
                  </div>
                </div>

                {event.description && (
                  <div className="pt-4 border-t border-[#903603]/10">
                    <h3 className="text-lg font-bold text-[#903603] mb-2">विवरण</h3>
                    <p className="text-[#5A1616] text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}

                {event.contact && (
                  <div className="pt-4 border-t border-[#903603]/10">
                    <h3 className="text-lg font-bold text-[#903603] mb-2">संपर्क</h3>
                    <p className="text-[#5A1616] text-sm">{event.contact}</p>
                  </div>
                )}

                {event.registrationLink && (
                  <div className="pt-4">
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#903603] text-white text-center py-3 rounded-lg font-medium hover:bg-[#5A1616] transition-colors"
                    >
                      पंजीकरण करें
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Footer />
        </div>
      </div>
      <BottomNav 
        activeTab="events"
        onHomeClick={onClose}
        onEventsClick={() => {}}
      />
    </>
  );
};

export default EventDetails;
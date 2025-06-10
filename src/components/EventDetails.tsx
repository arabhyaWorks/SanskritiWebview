import React, { useEffect, useState } from 'react';
import { ChevronLeft, Calendar, MapPin, Users } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import eventimage from '../assets/event.png';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import BottomNav from './BottomNav';
import backgroundImage from '../assets/VibhgaBG.avif';
import { fetchEventDetails } from '../lib/api';

interface EventDetailsProps {
  eventId: string;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ onClose, eventId }) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetchEventDetails(eventId);
        if (res && res.status === 1) setEvent(res.data);
      } catch (error) {
        console.error('Failed to load event detail', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [eventId]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <p className="text-center p-10">लोड हो रहा है...</p>;
  if (!event) return <p className="text-center p-10">कोई जानकारी उपलब्ध नहीं है।</p>;

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
                src={eventimage}
                alt={event.event_title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm text-[#903603] bg-[#903603]/5 w-fit px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.start_date_time)}</span>
                <span>• {formatTime(event.start_date_time)}</span>
              </div>

              <h2 className="text-2xl font-bold text-[#5A1616] font-['Baloo_2']">
                {event.event_title}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[#5A1616]">
                  <Users className="w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">आयोजक</p>
                    <p className="text-sm">विभाग कोड: {event.organizing_dept_id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#5A1616]">
                  <MapPin className="w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">स्थान</p>
                    <p className="text-sm">{event.events_venue || 'उल्लेख नहीं किया गया'}</p>
                  </div>
                </div>

                {event.description && (
                  <div className="pt-4 border-t border-[#903603]/10">
                    <h3 className="text-lg font-bold text-[#903603] mb-2">विवरण</h3>
                    <p className="text-[#5A1616] text-sm leading-relaxed">{event.description}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#903603]/10">
                  <h3 className="text-lg font-bold text-[#903603] mb-2">संस्था और पता</h3>
                  <p className="text-[#5A1616] text-sm">{event.opportunity_to_organise_event}</p>
                  <p className="text-[#5A1616] text-sm">{event.event_city || 'उल्लेख नहीं किया गया'}</p>
                </div>

                <div className="pt-4 border-t border-[#903603]/10">
                  <h3 className="text-lg font-bold text-[#903603] mb-2">संपर्क</h3>
                  <p className="text-[#5A1616] text-sm">फोन: 1234567890</p>
                  <p className="text-[#5A1616] text-sm">ईमेल: example@email.com</p>
                </div>

                <div className="pt-4">
                  <button className="block w-full bg-[#903603] text-white text-center py-3 rounded-lg font-medium hover:bg-[#5A1616] transition-colors">
                    पंजीकरण करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Footer />
        </div>
      </div>

      <BottomNav
      />
    </>
  );
};

export default EventDetails;
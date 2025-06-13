import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';4
import eventimage from '../assets/event.png';
import Footer from './Footer';
import BottomNav from './BottomNav';
import backgroundImage from '../assets/VibhgaBG.avif';
import EventDetails from './EventDetails';
import { fetchEventList } from '../lib/api';

interface EventType {
  id: string;
  date: string;
  name: string;
  organizer: string;
  venue: string;
  image: string;
  description: string;
  time: string;
  contact: string;
  registrationLink: string;
  startDateObj: Date; 
}

interface EventsProps {
  onClose: () => void;
}

const Events: React.FC<EventsProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"
  ];

  const weekDays = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

  // Fetch events from API
  useEffect(() => {
  async function loadEvents() {
    try {
      const response = await fetchEventList();
      if (response && response.status === 1 && Array.isArray(response.data)) {
        const transformedEvents: EventType[] = response.data.map((event: any) => {
          const startDateObj  = new Date(event.start_date_time);

          return {
            id: String(event.id),
            name: event.event_title || '',
            date: startDateObj .toLocaleDateString('hi-IN'),
            organizer: event.opportunity_to_organise_event || '',
            venue: event.events_venue || 'स्थान निर्दिष्ट नहीं',
            image: eventimage,
            description: event.purpose_of_event || '',
            time: startDateObj .toLocaleTimeString('hi-IN', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            contact: '',
            registrationLink: '',
            startDateObj,
          };
        });
        setEvents(transformedEvents);
      } else {
        console.warn('Unexpected events data format', response);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  }

  loadEvents();
}, []);


  // Filter events for the current month
  const filteredEvents = events.filter(
  (event: any) =>
    event.startDateObj.getMonth() === currentMonth &&
    event.startDateObj.getFullYear() === currentYear
);

  const renderCalendar = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${day.toString().padStart(2, '0')}/${(currentMonth + 1).toString().padStart(2, '0')}/${currentYear}`;
      const hasEvent = filteredEvents.some(event => event.date === dateStr);
      
      days.push(
        <button 
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`h-8 w-8 mx-auto flex items-center justify-center relative rounded-full transition-colors ${
            hasEvent ? 'font-bold text-[#903603]' : 'text-[#5A1616]'
          } ${selectedDate === dateStr ? 'bg-[#903603] text-white' : ''}
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#903603]" />
          )}
        </button>
      );
    }
    return days;
  };
  
  const handlePrevMonth = () => {
    setSelectedDate(null); // reset
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };
  
  const handleNextMonth = () => {
    setSelectedDate(null); // reset
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

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
        
        <div className="p-4 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={onClose}
                className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
              >
                <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
              </button>
              <h1 className="text-[#5A1616] text-2xl font-bold font-['Inter']">
                <TranslatableText text="सांस्कृतिक कार्यक्रम" />
              </h1>
            </div>

            <img
              src={abstract}
              alt="Abstract Design"
              className="w-32 mx-auto mb-6"
            />
            
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-[#903603]" />
              </button>
              <h2 className="text-xl font-bold text-[#903603] font-['Baloo_2']">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-[#903603]" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm text-[#903603]/70 font-medium font-['Baloo_2']">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mb-8">
              {renderCalendar()}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#903603] font-['Baloo_2'] border-l-4 border-[#903603] pl-3">
                आगामी कार्यक्रम
              </h3>

              {loading && (
                <p className="text-center text-[#903603]/70">कार्यक्रम लोड हो रहे हैं...</p>
              )}

              {!loading && events.length === 0 && (
                <p className="text-center text-[#903603]/70">कोई कार्यक्रम उपलब्ध नहीं है।</p>
              )}
              
              {!loading && filteredEvents
                .filter(event => {
                  if (!selectedDate) return true;
                  const [day, month, year] = selectedDate.split('/').map(Number);
                  const selectedDateObj = new Date(year, month - 1, day);
                  return (
                    event.startDateObj.getDate() === selectedDateObj.getDate() &&
                    event.startDateObj.getMonth() === selectedDateObj.getMonth() &&
                    event.startDateObj.getFullYear() === selectedDateObj.getFullYear()
                  );
                })
                .map((event, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-[#903603]/5 rounded-xl p-4 hover:bg-[#903603]/10 transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#903603] bg-white/50 w-fit px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <h4 className="font-bold text-xl text-[#5A1616] font-['Baloo_2']">
                      {event.name}
                    </h4>
                    <div className="space-y-1 text-[#5A1616]/80">
                      <p className="text-sm">
                        <span className="font-medium">आयोजक:</span> {event.organizer}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">स्थान:</span> {event.venue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && filteredEvents.filter(event => selectedDate ? event.date === selectedDate : true).length === 0 && (
  <p className="text-center text-[#903603]/70">इस तारीख के लिए कोई कार्यक्रम उपलब्ध नहीं है।</p>
)}

            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Footer />
        </div>
      </div>

      <BottomNav 
        
      />

      {selectedEvent && (
        <EventDetails
          eventId={selectedEvent.id}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
};

export default Events;
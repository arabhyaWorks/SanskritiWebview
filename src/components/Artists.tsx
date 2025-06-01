import React, { useState } from 'react';
import { ChevronLeft, Search, Filter, MapPin, UserPlus } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import BottomNav from './BottomNav';
import backgroundImage from '../assets/VibhgaBG.avif';
import ArtistLogin from './ArtistLogin';

interface FilterOption {
  label: string;
  value: string;
}

interface ArtistsProps {
  onClose: () => void;
}

const Artists: React.FC<ArtistsProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedArtForm, setSelectedArtForm] = useState<string>('');
  const [selectedSubArtForm, setSelectedSubArtForm] = useState<string>('');

  const grades = [
    { label: 'A उच्च ग्रेड', value: 'a_high' },
    { label: 'A ग्रेड', value: 'a' },
    { label: 'B+ ग्रेड', value: 'b_plus' },
    { label: 'B ग्रेड', value: 'b' },
    { label: 'अल्प ग्रेड', value: 'low' },
    { label: 'कोई ग्रेड नहीं', value: 'none' }
  ];

  const districts = [
    'आगरा', 'अलीगढ़', 'प्रयागराज', 'अम्बेडकर नगर', 'अमेठी', 'अमरोहा',
    'औरैया', 'आजमगढ़', 'बागपत', 'बहराइच', 'बलिया', 'बलरामपुर', 'बाँदा',
    'बाराबंकी', 'बरेली', 'बस्ती', 'बिजनौर', 'बदायूँ', 'बुलंदशहर', 'चंदौली',
    'चित्रकूट', 'देवरिया', 'एटा', 'एटावा', 'फैजाबाद', 'फर्रुखाबाद', 'फतेहपुर',
    'फिरोजाबाद', 'गौतम बुद्ध नगर', 'गाजियाबाद', 'गाजीपुर', 'गोंडा', 'गोरखपुर',
    'हमीरपुर', 'हापुड़', 'हरदोई', 'हाथरस', 'जालौन', 'जौनपुर', 'झाँसी',
    'ज्योतिबा फुले नगर', 'कन्नौज', 'कानपुर देहात', 'कानपुर नगर', 'कासगंज',
    'कौशाम्बी', 'कुशीनगर', 'लखीमपुर खीरी', 'ललितपुर', 'लखनऊ', 'महाराजगंज',
    'महोबा', 'मैनपुरी', 'मथुरा', 'मऊ', 'मेरठ', 'मिर्जापुर', 'मुरादाबाद',
    'मुजफ्फरनगर', 'पीलीभीत', 'प्रतापगढ़', 'रायबरेली', 'रामपुर', 'सहारनपुर',
    'संत कबीर नगर', 'भदोही', 'शाहजहाँपुर', 'श्रावस्ती', 'सिद्धार्थनगर',
    'सीतापुर', 'सोनभद्र', 'सुल्तानपुर', 'उन्नाव', 'वाराणसी'
  ];

  const artForms = {
    'गायन': [
      'शास्त्रीय/उपशास्त्रीय गायन',
      'शास्त्रीय गायन',
      'उपशास्त्रीय गायन',
      'लोक गायन',
      'गजल/भजन',
      'कव्वाली/सूफी गायन',
      'सुगम संगीत'
    ],
    'वादन': [
      'तबला', 'तार वाला वाद्य', 'मृदंगम', 'घटम', 'सारंगी', 'सितार',
      'सरोद', 'इसराज/क्लारनेट', 'वीणा', 'डफली', 'नगाड़ा', 'दुक्कड़',
      'मादल', 'ढोल-ताशा', 'ढोलक', 'नाल', 'चिमटा', 'हुड़का', 'सिंघा',
      'संतूर', 'गिटार', 'बांसुरी', 'शहनाई', 'पखावज/ढोलक/नाल', 'पखावज',
      'वायलिन', 'शंख', 'खधड़ी', 'हारमोनियम', 'तानपुरा'
    ],
    'नृत्य': [
      'शास्त्रीय नृत्य',
      'लोकनृत्य'
    ],
    'ललित कला': [
      'मूर्तिकला',
      'चित्रकला',
      'ग्राफिक कला',
      'व्यावहारिक कला'
    ],
    'नाट्य कला': [
      'नौटंकी',
      'रामलीला',
      'रंग मंच(नाट्यकर्मी/नाट्य समूह)',
      'रासलीला',
      'स्वाँग',
      'भगत',
      'बेहरूपिया',
      'कठपुतली',
      'जादू'
    ]
  };

  const getSubArtForms = (artForm: string) => {
    return artForms[artForm as keyof typeof artForms] || [];
  };

  const artists = [
    {
      name: 'राम कुमार शर्मा',
      category: 'वादन',
      specialization: 'तबला वादक',
      location: 'लखनऊ, उत्तर प्रदेश',
      image: 'https://images.pexels.com/photos/7520935/pexels-photo-7520935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      contact: {
        phone: '+91 9876543210',
        email: 'ram.sharma@example.com'
      }
    },
    {
      name: 'सीमा वर्मा',
      category: 'नृत्य',
      specialization: 'कथक नृत्यांगना',
      location: 'वाराणसी, उत्तर प्रदेश',
      image: 'https://images.pexels.com/photos/8467978/pexels-photo-8467978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      contact: {
        phone: '+91 9876543211',
        email: 'seema.verma@example.com'
      }
    },
    // Add more artists as needed
  ];

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArtForm = !selectedArtForm || artist.category === selectedArtForm;
    return matchesSearch && matchesArtForm;
  });

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
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex items-center gap-2">
              <TranslatableText
                text="कलाकार"
                className="text-[#5A1616] text-2xl font-bold font-['Inter']"
                as="h1"
              />
            </div>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-[#903603] text-white px-4 py-2 rounded-lg hover:bg-[#5A1616] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <TranslatableText text="कलाकार पंजीकरण" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#903603]" />
                <input
                  type="text"
                  placeholder="कलाकार खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2.5 bg-[#903603] text-white rounded-xl hover:bg-[#5A1616] transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {showFilters && (
              <div className="space-y-4 bg-white/50 p-4 rounded-xl border border-[#903603]/10">
                <div className="space-y-2">
                  <label className="text-sm text-[#5A1616] font-bold">
                    आकाशवाणी/दूरदर्शन का ग्रेड
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#903603]/20 bg-white"
                  >
                    <option value="">चयन करें</option>
                    {grades.map(grade => (
                      <option key={grade.value} value={grade.value}>
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#5A1616] font-bold">
                    जनपद
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#903603]/20 bg-white"
                  >
                    <option value="">चयन करें</option>
                    {districts.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#5A1616] font-bold">
                    विधा का नाम
                  </label>
                  <select
                    value={selectedArtForm}
                    onChange={(e) => {
                      setSelectedArtForm(e.target.value);
                      setSelectedSubArtForm('');
                    }}
                    className="w-full p-2.5 rounded-lg border border-[#903603]/20 bg-white"
                  >
                    <option value="">चयन करें</option>
                    {Object.keys(artForms).map(artForm => (
                      <option key={artForm} value={artForm}>
                        {artForm}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedArtForm && (
                  <div className="space-y-2">
                    <label className="text-sm text-[#5A1616] font-bold">
                      विधा का क्षेत्र
                    </label>
                    <select
                      value={selectedSubArtForm}
                      onChange={(e) => setSelectedSubArtForm(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#903603]/20 bg-white"
                    >
                      <option value="">चयन करें</option>
                      {getSubArtForms(selectedArtForm).map(subArtForm => (
                        <option key={subArtForm} value={subArtForm}>
                          {subArtForm}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {filteredArtists.map((artist, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-3 shadow hover:shadow-md transition-all border border-[#903603]/10 flex items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#903603]/20">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-[#5A1616] mb-1">
                      {artist.name}
                    </h3>
                    <p className="text-[#903603] font-medium mb-2">
                      {artist.specialization}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#5A1616]/80">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-24">
        <Footer />
      </div>
      <BottomNav 
        activeTab="profile"
        onHomeClick={onClose}
        onEventsClick={() => {}}
      />
      {showLogin && (
        <ArtistLogin onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Artists;
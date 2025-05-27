import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, Search, SlidersHorizontal, Download, Eye, Play } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';
import ReactPlayer from 'react-player';

interface GalleryProps {
  onClose: () => void;
}

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

interface VideoCardProps {
  item: any;
  playingVideo: string | null;
  setPlayingVideo: React.Dispatch<React.SetStateAction<string | null>>;
}

const VideoCard: React.FC<VideoCardProps> = ({ item, playingVideo, setPlayingVideo }) => {
  const videoId = getYouTubeVideoId(item.videoUrl);
  const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : '';

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
      <div className="relative aspect-video">
        {playingVideo === item.videoUrl ? (
          <ReactPlayer
            url={item.videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            className="rounded-t-lg"
          />
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setPlayingVideo(item.videoUrl)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
            >
              <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[#8B4513] font-['Baloo_2'] font-bold text-lg mb-3">
          <TranslatableText text={item.title} />
        </h3>
        <a
          href={item.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B4513] text-white rounded-full hover:bg-[#5A1616] transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>वीडियो देखें</span>
        </a>
      </div>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('brochure');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const content = {
    brochure: [
      {
        title: 'राज्य संग्रहालय लखनऊ, उत्तर प्रदेश',
        image: 'https://upculture.up.nic.in/sites/default/files/2023-04/state%20museum%20hindi.png',
        pdfUrl: 'https://upculture.up.nic.in/sites/default/files/2023-04/state%20museum%20Hindi.PDF',
        size: '24.8 एमबी',
        format: 'पीडीएफ',
        language: 'हिन्दी'
      }
    ],
    images: [
      {
        title: 'काकोरी ट्रेन एक्शन दिवस वीरों को नमन कार्यक्रम 9 अगस्त 2023',
        image: 'https://upculture.up.nic.in/sites/default/files/2023-08/kakori1.jpeg',
        type: 'image'
      }
    ],
    essay: [
      {
        title: 'चोरी-चौरा शताब्दी समारोह आज़ादी का अमृत मोहत्सव के अन्तर्गत आयोजित ऑनलाइन कार्यक्रम "लोक रंग"',
        videoUrl: 'https://youtu.be/hajC5O9bANA?si=9t7a8TGZ-tQVC0Sw',
        type: 'video'
      }
    ],
    other: [
      {
        title: 'पद्म विभूषण गिरजा देवी - अर्ध शास्त्रीय गायन',
        audioUrl: 'https://www.youtube.com/watch?v=v7uuA-Q4LJU',
        type: 'audio'
      }
    ],
    publication: [
      {
        title: 'अयोध्या शोध संस्थान',
        image: 'https://upculture.up.nic.in/sites/default/files/inline-images/AYODHYA%20SHODH%20SANTHAN%20LOGO.jpg',
        url: 'https://upculture.up.nic.in/hi/Ayodhya-Shodh-Sansthan',
        type: 'link'
      }
    ],
    news: [
      {
        title: 'रंगमण्डल के लिए कलाकारों की आवश्यकता हेतु आवेदन पत्र',
        image: 'https://upculture.up.nic.in/sites/default/files/2023-07/BNA.jpeg',
        pdfUrl: 'https://upculture.up.nic.in/sites/default/files/2023-07/BNA_RC.pdf',
        type: 'news'
      }
    ],
    invitation: [
      {
        title: 'एक भारत श्रेष्ठ भारत योजनान्तर्गत सिक्किम एवं उत्तर प्रदेश के मध्य समझौता ज्ञापन कार्यक्रम',
        image: 'https://upculture.up.nic.in/sites/default/files/2023-07/up%20sikkim%20mou.jpeg',
        type: 'invitation'
      }
    ]
  };

  const tabs = [
    { id: 'brochure', label: 'ब्रोशर', icon: '📄' },
    { id: 'images', label: 'छवियाँ', icon: '📷' },
    { id: 'essay', label: 'दृश्य', icon: '🎥' },
    { id: 'other', label: 'अन्य', icon: '📂' },
    { id: 'publication', label: 'प्रकाशन', icon: '📖' },
    { id: 'news', label: 'समाचार', icon: '📰' },
    { id: 'invitation', label: 'निमंत्रण', icon: '✉️' }
  ];

  const galleries = [
    {
      title: 'राज्य संग्रहालय लखनऊ, उत्तर प्रदेश',
      image: 'https://upculture.up.nic.in/sites/default/files/2023-05/state%20museum%20lucknow%20hindi.jpg',
      size: '24.8 एमबी',
      format: 'पीडीएफ',
      language: 'हिन्दी',
      tags: ['museum', 'lucknow', 'hindi']
    },
    {
      title: 'राज्य संग्रहालय लखनऊ, उत्तर प्रदेश',
      image: 'https://upculture.up.nic.in/sites/default/files/2023-05/state%20museum%20lucknow%20english.jpg',
      size: '24.8 एमबी',
      format: 'पीडीएफ',
      language: 'इंग्लिश',
      tags: ['museum', 'lucknow', 'english']
    },
    {
      title: 'राजकीय बौद्ध संग्रहालय, गोरखपुर',
      image: 'https://upculture.up.nic.in/sites/default/files/2023-05/government%20buddha%20museum%20gorakhpur.jpg',
      size: '2.3 एमबी',
      format: 'पीडीएफ',
      language: 'इंग्लिश',
      tags: ['buddha', 'gorakhpur', 'english']
    },
    {
      title: 'राजकीय बौद्ध संग्रहालय, गोरखपुर',
      image: 'https://upculture.up.nic.in/sites/default/files/2023-05/rajkiya%20baudh%20sangrahalay%20gorakhpur.jpg',
      size: '3.7 एमबी',
      format: 'पीडीएफ',
      language: 'हिन्दी',
      tags: ['buddha', 'gorakhpur', 'hindi']
    }
  ];

  const filters = [
    { id: 'all', label: 'सभी' },
    { id: 'hindi', label: 'हिंदी' },
    { id: 'english', label: 'English' },
    { id: 'museum', label: 'संग्रहालय' },
    { id: 'buddha', label: 'बौद्ध' }
  ];

  const filteredGalleries = galleries.filter(item =>
    (selectedFilter === 'all' || item.tags.includes(selectedFilter)) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.tags.some(tag => tag.includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="fixed inset-0 bg-[#F5E6D3] z-50 overflow-y-auto">
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
            text="दीर्घा"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-[#FBF7F2]/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-32 mx-auto mb-6 opacity-50"
          />
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
            <input
              type="text"
              placeholder="खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/70 border-2 border-[#8B4513]/20 focus:border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 transition-colors text-[#8B4513] placeholder-[#8B4513]/60"
            />
          </div>

          <div className="flex overflow-x-auto gap-2 mb-3 pb-1 hide-scrollbar">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-[#8B4513] text-white font-medium'
                    : 'bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20'
                }`}
              >
                <TranslatableText text={filter.label} />
              </button>
            ))}
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 mb-6 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#8B4513] text-white shadow-lg font-medium'
                    : 'bg-white/70 text-[#8B4513] hover:bg-white'
                }`}
              >
                <span>{tab.icon}</span>
                <TranslatableText text={tab.label} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {content[activeTab as keyof typeof content].map((item, index) => {
              if (item.type === 'video') {
                return (
                  <VideoCard
                    key={index}
                    item={item}
                    playingVideo={playingVideo}
                    setPlayingVideo={setPlayingVideo}
                  />
                );
              }

              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow hover:shadow-lg transition-all group"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-video object-cover rounded-lg shadow-sm mb-4"
                    />
                  )}
                  <div className="space-y-3">
                    <h3 className="text-[#8B4513] font-['Baloo_2'] font-bold text-lg leading-tight">
                      <TranslatableText text={item.title} />
                    </h3>

                    {item.type === 'audio' && (
                      <a
                        href={item.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B4513] text-white rounded-full hover:bg-[#5A1616] transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>ऑडियो सुनें</span>
                      </a>
                    )}

                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B4513] text-white rounded-full hover:bg-[#5A1616] transition-colors text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>डाउनलोड करें</span>
                      </a>
                    )}

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B4513] text-white rounded-full hover:bg-[#5A1616] transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>विवरण देखें</span>
                      </a>
                    )}

                    {(item.size || item.format || item.language) && (
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        {item.size && (
                          <span className="px-2 py-1 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-xs">
                            {item.size}
                          </span>
                        )}
                        {item.format && (
                          <span className="px-2 py-1 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-xs">
                            {item.format}
                          </span>
                        )}
                        {item.language && (
                          <span className="px-2 py-1 rounded-full bg-[#8B4513]/10 text-[#8B4513] text-xs">
                            {item.language}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {content[activeTab as keyof typeof content].length === 0 && (
            <div className="text-center py-8 text-[#8B4513]/60">
              <TranslatableText text="इस श्रेणी में कोई सामग्री उपलब्ध नहीं है" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Gallery;
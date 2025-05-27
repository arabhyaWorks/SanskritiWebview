import React, { useState } from 'react';
import { ChevronLeft, Download, ExternalLink, Maximize2, X } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface AdoptHeritageProps {
  onClose: () => void;
}

const AdoptHeritage: React.FC<AdoptHeritageProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = {
    english: 'https://upculture.up.nic.in/sites/default/files/inline-images/adopt%20a%20heritage%20english.jpg',
    hindi: 'https://upculture.up.nic.in/sites/default/files/inline-images/adopt%20a%20heritage%20hindi%20.jpg'
  };

  const documents = {
    english: 'https://upculture.up.nic.in/sites/default/files/documents/Guidelines%20for%20EOI%20-%20eng.pdf',
    hindi: 'https://upculture.up.nic.in/sites/default/files/documents/Guidelines%20for%20EOI%20-%20Hindi.pdf'
  };

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
            text="अडॉप्ट ए हेरिटेज योजना"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-[#FFF8F0] backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="space-y-6">
            <div className="bg-white/80 rounded-xl p-6 shadow-md border border-[#903603]/10">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="योजना विवरण" />
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Hindi Version */}
                <div className="relative group">
                  <img 
                    src={images.hindi}
                    alt="Adopt A Heritage Hindi"
                    className="w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedImage(images.hindi)}
                  />
                  <button
                    onClick={() => setSelectedImage(images.hindi)}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* English Version */}
                <div className="relative group">
                  <img 
                    src={images.english}
                    alt="Adopt A Heritage English"
                    className="w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedImage(images.english)}
                  />
                  <button
                    onClick={() => setSelectedImage(images.english)}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-xl p-6 shadow-md border border-[#903603]/10">
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                <TranslatableText text="विस्तृत दिशा-निर्देश" />
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <a
                  href={documents.hindi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#903603]/5 rounded-lg hover:bg-[#903603]/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#903603]" />
                    <span className="font-medium text-[#903603]">
                      <TranslatableText text="हिंदी में दिशा-निर्देश" />
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#903603] opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href={documents.english}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#903603]/5 rounded-lg hover:bg-[#903603]/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#903603]" />
                    <span className="font-medium text-[#903603]">
                      <TranslatableText text="Guidelines in English" />
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#903603] opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default AdoptHeritage;
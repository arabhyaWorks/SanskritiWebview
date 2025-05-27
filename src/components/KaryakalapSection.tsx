import React from 'react';
import { TranslatableText } from './TranslatableText';
import karyakalap1 from '../assets/Karyakalap/1.png';
import karyakalap2 from '../assets/Karyakalap/2.png';
import karyakalap3 from '../assets/Karyakalap/3.png';
import begumAkhtarPdf from '../assets/files/begum-akhtar.pdf';
import pdfFile from '../assets/files/संस्कृतिनिदेशालय.pdf';
import abstract from '../assets/abstract.png';

const KaryakalapSection: React.FC = () => {
  const handlePdfClick = () => {
    window.open(pdfFile, '_blank', 'noopener,noreferrer');
  };

  const handleBegumAkhtarClick = () => {
    window.open(begumAkhtarPdf, '_blank', 'noopener,noreferrer');
  };

  const items = [
    { img: karyakalap1, text: 'बेगम अख्तर\nपुरस्कार', key: 'begum-akhtar' },
    { img: karyakalap2, text: 'संत रविदास\nकला सम्मान', key: 'sant-ravidas' },
    { img: karyakalap3, text: 'वृद्घ एवं विपन्न\nकलाकारों की\nमासिक पेंशन हेतु\nआवेदन-पत्र', key: 'pension' },
  ];

  return (
    <div>
      <div className="w-full px-4 flex flex-col items-center">
        <TranslatableText
          text="कार्य कलाप"
          className="font-['Inter'] font-bold text-[24px] text-[#5A1616] text-center leading-tight"
          as="h1"
        />
        <img
          src={abstract}
          alt="Abstract Design"
          className="w-[40%] mt-1"
        />
      </div>
      <div className="w-full px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {items.slice(0, 2).map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
              onClick={index === 0 ? handleBegumAkhtarClick : undefined}
            >
              <img 
                src={item.img} 
                alt={item.text} 
                className="w-[140px] h-[140px] object-contain mx-auto mt-2"
              />
              <div className="p-2">
                <TranslatableText
                  text={item.text}
                  className="font-['Baloo_2'] font-bold text-[17px] text-[#5A1616] text-center whitespace-pre-line"
                  as="p"
                />
              </div>
            </div>
          ))}
          <div className="col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex">
              <div className="w-1/2">
                <img
                  src={items[2].img} 
                  alt={items[2].text} 
                  className="w-[150px] h-[150px] ml-6 object-contain"
                />
              </div>
              <div 
                className="w-1/2 flex items-center justify-center p-4 cursor-pointer active:scale-95 transition-transform"
                onClick={handlePdfClick}
              >
                <TranslatableText
                  text={items[2].text}
                  className="font-['Baloo_2'] font-bold text-[18px] mr-5 text-[#5A1616] text-center whitespace-pre-line"
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaryakalapSection;
import React from 'react';
import { TranslatableText } from './TranslatableText';
import abhilekhakaran from '../assets/icons/Abhilekhakaran.png';
import shashnadesh from '../assets/icons/Shashnadesh.png';
import nivida from '../assets/icons/Nivida.png';
import abstract from '../assets/abstract.png';

const Others: React.FC = () => {
    return (
        <div>
            <div className="w-full px-4  flex flex-col items-center">
                <TranslatableText
                    text="अन्य उपयोगी जानकारी"
                    className="font-['Inter'] font-bold text-[24px] text-[#5A1616] text-center leading-tight"
                    as="h1"
                />
                <img
                    src={abstract}
                    alt="Abstract Design"
                    className="w-[40%]  mt-1"
                />
            </div>
            <div className="w-full px-4 py-6">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { img: nivida, text: 'निविदा', url: 'https://etender.up.nic.in/nicgep/app' },
                        { img: shashnadesh, text: 'शासनादेश' },
                        { img: abhilekhakaran, text: 'अभिलेखीकरण\nकी योजनायें' }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div 
                                className="bg-white rounded-2xl shadow-lg pb-2 w-24 h-24 flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                                onClick={() => item.url && window.open(item.url, '_blank')}
                            >
                                <img src={item.img} alt={item.text} className="w-16 h-16" />
                                <p
                                    className="font-['Baloo_2'] font-bold text-center text-[15px] text-[#9C0505]"
                                    style={{ marginTop: '-5px', lineHeight: '1.1' }}
                                >
                                    <TranslatableText text={item.text} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Others;
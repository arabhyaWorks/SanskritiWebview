import React from 'react';
import { ChevronLeft, FileText, Download } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface DirectorApplicationsProps {
  onClose: () => void;
}

interface ApplicationData {
  'क्रम स.': number;
  'स्वायत्तशासी संस्थाओं के नाम': string;
  'नियम/शर्ते/योग्यता': string;
  'आवेदन-पत्र (.docx)': string;
  'आवेदन-पत्र पीडीएफ़': string;
}

const DirectorApplications: React.FC<DirectorApplicationsProps> = ({ onClose }) => {
  const applications: ApplicationData[] = [
    {
      'क्रम स.': 1,
      'स्वायत्तशासी संस्थाओं के नाम': 'उत्तर प्रदेश संगीत नाटक अकादमी, लखनऊ',
      'नियम/शर्ते/योग्यता': 'https://upculture.up.nic.in/sites/default/files/2023-05/ad%20for%20director%20post.pdf',
      'आवेदन-पत्र (.docx)': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20APPLICATION%20FORM%20TO%20BE%20FILLED%20UP%20BY%20CANDIDATE.docx',
      'आवेदन-पत्र पीडीएफ़': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20application%20form%20pdf.pdf'
    },
    {
      'क्रम स.': 2,
      'स्वायत्तशासी संस्थाओं के नाम': 'उत्तर प्रदेश राज्य ललित कला अकादमी, लखनऊ',
      'नियम/शर्ते/योग्यता': 'https://upculture.up.nic.in/sites/default/files/2023-05/ad%20for%20director%20post.pdf',
      'आवेदन-पत्र (.docx)': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20APPLICATION%20FORM%20TO%20BE%20FILLED%20UP%20BY%20CANDIDATE.docx',
      'आवेदन-पत्र पीडीएफ़': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20application%20form%20pdf.pdf'
    },
    {
      'क्रम स.': 3,
      'स्वायत्तशासी संस्थाओं के नाम': 'भारतेन्दु नाट्य अकादमी, लखनऊ',
      'नियम/शर्ते/योग्यता': 'https://upculture.up.nic.in/sites/default/files/2023-05/ad%20for%20director%20post.pdf',
      'आवेदन-पत्र (.docx)': 'https://upculture.up.nic.in/sites/default/files/2023-05/directors%20APPLICATION%20FORM%20TO%20BE%20FILLED%20UP%20BY%20CANDIDATE.docx',
      'आवेदन-पत्र पीडीएफ़': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20application%20form%20pdf.pdf'
    },
    {
      'क्रम स.': 4,
      'स्वायत्तशासी संस्थाओं के नाम': 'अयोध्या शोध संस्थान, अयोध्या',
      'नियम/शर्ते/योग्यता': 'https://upculture.up.nic.in/sites/default/files/2023-05/ad%20for%20director%20post.pdf',
      'आवेदन-पत्र (.docx)': 'https://upculture.up.nic.in/sites/default/files/2023-05/directors%20APPLICATION%20FORM%20TO%20BE%20FILLED%20UP%20BY%20CANDIDATE.docx',
      'आवेदन-पत्र पीडीएफ़': 'https://upculture.up.nic.in/sites/default/files/2023-05/director%20application%20form%20pdf.pdf'
    }
  ];

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
            text="निदेशक पद हेतु आवेदन"
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
          
          <div className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app['क्रम स.']}
                className="bg-white/80 rounded-xl p-4 shadow hover:shadow-md transition-all border border-[#903603]/10"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-[#903603]/10 rounded-full flex items-center justify-center text-[#903603] font-bold font-['Baloo_2']">
                    {app['क्रम स.']}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[#903603] font-['Baloo_2'] font-bold mb-4 text-lg">
                      <TranslatableText text={app['स्वायत्तशासी संस्थाओं के नाम']} />
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <a
                        href={app['नियम/शर्ते/योग्यता']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#903603]/5 hover:bg-[#903603]/10 transition-all group active:scale-95"
                      >
                        <FileText className="w-6 h-6 text-[#903603] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-[#903603] text-center">
                          <TranslatableText text="नियम एवं शर्तें" />
                        </span>
                      </a>
                      <a
                        href={app['आवेदन-पत्र (.docx)']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#903603]/5 hover:bg-[#903603]/10 transition-all group active:scale-95"
                      >
                        <Download className="w-6 h-6 text-[#903603] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-[#903603] text-center">
                          <TranslatableText text="Word फॉर्म" />
                        </span>
                      </a>
                      <a
                        href={app['आवेदन-पत्र पीडीएफ़']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#903603]/5 hover:bg-[#903603]/10 transition-all group active:scale-95"
                      >
                        <Download className="w-6 h-6 text-[#903603] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-[#903603] text-center">
                          <TranslatableText text="PDF फॉर्म" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default DirectorApplications;
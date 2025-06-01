import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from '../TranslatableText';
import BasicDetails from './BasicDetails';
import ArtDetails from './ArtDetails';
import BankDetails from './BankDetails';
import UploadDocuments from './UploadDocuments';
import backgroundImage from '../../assets/VibhgaBG.avif';

interface ArtistRegistrationProps {
  onClose: () => void;
}

const ArtistRegistration: React.FC<ArtistRegistrationProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    type: 'individual' as 'individual' | 'group',
    name: '',
    dob: '',
    gender: '',
    email: '',
    mobile: localStorage.getItem('artistMobile') || '',
    website: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',

    // Art Details
    artForm: '',
    artArea: '',
    experience: '',
    presentationLevel: '',
    grade: '',
    contractDetails: '',
    youtubeLink: '',
    referenceNames: ['', ''],
    referenceDesignations: ['', ''],
    achievements: '',

    // Bank Details
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    cancelledCheque: null as File | null,

    // Documents
    photo: null as File | null,
    aadharNumber: '',
    aadharCard: null as File | null,
    panNumber: '',
    panCard: null as File | null,
    performancePhotos: [] as File[],
  });

  const handleChange = (field: string, value: string | File | File[] | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const steps = [
    { id: 1, label: 'Basic Details' },
    { id: 2, label: 'Art Details' },
    { id: 3, label: 'Bank Details' },
    { id: 4, label: 'Upload Documents' },
    { id: 5, label: 'Review and final submit' }
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
            text="कलाकार पंजीकरण"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-3 px-4 max-w-2xl mx-auto hide-scrollbar">
          {steps.map(step => (
            <div
              key={step.id}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? 'bg-[#903603] text-white'
                  : currentStep > step.id
                  ? 'bg-[#903603]/20 text-[#903603]'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <TranslatableText text={step.label} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto pb-24">
        {currentStep === 1 && (
          <BasicDetails
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <ArtDetails
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <BankDetails
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <UploadDocuments
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <div className="space-y-6">
            {/* Review component will be added here */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <TranslatableText text="Back" />
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors"
              >
                <TranslatableText text="Submit" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistRegistration;
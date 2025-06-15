import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { TranslatableText } from "../TranslatableText";
import { useNavigate } from "react-router-dom";
import BasicDetails from "./BasicDetails";
import ArtDetails from "./ArtDetails";
import BankDetails from "./BankDetails";
import UploadDocuments from "./UploadDocuments";
import backgroundImage from "../../assets/VibhgaBG.avif";

const ArtistRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Art Details" },
    { id: 3, label: "Bank Details" },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />

      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
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
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? "bg-[#903603] text-white"
                  : currentStep > step.id
                  ? "bg-[#903603]/20 text-[#903603]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <TranslatableText text={step.label} />
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto pb-24">
        {currentStep === 1 && <BasicDetails onNext={handleNext} />}
        {currentStep === 2 && (
          <ArtDetails onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <div>
            <BankDetails onNext={handleNext} onBack={handleBack} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ArtistRegistration;

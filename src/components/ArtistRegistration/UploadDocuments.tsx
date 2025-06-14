import React, { useState } from 'react';
import { TranslatableText } from '../TranslatableText';

interface UploadDocumentsProps {
  formData: {
    photo: File | null;
    aadharNumber: string;
    aadharCard: File | null;
    panNumber: string;
    panCard: File | null;
    performancePhotos: File[];
  };
  onChange: (field: string, value: string | File | File[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({ formData, onChange, onNext, onBack }) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [performancePhotoPreviews, setPerformancePhotoPreviews] = useState<string[]>([]);

  const handleFileChange = (field: string, files: FileList | null, previewSetter: (preview: string | null) => void) => {
    if (files && files[0]) {
      const file = files[0];
      onChange(field, file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5);
      onChange('performancePhotos', files);

      const previews: string[] = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setPerformancePhotoPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#903603]/10">
        <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2'] border-b border-[#903603]/10 pb-4 text-center">
          <TranslatableText text="Artist's Documents" />
        </h2>

        <div className="text-red-500 mb-6 text-sm font-medium text-center">
          <TranslatableText text="स्वीकृत फ़ाइल प्रारूप: जेपीईजी, पीएनजी, पीडीएफ; अधिकतम साइज़: 5 एमबी" />
          <br />
          <TranslatableText text="Accepted File Formats - JPEG, PNG, PDF; Max size - 5 MB" />
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-[#903603] font-bold">
                <TranslatableText text="फोटो अपलोड करें/Upload Photo" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange('photo', e.target.files, setPhotoPreview)}
                accept="image/*,.pdf"
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            {photoPreview && (
              <div>
                <label className="block mb-3 text-[#903603] font-bold">
                  <TranslatableText text="Preview Photo" />
                </label>
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-[#903603]/20" 
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-[#903603] font-bold">
              <TranslatableText text="अपना 12 अंकों का आधार नंबर दर्ज करें/Enter Your 12 Digit Aadhar Number" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.aadharNumber}
              onChange={(e) => onChange('aadharNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
              maxLength={12}
              placeholder="Enter 12 digit Aadhar number"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-[#903603] font-bold">
                <TranslatableText text="आधार अपलोड करें/Upload Aadhar" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange('aadharCard', e.target.files, setAadharPreview)}
                accept="image/*,.pdf"
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            {aadharPreview && (
              <div>
                <label className="block mb-3 text-[#903603] font-bold">
                  <TranslatableText text="Preview Aadhar" />
                </label>
                <img 
                  src={aadharPreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-[#903603]/20" 
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-[#903603] font-bold">
              <TranslatableText text="पैन आईडी/PAN Id" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.panNumber}
              onChange={(e) => onChange('panNumber', e.target.value.toUpperCase().slice(0, 10))}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
              maxLength={10}
              placeholder="Enter PAN number"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-[#903603] font-bold">
                <TranslatableText text="पैन अपलोड करें/Upload PAN" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange('panCard', e.target.files, setPanPreview)}
                accept="image/*,.pdf"
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required
              />
            </div>
            {panPreview && (
              <div>
                <label className="block mb-3 text-[#903603] font-bold">
                  <TranslatableText text="Preview PAN" />
                </label>
                <img 
                  src={panPreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-[#903603]/20" 
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-[#903603] font-bold">
              <TranslatableText text="किये गए प्रस्तुति का फोटो/अधिकतम 5 फोटो/Photos (Maximum 5) which is performed" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleMultipleFileChange}
              accept="image/*"
              multiple
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            />
            {performancePhotoPreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {performancePhotoPreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Performance ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-[#903603]/20"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <TranslatableText text="पीछे/Back" />
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors"
        >
          <TranslatableText text="सहेजें और आगे बढ़ें/Save and Next" />
        </button>
      </div>
    </form>
  );
};

export default UploadDocuments;
import React from 'react';
import { TranslatableText } from '../TranslatableText';

interface ArtDetailsProps {
  formData: {
    artForm: string;
    artArea: string;
    experience: string;
    presentationLevel: string;
    grade: string;
    contractDetails: string;
    youtubeLink: string;
    referenceNames: string[];
    referenceDesignations: string[];
    achievements: string;
  };
  onChange: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const ArtDetails: React.FC<ArtDetailsProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#5A1616]/10">
        <h2 className="text-2xl font-bold text-[#903603] mb-6 font-['Baloo_2'] text-center">
          <TranslatableText text="कलाकार की कला का विवरण" />
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="विधा का नाम/Name of Art" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.artForm}
                onChange={(e) => onChange('artForm', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                <option value="music">Music</option>
                <option value="dance">Dance</option>
                <option value="theatre">Theatre</option>
                <option value="visual-arts">Visual Arts</option>
              </select>
            </div>
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="विधा का क्षेत्र/Art Form" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.artArea}
                onChange={(e) => onChange('artArea', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                <option value="classical">Classical</option>
                <option value="folk">Folk</option>
                <option value="contemporary">Contemporary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="कार्य अनुभव (वर्ष)/Experience" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.experience}
                onChange={(e) => onChange('experience', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} years</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold text-lg">
                <TranslatableText text="स्तर/Presentation Level" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.presentationLevel}
                onChange={(e) => onChange('presentationLevel', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                required
              >
                <option value="">चयन करें</option>
                <option value="international">International</option>
                <option value="national">National</option>
                <option value="state">State</option>
                <option value="local">Local</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="आकाशवाणी/दूरदर्शन का ग्रेड/श्रेणी/AIR/Doordarshan Grade/Category*" />
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.grade}
              onChange={(e) => onChange('grade', e.target.value)}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            >
              <option value="">चयन करें/Select</option>
              <option value="a_high">A High Grade</option>
              <option value="a">A Grade</option>
              <option value="b_plus">B+ Grade</option>
              <option value="b">B Grade</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="संस्कृति विभाग उ०प्र० के अतिरिक्त अन्य शासकीय विभाग/संस्था से किये गए अनुबंधन एवं भुगतान का विवरण (पिछले 3 वर्षों में)*" />
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.contractDetails}
              onChange={(e) => onChange('contractDetails', e.target.value)}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="दिए गए प्रस्तुति का यूट्यूब/अन्य विडियो लिंक*" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.youtubeLink}
              onChange={(e) => onChange('youtubeLink', e.target.value)}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            />
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="कलाकार किन्हीं दो वरिष्ठ कलाकार अथवा राजपत्रित अधिकारी का मन्तव्य दें जो उन्हें भली भांति जानते हों" />
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              {[0, 1].map((index) => (
                <div key={index} className="mb-6">
                  <input
                    type="text"
                    value={formData.referenceNames[index] || ''}
                    onChange={(e) => {
                      const newNames = [...formData.referenceNames];
                      newNames[index] = e.target.value;
                      onChange('referenceNames', newNames);
                    }}
                    placeholder="नाम/Name"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616] mb-3"
                    required
                  />
                  <input
                    type="text"
                    value={formData.referenceDesignations[index] || ''}
                    onChange={(e) => {
                      const newDesignations = [...formData.referenceDesignations];
                      newDesignations[index] = e.target.value;
                      onChange('referenceDesignations', newDesignations);
                    }}
                    placeholder="पद/Designation"
                    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="अन्य उपलब्धियां*" />
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.achievements}
              onChange={(e) => onChange('achievements', e.target.value)}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <TranslatableText text="पीछे" />
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors"
        >
          <TranslatableText text="सहेजें और आगे बढ़ें" />
        </button>
      </div>
    </form>
  );
};

export default ArtDetails;
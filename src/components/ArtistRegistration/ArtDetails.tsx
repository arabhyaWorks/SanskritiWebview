
import React from 'react';
import { TranslatableText } from '../TranslatableText';
import data from './air_doordarshan_grade_master.json';
import artCategory from './art_category.json';
//import departmentMaster from './department_master.json';
import artSubCategory from './art_subcategory.json';
interface ArtSubCategory{
  id: string;
  cat_id: string;
  title: string;
  status: "0" | "1";
}
interface ArtCategory {
  id: string;    
  title: string; // e.g., "Dance"
  status: "0" | "1"; // "1" for active, "0" for inactive    
}       // e.g., "1"
{/*interface Department{
  id: string;
  dept_name: string;
  status: "0"| "1";
}*/}
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
    imageMultipleUrl : string[];
  };
  onChange: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface AirDoordarshanGrade {
  id: string;               // e.g., "1"
  title: string;            // Grade title (in Hindi)
  status: "0" | "1";        // "1" for active, "0" for inactive
  is_deleted: "0" | "1";    // "0" for not deleted, "1" for deleted
  created_date: string;     // e.g., "2025-06-07 20:13:04"
}
// Extract the grade array from the imported JSON structure
const gradeData = data[2].data as AirDoordarshanGrade[];
const artCategoryData = artCategory[2].data as ArtCategory[];
//const departmentData = departmentMaster[2].data as Department[];
const artSubCategoryData = artSubCategory[2].data as ArtSubCategory[];
//const[category_id , setCategoryId] = useState('');

const ArtDetails: React.FC<ArtDetailsProps> = ({ formData, onChange, onNext, onBack }) => {

console.log( "json data", gradeData);
console.log("artSubCategoryData", artSubCategoryData);
console.log("artCategoryData", artCategoryData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#5A1616]/10">
      <div className='border p-6 !space-y-4 border-black rounded-xl'>
        <div className='border border-black p-2 rounded-sm absolute m-2 -top-0  w-fit bg-white'>
        <h2 className="text-xl font-bold text-[#903603]   font-['Baloo_2'] ">
          <TranslatableText text="Artist's Art Details" />
        </h2>
        </div>
        <div className="space-y-4">
          
            {/** First dropdown - unchanged */}
<div>
  <label className="block mb-3 text-[#5A1616] font-bold text-lg">
    <TranslatableText text="विधा का नाम/Name of Art" />
    <span className="text-red-500">*</span>
  </label>
  <select
    value={formData.artForm}
    onChange={(e) => {onChange('artForm', e.target.value);}}
    className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
    required
  >
    <option value="">चयन करें</option>
    {artCategoryData.map((item) => (
      <option key={item.id} value={item.title}>
        {item.title}
      </option>
    ))}
  </select>
</div>

{/** Second dropdown - modified with lookup logic */}
<div>
  <label className="block mb-3 text-[#5A1616] font-bold text-lg">
    <TranslatableText text="विधा का क्षेत्र/Area of Art Form" />
    <span className="text-red-500">*</span>
  </label>

  {/** Get the ID based on selected title */}
  {/*
  {(() => {
    const selectedArtCategory = artCategoryData.find(
      (cat) => cat.title === formData.artForm
    );
    console.log("selectedArtIDCategory", selectedArtCategory);
    const selectedArtCategoryId = selectedArtCategory?.id;*/}

    
      <select
        value={formData.artArea}
        onChange={(e) => onChange('artArea', e.target.value)}
        className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
        required
      >
        <option value="">चयन करें</option>
        {artSubCategoryData
          .map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
      </select>
    

</div>

          
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
                <TranslatableText text="स्प्रस्तुति/पुरस्कार (अ./रा./प्रा./स्था.) का विवरण/स्तर Details/Levels of Presentation/Excite (INT/NTL/STL/CLC)" />
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
          
<div>
          <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="स्दिए गए प्रस्तुति का यूट्यूब/अन्य विडियो लिंक youtube/Other video link which is performed" />
                <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.youtubeLink}
                onChange={(e) => onChange('youtubeLink', e.target.value)}
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80 text-[#5A1616]"
                placeholder='Enter your Youtube Link ' 
              />
            </div>
          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="आकाशवाणी/दूरदर्शन का ग्रेड/श्रेणी/AIR/Doordarshan Grade/Category" />
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.grade}
              onChange={(e) => onChange('grade', e.target.value)}
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            >
              <option value="">चयन करें/Select</option>
              {/*<option value="a_high">A High Grade</option>
              <option value="a">A Grade</option>
              <option value="b_plus">B+ Grade</option>
              <option value="b">B Grade</option>
              <option value="none">None</option>*/}
              {gradeData.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="संस्कृति विभाग उ०प्र० के अतिरिक्त अन्य शासकीय विभाग/संस्था से किये गए अनुबंधन एवं भुगतान का विवरण (पिछले 3 वर्षों में) Details of contract and payment made to the Government Department other than the Department of Culture , UP ( in the last 3 years) " />
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
              <TranslatableText text="कलाकार किन्हीं दो वरिष्ठ कलाकार अथवा राजपत्रित अधिकारी का मन्तव्य दें जो उन्हें भली भांति जानते हों The artist should refer to any two senior artists or gazetted officers who know them well" />
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
              <TranslatableText text="अन्य उपलब्धियां / Other Achievements" />
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
          <div>
  <label className="block text-[#5A1616] font-bold text-lg mb-2">
    <TranslatableText text="किये गए प्रस्तुति का फोटो/अधिकतम 5 फोटो) Photos (Maximum 5) which is performed" />
  </label>
  
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = e.target.files;
      if (!files) return;

      const fileArray = Array.from(files);
      const imageReaders = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          if (file.size > 1048576) {
            alert("Image size should be under 1MB");
            return reject("File too large");
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result?.toString() || '';
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imageReaders)
        .then((base64Images) => {
          onChange('imageMultipleUrl', base64Images);
        })
        .catch((error) => {
          console.error("Image loading failed", error);
        });
    }}
    className="w-full  border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
  />

  {formData.imageMultipleUrl?.length > 0 && (
    <div className="mt-4 flex flex-wrap gap-4">
      {formData.imageMultipleUrl.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Preview ${idx + 1}`}
          className="w-32 h-32 object-cover border border-gray-300 rounded"
        />
      ))}
    </div>
  )}

  <span className="text-red-500 text-sm">
    कृपया 1 MB से कम आकार की प्रोफ़ाइल फोटो अपलोड करें.
  </span>
</div>


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
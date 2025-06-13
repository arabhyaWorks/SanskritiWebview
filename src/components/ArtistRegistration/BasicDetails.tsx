import React from 'react';
import { TranslatableText } from '../TranslatableText';

interface BasicDetailsProps {
  formData: {
    type: 'individual' | 'group';
    name: string;
    dob: string;
    gender: string;
    email: string;
    mobile: string;
    website: string;
    address: string;
    pinCode: string;
    city: string;
    state: string;
    adhaarNo: string;
    panNumber: string;
    imageUrl: string;
    noOfPerson: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ formData, onChange, onNext }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#5A1616]/10">
        <div className="space-y-4 p-6 rounded-xl border border-black">
          <h2 className="text-xl absolute bg-white mt-2 p-2 -top-0 font-bold text-[#903603] border border-black rounded-sm mb-8 font-['Baloo_2'] text-center">
          <TranslatableText text="Artist's Basic Information" />
        </h2>
          <div>
            <label className="block mb-3 text-[#5A1616] font-bold text-lg">
              <TranslatableText text="Individual OR Group/Mandal/Samooh/Organization" />
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="individual"
                  checked={formData.type === 'individual'}
                  onChange={(e) => onChange('type', e.target.value)}
                  className="mr-3"
                />
                <TranslatableText text="व्यक्ति/Individual" />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="group"
                  checked={formData.type === 'group'}
                  onChange={(e) => onChange('type', e.target.value)}
                  className="mr-3"
                />
              
                <TranslatableText text="समूह/मंडल/समूह/संगठन/Group/Mandal/Samooh/Organization" />
              </label>
            </div>
          </div>
          {formData.type === 'group' && <div>
            <label className="block mb-3 text-[#5A1616] font-bold">
              <TranslatableText text="No. Of Persons" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.noOfPerson}
              onChange={(e) => onChange('noOfPerson', e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              placeholder="Enter No. Of Person"
              required
            />
          </div>}

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold">
              <TranslatableText text="कलाकार/दल का नाम/Artist/Artist's Team Name" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              placeholder="Enter Your First Name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold">
                <TranslatableText text="जन्म तिथि/DOB" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => onChange('dob', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                required
              />
            </div>
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold">
                <TranslatableText text="लिंग/Gender" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => onChange('gender', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="ई-मेल/Email" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onChange('email', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="मोबाइल न०/ Mobile No." />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => onChange('mobile', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter mobile number"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="Enter Your 12 Digit Aadhar Number (अपना 12 अंकों का आधार नंबर दर्ज करें)" />
                 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.adhaarNo}
                onChange={(e) => onChange('adhaarNo', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter Adhaar No."
                required
              />
            </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="PAN Id ( पैन आईडी )" />
              </label>
              <input
                type="text"
                value={formData.panNumber}
                onChange={(e) => onChange('panNumber', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter PAN ID (e.g ABCD1234F)"
              />
            </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="वेबसाइट (यदि कोई हो)/Website (if any)" />
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => onChange('website', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter website URL"
              />
            </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="Upload Photo ( फोटो अपलोड करें )" />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                   if (file.size > 1048576) {
                  alert("Image size should be under 1MB");
                  return;
               }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64 = reader.result?.toString() || '';
                    onChange('imageUrl', base64);
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full  border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              />
             
              {formData.imageUrl?.startsWith("data:image") && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover border border-gray-300 rounded"
                />
              )}
              
              <span className='text-red-500 text-sm'>कृपया 1 MB से कम आकार की प्रोफ़ाइल फोटो अपलोड करें.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm space-y-4 rounded-xl p-6 border border-[#5A1616]/10">
        
          <div className='p-6 rounded-xl border border-black'>
           <h2 className="text-xl absolute bg-white mt-2 space-y-4 p-2 -top-0 font-bold text-[#903603] border border-black rounded-sm mb-8 font-['Baloo_2'] text-center">
            <TranslatableText text="Contact Details" />
           </h2>
            <div>
            <label className="block mb-3 mt-1 text-[#5A1616] font-bold">
              <TranslatableText text="पता/Address" />
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => onChange('address', e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              rows={3}
              required
            />
            </div>

          <div className="space-y-4">
            <div>
              <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-[#5A1616] font-bold text-lg mb-2">
                 <TranslatableText text="पिन कोड/Pin" />
                 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => onChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                  placeholder="Enter pin code"
                  required
                />
               </div>
               <div>
                <label className="block text-[#5A1616] font-bold text-lg mb-2">
                 <TranslatableText text="शहर/City" />
                 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => onChange('city', e.target.value)}
                  className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                  placeholder="Enter city"
                  required
                />
               </div>
              </div>
            </div>
          </div>
            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="राज्य/State" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => onChange('state', e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter state"
                required
              />
            </div>
          </div>
        </div>
      

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors"
        >
          <TranslatableText text="Save and Next" />
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;
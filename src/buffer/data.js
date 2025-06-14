so here we are performing artist registration 

there are three steps in the artist registation, at every step the user has to input the data and at every step the user has to submit and api call will be made at every step when the user makes a submit 

1  Step  user basic details 

curl --location 'https://upsanskriti.com/app/user-basic-details' \
--header 'Content-Type: application/json' \
--data-raw '{
  "token": "cultureapisanindiatoken",
  "id": "1",
  "individual_or_organization": "1",
  "aadhar_number": "42424242424",
  "pan_number": "ASNPG4996N",
  "first_name": "sanjeev gupta",
  "gender": "male",
  "email": "spgmit@gmail.com",
  "address": "bsr",
  "state": "1",
  "city": "12",
  "zipcode": "203001",
  "member_in_team": "10",
  "website": "http://localhost:5005/",
  "applicant_photo": "https://upsanskriti.com/upload/users/1/applicantphoto/39540_yogi.jpg"
}
'

Result at success-
{ "status":"1", "data": { "id": 1, "mobile": "9971917196"……. }, "msg":"success message" }

Result at failure -
{ "status":"0", "data": { }, "msg":"failure message" }





so let us first start with the step 1 

Things to do api integration and validation in step 1. 



1. when type group is selected then give drop down for number of persons, 
['1', '01-02', '03-05', '05-07', '06-10', '07-15', '10-15', '12-15', '15-20', '20-25'].

2. add aadhar card validation only numeric not text 10 digits only. 

3. pan card validation, first 5  characters to be letters, next four to be numeric and last should be letter. 

4. date of birth selection validation, so the user must minimum three year old less, younger the this date of birth could not be selected. 

5. for the state selection give drop down of states and when sates selected then for citities



implement the feature based on the api body and response in individual step 1, so that we can move to the next step after successful submission of the data.


import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { TranslatableText } from "../TranslatableText";
import BasicDetails from "./BasicDetails";
import ArtDetails from "./ArtDetails";
import BankDetails from "./BankDetails";
import UploadDocuments from "./UploadDocuments";
import backgroundImage from "../../assets/VibhgaBG.avif";

interface ArtistRegistrationProps {
  onClose: () => void;
}

const ArtistRegistration: React.FC<ArtistRegistrationProps> = ({ onClose }) => {
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
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? "bg-[#903603] text-white"
                  : currentStep > step.id
                  ? "bg-[#903603]/20 text-[#903603]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <TranslatableText text={step.label} />
            </div>
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
        {/*{currentStep === 4 && (
          <UploadDocuments
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}*/}
        {/*{currentStep === 5 && (
          <div className="space-y-6">
            
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
        */}
      </div>
    </div>
  );
};

export default ArtistRegistration;




import React from "react";
import { TranslatableText } from "../TranslatableText";

interface BasicDetailsProps {
  onNext: () => void;
}

const cities = [
  { id: "515", city_name: "Agra", state_id: "23", tier_id: "1" },
  { id: "516", city_name: "Allahabad", state_id: "23", tier_id: "1" },
];

const states = [
  { id: "1", state_name: "ANDHRA PRADESH", country_id: "105", status: "1" },
];
const BasicDetails: React.FC<BasicDetailsProps> = ({ onNext }) => {
  const id = localStorage.getItem("artistId");

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
              <TranslatableText
                text={`Individual OR Group/Mandal/\nSamooh/Organization`}
              />
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="individual"
                  checked={formData.type === "individual"}
                  onChange={(e) => onChange("type", e.target.value)}
                  className="mr-3"
                />
                <TranslatableText text="व्यक्ति/Individual" />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="group"
                  checked={formData.type === "group"}
                  onChange={(e) => onChange("type", e.target.value)}
                  className="mr-3"
                />

                <TranslatableText
                  text={`समूह/मंडल/समूह/संगठन/Group/\nMandal/Samooh/Organization`}
                />
              </label>
            </div>
          </div>
          {formData.type === "group" && (
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold">
                <TranslatableText text="No. Of Persons" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.noOfPerson}
                onChange={(e) => onChange("noOfPerson", e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter No. Of Person"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold">
              <TranslatableText text="कलाकार/दल का नाम/Artist/Artist's Team Name" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
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
                onChange={(e) => onChange("dob", e.target.value)}
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
                onChange={(e) => onChange("gender", e.target.value)}
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
                onChange={(e) => onChange("email", e.target.value)}
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
                onChange={(e) => onChange("mobile", e.target.value)}
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
                onChange={(e) => onChange("adhaarNo", e.target.value)}
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
                onChange={(e) => onChange("panNumber", e.target.value)}
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
                onChange={(e) => onChange("website", e.target.value)}
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
                    const base64 = reader.result?.toString() || "";
                    onChange("imageUrl", base64);
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

              <span className="text-red-500 text-sm">
                कृपया 1 MB से कम आकार की प्रोफ़ाइल फोटो अपलोड करें.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm space-y-4 rounded-xl p-6 border border-[#5A1616]/10">
        <div className="p-6 rounded-xl border border-black">
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
              onChange={(e) => onChange("address", e.target.value)}
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
                    onChange={(e) =>
                      onChange(
                        "pinCode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
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
                    onChange={(e) => onChange("city", e.target.value)}
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
              onChange={(e) => onChange("state", e.target.value)}
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

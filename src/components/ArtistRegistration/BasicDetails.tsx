import React, { useState, useEffect } from "react";
import { TranslatableText } from "../TranslatableText";
import { states, cities } from "../../utils/statesCities";

interface BasicDetailsProps {
  onNext: () => void;
}

const noOfMembers = [
  { id: "1", no_of_members: "1", alias: null, status: "1" },
  { id: "2", no_of_members: "01-02", alias: null, status: "1" },
  { id: "3", no_of_members: "03-05", alias: null, status: "1" },
  { id: "4", no_of_members: "05-07", alias: null, status: "1" },
  { id: "5", no_of_members: "06-10", alias: null, status: "1" },
  { id: "6", no_of_members: "07-15", alias: null, status: "1" },
  { id: "7", no_of_members: "10-15", alias: null, status: "1" },
  { id: "8", no_of_members: "12-15", alias: null, status: "1" },
  { id: "9", no_of_members: "15-20", alias: null, status: "1" },
  { id: "10", no_of_members: "20-25", alias: null, status: "1" },
];

const BasicDetails: React.FC<BasicDetailsProps> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    individual_or_organization: "1",
    aadhar_number: "",
    pan_number: "",
    first_name: "",
    gender: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    member_in_team: "",
    website: "",
    applicant_photo: "",
    dob: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredCities, setFilteredCities] = useState(cities);

  // Calculate minimum date for DOB (3 years ago from today)
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 3,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  // Handle state change to filter cities
  useEffect(() => {
    if (formData.state) {
      const filtered = cities.filter(
        (city) => city.state_id === formData.state
      );
      setFilteredCities(filtered);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Aadhar validation: 12 digits only
    if (!/^\d{12}$/.test(formData.aadhar_number)) {
      newErrors.aadhar_number = "Aadhar number must be exactly 12 digits";
    }

    // PAN validation: 5 letters, 4 digits, 1 letter
    if (
      formData.pan_number &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan_number)
    ) {
      newErrors.pan_number =
        "PAN must be 5 letters, 4 digits, and 1 letter (e.g., ASNPG4996N)";
    }

    // Required fields
    if (!formData.first_name) newErrors.first_name = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipcode) newErrors.zipcode = "Zipcode is required";
    if (formData.individual_or_organization === "2" && !formData.member_in_team)
      newErrors.member_in_team = "Number of members is required for groups";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      token: "cultureapisanindiatoken",
      id: localStorage.getItem("artistId") || "10050",
      individual_or_organization: formData.individual_or_organization,
      aadhar_number: formData.aadhar_number,
      pan_number: formData.pan_number,
      first_name: formData.first_name,
      gender: formData.gender,
      email: formData.email,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      zipcode: formData.zipcode,
      member_in_team:
        formData.individual_or_organization === "2"
          ? formData.member_in_team
          : "1",
      website: formData.website,
      applicant_photo: formData.applicant_photo,
    };

    console.log(payload);
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/user-basic-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.status == "1") {
        console.log("Success message:", result.msg);
        localStorage.setItem("artistId", result.data.id);
        onNext();
      } else {
        console.log("Error:", result.msg);
        setErrors({ api: result.msg || "Submission failed" });
      }
    } catch (error) {
      console.log("Network error:", error);
      setErrors({ api: "Network error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.api && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {errors.api}
        </div>
      )}

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
                  value="1"
                  checked={formData.individual_or_organization === "1"}
                  onChange={(e) => {
                    handleChange("individual_or_organization", e.target.value);
                    handleChange("member_in_team", "1");
                  }}
                  className="mr-3"
                />
                <TranslatableText text="व्यक्ति/Individual" />
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="2"
                  checked={formData.individual_or_organization === "2"}
                  onChange={(e) => {
                    handleChange("individual_or_organization", e.target.value);
                    handleChange("member_in_team", "");
                  }}
                  className="mr-3"
                />
                <TranslatableText
                  text={`समूह/मंडल/समूह/संगठन/Group/\nMandal/Samooh/Organization`}
                />
              </label>
            </div>
          </div>

          {formData.individual_or_organization === "2" && (
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold">
                <TranslatableText text="No. Of Persons" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.member_in_team}
                onChange={(e) => handleChange("member_in_team", e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                required
              >
                <option value="">Select Number of Members</option>
                {noOfMembers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.no_of_members}
                  </option>
                ))}
              </select>
              {errors.member_in_team && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.member_in_team}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block mb-3 text-[#5A1616] font-bold">
              <TranslatableText text="कलाकार/दल का नाम/Artist/Artist's Team Name" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              placeholder="Enter Your First Name"
              required
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
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
                onChange={(e) => handleChange("dob", e.target.value)}
                max={minDate}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                required
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <label className="block mb-3 text-[#5A1616] font-bold">
                <TranslatableText text="लिंग/Gender" />
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
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
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="Enter Your 12 Digit Aadhar Number (अपना 12 अंकों का आधार नंबर दर्ज करें)" />
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.aadhar_number}
                onChange={(e) =>
                  handleChange(
                    "aadhar_number",
                    e.target.value.replace(/\D/g, "").slice(0, 12)
                  )
                }
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter Aadhar No."
                required
              />
              {errors.aadhar_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aadhar_number}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="PAN Id ( पैन आईडी )" />
              </label>
              <input
                type="text"
                value={formData.pan_number}
                onChange={(e) =>
                  handleChange("pan_number", e.target.value.toUpperCase())
                }
                maxLength={10}
                className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                placeholder="Enter PAN ID (e.g ABCD1234F)"
              />
              {errors.pan_number && (
                <p className="text-red-500 text-sm mt-1">{errors.pan_number}</p>
              )}
            </div>

            <div>
              <label className="block text-[#5A1616] font-bold text-lg mb-2">
                <TranslatableText text="वेबसाइट (यदि कोई हो)/Website (if any)" />
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
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
                disabled={true}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 1048576) {
                    setErrors((prev) => ({
                      ...prev,
                      applicant_photo: "Image size should be under 1MB",
                    }));
                    return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64 = reader.result?.toString() || "";
                    handleChange("applicant_photo", base64);
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              />
              {formData.applicant_photo && (
                <img
                  src={formData.applicant_photo}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover border border-gray-300 rounded"
                />
              )}
              {errors.applicant_photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicant_photo}
                </p>
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
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              rows={3}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#5A1616] font-bold text-lg mb-2">
                  <TranslatableText text="पिन कोड/Pin" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.zipcode}
                  onChange={(e) =>
                    handleChange(
                      "zipcode",
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                  placeholder="Enter pin code"
                  required
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                )}
              </div>

              <div>
                <label className="block text-[#5A1616] font-bold text-lg mb-2">
                  <TranslatableText text="शहर/City" />
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
                  required
                >
                  <option value="">Select City</option>
                  {filteredCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#5A1616] font-bold text-lg mb-2">
              <TranslatableText text="राज्य/State" />
              <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full p-2 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603]"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.state_name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <TranslatableText
            text={isSubmitting ? "Submitting..." : "Save and Next"}
          />
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;
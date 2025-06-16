import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Upload,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  Users,
  Edit,
  X,
} from "lucide-react";

import backgroundImage from "../assets/VibhgaBG.avif";

interface ProfileData {
  user_id: string;
  role_id: string;
  user_code: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  id_type: string;
  id_proof_photo: string;
  country_id: string;
  state_id: string;
  city_id: string;
  country_name: string;
  state_name: string;
  city_name: string;
  pincode: string;
  group_participate: string;
  lead_name: string;
  participant1: string;
  participant2: string;
  company_name: string;
  about_company: string;
  company_gstin: string;
}

interface DropdownOption {
  id: string;
  name: string;
}

const ContestProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Form data
  const [profileData, setProfileData] = useState<ProfileData>({
    user_id: "",
    role_id: "",
    user_code: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    id_type: "",
    id_proof_photo: "",
    country_id: "",
    state_id: "",
    city_id: "",
    country_name: "",
    state_name: "",
    city_name: "",
    pincode: "",
    group_participate: "individual",
    lead_name: "",
    participant1: "",
    participant2: "",
    company_name: "",
    about_company: "",
    company_gstin: "",
  });

  // Dropdown options
  const [idTypes, setIdTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<DropdownOption[]>([]);
  const [states, setStates] = useState<DropdownOption[]>([]);
  const [cities, setCities] = useState<DropdownOption[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const contestUser = localStorage.getItem("contestUser");
    if (!contestUser) {
      window.location.href = "/contest/login";
      return;
    }

    const userData = JSON.parse(contestUser);
    setProfileData(prev => ({
      ...prev,
      user_id: userData.user_id,
      email: userData.email,
      mobile: userData.mobile,
    }));

    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProfileData(),
        fetchIdTypes(),
        fetchCountries(),
      ]);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const contestUser = JSON.parse(localStorage.getItem("contestUser") || "{}");
      
      const formData = new FormData();
      formData.append("user_id", contestUser.user_id);

      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/getProfileData",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status) {
        setProfileData(result.userData);
        if (result.userData.country_id) {
          fetchStates(result.userData.country_id);
        }
        if (result.userData.state_id) {
          fetchCities(result.userData.state_id);
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchIdTypes = async () => {
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/allTypeOfId",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();
      if (result.status) {
        setIdTypes(result.data);
      }
    } catch (error) {
      console.error("Error fetching ID types:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/getCountries",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();
      if (result.status) {
        setCountries(result.countryData.map((c: any) => ({ id: c.id, name: c.country_name })));
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId: string) => {
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/getStates",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country_id: countryId }),
        }
      );

      const result = await response.json();
      if (result.status) {
        setStates(result.stateData.map((s: any) => ({ id: s.id, name: s.state_name })));
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId: string) => {
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/getCities",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state_id: stateId }),
        }
      );

      const result = await response.json();
      if (result.status) {
        setCities(result.cityData.map((c: any) => ({ id: c.id, name: c.city_name })));
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));

    // Handle cascade updates
    if (field === "country_id") {
      setProfileData(prev => ({ ...prev, state_id: "", city_id: "" }));
      setStates([]);
      setCities([]);
      if (value) {
        fetchStates(value);
      }
    } else if (field === "state_id") {
      setProfileData(prev => ({ ...prev, city_id: "" }));
      setCities([]);
      if (value) {
        fetchCities(value);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors(prev => ({ ...prev, id_proof_photo: "फ़ाइल का साइज़ 1MB से कम होना चाहिए" }));
        return;
      }
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setErrors(prev => ({ ...prev, id_proof_photo: "केवल JPEG, JPG, PNG फ़ाइलें स्वीकार्य हैं" }));
        return;
      }
      setSelectedFile(file);
      setErrors(prev => ({ ...prev, id_proof_photo: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.name.trim()) newErrors.name = "नाम आवश्यक है";
    if (!profileData.address.trim()) newErrors.address = "पता आवश्यक है";
    if (!profileData.country_id) newErrors.country_id = "देश का चयन आवश्यक है";
    if (!profileData.state_id) newErrors.state_id = "राज्य का चयन आवश्यक है";
    if (!profileData.city_id) newErrors.city_id = "शहर का चयन आवश्यक है";
    if (!profileData.pincode.trim()) newErrors.pincode = "पिनकोड आवश्यक है";
    if (!profileData.id_type) newErrors.id_type = "ID प्रकार का चयन आवश्यक है";
    
    if (profileData.group_participate === "group" && !profileData.lead_name.trim()) {
      newErrors.lead_name = "समूह भागीदारी के लिए लीड नाम आवश्यक है";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== 'country_name' && key !== 'state_name' && key !== 'city_name' && key !== 'role_id' && key !== 'user_code') {
          formData.append(key, value);
        }
      });

      // Add file if selected
      if (selectedFile) {
        formData.append("id_proof_photo", selectedFile);
      }

      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Myprofile/updateProfile",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (result.status) {
        setSuccessMessage("प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!");
        setIsEditing(false);
        setSelectedFile(null);
        // Refresh profile data
        await fetchProfileData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ general: result.message || "प्रोफ़ाइल अपडेट करने में त्रुटि" });
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({});
    setSelectedFile(null);
  };

  const getDisplayValue = (value: string) => {
    return value || "जानकारी उपलब्ध नहीं";
  };

  const getParticipationType = (type: string) => {
    if (type === "individual") return "व्यक्तिगत रूप से";
    if (type === "group") return "समूह में";
    return "जानकारी उपलब्ध नहीं";
  };

  const getIdTypeInHindi = (type: string) => {
    switch(type) {
      case "aadhar card": return "आधार कार्ड";
      case "passport": return "पासपोर्ट";
      case "driving licence": return "ड्राइविंग लाइसेंस";
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#903603] mx-auto mb-4"></div>
          <p className="text-[#903603] font-['Baloo_2']">प्रोफ़ाइल लोड हो रही है...</p>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-1 bg-black/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-brown-500 transition-transform" />
            </button>
            <h1 className="text-[#5A1616] text-2xl font-bold font-['Baloo_2'] ml-2">
              प्रोफ़ाइल
            </h1>
          </div>
          
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="bg-[#903603] text-white px-4 py-2 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              संपादित करें
            </button>
          )}
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-green-700 text-sm font-medium font-['Baloo_2']">{successMessage}</p>
          </div>
        )}

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium font-['Baloo_2']">{errors.general}</p>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <h2 className="text-lg font-bold text-[#903603] font-['Baloo_2'] mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            व्यक्तिगत जानकारी
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                नाम <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                    placeholder="अपना पूरा नाम दर्ज करें"
                  />
                  {errors.name && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.name}</p>}
                </>
              ) : (
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                  {getDisplayValue(profileData.name)}
                </div>
              )}
            </div>

            {/* Email (always readonly) */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ईमेल
              </label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 font-['Inter']">
                {getDisplayValue(profileData.email)}
              </div>
            </div>

            {/* Mobile (always readonly) */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Phone className="w-4 h-4" />
                मोबाइल
              </label>
              <div className="w-full px-4 py-3 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 font-['Inter']">
                {getDisplayValue(profileData.mobile)}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <h2 className="text-lg font-bold text-[#903603] font-['Baloo_2'] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            पता जानकारी
          </h2>

          <div className="space-y-4">
            {/* Country & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                  देश <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <>
                    <select
                      value={profileData.country_id}
                      onChange={(e) => handleInputChange("country_id", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                    >
                      <option value="">देश चुनें</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.country_id && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.country_id}</p>}
                  </>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                    {getDisplayValue(profileData.country_name)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                  राज्य <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <>
                    <select
                      value={profileData.state_id}
                      onChange={(e) => handleInputChange("state_id", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                      disabled={!profileData.country_id}
                    >
                      <option value="">राज्य चुनें</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state_id && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.state_id}</p>}
                  </>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                    {getDisplayValue(profileData.state_name)}
                  </div>
                )}
              </div>
            </div>

            {/* City & Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                  शहर <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <>
                    <select
                      value={profileData.city_id}
                      onChange={(e) => handleInputChange("city_id", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                      disabled={!profileData.state_id}
                    >
                      <option value="">शहर चुनें</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city_id && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.city_id}</p>}
                  </>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                    {getDisplayValue(profileData.city_name)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                  पिनकोड <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profileData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                      placeholder="पिनकोड दर्ज करें"
                    />
                    {errors.pincode && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.pincode}</p>}
                  </>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                    {getDisplayValue(profileData.pincode)}
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                पूरा पता <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter'] resize-none"
                    placeholder="अपना पूरा पता दर्ज करें"
                  />
                  {errors.address && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.address}</p>}
                </>
              ) : (
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter'] min-h-[80px]">
                  {getDisplayValue(profileData.address)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ID Proof Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <h2 className="text-lg font-bold text-[#903603] font-['Baloo_2'] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            पहचान प्रमाण
          </h2>

          <div className="space-y-4">
            {/* ID Type */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                ID प्रकार <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <>
                  <select
                    value={profileData.id_type}
                    onChange={(e) => handleInputChange("id_type", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                  >
                    <option value="">ID प्रकार चुनें</option>
                    {idTypes.map((type) => (
                      <option key={type} value={type}>
                        {getIdTypeInHindi(type)}
                      </option>
                    ))}
                  </select>
                  {errors.id_type && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.id_type}</p>}
                </>
              ) : (
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                  {getIdTypeInHindi(profileData.id_type) || "जानकारी उपलब्ध नहीं"}
                </div>
              )}
            </div>

            {/* ID Proof Upload/View */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Upload className="w-4 h-4" />
                {isEditing ? "ID प्रमाण अपलोड करें" : "ID प्रमाण"}
              </label>
              
              {profileData.id_proof_photo && (
                <div className="mb-3">
                  <p className="text-sm text-[#903603]/80 mb-2 font-['Baloo_2']">
                    {isEditing ? "वर्तमान ID प्रमाण:" : "अपलोड किया गया ID प्रमाण:"}
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Eye className="w-4 h-4 text-green-600" />
                    <a
                      href={profileData.id_proof_photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline text-sm font-medium font-['Baloo_2']"
                    >
                      ID प्रमाण देखें
                    </a>
                  </div>
                </div>
              )}

              {isEditing && (
                <>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="id-proof-upload"
                    />
                    <label
                      htmlFor="id-proof-upload"
                      className="w-full flex items-center justify-center gap-3 px-4 py-6 rounded-xl bg-white/80 border-2 border-dashed border-[#903603]/30 hover:border-[#903603]/50 transition-all cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-[#903603]/60" />
                      <span className="text-[#903603]/80 font-medium font-['Baloo_2']">
                        {selectedFile ? selectedFile.name : "फ़ाइल चुनें या खींचकर छोड़ें"}
                      </span>
                    </label>
                  </div>
                  
                  <p className="text-xs text-[#903603]/60 font-['Baloo_2']">
                    (JPEG/JPG/PNG, अधिकतम 1 MB)
                  </p>
                  {errors.id_proof_photo && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.id_proof_photo}</p>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Group Participation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#903603]/10">
          <h2 className="text-lg font-bold text-[#903603] font-['Baloo_2'] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            भागीदारी प्रकार
          </h2>

          <div className="space-y-4">
            {/* Group Participation Radio */}
            <div className="space-y-3">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                क्या आपका कोई संगठन है? <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="group_participate"
                      value="individual"
                      checked={profileData.group_participate === "individual"}
                      onChange={(e) => handleInputChange("group_participate", e.target.value)}
                      className="w-4 h-4 text-[#903603] border-2 border-[#903603]/30 focus:ring-[#903603]/20"
                    />
                    <span className="text-[#903603] font-medium font-['Baloo_2']">नहीं</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="group_participate"
                      value="group"
                      checked={profileData.group_participate === "group"}
                      onChange={(e) => handleInputChange("group_participate", e.target.value)}
                      className="w-4 h-4 text-[#903603] border-2 border-[#903603]/30 focus:ring-[#903603]/20"
                    />
                    <span className="text-[#903603] font-medium font-['Baloo_2']">हाँ</span>
                  </label>
                </div>
              ) : (
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                  {getParticipationType(profileData.group_participate)}
                </div>
              )}
            </div>

            {/* Group Details - Show only if group is selected */}
            {(profileData.group_participate === "group" || (isEditing && profileData.group_participate === "group")) && (
              <div className="space-y-4 p-4 bg-[#903603]/5 rounded-xl border border-[#903603]/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                      लीड नाम <span className="text-red-500">*</span>
                    </label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={profileData.lead_name}
                          onChange={(e) => handleInputChange("lead_name", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                          placeholder="लीड नाम दर्ज करें"
                        />
                        {errors.lead_name && <p className="text-red-600 text-xs font-medium font-['Baloo_2']">{errors.lead_name}</p>}
                      </>
                    ) : (
                      <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                        {getDisplayValue(profileData.lead_name)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                      प्रतिभागी 1
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.participant1}
                        onChange={(e) => handleInputChange("participant1", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                        placeholder="प्रतिभागी 1 नाम दर्ज करें"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                        {getDisplayValue(profileData.participant1)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                      प्रतिभागी 2
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.participant2}
                        onChange={(e) => handleInputChange("participant2", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                        placeholder="प्रतिभागी 2 नाम दर्ज करें"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                        {getDisplayValue(profileData.participant2)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                      कंपनी GSTIN
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.company_gstin}
                        onChange={(e) => handleInputChange("company_gstin", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                        placeholder="GSTIN नंबर दर्ज करें"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                        {getDisplayValue(profileData.company_gstin)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                    कंपनी नाम
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.company_name}
                      onChange={(e) => handleInputChange("company_name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                      placeholder="कंपनी नाम दर्ज करें"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter']">
                      {getDisplayValue(profileData.company_name)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
                    कंपनी के बारे में
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.about_company}
                      onChange={(e) => handleInputChange("about_company", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter'] resize-none"
                      placeholder="अपनी कंपनी के बारे में संक्षिप्त विवरण"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#903603] font-['Inter'] min-h-[80px]">
                      {getDisplayValue(profileData.about_company)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pb-6">
            <button
              onClick={handleEditToggle}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 active:scale-98 transition-all flex items-center justify-center gap-3 font-['Baloo_2']"
            >
              <X className="w-5 h-5" />
              रद्द करें
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed font-['Baloo_2']"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  सेव हो रहा है...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  प्रोफ़ाइल सेव करें
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestProfile;
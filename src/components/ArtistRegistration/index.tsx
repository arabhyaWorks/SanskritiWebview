import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { TranslatableText } from "../TranslatableText";
import { useNavigate } from "react-router-dom";
import BasicDetails from "./BasicDetails";
import ArtDetails from "./ArtDetails";
import BankDetails from "./BankDetails";
import backgroundImage from "../../assets/VibhgaBG.avif";

const ArtistRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Centralized form data state
  const [formData, setFormData] = useState({
    // Basic Details
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

    // Art Details
    art_cat_id: "",
    art_sub_cat_id: "",
    work_experience: "",
    presentation_level: "",
    air_doordarshan_grade: "",
    contract_payment_details_by_other_dept: "",
    other_achievements: "",
    any_video_link: "",
    first_senior_artist_or_gazetted_officers_name: "",
    first_senior_artist_or_gazetted_officers_designation: "",
    second_senior_artist_or_gazetted_officers_name: "",
    second_senior_artist_or_gazetted_officers_designation: "",
    max_five_file: [],

    // Bank Details
    account_holder_name: "",
    ifsc_code: "",
    account_number: "",
    confirm_account_number: "",
    bank_name: "",
    branch_name: "",
    cancelled_cheque: "",
  });

  // Fetch artist data on component mount
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("artistId") || "10060";
        
        const response = await fetch("https://upsanskriti.com/app/artist-dashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            id: userId,
          }),
        });

        const result = await response.json();
        console.log("🔍 Artist data fetched:", result);

        if (result.status === 1) {
          const data = result.data;
          
          // Format date for input field
          const formatDateForInput = (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

          // Populate form data with API response
          setFormData(prev => ({
            ...prev,
            // Basic Details
            individual_or_organization: data.individual_or_organization?.toString() || "1",
            aadhar_number: data.aadhar_number || "",
            pan_number: data.pan_number || "",
            first_name: data.first_name || "",
            gender: data.gender || "",
            email: data.email || "",
            address: data.address || "",
            state: data.state?.toString() || "",
            city: data.city?.toString() || "",
            zipcode: data.zipcode || "",
            member_in_team: data.member_in_team?.toString() || "",
            website: data.website || "",
            applicant_photo: data.applicant_photo ? `https://upsanskriti.com${data.applicant_photo}` : "",
            dob: formatDateForInput(data.date_of_birth),

            // Art Details
            art_cat_id: data.art_cat_id?.toString() || "",
            art_sub_cat_id: data.art_sub_cat_id?.toString() || "",
            work_experience: data.work_experience || "",
            presentation_level: data.presentation_level || "",
            air_doordarshan_grade: data.air_doordarshan_grade?.toString() || "",
            contract_payment_details_by_other_dept: data.contract_payment_details_by_other_dept || "",
            other_achievements: data.other_achievements || "",
            any_video_link: data.any_video_link || "",
            first_senior_artist_or_gazetted_officers_name: data.first_senior_artist_or_gazetted_officers_name || "",
            first_senior_artist_or_gazetted_officers_designation: data.first_senior_artist_or_gazetted_officers_designation || "",
            second_senior_artist_or_gazetted_officers_name: data.second_senior_artist_or_gazetted_officers_name || "",
            second_senior_artist_or_gazetted_officers_designation: data.second_senior_artist_or_gazetted_officers_designation || "",

            // Bank Details
            account_holder_name: data.account_holder_name || "",
            ifsc_code: data.ifsc_code || "",
            account_number: data.account_number || "",
            confirm_account_number: data.account_number || "", // Same as account number for pre-fill
            bank_name: data.bank_name || "",
            branch_name: data.branch_name || "",
            cancelled_cheque: data.cancelled_cheque || "",
          }));

          console.log("✅ Form data populated successfully");
        } else {
          console.error("❌ Failed to fetch artist data:", result.msg);
          setError("Failed to fetch artist data");
        }
      } catch (err) {
        console.error("❌ Network error:", err);
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, []);

  // Update form data helper function
  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Handle next step
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Handle back step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Art Details" },
    { id: 3, label: "Bank Details" },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A1616] mx-auto mb-4"></div>
          <p className="text-[#5A1616] font-['Baloo_2']">
            डेटा लोड हो रहा है...
          </p>
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

      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-1 bg-black/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 transition-transform" />
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
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-['Baloo_2']">{error}</p>
          </div>
        )}
        
        {currentStep === 1 && (
          <BasicDetails 
            onNext={handleNext} 
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <ArtDetails 
            onNext={handleNext} 
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <BankDetails 
            onNext={handleNext} 
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistRegistration;
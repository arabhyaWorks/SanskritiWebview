import React, { useState } from "react";
import { TranslatableText } from "../TranslatableText";
import { useNavigate } from "react-router-dom";

const BankDetails = ({ onNext, onBack, formData, updateFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // Toggle this flag to make cancelled cheque mandatory or non-mandatory
  const isCancelledChequeMandatory = false;

  const validateForm = () => {
    const newErrors = {};

    // Account holder name: required, letters and spaces only
    if (!formData.account_holder_name) {
      newErrors.account_holder_name = "Account holder name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.account_holder_name)) {
      newErrors.account_holder_name = "Only letters and spaces are allowed";
    }

    // Account number: required, 9-18 digits
    if (!formData.account_number) {
      newErrors.account_number = "Account number is required";
    } else if (!/^\d{9,18}$/.test(formData.account_number)) {
      newErrors.account_number = "Account number must be 9-18 digits";
    }

    // Confirm account number: must match account number
    if (formData.account_number !== formData.confirm_account_number) {
      newErrors.confirm_account_number = "Account numbers do not match";
    }

    // IFSC code: required, 11 characters (4 letters, 0, 6 alphanumeric)
    if (!formData.ifsc_code) {
      newErrors.ifsc_code = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code)) {
      newErrors.ifsc_code = "Invalid IFSC code (e.g., SBIN0001234)";
    }

    // Bank name: required
    if (!formData.bank_name) {
      newErrors.bank_name = "Bank name is required";
    }

    // Branch name: required
    if (!formData.branch_name) {
      newErrors.branch_name = "Branch name is required";
    }

    // Cancelled cheque: validate only if mandatory
    if (isCancelledChequeMandatory && !formData.cancelled_cheque && !selectedFile) {
      newErrors.cancelled_cheque = "Cancelled cheque/passbook is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    updateFormData({ [key]: value });
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1048576) {
      setErrors((prev) => ({
        ...prev,
        cancelled_cheque: "File size must be under 1MB",
      }));
      return;
    }

    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        cancelled_cheque: "Only JPEG, PNG, or PDF files are allowed",
      }));
      return;
    }

    setSelectedFile(file);
    setErrors((prev) => ({ ...prev, cancelled_cheque: "" }));

    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString() || "";
      handleChange("cancelled_cheque", base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      token: "cultureapisanindiatoken",
      id: localStorage.getItem("artistId") || "10060",
      account_holder_name: formData.account_holder_name,
      ifsc_code: formData.ifsc_code,
      account_number: formData.account_number,
      bank_name: formData.bank_name,
      branch_name: formData.branch_name,
      cancelled_cheque: formData.cancelled_cheque,
    };

    console.log("📤 Submitting bank details:", payload);

    try {
      const response = await fetch(
        "https://upsanskriti.com/app/user-bank-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("📥 Bank details response:", result);

      if (result.status == 1) {
        console.log("✅ Bank details saved successfully:", result.msg);
        navigate("/artist")
      } else {
        console.log("❌ Error saving bank details:", result.msg);
        setErrors({ api: result.msg || "Submission failed" });
      }
    } catch (error) {
      console.log("❌ Network error:", error);
      setErrors({ api: "Network error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.api && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {errors.api}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#5A1616]/10 shadow-lg">
        <div className="border p-6 border-black rounded-xl">
          <div className="border border-black p-2 rounded-sm absolute m-2 -top-0 w-fit bg-white">
            <h2 className="text-xl font-bold text-[#903603] font-['Baloo_2']">
              <TranslatableText text="Artist's Bank Details" />
            </h2>
          </div>

          <div className="text-red-500 mb-6 text-sm font-medium">
            <TranslatableText text="कृपया बैंकिंग विवरण सावधानी से भरें। किसी भी गलती के लिए आवेदक पूरी तरह से जिम्मेदार होगा।" />
            <br />
            <TranslatableText text="Note: Please fill banking details carefully. Applicant will be completely responsible in case of any mistake." />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="खाता धारक का नाम/Account Holder Name" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.account_holder_name}
                  onChange={(e) =>
                    handleChange("account_holder_name", e.target.value)
                  }
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.account_holder_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.account_holder_name}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="खाता संख्या/Account Number" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) =>
                    handleChange(
                      "account_number",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.account_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.account_number}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="खाता संख्या की पुष्टि करें/Confirm Account Number" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.confirm_account_number}
                  onChange={(e) =>
                    handleChange(
                      "confirm_account_number",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.confirm_account_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirm_account_number}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="आईएफएससी कोड/IFSC Code" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ifsc_code}
                  onChange={(e) =>
                    handleChange("ifsc_code", e.target.value.toUpperCase())
                  }
                  maxLength={11}
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.ifsc_code && (
                  <p className="text-red-500 text-sm mt-1">{errors.ifsc_code}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="बैंक का नाम/Bank Name" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bank_name}
                  onChange={(e) => handleChange("bank_name", e.target.value)}
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.bank_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-[#5A1616] font-bold">
                  <TranslatableText text="शाखा का नाम/Branch Name" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.branch_name}
                  onChange={(e) => handleChange("branch_name", e.target.value)}
                  className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                  required
                />
                {errors.branch_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.branch_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#5A1616] font-bold">
                <TranslatableText text="रद्द चेक/पासबूक अपलोड करें/Upload Cancelled Cheque/Passbook" />
                {isCancelledChequeMandatory && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,application/pdf"
                className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
                required={isCancelledChequeMandatory && !formData.cancelled_cheque}
              />
              
              {/* Show existing file if pre-populated */}
              {formData.cancelled_cheque && !selectedFile && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-700 text-sm">
                    ✅ Cancelled cheque already uploaded
                  </p>
                  {formData.cancelled_cheque.startsWith('http') && (
                    <a 
                      href={formData.cancelled_cheque} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View uploaded file
                    </a>
                  )}
                </div>
              )}

              {/* Show selected file info */}
              {selectedFile && (
                <p className="text-green-500 text-sm mt-1">
                  File selected: {selectedFile.name}
                </p>
              )}

              {/* Show preview for new uploads */}
              {formData.cancelled_cheque && formData.cancelled_cheque.startsWith('data:') && (
                <div className="mt-2">
                  <img
                    src={formData.cancelled_cheque}
                    alt="Cancelled Cheque Preview"
                    className="w-32 h-32 object-cover border border-gray-300 rounded"
                  />
                </div>
              )}

              {errors.cancelled_cheque && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cancelled_cheque}
                </p>
              )}
              <span className="text-red-500 text-sm">
                कृपया 1 MB से कम आकार का JPEG, PNG, या PDF अपलोड करें।
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg transition-colors"
        >
          <TranslatableText text="पीछे/Back" />
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-[#903603] text-white rounded-lg transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <TranslatableText
            text={
              isSubmitting
                ? "Submitting..."
                : "सहेजें और पूरा करें/Save and Complete"
            }
          />
        </button>
      </div>
    </form>
  );
};

export default BankDetails;
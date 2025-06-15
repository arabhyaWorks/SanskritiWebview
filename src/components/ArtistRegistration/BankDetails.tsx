import React, { useState } from "react";
import { TranslatableText } from "../TranslatableText";

interface BankDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    account_holder_name: "",
    ifsc_code: "",
    account_number: "",
    confirm_account_number: "",
    bank_name: "",
    branch_name: "",
    cancelled_cheque: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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

    // Cancelled cheque: required
    if (!selectedFile) {
      newErrors.cancelled_cheque = "Cancelled cheque/passbook is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Simulate upload by setting a dummy URL
    handleChange(
      "cancelled_cheque",
      "https://upsanskriti.com/upload/users/1/applicantcancelledcheque/dummy.jpeg"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.log(payload);

      console.log(result);

      if (result.status == 1) {
        onNext();
      } else {
        setErrors({ api: result.msg || "Submission failed" });
      }
    } catch (error) {
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

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2'] border-b border-[#903603]/10 pb-4">
          <TranslatableText text="Artist's Bank Details" />
        </h2>

        <div className="text-red-500 mb-6 text-sm font-medium">
          <TranslatableText text="कृपया बैंकिंग विवरण सावधानी से भरें। किसी भी गलती के लिए आवेदक पूरी तरह से जिम्मेदार होगा।" />
          <br />
          <TranslatableText text="Note: Please fill banking details carefully. Applicant will be completely responsible in case of any mistake." />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-[#903603] font-bold">
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
              <label className="block mb-2 text-[#903603] font-bold">
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
              <label className="block mb-2 text-[#903603] font-bold">
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
              <label className="block mb-2 text-[#903603] font-bold">
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
              <label className="block mb-2 text-[#903603] font-bold">
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
              <label className="block mb-2 text-[#903603] font-bold">
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
            <label className="block mb-2 text-[#903603] font-bold">
              <TranslatableText text="रद्द चेक/पासबूक अपलोड करें/Upload Cancelled Cheque/Passbook" />
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,application/pdf"
              className="w-full p-3 border border-[#903603]/20 rounded-lg focus:outline-none focus:border-[#903603] bg-white/80"
              required
            />
            {selectedFile && (
              <p className="text-green-500 text-sm mt-1">
                File selected: {selectedFile.name}
              </p>
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

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <TranslatableText text="पीछे/Back" />
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-[#903603] text-white rounded-lg hover:bg-[#5A1616] transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <TranslatableText
            text={
              isSubmitting
                ? "Submitting..."
                : "सहेजें और आगे बढ़ें/Save and Next"
            }
          />
        </button>
      </div>
    </form>
  );
};

export default BankDetails;

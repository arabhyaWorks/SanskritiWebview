import React, { useState } from "react";
import {
  ChevronLeft,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import abstract from "../assets/abstract.png";
import backgroundImage from "../assets/VibhgaBG.avif";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

const ContestRegister: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"register" | "verify">(
    "register"
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "नाम आवश्यक है";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "नाम में केवल अक्षर और स्पेस हो सकते हैं";
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "मोबाइल नंबर आवश्यक है";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "मोबाइल नंबर 10 अंकों का होना चाहिए";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "ईमेल आवश्यक है";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "वैध ईमेल पता दर्ज करें";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "पासवर्ड आवश्यक है";
    } else if (formData.password.length < 8) {
      newErrors.password = "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए";
    }

    // Confirm password validation
    if (!formData.confirm_password) {
      newErrors.confirm_password = "पासवर्ड की पुष्टि आवश्यक है";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "पासवर्ड मेल नहीं खाते";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;



    setLoading(true);

    console.log("🔍 Registration form data:", formData);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/registration/register",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData),
        }
      );

      const result = await response.json();
      console.log("🔍 Registration request sent:", formData);
      console.log("🔍 Registration response:", result);

      if (result.status) {
        // Store form data for next step
        localStorage.setItem("registrationData", JSON.stringify(formData));
        setCurrentStep("verify");
      } else {
        // Handle specific errors
        if (result.message.includes("Email is already registered")) {
          setErrors({ email: "यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।" });
          setTimeout(() => setCurrentStep("register"), 2000);
        } else if (
          result.message.includes("Mobile number is already registered")
        ) {
          setErrors({
            mobile: "यह मोबाइल नंबर पहले से पंजीकृत है। कृपया लॉगिन करें।",
          });
          setTimeout(() => setCurrentStep("register"), 2000);
        } else {
          setErrors({ general: result.message || "पंजीकरण में त्रुटि हुई" });
        }
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBack = () => {
    navigate('/')
  };

  const goToLogin = () => {
    // setCurrentStep("register");
    navigate("/contest/login");

  };

  if (currentStep === "verify") {
    return (
      <OTPVerification
        formData={formData}
        onBack={() => setCurrentStep("register")}
        onSuccess={() => console.log("Navigate to login")}
      />
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
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={handleBack}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <h1 className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2">
            नया पंजीकरण
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto mt-4">
        <div className="bg-[#FFF8F0]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#903603]/10">
          <img
            src={abstract}
            alt="Registration Design"
            className="w-24 mx-auto mb-6 opacity-90"
          />

          <div className="text-center mb-8">
            <h2 className="text-[#903603] text-xl font-bold font-['Baloo_2'] mb-2">
              प्रतियोगिता में पंजीकरण करें
            </h2>
            <p className="text-[#5A1616]/80 text-sm">
              अपनी जानकारी दर्ज करके प्रतियोगिता में भाग लें
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">
                {errors.general}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <User className="w-4 h-4" />
                पूरा नाम *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white/80 border-2 ${
                  errors.name ? "border-red-300" : "border-[#903603]/20"
                } focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']`}
                placeholder="आपका पूरा नाम दर्ज करें"
              />
              {errors.name && (
                <p className="text-red-600 text-xs font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Phone className="w-4 h-4" />
                मोबाइल नंबर *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#903603] font-medium text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    handleChange(
                      "mobile",
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  className={`w-full pl-14 pr-4 py-3 rounded-xl bg-white/80 border-2 ${
                    errors.mobile ? "border-red-300" : "border-[#903603]/20"
                  } focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter'] tracking-wide`}
                  placeholder="मोबाइल नंबर दर्ज करें"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-600 text-xs font-medium">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ईमेल पता *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white/80 border-2 ${
                  errors.email ? "border-red-300" : "border-[#903603]/20"
                } focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']`}
                placeholder="आपका ईमेल पता दर्ज करें"
              />
              {errors.email && (
                <p className="text-red-600 text-xs font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                पासवर्ड *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/80 border-2 ${
                    errors.password ? "border-red-300" : "border-[#903603]/20"
                  } focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']`}
                  placeholder="पासवर्ड दर्ज करें (कम से कम 8 अक्षर)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903603]/60 hover:text-[#903603] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                पासवर्ड की पुष्टि करें *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={(e) =>
                    handleChange("confirm_password", e.target.value)
                  }
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/80 border-2 ${
                    errors.confirm_password
                      ? "border-red-300"
                      : "border-[#903603]/20"
                  } focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']`}
                  placeholder="पासवर्ड दोबारा दर्ज करें"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903603]/60 hover:text-[#903603] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-600 text-xs font-medium">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  पंजीकरण करें
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center pt-6 border-t border-[#903603]/10">
            <p className="text-sm text-[#5A1616]/70">
              पहले से खाता है?{" "}
              <button
                onClick={goToLogin}
                className="text-[#903603] font-medium hover:underline"
              >
                लॉगिन करें
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-[#903603]/60">
            पंजीकरण करके आप हमारी नियम और शर्तों से सहमत हैं
          </p>
        </div>
      </div>
    </div>
  );
};

// OTP Verification Component
const OTPVerification: React.FC<{
  formData: FormData;
  onBack: () => void;
  onSuccess: () => void;
}> = ({ formData, onBack, onSuccess }) => {
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    if (!mobileOtp || !emailOtp) {
      setError("कृपया दोनों OTP दर्ज करें");
      return;
    }

    if (mobileOtp.length !== 6 || emailOtp.length !== 6) {
      setError("OTP 6 अंकों का होना चाहिए");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/registration/postregister",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            ...formData,
            mobile_otp: mobileOtp,
            email_otp: emailOtp,
          }),
        }
      );

      const result = await response.json();

      if (result.status) {
        localStorage.removeItem("registrationData");
        onSuccess();
      } else {
        setError(result.message || "OTP सत्यापन में त्रुटि");
      }
    } catch (error) {
      setError("नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <h1 className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2">
            OTP सत्यापन
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto mt-4">
        <div className="bg-[#FFF8F0]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#903603]/10">
          <img
            src={abstract}
            alt="OTP Verification"
            className="w-24 mx-auto mb-6 opacity-90"
          />

          <div className="text-center mb-8">
            <h2 className="text-[#903603] text-xl font-bold font-['Baloo_2'] mb-2">
              OTP सत्यापन
            </h2>
            <p className="text-[#5A1616]/80 text-sm">
              आपके मोबाइल और ईमेल पर भेजे गए OTP दर्ज करें
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Mobile OTP */}
            <div className="space-y-3">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Phone className="w-4 h-4" />
                मोबाइल OTP
              </label>
              <input
                type="text"
                value={mobileOtp}
                onChange={(e) =>
                  setMobileOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full px-4 py-4 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-center text-2xl tracking-[0.5em] font-bold font-['Inter']"
                placeholder="******"
                maxLength={6}
              />
              <p className="text-sm text-[#903603]/70 text-center">
                {formData.mobile} पर भेजा गया
              </p>
            </div>

            {/* Email OTP */}
            <div className="space-y-3">
              <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ईमेल OTP
              </label>
              <input
                type="text"
                value={emailOtp}
                onChange={(e) =>
                  setEmailOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full px-4 py-4 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-center text-2xl tracking-[0.5em] font-bold font-['Inter']"
                placeholder="******"
                maxLength={6}
              />
              <p className="text-sm text-[#903603]/70 text-center">
                {formData.email} पर भेजा गया
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 active:scale-98 transition-all"
            >
              वापस
            </button>
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="flex-1 bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  सबमिट
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Resend Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[#903603]/70">OTP नहीं मिला?</p>
            <div className="flex justify-center gap-4">
              <button className="text-[#903603] font-medium hover:underline text-sm">
                मोबाइल OTP पुनः भेजें
              </button>
              <button className="text-[#903603] font-medium hover:underline text-sm">
                ईमेल OTP पुनः भेजें
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestRegister;

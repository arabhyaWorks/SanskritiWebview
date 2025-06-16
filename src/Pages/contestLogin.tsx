import React, { useState } from "react";
import {
  ChevronLeft,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import abstract from "../assets/abstract.png";
import backgroundImage from "../assets/VibhgaBG.avif";

type LoginMethod = "email" | "mobile";
type CurrentView = "login" | "forgot" | "reset" | "mobile-otp";

const ContestLogin: React.FC = () => {
    const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [currentView, setCurrentView] = useState<CurrentView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<any>(null);

  const clearErrors = () => setErrors({});

  // Email/Password Login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setErrors({ general: "कृपया ईमेल और पासवर्ड दर्ज करें" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/login/login",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email, password }),
        }
      );

      const result = await response.json();

      if (result.status) {
        localStorage.setItem("contestUser", JSON.stringify(result.userData));
        navigate("/contest/dashboard");

      } else {
        setErrors({ general: result.message || "लॉगिन में त्रुटि" });
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  // Mobile OTP Login - Step 1: Check mobile
  const handleMobileCheck = async () => {
    if (!mobile || mobile.length !== 10) {
      setErrors({ mobile: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/login/OptLoginMobileCheck",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ mobile }),
        }
      );

      const result = await response.json();
      console.log(result)

      if (result.status) {
        // Send OTP
        await sendMobileOtp();
      } else {
        setErrors({ mobile: "यह मोबाइल नंबर पंजीकृत नहीं है" });
      }
    } catch (error) {
        console.log(error)
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  // Send Mobile OTP
  const sendMobileOtp = async () => {
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Notification/mobileNotification",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            mobile,
            dlttype: "login",
            otp: otpCode,
          }),
        }
      );

      const result = await response.json();

      if (result.status) {
        localStorage.setItem("loginOtp", otpCode);
        setCurrentView("mobile-otp");
      } else {
        setErrors({ general: "OTP भेजने में त्रुटि" });
      }
    } catch (error) {
      setErrors({ general: "OTP भेजने में त्रुटि" });
    }
  };

  // Verify Mobile OTP and Login
  const handleMobileOtpLogin = async () => {
    const storedOtp = localStorage.getItem("loginOtp");

    if (otp !== storedOtp) {
      setErrors({ otp: "गलत OTP। कृपया पुनः प्रयास करें।" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/login/Otplogin",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ mobile }),
        }
      );

      const result = await response.json();

      if (result.status) {
        localStorage.setItem("contestUser", JSON.stringify(result.userData));
        localStorage.removeItem("loginOtp");
        navigate("/contest/dashboard");

      } else {
        setErrors({ general: result.message || "लॉगिन में त्रुटि" });
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password - Check Email
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setErrors({ email: "कृपया ईमेल दर्ज करें" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Login/forgotPasswordEmailChecking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email: forgotEmail }),
        }
      );

      const result = await response.json();

      if (result.status) {
        setUserData(result);
        // Send OTP to email
        await sendEmailOtp();
      } else {
        setErrors({ email: result.message || "ईमेल पंजीकृत नहीं है" });
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  // Send Email OTP
  const sendEmailOtp = async () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Notification/emailNotification",
        {
          method: "POST",
          headers: {
            Authorization: "BhatkhandeContest123#$&",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: forgotEmail,
            subject: "Password Reset OTP",
            body: `Your OTP for password reset is: ${otpCode}`,
          }),
        }
      );

      if (response.ok) {
        localStorage.setItem("resetOtp", otpCode);
        setCurrentView("reset");
      }
    } catch (error) {
      setErrors({ general: "OTP भेजने में त्रुटि" });
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    const storedOtp = localStorage.getItem("resetOtp");

    if (forgotOtp !== storedOtp) {
      setErrors({ otp: "गलत OTP" });
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrors({ password: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "पासवर्ड मेल नहीं खाते" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://contest.upsanskriti.com/contestapi/Login/updateForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotEmail,
            user_id: userData?.user_id,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (result.status) {
        localStorage.removeItem("resetOtp");
        setCurrentView("login");
        setErrors({
          success: "पासवर्ड सफलतापूर्वक बदल दिया गया। अब लॉगिन करें।",
        });
      } else {
        setErrors({ general: result.message || "पासवर्ड रीसेट में त्रुटि" });
      }
    } catch (error) {
      setErrors({ general: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentView === "login") {
      console.log("Navigate back to home");
    } else if (currentView === "mobile-otp") {
      setCurrentView("login");
      setOtp("");
    } else {
      setCurrentView("login");
      clearErrors();
    }
  };

  const goToRegister = () => {
    console.log("Navigate to register");
  };

  // Main Login View
  const renderLoginView = () => (
    <div className="space-y-6">
      {/* Login Method Toggle */}
      <div className="flex bg-[#903603]/10 rounded-xl p-1">
        <button
          onClick={() => {
            setLoginMethod("email");
            clearErrors();
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium font-['Baloo_2'] transition-all flex items-center justify-center gap-2 ${
            loginMethod === "email"
              ? "bg-[#903603] text-white shadow-sm"
              : "text-[#903603]"
          }`}
        >
          <Mail className="w-4 h-4" />
          ईमेल से लॉगिन
        </button>
        <button
          onClick={() => {
            setLoginMethod("mobile");
            clearErrors();
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium font-['Baloo_2'] transition-all flex items-center justify-center gap-2 ${
            loginMethod === "mobile"
              ? "bg-[#903603] text-white shadow-sm"
              : "text-[#903603]"
          }`}
        >
          <Phone className="w-4 h-4" />
          मोबाइल से लॉगिन
        </button>
      </div>

      {loginMethod === "email" ? (
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ईमेल पता
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearErrors();
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
              placeholder="आपका ईमेल पता दर्ज करें"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
              <Lock className="w-4 h-4" />
              पासवर्ड
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearErrors();
                }}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
                placeholder="पासवर्ड दर्ज करें"
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
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              onClick={() => setCurrentView("forgot")}
              className="text-[#903603] font-medium hover:underline text-sm"
            >
              पासवर्ड भूल गए?
            </button>
          </div>

          {/* Email Login Button */}
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                लॉगिन करें
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Field */}
          <div className="space-y-2">
            <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
              <Phone className="w-4 h-4" />
              मोबाइल नंबर
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#903603] font-medium text-sm">
                +91
              </span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                  clearErrors();
                }}
                className="w-full pl-14 pr-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter'] tracking-wide"
                placeholder="मोबाइल नंबर दर्ज करें"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-600 text-xs font-medium">
                {errors.mobile}
              </p>
            )}
          </div>

          {/* Mobile Login Button */}
          <button
            onClick={handleMobileCheck}
            disabled={loading}
            className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                OTP भेजें
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Mobile OTP View
  const renderMobileOtpView = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-[#903603] font-bold text-lg font-['Baloo_2']">
          OTP सत्यापन
        </h3>
        <p className="text-[#5A1616]/80 text-sm mt-2">
          {mobile} पर भेजे गए OTP को दर्ज करें
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
          OTP दर्ज करें
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
            clearErrors();
          }}
          className="w-full px-4 py-4 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-center text-2xl tracking-[0.5em] font-bold font-['Inter']"
          placeholder="******"
          maxLength={6}
        />
        {errors.otp && (
          <p className="text-red-600 text-xs font-medium text-center">
            {errors.otp}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 active:scale-98 transition-all"
        >
          वापस
        </button>
        <button
          onClick={handleMobileOtpLogin}
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

      <p className="text-center text-sm text-[#903603]/70">
        OTP नहीं मिला?{" "}
        <button
          onClick={sendMobileOtp}
          className="text-[#903603] font-medium hover:underline"
        >
          पुनः भेजें
        </button>
      </p>
    </div>
  );

  // Forgot Password View
  const renderForgotView = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-[#903603] font-bold text-lg font-['Baloo_2']">
          पासवर्ड भूल गए?
        </h3>
        <p className="text-[#5A1616]/80 text-sm mt-2">
          अपना ईमेल दर्ज करें। हम आपको OTP भेजेंगे।
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
          <Mail className="w-4 h-4" />
          ईमेल पता
        </label>
        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => {
            setForgotEmail(e.target.value);
            clearErrors();
          }}
          className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
          placeholder="पंजीकृत ईमेल पता दर्ज करें"
        />
        {errors.email && (
          <p className="text-red-600 text-xs font-medium">{errors.email}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 active:scale-98 transition-all"
        >
          वापस
        </button>
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="flex-1 bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              OTP भेजें
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Reset Password View
  const renderResetView = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-[#903603] font-bold text-lg font-['Baloo_2']">
          नया पासवर्ड सेट करें
        </h3>
        <p className="text-[#5A1616]/80 text-sm mt-2">
          पहले OTP सत्यापित करें, फिर नया पासवर्ड सेट करें
        </p>
      </div>

      <div className="space-y-4">
        {/* OTP Field */}
        <div className="space-y-2">
          <label className="block text-[#903603] font-bold text-sm font-['Baloo_2']">
            ईमेल OTP
          </label>
          <input
            type="text"
            value={forgotOtp}
            onChange={(e) => {
              setForgotOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              clearErrors();
            }}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all text-center text-xl tracking-[0.3em] font-bold font-['Inter']"
            placeholder="******"
            maxLength={6}
          />
          {errors.otp && (
            <p className="text-red-600 text-xs font-medium">{errors.otp}</p>
          )}
        </div>

        {/* New Password Field */}
        <div className="space-y-2">
          <label className="block text-[#903603] font-bold text-sm font-['Baloo_2'] flex items-center gap-2">
            <Lock className="w-4 h-4" />
            नया पासवर्ड
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              clearErrors();
            }}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
            placeholder="नया पासवर्ड दर्ज करें (कम से कम 8 अक्षर)"
          />
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
            पासवर्ड की पुष्टि करें
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearErrors();
            }}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-[#903603]/20 focus:border-[#903603] focus:outline-none focus:ring-2 focus:ring-[#903603]/20 transition-all font-['Inter']"
            placeholder="पासवर्ड दोबारा दर्ज करें"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 active:scale-98 transition-all"
        >
          वापस
        </button>
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="flex-1 bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              पासवर्ड रीसेट करें
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );

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
            {currentView === "login"
              ? "लॉगिन"
              : currentView === "forgot"
              ? "पासवर्ड भूल गए"
              : currentView === "reset"
              ? "पासवर्ड रीसेट"
              : "OTP सत्यापन"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto mt-4">
        <div className="bg-[#FFF8F0]/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#903603]/10">
          <img
            src={abstract}
            alt="Login Design"
            className="w-24 mx-auto mb-6 opacity-90"
          />

          <div className="text-center mb-8">
            <h2 className="text-[#903603] text-xl font-bold font-['Baloo_2'] mb-2">
              {currentView === "login"
                ? "प्रतियोगिता पोर्टल में स्वागत है"
                : currentView === "forgot"
                ? "पासवर्ड रिकवरी"
                : currentView === "reset"
                ? "नया पासवर्ड"
                : "मोबाइल सत्यापन"}
            </h2>
            <p className="text-[#5A1616]/80 text-sm">
              {currentView === "login"
                ? "अपने खाते में लॉगिन करें"
                : currentView === "forgot"
                ? "अपना पासवर्ड रीसेट करें"
                : currentView === "reset"
                ? "एक मजबूत पासवर्ड चुनें"
                : "OTP सत्यापन पूरा करें"}
            </p>
          </div>

          {/* Error/Success Messages */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">
                {errors.general}
              </p>
            </div>
          )}

          {errors.success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <User className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-green-700 text-sm font-medium">
                {errors.success}
              </p>
            </div>
          )}

          {/* Render Current View */}
          {currentView === "login" && renderLoginView()}
          {currentView === "mobile-otp" && renderMobileOtpView()}
          {currentView === "forgot" && renderForgotView()}
          {currentView === "reset" && renderResetView()}

          {/* Register Link - Only show on login view */}
          {currentView === "login" && (
            <div className="mt-8 text-center pt-6 border-t border-[#903603]/10">
              <p className="text-sm text-[#5A1616]/70">
                नया उपयोगकर्ता हैं?{" "}
                <button
                  onClick={goToRegister}
                  className="text-[#903603] font-medium hover:underline"
                >
                  पंजीकरण करें
                </button>
              </p>
            </div>
          )}

          {/* Terms - Only show on login view */}
          {currentView === "login" && (
            <p className="mt-6 text-center text-xs text-[#903603]/60">
              लॉगिन करके आप हमारी नियम और शर्तों से सहमत हैं
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestLogin;

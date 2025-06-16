import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Trophy,
  FileText,
  HelpCircle,
  AlertCircle,
  UserPlus,
} from "lucide-react";

const ContestDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock navigation function - replace with actual routing
  const navigate = (path) => {
    console.log("Navigate to:", path);
  };

  // Check authentication
  useEffect(() => {
    const contestUser = localStorage.getItem("contestUser");
    if (!contestUser) {
      navigate("/contest/login");
      return;
    }
    
    try {
      const user = JSON.parse(contestUser);
      setUserData(user);
    } catch (err) {
      localStorage.removeItem("contestUser");
      navigate("/contest/login");
    }
  }, []);

  // Fetch profile data
  const fetchProfileData = async () => {
    if (!userData?.user_id) return;

    try {
      const response = await fetch("https://upsanskriti.com/app/contest-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "BhatkhandeContest123#$&",
          user_id: userData.user_id,
        }),
      });

      const result = await response.json();
      
      if (result.status === 1) {
        setProfileData(result.data);
        checkProfileCompletion(result.data);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (err) {
      setError("Network error while fetching profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if profile is complete
  const checkProfileCompletion = (data) => {
    const requiredFields = [
      'date_of_birth',
      'father_name',
      'mother_name',
      'qualification',
      'experience',
      'aadhar_number',
      'pan_number',
      'group_or_solo'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      setShowProfileAlert(true);
    }
  };

  useEffect(() => {
    // Mock user data for demonstration
    const mockUser = {
      user_id: "11",
      role_id: "2",
      user_code: "AR00011",
      name: "Arabhaya",
      email: "arabhaya7907@gmail.com",
      mobile: "9453269956",
      address: "varanasi",
      photo: null,
      country_id: "105",
      state_id: "23",
      city_id: "585",
      pincode: "221010"
    };
    
    setUserData(mockUser);
    setTimeout(() => {
      setLoading(false);
      setShowProfileAlert(true); // Show alert for incomplete profile
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("contestUser");
    navigate("/contest/login");
  };

  const tabs = [
    {
      key: "overview",
      label: "अवलोकन",
      icon: <User className="w-5 h-5" />,
    },
    {
      key: "participate",
      label: "भाग लें",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      key: "participations",
      label: "मेरी भागीदारी",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      key: "queries",
      label: "प्रश्न पूछें",
      icon: <HelpCircle className="w-5 h-5" />,
    },
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
        className="fixed inset-0 w-full h-full opacity-10"
        style={{
          backgroundImage: "linear-gradient(45deg, #5A1616 25%, transparent 25%), linear-gradient(-45deg, #5A1616 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #5A1616 75%), linear-gradient(-45deg, transparent 75%, #5A1616 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          zIndex: -1,
        }}
      />

      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center justify-between gap-3 p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-1 bg-black/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#5A1616] transition-transform" />
            </button>
            <h1 className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2">
              प्रतियोगिता डैशबोर्ड
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            लॉगआउट
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-t border-[#5A1616]/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-0 px-4 py-4 text-sm font-medium font-['Baloo_2'] transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-[#5A1616] bg-[#5A1616]/5 text-[#5A1616]"
                  : "border-transparent text-[#5A1616]/60"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm font-['Baloo_2']">{error}</p>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* User Profile Card */}
            {userData && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#5A1616]/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                    {userData.photo ? (
                      <img
                        src={userData.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-[#5A1616]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#5A1616] font-['Baloo_2'] mb-1">
                      {userData.name}
                    </h2>
                    <p className="text-sm text-[#5A1616]/60 mb-2">
                      कोड: {userData.user_code}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#5A1616]/60" />
                        <span className="text-sm text-[#5A1616]/80">
                          {userData.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#5A1616]/60" />
                        <span className="text-sm text-[#5A1616]/80">
                          {userData.mobile}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#5A1616]/60" />
                        <span className="text-sm text-[#5A1616]/80">
                          {userData.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/contest/profile")}
                    className="flex-1 bg-[#5A1616] text-white py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    प्रोफ़ाइल देखें
                  </button>
                  <button
                    onClick={() => navigate("/contest/profile")}
                    className="flex-1 bg-white text-[#5A1616] py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform border border-[#5A1616] flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    प्रोफ़ाइल संपादित करें
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
              <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
                त्वरित कार्य
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("participate")}
                  className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-xl text-left hover:shadow-md transition-all border border-orange-200/70"
                >
                  <Trophy className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-orange-800 font-['Baloo_2']">
                    प्रतियोगिता में भाग लें
                  </h4>
                  <p className="text-sm text-orange-700">
                    नई प्रतियोगिता में अपना पंजीकरण करें
                  </p>
                </button>
                <button
                  onClick={() => setActiveTab("participations")}
                  className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl text-left hover:shadow-md transition-all border border-blue-200/70"
                >
                  <FileText className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-blue-800 font-['Baloo_2']">
                    मेरी भागीदारी
                  </h4>
                  <p className="text-sm text-blue-700">
                    अपनी पिछली भागीदारी देखें
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Participate Tab */}
        {activeTab === "participate" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              प्रतियोगिता में भाग लें
            </h3>
            <p className="text-[#5A1616]/80 text-center py-8">जल्द ही आ रहा है...</p>
          </div>
        )}

        {/* My Participations Tab */}
        {activeTab === "participations" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              मेरी भागीदारी
            </h3>
            <p className="text-[#5A1616]/80 text-center py-8">जल्द ही आ रहा है...</p>
          </div>
        )}

        {/* Queries Tab */}
        {activeTab === "queries" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              प्रश्न पूछें
            </h3>
            <p className="text-[#5A1616]/80 text-center py-8">जल्द ही आ रहा है...</p>
          </div>
        )}

        {/* Profile Completion Alert Modal */}
        {showProfileAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-[#5A1616]/10">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2']">
                    प्रोफ़ाइल अपूर्ण
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-[#5A1616]/80 font-['Baloo_2']">
                    कृपया प्रतियोगिता में भाग लेने के लिए अपनी प्रोफ़ाइल पूरी करें।
                  </p>

                  <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800 font-['Baloo_2']">
                      सभी आवश्यक जानकारी भरना अनिवार्य है।
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProfileAlert(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform"
                  >
                    बाद में
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileAlert(false);
                      navigate("/contest/profile");
                    }}
                    className="flex-1 bg-[#5A1616] text-white py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform"
                  >
                    प्रोफ़ाइल पूरा करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDashboard;
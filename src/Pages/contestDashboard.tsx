import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  Trophy, 
  Upload, 
  Calendar, 
  FileText, 
  Download,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Award,
  Users,
  Settings,
  LogOut
} from "lucide-react";

import abstract from "../assets/abstract.png";
import backgroundImage from "../assets/VibhgaBG.avif";

interface UserData {
  user_id: string;
  role_id: string;
  user_code: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  photo: string | null;
  country_id: string;
  state_id: string;
  city_id: string;
  pincode: string;
}

interface ContestType {
  id: string;
  contest_name: string;
  status: string;
}

interface ParticipatedContest {
  contest_id: string;
  unique_id: string;
  contest_type_id: string;
  contest_type: string;
  pdf_url: string;
  status: string;
  device_type: string;
  created_date: string;
}

const ContestDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [contest, setContest] = useState<ContestType | null>(null);
  const [participatedContests, setParticipatedContests] = useState<ParticipatedContest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'participated'>('available');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {

    const data = localStorage.getItem("contestUser");
    setUserData(data);
    fetchContestData();
    fetchParticipatedContests(data.user_id);
  }, []);

  const fetchContestData = async () => {
    try {
      const response = await fetch("https://contest.upsanskriti.com/contestapi/Contest/getContestTypeData", {
        method: "POST",
        headers: {
          "Authorization": "BhatkhandeContest123#$&",
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      if (result.status && result.data && result.data.length > 0) {
        setContest(result.data[0]); // Since there's only one contest
      }
    } catch (error) {
      console.error("Error fetching contest data:", error);
      setError("प्रतियोगिता डेटा लोड करने में त्रुटि");
    }
  };

  const fetchParticipatedContests = async (userId: string) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);

      const response = await fetch("https://contest.upsanskriti.com/contestapi/Contest/getUserParticipatedContests", {
        method: "POST",
        headers: {
          "Authorization": "BhatkhandeContest123#$&"
        },
        body: formData
      });

      const result = await response.json();
      if (result.status) {
        if (result.message === "No contest participation found.") {
          setParticipatedContests([]);
        } else {
          setParticipatedContests(result.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching participated contests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError("केवल PDF फाइल अपलोड करें");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError("फाइल का साइज 5MB से कम होना चाहिए");
        return;
      }
      setUploadFile(file);
      setError("");
    }
  };

  const handleParticipate = async () => {
    if (!contest || !uploadFile || !userData) {
      setError("कृपया फाइल अपलोड करें");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('user_id', userData.user_id);
      formData.append('contest_type_id', contest.id);
      formData.append('document', uploadFile);

      const response = await fetch("https://contest.upsanskriti.com/contestapi/Contest/participateContest", {
        method: "POST",
        headers: {
          "Authorization": "BhatkhandeContest123#$&"
        },
        body: formData
      });

      const result = await response.json();
      if (result.status) {
        setUploadFile(null);
        setSuccess("प्रतियोगिता में सफलतापूर्वक भाग लिया गया!");
        fetchParticipatedContests(userData.user_id);
        setActiveTab('participated');
        
        // Clear file input
        const fileInput = document.getElementById('document-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setError(result.message || "प्रतियोगिता में भाग लेने में त्रुटि");
      }
    } catch (error) {
      setError("नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const hasParticipated = contest && participatedContests.some(
    p => p.contest_type_id === contest.id
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A1616] mx-auto mb-4"></div>
          <p className="text-[#5A1616] font-['Baloo_2']">डेटा लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      {/* Background Image */}
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
              onClick={() => console.log("Navigate back")}
              className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
            </button>
            <h1 className="text-[#5A1616] text-2xl font-bold font-['Inter']">
              प्रतियोगिता डैशबोर्ड
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-50 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* User Profile Section */}
        {userData && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#5A1616]/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {userData.photo ? (
                  <img
                    src={userData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-[#5A1616]" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-1">
                  {userData.name}
                </h2>
                <p className="text-sm text-[#5A1616]/60 mb-1">
                  कोड: {userData.user_code}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#5A1616]/60">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{userData.mobile}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#5A1616]/10 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 px-6 py-4 font-medium font-['Baloo_2'] transition-all border-b-2 ${
                activeTab === 'available'
                  ? "border-[#5A1616] bg-[#5A1616]/5 text-[#5A1616]"
                  : "border-transparent text-[#5A1616]/60"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                उपलब्ध प्रतियोगिता
              </div>
            </button>
            <button
              onClick={() => setActiveTab('participated')}
              className={`flex-1 px-6 py-4 font-medium font-['Baloo_2'] transition-all border-b-2 ${
                activeTab === 'participated'
                  ? "border-[#5A1616] bg-[#5A1616]/5 text-[#5A1616]"
                  : "border-transparent text-[#5A1616]/60"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5" />
                भाग लिया गया
                {participatedContests.length > 0 && (
                  <span className="bg-[#5A1616] text-white text-xs px-2 py-1 rounded-full">
                    {participatedContests.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-green-700 text-sm font-medium">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Available Contest Tab */}
        {activeTab === 'available' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              उपलब्ध प्रतियोगिता
            </h3>
            
            {contest ? (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#5A1616]/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-[#5A1616] font-['Baloo_2'] text-lg mb-2">
                        {contest.contest_name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          contest.status === "1" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {contest.status === "1" ? "सक्रिय" : "निष्क्रिय"}
                        </span>
                        {hasParticipated && (
                          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                            भाग लिया गया
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  {!hasParticipated && contest.status === "1" && (
                    <div className="mt-6 pt-6 border-t border-[#5A1616]/10">
                      <h4 className="font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
                        डॉक्यूमेंट अपलोड करें
                      </h4>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-[#903603]/30 rounded-xl p-6 text-center">
                          <Upload className="w-12 h-12 text-[#903603]/50 mx-auto mb-3" />
                          <p className="text-[#5A1616]/80 mb-2 font-['Baloo_2']">
                            अपनी प्रतिस्पर्धा फाइल अपलोड करें
                          </p>
                          <p className="text-xs text-[#5A1616]/60 mb-4">
                            केवल PDF फाइल, अधिकतम 5MB
                          </p>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="document-upload"
                          />
                          <label
                            htmlFor="document-upload"
                            className="inline-block bg-[#903603] text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#5A1616] transition-colors"
                          >
                            फाइल चुनें
                          </label>
                        </div>

                        {uploadFile && (
                          <div className="bg-[#903603]/10 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-[#903603]" />
                              <div>
                                <p className="text-sm font-medium text-[#5A1616]">{uploadFile.name}</p>
                                <p className="text-xs text-[#5A1616]/60">
                                  {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setUploadFile(null)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        <button
                          onClick={handleParticipate}
                          disabled={!uploadFile || uploading}
                          className="w-full bg-[#903603] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5A1616] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#903603]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          ) : (
                            <>
                              प्रतियोगिता में भाग लें
                              <Upload className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {hasParticipated && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">आपने इस प्रतियोगिता में पहले ही भाग लिया है</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-[#5A1616]/40 mx-auto mb-4" />
                <p className="text-[#5A1616]/60 font-['Baloo_2']">
                  कोई प्रतियोगिता उपलब्ध नहीं है
                </p>
              </div>
            )}
          </div>
        )}

        {/* Participated Contests Tab */}
        {activeTab === 'participated' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              भाग लिया गया प्रतियोगिता
            </h3>
            
            {participatedContests.length > 0 ? (
              <div className="space-y-4">
                {participatedContests.map((contest) => (
                  <div
                    key={contest.contest_id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-[#5A1616]/5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#5A1616] font-['Baloo_2'] mb-1">
                          {contest.contest_type}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-[#5A1616]/60">
                            ID: {contest.unique_id}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contest.status === "1" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {contest.status === "1" ? "सक्रिय" : "निष्क्रिय"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#5A1616]/60">
                          <Calendar className="w-3 h-3" />
                          <span>भेजा गया: {formatDate(contest.created_date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          सबमिट किया गया
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(contest.pdf_url, '_blank')}
                        className="flex-1 bg-[#903603] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5A1616] transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        फाइल देखें
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = contest.pdf_url;
                          link.download = `contest_${contest.unique_id}.pdf`;
                          link.click();
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        डाउनलोड करें
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-[#5A1616]/40 mx-auto mb-4" />
                <p className="text-[#5A1616]/60 font-['Baloo_2']">
                  आपने अभी तक किसी प्रतियोगिता में भाग नहीं लिया है
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
            त्वरित कार्य
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => console.log("Navigate to profile")}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-left hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 font-['Baloo_2']">
                    प्रोफ़ाइल संपादित करें
                  </h4>
                  <p className="text-xs text-blue-600">
                    अपनी जानकारी अपडेट करें
                  </p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => console.log("Navigate to help")}
              className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-left hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-orange-700 font-['Baloo_2']">
                    सहायता केंद्र
                  </h4>
                  <p className="text-xs text-orange-600">
                    मदद और समर्थन पाएं
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDashboard;
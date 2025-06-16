import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  UserCog,
  Calendar,
  History,
  CalendarCheck,
  User,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { TranslatableText } from "./TranslatableText";
import abstract from "../assets/abstract.png";
import backgroundImage from "../assets/VibhgaBG.avif";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

interface ArtistData {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  full_name: string;
  email: string;
  mobile: string;
  address: string;
  applicant_photo?: string;
  work_experience: string;
  presentation_level: string;
  art_cat_id: number;
  is_final_data: number;
}

interface InvitationData {
  id: number;
  event_id: number;
  user_id: number;
  invitation_status: number; // 0 - pending, 1 - accepted, 2 - rejected
  action_on_invitation: number;
  action_on_invitation_date_time?: string;
  created_date: string;
  event_title: string;
  event_code_id: string;
  start_date_time: string;
  end_date_time: string;
  events_venue: string;
}

interface ApiResponse<T> {
  status: number;
  msg: string;
  data: T;
}

type TabType = "all" | "accepted" | "participated" | "rejected";

const ArtistHome: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("artistId") || "10060";

  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [missingDataSets, setMissingDataSets] = useState<string[]>([]);

  // Function to check profile completion
  const checkProfileCompletion = (data: any) => {
    //console.log("🔍 Starting profile completion check for user:", data.id);
    //console.log("📊 User data received:", data);

    // Check if user has only mobile number (new user)
    const hasOnlyMobile =
      data.mobile &&
      !data.first_name &&
      !data.email &&
      !data.address &&
      !data.art_cat_id &&
      !data.account_holder_name;

    //console.log("📱 New user check (only mobile):", hasOnlyMobile);
    // console.log(
    //   "📱 Mobile:",
    //   !!data.mobile,
    //   "First name:",
    //   !!data.first_name,
    //   "Email:",
    //   !!data.email,
    //   "Address:",
    //   !!data.address,
    //   "Art cat:",
    //   !!data.art_cat_id,
    //   "Account holder:",
    //   !!data.account_holder_name
    // );

    if (hasOnlyMobile) {
      //console.log("🔄 New user detected - redirecting to profile page");
      navigate("/profile");
      return;
    }

    // Check basic details completion
    const basicDetailsComplete =
      data.individual_or_organization &&
      data.aadhar_number &&
      data.pan_number &&
      data.first_name &&
      data.gender &&
      data.address &&
      data.state &&
      data.city &&
      data.zipcode &&
      data.member_in_team;
    //  &&
    // data.date_of_birth;

    //console.log("✅ Basic details check:", basicDetailsComplete);
    // console.log("📋 Basic details breakdown:", {
    //   individual_or_organization: !!data.individual_or_organization,
    //   aadhar_number: !!data.aadhar_number,
    //   pan_number: !!data.pan_number,
    //   first_name: !!data.first_name,
    //   gender: !!data.gender,
    //   address: !!data.address,
    //   state: !!data.state,
    //   city: !!data.city,
    //   zipcode: !!data.zipcode,
    //   member_in_team: !!data.member_in_team,
    //   date_of_birth: !!data.date_of_birth,
    // });

    // Check art details completion
    const artDetailsComplete = data.art_cat_id && data.work_experience;

    // console.log("🎨 Art details check:", artDetailsComplete);
    // console.log("🎨 Art details breakdown:", {
    //   art_cat_id: !!data.art_cat_id,
    //   work_experience: !!data.work_experience,
    // });

    // Check bank details completion
    const bankDetailsComplete =
      data.account_holder_name &&
      data.ifsc_code &&
      data.account_number &&
      data.bank_name &&
      data.branch_name &&
      data.cancelled_cheque;

    // console.log("🏦 Bank details check:", bankDetailsComplete);
    // console.log("🏦 Bank details breakdown:", {
    //   account_holder_name: !!data.account_holder_name,
    //   ifsc_code: !!data.ifsc_code,
    //   account_number: !!data.account_number,
    //   bank_name: !!data.bank_name,
    //   branch_name: !!data.branch_name,
    //   cancelled_cheque: !!data.cancelled_cheque,
    // });

    const missing = [];
    if (!basicDetailsComplete) missing.push("कलाकार बुनियादी विवरण");
    if (!artDetailsComplete) missing.push("कला विवरण");
    if (!bankDetailsComplete) missing.push("बैंक विवरण");

    // console.log("❌ Missing data sets:", missing);
    // console.log("📋 Profile completion summary:", {
    //   basicComplete: basicDetailsComplete,
    //   artComplete: artDetailsComplete,
    //   bankComplete: bankDetailsComplete,
    //   totalMissing: missing.length,
    // });

    if (missing.length > 0) {
      // console.log("⚠️ Profile incomplete - showing alert modal");
      setMissingDataSets(missing);
      setShowProfileAlert(true);
    } else {
      console.log("✅ Profile is complete - no action needed");
    }
  };

  useEffect(() => {
    const artistId = localStorage.getItem("artistId");
    const artistMobile = localStorage.getItem("artistMobile");

    if (!artistId || !artistMobile) {
      navigate("/artist-login");
      return;
    }
  }, [navigate]);

  const fetchArtistData = async () => {
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/artist-dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            id: userId,
          }),
        }
      );

      const result: ApiResponse<ArtistData> = await response.json();
      if (result.status == 1) {
        setArtistData(result.data);
        checkProfileCompletion(result.data);
      } else {
        setError("Failed to fetch artist data");
      }
    } catch (err) {
      setError("Network error while fetching artist data");
      console.error("Error fetching artist data:", err);
    }
  };

  const fetchInvitations = async () => {
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/artist-invitation-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            user_id: userId,
          }),
        }
      );

      const result: ApiResponse<InvitationData[]> = await response.json();

      if (result.status == 1) {
        setInvitations(result.data);
      } else {
        setError("Failed to fetch invitations");
      }
    } catch (err) {
      console.error("Error fetching invitations:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchArtistData(), fetchInvitations()]);
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const isEventPassed = (endDateTime: string): boolean => {
    const currentDate = new Date();
    const eventDate = new Date(endDateTime);
    return eventDate < currentDate;
  };

  const getFilteredInvitations = (): InvitationData[] => {
    switch (activeTab) {
      case "all":
        return invitations;
      case "accepted":
        return invitations.filter(
          (inv) =>
            inv.invitation_status === 1 && !isEventPassed(inv.end_date_time)
        );
      case "participated":
        return invitations.filter(
          (inv) =>
            inv.invitation_status === 1 && isEventPassed(inv.end_date_time)
        );
      case "rejected":
        return invitations.filter((inv) => inv.invitation_status === 2);
      default:
        return invitations;
    }
  };

  const getInvitationStats = () => {
    const total = invitations.length;
    const pending = invitations.filter(
      (inv) => inv.invitation_status === 0
    ).length;
    const accepted = invitations.filter(
      (inv) => inv.invitation_status === 1 && !isEventPassed(inv.end_date_time)
    ).length;
    const participated = invitations.filter(
      (inv) => inv.invitation_status === 1 && isEventPassed(inv.end_date_time)
    ).length;
    const rejected = invitations.filter(
      (inv) => inv.invitation_status === 2
    ).length;

    return { total, pending, accepted, participated, rejected };
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 1:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 2:
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (invitation: InvitationData) => {
    if (
      invitation.invitation_status === 1 &&
      isEventPassed(invitation.end_date_time)
    ) {
      return "भाग लिया";
    }

    switch (invitation.invitation_status) {
      case 0:
        return "लंबित";
      case 1:
        return "स्वीकृत";
      case 2:
        return "अस्वीकृत";
      default:
        return "अज्ञात";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInvitationClick = (invitation: InvitationData) => {
    navigate(`/events/${invitation.event_id}`, {
      state: { invitationId: invitation.id, eventId: invitation.event_id },
    });
  };

  const tabs = [
    {
      key: "all" as TabType,
      label: "सभी निमंत्रण",
      count: getInvitationStats().total,
    },
    {
      key: "accepted" as TabType,
      label: "स्वीकृत निमंत्रण",
      count: getInvitationStats().accepted,
    },
    {
      key: "participated" as TabType,
      label: "भाग लिए गए",
      count: getInvitationStats().participated,
    },
    {
      key: "rejected" as TabType,
      label: "अस्वीकृत निमंत्रण",
      count: getInvitationStats().rejected,
    },
  ];

  const menuItems = [
    {
      icon: <History className="w-6 h-6" />,
      title: "पिछले कार्यक्रम",
      description: "अपने पिछले कार्यक्रमों को देखें",
      color: "bg-purple-500",
      onClick: () => navigate("/artist/past-events"),
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "आगामी कार्यक्रम",
      description: "आने वाले कार्यक्रमों की जानकारी",
      color: "bg-orange-500",
      onClick: () => navigate("/artist/upcoming-events"),
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

  const stats = getInvitationStats();
  const filteredInvitations = getFilteredInvitations();

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
            onClick={() => navigate("/")}
            className="p-1 bg-black/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 transition-transform" />
          </button>
          <TranslatableText
            text="कलाकार डैशबोर्ड"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Artist Profile Section */}
        {artistData && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#5A1616]/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {artistData.applicant_photo ? (
                  <img
                    src={`https://upsanskriti.com${artistData.applicant_photo}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-[#5A1616]" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#5A1616] font-['Baloo_2'] mb-1">
                  {artistData.full_name}
                </h2>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#5A1616]/60" />
                    <span className="text-sm text-[#5A1616]/80">
                      {artistData.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5A1616]/60" />
                    <span className="text-sm text-[#5A1616]/80">
                      {artistData.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#5A1616]/60" />
                    <span className="text-sm text-[#5A1616]/80">
                      {artistData.mobile}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 bg-[#5A1616] text-white py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                प्रोफ़ाइल देखें
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 bg-white text-[#5A1616] py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform border border-[#5A1616] flex items-center justify-center gap-2"
              >
                <UserCog className="w-4 h-4" />
                प्रोफ़ाइल संपादित करें
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4 text-center">
            <TranslatableText text="निमंत्रण सांख्यिकी" />
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 text-center shadow-sm border border-blue-200/70">
              <div className="text-2xl font-bold text-blue-600 font-['Inter']">
                {stats.total}
              </div>
              <div className="text-sm font-medium text-blue-700 font-['Baloo_2']">
                कुल निमंत्रण
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 text-center shadow-sm border border-green-200/70">
              <div className="text-2xl font-bold text-green-600 font-['Inter']">
                {stats.accepted}
              </div>
              <div className="text-sm font-medium text-green-700 font-['Baloo_2']">
                स्वीकृत
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 text-center shadow-sm border border-purple-200/70">
              <div className="text-2xl font-bold text-purple-600 font-['Inter']">
                {stats.participated}
              </div>
              <div className="text-sm font-medium text-purple-700 font-['Baloo_2']">
                भाग लिए
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-4 text-center shadow-sm border border-red-200/70">
              <div className="text-2xl font-bold text-red-600 font-['Inter']">
                {stats.rejected}
              </div>
              <div className="text-sm font-medium text-red-700 font-['Baloo_2']">
                अस्वीकृत
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#5A1616]/10 overflow-hidden">
          <div className="flex overflow-x-auto">
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
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.key
                        ? "bg-[#5A1616] text-white"
                        : "bg-[#5A1616]/10 text-[#5A1616]/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Invitations List */}
        {filteredInvitations.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              <TranslatableText text="निमंत्रण सूची" />
            </h3>
            <div className="space-y-4">
              {filteredInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#5A1616]/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-[#5A1616] font-['Baloo_2'] mb-1">
                        {invitation.event_title}
                      </h4>
                      <p className="text-sm text-[#5A1616]/60 mb-1">
                        कोड: {invitation.event_code_id}
                      </p>
                      <p className="text-sm text-[#5A1616]/80">
                        स्थान: {invitation.events_venue}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invitation.invitation_status)}
                      <span className="text-sm font-medium">
                        {getStatusText(invitation)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-[#5A1616]/60">
                      <div>
                        दिनांक: {formatDate(invitation.start_date_time)}
                      </div>
                      <div>निमंत्रण: {formatDate(invitation.created_date)}</div>
                    </div>
                    <button
                      onClick={() => handleInvitationClick(invitation)}
                      className="bg-[#5A1616] text-white px-4 py-2 rounded-lg text-sm font-medium font-['Baloo_2'] active:scale-95 transition-transform"
                    >
                      विवरण देखें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-[#5A1616]/40 mx-auto mb-4" />
              <p className="text-[#5A1616]/60 font-['Baloo_2']">
                इस श्रेणी में कोई निमंत्रण नहीं मिला
              </p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />

          <div className="grid gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-white rounded-xl p-6 shadow-md transition-all border border-[#903603]/10 text-left flex items-center gap-4 active:scale-[0.99]"
              >
                <div
                  className={`${item.color} p-3 rounded-xl text-white transition-transform`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#5A1616] mb-1 font-['Baloo_2']">
                    <TranslatableText text={item.title} />
                  </h3>
                  <p className="text-sm text-[#5A1616]/70">
                    <TranslatableText text={item.description} />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm font-['Baloo_2']">{error}</p>
          </div>
        )}

        {/* Profile Completion Alert Modal */}
        {showProfileAlert && (
          <div className="fixed top-[-50px] inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
                    निम्नलिखित विवरण अपूर्ण हैं:
                  </p>

                  {missingDataSets.map((dataSet, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-[#5A1616] font-['Baloo_2']">
                        {dataSet}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800 font-['Baloo_2']">
                      कृपया अपने कलाकार पंजीकरण और सत्यापन को पूरा करने के लिए
                      तीनों सेट के सभी डेटा प्रदान करें।
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
                      navigate("/profile");
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

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default ArtistHome;

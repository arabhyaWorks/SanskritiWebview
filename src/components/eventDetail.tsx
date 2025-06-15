import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  IndianRupee,
  FileText,
  Building,
  Target,
  MapPinIcon,
  Palette,
  Tag,
} from "lucide-react";
import { TranslatableText } from "./TranslatableText";
import Footer from "./Footer";
import backgroundImage from "../assets/VibhgaBG.avif";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const artCategories = [
  {
    id: "1",
    title: "Classical dance",
    status: "1",
    is_deleted: "0",
    created_date: "2025-06-03 03:47:07",
  },
  {
    id: "2",
    title: "Folk dance",
    status: "1",
    is_deleted: "0",
    created_date: "2025-06-03 03:47:25",
  },
];

const artSubCategories = [
  {
    id: "1",
    cat_id: "1",
    title: "Kathak - कथक",
    status: "1",
    is_deleted: "0",
    created_date: "2025-06-03 04:15:59",
  },
  {
    id: "2",
    cat_id: "1",
    title: "Bharatanatyam - भरतनाट्यम",
    status: "1",
    is_deleted: "0",
    created_date: "2025-06-03 04:16:16",
  },
];



interface EventData {
  id: number;
  event_code_id: string;
  event_title: string;
  art_cat_id?: number;
  art_sub_cat_id?: number;
  organizing_dept_id: number;
  assistant_dept_name?: string;
  start_date_time: string;
  end_date_time: string;
  events_venue: string;
  purpose_of_event: string;
  allocated_budget: number;
  opportunity_to_organise_event: string;
  description?: string;
  event_city: number;
  status: number;
  is_deleted: number;
  invitation_counter: number;
  created_date: string;
}

interface InvitationStatusData {
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

const EventDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const userId = localStorage.getItem("artistId") || "10060";

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [invitationStatus, setInvitationStatus] =
    useState<InvitationStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getArtCategoryName = (catId: string) => {
    if (!catId) return "";

    const category = artCategories.find((c) => c.id === catId.toString());
    return category ? category.title : "";
  };

  const getArtSubCategoryName = (subCatId: number) => {
    if (!subCatId) return "";
    const subCategory = artSubCategories.find(
      (c) => c.id === subCatId.toString()
    );
    return subCategory ? subCategory.title : "";
  };

  // Get invitation ID from navigation state
  const invitationId = location.state?.invitationId;

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/event-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            event_id: eventId,
          }),
        }
      );

      const result: ApiResponse<EventData> = await response.json();
      if (result.status === 1) {
        setEventData(result.data);
      } else {
        setError("Failed to fetch event details");
      }
    } catch (err) {
      setError("Network error while fetching event details");
      console.error("Error fetching event details:", err);
    }
  };

  const fetchInvitationStatus = async () => {
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/event-invitation-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            user_id: userId,
            event_id: eventId,
          }),
        }
      );

      const result: ApiResponse<InvitationStatusData> = await response.json();
      if (result.status === 1) {
        setInvitationStatus(result.data);
      } else {
        setError("Failed to fetch invitation status");
      }
    } catch (err) {
      setError("Network error while fetching invitation status");
      console.error("Error fetching invitation status:", err);
    }
  };

  const handleInvitationAction = async (status: number) => {
    if (!invitationId) {
      setError("Invitation ID not found");
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(
        "https://upsanskriti.com/app/event-invitation-action",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: "cultureapisanindiatoken",
            invitation_id: invitationId.toString(),
            invitation_status: status.toString(),
          }),
        }
      );

      const result: ApiResponse<any> = await response.json();
      if (result.status === 1) {
        // Refresh invitation status after action
        await fetchInvitationStatus();
      } else {
        setError("Failed to update invitation status");
      }
    } catch (err) {
      setError("Network error while updating invitation");
      console.error("Error updating invitation:", err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEventDetails(), fetchInvitationStatus()]);
      setLoading(false);
    };

    if (eventId) {
      loadData();
    }
  }, [eventId, userId]);

  const isEventPassed = (endDateTime: string): boolean => {
    const currentDate = new Date();
    const eventDate = new Date(endDateTime);
    return eventDate < currentDate;
  };

  const getStatusInfo = () => {
    if (!invitationStatus)
      return {
        text: "अज्ञात",
        icon: <AlertCircle className="w-5 h-5 text-gray-500" />,
        color: "gray",
      };

    const eventPassed = isEventPassed(invitationStatus.end_date_time);

    if (invitationStatus.invitation_status === 1 && eventPassed) {
      return {
        text: "समाप्त कार्यक्रम",
        icon: <CheckCircle className="w-5 h-5 text-purple-500" />,
        color: "purple",
      };
    }

    switch (invitationStatus.invitation_status) {
      case 0:
        return {
          text: "लंबित",
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          color: "yellow",
        };
      case 1:
        return {
          text: "स्वीकृत",
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          color: "green",
        };
      case 2:
        return {
          text: "अस्वीकृत",
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          color: "red",
        };
      default:
        return {
          text: "अज्ञात",
          icon: <AlertCircle className="w-5 h-5 text-gray-500" />,
          color: "gray",
        };
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const statusInfo = getStatusInfo();
  const canTakeAction =
    invitationStatus?.invitation_status === 0 &&
    !isEventPassed(invitationStatus?.end_date_time || "");

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
            text="कार्यक्रम विवरण"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Event Header */}
        {eventData && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-[#5A1616] font-['Baloo_2'] mb-2">
                  {eventData.event_title}
                </h1>
                <p className="text-sm text-[#5A1616]/60 mb-1">
                  कोड: {eventData.event_code_id}
                </p>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-${statusInfo.color}-50 border border-${statusInfo.color}-200`}
              >
                {statusInfo.icon}
                <span
                  className={`text-sm font-medium text-${statusInfo.color}-700`}
                >
                  {statusInfo.text}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Event Details */}
        {eventData && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              <TranslatableText text="कार्यक्रम जानकारी" />
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                <div>
                  <p className="text-sm font-medium text-[#5A1616]/80">तारीख</p>
                  <p className="text-sm text-[#5A1616]">
                    {formatDate(eventData.start_date_time)}
                    {eventData.start_date_time !== eventData.end_date_time &&
                      ` - ${formatDate(eventData.end_date_time)}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                <div>
                  <p className="text-sm font-medium text-[#5A1616]/80">स्थान</p>
                  <p className="text-sm text-[#5A1616]">
                    {eventData.events_venue}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                <div>
                  <p className="text-sm font-medium text-[#5A1616]/80">
                    उद्देश्य
                  </p>
                  <p className="text-sm text-[#5A1616]">
                    {eventData.purpose_of_event}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                <div>
                  <p className="text-sm font-medium text-[#5A1616]/80">अवसर</p>
                  <p className="text-sm text-[#5A1616]">
                    {eventData.opportunity_to_organise_event}
                  </p>
                </div>
              </div>

              {/* eventData.art_cat_id */}

              {eventData.art_cat_id || eventData.art_sub_cat_id ? (
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-[#5A1616]/80">
                      कार्यक्रम विवरण
                    </p>

                    {eventData.art_cat_id && (
                      <p className="text-sm text-[#5A1616] mb-1">
                        कला श्रेणी: {getArtCategoryName(eventData.art_cat_id)}
                      </p>
                    )}

                    {eventData.art_sub_cat_id && (
                      <p className="text-sm text-[#5A1616] mb-1">
                        कला उप-श्रेणी:{" "}
                        {getArtSubCategoryName(eventData.art_sub_cat_id)}
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                <div>
                  <p className="text-sm font-medium text-[#5A1616]/80">
                    आवंटित बजट
                  </p>
                  <p className="text-sm text-[#5A1616]">
                    ₹{eventData.allocated_budget?.toLocaleString("hi-IN")}
                  </p>
                </div>
              </div>

              {eventData.description && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#5A1616]/60 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-[#5A1616]/80">
                      विवरण
                    </p>
                    <p className="text-sm text-[#5A1616]">
                      {eventData.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invitation Status */}
        {invitationStatus && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              <TranslatableText text="निमंत्रण स्थिति" />
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#5A1616]/80">
                  निमंत्रण दिनांक:
                </span>
                <span className="text-sm text-[#5A1616]">
                  {formatDate(invitationStatus.created_date)}
                </span>
              </div>

              {/* {invitationStatus.action_on_invitation_date_time && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#5A1616]/80">
                    कार्रवाई दिनांक:
                  </span>
                  <span className="text-sm text-[#5A1616]">
                    {formatDateTime(
                      invitationStatus.action_on_invitation_date_time
                    )}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {canTakeAction && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
            <h3 className="text-lg font-bold text-[#5A1616] font-['Baloo_2'] mb-4">
              <TranslatableText text="निमंत्रण पर कार्रवाई" />
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => handleInvitationAction(1)}
                disabled={actionLoading}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    स्वीकार करें
                  </>
                )}
              </button>

              <button
                onClick={() => handleInvitationAction(2)}
                disabled={actionLoading}
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-medium font-['Baloo_2'] active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    अस्वीकार करें
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm font-['Baloo_2']">{error}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default EventDetail;

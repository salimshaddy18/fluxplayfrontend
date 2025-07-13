import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";

const SubscriptionsPage = () => {
  const { details, isUserLoggedIn } = useUserContext();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTime, setRefreshTime] = useState(Date.now()); // Refresh trigger

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        if (!details?._id) return;
        const response = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/subscriptions/c/${details._id}`,
          {
            method: "GET",
            credentials: "include", // includes cookies (important for auth)
          }
        );
        const data = await response.json();
        if (response.ok) {
          setChannels(data.data || []);
        } else {
          console.error("Failed to fetch subscriptions:", data.message);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isUserLoggedIn) {
      fetchSubscribedChannels();
    } else {
      setLoading(false);
    }
  }, [details._id, isUserLoggedIn]); // include refreshTime here

  if (loading)
    return (
      <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3490f3] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading subscriptions...</p>
          </div>
        </div>
      </div>
    );

  if (!isUserLoggedIn)
    return (
      <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3490f3] to-[#2a7dd4] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Login Required
            </h3>
            <p className="text-[#8daece]">
              Please log in to view your subscriptions.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3490f3 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, #2a7dd4 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="layout-container flex h-full grow flex-col relative z-10">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] py-5 flex-1">
            {/* Header */}
            <div className="text-center mb-8 fade-in">
              <div className="mb-6">
                <h1 className="text-gradient text-4xl font-bold mb-2">
                  Your Subscriptions
                </h1>
                <p className="text-[#8daece] text-lg">
                  Channels you're subscribed to
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {channels.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3490f3] to-[#2a7dd4] flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No Subscriptions Yet
                  </h3>
                  <p className="text-[#8daece]">
                    You haven't subscribed to any channels yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channels.map((channel, index) => (
                    <div
                      key={channel._id}
                      className="glass rounded-xl p-6 border border-[#3490f3]/20 hover:border-[#3490f3]/40 transition-all duration-300 fade-in hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={channel.avatar || "/default-avatar.png"}
                          alt={channel.username}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#3490f3]/20"
                        />
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1">
                            {channel.fullName}
                          </h3>
                          <p className="text-[#8daece] text-sm mb-1">
                            @{channel.username}
                          </p>
                          <p className="text-[#90accb] text-xs">
                            {channel.subscriberCount} subscribers
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;

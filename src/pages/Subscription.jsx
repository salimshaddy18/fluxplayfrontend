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

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!isUserLoggedIn)
    return (
      <p className="text-white p-6">Please log in to view subscriptions.</p>
    );

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Your Subscriptions</h1>
      {channels.length === 0 ? (
        <p>You haven't subscribed to any channels.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="bg-[#1c2b3a] p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={channel.avatar || "/default-avatar.png"}
                  alt={channel.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{channel.fullName}</p>
                  <p className="text-sm text-[#8daece]">@{channel.username}</p>
                  <p className="text-sm text-[#8daece]">
                    Subscribers: {channel.subscriberCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;

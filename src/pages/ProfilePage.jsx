import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const { details, setisUserLoggedIn } = useUserContext();
  const user = details;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/users/c/${username.toLowerCase()}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (res.status === 404) {
          setError("User not found");
          return;
        }

        if (!res.ok)
          throw new Error(data.message || "Failed to load user profile");

        const fetchedProfile = data.data;
        setProfile(fetchedProfile);

        if (user?._id && user._id !== fetchedProfile._id) {
          const subRes = await fetch(
            `https://fluxplay-backend.onrender.com/api/v1/subscriptions/is-subscribed/${fetchedProfile._id}`,
            { credentials: "include" }
          );
          const subData = await subRes.json();

          if (subRes.ok) {
            setSubscribed(subData.data);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
    console.log("username", details?.fullName);
    console.log("username from route", username);
  }, [username, user]);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(res);

      if (res.status != 200) throw new Error("Logout failed");
      setisUserLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed: " + err.message);
    }
  };

  const handleSubscribe = async () => {
    if (!profile?._id) return;
    try {
      await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/subscriptions/c/${profile._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      setSubscribed((pre) => !pre);
    } catch (err) {
      console.error("Subscribe error:", err.message);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!profile) {
    return <div className="text-white p-4">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-8 relative">
      {user?.username === username && (
        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300 border border-white/20"
        >
          Logout
        </button>
      )}

      <div className="max-w-4xl mx-auto">
        {profile.coverImage && (
          <div className="h-52 w-full rounded-xl overflow-hidden mb-6">
            <img
              src={profile.coverImage}
              alt="Cover"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex items-center gap-6">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl"
          />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {profile.fullName}
            </h2>
            <p className="text-gray-300">@{profile.username}</p>
            <p className="text-sm mt-2 text-gray-400">
              {profile.subscribersCount} Subscribers •{" "}
              {profile.channelsSubscribedToCount} Subscribed
            </p>

            {user?._id !== profile._id && (
              <button
                onClick={handleSubscribe}
                className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  subscribed
                    ? "bg-gray-600/50 hover:bg-gray-700/50 backdrop-blur-md"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                }`}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

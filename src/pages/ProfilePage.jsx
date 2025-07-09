import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import VideoCard from "../components/VideoCard";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const { details, setisUserLoggedIn } = useUserContext();
  const user = details;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/users/c/${username}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        // console.log(data);

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

        const videosRes = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/videos/user/${fetchedProfile._id}/videos`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const videosData = await videosRes.json();
        if (!videosRes.ok)
          throw new Error(videosData.message || "Failed to load videos");

        setUserVideos(videosData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
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

      if (!res.ok) throw new Error("Logout failed");
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
          className="absolute top-6 right-8 bg-[#20364b] hover:bg-[#2a4a64] text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      )}

      <div className="max-w-4xl mx-auto">
        {profile.coverImage && (
          <div className="h-52 w-full rounded-lg overflow-hidden mb-6">
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
            className="w-24 h-24 rounded-full object-cover border-4 border-[#20364b]"
          />
          <div>
            <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
            <p className="text-[#8daece]">@{profile.username}</p>
            <p className="text-sm mt-2">
              {profile.subscribersCount} Subscribers •{" "}
              {profile.channelsSubscribedToCount} Subscribed
            </p>

            {user?._id !== profile._id && (
              <button
                onClick={handleSubscribe}
                className={`mt-4 px-4 py-2 rounded text-sm font-medium transition ${
                  subscribed
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {userVideos.length > 0 ? (
              userVideos.map((video) => (
                <VideoCard
                  key={video._id}
                  videoId={video._id}
                  title={video.title}
                  thumbnailUrl={video.thumbnail}
                  views={video.views}
                  likes={video.likes}
                />
              ))
            ) : (
              <p className="text-[#8daece]">No videos uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

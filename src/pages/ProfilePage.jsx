import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const ucontext = useUserContext();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/users/c/${username}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load user profile");
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [username]);

const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");
    ucontext.setisUserLoggedIn(false)
    navigate("/login");
  } catch (err) {
    console.error("Logout error:", err);
    alert("Logout failed: " + err.message);
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
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 bg-[#20364b] hover:bg-[#2a4a64] text-white px-4 py-2 rounded transition"
      >
        Logout
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {profile.coverImage && (
          <div className="h-52 w-full rounded-lg overflow-hidden mb-6">
            <img
              src={profile.coverImage}
              alt="Cover"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Avatar + Info */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

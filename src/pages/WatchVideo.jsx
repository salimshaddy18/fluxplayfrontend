import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const WatchVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const { details } = useUserContext(); // current user info

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/videos/user-video/${videoId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setVideo(data.data);

        // Check if already subscribed
        if (data?.data?.owner?._id && details?._id) {
          const subRes = await fetch(
            `http://localhost:8000/api/v1/subscriptions/is-subscribed/${data.data.owner._id}`,
            { credentials: "include" }
          );
          const subData = await subRes.json();
          if (subRes.ok) {
            setSubscribed(subData.data); // true or false
          }
        }
      } catch (error) {
        console.error("Error fetching video or subscription:", error);
      }
    };

    fetchVideo();
  }, [videoId, details]);

  const handleSubscribe = async () => {
    if (!video?.owner?._id) return;
    console.log(video.owner._id);
    
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/subscriptions/c/${video.owner._id}`, // ✅ Fixed endpoint
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(res);
      
      const data = await res.json();
      if (data.ok) {
        // toggle subscribed state
        setSubscribed((prev) => !prev);
      } else {
        alert(data.message || "Subscription failed");
      }
    } catch (err) {
      console.error("Subscription error:", err.message);
    }
  };

  if (!video) {
    return <p className="text-white p-6">Loading video...</p>;
  }

  const isOwnVideo = details?._id === video.owner?._id;

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <div className="relative w-full mb-6" style={{ paddingTop: "56.25%" }}>
          <video
            src={video.videoFile}
            controls
            autoPlay
            className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold mb-2">{video.title}</h1>
        <p className="text-sm text-gray-400 mb-4">{video.description}</p>

        {/* Uploader Info */}
        {video.owner && (
          <div className="flex items-center justify-between bg-[#1b2e3f] p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src={video.owner.avatar}
                alt={video.owner.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <Link
                to={`/c/${video.owner.username}`}
                className="text-white font-medium text-base hover:underline"
              >
                @{video.owner.username}
              </Link>
            </div>

            {!isOwnVideo && (
              <button
                onClick={handleSubscribe}
                className={`px-4 py-1.5 text-sm rounded font-medium transition-colors ${
                  subscribed ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {subscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchVideo;

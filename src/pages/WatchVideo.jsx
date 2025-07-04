import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const WatchVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
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

        // Check like status
        const likeRes = await fetch(
          `http://localhost:8000/api/v1/videos/is-liked/${videoId}`,
          { credentials: "include" }
        );
        const likeData = await likeRes.json();
        setLiked(likeData.data);

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

  //increment views
  useEffect(() => {
    if (!videoId) return;

    fetch(`http://localhost:8000/api/v1/videos/incrementViews/${videoId}`, {
      method: "PATCH",
      credentials: "include",
    }).catch((err) =>
      console.error("Failed to increment video views:", err.message)
    );
  }, [videoId]);

  const handleSubscribe = async () => {
    if (!video?.owner?._id) return;
    console.log(video.owner._id);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/subscriptions/c/${video.owner._id}`,
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

  const toggleLike = async () => {
    try {
      const url = liked
        ? `http://localhost:8000/api/v1/videos/decrementLike/${videoId}`
        : `http://localhost:8000/api/v1/videos/incrementLike/${videoId}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setLiked((prev) => !prev);
        setVideo((prev) => ({
          ...prev,
          likes: data.data.likes, //update the count
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err.message);
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

        {/* Title and Like Button */}
        <div className="flex justify-between mb-2">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <div className="mt-2">
            <button
              onClick={toggleLike}
              className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                liked ? "bg-green-400" : "bg-gray-600"
              } hover:opacity-80`}
            >
              {liked ? "👍 Liked" : "👍 Like"}
            </button>
          </div>
        </div>

        {/* Video Description */}
        <p className="text-sm text-gray-400 mb-4">
          {video.views?.toLocaleString() || 0} views • {video.likes || 0} likes
        </p>

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
                  subscribed
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
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

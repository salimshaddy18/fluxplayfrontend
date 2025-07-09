import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await fetch(
          "https://fluxplay-backend.onrender.com/api/v1/users/liked-videos",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (res.ok) {
          setLikedVideos(data.data || []);
        } else {
          console.error("Failed to fetch liked videos:", data.message);
        }
      } catch (error) {
        console.error("Error fetching liked videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>

        {loading ? (
          <p>Loading liked videos...</p>
        ) : likedVideos.length === 0 ? (
          <p>No liked videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedVideos.map((video) => (
              <VideoCard
                key={video._id}
                videoId={video._id}
                title={video.title}
                thumbnailUrl={video.thumbnail}
                views={video.views}
                likes={video.likes}
                small
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;

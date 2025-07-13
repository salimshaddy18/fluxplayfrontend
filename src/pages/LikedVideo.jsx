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

  if (loading)
    return (
      <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3490f3] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading liked videos...</p>
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
                  Liked Videos
                </h1>
                <p className="text-[#8daece] text-lg">
                  Your favorite videos collection
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {likedVideos.length === 0 ? (
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No Liked Videos Yet
                  </h3>
                  <p className="text-[#8daece]">
                    Start liking videos to see them here!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedVideos.map((video, index) => (
                    <div
                      key={video._id}
                      className="fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoCard
                        videoId={video._id}
                        title={video.title}
                        thumbnailUrl={video.thumbnail}
                        views={video.views}
                        likes={video.likes}
                        small
                      />
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

export default LikedVideos;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const YourVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await fetch(
          "https://fluxplay-backend.onrender.com/api/v1/videos/my-videos",
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (res.ok) {
          setVideos(data.data || []);
        } else {
          console.error("Error fetching your videos:", data.message);
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  if (loading)
    return (
      <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3490f3] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading your videos...</p>
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
                  Your Videos
                </h1>
                <p className="text-[#8daece] text-lg">
                  Manage your uploaded content
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {videos.length === 0 ? (
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No Videos Yet
                  </h3>
                  <p className="text-[#8daece]">
                    You haven't uploaded any videos yet. Start sharing your
                    content!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <div
                      key={video._id}
                      className="fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Link
                        to={`/watch/${video._id}`}
                        className="glass rounded-xl overflow-hidden shadow-card hover-lift transition-all duration-300 block"
                      >
                        <div className="relative group">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h2 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                            {video.title}
                          </h2>
                          <p className="text-[#8daece] text-sm line-clamp-2 mb-3">
                            {video.description}
                          </p>
                          <p className="text-[#90accb] text-xs">
                            Uploaded on{" "}
                            {new Date(video.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
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

export default YourVideosPage;

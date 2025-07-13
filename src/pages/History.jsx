import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          "https://fluxplay-backend.onrender.com/api/v1/users/history",
          {
            method: "GET",
            credentials: "include", // include JWT cookies
          }
        );

        const data = await res.json();

        if (res.ok) {
          setHistory(data.data);
        } else {
          console.error("Failed to load history:", data.message);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3490f3] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading watch history...</p>
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
                  Watch History
                </h1>
                <p className="text-[#8daece] text-lg">
                  Your recently watched videos
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {history.length === 0 ? (
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No History Yet
                  </h3>
                  <p className="text-[#8daece]">
                    You haven't watched any videos yet. Start exploring!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                  {history.map((video, index) => (
                    <div
                      key={video._id}
                      className="fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Link
                        to={`/watch/${video._id}`}
                        className="flex flex-col gap-3 cursor-pointer w-full hover-lift transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="w-full overflow-hidden rounded-xl bg-[#1b2e3f] relative group aspect-video">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

                        {/* Content */}
                        <div className="space-y-2">
                          {/* Title */}
                          <h3 className="text-white font-semibold line-clamp-2 leading-tight text-sm">
                            {video.title}
                          </h3>

                          {/* Uploader and Views */}
                          <div className="flex items-center gap-2 text-[#8daece] text-xs">
                            {video.owner && (
                              <>
                                <img
                                  src={video.owner.avatar}
                                  alt={video.owner.username}
                                  className="w-5 h-5 rounded-full object-cover"
                                />
                                <span>@{video.owner.username}</span>
                              </>
                            )}
                            <span className="ml-auto">
                              {video.views?.toLocaleString() || 0} views
                            </span>
                          </div>
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

export default WatchHistory;

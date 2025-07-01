import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllVideos = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/videos/all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUploads(data.data.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchAllVideos();
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/search/all?q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setUploads(data.data.videos || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#0f1a24] overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#20364b] px-10 py-3">
              <div className="flex items-center gap-4 text-white">
                <div className="size-4">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                  FluxPlay
                </h2>
              </div>

              <div className="flex items-center gap-4">
                {/* ➕ Plus Button */}
                <Link
                  to="/upload"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#20364b] hover:bg-[#2a4a64] text-white text-xl font-bold transition"
                  title="Upload Video"
                >
                  +
                </Link>

                {/* Search */}
                <label className="flex flex-col min-w-40 h-10 max-w-64">
                  <div className="flex w-full items-stretch rounded h-full">
                    <div className="text-[#8daece] flex bg-[#20364b] items-center justify-center pl-4 rounded-l">
                      🔍
                    </div>
                    <input
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-white border-none bg-[#20364b] h-full placeholder:text-[#8daece] px-4 rounded-l-none text-base font-normal leading-normal outline-none"
                    />
                  </div>
                </label>

                {/* Avatar Icon (Link to Profile/Channel) */}
                <Link to="/c/pakoda">
                  <div className="size-10 rounded-full bg-[#20364b] flex items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </header>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 p-4">
              {uploads.length > 0 ? (
                uploads.map((video, index) => (
                  <VideoCard
                    key={index}
                    videoId={video._id} // <- pass video ID
                    title={video.title}
                    thumbnailUrl={video.thumbnail}
                    views={video.views}
                  />
                ))
              ) : (
                <p className="text-white text-sm col-span-full">
                  No videos uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

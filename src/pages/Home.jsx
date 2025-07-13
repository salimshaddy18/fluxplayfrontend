import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], videos: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const videosPerPage = 10;
  const navigate = useNavigate();
  const { details } = useUserContext();

  const fetchAllVideos = async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/videos/all?page=${page}&limit=${videosPerPage}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        const newVideos = data.data.videos || [];

        if (append) {
          setUploads((prev) => [...prev, ...newVideos]);
        } else {
          setUploads(newVideos);
        }

        // Check if there are more videos to load
        setHasMoreVideos(newVideos.length === videosPerPage);
      } else {
        console.error("Failed to fetch videos:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreVideos = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchAllVideos(nextPage, true);
  };

  useEffect(() => {
    fetchAllVideos(1, false);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setCurrentPage(1);
      fetchAllVideos(1, false);
      setSearchResults({ users: [], videos: [] });
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/search/all?q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setUploads(data.data.videos || []);
      setSearchResults(data.data);
      setShowDropdown(true);
      setHasMoreVideos(false); // Disable load more for search results
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleUserClick = (username) => {
    setSearchQuery("");
    setSearchResults({ users: [], videos: [] });
    setShowDropdown(false);
    navigate(`/c/${username}`);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-gradient text-xl font-bold mb-2">
            Loading FluxPlay
          </h2>
          <p className="text-[#8daece] text-sm">Preparing your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen gradient-bg">
      {/* Sidebar */}
      <div className="w-60 h-screen sticky top-0 z-30 border-r border-[#20364b]/50 shadow-glow py-20">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-20">
        {/* Header */}
        <header className="sticky top-0 z-20 glass flex items-center justify-between border-b border-[#20364b]/30 px-10 py-4 rounded-lg mx-4 mt-0 shadow-card backdrop-blur">
          <div className="flex items-center gap-4 text-white">
            <div className="size-5 hover-lift">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-gradient"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-gradient text-xl font-bold leading-tight tracking-[-0.015em]">
              FluxPlay
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {/* ➕ Plus Button */}
            <Link
              to="/upload"
              className="gradient-button w-12 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold transition-all duration-300 hover-lift"
              title="Upload Video"
            >
              +
            </Link>
            {/* Search */}
            <label className="flex flex-col min-w-40 h-12 max-w-96 w-full relative">
              <div className="flex w-full items-stretch rounded-lg h-full glass shadow-glow">
                <div className="text-[#8daece] flex bg-[#20364b]/50 items-center justify-center pl-4 rounded-l-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  placeholder="Search videos and creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white border-none bg-transparent h-full placeholder:text-[#8daece] px-4 text-base font-normal leading-normal outline-none"
                />
              </div>
              {/* Dropdown search results */}
              {showDropdown && searchResults.users.length > 0 && (
                <div className="absolute z-10 mt-2 w-full glass rounded-lg shadow-card max-h-64 overflow-y-auto border border-[#20364b]/30 top-14">
                  {searchResults.users.map((user) => (
                    <div
                      key={user.username}
                      onClick={() => handleUserClick(user.username)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#1e2f40]/50 cursor-pointer transition-colors duration-200"
                    >
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#3490f3]/20"
                      />
                      <div>
                        <p className="text-white font-medium">
                          {user.fullName}
                        </p>
                        <p className="text-sm text-[#8daece]">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </label>
            {/* Avatar Icon (Link to Profile/Channel) */}
            <Link to={`/c/${details?.username}`}>
              <div className="size-12 rounded-full gradient-card flex items-center justify-center cursor-pointer hover-lift border-2 border-[#3490f3]/20">
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
          {uploads.length > 0 ? (
            uploads.map((video, index) => (
              <div
                key={index}
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VideoCard
                  videoId={video._id}
                  title={video.title}
                  thumbnailUrl={video.thumbnail}
                  views={video.views}
                  likes={video.likes}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-[#8daece] text-lg mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white text-xl font-medium">
                  No videos uploaded yet.
                </p>
                <p className="text-[#8daece] text-sm mt-2">
                  Be the first to share your content!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMoreVideos && uploads.length > 0 && !showDropdown && (
          <div className="flex justify-center pb-8">
            <button
              onClick={loadMoreVideos}
              disabled={loadingMore}
              className="gradient-button px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Load More Videos
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

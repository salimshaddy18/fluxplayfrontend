import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="layout-content-container flex flex-col w-60">
      <div className="flex h-full min-h-[700px] flex-col justify-between gradient-bg">
        <div className="flex flex-col gap-3 px-4">
          {/* GIF at the top */}
          <div className="mb-0 -mt-19.5">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGpwMmpqMjl6eml5ejc0OXo3aXRxMmU3NGNzM3RydWo2b3cxazkwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBX6tayBUD6fjOC8R0/giphy.gif"
              alt="FluxPlay Logo"
              className="w-full h-20 rounded-xl object-cover"
            />
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {/* History */}
            <Link
              to="/history"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
            >
              <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
                History
              </p>
            </Link>

            {/* Playlist */}
            <Link
              to="/playlist"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
            >
              <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
                Playlist
              </p>
            </Link>

            {/* Your Videos */}
            <Link
              to="/your-videos"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
            >
              <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
                Your Videos
              </p>
            </Link>

            {/* Liked Videos */}
            <Link
              to="/liked-videos"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
            >
              <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
                Liked Videos
              </p>
            </Link>

            {/* Subscriptions */}
            <Link
              to="/subscriptions"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
            >
              <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
                Subscriptions
              </p>
            </Link>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-[#20364b]/50"></div>

          {/* Settings */}
          <Link
            to="/settings"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-[#2a4a64]/50 transition-all duration-300 hover-lift"
          >
            <div className="text-[#3490f3] group-hover:scale-110 transition-transform duration-200">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-white text-sm font-medium group-hover:text-[#3490f3] transition-colors duration-200">
              Settings
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="px-4 py-6">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-[#8daece] text-xs mb-2">FluxPlay</p>
            <p className="text-[#6b8aa3] text-xs">Your video platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

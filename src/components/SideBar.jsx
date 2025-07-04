import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="layout-content-container flex flex-col w-60">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#0f1a24]">
        <div className="flex flex-col gap-4 px-3 py-4">
          {/* Home */}
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">🏠</div>
            <p className="text-white text-sm font-medium leading-normal">
              Home
            </p>
          </Link>

          {/* History */}
          <Link
            to="/history"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">🕓</div>
            <p className="text-white text-sm font-medium">History</p>
          </Link>

          {/* Playlist */}
          <Link
            to="/playlist"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">🎵</div>
            <p className="text-white text-sm font-medium leading-normal">
              Playlist
            </p>
          </Link>

          {/* Your Videos */}
          <Link
            to="/your-videos"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">🎥</div>
            <p className="text-white text-sm font-medium leading-normal">
              Your videos
            </p>
          </Link>

          {/* Liked Videos */}
          <Link
            to="/liked-videos"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">❤️</div>
            <p className="text-white text-sm font-medium leading-normal">
              Liked videos
            </p>
          </Link>

          {/* Subscriptions */}
          <Link
            to="/subscriptions"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">▶️</div>
            <p className="text-white text-sm font-medium leading-normal">
              Subscriptions
            </p>
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded bg-[#20364b] hover:bg-[#2a4a64] transition-colors"
          >
            <div className="text-white">⚙️</div>
            <p className="text-white text-sm font-medium leading-normal">
              Settings
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

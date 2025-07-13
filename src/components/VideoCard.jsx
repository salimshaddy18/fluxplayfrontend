import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({
  videoId,
  title,
  thumbnailUrl,
  views,
  likes,
  small = false,
}) => {
  return (
    <Link
      to={`/watch/${videoId}`}
      className={`w-full ${small ? "max-w-xs" : ""}`}
    >
      <div
        className={`flex flex-col gap-3 cursor-pointer w-full hover-lift transition-all duration-300 ${
          small ? "text-sm" : ""
        }`}
      >
        {/* Thumbnail Container */}
        <div
          className={`w-full overflow-hidden rounded-xl bg-[#1b2e3f] relative group ${
            small ? "h-32" : "aspect-video"
          }`}
        >
          <img
            src={thumbnailUrl}
            alt={title}
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
          <h3
            className={`text-white font-semibold line-clamp-2 leading-tight ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            {title}
          </h3>

          {/* Stats */}
          <div className="flex justify-between items-center text-[#8daece] text-xs">
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>{views?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
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
              <span>{likes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

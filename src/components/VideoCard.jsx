import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ videoId, title, thumbnailUrl, views, likes, small = false }) => {
  return (
    <Link to={`/watch/${videoId}`} className={`w-full ${small ? "max-w-xs" : ""}`}>
      <div className={`flex flex-col gap-1 cursor-pointer w-full ${small ? "text-sm" : ""}`}>
        {/* Thumbnail */}
        <div className={`w-full overflow-hidden rounded-lg bg-[#1b2e3f] ${small ? "h-32" : "aspect-video"}`}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <p className={`text-white font-semibold truncate ${small ? "text-xs" : "text-sm"}`}>
          {title}
        </p>

        {/* Views and Likes */}
        <p className="flex justify-between text-[#8daece] text-xs">
          <span>{views?.toLocaleString() || 0} views</span>
          <span>{likes || 0} likes</span>
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;

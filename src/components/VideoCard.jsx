import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ videoId, title, thumbnailUrl, views, likes }) => {
  return (
    <Link to={`/watch/${videoId}`} className="w-full">
      <div className="flex flex-col gap-2 cursor-pointer w-full">
        {/* Thumbnail */}
        <div className="w-full aspect-video overflow-hidden rounded-lg bg-[#1b2e3f]">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <p className="text-white text-sm font-semibold truncate">{title}</p>

        {/* Views */}
        <p className="flex gap-20 text-[#8daece] text-xs font-normal">
          <span>{views?.toLocaleString() || 0} views</span>
          <span>{likes || 0} likes</span>
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;

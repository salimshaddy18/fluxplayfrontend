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
    return <p className="text-white p-6">Loading watch history...</p>;

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>

      {history.length === 0 ? (
        <p className="text-[#8daece]">You haven't watched any videos yet.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {history.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="flex flex-col gap-2"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-[#1b2e3f] rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <p className="text-white font-semibold truncate">{video.title}</p>

              {/* Uploader and Views */}
              <div className="flex items-center gap-2 text-sm text-[#8daece]">
                {video.owner && (
                  <>
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>@{video.owner.username}</span>
                  </>
                )}
                <span className="ml-auto">
                  {video.views?.toLocaleString() || 0} views
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;

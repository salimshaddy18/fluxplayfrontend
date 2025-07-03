import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const YourVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/videos/my-videos",
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

  if (loading) return <p className="text-white p-6">Loading your videos...</p>;

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Your Uploaded Videos</h1>

      {videos.length === 0 ? (
        <p>You haven't uploaded any videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="bg-[#1c2b3a] rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{video.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {video.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Uploaded on {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourVideosPage;

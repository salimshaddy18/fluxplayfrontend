import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlaylist = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/playlists/${playlistId}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPlaylist(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch playlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  const handleRemove = async (videoId) => {
    const confirm = window.confirm("Remove this video from the playlist?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/playlists/remove/${videoId}/${playlistId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Video removed from playlist.");
        setPlaylist(data.data); // update with new playlist state
      } else {
        alert(data.message || "Failed to remove video");
      }
    } catch (err) {
      console.error("Error removing video:", err.message);
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!playlist)
    return <div className="text-red-500 p-6">Playlist not found.</div>;

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>
      <p className="text-gray-400 mb-2">{playlist.description}</p>
      <p className="text-gray-400 mb-6">Videos: {playlist.videos.length}</p>

      {playlist.videos.length === 0 ? (
        <p>No videos in this playlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {playlist.videos.map((video) => (
            <div key={video._id} className="bg-[#1b2e3f] p-4 rounded-lg">
              <video
                src={video.videoFile}
                controls
                className="w-full rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{video.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/watch/${video._id}`}
                  className="text-blue-400 text-sm hover:underline"
                >
                  ▶ Watch Video
                </Link>
                <button
                  onClick={() => handleRemove(video._id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetails;

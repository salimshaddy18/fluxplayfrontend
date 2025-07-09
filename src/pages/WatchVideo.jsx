import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const WatchVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const { details } = useUserContext();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/videos/user-video/${videoId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setVideo(data.data);

        const likeRes = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/videos/is-liked/${videoId}`,
          { credentials: "include" }
        );
        const likeData = await likeRes.json();
        setLiked(likeData.data);

        if (data?.data?.owner?._id && details?._id) {
          const subRes = await fetch(
            `https://fluxplay-backend.onrender.com/api/v1/subscriptions/is-subscribed/${data.data.owner._id}`,
            { credentials: "include" }
          );
          const subData = await subRes.json();
          if (subRes.ok) {
            setSubscribed(subData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching video or subscription:", error);
      }
    };

    fetchVideo();
  }, [videoId, details]);

  useEffect(() => {
    if (!videoId) return;
    fetch(
      `https://fluxplay-backend.onrender.com/api/v1/videos/incrementViews/${videoId}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    ).catch((err) =>
      console.error("Failed to increment video views:", err.message)
    );
  }, [videoId]);

  const handleSubscribe = async () => {
    if (!video?.owner?._id) return;
    try {
      await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/subscriptions/c/${video.owner._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      setSubscribed((prev) => !prev);
    } catch (err) {
      console.error("Subscription error:", err.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/comments/${videoId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.data.comments);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err.message);
      }
    };

    fetchComments();
  }, [videoId, refresh]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      if (!details?._id) return;
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/playlists/user/${details._id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUserPlaylists(data.data.playlists);
        }
      } catch (err) {
        console.error("Failed to fetch user playlists:", err.message);
      }
    };

    fetchUserPlaylists();
  }, [details]);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/comments/${videoId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: commentText }),
        }
      );

      if (res.ok) {
        setCommentText("");
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error("Error posting comment:", err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/comments/c/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Comment deleted");
        setRefresh((prev) => !prev);
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err.message);
    }
  };

  const toggleLike = async () => {
    try {
      const url = liked
        ? `https://fluxplay-backend.onrender.com/api/v1/videos/decrementLike/${videoId}`
        : `https://fluxplay-backend.onrender.com/api/v1/videos/incrementLike/${videoId}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setLiked((prev) => !prev);
        setVideo((prev) => ({
          ...prev,
          likes: data.data.likes,
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/videos/delete-video/${videoId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Video deleted successfully");
        window.location.href = "/";
      } else {
        alert(data.message || "Failed to delete video");
      }
    } catch (error) {
      console.error("Error deleting video:", error.message);
      alert("An error occurred while deleting the video");
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/playlists/add/${videoId}/${playlistId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const text = await res.text(); // First read response as text

      if (!res.ok) {
        console.error("Response text:", text);
        alert("Failed to add video to playlist");
        return;
      }

      const data = JSON.parse(text); // Parse only after confirming it's JSON
      alert(data.message || "Video added to playlist!");
      setShowPlaylistModal(false);
    } catch (err) {
      console.error("Error adding video to playlist:", err.message);
      alert("Something went wrong while adding to playlist");
    }
  };

  if (!video) {
    return <p className="text-white p-6">Loading video...</p>;
  }

  const isOwnVideo = details?._id === video.owner?._id;

  return (
    <>
      <div className="min-h-screen bg-[#0f1a24] text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Video Player */}
          <div
            className="relative w-full mb-6"
            style={{ paddingTop: "56.25%" }}
          >
            <video
              src={video.videoFile}
              controls
              autoPlay
              className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Title and Like Button */}
          <div className="flex justify-between mb-2">
            <h1 className="text-xl font-bold">{video.title}</h1>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setShowPlaylistModal(true)}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-sm rounded font-medium transition-colors"
              >
                ➕ Add to Playlist
              </button>

              <button
                onClick={toggleLike}
                className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                  liked ? "bg-green-400" : "bg-gray-600"
                } hover:opacity-80`}
              >
                {liked ? "👍 Liked" : "👍 Like"}
              </button>

              {isOwnVideo && (
                <>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-sm rounded font-medium"
                  >
                    🗑️ Delete
                  </button>
                  <Link
                    to={`/edit-video/${video._id}`}
                    className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-sm rounded font-medium"
                  >
                    ✏️ Edit
                  </Link>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            {video.views?.toLocaleString() || 0} views • {video.likes || 0}{" "}
            likes
          </p>

          <p className="text-base text-white mb-6">
            {video.description || "No description provided."}
          </p>

          {video.owner && (
            <div className="flex items-center justify-between bg-[#1b2e3f] p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Link
                  to={`/c/${video.owner.username}`}
                  className="text-white font-medium text-base hover:underline"
                >
                  @{video.owner.username}
                </Link>
              </div>

              {!isOwnVideo && (
                <button
                  onClick={handleSubscribe}
                  className={`px-4 py-1.5 text-sm rounded font-medium transition-colors ${
                    subscribed
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
              )}
            </div>
          )}

          {/* Comments */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Comments</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 bg-[#1b2e3f] text-white border border-gray-700 rounded"
              />
              <button
                onClick={handlePostComment}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
              >
                Post
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="bg-[#1b2e3f] p-3 rounded-lg flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.user.avatar}
                      alt={c.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-white font-semibold">
                      @{c.user.username}
                    </p>
                  </div>
                  {details?._id === c.user._id && (
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-300">{c.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-[#1b2e3f] text-white p-6 rounded-lg shadow-lg w-[300px] space-y-3">
            <h3 className="text-lg font-semibold">Add to Playlist</h3>
            {userPlaylists.length === 0 ? (
              <p>No playlists found.</p>
            ) : (
              <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                {userPlaylists.map((p) => (
                  <li
                    key={p._id}
                    onClick={() => handleAddToPlaylist(p._id)}
                    className="cursor-pointer hover:text-blue-400"
                  >
                    ▶ {p.name}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="mt-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchVideo;

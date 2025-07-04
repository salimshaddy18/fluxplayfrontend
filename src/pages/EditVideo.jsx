import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/videos/user-video/${videoId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setVideo(data.data);
          setTitle(data.data.title);
          setDescription(data.data.description || "");
        } else {
          alert(data.message || "Failed to fetch video");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching video details");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (newThumbnail) formData.append("thumbnail", newThumbnail);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/videos/update-video/${videoId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
      const data = await res.json();

      if (res.ok) {
        alert("Video updated successfully");
        navigate(`/watch/${videoId}`); // Redirect back to watch page
      } else {
        alert(data.message || "Failed to update video");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the video");
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Video</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Title:
            <input
              className="mt-1 p-2 w-full rounded bg-[#1b2e3f] text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              className="mt-1 p-2 w-full rounded bg-[#1b2e3f] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </label>

          <label>
            New Thumbnail:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewThumbnail(e.target.files[0])}
              className="mt-1 text-white"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;

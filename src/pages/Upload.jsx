import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadVideoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !videoFile || !thumbnail) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/videos/upload-video",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Upload failed");

      alert("Video uploaded successfully!");
      navigate("/"); // Or redirect to your dashboard or videos list
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#152532] p-6 rounded-lg shadow"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6">Upload New Video</h2>

        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#20364b] text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 rounded bg-[#20364b] text-white"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Video File</label>
          <input
            type="file"
            accept="video/*"
            className="w-full text-white"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-white"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideoPage;

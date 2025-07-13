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
    <div className="gradient-bg relative flex size-full min-h-screen flex-col overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3490f3 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, #2a7dd4 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="layout-container flex h-full grow flex-col relative z-10">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            {/* Header */}
            <div className="text-center mb-8 fade-in">
              <div className="mb-6">
                <div className="size-20 mx-auto mb-4 relative">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-gradient"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h1 className="text-gradient text-4xl font-bold mb-2">
                  Upload Your Video
                </h1>
                <p className="text-[#8daece] text-lg">
                  Share your content with the world
                </p>
              </div>
            </div>

            {/* Upload Form */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Video Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[#8daece]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m4 0V2a1 1 0 011-1h2a1 1 0 011 1v2M7 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2M7 4h10"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter video title"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[#8daece] mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Describe your video"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Video File */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Video File
                  </label>
                  <div className="glass rounded-xl border-2 border-dashed border-[#3490f3]/30 p-6 hover:border-[#3490f3]/50 transition-colors duration-200">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3490f3] to-[#2a7dd4] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-medium">
                          Upload Video
                        </p>
                        <p className="text-[#8daece] text-xs mt-1">
                          Select your video file
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        className="text-[#8daece] file:gradient-button file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-sm file:font-medium hover:file:shadow-glow transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Thumbnail Image
                  </label>
                  <div className="glass rounded-xl border-2 border-dashed border-[#3490f3]/30 p-6 hover:border-[#3490f3]/50 transition-colors duration-200">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3490f3] to-[#2a7dd4] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-medium">
                          Upload Thumbnail
                        </p>
                        <p className="text-[#8daece] text-xs mt-1">
                          Select a thumbnail image
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="text-[#8daece] file:gradient-button file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-sm file:font-medium hover:file:shadow-glow transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">
                    {loading ? "Uploading..." : "Upload Video"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoPage;

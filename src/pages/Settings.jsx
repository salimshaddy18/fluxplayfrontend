import React, { useState } from "react";
import { useUserContext } from "../context/userContext";

const SettingsPage = () => {
  const { details } = useUserContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState(details?.fullName || "");
  const [email, setEmail] = useState(details?.email || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");

  // Change Password
  const handlePasswordUpdate = async () => {
    try {
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/users/change-password",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Password updated successfully");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Update Account Info
  const handleAccountUpdate = async () => {
    try {
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/users/update-account",
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Account details updated");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Update Avatar
  const handleAvatarUpdate = async () => {
    if (!avatarFile) return setMessage("Please choose a profile image");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/users/avatar",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Avatar updated");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Update Cover Image
  const handleCoverUpdate = async () => {
    if (!coverFile) return setMessage("Please choose a cover image");

    const formData = new FormData();
    formData.append("coverImage", coverFile);

    try {
      const res = await fetch(
        "https://fluxplay-backend.onrender.com/api/v1/users/cover-image",
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Cover image updated");
    } catch (err) {
      setMessage(err.message);
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
                <h1 className="text-gradient text-4xl font-bold mb-2">
                  Settings
                </h1>
                <p className="text-[#8daece] text-lg">
                  Manage your account preferences
                </p>
              </div>
            </div>

            {/* Settings Form */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-8">
                {/* Password Update */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-bold">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium leading-normal">
                        Current Password
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          type="password"
                          placeholder="Enter your current password"
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium leading-normal">
                        New Password
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <input
                          type="password"
                          placeholder="Enter your new password"
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={handlePasswordUpdate}
                      className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-bold">
                    Account Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium leading-normal">
                        Full Name
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          placeholder="Enter your full name"
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium leading-normal">
                        Email
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
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>
                        <input
                          placeholder="Enter your email"
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAccountUpdate}
                      className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                    >
                      Update Account
                    </button>
                  </div>
                </div>

                {/* Avatar */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-bold">
                    Profile Image
                  </h3>
                  <div className="space-y-4">
                    {details?.avatar && (
                      <div className="flex justify-center">
                        <img
                          src={details.avatar}
                          alt="Current Avatar"
                          className="w-32 h-32 rounded-full object-cover border-4 border-[#3490f3]/20"
                        />
                      </div>
                    )}
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-white text-sm font-medium">
                            {avatarFile
                              ? "Profile Image Selected"
                              : "Choose Profile Image"}
                          </p>
                          <p className="text-[#8daece] text-xs mt-1">
                            Upload a new profile picture
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setAvatarFile(e.target.files[0])}
                          className="text-[#8daece] file:gradient-button file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-sm file:font-medium hover:file:shadow-glow transition-all duration-200"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAvatarUpdate}
                      className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                    >
                      Update Avatar
                    </button>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-bold">Cover Image</h3>
                  <div className="space-y-4">
                    {details?.coverImage && (
                      <div className="flex justify-center">
                        <img
                          src={details.coverImage}
                          alt="Current Cover"
                          className="w-full h-32 rounded-xl object-cover border-2 border-[#3490f3]/20"
                        />
                      </div>
                    )}
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
                            {coverFile
                              ? "Cover Image Selected"
                              : "Choose Cover Image"}
                          </p>
                          <p className="text-[#8daece] text-xs mt-1">
                            Upload a new cover image
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCoverFile(e.target.files[0])}
                          className="text-[#8daece] file:gradient-button file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-sm file:font-medium hover:file:shadow-glow transition-all duration-200"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleCoverUpdate}
                      className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                    >
                      Update Cover Image
                    </button>
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <div className="text-center p-4 rounded-xl bg-[#223549]/50 border border-[#3490f3]/20">
                    <p className="text-white text-sm">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

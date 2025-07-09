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
        "http://localhost:8000/api/v1/users/change-password",
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
        "http://localhost:8000/api/v1/users/update-account",
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
      const res = await fetch("http://localhost:8000/api/v1/users/avatar", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

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
        "http://localhost:8000/api/v1/users/cover-image",
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
    <div className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-white text-2xl font-bold px-4">Settings</h1>

            {/* Password Update */}
            <div className="px-4 py-3">
              <p className="text-white text-base font-medium pb-2">
                Current Password
              </p>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input w-full rounded text-white border border-[#2e4e6b] bg-[#172736] h-14 p-4"
              />
              <p className="text-white text-base font-medium pb-2 mt-4">
                New Password
              </p>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input w-full rounded text-white border border-[#2e4e6b] bg-[#172736] h-14 p-4"
              />
              <button
                onClick={handlePasswordUpdate}
                className="mt-4 rounded bg-[#359dff] text-[#0f1a24] px-4 h-10 font-bold text-sm"
              >
                Update Password
              </button>
            </div>

            {/* Account Details */}
            <h3 className="text-white text-lg font-bold px-4 pt-6">
              Account Details
            </h3>
            <div className="px-4 py-3">
              <p className="text-white text-base font-medium pb-2">Full Name</p>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input w-full rounded text-white border border-[#2e4e6b] bg-[#172736] h-14 p-4"
              />
              <p className="text-white text-base font-medium pb-2 mt-4">
                Email
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full rounded text-white border border-[#2e4e6b] bg-[#172736] h-14 p-4"
              />
              <button
                onClick={handleAccountUpdate}
                className="mt-4 rounded bg-[#359dff] text-[#0f1a24] px-4 h-10 font-bold text-sm"
              >
                Update Account
              </button>
            </div>

            {/* Avatar */}
            <h3 className="text-white text-lg font-bold px-4 pt-6">
              Profile Image
            </h3>
            <div className="flex flex-col px-4 py-3 gap-4">
              {details?.avatar && (
                <img
                  src={details.avatar}
                  alt="Current Avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
              <label
                className={`flex items-center gap-2 w-fit cursor-pointer px-4 py-2 rounded border border-dashed ${
                  avatarFile
                    ? "border-green-400 text-green-400"
                    : "border-white/40 text-white/60"
                }`}
              >
                <span className="text-xl font-bold">+</span>
                <span>
                  {avatarFile
                    ? "Profile Image Selected"
                    : "Choose Profile Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={handleAvatarUpdate}
                className="rounded bg-[#359dff] text-[#0f1a24] px-4 h-10 font-bold text-sm w-fit"
              >
                Update Profile Image
              </button>
            </div>

            {/* Cover Image */}
            <h3 className="text-white text-lg font-bold px-4 pt-6">
              Cover Image
            </h3>
            <div className="flex flex-col px-4 py-3 gap-4">
              {details?.coverImage && (
                <img
                  src={details.coverImage}
                  alt="Current Cover"
                  className="w-full max-h-[200px] object-cover rounded"
                />
              )}
              <label
                className={`flex items-center gap-2 w-fit cursor-pointer px-4 py-2 rounded border border-dashed ${
                  coverFile
                    ? "border-green-400 text-green-400"
                    : "border-white/40 text-white/60"
                }`}
              >
                <span className="text-xl font-bold">+</span>
                <span>
                  {coverFile ? "Cover Image Selected" : "Choose Cover Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={handleCoverUpdate}
                className="rounded bg-[#359dff] text-[#0f1a24] px-4 h-10 font-bold text-sm w-fit"
              >
                Update Cover Image
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className="px-4 pt-4">
                <p className="text-sm text-green-400">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

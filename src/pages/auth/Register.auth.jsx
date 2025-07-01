import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const context = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/v1/users/register";

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("coverImage", coverFile);
      console.log(formData.get("username"));
      

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      console.log(response);

      if (response.statusText === "Created") {
        navigate("/login");
      } else {
        console.error("Registration failed", response);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-solid border-b-[#20364b] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold tracking-[-0.015em]">
              ConnectHub
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-white text-sm font-medium" href="#">
                Home
              </a>
              <a className="text-white text-sm font-medium" href="#">
                About
              </a>
              <a className="text-white text-sm font-medium" href="#">
                Contact
              </a>
            </div>
            <button className="bg-[#20364b] text-white text-sm font-bold h-10 px-4 rounded">
              <span className="truncate">Login</span>
            </button>
          </div>
        </header>

        <form
          onSubmit={handleRegister}
          className="px-40 flex flex-1 justify-center py-5"
        >
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            <h2 className="text-white text-[28px] font-bold text-center pb-3 pt-5">
              Create Your Account
            </h2>

            {/* Full Name */}
            <div className="flex max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">
                  Full Name
                </p>
                <input
                  placeholder="Enter your full name"
                  className="form-input h-14 p-[15px] rounded bg-[#172736] text-white border border-[#2e4e6b] placeholder:text-[#8daece] focus:border-[#2e4e6b] focus:outline-0"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>

            {/* Username */}
            <div className="flex max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">
                  Username
                </p>
                <input
                  placeholder="Choose a username"
                  className="form-input h-14 p-[15px] rounded bg-[#172736] text-white border border-[#2e4e6b] placeholder:text-[#8daece] focus:border-[#2e4e6b] focus:outline-0"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>

            {/* Email */}
            <div className="flex max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Email</p>
                <input
                  placeholder="Enter your email"
                  className="form-input h-14 p-[15px] rounded bg-[#172736] text-white border border-[#2e4e6b] placeholder:text-[#8daece] focus:border-[#2e4e6b] focus:outline-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div className="flex max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">
                  Password
                </p>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="form-input h-14 p-[15px] rounded bg-[#172736] text-white border border-[#2e4e6b] placeholder:text-[#8daece] focus:border-[#2e4e6b] focus:outline-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            {/* Upload Avatar */}
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded border-2 border-dashed border-[#2e4e6b] px-6 py-14">
                <p className="text-white text-lg font-bold text-center">
                  Upload Avatar
                </p>
                <p className="text-white text-sm text-center">
                  Click below to upload your profile picture
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                  className="text-gray-400 file:bg-[#20364b] file:text-white file:rounded file:px-4 file:py-2 file:font-semibold hover:file:bg-[#2e4e6b]"
                />
              </div>
            </div>

            {/* Upload Cover */}
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded border-2 border-dashed border-[#2e4e6b] px-6 py-14">
                <p className="text-white text-lg font-bold text-center">
                  Upload Cover Image
                </p>
                <p className="text-white text-sm text-center">
                  Click below to upload a cover image for your profile
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                  className="text-gray-400 file:bg-[#20364b] file:text-white file:rounded file:px-4 file:py-2 file:font-semibold hover:file:bg-[#2e4e6b]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex px-4 py-3">
              <button
                onClick={(e) => handleRegister(e)}
                type="submit"
                className="flex-1 h-10 rounded bg-[#359dff] text-[#0f1a24] text-sm font-bold"
              >
                Register
              </button>
            </div>

            <p className="text-[#8daece] text-sm text-center underline px-4">
              Already have an account? Sign in
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

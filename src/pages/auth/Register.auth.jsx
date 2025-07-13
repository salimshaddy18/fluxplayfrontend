import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      const url = "https://fluxplay-backend.onrender.com/api/v1/users/register";

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

      if (response.status == 200) {
        navigate("/login");
      } else {
        console.error("Registration failed", response);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    } finally {
      setIsLoading(false);
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
        <form
          onSubmit={handleRegister}
          className="px-40 flex flex-1 justify-center py-5"
        >
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
                  Create Your Account
                </h1>
                <p className="text-[#8daece] text-lg">
                  Join FluxPlay and start sharing your content
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-6">
                {/* Full Name */}
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

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Username
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
                      placeholder="Choose a username"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium leading-normal">
                    Password
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
                      placeholder="Create a password"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Upload Avatar */}
                <div className="space-y-4">
                  <label className="text-white text-sm font-medium leading-normal flex items-center gap-2">
                    Profile Picture
                    <span className="text-red-500 text-lg font-bold">!</span>
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-medium">
                          Upload Avatar
                        </p>
                        <p className="text-[#8daece] text-xs mt-1">
                          Click to upload your profile picture
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
                </div>

                {/* Upload Cover */}
                <div className="space-y-4">
                  <label className="text-white text-sm font-medium leading-normal flex items-center gap-2">
                    Cover Image
                    <span className="text-red-500 text-lg font-bold">!</span>
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
                          Upload Cover Image
                        </p>
                        <p className="text-[#8daece] text-xs mt-1">
                          Add a cover image for your profile
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 ${
                    isLoading
                      ? "bg-gray-500 cursor-not-allowed opacity-70"
                      : "gradient-button hover-lift"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span className="truncate">Create Account</span>
                  )}
                </button>

                {/* Link to Login */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-[#90accb] text-sm font-normal leading-normal hover:text-[#3490f3] transition-colors duration-200 underline"
                  >
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const context = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "https://fluxplay-backend.onrender.com/api/v1/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data?.data?.user) {
        context.setisUserLoggedIn(true);
        console.log("done ... ");

        navigate("/");
      } else {
        alert(data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
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
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
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
                  Welcome back
                </h1>
                <p className="text-[#8daece] text-lg">
                  Sign in to continue to FluxPlay
                </p>
              </div>
            </div>

            {/* Login Form */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username input */}
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
                      type="text"
                      placeholder="Enter your username"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email input */}
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
                      type="email"
                      placeholder="Enter your email"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password input */}
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
                      placeholder="Enter your password"
                      className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                >
                  <span className="truncate">Sign In</span>
                </button>
              </form>

              {/* Link to Register */}
              <div className="mt-6 text-center">
                <Link
                  to="/register"
                  className="text-[#90accb] text-sm font-normal leading-normal hover:text-[#3490f3] transition-colors duration-200 underline"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

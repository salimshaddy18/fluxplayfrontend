import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";


const LoginPage = () => {
  const [userName, setUserName] = useState("");
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
          password,
          email,
          userName,
        }),
      });
      console.log(response);

      
      //if (response?.statusText === "OK") {
        context.setisUserLoggedIn(true);
        navigate("/");
      //}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#101923] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Welcome back
            </h2>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Username :
                </p>
                <input
                  type="text"
                  placeholder={`Enter your username`}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-white focus:outline-0 focus:ring-0 border-none bg-[#223549] focus:border-none h-14 placeholder:text-[#90accb] p-4 text-base font-normal leading-normal"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Email :
                </p>
                <input
                  type="email"
                  placeholder={`Enter your email`}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-white focus:outline-0 focus:ring-0 border-none bg-[#223549] focus:border-none h-14 placeholder:text-[#90accb] p-4 text-base font-normal leading-normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Password :
                </p>
                <input
                  type="password"
                  placeholder={`Enter your password`}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-white focus:outline-0 focus:ring-0 border-none bg-[#223549] focus:border-none h-14 placeholder:text-[#90accb] p-4 text-base font-normal leading-normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="flex px-4 py-3">
              <button
                onClick={(e) => handleLogin(e)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-12 px-5 flex-1 bg-[#3490f3] text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Login</span>
              </button>
            </div>

            <Link
              to="/register"
              className="text-[#90accb] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

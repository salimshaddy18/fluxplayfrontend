//import { useState } from 'react'
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/Login.auth.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "./context/userContext.jsx";
import RegisterPage from "./pages/auth/Register.auth.jsx";
import Dashboard from "./pages/Home.jsx";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import PlaylistPage from "./pages/Playlist.jsx";
import SubscriptionsPage from "./pages/Subscription.jsx";
import WatchHistory from "./pages/History.jsx";
import UploadVideoPage from "./pages/Upload.jsx";
import WatchVideo from "./pages/WatchVideo";
import YourVideosPage from "./pages/YourVideos.jsx";
import LikedVideos from "./pages/LikedVideo.jsx";
import EditVideo from "./pages/EditVideo.jsx";
import PlaylistDetails from "./pages/PlaylistDetails";

function App() {
  const context = useUserContext();

  // Show loading screen while authentication is being determined
  if (!context.userFetched) {
    return (
      <div className="gradient-bg flex items-center justify-center h-screen w-full">
        <div className="text-center fade-in">
          <div className="mb-6">
            <div className="size-16 mx-auto mb-4 relative">
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
            <h1 className="text-gradient text-4xl font-bold mb-2">FluxPlay</h1>
            <p className="text-[#8daece] text-lg">Loading your experience...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 bg-[#3490f3] rounded-full"></div>
              <div className="w-3 h-3 bg-[#3490f3] rounded-full animation-delay-200"></div>
              <div className="w-3 h-3 bg-[#3490f3] rounded-full animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            context.isUserLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={context.isUserLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            context.isUserLoggedIn ? <Navigate to="/" /> : <RegisterPage />
          }
        />
        <Route path="/c/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/history" element={<WatchHistory />} />
        <Route path="/upload" element={<UploadVideoPage />} />
        <Route path="/watch/:videoId" element={<WatchVideo />} />
        <Route path="/your-videos" element={<YourVideosPage />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/edit-video/:videoId" element={<EditVideo />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
      </Routes>
    </div>
  );
}

export default App;

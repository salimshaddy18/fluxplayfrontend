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
import PlaylistPage from "./pages/Playlist.jsx"
import SubscriptionsPage from "./pages/Subscription.jsx"
import WatchHistory from "./pages/History.jsx"
import UploadVideoPage from "./pages/Upload.jsx";
import WatchVideo from "./pages/WatchVideo";
import YourVideosPage from "./pages/YourVideos.jsx"


function App() {
  const context = useUserContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    isAvaliable();
    setLoading(false)
  }, []);
  const isAvaliable = async () => {
    try {
      const url = "http://localhost:8000/api/v1/users/current-user";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      if (response?.statusText === "OK") {
        context.setisUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(context.isUserLoggedIn);
  if(loading){
    return(
    <div className="flex items-center justify-center h-screen w-full text-3xl">
      Loading ...
    </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={(context.isUserLoggedIn) ? <Dashboard/> : <Navigate to='/login' />} />
        <Route path="/login" element={(context.isUserLoggedIn) ? <Navigate to='/' /> : <LoginPage />} />
        <Route path="/register" element={(context.isUserLoggedIn) ? <Navigate to='/' /> :<RegisterPage/>} />
        <Route path="/c/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/history" element={<WatchHistory />} />
        <Route path="/upload" element={<UploadVideoPage />} />
        <Route path="/watch/:videoId" element={<WatchVideo />} />
        <Route path="/your-videos" element={<YourVideosPage />} />
        
      </Routes>
    </div>
  );
}

export default App;

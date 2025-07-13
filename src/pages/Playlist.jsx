import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const PlaylistPage = () => {
  const { details } = useUserContext(); // current user
  const [playlists, setPlaylists] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!details?._id) return;

    const fetchPlaylists = async () => {
      try {
        const res = await fetch(
          `https://fluxplay-backend.onrender.com/api/v1/playlists/user/${details._id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPlaylists(data.data.playlists || []);
        } else {
          console.error("Failed to load playlists", data.message);
        }
      } catch (error) {
        console.error("Playlist fetch error:", error);
      }
    };

    fetchPlaylists();
  }, [details]);

  const handleCreateOrUpdatePlaylist = async () => {
    if (!newPlaylist.name || !newPlaylist.description)
      return alert("Both name and description are required");

    const url = editingId
      ? `https://fluxplay-backend.onrender.com/api/v1/playlists/${editingId}`
      : "https://fluxplay-backend.onrender.com/api/v1/playlists";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlaylist),
      });

      const data = await res.json();
      if (res.ok) {
        if (editingId) {
          setPlaylists((prev) =>
            prev.map((pl) => (pl._id === editingId ? data.data : pl))
          );
        } else {
          setPlaylists((prev) => [data.data, ...prev]);
        }
        setNewPlaylist({ name: "", description: "" });
        setEditingId(null);
        setShowForm(false);
      } else {
        alert(data.message || "Failed to save playlist");
      }
    } catch (error) {
      console.error("Playlist save error:", error);
    }
  };

  const handleDelete = async (playlistId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://fluxplay-backend.onrender.com/api/v1/playlists/${playlistId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
      } else {
        alert(data.message || "Failed to delete playlist");
      }
    } catch (error) {
      console.error("Delete playlist error:", error);
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
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] py-5 flex-1">
            {/* Header */}
            <div className="text-center mb-8 fade-in">
              <div className="mb-6">
                <h1 className="text-gradient text-4xl font-bold mb-2">
                  My Playlists
                </h1>
                <p className="text-[#8daece] text-lg">
                  Organize your favorite videos
                </p>
              </div>
            </div>

            {/* Content */}
            <div
              className="glass rounded-2xl p-8 shadow-card fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {/* New Playlist Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => {
                    setShowForm((prev) => !prev);
                    setEditingId(null);
                    setNewPlaylist({ name: "", description: "" });
                  }}
                  className="gradient-button px-6 py-3 rounded-xl text-white text-sm font-bold leading-normal transition-all duration-300 hover-lift"
                >
                  <span className="truncate">
                    {showForm ? "Cancel" : "New Playlist"}
                  </span>
                </button>
              </div>

              {/* Create/Edit Form */}
              {showForm && (
                <div className="glass rounded-xl p-6 mb-6 border border-[#3490f3]/20">
                  <h3 className="text-white text-lg font-bold mb-4">
                    {editingId ? "Edit Playlist" : "Create New Playlist"}
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white text-sm font-medium leading-normal">
                        Playlist Name
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
                              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter playlist name"
                          value={newPlaylist.name}
                          onChange={(e) =>
                            setNewPlaylist((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm"
                        />
                      </div>
                    </div>
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
                          placeholder="Enter playlist description"
                          value={newPlaylist.description}
                          onChange={(e) =>
                            setNewPlaylist((p) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                          rows="3"
                          className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-white border-none bg-[#223549]/50 focus:bg-[#223549] placeholder:text-[#90accb] text-base font-normal leading-normal backdrop-blur-sm resize-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleCreateOrUpdatePlaylist}
                      className="gradient-button w-full py-3 px-6 rounded-xl text-white text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 hover-lift"
                    >
                      {editingId ? "Update Playlist" : "Create Playlist"}
                    </button>
                  </div>
                </div>
              )}

              {/* Playlists List */}
              {playlists.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3490f3] to-[#2a7dd4] flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No Playlists Yet
                  </h3>
                  <p className="text-[#8daece]">
                    Create your first playlist to organize your favorite videos!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {playlists.map(
                    ({ _id, name, description, owner, videos = [] }, index) => (
                      <div
                        key={_id}
                        className="glass rounded-xl p-6 border border-[#3490f3]/20 hover:border-[#3490f3]/40 transition-all duration-300 fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
                              <Link
                                to={`/playlist/${_id}`}
                                className="hover:text-[#3490f3] transition-colors duration-200"
                              >
                                {name}
                              </Link>
                            </h3>
                            <p className="text-[#8daece] text-sm font-normal leading-normal mb-2">
                              Playlist · {videos.length} videos
                            </p>
                            <p className="text-white text-base font-medium leading-tight mb-2">
                              {description}
                            </p>
                            <p className="text-[#8daece] text-sm font-normal leading-normal">
                              Created by {owner?.username || "Unknown"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setShowForm(true);
                                setEditingId(_id);
                                setNewPlaylist({ name, description });
                              }}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(_id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;

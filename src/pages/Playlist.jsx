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
          `http://localhost:8000/api/v1/playlists/user/${details._id}`,
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
      ? `http://localhost:8000/api/v1/playlists/${editingId}`
      : "http://localhost:8000/api/v1/playlists";

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
        `http://localhost:8000/api/v1/playlists/${playlistId}`,
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
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                My Playlists
              </p>
              <button
                onClick={() => {
                  setShowForm((prev) => !prev);
                  setEditingId(null);
                  setNewPlaylist({ name: "", description: "" });
                }}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-8 px-4 bg-[#20364b] text-white text-sm font-medium leading-normal"
              >
                <span className="truncate">
                  {showForm ? "Cancel" : "New Playlist"}
                </span>
              </button>
            </div>

            {showForm && (
              <div className="px-4 space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Playlist Name"
                  value={newPlaylist.name}
                  onChange={(e) =>
                    setNewPlaylist((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded bg-[#1b2e3f] text-white border border-gray-600"
                />
                <textarea
                  placeholder="Description"
                  value={newPlaylist.description}
                  onChange={(e) =>
                    setNewPlaylist((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded bg-[#1b2e3f] text-white border border-gray-600"
                />
                <button
                  onClick={handleCreateOrUpdatePlaylist}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Update Playlist" : "Create Playlist"}
                </button>
              </div>
            )}

            {playlists.length === 0 ? (
              <p className="text-white px-4 mt-4">No playlists found.</p>
            ) : (
              playlists.map(
                ({ _id, name, description, owner, videos = [] }) => (
                  <div key={_id} className="p-4">
                    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                      <Link
                        to={`/playlist/${_id}`}
                        className="hover:underline text-blue-400"
                      >
                        {name}
                      </Link>
                    </h3>
                    <div className="flex items-stretch justify-between gap-4 rounded bg-[#1b2e3f] p-4">
                      <div className="flex flex-col gap-1 flex-[2_2_0px]">
                        <p className="text-[#8daece] text-sm font-normal leading-normal">
                          Playlist · {videos.length} videos
                        </p>
                        <p className="text-white text-base font-bold leading-tight">
                          {description}
                        </p>
                        <p className="text-[#8daece] text-sm font-normal leading-normal">
                          Created by {owner?.username || "Unknown"}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setShowForm(true);
                              setEditingId(_id);
                              setNewPlaylist({ name, description });
                            }}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(_id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;

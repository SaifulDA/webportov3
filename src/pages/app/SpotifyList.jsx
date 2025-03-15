import { useState, useEffect } from "react";
import { getTokenFromUrl, fetchUserPlaylists, fetchPlaylistTracks, logout } from "../../services/Spotifyin";
import { initializeSpotifyPlayer, playTrack } from "../../services/SpotifyPlayer";
import Login from "../../components/common/Login";
import Navbar from "../../components/common/NavbarSpotify";
import PlaylistSidebar from "../../components/common/PlaylistSidebar";
import PlaylistDetail from "../../components/common/PlaylistDetail";

function App() {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [loadingTracks, setLoadingTracks] = useState(false);

  // Cek token saat aplikasi dimuat
  useEffect(() => {
    const fetchToken = () => {
      const tokenFromStorage = getTokenFromUrl();
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
      }
    };
    fetchToken();
  }, []);

  // Inisialisasi Spotify Player saat token tersedia
  useEffect(() => {
    if (token) {
      initializeSpotifyPlayer(token, setDeviceId);
    }
  }, [token]);

  // Ambil playlist user saat token tersedia
  useEffect(() => {
    const getPlaylists = async () => {
      if (!token) return;

      setLoadingPlaylists(true);
      try {
        const playlistsData = await fetchUserPlaylists(token);
        if (playlistsData && playlistsData.items) {
          setPlaylists(playlistsData.items);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoadingPlaylists(false);
      }
    };

    getPlaylists();
  }, [token]);

  // Fungsi untuk memilih playlist dan mengambil track-nya
  const handleSelectPlaylist = async (playlist) => {
    setSelectedPlaylist(playlist);
    setLoadingTracks(true);

    try {
      const tracksData = await fetchPlaylistTracks(token, playlist.id);
      if (tracksData && tracksData.items) {
        setTracks(tracksData.items);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoadingTracks(false);
    }
  };

  // Fungsi untuk memutar lagu
  const handlePlayTrack = (trackUri) => {
    if (deviceId && trackUri) {
      playTrack(token, deviceId, trackUri);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setToken("");
    setPlaylists([]);
    setSelectedPlaylist(null);
    setTracks([]);
  };

  // Render login screen jika tidak ada token
  if (!token) {
    return <Login />;
  }

  // Render aplikasi utama jika token tersedia
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="container mx-auto p-4">
        <Navbar onLogout={handleLogout} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Playlist */}
          <div className="lg:col-span-1">
            <PlaylistSidebar playlists={playlists} loading={loadingPlaylists} onSelectPlaylist={handleSelectPlaylist} selectedPlaylistId={selectedPlaylist?.id} />
          </div>

          {/* Detail Playlist & Track List */}
          <div className="lg:col-span-2">
            <PlaylistDetail
              playlist={selectedPlaylist}
              tracks={tracks}
              loading={loadingTracks}
              onPlayTrack={handlePlayTrack} // Tambahkan fungsi play track
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

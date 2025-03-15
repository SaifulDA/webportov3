const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'user-read-email'];

// Fungsi untuk login ke Spotify
export const loginToSpotify = () => {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;
  window.location.href = authUrl;
};

// Fungsi untuk mendapatkan token dari URL hash
export const getTokenFromUrl = () => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      localStorage.setItem('spotify_token', accessToken);
      window.location.hash = '';
      return accessToken;
    }
  }
  return localStorage.getItem('spotify_token');
};

// Fungsi untuk mendapatkan playlist user
export const fetchUserPlaylists = async (token) => {
  if (!token) return null;
  
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan tracks dari playlist
export const fetchPlaylistTracks = async (token, playlistId) => {
  if (!token || !playlistId) return null;
  
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return null;
  }
};

// Fungsi untuk logout
export const logout = () => {
  localStorage.removeItem('spotify_token');
};
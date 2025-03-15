let player;

export const initializeSpotifyPlayer = (token, setDeviceId) => {
  if (!window.Spotify) {
    console.error("Spotify SDK belum tersedia.");
    return;
  }

  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log("Spotify Web Playback SDK siap!");
  };

  player = new window.Spotify.Player({
    name: "Vite Spotify Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  player.addListener("ready", ({ device_id }) => {
    console.log("Spotify Player siap dengan ID:", device_id);
    setDeviceId(device_id);
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Spotify Player tidak siap:", device_id);
  });

  player.connect();
};

export const playTrack = async (token, deviceId, trackUri) => {
  if (!deviceId) {
    console.error("Device ID tidak ditemukan.");
    alert("Spotify Player belum siap, silakan tunggu sebentar.");
    return;
  }

  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uris: [trackUri] }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Gagal memutar lagu:", errorData);
    alert("Gagal memutar lagu. Pastikan akun Spotify Premium.");
  } else {
    console.log("Lagu diputar berhasil!");
  }
};

import { loginToSpotify } from "../../services/Spotifyin";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-black to-gray-900">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Spotify Playlist Viewer</h1>
        <p className="mb-8 text-gray-300">Masuk dengan akunx Spotify Anda untuk melihat playlist Anda</p>
        <button onClick={loginToSpotify} className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors duration-300">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.418.18-.8.6-.919 4.561-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Login dengan Spotify</span>
        </button>
      </div>
    </div>
  );
}

export default Login;

// eslint-disable-next-line react/prop-types
function Navbar({ onLogout }) {
    return (
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Spotify Playlist Viewer</h1>
        <button 
          onClick={onLogout} 
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-white"
        >
          Keluar
        </button>
      </div>
    );
  }
  
  export default Navbar;
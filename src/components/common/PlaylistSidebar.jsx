import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function PlaylistSidebar({ playlists, loading, onSelectPlaylist, selectedPlaylistId }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Playlist Saya</h2>
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
          {playlists.map(playlist => (
            <div 
              key={playlist.id} 
              onClick={() => onSelectPlaylist(playlist)}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${selectedPlaylistId === playlist.id ? 'bg-gray-700 border-l-4 border-green-500' : ''}`}
            >
              {playlist.images && playlist.images.length > 0 ? (
                <img 
                  src={playlist.images[0].url} 
                  alt={playlist.name} 
                  className="w-12 h-12 rounded object-cover mr-3"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
              <div className="truncate text-white">
                <p className="font-medium truncate">{playlist.name}</p>
                <p className="text-xs text-gray-400 truncate">{playlist.tracks.total} lagu</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
PlaylistSidebar.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
      tracks: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onSelectPlaylist: PropTypes.func.isRequired,
  selectedPlaylistId: PropTypes.string,
};

export default PlaylistSidebar;

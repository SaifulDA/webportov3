import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function PlaylistDetail({ playlist, tracks, loading, onPlayTrack }) {
  if (!playlist) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center h-full">
        <svg className="w-16 h-16 text-gray-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.418.18-.8.6-.919 4.561-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <p className="text-gray-400 text-lg">Pilih playlist untuk melihat detailnya</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
        {playlist.images && playlist.images.length > 0 ? (
          <img src={playlist.images[0].url} alt={playlist.name} className="w-32 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6" />
        ) : (
          <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        )}
        <div className="text-white">
          <span className="text-xs font-medium uppercase text-gray-400">PLAYLIST</span>
          <h2 className="text-2xl md:text-3xl font-bold">{playlist.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{playlist.description || "Tidak ada deskripsi"}</p>
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <span className="font-medium">{playlist.owner.display_name}</span>
            <span className="mx-1">•</span>
            <span>{playlist.tracks.total} lagu</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 pl-4">#</th>
                <th className="pb-3">JUDUL</th>
                <th className="pb-3">ALBUM</th>
                <th className="pb-3">DURASI</th>
                <th className="pb-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((item, index) => (
                <tr key={item.track.id} className="hover:bg-gray-700 group text-white">
                  <td className="py-3 pl-4">{index + 1}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {item.track.album.images && item.track.album.images.length > 0 ? (
                        <img src={item.track.album.images[item.track.album.images.length - 1].url} alt={item.track.name} className="w-10 h-10 mr-3" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-700 mr-3"></div>
                      )}
                      <div>
                        <p className="font-medium">{item.track.name}</p>
                        <p className="text-sm text-gray-400">{item.track.artists.map((artist) => artist.name).join(", ")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-400">{item.track.album.name}</td>
                  <td className="py-3 pr-4 text-gray-400">
                    {Math.floor(item.track.duration_ms / 60000)}:{String(Math.floor((item.track.duration_ms % 60000) / 1000)).padStart(2, "0")}
                  </td>
                  <td className="py-3 pr-4">
                    <button onClick={() => onPlayTrack(item.track.uri)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      ▶ Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

PlaylistDetail.propTypes = {
  playlist: PropTypes.object,
  tracks: PropTypes.array,
  loading: PropTypes.bool,
  onPlayTrack: PropTypes.func,
};

export default PlaylistDetail;

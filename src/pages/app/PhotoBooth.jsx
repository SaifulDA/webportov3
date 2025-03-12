import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TakePhoto = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [filter, setFilter] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const takePhoto = async () => {
    if (photos.length >= 3) return;

    setCountdown(3);
    for (let i = 3; i > 0; i--) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCountdown(i - 1);
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.filter = filter;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setPhotos([...photos, canvas.toDataURL()]);
  };

  const retakePhoto = () => {
    setPhotos([]);
  };

  const handleDone = () => {
    navigate("/customize", { state: { photos } });
  };

  return (
    <div className="min-h-screen bg-white p-1 flex flex-col md:flex-row items-center justify-center gap-1">
      {/* Tutorial */}
      <div className="w-full md:w-1/4 bg-white rounded-lg p-1">
        <h2 className="text-2xl font-semibold mb-4 text-center">Tutorial</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li className="mb-2">Pilih filter di bawah kamera.</li>
          <li className="mb-2">Klik tombol &quot;Take Photo&quot; untuk mengambil gambar.</li>
          <li>Ambil 3 foto untuk melanjutkan.</li>
        </ol>
      </div>

      {/* Camera Section */}
      <div className="relative w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
        <div className="relative aspect-camera rounded-lg overflow-hidden mb-4">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" style={{ filter }} />
          {countdown !== null && (
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-2xl font-bold">
              {countdown}
            </p>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {["none", "grayscale(100%)", "sepia(100%)", "invert(100%)", "brightness(150%)"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full shadow-sm text-sm font-semibold transition-colors ${
                filter === f ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.replace("(100%)", "")}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={takePhoto}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-red-600 disabled:opacity-50"
            disabled={photos.length >= 3}
          >
             Take Photo
          </button>
          {photos.length === 3 && (
            <>
              <button
                onClick={retakePhoto}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-yellow-600"
              >
                 Retake
              </button>
              <button
                onClick={handleDone}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-green-600"
              >
                ✅ Done
              </button>
            </>
          )}
        </div>
      </div>

      {/* Captured Photos */}
      <div className="w-md md:w-1/7 bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Hasil Foto</h2>
        <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden">
          {photos.map((photo, index) => (
            <div key={index} className="relative flex-shrink-0 w-24 md:w-full"> {/* Ubah w-32 menjadi w-24 */}
              <img src={photo} className="w-full aspect-square object-cover rounded-lg shadow-sm" alt={`Photo ${index + 1}`} />
              <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">
                {index + 1}/3
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakePhoto;
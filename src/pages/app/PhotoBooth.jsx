import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar"; // Import Navbar
import Footer from "../home/Footer"; // Import Footer

const TakePhoto = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [filter, setFilter] = useState("none");
  const [showTakeAgain, setShowTakeAgain] = useState(false);
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
    setShowTakeAgain(false);

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
    setCountdown(null);
    setShowTakeAgain(true);
  };

  const retakePhoto = () => {
    setPhotos([]);
    setShowTakeAgain(false);
  };

  const handleDone = () => {
    navigate("/customize", { state: { photos } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-all lg:pt-20 xl:pt-20">
      <Navbar /> {/* Tambahkan Navbar */}
      <div id="photobooth" className="flex-1 p-4 flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Tutorial */}
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Tutorial</h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li className="mb-2">Select a filter below the camera.</li>
            <li className="mb-2">Click the &quot;Take Photo&quot; button to capture an image.</li>
            <li>Take 3 photos to proceed.</li>
            <li className="text-red-500 italic flex items-center">
              <i className="bi bi-exclamation-triangle-fill mr-1"></i>
              Note: Photos are not stored in the database.
            </li>
          </ol>
        </div>

        {/* Camera Section */}
        <div className="relative w-full md:w-1/3 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="relative aspect-camera rounded-lg overflow-hidden mb-4">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" style={{ filter }} />
            {countdown !== null && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-2xl font-bold">{countdown}</p>}
            {showTakeAgain && photos.length < 3 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-2xl font-bold">Take Again</p>}
          </div>
          <canvas ref={canvasRef} className="hidden" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {["none", "grayscale(100%)", "sepia(100%)", "invert(100%)", "brightness(150%)"].map((f) => (
              <button
                key={f}
                className={`px-4 py-2 rounded-full shadow-sm text-sm font-semibold transition-colors ${filter === f ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-blue-300"}`}
                onClick={() => setFilter(f)}
              >
                {f.replace("(100%)", "")}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            {photos.length < 3 ? (
              <button onClick={takePhoto} className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-red-600 disabled:opacity-50" disabled={countdown !== null}>
                {photos.length === 0 ? "Take Photo" : "Take Again"}
              </button>
            ) : (
              <>
                <button onClick={retakePhoto} className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-yellow-600">
                  Retake
                </button>
                <button onClick={handleDone} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-green-600">
                  ✅ Done
                </button>
              </>
            )}
          </div>
        </div>

        {/* Captured Photos */}
        <div className="w-md md:w-1/7 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Photo Result</h2>
          <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden">
            {photos.map((photo, index) => (
              <div key={index} className="relative flex-shrink-0 w-24 md:w-full">
                <img src={photo} className="w-full aspect-square object-cover rounded-lg shadow-sm" alt={`Photo ${index + 1}`} />
                <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">{index + 1}/3</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Tambahkan Footer */}
    </div>
  );
};

export default TakePhoto;

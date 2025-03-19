import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import { Camera, RefreshCw, CheckCircle, Image, Settings } from "lucide-react";

const TakePhoto = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [filter, setFilter] = useState("none");
  const [showTakeAgain, setShowTakeAgain] = useState(false);
  const [cameraLoaded, setCameraLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user", 
            width: { ideal: window.innerWidth < 768 ? 720 : 1280 }, 
            height: { ideal: window.innerWidth < 768 ? 1280 : 720 },
            aspectRatio: window.innerWidth < 768 ? 0.5625 : 1.7778 // 9:16 for mobile, 16:9 for desktop
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraLoaded(true);
          };
        }
      } catch (err) {
        setError("Camera access denied or not available. Please check your permissions.");
        console.error("Camera error:", err);
      }
    }

    setupCamera();

    return () => {
      // Clean up camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = async () => {
    if (photos.length >= 3) return;

    setCountdown(3);
    setShowTakeAgain(false);

    // Countdown animation
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

    // Add flash effect
    const flashElement = document.createElement("div");
    flashElement.style.position = "absolute";
    flashElement.style.top = "0";
    flashElement.style.left = "0";
    flashElement.style.width = "100%";
    flashElement.style.height = "100%";
    flashElement.style.backgroundColor = "white";
    flashElement.style.opacity = "0.7";
    flashElement.style.zIndex = "10";
    flashElement.style.transition = "opacity 0.5s";

    const videoContainer = videoRef.current.parentElement;
    videoContainer.appendChild(flashElement);

    setTimeout(() => {
      flashElement.style.opacity = "0";
      setTimeout(() => {
        videoContainer.removeChild(flashElement);
      }, 500);
    }, 100);

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

  const filters = [
    { name: "Normal", value: "none" },
    { name: "B&W", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Invert", value: "invert(100%)" },
    { name: "Bright", value: "brightness(150%)" },
    { name: "Contrast", value: "contrast(150%)" },
    { name: "Saturate", value: "saturate(200%)" },
    { name: "Blur", value: "blur(2px)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black transition-all">
      <Navbar />
      <div className="flex-1 px-4 py-8 md:py-12 flex flex-col items-center lg:pt-25 xl:pt-25">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black dark:text-white font-kreon tracking-wider">
          <Camera className="inline-block mr-2 mb-1" /> Photo Booth
        </h1>

        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
          {/* Tutorial */}
          <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <Settings className="mr-2" size={18} /> Tutorial
            </h2>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Select a filter from the options below the camera.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Click the &quot;Take Photo&quot; button and wait for the countdown.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Take 3 photos to proceed to customization.</span>
              </li>
              <li className="flex items-center text-amber-600 dark:text-amber-400 font-medium mt-4">
                <span className="mr-2">⚠️</span>
                <span>Photos are not stored in any database and remain private.</span>
              </li>
            </ol>
          </div>

          {/* Camera Section */}
          <div className="w-full md:w-2/4 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <div className="relative xl:aspect-video lg:aspect-video md:aspect-[9/16] rounded-xl overflow-hidden mb-6 bg-black">
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-4 text-center">
                  <div>
                    <p className="text-lg font-semibold mb-2">😢 Camera Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {!cameraLoaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              )}

              <video ref={videoRef} autoPlay className="w-full h-auto" style={{ filter }} />

              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <span className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{countdown}</span>
                  </div>
                </div>
              )}

              {showTakeAgain && photos.length < 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
                  <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg">
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Ready for next photo!</p>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {/* Filter Buttons */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      filter === f.value ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => setFilter(f.value)}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {photos.length < 3 ? (
                <button
                  onClick={takePhoto}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  disabled={countdown !== null || !cameraLoaded || error}
                >
                  <Camera className="mr-2" size={20} />
                  {photos.length === 0 ? "Take Photo" : `Take Photo (${photos.length}/3)`}
                </button>
              ) : (
                <div className="flex gap-3 w-full">
                  <button onClick={retakePhoto} className="flex-1 bg-amber-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center">
                    <RefreshCw className="mr-2" size={20} />
                    Retake
                  </button>
                  <button onClick={handleDone} className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center">
                    <CheckCircle className="mr-2" size={20} />
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Captured Photos */}
          <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <Image className="mr-2" size={18} /> Photo Results
            </h2>

            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative flex-shrink-0 md:w-full h-36 md:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                  {photos[index] ? (
                    <>
                      <img src={photos[index]} className="w-full h-full object-cover" alt={`Photo ${index + 1}`} />
                      <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs">{index + 1}/3</span>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-sm">Photo {index + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Photos taken: {photos.length}/3</span>
                <span>{photos.length === 3 ? "✅ Ready!" : "📸 Keep going!"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TakePhoto;

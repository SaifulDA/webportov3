import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const CustomizePhoto = () => {
  const location = useLocation();
  const { photos } = location.state || { photos: [] };
  const [frameColor, setFrameColor] = useState("#FFD1DC"); // Default: Pastel Pink
  const [textColor, setTextColor] = useState("white"); // Default: White
  const [addDate, setAddDate] = useState(false);
  const [createdBy, setCreatedBy] = useState("Saiful");
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const frameWidth = 180;
  const frameHeight = 500;
  const scaleFactor = 3;

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = frameWidth * scaleFactor;
    canvas.height = frameHeight * scaleFactor;

    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;

    const photoSize = 120 * scaleFactor;
    photos.slice(0, 3).forEach((photo, index) => {
      const x = ((frameWidth - 120) / 2) * scaleFactor;
      const y = (20 + index * (120 + 20)) * scaleFactor;
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, photoSize, photoSize, 15 * scaleFactor);
        ctx.clip();
        ctx.drawImage(img, x, y, photoSize, photoSize);
        ctx.restore();
      };
    });

    ctx.fillStyle = textColor;
    ctx.font = `${14 * scaleFactor}px Arial`;
    ctx.textAlign = "center";

    if (addDate) {
      ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 40 * scaleFactor);
    }

    ctx.fillText(`Created by ${createdBy}`, canvas.width / 2, canvas.height - 20 * scaleFactor);
  };

  useEffect(() => {
    drawCanvas();
  }, [photos, frameColor, textColor, addDate, createdBy]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "custom_photo.png";
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <section className="flex-grow p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Customize Your Photo</h1>
        <canvas ref={canvasRef} className="hidden" />
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-4 shadow-md flex justify-center">
            <div
              ref={previewRef}
              className="relative w-[220px] h-[500px] rounded-lg overflow-hidden flex flex-col items-center"
              style={{ backgroundColor: frameColor }}
            >
              {photos.slice(0, 3).map((photo, index) => (
                <img key={index} src={photo} className="w-[120px] h-[120px] rounded-lg object-cover my-3" alt="Captured" />
              ))}
              {addDate && (
                <p className={`absolute bottom-10 font-bold text-sm`} style={{ color: textColor }}>
                  {new Date().toLocaleDateString()}
                </p>
              )}
              <p className="absolute bottom-2 font-bold text-sm" style={{ color: textColor }}>
                Created by {createdBy}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-600 rounded-lg p-6 shadow-md text-gray-900 dark:text-white">
            <h2 className="text-lg font-semibold mb-4">Customize Your Photo</h2>

            {/* Pilihan Warna Frame */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Frame Color:</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Pastel Pink", color: "#FFD1DC" },
                  { name: "Pastel Blue", color: "#A7C7E7" },
                  { name: "Pastel Green", color: "#B7E4C7" },
                  { name: "Pastel Yellow", color: "#FFF5BA" },
                  { name: "Pastel Purple", color: "#D4A5A5" },
                  { name: "Pastel Peach", color: "#FFDAB9" },
                ].map(({ name, color }) => (
                  <button
                    key={name}
                    className={`w-8 h-8 rounded-full border shadow-sm transition-shadow hover:shadow-md ${frameColor === color ? "ring-2 ring-gray-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFrameColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Pilihan Warna Teks */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text Color:</label>
              <div className="flex gap-2">
                {["white", "black"].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border shadow-sm transition-shadow hover:shadow-md ${textColor === color ? "ring-2 ring-gray-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTextColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Checkbox Add Date */}
            <div className="flex items-center mb-4">
              <input type="checkbox" id="addDate" checked={addDate} onChange={() => setAddDate(!addDate)} className="mr-2 rounded border-gray-300 focus:ring-blue-500" />
              <label htmlFor="addDate" className="text-sm">
                Add Date
              </label>
            </div>

            {/* Pilihan "Created By" */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Created By:</label>
              <div className="flex flex-col gap-2">
                {["Saiful", "Love", "❤️"].map((name) => (
                  <label key={name} className="flex items-center">
                    <input type="radio" name="createdBy" value={name} checked={createdBy === name} onChange={() => setCreatedBy(name)} className="mr-2 rounded border-gray-300 focus:ring-blue-500" />
                    {name}
                  </label>
                ))}
              </div>
            </div>

            <button onClick={handleDownload} className="bg-black hover:bg-blue-600 text-white dark:bg-white dark:text-black dark:hover:text-white px-4 py-2 rounded-lg w-full transition-colors">
              Download Photo
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CustomizePhoto;

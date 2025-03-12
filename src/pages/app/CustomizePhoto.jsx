import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const CustomizePhoto = () => {
  const location = useLocation();
  const { photos } = location.state || { photos: [] };
  const [frameColor, setFrameColor] = useState("black");
  const [addDate, setAddDate] = useState(false);
  const [createdBy, setCreatedBy] = useState("Saiful");
  const canvasRef = useRef(null);
  const previewRef = useRef(null);
  const frameWidth = 180;
  const frameHeight = 500;
  
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = frameWidth;
    canvas.height = frameHeight;

    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const photoSize = 120;
    photos.slice(0, 3).forEach((photo, index) => {
      const x = (frameWidth - photoSize) / 2;
      const y = 20 + index * (photoSize + 20);
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, photoSize, photoSize, 15);
        ctx.clip();
        ctx.drawImage(img, x, y, photoSize, photoSize);
        ctx.restore();
      };
    });

    if (addDate) {
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(new Date().toLocaleDateString(), frameWidth / 2, frameHeight - 40);
    }
    ctx.fillStyle = "white";
    ctx.fillText(`Created by ${createdBy}`, frameWidth / 2, frameHeight - 20);
  };

  useEffect(() => {
    drawCanvas();
  }, [photos, frameColor, addDate, createdBy]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "custom_photo.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Customize Your Photo</h1>
      <canvas ref={canvasRef} className="hidden" />
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex justify-center">
          <div
            ref={previewRef}
            className="relative w-[220px] h-[500px] rounded-lg overflow-hidden flex flex-col items-center"
            style={{ backgroundColor: frameColor }}
          >
            {photos.slice(0, 3).map((photo, index) => (
              <img key={index} src={photo} className="w-[120px] h-[120px] rounded-lg object-cover my-3" alt="Captured" />
            ))}
            {addDate && (
              <p className="absolute bottom-10 text-white font-bold text-sm">
                {new Date().toLocaleDateString()}
              </p>
            )}
            <p className="absolute bottom-2 text-white font-bold text-sm">Created by {createdBy}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Customize Your Photo</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Frame Color:</label>
            <div className="flex flex-wrap gap-2">
              {["black", "red", "blue", "green", "yellow", "white"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border shadow-sm transition-shadow hover:shadow-md ${frameColor === color ? "ring-2 ring-gray-500" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFrameColor(color)}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="addDate"
              checked={addDate}
              onChange={() => setAddDate(!addDate)}
              className="mr-2 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="addDate" className="text-sm">Add Date</label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Created By:</label>
            <div className="flex flex-col gap-2">
              {["Saiful", "Love", "❤️"].map((name) => (
                <label key={name} className="flex items-center">
                  <input
                    type="radio"
                    name="createdBy"
                    value={name}
                    checked={createdBy === name}
                    onChange={() => setCreatedBy(name)}
                    className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition-colors"
          >
            Download Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizePhoto;

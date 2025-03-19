/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import "../../styles/PbCs.css";
import { Download, Image as ImageIcon, Palette, Type, Calendar, UserCircle, Heart, ThumbsUp } from "lucide-react";

const CustomizePhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { photos } = location.state || { photos: [] };
  const [frameColor, setFrameColor] = useState("#FFD1DC"); // Default: Pastel Pink
  const [textColor, setTextColor] = useState("white"); // Default: White
  const [addDate, setAddDate] = useState(false);
  const [createdBy, setCreatedBy] = useState("Saiful");
  const [selectedIcon, setSelectedIcon] = useState("heart");
  const [iconColor, setIconColor] = useState("#FF0000");
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef(null);
  const frameWidth = 180;
  const frameHeight = 500;
  const scaleFactor = 5;

  useEffect(() => {
    // If no photos, redirect back to take photo page
    if (!photos || !photos.length) {
      navigate("/take-photo");
    }
  }, [photos, navigate]);

  const icons = {
    heart: (x, y, size, color, ctx) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      // Draw heart shape
      const topX = x + size / 2;
      const topY = y + size / 4;

      ctx.moveTo(topX, topY);
      // Left curve
      ctx.bezierCurveTo(topX - size / 2, topY - size / 2, topX - size, topY + size / 3, topX, topY + size);
      // Right curve
      ctx.bezierCurveTo(topX + size, topY + size / 3, topX + size / 2, topY - size / 2, topX, topY);
      ctx.fill();
    },
    star: (x, y, size, color, ctx) => {
      ctx.fillStyle = color;

      // Draw 5-point star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerX = x + size / 2 + (size / 2) * Math.cos(Math.PI / 2 + (i * 2 * Math.PI) / 5);
        const outerY = y + size / 2 + (size / 2) * Math.sin(Math.PI / 2 + (i * 2 * Math.PI) / 5);
        ctx.lineTo(outerX, outerY);

        const innerX = x + size / 2 + (size / 5) * Math.cos(Math.PI / 2 + (i * 2 * Math.PI) / 5 + Math.PI / 5);
        const innerY = y + size / 2 + (size / 5) * Math.sin(Math.PI / 2 + (i * 2 * Math.PI) / 5 + Math.PI / 5);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
    },
    smile: (x, y, size, color, ctx) => {
      ctx.fillStyle = color;

      // Draw smiley face
      // Face
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fill();

      // Eyes (white)
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x + size / 3, y + size / 3, size / 8, 0, 2 * Math.PI);
      ctx.arc(x + (size * 2) / 3, y + size / 3, size / 8, 0, 2 * Math.PI);
      ctx.fill();

      // Smile (white)
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size / 3, 0, Math.PI);
      ctx.fill();
    },
    crown: (x, y, size, color, ctx) => {
      ctx.fillStyle = color;

      // Draw crown
      ctx.beginPath();
      ctx.moveTo(x, y + size / 2);
      ctx.lineTo(x + size / 4, y);
      ctx.lineTo(x + size / 2, y + size / 3);
      ctx.lineTo(x + (size * 3) / 4, y);
      ctx.lineTo(x + size, y + size / 2);
      ctx.lineTo(x, y + size / 2);
      ctx.fill();
    },
    flower: (x, y, size, color, ctx) => {
      const centerX = x + size / 2;
      const centerY = y + size / 2;
      const petalSize = size / 3;

      // Draw flower petals
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const angle = (i * 2 * Math.PI) / 5;
        const petalX = centerX + (size / 2 - petalSize / 2) * Math.cos(angle);
        const petalY = centerY + (size / 2 - petalSize / 2) * Math.sin(angle);
        ctx.arc(petalX, petalY, petalSize, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw center
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(centerX, centerY, size / 5, 0, 2 * Math.PI);
      ctx.fill();
    },
  };

  // Function to create rounded rectangle that's compatible with all browsers
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const hex = color.replace("#", "");
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = frameWidth * scaleFactor;
    canvas.height = frameHeight * scaleFactor;

    // Frame Color
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Photo size in canvas
    const photoWidth = 120 * scaleFactor;
    const photoHeight = 120 * scaleFactor;

    // Draw decorative patterns (optional)
    ctx.fillStyle = adjustColor(frameColor, -20); // Slightly darker shade
    for (let i = 0; i < 10; i++) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 10 * scaleFactor, 10 * scaleFactor);
    }

    // We'll handle drawing photos in a separate function
    // to properly handle the asynchronous image loading
    drawPhotosOnCanvas(ctx, photoWidth, photoHeight);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${14 * scaleFactor}px Arial`;
    ctx.textAlign = "center";

    // Add date if checked
    if (addDate) {
      ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, canvas.height - 40 * scaleFactor);
    }

    // Add "Created by" text
    ctx.fillText(`Created by ${createdBy}`, canvas.width / 2, canvas.height - 20 * scaleFactor);
  };

  const drawPhotosOnCanvas = (ctx, photoWidth, photoHeight) => {
    // Safety check
    if (!photos || !photos.length) return;

    // Process each photo
    const processNextPhoto = (index) => {
      if (index >= photos.length || index >= 3) return;

      const x = ((frameWidth - 120) / 2) * scaleFactor;
      const y = (20 + index * (120 + 20)) * scaleFactor;

      // Draw photo shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 10 * scaleFactor;
      ctx.shadowOffsetX = 3 * scaleFactor;
      ctx.shadowOffsetY = 3 * scaleFactor;

      // Draw photo background with rounded corners
      ctx.fillStyle = "#FFFFFF";
      roundRect(ctx, x, y, photoWidth, photoHeight, 15 * scaleFactor);
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Create a new image element instead of using the constructor
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous"; // Handle CORS issues
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        roundRect(ctx, x, y, photoWidth, photoHeight, 15 * scaleFactor);
        ctx.clip();
        ctx.drawImage(img, x, y, photoWidth, photoHeight);
        ctx.restore();

        // Draw icons at the corners of the photo (outside the photo)
        if (selectedIcon && icons[selectedIcon]) {
          const iconSize = 30 * scaleFactor;
          // Position icon at the top-right corner outside the photo
          const iconX = x + photoWidth;
          const iconY = y - iconSize / 2;
          icons[selectedIcon](iconX, iconY, iconSize, iconColor, ctx);
        }

        // Process next photo
        processNextPhoto(index + 1);
      };

      img.onerror = () => {
        console.error(`Failed to load image at index ${index}`);
        processNextPhoto(index + 1);
      };

      img.src = photos[index];
    };

    // Start processing photos
    processNextPhoto(0);
  };

  useEffect(() => {
    drawCanvas();
  }, [photos, frameColor, textColor, addDate, createdBy, selectedIcon, iconColor]);

  const handleDownload = () => {
    // Make sure canvas is fully rendered before downloading
    setTimeout(() => {
      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Download the image
      const link = document.createElement("a");
      link.download = "fancy_photo_booth.png";

      if (canvasRef.current) {
        link.href = canvasRef.current.toDataURL("image/png", 1.0);
        link.click();
      }
    }, 500); // Small delay to ensure canvas is fully rendered
  };

  // Predefined frame colors with names
  const frameColors = [
    { name: "Pastel Pink", color: "#FFD1DC" },
    { name: "Pastel Blue", color: "#A7C7E7" },
    { name: "Pastel Green", color: "#B7E4C7" },
    { name: "Pastel Yellow", color: "#FFF5BA" },
    { name: "Pastel Purple", color: "#D4A5A5" },
    { name: "Pastel Peach", color: "#FFDAB9" },
    { name: "Lavender", color: "#E6E6FA" },
    { name: "Mint", color: "#98FB98" },
    { name: "Coral", color: "#FF7F50" },
    { name: "Sky Blue", color: "#87CEEB" },
  ];

  // Predefined icon colors
  const iconColors = [
    { name: "Red", color: "#FF0000" },
    { name: "Pink", color: "#FF69B4" },
    { name: "Orange", color: "#FFA500" },
    { name: "Yellow", color: "#FFD700" },
    { name: "Green", color: "#00FF00" },
    { name: "Blue", color: "#0000FF" },
    { name: "Purple", color: "#800080" },
    { name: "White", color: "#FFFFFF" },
    { name: "Black", color: "#000000" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black transition-colors duration-300">
      <Navbar />
      <section data-aos="fade-up" className="flex-grow p-6 flex flex-col items-center lg:pt-25 xl:pt-25">
        <div data-aos="fade-up" className="text-3xl md:text-4xl font-bold mb-8 text-center text-black dark:text-white font-kreon tracking-wider">
          <Palette className="inline-block mr-2 mb-1" /> Customize Your Photo
        </div>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-500 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white flex items-center font-kreon tracking-wider">
              <ImageIcon className="mr-2" size={20} /> Preview
            </h2>

            <div className="relative w-[180px] h-[500px] rounded-xl overflow-hidden flex flex-col items-center shadow-md dark:shadow-gray-500 border" style={{ backgroundColor: frameColor }}>
              {photos &&
                photos.slice(0, 3).map((photo, index) => (
                  <div key={index} className="relative mt-5">
                    <img src={photo} className="w-[120px] h-[120px] rounded-lg object-cover shadow-md dark:shadow-gray-500" alt={`Photo ${index + 1}`} />

                    {/* Move icon to the top-right corner outside the photo */}
                    {selectedIcon === "heart" && (
                      <div className="absolute -top-3 -right-3 text-2xl" style={{ color: iconColor }}>
                        ❤️
                      </div>
                    )}
                    {selectedIcon === "star" && (
                      <div className="absolute -top-3 -right-3 text-2xl" style={{ color: iconColor }}>
                        ⭐
                      </div>
                    )}
                    {selectedIcon === "smile" && (
                      <div className="absolute -top-3 -right-3 text-2xl" style={{ color: iconColor }}>
                        😊
                      </div>
                    )}
                    {selectedIcon === "crown" && (
                      <div className="absolute -top-3 -right-3 text-2xl" style={{ color: iconColor }}>
                        👑
                      </div>
                    )}
                    {selectedIcon === "flower" && (
                      <div className="absolute -top-3 -right-3 text-2xl" style={{ color: iconColor }}>
                        🌸
                      </div>
                    )}
                  </div>
                ))}

              {addDate && (
                <p className="absolute bottom-10 font-bold text-sm" style={{ color: textColor }}>
                  {new Date().toLocaleDateString()}
                </p>
              )}

              <p className="absolute bottom-2 font-bold text-sm" style={{ color: textColor }}>
                Created by {createdBy}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-500 text-gray-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-6 text-black dark:text-white font-kreon tracking-wider">Customize Options</h2>

            {/* Frame Color */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium mb-3">
                <Palette className="mr-2" size={16} /> Frame Color:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {frameColors.map(({ name, color }) => (
                  <button
                    key={color}
                    title={name}
                    className={`w-8 h-8 rounded-full border shadow-sm transition-all hover:scale-110 ${frameColor === color ? "ring-2 ring-blue-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFrameColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium mb-3">
                <Type className="mr-2" size={16} /> Text Color:
              </label>
              <div className="flex space-x-2">
                <button className={`w-8 h-8 rounded-full border shadow transition-all hover:scale-110 ${textColor === "white" ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: "white" }} onClick={() => setTextColor("white")} />
                <button className={`w-8 h-8 rounded-full border shadow transition-all hover:scale-110 ${textColor === "black" ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: "black" }} onClick={() => setTextColor("black")} />
                <button className={`w-8 h-8 rounded-full border shadow transition-all hover:scale-110 ${textColor === "yellow" ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: "yellow" }} onClick={() => setTextColor("yellow")} />
                <button className={`w-8 h-8 rounded-full border shadow transition-all hover:scale-110 ${textColor === "red" ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: "red" }} onClick={() => setTextColor("red")} />
                <button className={`w-8 h-8 rounded-full border shadow transition-all hover:scale-110 ${textColor === "blue" ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: "blue" }} onClick={() => setTextColor("blue")} />
              </div>
            </div>

            {/* Icon Selection */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium mb-3">
                <ThumbsUp className="mr-2" size={16} /> Select Icon:
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`p-2 rounded-lg border shadow-sm transition-all hover:scale-105 ${selectedIcon === "heart" ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                  onClick={() => setSelectedIcon("heart")}
                >
                  <Heart className="text-red-500" size={24} />
                </button>
                <button
                  className={`p-2 rounded-lg border shadow-sm transition-all hover:scale-105 ${selectedIcon === "star" ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                  onClick={() => setSelectedIcon("star")}
                >
                  ⭐
                </button>
                <button
                  className={`p-2 rounded-lg border shadow-sm transition-all hover:scale-105 ${selectedIcon === "smile" ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                  onClick={() => setSelectedIcon("smile")}
                >
                  😊
                </button>
                <button
                  className={`p-2 rounded-lg border shadow-sm transition-all hover:scale-105 ${selectedIcon === "crown" ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                  onClick={() => setSelectedIcon("crown")}
                >
                  👑
                </button>
                <button
                  className={`p-2 rounded-lg border shadow-sm transition-all hover:scale-105 ${selectedIcon === "flower" ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                  onClick={() => setSelectedIcon("flower")}
                >
                  🌸
                </button>
              </div>
            </div>

            {/* Icon Color */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium mb-3">
                <Palette className="mr-2" size={16} /> Icon Color:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {iconColors.map(({ name, color }) => (
                  <button
                    key={color}
                    title={name}
                    className={`w-8 h-8 rounded-full border shadow-sm transition-all hover:scale-110 ${iconColor === color ? "ring-2 ring-blue-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setIconColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Other Options */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium mb-3">
                <Calendar className="mr-2" size={16} /> Other Options:
              </label>
              <div className="flex items-center mb-3">
                <input type="checkbox" id="addDate" checked={addDate} onChange={() => setAddDate(!addDate)} className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="addDate" className="text-sm">
                  Add Date
                </label>
              </div>
              <div className="flex items-center">
                <UserCircle className="mr-2" size={16} />
                <input type="text" placeholder="Your name" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} className="text-sm p-2 border rounded bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center shadow-md dark:shadow-gray-500 hover:shadow-lg transition-all hover:scale-105"
            >
              <Download className="mr-2" size={20} /> Download Photo
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CustomizePhoto;

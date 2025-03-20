/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import "../../styles/mybook.css";
import { ChevronLeft, ChevronRight, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import reactEbookPage1 from "../../assets/images/rembulan/1.png";
import reactEbookPage2 from "../../assets/images/rembulan/2.png";
import reactEbookPage3 from "../../assets/images/rembulan/3.png";
import reactEbookPage4 from "../../assets/images/rembulan/4.png";
import reactEbookPage5 from "../../assets/images/rembulan/5.png";
import reactEbookPage6 from "../../assets/images/rembulan/6.png";
import reactEbookPage7 from "../../assets/images/rembulan/7.png";
import reactEbookPage8 from "../../assets/images/rembulan/8.png";
import reactEbookPage9 from "../../assets/images/rembulan/9.png";
import reactEbookPage10 from "../../assets/images/rembulan/10.png";
import reactEbookPage11 from "../../assets/images/rembulan/11.png";
import reactEbookPage12 from "../../assets/images/rembulan/12.png";
import reactEbookPage13 from "../../assets/images/rembulan/13.png";
import reactEbookPage14 from "../../assets/images/rembulan/14.png";
import reactEbookPage15 from "../../assets/images/rembulan/15.png";
import reactEbookPage16 from "../../assets/images/rembulan/16.png";
import reactEbookPage17 from "../../assets/images/rembulan/17.png";
import reactEbookPage18 from "../../assets/images/rembulan/18.png";
import reactEbookPage19 from "../../assets/images/rembulan/19.png";
import reactEbookPage20 from "../../assets/images/rembulan/20.png";
import reactEbookPage21 from "../../assets/images/rembulan/21.png";
import reactEbookPage22 from "../../assets/images/rembulan/22.png";
import reactEbookPage23 from "../../assets/images/rembulan/23.png";

const pages = [
  reactEbookPage1,
  reactEbookPage2,
  reactEbookPage3,
  reactEbookPage4,
  reactEbookPage5,
  reactEbookPage6,
  reactEbookPage7,
  reactEbookPage8,
  reactEbookPage9,
  reactEbookPage10,
  reactEbookPage11,
  reactEbookPage12,
  reactEbookPage13,
  reactEbookPage14,
  reactEbookPage15,
  reactEbookPage16,
  reactEbookPage17,
  reactEbookPage18,
  reactEbookPage19,
  reactEbookPage20,
  reactEbookPage21,
  reactEbookPage22,
  reactEbookPage23,
];

const EbookViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // Add zoom level state
  
  // Check if the screen size is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Set loaded state after initial render
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Handle fullscreen transition effects
  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    
    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  const nextPage = () => {
    if (!flipping) {
      setDirection("forward");
      setFlipping(true);
      
      setTimeout(() => {
        if (isMobile) {
          if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
          }
        } else {
          if (currentPage < pages.length - 2) {
            setCurrentPage(currentPage + 2);
          }
        }
        setFlipping(false);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !flipping) {
      setDirection("backward");
      setFlipping(true);
      
      setTimeout(() => {
        if (isMobile) {
          setCurrentPage(currentPage - 1);
        } else {
          setCurrentPage(currentPage - 2);
        }
        setFlipping(false);
      }, 800);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle zoom in function
  const zoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 20);
    }
  };

  // Handle zoom out function
  const zoomOut = () => {
    if (zoomLevel > 60) {
      setZoomLevel(zoomLevel - 20);
    }
  };

  // Handle resetting zoom to default
  const resetZoom = () => {
    setZoomLevel(100);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "f") {
        toggleFullscreen();
      } else if (e.key === "+" || e.key === "=") {
        zoomIn();
      } else if (e.key === "-") {
        zoomOut();
      } else if (e.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      setFlipping(false);
    };
  }, [currentPage, flipping, isFullscreen, isMobile, zoomLevel]);

  // Prevent scrolling when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  // Render mobile view (single page)
  const renderMobileView = () => (
    <div 
      id="ebook-container-mobile" 
      className={`relative w-full transition-all duration-300 ease-in-out ${isFullscreen ? "max-w-md" : "max-w-xs"}`}
    >
      {/* Improved header - fixed position at top */}
      <div className={`${isFullscreen ? "fixed" : "sticky"} top-0  left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-md p-3 flex justify-between items-center transition-all duration-300`}>
        <h1 className="font-kreon tracking-wider text-2xl font-bold">Rembulan</h1>
        <span className="text-sm font-semibold bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
          Page {currentPage + 1} of {pages.length}
        </span>
      </div>

      {/* Adding top padding to account for the fixed header */}
      <div className={`${isFullscreen ? "pt-16" : "pt-4"} transition-all duration-300`}>
        {/* Single page container */}
        <div className={`relative flex justify-center items-center w-full aspect-[3/4] mb-6 transition-transform duration-300 ease-in-out ${isFullscreen ? "scale-110" : "scale-100"}`}>
          {/* Book with single page */}
          <div 
            className={`w-full h-full flex relative book-shadow rounded-lg overflow-hidden bg-white dark:bg-gray-800 
              ${flipping && direction === "forward" ? "animate-page-flip-mobile-forward" : ""} 
              ${flipping && direction === "backward" ? "animate-page-flip-mobile-backward" : ""}`}
            style={{
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 p-4 flex justify-center items-center">
              <img 
                src={pages[currentPage]} 
                alt={`Page ${currentPage + 1}`} 
                className="w-full h-full object-contain" 
                style={{ transform: `scale(${zoomLevel / 100})` }}
              />
            </div>

            {/* Page corner fold effect */}
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-bl from-gray-300 to-transparent opacity-50"></div>
          </div>

          {/* Page turning overlay */}
          {flipping && (
            <div className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${direction === "forward" ? "animate-page-shadow-right" : "animate-page-shadow-left"}`}></div>
          )}
        </div>
      </div>

      {/* Improved navigation buttons with zoom controls - fixed at bottom with contrasting background */}
      <div className={`${isFullscreen ? "fixed" : "sticky"} bottom-4 left-0 right-0 z-40 flex justify-center items-center space-x-4 transition-all duration-300`}>
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || flipping}
          className={`p-3 rounded-full transition-all ${
            currentPage === 0 || flipping 
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:scale-105 shadow-lg"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={zoomOut}
          disabled={zoomLevel <= 60}
          className={`p-3 rounded-full transition-all ${
            zoomLevel <= 60
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 hover:scale-105 shadow-lg"
          }`}
          aria-label="Zoom out"
        >
          <ZoomOut size={24} />
        </button>

        <div className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-medium">
          {zoomLevel}%
        </div>

        <button
          onClick={zoomIn}
          disabled={zoomLevel >= 200}
          className={`p-3 rounded-full transition-all ${
            zoomLevel >= 200
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 hover:scale-105 shadow-lg"
          }`}
          aria-label="Zoom in"
        >
          <ZoomIn size={24} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 active:bg-green-800 hover:scale-105 shadow-lg transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage >= pages.length - 1 || flipping}
          className={`p-3 rounded-full transition-all ${
            currentPage >= pages.length - 1 || flipping 
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:scale-105 shadow-lg"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );

  // Render desktop view (double page)
  const renderDesktopView = () => (
    <div 
      id="ebook-container-desktop" 
      className={`relative w-full transition-all duration-300 ease-in-out ${isFullscreen ? "max-w-6xl" : "max-w-4xl"}`}
    >
      {/* Improved header with contrasting background */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
        <h1 className="font-kreon tracking-wider text-4xl font-bold">Rembulan</h1>
        <div className="flex items-center space-x-4">
          {/* Zoom controls in header */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 60}
              className={`p-2 rounded-full transition-all ${
                zoomLevel <= 60
                  ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
                  : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 hover:scale-105"
              }`}
              aria-label="Zoom out"
            >
              <ZoomOut size={20} />
            </button>
            
            <span className="text-md font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded-md">
              {zoomLevel}%
            </span>
            
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 200}
              className={`p-2 rounded-full transition-all ${
                zoomLevel >= 200
                  ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
                  : "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 hover:scale-105"
              }`}
              aria-label="Zoom in"
            >
              <ZoomIn size={20} />
            </button>
            
            <button
              onClick={resetZoom}
              className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Reset
            </button>
          </div>
          
          <span className="text-lg font-semibold bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full">
            Page {currentPage + 1} - {Math.min(currentPage + 2, pages.length)} of {pages.length}
          </span>
        </div>
      </div>

      {/* Book container with perspective - modified to handle overflow better */}
      <div className="relative mb-10 overflow-visible">
        <div 
          className={`relative flex justify-center items-center w-full aspect-[2/1.3] transition-all duration-300 ease-in-out ${isFullscreen ? "scale-105" : "scale-100"}`}
          style={{ 
            perspective: "2000px"
          }}
        >
          {/* Scrollable container for when zoomed in */}
          <div 
            className="relative w-full h-full overflow-auto"
            style={{ 
              maxHeight: zoomLevel > 100 ? "60vh" : "none"
            }}
          >
            {/* Main book container with 3D effect */}
            <div 
              className="w-full h-full flex relative shadow-2xl rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800"
              style={{ 
                boxShadow: "0 20px 30px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.1)",
                transform: `rotateX(5deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.3s ease",
                minHeight: zoomLevel > 100 ? "100%" : "auto"
              }}
            >
              {/* Book spine/binding */}
              <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-4 h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 z-10 shadow-inner"></div>
              
              {/* Left page */}
              <div
                className={`w-1/2 h-full bg-white dark:bg-gray-200 relative origin-right transform transition-all duration-800 ease-in-out ${flipping && direction === "backward" ? "animate-page-flip-right" : ""}`}
                style={{
                  boxShadow: "inset -10px 0 20px rgba(0,0,0,0.1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  borderRight: "1px solid rgba(0,0,0,0.1)"
                }}
              >
                <div className="absolute inset-0 p-6 flex justify-center items-center">
                  <img 
                    src={pages[currentPage]} 
                    alt={`Page ${currentPage + 1}`} 
                    className="w-full h-full object-contain"
                    style={{ 
                      transform: `rotateY(0deg) scale(${zoomLevel / 100})`,
                      transformOrigin: "center center",
                      transition: "transform 0.3s ease"
                    }}
                  />
                </div>

                {/* Page fold effect */}
                <div 
                  className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)"
                  }}
                ></div>
              </div>

              {/* Right page */}
              <div
                className={`w-1/2 h-full bg-white dark:bg-gray-200 relative origin-left transform transition-all duration-800 ease-in-out ${flipping && direction === "forward" ? "animate-page-flip-left" : ""}`}
                style={{
                  boxShadow: "inset 10px 0 20px rgba(0,0,0,0.1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  borderLeft: "1px solid rgba(0,0,0,0.1)"
                }}
              >
                {currentPage + 1 < pages.length && (
                  <div className="absolute inset-0 p-6 flex justify-center items-center">
                    <img 
                      src={pages[currentPage + 1]} 
                      alt={`Page ${currentPage + 2}`} 
                      className="w-full h-full object-contain"
                      style={{ 
                        transform: `rotateY(0deg) scale(${zoomLevel / 100})`,
                        transformOrigin: "center center",
                        transition: "transform 0.3s ease"
                      }}
                    />
                  </div>
                )}

                {/* Page fold effect */}
                <div 
                  className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: "linear-gradient(-135deg, transparent 50%, rgba(0,0,0,0.05) 50%)"
                  }}
                ></div>
              </div>

              {/* Page turning shadow overlay */}
              {flipping && (
                <div 
                  className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${
                    direction === "forward" 
                      ? "bg-gradient-to-l from-transparent to-black/10" 
                      : "bg-gradient-to-r from-transparent to-black/10"
                  }`}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced navigation with visual feedback - Fixed position independent of zoom */}
      <div className="flex justify-center items-center space-x-10 bg-white dark:bg-gray-800 p-5 rounded-full shadow-lg sticky bottom-4 z-40">
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || flipping}
          className={`p-4 rounded-full transition-all duration-200 transform ${
            currentPage === 0 || flipping 
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:scale-110 shadow-lg"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-4 rounded-full bg-green-600 text-white hover:bg-green-700 active:bg-green-800 hover:scale-110 shadow-lg transition-all duration-200 transform"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={32} /> : <Maximize size={32} />}
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage >= pages.length - 2 || flipping}
          className={`p-4 rounded-full transition-all duration-200 transform ${
            currentPage >= pages.length - 2 || flipping 
              ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-200" 
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:scale-110 shadow-lg"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );

  // Main render function
  const renderBookContent = () => (
    isMobile ? renderMobileView() : renderDesktopView()
  );

  if (isFullscreen) {
    return (
      <div 
        className={`fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex items-center justify-center transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-90" : "opacity-100"}`}
      >
        {renderBookContent()}
      </div>
    );
  }

  return (
    <div className={`bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col transition-opacity duration-300 ease-in-out ${!loaded ? "opacity-0" : isTransitioning ? "opacity-90" : "opacity-100"}`}>
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6 mt-10">
        {renderBookContent()}
      </div>
      <Footer />
    </div>
  );
};

export default EbookViewer;
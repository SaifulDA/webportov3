/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import  "../../styles/mybook.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import reactEbookPage1 from "../../assets/images/cc.png";
import reactEbookPage2 from "../../assets/images/dt.jpg";
import reactEbookPage3 from "../../assets/images/wisuda.jpg";
import reactEbookPage4 from "../../assets/images/wd.png";
import reactEbookPage5 from "../../assets/images/webv2.png";
import reactEbookPage6 from "../../assets/images/cc.png";
const pages = [reactEbookPage1, reactEbookPage2, reactEbookPage3, reactEbookPage4, reactEbookPage5, reactEbookPage6];

const EbookViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState(null);

  const nextPage = () => {
    if (currentPage < pages.length - 2 && !flipping) {
      setDirection("forward");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 2);
        setFlipping(false);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !flipping) {
      setDirection("backward");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 2);
        setFlipping(false);
      }, 800);
    }
  };

  // Clean up animation state when component unmounts
  useEffect(() => {
    return () => {
      setFlipping(false);
    };
  }, []);

  return (
    <div className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col pt-16">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6 mt-10">
        <div className="relative w-full max-w-2xl">
          <div className="flex justify-center mb-4">
            <h1 className="flex flex-col font-kreon tracking-wider text-4xl mb-2 flex-grow">Rembulan</h1>
            <span className="text-lg font-semibold">
              Page {currentPage + 1} - {Math.min(currentPage + 2, pages.length)} of {pages.length}
            </span>
          </div>
          
          {/* Book container with perspective */}
          <div className="relative flex justify-center items-center w-full aspect-[2/1.2] mb-10 perspective-1000">
            {/* Book binding */}
            <div className="absolute inset-0 flex justify-center">
              <div className="h-full w-1 bg-gray-400 shadow-lg z-10"></div>
            </div>
            
            {/* Book with pages */}
            <div className="w-full h-full flex relative book-shadow rounded-lg overflow-hidden">
              {/* Left page */}
              <div 
                className={`w-1/2 h-full bg-white dark:bg-gray-800 relative origin-right transform transition-all duration-800 ease-in-out ${
                  flipping && direction === "backward" ? "animate-page-flip-right" : ""
                }`}
                style={{
                  boxShadow: "inset -10px 0 20px rgba(0,0,0,0.1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="absolute inset-0 p-4 flex justify-center items-center">
                  <img 
                    src={pages[currentPage]} 
                    alt={`Page ${currentPage + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Page corner fold effect */}
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-300 to-transparent transform rotate-0 opacity-50"></div>
              </div>
              
              {/* Right page */}
              <div 
                className={`w-1/2 h-full bg-white dark:bg-gray-800 relative origin-left transform transition-all duration-800 ease-in-out ${
                  flipping && direction === "forward" ? "animate-page-flip-left" : ""
                }`}
                style={{
                  boxShadow: "inset 10px 0 20px rgba(0,0,0,0.1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                {currentPage + 1 < pages.length && (
                  <div className="absolute inset-0 p-4 flex justify-center items-center">
                    <img 
                      src={pages[currentPage + 1]} 
                      alt={`Page ${currentPage + 2}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                {/* Page corner fold effect */}
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-gray-300 to-transparent opacity-50"></div>
              </div>
              
              {/* Page turning overlay */}
              {flipping && (
                <div 
                  className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${
                    direction === "forward" ? "animate-page-shadow-right" : "animate-page-shadow-left"
                  }`} 
                ></div>
              )}
            </div>
          </div>
          
          {/* Navigation buttons - now at the bottom */}
          <div className="flex justify-center items-center mt-2 mb-6 space-x-8">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0 || flipping} 
              className={`p-3 rounded-full transition-all ${
                currentPage === 0 || flipping 
                  ? "opacity-50 cursor-not-allowed bg-gray-400" 
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md"
              }`}
            >
              <ChevronLeft size={28} />
            </button>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage >= pages.length - 2 || flipping} 
              className={`p-3 rounded-full transition-all ${
                currentPage >= pages.length - 2 || flipping 
                  ? "opacity-50 cursor-not-allowed bg-gray-400" 
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md"
              }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EbookViewer;
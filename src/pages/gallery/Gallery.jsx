/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const Gallery = () => {
  return (
    <div id="gallery" className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Video Section */}
      <div className="w-full h-screen sm:h-auto mx-auto px-4 overflow-hidden">
        <div className="relative w-full h-full sm:pb-[56.25%]">
          <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg">
            <source src="https://nikizefanya.com/wp-content/uploads/2024/08/NIKI_BUZZ_MV_CUTDOWN_WIDE_7.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold border-b-2 border-gray-500 pb-2 inline-block">Gallery</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-12">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-500 p-4 rounded-lg shadow-lg">
            <img src="/path-to-your-image.jpg" alt="Gallery Item" className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-2">Title</h3>
            <p className="text-gray-400">Caption</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;

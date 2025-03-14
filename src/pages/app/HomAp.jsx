/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const hap = () => {
  return (
    <div id="app" className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <section data-aos="fade-up" className="flex-grow flex flex-col items-center justify-center text-center">
        {/* Judul dengan garis atas & bawah */}
        <div className="w-3/4 py-12 px-6 md:px-16 lg:pt-25 xl:pt-25">
          <hr className="border-black dark:border-white" />
          <h1 className="text-3xl md:text-4xl font-semibold dark:text-white my-2 font-kreon tracking-wider">My App</h1>
          <hr className="border-black dark:border-white" />
        </div>

        {/* Kontainer Icon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 px-6">
          {/* PhotoBooth */}
          <Link to="/photobooth" className="flex flex-col items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition transform hover:scale-110">
            <i className="bi bi-camera2 text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-italianno tracking-wide">PhotoBooth</span>
          </Link>

          {/* My List Spotify */}
          <Link to="/comingsoon" className="flex flex-col items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition transform hover:scale-110">
            <i className="bi bi-music-note-list text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-italianno tracking-wide">My List Spotify</span>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default hap;

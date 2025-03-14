/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const hap = () => {
  return (
    <div id="app" className="min-h-screen py-12 px-6 md:px-16 bg-gray-100 dark:bg-gray-900 flex flex-col transition-all">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <section data-aos="fade-up" className="flex-grow flex flex-col items-center justify-center text-center">
        {/* Judul dengan garis atas & bawah */}
        <div className="w-full py-12 px-6 md:px-16 ">
          <hr className="border-black dark:border-white" />
          <h1 className="text-4xl font-semibold dark:text-white my-2 font-kreon tracking-wider">My App</h1>
          <hr className="border-black dark:border-white" />
        </div>

        {/* Kontainer Icon */}
        <div className="flex py-12 px-6 md:px-16 flex-wrap gap-12">
          {/* PhotoBooth */}
          <Link to="/photobooth" className="hover:scale-130 flex flex-col items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition">
            <i className="bi bi-camera2 text-4xl"></i>
            <span className="mt-2 text-sm font-italianno tracking-wide">PhotoBooth</span>
          </Link>

          {/* My List Spotify */}
          <Link to="/comingsoon" className="hover:scale-130 flex flex-col items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition">
            <i className="bi bi-music-note-list text-4xl"></i>
            <span className="mt-2 text-sm font-italianno tracking-wide ">My List Spotify</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default hap;

/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

const hap = () => {
  return (
    <div id="app" className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <section className="flex-grow flex flex-col items-center justify-center text-center">
        {/* Judul dengan garis atas & bawah */}
        <div className="w-full mx-auto py-12 px-6 md:px-16 lg:pt-25 xl:pt-25">
          <hr className="border-black dark:border-white max-w-5xl mx-auto" />
          <h1 data-aos="fade-up" className="text-3xl md:text-4xl font-semibold dark:text-white my-2 font-kreon tracking-wider">
            My Applications
          </h1>
          <hr className="border-black dark:border-white max-w-5xl mx-auto" />
        </div>

        {/* Kontainer Icon */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-y-10 md:gap-x-16 px-8 pb-10">
          {/* PhotoBooth */}
          <Link to="/photobooth" data-aos="fade-up" className="flex flex-col items-center text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition transform hover:scale-110">
            <i className="bi bi-camera2 text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-kreon tracking-wide">PhotoBooth</span>
          </Link>

          {/* Weather App */}
          <Link to="/weathertime" data-aos="fade-up" className="flex flex-col items-center text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition transform hover:scale-110">
            <i className="bi bi-cloud-sun text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-kreon tracking-wide">Weather App</span>
          </Link>

          {/* My List Spotify */}
          <Link to="/comingsoon" data-aos="fade-up" className="flex flex-col items-center text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition transform hover:scale-110">
            <i className="bi bi-music-note-list text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-kreon tracking-wide">Spotify List (X) </span>
          </Link>

          {/* My Blog */}
          <Link to="/comingsoon" data-aos="fade-up" className="flex flex-col items-center text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition transform hover:scale-110">
            <i className="bi bi-journal-text text-4xl md:text-6xl"></i>
            <span className="mt-2 text-lg md:text-lg font-kreon tracking-wide">Blog (X)</span>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default hap;

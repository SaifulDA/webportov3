/* eslint-disable no-unused-vars */
import React from "react";
import DownloadButton from "../../components/common/Button";
import { useTheme } from "../../components/common/ThemeContext"; // Import useTheme
import profileImage from "/src/assets/images/profile.svg";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  const { theme } = useTheme(); // Destructure theme dari useTheme
  return (
    <div
    id="hero"
      className="flex flex-col items-center justify-center min-h-screen 
        bg-gradient-to-b from-blue-300 via-purple-100 to-pink-100 
        dark:bg-gradient-to-b dark:from-indigo-900 dark:via-cyan-800 dark:to-purple-900 
        px-6 md:px-16 transition-colors duration-300 text-gray-900 dark:text-white"
    >
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-10">
        {/* Teks Hero */}
        <div className="text-center max-w-lg justify-center items-center">
          <p className="text-xl italic mb-3 font-italianno">Hello, I&apos;m</p>
          <h2 className="text-4xl font-kreon mb-2 border-b-2 border-gray-800 dark:border-white inline-block">Saiful Daulah Alfarabi</h2>

          {/* Efek Mengetik */}
          <div className="text-2xl my-6 font-kreon h-10">
            <Typewriter words={["IT Development", "Web Developer", "UI/UX Designer", "Cloud Engineer"]} loop={true} cursor cursorStyle="|" typeSpeed={80} deleteSpeed={50} delaySpeed={1500} />
          </div>

          {/* Tombol di Tengah */}
          <div className="flex justify-center mt-4">
            <DownloadButton />
          </div>
        </div>

        {/* Gambar Profile */}
        <div className="relative flex justify-center drop-shadow-lg">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-black overflow-hidden shadow-lg ">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-300 hover:scale-130" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

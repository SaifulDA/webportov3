/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Home, Briefcase, Image, Sun, Moon, Menu, MessageSquare } from "lucide-react";
import { useTheme } from "../../components/common/ThemeContext"; // Import useTheme

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Ambil tema dari Context
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar Atas (Desktop) */}
      <nav className="hidden md:flex w-full py-4 px-6 backdrop-blur-md bg-white/30 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-700/50 shadow-sm fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo & Nama */}
          <div className="flex items-center space-x-3">
            {/* Foto Profil */}
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src="/assets/images/profile.svg"
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Nama */}
            <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
              <img src="src/assets/images/profile.svg" alt="Logo" className="w-8 h-8" />
              <span>SAIFUDDAULAH ALFARABI</span>
            </h1>
          </div>

          {/* Menu Navigasi */}
          <div className="hidden md:flex space-x-8">
            <a href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Profile
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </a>
            <a href="/skill" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Skill
            </a>
            <a href="/project" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Project
            </a>
          </div>

          {/* Icon Chat, Galeri & Toggle Theme */}
          <div className="flex items-center space-x-4">
            {/* Icon Galeri */}
            <button aria-label="View Photos" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <Image className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>

            {/* Icon Chat */}
            <button aria-label="Messages" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <MessageSquare className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>

            {/* Tombol Toggle Tema */}
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              {theme === "light" ? <Sun className="w-6 h-6 text-gray-700" /> : <Moon className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Tombol Menu Mobile */}
          <button onClick={toggleMenu} className="md:hidden text-gray-800 dark:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Navbar Bawah (Mobile Only) */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/30 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-300 dark:border-gray-700/50 dark:backdrop-blur-md shadow-lg md:hidden flex justify-around py-3">
        {/* Home */}
        <a href="/" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </a>

        {/* Project */}
        <a href="/project" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Briefcase className="w-6 h-6" />
          <span className="text-xs">Project</span>
        </a>

        {/* Gallery */}
        <a href="/gallery" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Image className="w-6 h-6" />
          <span className="text-xs">Gallery</span>
        </a>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          {theme === "light" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          <span className="text-xs">Theme</span>
        </button>
      </footer>
    </>
  );
};

export default Navbar;

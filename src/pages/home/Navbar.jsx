/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Menu, MessageSquare, Sun, Moon, Image } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle tema (Light / Dark) menggunakan Tailwind
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Efek untuk memastikan tema tersimpan di localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="w-full py-4 px-6 backdrop-blur-md bg-white/30 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700 shadow-sm fixed top-0 left-0 z-50">
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

          {/* Nama + Icon */}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
            <img src="src/assets/images/profile.svg" alt="Logo" className="w-8 h-8" />
            <span>SAIFUDDAULAH ALFARABI</span>
          </h1>
        </div>

        {/* Menu Navigasi (Desktop) */}
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

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center py-4 bg-white dark:bg-gray-900">
          <a href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">
            Profile
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">
            About
          </a>
          <a href="/skill" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">
            Skill
          </a>
          <a href="/project" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">
            Project
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  
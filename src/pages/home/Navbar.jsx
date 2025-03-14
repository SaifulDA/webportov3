/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Image, Sun, Moon, Menu, MessageSquare, AppWindow } from "lucide-react";
import { useTheme } from "../../components/common/ThemeContext"; // Import useTheme
import profileImage from "/src/assets/images/profile.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Ambil tema dari Context
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 300); // Tambahkan delay untuk memastikan halaman sudah load
  };

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  // Function untuk smooth scroll ke section tertentu
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 70; // 70px untuk margin
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navbar Atas (Desktop) */}
      <nav className="hidden md:flex w-full py-4 px-6 backdrop-blur-md bg-white/30 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-700/50 shadow-sm fixed top-0 left-0 z-50 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo & Nama */}
          <div className="flex items-center space-x-3">
            {/* Foto Profil */}
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Nama */}
            <h1 className="text-xl font-bold font-kreon text-gray-800 dark:text-white flex items-center space-x-2 tracking-wider">
              <span>SAIFUDDAULAH ALFARABI</span>
            </h1>
          </div>

          {/* Menu Navigasi */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => goToSection("hero")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Profile
            </button>
            <button onClick={() => goToSection("about")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </button>
            <button onClick={() => goToSection("skills")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Skills
            </button>
            <button onClick={() => goToSection("project")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </button>
          </div>

          {/* Icon Chat, Galeri & Toggle Theme */}
          <div className="flex items-center space-x-4">
            {/* Icon Aplikasi */}
            <Link to="/app" onClick={() => goToSection("app")} aria-label="View Application" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <AppWindow className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            {/* Icon Galeri */}
            <Link to="/comingsoon" onClick={() => goToSection("gallery")} aria-label="View Photos" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <Image className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            {/* Icon Chat */}
            <Link to="/chat" onClick={() => goToSection("chat")} aria-label="Messages" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <MessageSquare className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

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
      <footer className="fixed bottom-0 z-50 left-0 w-full bg-white/30 backdrop-blur-md border-t border-gray-300 dark:bg-blue-900/40 dark:border-gray-400/50 dark:backdrop-blur-lg shadow-lg md:hidden flex justify-around py-3">
        {/* Home */}
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        {/* Gallery */}
        <Link to="/comingsoon" onClick={() => goToSection("gallery")} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Image className="w-6 h-6" />
          <span className="text-xs">Gallery</span>
        </Link>

        {/* app */}
        <Link to="/app" onClick={() => goToSection("app")} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <AppWindow className="w-6 h-6" />
          <span className="text-xs">App</span>
        </Link>

        {/* chat */}
        <Link to="/chat" onClick={() => goToSection("chat")} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs">Chat</span>
        </Link>

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

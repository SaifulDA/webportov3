/* eslint-disable no-unused-vars */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from "../../components/common/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="bg-white py-6 text-center border-t-2 border-black dark:bg-black dark:border-white/20 dark:text-white dark:border-opacity-20 pb-15 transition-colors duration-300">
      {/* Ikon Sosial Media */}
      <div className="flex justify-center space-x-6 mb-2">
        <a href="mailto:saifuldaulah24@gmail.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white text-4xl hover:scale-110 transition-transform">
          <i className="bi bi-envelope"></i>
        </a>
        <a href="http://instagram.com/s.d.a.2.4" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white text-4xl hover:scale-110 transition-transform">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/saifuddaulah-alfarabi/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white text-4xl hover:scale-110 transition-transform">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com/SaifulDA" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white text-4xl hover:scale-110 transition-transform">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://www.tiktok.com/@alfarabi_24" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white text-4xl hover:scale-110 transition-transform">
          <i className="bi bi-tiktok"></i>
        </a>
      </div>

      {/* Teks Copyright */}
      <p className="font-cabin-sketch text-lg">
        SAIFUDDAULAH ALFARABI © 2025
      </p>
    </footer>
  );
};

export default Footer;

/* eslint-disable no-unused-vars */
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from "../../components/common/ThemeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GradientText from "../../components/common/GradientText/GradientText";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 300); // Tambahkan delay untuk memastikan halaman sudah load
  };

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
    <footer className="bg-white dark:bg-black transition-colors duration-300 border-t border-gray-200 dark:border-gray-800 pb-10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Saifuddaulah
              <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">
                Alfarabi
              </GradientText>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-sm">IT Development based in Jakarta, Indonesia</p>
          </div>

          {/* Social Media Icons with hover effects */}
          <div className="flex space-x-4">
            <a
              href="mailto:saifuldaulah24@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Email"
            >
              <i className="bi bi-envelope"></i>
            </a>
            <a
              href="http://instagram.com/s.d.a.2.4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/saifuddaulah-alfarabi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://github.com/SaifulDA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="GitHub"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.tiktok.com/@alfarabi_24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="TikTok"
            >
              <i className="bi bi-tiktok"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-6"></div>

        {/* Bottom section with navigation and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <Link to="/" onClick={() => goToSection("hero")} aria-label="View Home" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/app" onClick={() => goToSection("app")} aria-label="View App" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              App
            </Link>
            <Link to="/Chat" onClick={() => goToSection("chat")} aria-label="View Chat" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Chat
            </Link>
            <Link to="/comingsoon" onClick={() => goToSection("comingsoon")} aria-label="View Gallery" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Gallery
            </Link>
          </nav>

          <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-4 md:mt-0">
            © {currentYear} <span className="font-semibold">Saifuddaulah Alfarabi</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Home, Image, Sun, Moon, Menu, MessageSquare, AppWindow, Search, X, MoreHorizontal } from "lucide-react";
import { useTheme } from "../../components/common/ThemeContext"; // Import useTheme
import profileImage from "/src/assets/images/profile.svg";
import { useNavigate, useLocation } from "react-router-dom";

// Example data for search suggestions - replace with your actual data source
const searchData = [
  // Home Section
  { id: "hero", label: "Profile", route: "/" },
  { id: "hero", label: "Home", route: "/" },
  { id: "about", label: "About Me", route: "/" },
  { id: "skills", label: "My Skills", route: "/" },
  { id: "project", label: "Projects", route: "/" },

  // Gallery Section
  { id: "gallery", label: "Photo Gallery", route: "/gallery" },
  { id: "ebooks", label: "E-Books", route: "/gallery#ebooks" },
  { id: "rembulan", label: "E-books Rembulan", route: "/rembulan" },

  // Application Section
  { id: "app", label: "Applications", route: "/app" },
  { id: "photobooth", label: "Photo Booth", route: "/photobooth" },
  { id: "weathertime", label: "Weather Time", route: "/weathertime" },
  { id: "chat", label: "Chat Feature", route: "/chat" },
  // Add more items as needed
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Ambil tema dari Context
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredSuggestions = searchData.filter((item) => item.id.toLowerCase().includes(query) || item.label.toLowerCase().includes(query));

    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
  }, [searchQuery]);

  const goToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 300); // Tambahkan delay untuk memastikan halaman sudah load
  };

  // Toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle search input visibility
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
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

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // First check if the search query directly matches an ID
      const directMatch = searchData.find((item) => item.id.toLowerCase() === searchQuery.toLowerCase());

      if (directMatch) {
        // If it's a direct ID match, navigate to the appropriate route and section
        navigate(directMatch.route);
        if (directMatch.route === "/" && directMatch.id) {
          setTimeout(() => {
            scrollToSection(directMatch.id);
          }, 300);
        }
      } else {
        // Otherwise, go to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }

      // Reset search field and hide suggestions
      setSearchQuery("");
      setShowSuggestions(false);
      if (window.innerWidth < 768) {
        setShowSearch(false);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    navigate(suggestion.route);
    if (suggestion.route === "/" && suggestion.id) {
      setTimeout(() => {
        scrollToSection(suggestion.id);
      }, 300);
    }

    setSearchQuery("");
    setShowSuggestions(false);
    if (window.innerWidth < 768) {
      setShowSearch(false);
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchQuery.trim() !== "" && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // useEffect to scroll to the hash on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Adjust delay as needed
    }
  }, [location.hash]);

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

          {/* Search and Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <div className="flex items-center bg-white/20 dark:bg-gray-800/40 rounded-full overflow-hidden border border-gray-600 shadow-lg dark:border-white dark:border-gray-700">
                  <input
                    type="text"
                    placeholder="Search Title by ID ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="py-1 px-3 bg-transparent text-gray-700 dark:text-white text-sm focus:outline-none min-w-40"
                  />
                  <button type="submit" className="p-1 m-1 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/70" aria-label="Search">
                    <Search className="w-4 h-4 text-gray-700 dark:text-white" />
                  </button>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div ref={suggestionsRef} className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center">
                        <span className="text-sm text-gray-800 dark:text-white">{suggestion.label}</span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(ID: {suggestion.id})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Icon Aplikasi */}
            <Link to="/app" onClick={() => goToSection("app")} aria-label="View Application" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
              <AppWindow className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            {/* Icon Galeri */}
            <Link to="/gallery" onClick={() => goToSection("gallery")} aria-label="View Photos" className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700">
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

      {/* Mobile Search Bar (toggles visibility) */}
      {showSearch && (
        <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md py-3 px-4 md:hidden border-b border-gray-200 dark:border-gray-700">
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search Title by ID ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                autoFocus
                className="flex-1 py-2 px-4 bg-white/30 dark:bg-gray-800/30 rounded-l-full text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
              />
              <button type="submit" className="py-2 px-4 bg-blue-500 dark:bg-blue-600 text-white rounded-r-full border border-blue-500 dark:border-blue-600">
                <Search className="w-6 h-6" />
              </button>
              <button type="button" onClick={toggleSearch} className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Search Suggestions */}
            {showSuggestions && (
              <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-white">{suggestion.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{suggestion.id}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{suggestion.route}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar Bawah (Mobile Only) */}
      <footer className="fixed bottom-0 z-50 left-0 w-full bg-white/30 backdrop-blur-md border-t border-gray-300 dark:bg-blue-900/40 dark:border-gray-400/50 dark:backdrop-blur-lg shadow-lg md:hidden flex justify-around py-3">
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/gallery" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Image className="w-6 h-6" />
          <span className="text-xs">Gallery</span>
        </Link>

        <button onClick={toggleSearch} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Search className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </button>

        <Link to="/app" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <AppWindow className="w-6 h-6" />
          <span className="text-xs">Application</span>
        </Link>

        {/* More Dropdown */}
        <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="relative flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xs">More</span>
          {isMoreOpen && (
            <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 w-40">
              <Link to="/chat" className="flex items-center py-1 px-4 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <MessageSquare className="w-4 h-4 mr-2" /> Chat
              </Link>
              <button onClick={toggleTheme} className="w-full text-left flex items-center py-1 px-4 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                {theme === "light" ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          )}
        </button>
      </footer>
    </>
  );
};

export default Navbar;

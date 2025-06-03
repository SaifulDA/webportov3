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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
      if (window.innerWidth < 1024) {
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
    if (window.innerWidth < 1024) {
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
      {/* Navbar Atas (Desktop & Tablet Only - Hidden on Mobile) */}
      <nav className="hidden md:flex w-full py-4 px-6 backdrop-blur-md bg-white/30 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-700/50 shadow-sm fixed top-0 left-0 z-50 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo & Nama */}
          <div className="flex items-center space-x-3 flex-shrink-0">
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

            {/* Nama - Responsive text for tablet and desktop */}
            <h1 className="text-lg lg:text-xl font-bold font-kreon text-gray-800 dark:text-white flex items-center space-x-2 tracking-wider">
              <span className="hidden lg:inline">SAIFUDDAULAH ALFARABI</span>
              <span className="lg:hidden">SAIFUDDAULAH ALFARABI</span>
            </h1>
          </div>

          {/* Menu Navigasi Desktop */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            <button onClick={() => goToSection("hero")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Profile
            </button>
            <button onClick={() => goToSection("about")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </button>
            <button onClick={() => goToSection("skills")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Skills
            </button>
            <button onClick={() => goToSection("project")} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Projects
            </button>
          </div>

          {/* Search and Icons Section - Tablet & Desktop */}
          <div className="flex items-center space-x-4">
            {/* Search Form - Responsive width */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <div className="flex items-center bg-white/20 dark:bg-gray-800/40 rounded-full overflow-hidden border border-gray-600 shadow-lg dark:border-white">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="py-1 px-3 bg-transparent text-gray-700 dark:text-white text-sm focus:outline-none w-32 lg:w-40"
                  />
                  <button type="submit" className="p-1 m-1 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/70 transition-colors" aria-label="Search">
                    <Search className="w-4 h-4 text-gray-700 dark:text-white" />
                  </button>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div ref={suggestionsRef} className="absolute top-full left-0 mt-1 w-full min-w-48 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={suggestion.id + suggestion.label} onClick={() => handleSuggestionClick(suggestion)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center">
                        <span className="text-sm text-gray-800 dark:text-white">{suggestion.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Icons - Tablet & Desktop */}
            <Link to="/app" onClick={() => goToSection("app")} aria-label="View Application" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <AppWindow className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            <Link to="/gallery" onClick={() => goToSection("gallery")} aria-label="View Photos" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Image className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            <Link to="/chat" onClick={() => goToSection("chat")} aria-label="Messages" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <MessageSquare className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>

            {/* Tombol Toggle Tema */}
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === "light" ? <Sun className="w-6 h-6 text-gray-700" /> : <Moon className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Tombol Menu Tablet */}
          <button onClick={toggleMenu} className="hidden md:block lg:hidden text-gray-800 dark:text-white p-2 rounded-full dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Tablet Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="hidden md:block lg:hidden fixed top-20 left-0 w-full bg-white/95 dark:bg-black backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg z-40">
          <div className="container mx-auto px-6 py-4">
            {/* Navigation Links for Tablet */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  goToSection("hero");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  goToSection("about");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  goToSection("skills");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => {
                  goToSection("project");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Projects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Bar (full screen overlay) - Mobile Only */}
      {showSearch && (
        <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3 px-4 border-b border-gray-200 dark:border-gray-700">
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                autoFocus
                className="flex-1 py-2 px-4 bg-white/30 dark:bg-gray-800/30 rounded-l-full text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
              />
              <button type="submit" className="py-2 px-4 bg-blue-500 dark:bg-blue-600 text-white rounded-r-full border border-blue-500 dark:border-blue-600 dark:hover:bg-blue-700 hover:bg-blue-600 transition-colors">  
                <Search className="w-6 h-6" />
              </button>
              <button type="button" onClick={toggleSearch} className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Search Suggestions */}
            {showSuggestions && (
              <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id + suggestion.label}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-white">{suggestion.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{suggestion.id}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar Bawah (Mobile Only) */}
      <footer className="md:hidden fixed bottom-0 z-50 left-0 w-full bg-white/30 backdrop-blur-md border-t border-gray-300 dark:bg-blue-900/40 dark:border-gray-400/50 dark:backdrop-blur-lg shadow-lg flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1">
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/gallery" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1">
          <Image className="w-5 h-5" />
          <span className="text-xs mt-1">Gallery</span>
        </Link>

        <button onClick={toggleSearch} className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1">
          <Search className="w-5 h-5" />
          <span className="text-xs mt-1">Search</span>
        </button>

        <Link to="/app" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1">
          <AppWindow className="w-5 h-5" />
          <span className="text-xs mt-1">Apps</span>
        </Link>

        {/* More Dropdown */}
        <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="relative flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1">
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs mt-1">More</span>
          {isMoreOpen && (
            <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 w-40">
              <Link to="/chat" className="flex items-center py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" /> Chat
              </Link>
              <button
                onClick={toggleTheme}
                className="w-full text-left flex items-center py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
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

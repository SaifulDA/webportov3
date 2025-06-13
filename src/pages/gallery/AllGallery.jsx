/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Instagram, Play, X, Heart, Filter } from "lucide-react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
// Import Navbar and Footer
import Navbar from "../home/Navbar"; // Pastikan path ini benar
import Footer from "../home/Footer"; // Pastikan path ini benar

// import images and videos from assets if needed
import Image1 from "../../assets/images/allgallery/1.jpg";
import Image2 from "../../assets/images/allgallery/2.jpg";
import Image3 from "../../assets/images/allgallery/3.jpg";
import Image4 from "../../assets/images/allgallery/4.jpg";
import Image5 from "../../assets/images/allgallery/5.jpg";
import Image6 from "../../assets/images/allgallery/6.jpg";
// Your actual gallery data (assuming it's the same as provided)
const allGalleryItems = [
  {
    id: 6,
    type: "image",
    src: Image6,
    author: "Saiful Daulah",
    title: "Sunset Doll 🌅",
    category: "Photography",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
  {
    id: 5,
    type: "image",
    src: Image5,
    author: "Saiful Daulah",
    title: "Pet 🐶",
    category: "Pet",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
  {
    id: 4,
    type: "image",
    src: Image4,
    author: "Saiful Daulah",
    title: "Pet 🐶",
    category: "Pet",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
  {
    id: 3,
    type: "image",
    src: Image3,
    author: "Saiful Daulah",
    title: "Pet 🐶",
    category: "Pet",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
  {
    id: 2,
    type: "image",
    src: Image2,
    author: "Saiful Daulah",
    title: "Pet 🐶",
    category: "Pet",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
  {
    id: 1,
    type: "image",
    src: Image1,
    author: "Saiful Daulah",
    title: "Pet 🐶",
    category: "Pet",
    link: "https://www.instagram.com/s.d.a.2.4/",
    aspectRatio: "1:1",
  },
];

// Modern Rolling Gallery Component with enforced 1:1 aspect ratio
const RollingGallery = ({ images = [], autoplay = true, pauseOnHover = true }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 900 : 1500;
  const faceCount = images.length;
  const faceWidth = faceCount > 0 ? (cylinderWidth / faceCount) * 1.05 : 200;
  const radius = faceCount > 0 ? cylinderWidth / (2 * Math.PI) : 0;

  // Calculate square size based on face width with some padding
  const imageSize = Math.min(faceWidth * 0.8, isScreenSizeSm ? 160 : 200);

  const dragFactor = 0.08;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const startInfiniteSpin = (startAngle) => {
    if (faceCount === 0) return;
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    if (autoplay && faceCount > 0) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, faceCount, controls, rotation]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    if (faceCount === 0) return;
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    if (faceCount === 0) return;
    const finalAngle = rotation.get() + info.velocity.x * dragFactor * 2;
    rotation.set(finalAngle);
    if (autoplay) startInfiniteSpin(finalAngle);
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && faceCount > 0) controls.stop();
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover && faceCount > 0) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  if (faceCount === 0) {
    return null;
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Enhanced side gradients for smoother fade */}
      <div className="absolute top-0 left-0 h-full w-24 sm:w-32 md:w-40 z-10 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent" />
      <div className="absolute top-0 right-0 h-full w-24 sm:w-32 md:w-40 z-10 bg-gradient-to-l from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent" />

      <div className="flex h-full items-center justify-center" style={{ perspective: "1500px" }}>
        <motion.div
          drag="x"
          dragElastic={0.05}
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[400px] cursor-grab active:cursor-grabbing items-center justify-center"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-2 sm:p-3"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* Fixed square container with 1:1 aspect ratio */}
              <div
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-black/50 transition-all duration-300"
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                }}
              >
                <img src={url} alt={`gallery preview ${i + 1}`} className="pointer-events-none w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const AllGallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());
  // Tambahkan state baru ini:
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Tambahkan logic filter ini:
  const categories = ["All", ...new Set(allGalleryItems.map((item) => item.category))];

  const filteredItems = selectedCategory === "All" ? allGalleryItems : allGalleryItems.filter((item) => item.category === selectedCategory);
  const rollingImages = allGalleryItems
    .filter((item) => item.type === "image")
    .map((item) => item.src)
    .slice(0, 12);

  // Tambahkan function ini:
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  const gallerySection = document.querySelector(".grid");
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  const toggleLike = (itemId) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getGridClass = (aspectRatio) => {
    switch (aspectRatio) {
      case "2:1":
        return "col-span-2";
      case "1:2":
        return "row-span-2";
      case "16:9":
        return "col-span-2";
      case "9:16":
        return "row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const getAspectClass = (aspectRatio) => {
    // Force all images to be square (1:1) regardless of their specified aspect ratio
    return "aspect-square";
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white via-gray-100 to-sky-100 dark:from-gray-900 dark:via-black dark:to-slate-900 text-gray-900 dark:text-white min-h-screen">
        {/* Modern Clean Hero Section */}
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 dark:from-black/10 dark:via-transparent dark:to-black/20 z-10"></div>

          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse"></div>
          </div>

          {rollingImages.length > 0 && (
            <div className="absolute inset-0">
              <RollingGallery images={rollingImages} autoplay={true} pauseOnHover={true} />
            </div>
          )}

          <div className="relative z-20 flex items-center justify-center h-full text-center px-4 pt-20 sm:pt-16 md:pt-12">
            <div className="max-w-5xl">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-6 sm:mb-8">
                <h1
                  className="text-7xl md:text-8xl lg:text-9xl font-black
             mb-4 tracking-tighter leading-tight sm:leading-snug
             [-webkit-text-fill-color:transparent]
             [-webkit-text-stroke-width:1px]
             text-black dark:text-white
             [-webkit-text-stroke-color:currentColor]"
                >
                  Gallery
                </h1>
                <div className="h-1.5 w-36 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-10 sm:mb-12 font-light max-w-2xl mx-auto"
              >
                Capturing moments, creating memories, one frame at a time.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="text-center mb-14 sm:mb-20">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 
                        bg-gradient-to-r from-gray-800 to-gray-500 
                        dark:from-gray-100 dark:to-gray-400 
                        bg-clip-text text-transparent font-kreon tracking-widest"
            >
              Featured Collection
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Explore our curated selection of stunning photography and creative videos, each telling a unique story.</p>
          </motion.div>

          {/* Filter Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-600 dark:text-gray-400" size={18} />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Filter by category:</span>
              </div>

              {/* Filter Dropdown - Mobile First Design */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full sm:w-auto gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md min-w-[140px] sm:min-w-[160px] text-sm sm:text-base"
                >
                  <span className="font-medium truncate">{selectedCategory}</span>
                  <motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-gray-500 dark:text-gray-400 flex-shrink-0">
                    ▼
                  </motion.div>
                </button>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                  <>
                    {/* Overlay untuk menutup dropdown ketika klik di luar */}
                    <div className="fixed inset-0 z-10 bg-black/10 sm:bg-transparent" onClick={() => setIsFilterOpen(false)} />

                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden max-h-80 sm:max-h-96"
                    >
                      <div className="py-1 sm:py-2 max-h-72 sm:max-h-80 overflow-y-auto">
                        {categories.map((category, index) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between group ${
                              selectedCategory === category
                                ? "bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 text-sky-600 dark:text-sky-400 font-medium border-r-2 border-sky-500"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <span className="flex items-center gap-2 flex-1 min-w-0">
                              {selectedCategory === category && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-500 rounded-full animate-pulse flex-shrink-0" />}
                              <span className="truncate">{category}</span>
                            </span>

                            {category !== "All" && (
                              <span
                                className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ml-2 ${
                                  selectedCategory === category ? "bg-sky-100 dark:bg-sky-800 text-sky-600 dark:text-sky-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {allGalleryItems.filter((item) => item.category === category).length}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Dropdown footer */}
                      <div className="border-t border-gray-200 dark:border-gray-600 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total: {allGalleryItems.length} items</p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredItems.length}</span> of <span className="font-semibold">{allGalleryItems.length}</span> items
              {selectedCategory !== "All" && (
                <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0">
                  in <span className="font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 px-2 py-0.5 rounded-full text-xs">{selectedCategory}</span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Fixed Grid Layout: Mobile (3 cols), Tablet (4 cols), Desktop (5 cols) */}
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 cursor-pointer hover:ring-4 hover:ring-sky-500/50 dark:hover:ring-sky-400/50 hover:scale-[1.03]"
                onClick={() => openModal(item)}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  {item.type === "video" ? (
                    <div className="relative w-full h-full">
                      <img src={item.thumbnail} alt={item.title || "Video thumbnail"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 flex items-center justify-center">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 sm:p-4 group-hover:scale-110 transition-all duration-300 shadow-md hover:bg-white dark:hover:bg-gray-800">
                          <Play className="text-sky-600 dark:text-sky-400" size={30} fill="currentColor" />
                        </div>
                      </div>
                      {item.duration && <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-black/60 dark:bg-black/70 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">{item.duration}</div>}
                    </div>
                  ) : (
                    <img src={item.src} alt={item.title || "Gallery image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                    <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-0.5 truncate">{item.title}</h3>
                    <p className="text-sky-200 dark:text-sky-300 text-xs sm:text-sm mb-1.5">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Heart size={16} className={`${likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-300 dark:text-gray-400 group-hover:text-red-400"} transition-colors duration-200`} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 scale-90 group-hover:scale-100"
                    aria-label="Like item"
                  >
                    <Heart size={16} className={`${likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"} transition-colors duration-200`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tambahkan ini setelah gallery grid */}
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">No items match the selected category &quot;{selectedCategory}&quot;</p>
            <button onClick={() => setSelectedCategory("All")} className="px-6 py-2 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-full hover:from-sky-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
              Show All Items
            </button>
          </motion.div>
        )}

        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10
             text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-200
             bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60
             dark:border dark:border-white
             backdrop-blur-sm rounded-full p-2 sm:p-2.5
             transition-all duration-300 group
             shadow-md hover:shadow-lg dark:shadow-white dark:shadow-sm"
              aria-label="Close modal"
            >
              <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" ? (
                <video
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-2xl dark:shadow-black/70"
                  style={{ maxWidth: "calc(100vw - 2rem)", maxHeight: "calc(100vh - 7rem)" }}
                  src={selectedItem.src}
                  key={selectedItem.src}
                >
                  <source src={selectedItem.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-2xl dark:shadow-black/70"
                  style={{ maxWidth: "calc(100vw - 2rem)", maxHeight: "calc(100vh - 7rem)" }}
                />
              )}

              <div className="absolute bottom-3 sm:bottom-5 left-3 right-3 sm:left-5 sm:right-5 text-center">
                <div className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-md rounded-lg sm:rounded-xl p-3.5 sm:p-5 max-w-lg mx-auto border border-gray-200/30 dark:border-white/15 shadow-lg dark:shadow-black/50">
                  <h3 id="modal-title" className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-0.5">{selectedItem.author}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2.5 sm:mb-3">{selectedItem.category}</p>

                  {selectedItem.link && selectedItem.link !== "#" && (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      <Instagram size={18} />
                      View on Instagram
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllGallery;

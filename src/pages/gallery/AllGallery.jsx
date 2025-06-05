/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Instagram, Play, ArrowLeft, X, Heart, Share2, Download, Menu, Home, User, Mail, Briefcase } from "lucide-react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
// Import Navbar and Footer
import Navbar from "../home/Navbar"; // Pastikan path ini benar
import Footer from "../home/Footer"; // Pastikan path ini benar

// Your actual gallery data (assuming it's the same as provided)
const allGalleryItems = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    author: "Saiful Daulah",
    title: "Foto Profile",
    category: "Portrait",
    link: "https://www.instagram.com/p/DGkrlrvPXZF/",
    aspectRatio: "4:3",
    likes: 247,
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop",
    author: "Saiful Daulah",
    title: "Scientist 🌻",
    category: "Nature",
    link: "https://www.instagram.com/p/DGAqH-bvPEl/",
    aspectRatio: "3:4",
    likes: 189,
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    author: "Saiful Daulah",
    title: "~Sunrise~",
    category: "Landscape",
    link: "https://www.instagram.com/p/DEy36lFPZCP/",
    aspectRatio: "2:1",
    likes: 342,
  },
  {
    id: 4,
    type: "image",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
    author: "Saiful Daulah",
    title: "❤❤❤",
    category: "Mountain",
    link: "https://www.instagram.com/p/DEuXuSATptz/",
    aspectRatio: "1:1",
    likes: 156,
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
    author: "Saiful Daulah",
    title: "Saya baru saja menyelesaikan kursus Belajar Membuat Aplikasi Web dengan React dari @dicoding 🚀",
    category: "Achievement",
    link: "https://www.instagram.com/p/DDa4Z_xBquM/",
    aspectRatio: "4:3",
    likes: 298,
  },
  {
    id: 6,
    type: "image",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=800&fit=crop",
    author: "Saiful Daulah",
    title: "Finally, after planning I got out of my comfort zone since 2018 and I had to do this by 2024",
    category: "Milestone",
    link: "https://www.instagram.com/p/DDLixnBh-hB/",
    aspectRatio: "3:4",
    likes: 421,
  },
  {
    id: 7,
    type: "video",
    src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
    author: "Saiful Daulah",
    title: "Creative Process",
    category: "Video",
    duration: "2:15",
    link: "#", // Link Instagram bisa ditambahkan jika ada
    aspectRatio: "16:9",
    likes: 187,
  },
  {
    id: 8,
    type: "video",
    src: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=450&h=800&fit=crop",
    author: "Saiful Daulah",
    title: "Behind Scenes",
    category: "Video",
    duration: "1:32",
    link: "#", // Link Instagram bisa ditambahkan jika ada
    aspectRatio: "9:16",
    likes: 124,
  },
];

// Modern Rolling Gallery Component without dark shadows
const RollingGallery = ({ images = [], autoplay = true, pauseOnHover = true }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1200 : 2000;
  const faceCount = images.length;
  // Adjusted faceWidth calculation slightly if needed, or ensure image scales within it.
  // The main fix will be to make the image `w-full` of its container.
  const faceWidth = faceCount > 0 ? (cylinderWidth / faceCount) * 1.15 : 200; // Slightly adjusted overlap/spacing, ensure faceCount > 0
  const radius = faceCount > 0 ? cylinderWidth / (2 * Math.PI) : 0;

  const dragFactor = 0.08;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const startInfiniteSpin = (startAngle) => {
    if (faceCount === 0) return; // Don't spin if no images
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
  }, [autoplay, controls, faceCount]); // Added faceCount as dependency

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
    // Optionally render nothing or a placeholder if no images
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
            width: cylinderWidth, // This is the width of the draggable cylinder container
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[400px] cursor-grab active:cursor-grabbing items-center justify-center"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-2 sm:p-3"
              style={{
                width: `${faceWidth}px`, // Each "face" of the cylinder has this width
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {/* This container will respect faceWidth because its parent has explicit width */}
              <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-black/50 transition-all duration-300">
                <img
                  src={url}
                  alt={`gallery preview ${i + 1}`}
                  // PERBAIKAN: Menggunakan w-full agar gambar mengisi faceWidth.
                  // Tinggi tetap eksplisit untuk konsistensi visual dalam silinder.
                  // object-cover akan menjaga aspek rasio gambar.
                  className="pointer-events-none w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover transition-all duration-500 ease-out group-hover:scale-105"
                />
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
  // State untuk Navbar bisa dikelola di Navbar itu sendiri jika perlu,
  // atau diangkat ke komponen App jika Navbar dipakai di banyak halaman.
  // Untuk contoh ini, kita asumsikan Navbar sudah menangani visibilitasnya.
  // const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const rollingImages = allGalleryItems
    .filter((item) => item.type === "image")
    .map((item) => item.src)
    .slice(0, 12); // Ambil maksimal 12 gambar untuk roller

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
    switch (aspectRatio) {
      case "2:1":
        return "aspect-[2/1]";
      case "1:2":
        return "aspect-[1/2]";
      case "3:4":
        return "aspect-[3/4]";
      case "4:3":
        return "aspect-[4/3]";
      case "16:9":
        return "aspect-video";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-square";
    }
  };

  return (
    <>
      <Navbar /> {/* isVisible prop dihilangkan jika Navbar menangani sendiri */}
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
             text-white
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
                        bg-clip-text text-transparent"
            >
              Featured Collection
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Explore our curated selection of stunning photography and creative videos, each telling a unique story.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8 auto-rows-[minmax(0,auto)]">
            {allGalleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 cursor-pointer 
                                        ${getGridClass(item.aspectRatio)} 
                                        hover:ring-4 hover:ring-sky-500/50 dark:hover:ring-sky-400/50 hover:scale-[1.03]`}
                onClick={() => openModal(item)}
              >
                <div className={`relative w-full ${getAspectClass(item.aspectRatio)} overflow-hidden`}>
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
                    <h3 className="text-white text-md sm:text-lg font-semibold mb-0.5 truncate">{item.title}</h3>
                    <p className="text-sky-200 dark:text-sky-300 text-xs sm:text-sm mb-1.5">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Heart size={16} className={`${likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-300 dark:text-gray-400 group-hover:text-red-400"} transition-colors duration-200`} />
                        <span className="text-gray-300 dark:text-gray-400 text-xs sm:text-sm">{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Share2 size={16} className="text-gray-300 hover:text-white" />
                        <Download size={16} className="text-gray-300 hover:text-white" />
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
                    <Heart size={18} className={`${likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"} transition-colors duration-200`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-200 
                                    bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 
                                    backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 group shadow-md hover:shadow-lg"
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
                  src={selectedItem.src} // Pastikan src ada untuk video
                  key={selectedItem.src} // Tambahkan key jika src bisa berubah untuk re-render
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
                <div
                  className="bg-white/85 dark:bg-gray-900/85 backdrop-blur-md rounded-lg sm:rounded-xl p-3.5 sm:p-5 max-w-lg mx-auto 
                                                border border-gray-200/30 dark:border-white/15 shadow-lg dark:shadow-black/50"
                >
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
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 
                                                    text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
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

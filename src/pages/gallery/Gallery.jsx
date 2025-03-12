/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import { Instagram } from "lucide-react";
import testImage from "../../assets/images/cc.png";

const galleryItems = [
  {
    img: "/assets/images/gallery1.jpg",
    author: "Jennifer Pastore",
    title: "How galleries, intellectuals, and patrons have shaped contemporary Indian art",
    link: "https://instagram.com/gallery1",
  },
  {
    img: "/assets/images/gallery2.jpg",
    author: "Mia Yu",
    title: "How artists are reimagining 'global' China",
    link: "https://instagram.com/gallery2",
  },
  {
    img: "/assets/images/gallery3.jpg",
    author: "Skye Sherwin",
    title: "Why I Collect: Lu Kun",
    link: "https://instagram.com/gallery3",
  },
  {
    img: "/assets/images/gallery4.jpg",
    author: "Brian Boucher",
    title: "How to build and sustain an Asian art scene beyond China",
    link: "https://instagram.com/gallery4",
  },
  {
    img: testImage,
    author: "Frank Stella",
    title: "From a rare Frank Stella to new Sarah Lucas sculptures in Miami Beach",
    link: "https://instagram.com/gallery5",
  },
];

const Gallery = () => {
  return (
    <div id="gallery" className="bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Video Section */}
      <div className="w-full h-screen sm:h-auto mx-auto px-4 overflow-hidden">
        <div className="relative w-full h-full sm:pb-[56.25%]">
          <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg">
            <source src="https://nikizefanya.com/wp-content/uploads/2024/08/NIKI_BUZZ_MV_CUTDOWN_WIDE_7.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6 dark:text-white">
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <h2 className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">Gallery</h2>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />
        <h2 className="text-4xl font-bold mb-6">
          Latest
          <a href="https://www.instagram.com/s.d.a.2.4" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 cursor-pointer float-right">
            (see all)
          </a>
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src={item.img} alt={item.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 dark:bg-white/50 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white p-3 bg-black bg-opacity-70 rounded-full">
                  <Instagram size={32} />
                </a>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">({item.author})</p>
                <h3 className="text-md font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;

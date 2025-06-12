/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import { Instagram, ArrowRight } from "lucide-react";
import fRembulan from "../../assets/images/rembulan/high.png";
import comson from "../../assets/images/comson.jpg";
import LazyImage from "../../components/common/LazyImage";
import Video1 from "../../assets/video/videofix.mp4";
import Video2 from "../../assets/video/videofix2.mp4";
import ScrollFloat from "../../components/common/ScrollFloat/ScrollFloat";
// foto gallery
import a1 from "../../assets/images/gallery/a1.jpg";
import a2 from "../../assets/images/gallery/a2.jpg";
import a3 from "../../assets/images/gallery/a3.jpg";
import a4 from "../../assets/images/gallery/a4.jpg";
import a5 from "../../assets/images/gallery/a5.jpg";
import a6 from "../../assets/images/gallery/a6.jpg";

const galleryItems = [
  {
    img: a1,
    author: "Saiful Daulah",
    title: 'Alhamdulillah, berhasil menyelesaikan kelas "Belajar Penggunaan Generative AI" dari Dicoding Indonesia✅',
    link: "https://www.instagram.com/p/DKwVfLvhd0m/",
  },
  {
    img: a2,
    author: "Saiful Daulah",
    title: "🎉 Sertifikat Tercapai! 🚀 Bangga telah menyelesaikan kelas AI Praktis untuk Produktivitas dari @dicoding , bagian dari AI Opportunity Fund: Asia Pacific yang didukung oleh Google.org & ADB.",
    link: "https://www.instagram.com/p/DKZD-JnhdE0/",
  },
  {
    img: a3,
    author: "Saiful Daulah",
    title: "Branding.",
    link: "https://www.instagram.com/p/DKRU2JGzC8U/",
  },
  {
    img: a4,
    author: "Saiful Daulah",
    title: "Dream .",
    link: "https://www.instagram.com/p/DJTIpiPpltr/",
  },
  {
    img: a5,
    author: "Saiful Daulah",
    title: "Remembering my childhood",
    link: "https://www.instagram.com/p/DJQSZuqz4Rq/",
  },
  {
    img: a6,
    author: "Saiful Daulah",
    title: "1 2 3 ....",
    link: "https://www.instagram.com/p/DGkrlrvPXZF/",
  },
];

const ebookItems = [
  { img: fRembulan, title: "Rembulan", author: "Saiful Daulah", link: "rembulan" },
  { img: comson, title: "Rain: Ketika Semua Berubah", author: "Saiful Daulah", link: "comingSoon" },
  { img: comson, title: "Melihat Membaca Menulis", author: "Saiful Daulah", link: "comingSoon" },
];

const Gallery = () => {
  return (
    <div id="gallery" className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col">
      <Navbar />
      {/* Video Section */}
      <div className="w-full h-screen sm:h-auto mx-auto px-4 overflow-hidden">
        <div className="relative w-full h-full sm:pb-[56.25%]">
          {/* Desktop Video - only visible on sm screens and up */}
          <video autoPlay loop muted className="desktop-video absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg hidden sm:block">
            <source src={Video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mobile Video - only visible on screens smaller than sm */}
          <video autoPlay loop muted className="mobile-video absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg block sm:hidden">
            <source src={Video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6 dark:text-white">
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=30%" scrollEnd="bottom bottom-=40%" stagger={0.03} className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">
            Gallery
          </ScrollFloat>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {galleryItems.map((item, index) => (
            <div key={index} data-aos="fade-up" className="relative group overflow-hidden rounded-lg shadow-lg border dark:border-white dark:bg-black dark:shadow-white/20">
              <LazyImage src={item.img} alt={item.title} className="w-full h-100 object-contain transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 dark:bg-white/50 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white p-3 bg-black bg-opacity-70 rounded-full">
                  <Instagram size={32} />
                </a>
              </div>
              <div className="mt-4 p-2 text-center">
                <p className="text-sm text-gray-500">({item.author})</p>
                <h3 className="text-md font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center mb-16">
          <Link to="/all-gallery" className="inline-flex items-center gap-2 outline-1 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Show All Gallery
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* E-Book Section */}
        <hr id="ebooks" className="border-t-2 mt-5 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=30%" scrollEnd="bottom bottom-=40%" stagger={0.03} className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">
            E-Books
          </ScrollFloat>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {ebookItems.map((item, index) => (
            <div key={index} data-aos="fade-up" className="relative group overflow-hidden rounded-lg shadow-lg p-6 bg-white dark:bg-black border dark:border-white dark:shadow-white/20 text-center">
              <LazyImage src={item.img} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-md font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.author}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 dark:hover:text-white">
                Read Now
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;

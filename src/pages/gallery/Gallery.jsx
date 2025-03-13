/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import { Instagram, BookOpen } from "lucide-react";
import fotoProfile from "../../assets/images/Foto_Profile.jpg";
import bungaPutih from "../../assets/images/bunga.jpg";
import sunRise from "../../assets/images/sunrise.jpg";
import gunung from "../../assets/images/gunung.jpg";
import sertiReact from "../../assets/images/serti_react.jpg";
import wisuda from "../../assets/images/wisuda.jpg";
import comingSoon from "../ComSon";

const galleryItems = [
  {
    img: fotoProfile,
    author: "Saiful Daulah",
    title: "Foto Profile",
    link: "https://www.instagram.com/p/DGkrlrvPXZF/",
  },
  {
    img: bungaPutih,
    author: "Saiful Daulah",
    title: "Scientist 🌻",
    link: "https://www.instagram.com/p/DGAqH-bvPEl/",
  },
  {
    img: sunRise,
    author: "Saiful Daulah",
    title: "~Sunrise~",
    link: "https://www.instagram.com/p/DEy36lFPZCP/",
  },
  {
    img: gunung,
    author: "Saiful Daulah",
    title: "❤❤❤",
    link: "https://www.instagram.com/p/DEuXuSATptz/",
  },
  {
    img: sertiReact,
    author: "Saiful Daulah",
    title: "Saya baru saja menyelesaikan kursus Belajar Membuat Aplikasi Web dengan React dari @dicoding 🚀",
    link: "https://www.instagram.com/p/DDa4Z_xBquM/",
  },
  {
    img: wisuda,
    author: "Saiful Daulah",
    title: "Finally, after planning I got out of my comfort zone since 2018 and I had to do this by 2024",
    link: "https://www.instagram.com/p/DDLixnBh-hB/",
  },
];

const ebookItems = [
  { img: sunRise, title: "Rembulan", author: "Saiful Daulah", link: "comingSoon" },
  { img: sunRise, title: "Rain: Ketika Semua Berubah", author: "Saiful Daulah", link: "comingSoon" },
  { img: sunRise, title: "Melihat Membaca Menulis", author: "Saiful Daulah", link: "comingSoon" },
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src={item.img} alt={item.title} className="w-full h-100 object-contain transition-transform duration-300 group-hover:scale-110" />
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

        {/* E-Book Section */}
        <hr className="border-t-2 mt-5 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <h2 className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">E-Books</h2>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {ebookItems.map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 text-center">
              <img src={item.img} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
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

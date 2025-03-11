/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import cloudImage from "../../assets/images/cc.png";
import { CloudDownload } from "lucide-react";

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
          Latest{" "}
          <a href="https://www.instagram.com/s.d.a.2.4" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 cursor-pointer float-right">
            (see all)
          </a>
        </h2>

        {/* Featured Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {[
            {
              img: cloudImage,
              author: "Jennifer Pastore",
              title: "How galleries, intellectuals, and patrons have shaped contemporary Indian art",
              link: "https://example.com/article1",
            },
            {
              img: cloudImage,
              author: "Mia Yu",
              title: "How artists are reimagining 'global' China",
              link: "https://example.com/article2",
            },
          ].map((article, index) => (
            <div key={index} className="space-y-2">
              <img src={article.img} alt={article.title} className="w-full h-64 object-cover rounded-lg" />
              <p className="text-sm text-gray-500">({article.author})</p>
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <a href={article.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                View More →
              </a>
            </div>
          ))}
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {[
            {
              img: cloudImage,
              author: "Jennifer Pastore",
              title: "Li Lin: A discreet collector’s vision comes to life",
              link: "https://example.com/article3",
            },
            {
              img: cloudImage,
              author: "As told to Melanie Pocock",
              title: "How I became an artist: Mit Jai Inn",
              link: "https://example.com/article4",
            },
            {
              img: cloudImage,
              author: "Skye Sherwin",
              title: "Why I Collect: Lu Kun",
              link: "https://example.com/article5",
            },
            {
              img: cloudImage,
              author: "Brian Boucher",
              title: "This is how we support the ecosystem: How to build and sustain an Asian art scene beyond China",
              link: "https://example.com/article6",
            },
            {
              img: cloudImage,
              author: "Frank Stella",
              title: "From a rare Frank Stella to a new Sarah Lucas sculpture: discover ten significant works in OVR: Miami Beach",
              link: "https://example.com/article7",
            },
            {
              img: cloudImage,
              author: "Art Basel",
              title: "Here's what galleries are bringing to Art Basel’s OVR:20c",
              link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fentertainment.kompas.com%2Fread%2F2022%2F12%2F05%2F120354366%2Fprofil-dan-biodata-niki-zefanya-umur-keluarga-dan-karier&psig=AOvVaw047PmXvm8RqrPlInvmMWnv&ust=1741795171023000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD0lOeygowDFQAAAAAdAAAAABAE",
            },
          ].map((article, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img src={article.img} alt={article.title} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <p className="text-sm text-gray-500">({article.author})</p>
                <h3 className="text-md font-semibold">{article.title}</h3>
                <a href={article.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                  View More →
                </a>
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

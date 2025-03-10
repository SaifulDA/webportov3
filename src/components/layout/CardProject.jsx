/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LazyImage from "../common/LazyImage";

// eslint-disable-next-line react/prop-types
const Card = ({ title, desc, image, link }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Card */}
      <div className="relative dark:shadow-white/30 dark:shadow-lg bg-white rounded-2xl shadow-xl drop-shadow-xl pb-4 overflow-hidden hover:shadow-2xl border border-gray-200 max-h-[300px] flex flex-col">
        {/* Image container (Click to Open Modal) */}
        <div className="overflow-hidden rounded-t-2xl cursor-pointer" onClick={() => setIsOpen(true)}>
          <LazyImage src={image} alt={title} className="w-full h-40 object-cover" />
        </div>

        {/* Content container */}
        <div className="p-4 text-center bg-white flex-grow flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 drop-shadow-md">{title}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow">{desc}</p>

          {/* Button */}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-medium uppercase shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-2xl transform hover:scale-105 mt-auto"
            >
              SHOW
            </a>
          ) : (
            <button className="bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-medium uppercase shadow-lg transition-all duration-300 opacity-50 cursor-not-allowed mt-auto" disabled>
              No Link
            </button>
          )}
        </div>
      </div>

      {/* Modal Fullscreen */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 overflow-auto" onClick={() => setIsOpen(false)}>
          <div className="relative max-w-full max-h-full">
            {/* Gambar Fullscreen */}
            <LazyImage
              src={image}
              alt={title}
              className="max-w-full max-h-screen rounded-lg mx-auto block"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat gambar diklik
            />

            {/* Tombol Close ❌ */}
            <button className="fixed top-4 right-4 bg-white text-white p-2 rounded-full text-lg shadow-md hover:bg-red-800 z-50" onClick={() => setIsOpen(false)}>
              ❌
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

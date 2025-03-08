/* eslint-disable no-unused-vars */
import React from "react";
import cv from "/src/assets/cv.pdf";

const DownloadButton = () => {
  const handleDownload = () => {
    const cvUrl = { cv }; // Sesuaikan dengan nama file CV
    window.open(cvUrl, "_blank"); // Membuka file di tab baru
  };
  return (
    <button
      className="bg-black font-poppins text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-blue-600 dark:hover:text-white transition-transform duration-300 hover:scale-110"
      onClick={handleDownload}
    >
      Download CV
    </button>
  );
};

export default DownloadButton;

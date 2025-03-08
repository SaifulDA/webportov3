/* eslint-disable no-unused-vars */
import React from "react";

const DownloadButton = () => {
  const handleDownload = () => {
    window.open("/cv.pdf", "_blank"); // Sesuaikan dengan nama file
  };
  return (
    <button
      className="bg-black font-poppins drop-shadow-xl text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-blue-600 dark:hover:text-white transition-transform duration-300 hover:scale-110"
      onClick={handleDownload}
    >
      Download CV
    </button>
  );
};

export default DownloadButton;

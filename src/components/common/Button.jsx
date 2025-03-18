/* eslint-disable no-unused-vars */
import React from "react";
import ShinyText from "./ShinyText/ShinyText"

const DownloadButton = () => {
  const handleDownload = () => {
    window.open("/CV_Saifuddaulah_Alfarabi.pdf", "_blank"); // Sesuaikan dengan nama file
  };
  return (
    <button
      className="dark:shadow-white/30 dark:shadow-lg bg-black font-poppins drop-shadow-lg px-4 py-2 rounded-full font-medium flex items-center justify-center dark:bg-black dark:border-white border-1 dark:hover:text-white transition-transform duration-300 hover:scale-110"
      onClick={handleDownload}
    >
      <ShinyText text="Download CV" disabled={false} speed={3} className='custom-class' />

    </button>
  );
};

export default DownloadButton;

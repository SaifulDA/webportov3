/* eslint-disable no-unused-vars */
import React from 'react';

const DownloadButton = () => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-blue-600 dark:hover:text-white"
      onClick={() => console.log('Download CV clicked')}
    >
      Download CV
    </button>
  );
};

export default DownloadButton;
/* eslint-disable no-unused-vars */
import React from "react";

// eslint-disable-next-line react/prop-types
const CloseButton = ({ onClick }) => {
  return (
    <button
      className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 transition dark:bg-white dark:text-black dark:hover:bg-blue-600 dark:hover:text-white"
      onClick={onClick}
    >
      CLOSE
    </button>
  );
};

export default CloseButton;

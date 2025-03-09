/* eslint-disable no-unused-vars */
//rename project case sensitif
import React from "react";

// eslint-disable-next-line react/prop-types
const ProjectCard = ({ title, desc, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image container without padding */}
      <div className="overflow-hidden">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      </div>
      
      {/* Content container with padding */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{desc}</p>
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium uppercase">
          SHOW
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
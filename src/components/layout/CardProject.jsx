/* eslint-disable no-unused-vars */
//rename project case sensitif
import React from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ title, desc, image }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl drop-shadow-xl pb-4 overflow-visible transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">

      {/* Image container */}
      <div className="overflow-hidden rounded-t-2xl">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      </div>

      {/* Content container */}
      <div className="p-4 text-center bg-white rounded-b-2xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 drop-shadow-md">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 drop-shadow-sm">{desc}</p>
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium uppercase shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl">SHOW</button>
      </div>
    </div>
  );
};

export default Card;

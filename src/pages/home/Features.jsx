/* eslint-disable no-unused-vars */
import React from "react";

const Features = () => (
  <div className="py-16 bg-gray-100">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Fast Development</h3>
        <p className="text-gray-600">Quick setup and blazing fast development with Vite</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
        <p className="text-gray-600">Beautiful and responsive designs with Tailwind CSS</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Modern Tech Stack</h3>
        <p className="text-gray-600">Built with the latest web technologies</p>
      </div>
    </div>
  </div>
);

export default Features;

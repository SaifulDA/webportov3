/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div id="notfound" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Animasi teks 404 */}
      <motion.h1 className="text-8xl font-extrabold text-gray-900 mb-4" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        404
      </motion.h1>

      {/* GIF Animasi */}
      <img src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" alt="Not Found" className="w-64 h-64 mb-4" />

      {/* Efek ketikan pada teks */}
      <motion.p className="text-xl text-gray-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
        Oops! Halaman tidak ditemukan. Periksa kembali URL Anda.
      </motion.p>

      <p className="text-lg text-gray-600 pb-8">
        <Link to="/chat" className="text-blue-500 hover:underline">
          Hubungi kami
        </Link>{" "}
        jika Anda merasa ini adalah kesalahan.
      </p>

      {/* Tombol kembali */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/" className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-300 hover:bg-gray-800">
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

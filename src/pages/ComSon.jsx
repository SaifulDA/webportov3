/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Home } from "lucide-react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

const ComingSoon = () => {
  return (
    <div id="comingsoon" className="flex flex-col min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Clock size={60} className="text-gray-500 dark:text-gray-400" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-2">Coming Soon</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            I working hard to bring something amazing!
          </p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-black dark:bg-white dark:text-black dark:hover:text-white text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ComingSoon;

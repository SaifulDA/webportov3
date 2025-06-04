/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/30 dark:to-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 dark:from-pink-500/30 dark:to-yellow-500/30 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          {/* Animated 404 Text */}
          <motion.div variants={itemVariants} className="relative mb-8">
            <motion.h1
              className="text-9xl md:text-[12rem] md:pt-20 lg:pt-20 xl:pt-20 font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 bg-clip-text text-transparent select-none"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              404
            </motion.h1>
            <div className="absolute md:pt-20 lg:pt-20 xl:pt-20 inset-0 text-9xl md:text-[12rem] font-black text-gray-200 -z-10 blur-sm">404</div>
          </motion.div>

          {/* Floating Animation Container */}
          <motion.div variants={floatingVariants} animate="animate" className="mb-8">
            <div className="relative">
              <img src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" alt="Not Found" className="w-72 h-72 md:w-80 md:h-80 rounded-2xl shadow-2xl border-4 border-white/50 dark:border-gray-700/50 backdrop-blur-sm" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent dark:from-black/40"></div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 dark:text-white">Oops! Page Not Found</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed dark:text-gray-400">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track!
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8">
            Need help?{" "}
            <Link to="/chat" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4">
              Contact Us
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>{" "}
            if you think this is a mistake.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <button
                onClick={() => window.history.back()}
                className="w-full inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Previous
              </button>
            </motion.div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div variants={itemVariants} className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg max-w-md">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 text-lg">💡</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-bold text-gray-800">Fun Fact:</span> Error 404 first appeared at CERN in 1992. Room 404 was where the first web server was located!
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;

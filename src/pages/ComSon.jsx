/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Home, Zap, Sparkles, ArrowRight, Bell } from "lucide-react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 99,
    hours: 99,
    minutes: 99,
    seconds: 99,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 100); // Tambahkan 100 hari dari sekarang

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="md:pt-20 lg:pt-20 xl:pt-20 min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 dark:from-blue-500/30 dark:to-cyan-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 dark:from-yellow-500/20 dark:to-orange-500/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          {/* Animated Icons */}
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-8 space-x-4">
            <motion.div variants={floatingVariants} animate="animate" className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div variants={pulseVariants} animate="animate" className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-6xl md:text-7xl leading-[1.5] font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 font-kreon tracking-wider over">Coming Soon</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              We&apos;re working hard to bring you something amazing!
              <br />
              <span className="font-semibold text-purple-600 dark:text-purple-400">Stay tuned for the big reveal.</span>
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex justify-center items-center space-x-4 md:space-x-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 dark:border-gray-700/30 min-w-[80px] md:min-w-[100px]">
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{item.value.toString().padStart(2, "0")}</div>
                    <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium mt-1">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div variants={itemVariants} className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance" },
              { icon: Sparkles, title: "Beautiful Design", desc: "Modern and intuitive interface" },
              { icon: Bell, title: "Stay Updated", desc: "Get notified when we launch" },
            ].map((feature, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group hover:from-purple-700 hover:to-pink-700"
              >
                <Home className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Return Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ComingSoon;

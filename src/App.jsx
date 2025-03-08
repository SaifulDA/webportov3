/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./pages/home/Navbar";
import Hero from "./pages/home/Hero";
import Features from "./pages/home/Features";
import Footer from "./pages/home/Footer";
import About from "./pages/home/About";
import Skills from "./pages/home/Skills";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Features />
      <Footer />
    </div>
  );
};

export default App;

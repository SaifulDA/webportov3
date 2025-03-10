/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Hero from "./pages/home/Hero";
import About from "./pages/home/About";
import Skills from "./pages/home/Skills";
import Project from "./pages/home/Project";
import NotFound from "./pages/NotFound"; // Import halaman 404
import Chat from "./pages/contact/Chat";
import Gallery from "./pages/gallery/Gallery";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout untuk halaman utama */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <About />
              <Skills />
              <Project />
            </>
          } />
        </Route>

        {/* Halaman 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;

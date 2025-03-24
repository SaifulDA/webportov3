/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS AOS
import Layout from "./pages/Layout";
import Hero from "./pages/home/Hero";
import About from "./pages/home/About";
import Skills from "./pages/home/Skills";
import Project from "./pages/home/Project";
import NotFound from "./pages/NotFound"; // Import halaman 404
import Chat from "./pages/contact/Chat";
import Gallery from "./pages/gallery/Gallery";
import CoomingSoon from "./pages/ComSon";
import HomAp from "./pages/app/HomAp";
import PhotoBooth from "./pages/app/PhotoBooth";
import CustomizePhoto from "./pages/app/CustomizePhoto";
import BooksRoutes from "./routes/BooksRoutes";
import WeatherTime from "./pages/app/WeatherTime";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, // Durasi animasi dalam m
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Layout untuk halaman utama */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <About />
                <Skills />
                <Project />
              </>
            }
          />
        </Route>
        {/* Halaman 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/comingsoon" element={<CoomingSoon />} />
        <Route path="/app" element={<HomAp />} />
        <Route path="/photobooth" element={<PhotoBooth />} />
        <Route path="/customize" element={<CustomizePhoto />} />
        <Route path="/timezone" element={<WeatherTime />} />
        {/* Tambahkan routes dari BooksRoutes */}
        {/* Render BooksRoutes dengan .map() */}
        {BooksRoutes.map((route, index) => (
          <Route key={index} {...route.props} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;

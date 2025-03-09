/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet /> {/* Ini akan digantikan oleh halaman yang aktif */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

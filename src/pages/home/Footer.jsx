/* eslint-disable no-unused-vars */
import React from "react";
import { Mail, Instagram, Linkedin, Github, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 text-center border-t-2 border-black">
     

      {/* Ikon Sosial Media */}
      <div className="flex justify-center space-x-6 mb-2">
        <Mail className="w-8 h-8" />
        <Instagram className="w-8 h-8" />
        <Linkedin className="w-8 h-8" />
        <Github className="w-8 h-8" />
        <Music className="w-8 h-8" />
      </div>

      {/* Teks Copyright */}
      <p className="font-cabin-sketch text-lg">
        SAIFUDDAULAH ALFARABI © 2025
      </p>
    </footer>
  );
};

export default Footer;

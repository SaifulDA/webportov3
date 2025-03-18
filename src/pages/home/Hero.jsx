/* eslint-disable no-unused-vars */
import React from "react";
import DownloadButton from "../../components/common/Button";
import profileImage from "/src/assets/images/profile.svg";
import { Typewriter } from "react-simple-typewriter";
import LazyImage from "../../components/common/LazyImage";
import TrueFocus from "../../components/common/TrueFocus/TrueFocus";
import DecryptedText from "../../components/common/DecryptedText/DecryptedText";
import RotatingText from "../../components/common/RotatingText/RotatingText";


const Hero = () => {
  return (
    <div id="hero" className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-16 transition-colors duration-300 text-gray-900 dark:text-white dark:bg-black overflow-hidden ">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Floating 3D Elements */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-14 h-14 bg-opacity-40 rounded-full blur-xl animate-float"
          style={{
            backgroundColor: ["#3b82f6", "#8b5cf6", "#f43f5e", "#22c55e", "#eab308", "#f97316"][i % 6],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 3}s`,
          }}
        ></div>
      ))}
      {/* Hero Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-10 z-10">
        {/* Teks Hero */}
        <div data-aos="fade-up" className="text-center max-w-lg justify-center items-center">
          <TrueFocus sentence="Hello I'm" manualMode={false} blurAmount={5} borderColor="Blue" animationDuration={1} pauseBetweenAnimations={1} className="text-xl italic mb-3 font-italianno"></TrueFocus>
          <DecryptedText
            text="Saifuddaulah Alfarabi"
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            parentClassName="all-letters text-3xl"
            encryptedClassName="encrypted"
            className="revealed text-4xl font-kreon mb-2 border-b-2 border-gray-800 dark:border-white inline-block"
          >
            {" "}
          </DecryptedText>

          {/* Rotating Text */}
          <div className="text-2xl my-6 font-kreon h-10">
            <RotatingText
              texts={["IT Development", "Web Developer", "UI/UX Designer", "Cloud Engineer!"]}
              mainClassName="px-2 sm:px-2 md:px-3 dark:text-white text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

          {/* Tombol di Tengah */}
          <div className="flex justify-center mt-4">
            <DownloadButton />
          </div>
        </div>

        {/* Gambar Profile */}
        <div data-aos="fade-up" className="relative flex justify-center drop-shadow-lg">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-black overflow-hidden shadow-lg dark:shadow-white/50 dark:shadow-lg">
            <LazyImage src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

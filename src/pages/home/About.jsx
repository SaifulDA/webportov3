/* eslint-disable no-unused-vars */
import React from "react";
import ScrollFloat from "../../components/common/ScrollFloat/ScrollFloat";

const About = () => {
  return (
    <section id="about" className="bg-white text-gray-900 dark:bg-black dark:text-white py-12 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Garis Atas */}
        <hr className="border-t-2 border-gray-800 dark:border-white mb-4" />

        {/* Judul */}
        <ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=30%" scrollEnd="bottom bottom-=40%" stagger={0.03} className="font-kreon text-3xl tracking-wider font-bold text-center mb-4">
          ABOUT ME
        </ScrollFloat>

        {/* Garis Bawah */}
        <hr className="border-t-2 border-gray-800 dark:border-white mb-8" />

        {/* Isi About Me */}
        <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed text-justify">
          <p data-aos="fade-up">
            I am a passionate IT developer specializing in web development, cloud computing, and mobile development. With a strong foundation in building scalable and efficient web applications, I aim to deliver seamless digital
            experiences. My expertise in cloud computing allows me to design and manage secure, high-performing cloud solutions. Additionally, I develop mobile applications that offer innovative and user-friendly features tailored to
            diverse needs.
          </p>
          <p data-aos="fade-up">
            Beyond development, I excel in UI/UX design and graphic design. I create intuitive and visually appealing interfaces that prioritize user experience and engagement. By combining creativity and functionality, I craft designs that
            not only look stunning but also effectively communicate messages and enhance user satisfaction. My goal is to bridge the gap between technology and design for a holistic digital experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

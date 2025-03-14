/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import cloudComputing from "/src/assets/images/cc.png";
import webDeveloper from "/src/assets/images/wd.png";
import uiUx from "/src/assets/images/design.png";
import CloseButton from "../../components/common/xButton";
import LazyImage from "../../components/common/LazyImage";

const skills = [
  {
    title: "Web Developer",
    level: "Intermediate",
    image: webDeveloper,
    description:
      "As a web developer, I have strong experience in building dynamic user interfaces using HTML, CSS, and JavaScript. I also mastered React, a popular JavaScript library for building interactive web applications. In addition, I have a background in my college days of web development using PHP CodeIgniter 3.",
  },
  {
    title: "Cloud Engineer",
    level: "Intermediate",
    image: cloudComputing,
    description: "As a cloud engineer, I specialize in designing scalable and secure cloud-based applications. I have experience with cloud platforms like AWS and Google Cloud, ensuring high availability and optimized performance.",
  },
  {
    title: "UI/UX Designer",
    level: "Intermediate",
    image: uiUx,
    description: "I excel in UI/UX design, crafting intuitive and visually appealing user interfaces. I prioritize user experience and design user-centric products using Figma and Adobe XD.",
  },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills" className="py-12 px-6 md:px-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Garis Atas */}
      <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />

      {/* Teks SKILLS */}
      <div className="text-center">
        <h2 data-aos="fade-up" className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">SKILLS</h2>
      </div>

      {/* Garis Bawah */}
      <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

      {/* Grid Skill Cards */}
      <div data-aos="fade-up" className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Gambar Lingkaran */}
            <div className="w-60 h-60 dark:shadow-white/30 dark:shadow-lg rounded-full overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform drop-shadow-lg" onClick={() => setSelectedSkill(skill)}>
              <LazyImage src={skill.image} alt={skill.title} className="w-full h-full object-cover" />
            </div>

            {/* Nama & Level */}
            <h3 className="font-kreon tracking-wider text-lg font-bold mt-4 text-gray-800 dark:text-white">{skill.title}</h3>
            <p className="text-gray-600 italic dark:text-gray-300">{skill.level}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-white/20 flex justify-center items-center z-50 backdrop-blur-md" onClick={() => setSelectedSkill(null)}>
          <div
            className="bg-white/20 dark:bg-black/80 dark:backdrop-blur-lg shadow-lg rounded-lg p-6 w-[90%] max-w-md relative backdrop-blur-lg bg-opacity-80 border border-gray-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Cegah modal tertutup saat diklik
          >
            {/* Judul */}
            <h2 className="text-xl font-kreon tracking-wider font-bold text-center text-gray-900 dark:text-white">{selectedSkill.title}</h2>

            {/* Gambar */}
            <div className="w-full h-48 rounded-lg overflow-hidden mt-4">
              <LazyImage src={selectedSkill.image} alt={selectedSkill.title} className="w-full h-full object-cover" />
            </div>

            {/* Deskripsi */}
            <p className="mt-4 text-stone-950 dark:text-gray-300 text-sm">{selectedSkill.description}</p>

            {/* Gunakan CloseButton Component */}
            <CloseButton onClick={() => setSelectedSkill(null)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;

/* eslint-disable no-unused-vars */
import React from "react";

// Data untuk setiap skill
const skills = [
  {
    title: "Web Developer",
    level: "Intermediate",
    image: "/src/assets/images/web-developer.jpg",
  },
  {
    title: "Cloud Engineer",
    level: "Intermediate",
    image: "/src/assets/images/cloud-engineer.jpg",
  },
  {
    title: "UI/UX Designer",
    level: "Intermediate",
    image: "/src/assets/images/ui-ux.jpg",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-white dark:bg-gray-900">
      {/* Garis Atas */}
      <hr className="border-t-2 border-gray-400 w-3/4 mx-auto mb-4" />

      {/* Teks SKILLS */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SKILLS</h2>
      </div>

      {/* Garis Bawah */}
      <hr className="border-t-2 border-gray-400 w-3/4 mx-auto mt-4 mb-12" />
      {/* Grid Skill Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Gambar Lingkaran */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
              <img src={skill.image} alt={skill.title} className="w-full h-full object-cover" />
            </div>

            {/* Nama & Level */}
            <h3 className="text-lg font-bold mt-4 text-gray-800 dark:text-white">{skill.title}</h3>
            <p className="text-gray-600 italic dark:text-gray-300">{skill.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

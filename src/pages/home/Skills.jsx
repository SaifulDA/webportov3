/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import cloudComputing from "/src/assets/images/cc.png";
import webDeveloper from "/src/assets/images/wd.png";
import uiUx from "/src/assets/images/design.png";
import CloseButton from "../../components/common/xButton";
import LazyImage from "../../components/common/LazyImage";

// React Icons imports
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaAws, FaGoogle, FaDocker, FaCloudUploadAlt, FaFigma, FaPencilRuler, FaSitemap, FaUsers } from "react-icons/fa";
import { SiTailwindcss, SiCodeigniter, SiKubernetes, SiTerraform, SiAdobexd, SiSketch } from "react-icons/si";

const skills = [
  {
    title: "Web Developer",
    level: "Intermediate",
    image: webDeveloper,
    description:
      "As a web developer, I have strong experience in building dynamic user interfaces using HTML, CSS, and JavaScript. I also mastered React, a popular JavaScript library for building interactive web applications. In addition, I have a background in my college days of web development using PHP CodeIgniter 3.",
    techStack: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "PHP", icon: FaPhp, color: "#777BB4" },
      { name: "CodeIgniter", icon: SiCodeigniter, color: "#EE4323" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Cloud Engineer",
    level: "Intermediate",
    image: cloudComputing,
    description: "As a cloud engineer, I specialize in designing scalable and secure cloud-based applications. I have experience with cloud platforms like AWS and Google Cloud, ensuring high availability and optimized performance.",
    techStack: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Google Cloud", icon: FaGoogle, color: "#4285F4" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "CI/CD", icon: FaCloudUploadAlt, color: "#41CD52" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    ],
  },
  {
    title: "UI/UX Designer",
    level: "Intermediate",
    image: uiUx,
    description: "I excel in UI/UX design, crafting intuitive and visually appealing user interfaces. I prioritize user experience and design user-centric products using Figma and Adobe XD.",
    techStack: [
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
      { name: "Sketch", icon: SiSketch, color: "#FDB300" },
      { name: "Prototyping", icon: FaPencilRuler, color: "#0ACF83" },
      { name: "Wireframing", icon: FaSitemap, color: "#7B61FF" },
      { name: "User Research", icon: FaUsers, color: "#1DA1F2" },
    ],
  },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills" className="py-12 px-6 md:px-16 bg-white dark:bg-black transition-colors duration-300">
      {/* Garis Atas */}
      <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />

      {/* Teks SKILLS */}
      <div className="text-center">
        <h2 data-aos="fade-up" className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">
          SKILLS
        </h2>
      </div>

      {/* Garis Bawah */}
      <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

      {/* Grid Skill Cards */}
      <div data-aos="fade-up" className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Gambar Lingkaran */}
            <div
              className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 dark:shadow-white/30 dark:shadow-lg rounded-full overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
              onClick={() => setSelectedSkill(skill)}
            >
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm p-4" onClick={() => setSelectedSkill(null)}>
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 w-full max-w-sm relative border border-gray-200 dark:border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <h2 className="text-xl text-center font-kreon tracking-wider font-bold text-gray-900 dark:text-white mb-3">{selectedSkill.title}</h2>

            {/* Gambar */}
            <div className="w-full h-36 rounded-lg overflow-hidden">
              <LazyImage src={selectedSkill.image} alt={selectedSkill.title} className="w-full h-full object-cover" />
            </div>

            {/* Deskripsi */}
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{selectedSkill.description}</p>

            {/* Tech Stack Section */}
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Tech Stack</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {selectedSkill.techStack.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <div key={index} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-md" style={{ borderLeft: `2px solid ${tech.color}` }}>
                      <IconComponent size={18} color={tech.color} className="mb-1" />
                      <span className="text-xs text-gray-800 dark:text-gray-200 text-center">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Close Button at the bottom */}
            <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-center">
              <CloseButton
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center gap-1 text-sm"
              >
                Close
              </CloseButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;

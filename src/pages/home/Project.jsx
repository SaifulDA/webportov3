/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProjectCard from "../../components/layout/CardProject";
import NavigationButton from "../../components/common/ButtonNavigation";
import cloudImage from "../../assets/images/cc.png"; // Ganti dengan path gambar proyek
import webV2 from "../../assets/images/webv2.png"; // Ganti dengan path gambar proyek
import notesBsi from "../../assets/images/notesbsi.jpeg"; // Ganti dengan path gambar proyek

// Data Projects (Tambahkan link unik untuk setiap proyek)
const projects = [
  {
    id: 1,
    title: "Web Portfolio version 2",
    desc: "This is version 2 of the portfolio website using bootstrap",
    image: webV2,
    link: "https://github.com/SaifulDA/saifulda.github.io",
  },
  {
    id: 2,
    title: "Notes App UBSI",
    desc: "This is a mobile application that is my campus Notes App that I made using java",
    image: notesBsi,
    link: "https://example.com/project2-demo",
  },
  {
    id: 3,
    title: "Project Server 3",
    desc: "Deskripsi untuk project 3",
    image: cloudImage,
    link: "https://github.com/user/project3",
  },
  {
    id: 4,
    title: "Project Server 4",
    desc: "Deskripsi untuk project 4",
    image: cloudImage,
    link: "https://myportfolio.com/project4",
  },
  {
    id: 5,
    title: "Project Server 5",
    desc: "Deskripsi untuk project 5",
    image: cloudImage,
    link: "https://github.com/user/project5",
  },
  {
    id: 6,
    title: "Project Server 6",
    desc: "Deskripsi untuk project 6",
    image: cloudImage,
    link: "https://example.com/project6-demo",
  },
];

const ProjectsSection = () => {
  const navigationPrevClass = "swiper-button-prev-custom";
  const navigationNextClass = "swiper-button-next-custom";

  return (
    <section id="project" className="py-12 px-6 md:px-16 bg-white dark:bg-gray-900">
      <div className="mx-auto px-4">
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <h2 className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">Project</h2>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />
        <div className="mb-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">All Project</h3>
        </div>

        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: `.${navigationPrevClass}`,
              nextEl: `.${navigationNextClass}`,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full overflow-visible h-90"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard title={project.title} desc={project.desc} image={project.image} link={project.link} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center mt-8 gap-4">
            <button
              className={`${navigationPrevClass} dark:shadow-white/30 dark:shadow-md w-12 h-12 drop-shadow-lg shadow-lg rounded-full border border-gray-900 dark:border-white flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110`}
            >
              <NavigationButton direction="left" />
            </button>
            <button
              className={`${navigationNextClass} dark:shadow-white/30 dark:shadow-md w-12 h-12 drop-shadow-lg shadow-lg rounded-full border border-gray-900 dark:border-white flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110`}
            >
              <NavigationButton direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

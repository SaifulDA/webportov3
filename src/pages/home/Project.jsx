/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProjectCard from "../../components/layout/CardProject";
import NavigationButton from "../../components/common/ButtonNavigation";
import cloudImage from "../../assets/images/cc.png"; // Ganti dengan path gambar proyek

// Data Projects
const projects = [
  { id: 1, title: "Project Server 1", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
  { id: 2, title: "Project Server 2", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
  { id: 3, title: "Project Server 3", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
  { id: 4, title: "Project Server 4", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
  { id: 5, title: "Project Server 5", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
  { id: 6, title: "Project Server 6", desc: "ini adalah contoh dari deskripsi dari project tersebut", image: cloudImage },
];

const ProjectsSection = () => {
  // Create unique class names for the navigation buttons
  const navigationPrevClass = "swiper-button-prev-custom";
  const navigationNextClass = "swiper-button-next-custom";

  return (
    <section id="project" className="py-12 px-6 md:px-16 bg-gray-200 dark:bg-gray-900">
      {/* Title with border line above and below */}
      <div className="mx-auto px-4">
        {/* Garis Atas */}
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />

        {/* Teks SKILLS */}
        <div className="text-center">
          <h2 className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white">Project</h2>
        </div>

        {/* Garis Bawah */}
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />

        {/* Category title */}
        <div className="mb-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">All Project</h3>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Project cards */}
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
                <ProjectCard title={project.title} desc={project.desc} image={project.image} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button className={`${navigationPrevClass} w-12 h-12 drop-shadow-lg shadow-lg rounded-full border border-gray-900 dark:border-white flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110`}>
              <NavigationButton direction="left" />
            </button>

            <button className={`${navigationNextClass} w-12 h-12 drop-shadow-lg shadow-lg rounded-full border border-gray-900 dark:border-white flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110`}>
              <NavigationButton direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

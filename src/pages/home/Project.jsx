/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProjectCard from "../../components/layout/projectCard";
import NavigationButton from "../../components/common/navigationButton";
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
    <section className="py-16 bg-white dark:bg-gray-900">
      {/* Title with border line above and below */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-t border-b border-gray-300 py-4 text-center mb-8">
          PROJECTS
        </h2>
        
        {/* Category title */}
        <div className="mb-8">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Web Development</h3>
        </div>
        
        <div className="relative">
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
            className="w-full"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard 
                  title={project.title} 
                  desc={project.desc} 
                  image={project.image} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              className={`${navigationPrevClass} w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none`}
            >
              <NavigationButton direction="left" />
            </button>
            <button 
              className={`${navigationNextClass} w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none`}
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
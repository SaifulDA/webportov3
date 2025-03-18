/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ScrollFloat from "../../components/common/ScrollFloat/ScrollFloat";
import ProjectCard from "../../components/layout/CardProject";
import NavigationButton from "../../components/common/ButtonNavigation";
import webV2 from "../../assets/images/webv2.png"; // Ganti dengan path gambar proyek
import notesBsi from "../../assets/images/notesbsi.jpeg"; // Ganti dengan path gambar proyek
import badgesgcp from "../../assets/images/badgesgcp.png"; // Ganti dengan path gambar proyek
import fitfans from "../../assets/images/fitfans.png"; // Ganti dengan path gambar proyek
import pustakabooking from "../../assets/images/pustakabooking.jpg"; // Ganti dengan path gambar proyek
import dt from "../../assets/images/dt.jpg"; // Ganti dengan path gambar proyek

// Data Projects (Tambahkan link unik untuk setiap proyek)
const projects = [
  {
    id: 1,
    title: "Badges Google Cloud Platform",
    desc: "This is a project to get badges from Google Cloud Platform",
    image: badgesgcp,
    link: "https://www.cloudskillsboost.google/public_profiles/b1edb3f1-66c6-4f16-8d80-90f6ddffe809",
  },
  {
    id: 2,
    title: "Web Portfolio version 2",
    desc: "This is version 2 of the portofolio website using bootstrap",
    image: webV2,
    link: "https://github.com/SaifulDA/saifulda.github.io",
  },
  {
    id: 3,
    title: "Notes App UBSI",
    desc: "This is a mobile application that is my campus Notes App that I made using java",
    image: notesBsi,
    link: "https://github.com/SaifulDA/Aplikasi-Mobile-Catatan-Tugas-Kuliah-UBSI",
  },
  {
    id: 4,
    title: "FitFans",
    desc: "Fitfans is a project of the Bangkit Academy by Google GoTo Traveloka program.",
    image: fitfans,
    link: "https://github.com/Capstone-CH2-PS196/FitFans",
  },
  {
    id: 5,
    title: "Pustaka Booking",
    desc: "This is a project to make a library booking website",
    image: pustakabooking,
    link: "https://github.com/SaifulDA/pustaka-booking",
  },
  {
    id: 6,
    title: "Domination Tech",
    desc: "This is a comunity that I made to share knowledge about technology",
    image: dt,
    link: "https://www.instagram.com/dominationtech/",
  },
];

const ProjectsSection = () => {
  const navigationPrevClass = "swiper-button-prev-custom";
  const navigationNextClass = "swiper-button-next-custom";

  return (
    <section id="project" className="py-12 px-6 md:px-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="mx-auto px-4">
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mb-4 dark:border-white" />
        <div className="text-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=30%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            className="font-kreon text-3xl tracking-wider font-bold text-gray-900 dark:text-white"
          >
            Project
          </ScrollFloat>
        </div>
        <hr className="border-t-2 border-stone-950 w-3/4 max-w-5xl mx-auto mt-4 mb-12 dark:border-white" />
        <div className="mb-8 max-w-5xl mx-auto">
          <p data-aos="fade-up" className="text-2xl font-medium text-gray-900 dark:text-white font-italianno tracking-wider">
            All Project
          </p>
        </div>

        <div data-aos="fade-up" className="max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: `.${navigationPrevClass}`,
              nextEl: `.${navigationNextClass}`,
            }}
            autoplay={{
              delay: 3000, // Durasi tiap slide (ms)
              disableOnInteraction: false, // Jangan berhenti jika user berinteraksi
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

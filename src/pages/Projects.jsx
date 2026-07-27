import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import ProjectCard from "../components/projects/ProjectCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["all", "web", "mobile", "fullstack", "wordpress"];

function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const gridRef = useRef(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Anima las tarjetas en cascada cada vez que cambia el filtro (activeCategory en las deps)
  useGSAP(
    () => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: gridRef, dependencies: [activeCategory] },
  );

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-8">
          {t.projects.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-accent border-accent text-white"
                  : "border-border text-text-muted"
              }`}
            >
              {t.projects.filters[cat]}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
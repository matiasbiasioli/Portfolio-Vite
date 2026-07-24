import { useState } from "react";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import ProjectCard from "../components/projects/ProjectCard.jsx";

// Las claves acá tienen que coincidir con "category" de cada proyecto en projects.js
// y con las claves dentro de t.projects.filters en los JSON de idioma.
const CATEGORIES = ["all", "web", "mobile", "fullstack", "wordpress"];

function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  // "all" muestra todos los proyectos sin filtrar; cualquier otra categoría filtra por coincidencia exacta
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-8">
          {t.projects.title}
        </h1>

        {/* Botones de filtro: en mobile pueden pasar a una segunda línea si no entran todos */}
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

        {/* Grid mobile-first: 1 columna por defecto, 2 desde sm, 3 desde md */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
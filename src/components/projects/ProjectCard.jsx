import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Tarjeta simple para el grid de "todos los proyectos" — a diferencia de la del carrusel,
// esta no tiene lógica de posición 3D, es un link directo a la página de detalle.
function ProjectCard({ project }) {
  const { language } = useLanguage();

  return (
    <Link
      to={`/project/${project.id}`}
      className="group relative flex flex-col justify-end rounded-2xl border border-border overflow-hidden h-56 sm:h-64 p-5"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.9), transparent), url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Botón circular "visitar", mismo estilo que en el carrusel de la Home */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center text-text">
        <ArrowUpRight size={16} />
      </div>

      <h3 className="text-lg font-bold text-text">{project.title}</h3>
      <p className="text-text-muted text-xs mt-1 mb-3 line-clamp-2">
        {project.description[language]}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="border border-border text-text-muted text-[10px] px-2.5 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default ProjectCard;
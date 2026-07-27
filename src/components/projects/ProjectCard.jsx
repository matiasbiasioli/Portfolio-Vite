import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useLanguage } from "../../context/LanguageContext.jsx";

function ProjectCard({ project }) {
  const { language } = useLanguage();
  const cardRef = useRef(null);

  // Inclina la tarjeta en 3D según dónde está el cursor adentro de ella —
  // más original que un simple hover de opacidad/escala.
  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: relX * 12,
      rotateX: relY * -12,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }

  function handleMouseLeave() {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  return (
    <Link
      ref={cardRef}
      to={`/project/${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // "project-card" es el gancho que usa Projects.jsx para la animación de entrada en cascada
      className="project-card group relative flex flex-col justify-end rounded-2xl border border-border overflow-hidden h-56 sm:h-64 p-5"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.9), transparent), url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
import { projects } from "../data/projects.js";
import ProjectCarousel from "../components/projects/ProjectCarousel.jsx";

function TestCarousel() {
  // Solo pasamos los proyectos marcados como destacados
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-bg text-text px-6 py-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Prototipo: Carrusel 3D
      </h2>
      <ProjectCarousel projects={featured} />
    </div>
  );
}

export default TestCarousel;
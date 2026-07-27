import Hero from "../components/hero/Hero.jsx";
import ProjectCarousel from "../components/projects/ProjectCarousel.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import Technologies from "../components/technologies/Technologies.jsx";
import Contact from "../components/contact/Contact.jsx";
import AnimatedButton from "../components/AnimatedButton.jsx"; 
function Home() {
  const { t } = useLanguage();
  // Solo los proyectos marcados como destacados van al carrusel de la Home
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div>
      <Hero />

      {/* id="portfolio" para que el link "Proyectos" del navbar haga scroll hasta acá */}
      <section id="portfolio" className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-text mt-4">
            {t.nav.portfolio}
          </h2>

          <ProjectCarousel projects={featuredProjects} />

          <div className="flex justify-center mt-8">
            <AnimatedButton to="/proyectos">{t.projects.viewAll}</AnimatedButton>
          </div>
        </div>
      </section>

      {/* Technologies y Contact salen de adentro de #portfolio: son secciones propias, no anidadas */}
      <Technologies />
      <Contact />
    </div>
  );
}

export default Home;
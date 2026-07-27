import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getTechIcon } from "../components/projects/techIcons.js";

function ProjectDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-text text-lg">{t.projectDetail.notFound}</p>
        <Link to="/" className="text-accent underline">
          {t.projectDetail.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent mb-8"
        >
          ← {t.projectDetail.back}
        </Link>

        <div className="grid lg:grid-cols-[70%_30%] gap-10">
          {/* ---- Columna principal (70%) ---- */}
          <div>
            <span className="text-accent text-xs uppercase tracking-widest">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-text mt-2 mb-6">
              {project.title}
            </h1>

            <div className="rounded-2xl overflow-hidden border border-border mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-text-muted text-base md:text-lg mb-10">
              {project.description[language]}
            </p>

            {project.gallery && project.gallery.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden border border-border"
                  >
                    <img
                      src={image}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- Sidebar (30%): dos bloques bien diferenciados, cada uno en su propio contenedor ---- */}
          <aside className="flex flex-col gap-6">
            {/* Bloque de Tecnologías, con ícono de marca + nombre por cada una */}
            <div className="bg-bg-soft border border-border rounded-2xl p-6">
              <h2 className="text-text font-bold uppercase text-sm tracking-widest mb-4">
                {t.projectDetail.stack}
              </h2>
              <div className="flex flex-col gap-3">
                {project.stack.map((tech) => {
                  const Icon = getTechIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-3 text-text-muted"
                    >
                      <Icon size={20} className="text-accent shrink-0" />
                      <span className="text-sm">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bloque de Herramientas, mismo formato que el de arriba pero separado */}
            {project.tools && project.tools.length > 0 && (
              <div className="bg-bg-soft border border-border rounded-2xl p-6">
                <h2 className="text-text font-bold uppercase text-sm tracking-widest mb-4">
                  {t.projectDetail.tools}
                </h2>
                <div className="flex flex-col gap-3">
                  {project.tools.map((tool) => {
                    const Icon = getTechIcon(tool);
                    return (
                      <div
                        key={tool}
                        className="flex items-center gap-3 text-text-muted"
                      >
                        <Icon size={20} className="text-accent shrink-0" />
                        <span className="text-sm">{tool}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Links a demo en vivo y repositorio, en su propio contenedor también */}
            <div className="bg-bg-soft border border-border rounded-2xl p-6 flex flex-col gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-accent hover:bg-accent-hover text-white text-center px-5 py-3 rounded-full font-medium"
                >
                  {/* "Ver Demo" para mobile (no hay sitio que "visitar"), "Visitar sitio" para el resto */}
                  {project.category === "mobile"
                    ? t.projectDetail.viewDemo
                    : t.projectDetail.visitSite}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-border text-text text-center px-5 py-3 rounded-full font-medium"
                >
                  {t.projectDetail.repo}
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;

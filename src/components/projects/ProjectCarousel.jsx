import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

function ProjectCarousel({ projects }) {
  const { language } = useLanguage();
  const navigate = useNavigate(); // hook de react-router para cambiar de ruta por código
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const dragState = useRef({ startX: 0, dragging: false });
  const wheelLock = useRef(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 640);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function goTo(index) {
    const total = projects.length;
    setActiveIndex(((index % total) + total) % total);
  }

  function handleWheel(e) {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 10) return;
    if (wheelLock.current) return;
    wheelLock.current = true;
    if (delta > 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);
    setTimeout(() => {
      wheelLock.current = false;
    }, 400);
  }

  // Reemplaza a handlePointerDown Y handlePointerUp anteriores (borrá ambas y poné solo esta)
  function handlePointerDown(e) {
    const startX = e.clientX;
    dragState.current.dragging = true;

    // Escuchamos el "soltar" en toda la ventana, no solo en la tarjeta,
    // así el arrastre funciona aunque el cursor se salga del área — sin usar setPointerCapture
    // (que era lo que le robaba el click a las tarjetas).
    function onPointerUp(upEvent) {
      const delta = upEvent.clientX - startX;
      const threshold = 40;
      if (delta > threshold) goTo(activeIndex - 1);
      else if (delta < -threshold) goTo(activeIndex + 1);
      dragState.current.dragging = false;
      window.removeEventListener("pointerup", onPointerUp);
    }

    window.addEventListener("pointerup", onPointerUp);
  }

  // Click sobre una tarjeta: si ya está activa, navega a su detalle; si no, la trae al frente
  function handleCardClick(index, isActive, projectId) {
    if (isActive) {
      navigate(`/project/${projectId}`);
    } else {
      goTo(index);
    }
  }

  const spacing = isMobile ? 140 : 220;
  const depth = isMobile ? -120 : -200;
  const rotation = isMobile ? -15 : -25;
  const cardScale = isMobile ? 0.8 : 0.75;

  return (
    <div
      className="relative w-full flex items-center justify-center py-12 md:py-20"
      style={{ perspective: "1200px" }}
    >
      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-1 md:left-8 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border bg-bg-soft text-text flex items-center justify-center"
        aria-label="Proyecto anterior"
      >
        ←
      </button>

      <div
        className="relative w-full max-w-3xl h-64 sm:h-72 md:h-80 select-none touch-none"
        style={{ transformStyle: "preserve-3d" }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
      >
        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          const translateX = offset * spacing;
          const translateZ = isActive ? 0 : depth;
          const rotateY = offset * rotation;
          const scale = isActive ? 1 : cardScale;
          const opacity = Math.abs(offset) > 2 ? 0 : 1;

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(index, isActive, project.id)}
              className="absolute inset-0 mx-auto flex flex-col justify-end p-4 md:p-6 rounded-2xl border border-border bg-bg-soft cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: 10 - Math.abs(offset),
                backgroundImage: `linear-gradient(to top, rgba(10,14,26,0.9), transparent), url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="text-accent text-xs uppercase tracking-widest mb-2">
                {project.category}
              </span>
              <h3 className="text-lg md:text-2xl font-bold text-text">
                {project.title}
              </h3>
              <p className="text-text-muted text-xs md:text-sm mt-1 line-clamp-2">
                {project.description[language]}
              </p>
              {/* Pista sutil de que la tarjeta activa es clickeable, solo visible en ella */}
              {isActive && (
                <span className="text-accent text-xs mt-2">
                  {language === "es" ? "Ver detalle →" : "View detail →"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-1 md:right-8 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border bg-bg-soft text-text flex items-center justify-center"
        aria-label="Proyecto siguiente"
      >
        →
      </button>
    </div>
  );
}

export default ProjectCarousel;

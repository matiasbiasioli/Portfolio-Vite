import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techCategories } from "../../data/technologies.js";
import { getTechIcon, getTechColor } from "../projects/techIcons.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Registramos el plugin de scroll una sola vez
gsap.registerPlugin(ScrollTrigger);

function Technologies() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Anima cada bloque de categoría con un fade + subida, uno detrás del otro (stagger),
      // pero recién cuando la sección entra en pantalla (start: "top 80%")
      gsap.from(".tech-category-block", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="px-6 md:px-16 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-accent text-sm tracking-widest uppercase">
          [ 003 ] {t.technologies.title}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-text mt-4 mb-2">
          {t.technologies.title}
        </h2>
        <p className="text-text-muted mb-12 max-w-md">
          {t.technologies.subtitle}
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ gridAutoFlow: "dense" }}
        >
          {techCategories.map((category) => {
            const isBig = category.items.length >= 4;
            return (
              <div
                key={category.key}
                className={`tech-category-block border border-border rounded-2xl p-6 bg-bg-soft ${
                  isBig ? "sm:col-span-2" : "col-span-1"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-4 bg-accent rounded-full" />
                  <h3 className="text-text-muted text-xs uppercase tracking-widest">
                    {t.technologies.categories[category.key]}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.items.map((tech) => {
                    const Icon = getTechIcon(tech);
                    const color = getTechColor(tech);
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-2 border border-border rounded-full px-4 py-2"
                      >
                        <Icon
                          size={16}
                          className={color ? "" : "text-accent"}
                          style={color ? { color } : undefined}
                        />
                        <span className="text-text text-sm">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Technologies;
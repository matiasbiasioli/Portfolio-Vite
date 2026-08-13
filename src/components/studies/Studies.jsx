import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Sparkles, X } from "lucide-react";
import { studies } from "../../data/studies.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

function Studies() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Guarda la URL del certificado que está abierto en el modal, o null si está cerrado
  const [activeCertificate, setActiveCertificate] = useState(null);

  useGSAP(
    () => {
      gsap.from(".study-card", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  // Anima la entrada/salida del modal cada vez que cambia activeCertificate
  useGSAP(() => {
    if (activeCertificate) {
      gsap.set(modalRef.current, { display: "flex" });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
      );
      gsap.fromTo(
        ".certificate-image-box",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [activeCertificate]);

  function closeModal() {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(".certificate-image-box", {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      onComplete: () => {
        setActiveCertificate(null);
        gsap.set(modalRef.current, { display: "none" });
      },
    });
  }

  // Cerrar con la tecla Escape, y bloquear el scroll del body mientras el modal está abierto
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && activeCertificate) closeModal();
    }
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = activeCertificate ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeCertificate]);

  return (
    <section ref={sectionRef} className="px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-text mb-2">
          {t.studies.title}
        </h2>
        <p className="text-text-muted mb-10 max-w-md">{t.studies.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studies.map((study, index) => {
            const Icon = study.area === "ai" ? Sparkles : GraduationCap;
            return (
              <div
                key={index}
                className="study-card flex flex-col gap-3 border border-border rounded-2xl p-5 bg-bg-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-text font-medium text-sm">{study.title}</p>
                    <p className="text-text-muted text-xs mt-1">{study.platform}</p>
                  </div>
                </div>

                {/* Botón solo aparece si el curso tiene certificado cargado */}
                {study.certificate && (
                  <button
                    onClick={() => setActiveCertificate(study.certificate)}
                    className="self-start text-accent text-xs font-medium mt-1 cursor-pointer"
                  >
                    {t.studies.viewCertificate} →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Modal del certificado: vive fuera del flujo normal, tapando toda la pantalla ---- */}
      <div
        ref={modalRef}
        onClick={closeModal}
        className="fixed inset-0 z-[100] items-center justify-center p-6"
        style={{ display: "none" }}
      >
        <div ref={backdropRef} className="absolute inset-0 bg-black/80" />

        <div
          className="certificate-image-box relative max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()} // evita que el click adentro de la imagen cierre el modal
        >
          <button
            onClick={closeModal}
            className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center text-text"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
          {activeCertificate && (
            <img
              src={activeCertificate}
              alt="Certificado"
              className="w-full h-auto rounded-2xl border border-border"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Studies;
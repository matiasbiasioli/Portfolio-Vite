import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext.jsx";
import profilePhoto from "../../assets/profile.jpg";
import AnimatedButton from "../AnimatedButton.jsx";

function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title-line", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
      })
        .from(".hero-photo", { opacity: 0, scale: 0.8, duration: 0.5 }, "-=0.5")
        .from(".hero-text", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(
          ".hero-socials > *",
          { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-[85vh] flex flex-col justify-between px-6 md:px-16 py-16 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* ---- Versión MOBILE (solo debajo de sm) ---- */}
        <div className="sm:hidden flex flex-col items-center text-center gap-5">
          <h1 className="hero-title-line font-black uppercase leading-tight text-4xl text-text">
            Full Stack <span className="text-accent">Developer</span>
          </h1>
          <div className="hero-photo w-28 h-28 rounded-full overflow-hidden border-2 border-accent">
            <img
              src={profilePhoto}
              alt="Muso"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="hero-text text-text-muted text-sm max-w-xs">
            {t.hero.subtitle_pre} React {t.hero.subtitle_and} React Native,{" "}
            {t.hero.subtitle_post}
          </p>
        </div>

        {/* ---- Versión DESKTOP/TABLET (desde sm) ---- */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-6 md:gap-10">
            <h1 className="hero-title-line font-black uppercase leading-[0.85] text-6xl md:text-8xl lg:text-9xl text-text">
              Full Stack
            </h1>
            <div className="hero-photo shrink-0 translate-y-2 md:translate-y-4">
              <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-accent">
                <img
                  src={profilePhoto}
                  alt="Muso"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6 mt-2">
            <p className="hero-text text-text-muted text-base md:text-lg max-w-xs md:max-w-sm">
              {t.hero.subtitle_pre} React {t.hero.subtitle_and} React Native,{" "}
              {t.hero.subtitle_post}
            </p>
            <h1 className="hero-title-line font-black uppercase leading-[0.85] text-6xl md:text-8xl lg:text-9xl text-accent text-right">
              Developer
            </h1>
          </div>
        </div>
      </div>

      {/* ---- Botones MOBILE: sin efecto magnético (pensado para mouse, no para dedo) ---- */}
      <div className="hero-socials sm:hidden max-w-6xl mx-auto w-full flex flex-col gap-3 mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5490000000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-border text-text px-5 py-3 rounded-full font-medium"
          >
            <FaWhatsapp size={18} /> WhatsApp
          </a>
          <a
            href="https://linkedin.com/in/tu-usuario"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-border text-text px-5 py-3 rounded-full font-medium"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-border text-text px-5 py-3 rounded-full font-medium"
          >
            <FaGithub size={18} /> GitHub
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#portfolio"
            className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-semibold"
          >
            {t.hero.cta_projects}
          </a>
          <a
            href="/cv.pdf"
            className="border border-border text-text px-6 py-3 rounded-full font-medium"
          >
            {t.hero.cta_contact}
          </a>
        </div>
      </div>

      {/* ---- Botones DESKTOP: AnimatedButton con efecto fill-sweep ---- */}
      <div className="hero-socials hidden sm:flex max-w-6xl mx-auto w-full flex-wrap gap-4 mt-12">
        <AnimatedButton
          href="#portfolio"
          variant="solid"
          className="font-semibold"
        >
          {t.hero.cta_projects}
        </AnimatedButton>

        <AnimatedButton href="/cv.pdf">{t.hero.cta_contact}</AnimatedButton>

        <AnimatedButton
          href="https://wa.me/5490000000000"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp size={18} /> WhatsApp
        </AnimatedButton>

        <AnimatedButton
          href="https://linkedin.com/in/tu-usuario"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={18} /> LinkedIn
        </AnimatedButton>

        <AnimatedButton
          href="https://github.com/tu-usuario"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={18} /> GitHub
        </AnimatedButton>
      </div>
    </section>
  );
}

export default Hero;

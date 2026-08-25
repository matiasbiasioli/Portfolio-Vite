import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import NavLink from "./NavLink.jsx";
import { Link } from "react-router-dom";

// Animación de "presionar" al pasar el mouse, reutilizada en los botones circulares
function handleHoverIn(e) {
  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out" });
}
function handleHoverOut(e) {
  gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
}

const FLAG = {
  es: "https://flagcdn.com/24x18/ar.png",
  en: "https://flagcdn.com/24x18/us.png",
};

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  // Las dos barritas del ícono hamburguesa, para animarlas por separado
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);

  const otherLanguage = language === "es" ? "en" : "es";

  function selectLanguage(lang) {
    setLanguage(lang);
    setLangOpen(false);
  }

  // Anima el panel mobile (alto + opacidad) y las barritas (giro a X) cada vez que cambia mobileOpen
  useGSAP(() => {
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.to(bar1Ref.current, {
        rotate: 45,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(bar2Ref.current, {
        rotate: -45,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(bar1Ref.current, {
        rotate: 0,
        y: -4,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(bar2Ref.current, {
        rotate: 0,
        y: 4,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [mobileOpen]);

  return (
    <div className="px-4 sm:px-6 md:px-16 pt-6">
      {/* Navbar principal */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 bg-bg-soft border border-border rounded-full">
        <Link to="/" className="font-bold text-text text-sm sm:text-base">
          MUSO.DEV
        </Link>

        {/* Links de nav: solo visibles desde md hacia arriba, con el efecto de rollo al hacer hover */}
        <nav className="hidden md:flex gap-6">
          <NavLink href="#home">{t.nav.home}</NavLink>
          <NavLink href="#technologies">{t.nav.technologies}</NavLink>
          <NavLink href="#portfolio">{t.nav.portfolio}</NavLink>
          <NavLink href="#contact">{t.nav.contact}</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={(e) => toggleTheme(e)}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-text cursor-pointer"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setLangOpen((open) => !open)}
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
              className="flex items-center gap-1.5 sm:gap-2 border border-border rounded-full px-3 sm:px-4 py-2 text-text"
              aria-label="Cambiar idioma"
            >
              <img
                src={FLAG[language]}
                alt={language}
                className="w-5 h-auto rounded-sm"
              />
              <span className="text-xs sm:text-sm font-medium">
                {language.toUpperCase()}
              </span>
              <span className="text-xs">▾</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-bg-soft border border-border rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => selectLanguage(otherLanguage)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-text hover:bg-white/10"
                >
                  <img
                    src={FLAG[otherLanguage]}
                    alt={otherLanguage}
                    className="w-5 h-auto rounded-sm"
                  />
                  {otherLanguage.toUpperCase()}
                </button>
              </div>
            )}
          </div>

          {/* Botón hamburguesa: solo visible por debajo de md. Las dos barritas se animan a X con GSAP */}
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden relative w-9 h-9 rounded-full border border-border flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <span
              ref={bar1Ref}
              className="absolute w-4 h-0.5 bg-text rounded-full"
              style={{ transform: "translateY(-4px)" }}
            />
            <span
              ref={bar2Ref}
              className="absolute w-4 h-0.5 bg-text rounded-full"
              style={{ transform: "translateY(4px)" }}
            />
          </button>
        </div>
      </header>

      {/* Panel de nav mobile: links simples (sin el efecto de rollo, pensado para mouse) */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden max-w-6xl mx-auto mt-2 bg-bg-soft border border-border rounded-3xl overflow-hidden flex flex-col"
        >
          <a
            href="#home"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-4 border-b border-border text-text active:bg-white/10"
          >
            {t.nav.home}
          </a>
          <a
            href="#technologies"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-4 border-b border-border text-text active:bg-white/10"
          >
            {t.nav.technologies}
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-4 border-b border-border text-text active:bg-white/10"
          >
            {t.nav.portfolio}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-4 text-text active:bg-white/10"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </div>
  );
}

export default Header;

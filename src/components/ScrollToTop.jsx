import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Duración del scroll animado hacia una sección con ancla, en segundos.
// Subí este número para que sea más lento, bajalo para que sea más rápido.
const SCROLL_DURATION = 1.2;

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          gsap.to(window, {
            duration: SCROLL_DURATION,
            scrollTo: el,
            ease: "power2.inOut",
          });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Sin ancla: va directo al tope, sin animación (es un cambio de página, no hace falta)
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
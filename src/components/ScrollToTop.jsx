import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Hay un ancla en la URL (ej. /#technologies) — esperamos un toque a que la página
      // termine de renderizar, y recién ahí buscamos el elemento y scrolleamos hasta él.
      const id = hash.replace("#", "");
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Sin ancla: comportamiento normal, ir al tope de la página nueva
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
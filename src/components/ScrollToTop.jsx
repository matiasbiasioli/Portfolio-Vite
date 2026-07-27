import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Cada vez que cambia la ruta (pathname), lleva el scroll al tope de la página.
// React Router no hace esto solo — hay que armarlo a mano.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // no renderiza nada, solo escucha
}

export default ScrollToTop;
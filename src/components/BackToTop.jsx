import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function BackToTop() {
  // Solo se muestra después de bajar un poco, para no estorbar cerca del Hero
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    // Scroll animado con GSAP en vez del salto brusco del scrollTo nativo
    gsap.to(window, { duration: 0.8, scrollTo: 0, ease: "power2.inOut" });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg cursor-pointer"
      aria-label="Volver arriba"
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
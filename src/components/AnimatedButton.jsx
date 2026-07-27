import { useRef } from "react";
import gsap from "gsap";

// Botón reutilizable con dos variantes:
// - "outline": efecto "fill sweep" — el fondo se desliza desde la izquierda al hacer hover,
//   y el texto pasa a blanco al mismo tiempo.
// - "solid": ya tiene color de fondo, así que solo aplicamos un leve "press" (escala), sin sweep.
function AnimatedButton({
  href,
  children,
  variant = "outline",
  className = "",
  ...props
}) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);

  function handleEnter() {
    if (variant === "outline") {
      gsap.to(fillRef.current, {
        scaleX: 1,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(textRef.current, { color: "#ffffff", duration: 0.3 });
    } else {
      gsap.to(rootRef.current, {
        scale: 1.04,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }

  function handleLeave() {
    if (variant === "outline") {
      gsap.to(fillRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(textRef.current, { color: "var(--color-text)", duration: 0.3 });
    } else {
      gsap.to(rootRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
  }

  const base =
    variant === "solid"
      ? "bg-accent text-white"
      : "border border-border text-text";

  return (
    <a
      ref={rootRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium ${base} ${className}`}
      {...props}
    >
      {/* Capa de relleno: arranca "achicada" en el eje X (scaleX 0) y crece desde la izquierda */}
      {variant === "outline" && (
        <span
          ref={fillRef}
          className="absolute inset-0 bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      )}
      {/* El texto va en una capa por encima del relleno, para que siempre quede legible */}
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}

export default AnimatedButton;

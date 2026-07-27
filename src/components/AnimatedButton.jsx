import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function AnimatedButton({
  href,
  to,
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

  const content = (
    <>
      {variant === "outline" && (
        <span
          ref={fillRef}
          className="absolute inset-0 bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      )}
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const sharedClassName = `relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium ${base} ${className}`;

  // Si viene "to", es una ruta interna → usamos <Link> de React Router.
  // Si viene "href", es un link externo/ancla/archivo → usamos <a> normal.
  if (to) {
    return (
      <Link
        ref={rootRef}
        to={to}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={sharedClassName}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      ref={rootRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={sharedClassName}
      {...props}
    >
      {content}
    </a>
  );
}

export default AnimatedButton;

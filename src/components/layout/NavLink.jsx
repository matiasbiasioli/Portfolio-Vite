import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function NavLink({ href, children, onClick, className = "" }) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  function handleEnter() {
    gsap.to(topRef.current, { yPercent: -100, duration: 0.35, ease: "power2.out" });
    gsap.to(bottomRef.current, { yPercent: -100, duration: 0.35, ease: "power2.out" });
  }
  function handleLeave() {
    gsap.to(topRef.current, { yPercent: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(bottomRef.current, { yPercent: 100, duration: 0.35, ease: "power2.out" });
  }

  return (
    <Link
      to={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden inline-block h-[1.2em] leading-[1.2em] ${className}`}
    >
      <span ref={topRef} className="block text-text-muted">
        {children}
      </span>
      <span
        ref={bottomRef}
        className="block text-accent absolute top-0 left-0"
        style={{ transform: "translateY(100%)" }}
      >
        {children}
      </span>
    </Link>
  );
}

export default NavLink;
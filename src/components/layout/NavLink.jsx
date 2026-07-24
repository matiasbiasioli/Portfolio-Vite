import { useRef } from 'react'
import gsap from 'gsap'

function NavLink({ href, children, onClick, className = '' }) {
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  function handleEnter() {
    gsap.to(topRef.current, { yPercent: -100, duration: 0.35, ease: 'power2.out' })
    gsap.to(bottomRef.current, { yPercent: -100, duration: 0.35, ease: 'power2.out' })
  }
  function handleLeave() {
    gsap.to(topRef.current, { yPercent: 0, duration: 0.35, ease: 'power2.out' })
    gsap.to(bottomRef.current, { yPercent: 100, duration: 0.35, ease: 'power2.out' })
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      // className recibido por prop, para poder darle otro estilo cuando se usa dentro del menú mobile
      className={`relative overflow-hidden inline-block h-[1.2em] leading-[1.2em] ${className}`}
    >
      {/* Texto normal, visible por defecto */}
      <span ref={topRef} className="block text-text-muted">
        {children}
      </span>
      {/* Copia en color de acento, oculta abajo, que "sube" al hacer hover */}
      <span
        ref={bottomRef}
        className="block text-accent absolute top-0 left-0"
        style={{ transform: 'translateY(100%)' }}
      >
        {children}
      </span>
    </a>
  )
}

export default NavLink
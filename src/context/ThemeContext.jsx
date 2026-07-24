import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  function toggleTheme(originEvent) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    if (originEvent?.currentTarget) {
      const rect = originEvent.currentTarget.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    // Si el navegador no soporta la API (ej. Firefox viejo), cambiamos sin animar
    if (!document.startViewTransition) {
      document.documentElement.setAttribute('data-theme', nextTheme)
      setTheme(nextTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', nextTheme)
      setTheme(nextTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
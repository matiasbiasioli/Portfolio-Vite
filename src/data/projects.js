// Cada proyecto tiene toda la info que van a necesitar el carrusel Y la página de detalle futura.
// "featured: true" = aparece en el carrusel de destacados de la Home.
export const projects = [
  {
    id: "proyecto-uno",
    title: "PulseTrack",
    category: "mobile",
    description: {
      es: "App de monitoreo de actividad física con visualizaciones en tiempo real.",
      en: "Activity-tracking app with real-time visualizations.",
    },
    image: "/projects/proyecto-uno.jpg",
    gallery: ["/projects/proyecto-uno-1.jpg", "/projects/proyecto-uno-2.jpg"], // capturas para la página de detalle
    stack: ["React Native", "Expo"],
    tools: ["Git", "Figma", "Vercel"], // herramientas usadas, separado del stack de tecnologías
    liveUrl: "",
    repoUrl: "",
    featured: true,
  },
  {
    id: "proyecto-dos",
    title: "Órbita CMS",
    category: "web",
    description: {
      es: "Sistema de gestión de contenido headless con editor visual.",
      en: "Headless CMS with a visual drag-and-drop editor.",
    },
    image: "/projects/proyecto-dos.jpg",
    gallery: ["/projects/proyecto-uno-1.jpg", "/projects/proyecto-uno-2.jpg"], // capturas para la página de detalle
    stack: ["React", "Node.js"],
    tools: ["Git", "Figma", "Vercel"], // herramientas usadas, separado del stack de tecnologías
    liveUrl: "",
    repoUrl: "",
    featured: true,
  },
  {
    id: "proyecto-tres",
    title: "Wavelength",
    category: "web",
    description: {
      es: "Visualizador de audio en tiempo real con efectos generativos.",
      en: "Real-time audio visualizer with generative effects.",
    },
    image: "/projects/proyecto-tres.jpg",
    gallery: ["/projects/proyecto-uno-1.jpg", "/projects/proyecto-uno-2.jpg"], // capturas para la página de detalle
    stack: ["React", "WebAudio"],
    tools: ["Git", "Figma", "Vercel"], // herramientas usadas, separado del stack de tecnologías
    liveUrl: "",
    repoUrl: "",
    featured: true,
  },
  {
    id: "proyecto-cuatro",
    title: "Vaulto",
    category: "wordpress",
    description: {
      es: "Wallet de activos digitales con autenticación biométrica.",
      en: "Digital asset wallet with biometric authentication.",
    },
    image: "/projects/proyecto-cuatro.jpg",
    gallery: ["/projects/proyecto-cuatro-1.jpg"],
    stack: ["React Native", "Firebase"],
    tools: ["Figma", "Git"],
    liveUrl: "",
    repoUrl: "",
    featured: false,
  },
  {
    id: "proyecto-cinco",
    title: "Órbita CMS",
    category: "fullstack",
    description: {
      es: "Panel de administración con editor visual drag-and-drop.",
      en: "Admin dashboard with a visual drag-and-drop editor.",
    },
    image: "/projects/proyecto-cinco.jpg",
    gallery: ["/projects/proyecto-cinco-1.jpg"],
    stack: ["React", "GraphQL"],
    tools: ["Docker", "Vercel"],
    liveUrl: "",
    repoUrl: "",
    featured: false,
  },
];
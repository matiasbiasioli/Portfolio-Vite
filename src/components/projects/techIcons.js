import {
  SiReact,
  SiNodedotjs,
  SiExpo,
  SiPhp,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiFigma,
  SiVercel,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiDocker,
  SiVite,
  SiMysql,
  SiNextdotjs,
  SiCloudinary
} from "react-icons/si";
import { Code2 } from "lucide-react";

// Relaciona el nombre de la tecnología con su ícono de marca.
// Si una tecnología no está mapeada, se usa "Code2" como ícono genérico de respaldo.
const TECH_ICON_MAP = {
  "React": SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  "Expo": SiExpo,
  "Tailwind": SiTailwindcss,
  "JavaScript": SiJavascript,
  "Php": SiPhp,
  "HTML": SiHtml5,
  "CSS": SiCss,
  "Git": SiGit,
  "MySql": SiMysql,
  "Figma": SiFigma,
  "Vercel": SiVercel,
  "Next Js": SiNextdotjs,
  "Express": SiExpress,
  "PostgreSQL": SiPostgresql,
  "Firebase": SiFirebase,
  "Docker": SiDocker,
  "Vite": SiVite,
  "Cloudinary": SiCloudinary
};

// Colores de marca reales, para pintar cada ícono con su color original en vez del azul de acento.
// Los que son "blanco y negro" en la vida real (Vercel, Express) quedan en blanco para que se vean bien sobre el fondo oscuro.
const TECH_COLOR_MAP = {
  "React": "#61DAFB",
  "React Native": "#61DAFB",
  "Node.js": "#339933",
  "Expo": "#ffffff",
  "Tailwind": "#38BDF8",
  "JavaScript": "#F7DF1E",
  "HTML": "#E34F26",
  "CSS": "#1572B6",
  "Git": "#F05032",
  "Figma": "#F24E1E",
  "Vercel": "#ffffff",
  "Express": "#ffffff",
  "PostgreSQL": "#4169E1",
  "Firebase": "#FFCA28",
  "Docker": "#2496ED",
  "Vite": "#646CFF",
};

export function getTechIcon(name) {
  return TECH_ICON_MAP[name] || Code2;
}

// Si no hay color de marca definido, devuelve null y quien lo use cae al color de acento por defecto.
export function getTechColor(name) {
  return TECH_COLOR_MAP[name] || null;
}
import {
  SiReact,
  SiNodedotjs,
  SiExpo,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiGit,
  SiFigma,
  SiVercel,
  SiGraphql,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiDocker,
  SiVite,
} from "react-icons/si";
import { Code2 } from "lucide-react";

// Relaciona el nombre de la tecnología (tal como la escribís en projects.js) con su ícono de marca.
// Si una tecnología no está en este mapa (como "CSS", que sacamos por un error de nombre), se usa
// "Code2" como ícono genérico de respaldo — no rompe nada, solo no muestra el logo de marca.
const TECH_ICON_MAP = {
  "React": SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  "Expo": SiExpo,
  "Tailwind": SiTailwindcss,
  "JavaScript": SiJavascript,
  "HTML": SiHtml5,
  "Git": SiGit,
  "Figma": SiFigma,
  "Vercel": SiVercel,
  "GraphQL": SiGraphql,
  "Express": SiExpress,
  "PostgreSQL": SiPostgresql,
  "Firebase": SiFirebase,
  "Docker": SiDocker,
  "Vite": SiVite,
};

export function getTechIcon(name) {
  return TECH_ICON_MAP[name] || Code2;
}
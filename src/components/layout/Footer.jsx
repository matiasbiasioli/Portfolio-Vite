import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext.jsx";

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear(); // se actualiza solo cada año, sin tener que tocar código

  return (
    <footer className="px-6 md:px-16 py-12 md:py-16 border-t border-border mt-12">
      <div className="max-w-6xl mx-auto">
        {/* CTA grande invitando a escribir, con el mismo espíritu tipográfico del Hero */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-text">
            {t.footer.cta}
          </h2>
          <p className="text-text-muted max-w-sm">{t.footer.ctaSubtitle}</p>
          <a
            href="mailto:tu@email.com"
            className="mt-4 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-semibold"
          >
            tu@email.com
          </a>
        </div>

        {/* Fila inferior: marca + redes + copyright — apilada en mobile, en una fila desde md */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <span className="font-bold text-text">MUSO.DEV</span>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5490000000000"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text hover:text-accent hover:border-accent"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="https://linkedin.com/in/tu-usuario"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text hover:text-accent hover:border-accent"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text hover:text-accent hover:border-accent"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
          </div>

          <p className="text-text-muted text-xs text-center md:text-right">
            © {year} Muso. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

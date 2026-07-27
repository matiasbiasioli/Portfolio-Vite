import { useState, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".contact-animate", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  // Estado del formulario: un objeto con los 4 campos, todos controlados por React
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    message: "",
  });

  // Estado del envío: controla qué mensaje mostrar y si el botón se deshabilita mientras envía
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  // Actualiza el campo correspondiente según el "name" del input que disparó el cambio
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      // Reemplazá "xxxxxxxx" por el código real que te dio Formspree
      const response = await fetch("https://formspree.io/f/xyzdjrwn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // le pide a Formspree que responda en JSON en vez de redirigir a otra página
        },
        body: JSON.stringify({
          ...formData,
          // Formspree reconoce esta clave especial y la usa como asunto del correo
          _subject: `Consulta en web de ${formData.name} — Portfolio (${formData.inquiryType})`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          inquiryType: "general",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-6 md:px-16 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-accent text-sm tracking-widest uppercase">
          [ 004 ] {t.contact.title}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-text mt-4 mb-2">
          {t.contact.title}
        </h2>
        <p className="text-text-muted mb-10 max-w-md">{t.contact.subtitle}</p>

        {/* Mobile-first: una columna apilada; desde md, info a la izquierda y form a la derecha */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* ---- Las tres líneas de contacto con ícono ---- */}
          <div className="contact-animate flex flex-col gap-5">
            <div className="flex items-center gap-4 text-text">
              <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-text-muted text-xs">
                  {t.contact.phoneLabel}
                </p>
                {/* Reemplazá el número por el tuyo real */}
                <a href="tel:+5490000000000" className="font-medium">
                  +54 9 00 0000-0000
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-text">
              <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-text-muted text-xs">
                  {t.contact.emailLabel}
                </p>
                {/* Reemplazá el correo por el tuyo real */}
                <a href="mailto:tu@email.com" className="font-medium">
                  tu@email.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-text">
              <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-text-muted text-xs">
                  {t.contact.locationLabel}
                </p>
                <p className="font-medium">{t.contact.location}</p>
              </div>
            </div>
          </div>

          {/* ---- Formulario ---- */}
          <form
            onSubmit={handleSubmit}
            className="contact-animate flex flex-col gap-4"
          >
            <div>
              <label className="text-text-muted text-xs mb-1 block">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-text-muted text-xs mb-1 block">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-text-muted text-xs mb-1 block">
                {t.contact.form.inquiryType}
              </label>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-accent"
              >
                <option value="job">{t.contact.form.inquiryOptions.job}</option>
                <option value="freelance">
                  {t.contact.form.inquiryOptions.freelance}
                </option>
                <option value="collab">
                  {t.contact.form.inquiryOptions.collab}
                </option>
                <option value="general">
                  {t.contact.form.inquiryOptions.general}
                </option>
              </select>
            </div>

            <div>
              <label className="text-text-muted text-xs mb-1 block">
                {t.contact.form.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-accent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-semibold mt-2 disabled:opacity-50"
            >
              {status === "sending" ? "..." : t.contact.form.submit}
            </button>

            {status === "success" && (
              <p className="text-accent text-sm">{t.contact.form.success}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{t.contact.form.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

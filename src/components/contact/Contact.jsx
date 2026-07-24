import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

function Contact() {
  const { t } = useLanguage();

  // Estado del formulario: un objeto con los 4 campos, todos controlados por React
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    message: "",
  });

  // Actualiza el campo correspondiente según el "name" del input que disparó el cambio
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder: acá más adelante conectamos con el script PHP que envía el correo.
    // Por ahora solo lo mostramos en consola para confirmar que el formulario captura bien los datos.
    console.log("Formulario de contacto:", formData);
  }

  return (
    <section id="contact" className="px-6 md:px-16 py-16 md:py-24">
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
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 text-text">
              <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-accent shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-text-muted text-xs">{t.contact.phoneLabel}</p>
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
                <p className="text-text-muted text-xs">{t.contact.emailLabel}</p>
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
                <p className="text-text-muted text-xs">{t.contact.locationLabel}</p>
                <p className="font-medium">{t.contact.location}</p>
              </div>
            </div>
          </div>

          {/* ---- Formulario ---- */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-semibold mt-2"
            >
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
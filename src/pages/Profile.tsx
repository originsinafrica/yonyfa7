import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase, Mail } from "lucide-react";
import { PROFILE_PHOTOS, getProfileById } from "@/assets/profiles";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const profile = id ? getProfileById(id) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="text-center">
          <p className="font-headline text-xl mb-4">Profil introuvable</p>
          <Link to="/" className="underline" style={{ color: "#00693e" }}>
            Retour au mur
          </Link>
        </div>
      </div>
    );
  }

  const photo = PROFILE_PHOTOS[profile.photoIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Yonyfa] Message de ${name || "un visiteur"}`,
    );
    const body = encodeURIComponent(
      `Bonjour ${profile.firstName},\n\n${message}\n\n— ${name}\n${email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen" style={{ background: "#f7f1e6" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: "#5a5c5c" }}
        >
          <ArrowLeft size={16} />
          <span className="font-label uppercase tracking-[0.15em] text-xs">
            Retour au mur
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", boxShadow: "0 30px 80px rgba(45,47,47,0.15)" }}
        >
          {/* Hero */}
          <div className="grid md:grid-cols-[260px_1fr]">
            <div
              className="aspect-square md:aspect-auto md:h-full"
              style={{ background: "#ececec" }}
            >
              <img
                src={photo}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
            <div className="p-6 md:p-7">
              <p
                className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                style={{ color: "#00693e" }}
              >
                {profile.archetype}
              </p>
              <h1
                className="font-headline text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: "#2d2f2f" }}
              >
                {profile.firstName} {profile.lastName}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "#5a5c5c" }}
              >
                {profile.age} ans
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm" style={{ color: "#2d2f2f" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={14} style={{ color: "#00693e" }} />
                  {profile.activity}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} style={{ color: "#e8112d" }} />
                  {profile.location}
                </span>
              </div>

              <blockquote
                className="font-headline italic text-sm md:text-base leading-relaxed pl-3 mt-5"
                style={{ borderLeft: "3px solid #fbd115", color: "rgba(45,47,47,0.85)" }}
              >
                "{profile.wisdom}"
              </blockquote>
            </div>
          </div>

          <div className="p-6 md:p-7 space-y-6" style={{ borderTop: "1px solid #ececec" }}>
            {/* Bio */}
            <section>
              <h2
                className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                style={{ color: "#5a5c5c" }}
              >
                Bio
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#2d2f2f" }}>
                {profile.bio}
              </p>
            </section>

            {/* Produits / services */}
            <section>
              <h2
                className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                style={{ color: "#00693e" }}
              >
                Produits & services
              </h2>
              <ul className="space-y-1.5">
                {profile.products.map((p) => (
                  <li
                    key={p}
                    className="text-sm pl-4 relative"
                    style={{ color: "#2d2f2f" }}
                  >
                    <span
                      className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#008751" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* Besoins / projets */}
            <section>
              <h2
                className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
                style={{ color: "#e8112d" }}
              >
                Besoins & projets
              </h2>
              <ul className="space-y-1.5">
                {profile.projects.map((p) => (
                  <li
                    key={p}
                    className="text-sm pl-4 relative"
                    style={{ color: "#2d2f2f" }}
                  >
                    <span
                      className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#e8112d" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* Formulaire de contact */}
            <section>
              <h2
                className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-2"
                style={{ color: "#5a5c5c" }}
              >
                <Mail size={12} />
                Contacter {profile.firstName}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md text-sm outline-none focus:ring-2 transition"
                  style={{ background: "#f7f1e6", border: "1px solid #ececec", color: "#2d2f2f" }}
                />
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md text-sm outline-none focus:ring-2 transition"
                  style={{ background: "#f7f1e6", border: "1px solid #ececec", color: "#2d2f2f" }}
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Votre message…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md text-sm outline-none focus:ring-2 transition resize-none"
                  style={{ background: "#f7f1e6", border: "1px solid #ececec", color: "#2d2f2f" }}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: "#00693e",
                    boxShadow: "0 8px 20px rgba(0,105,62,0.25)",
                  }}
                >
                  Envoyer le message
                </button>
                <p className="text-[11px] italic text-center" style={{ color: "#5a5c5c" }}>
                  Ouvre votre client mail vers {profile.email}
                </p>
              </form>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

import { motion } from "framer-motion";

/**
 * Présentation synthétique du Fâ — affichée dès qu'un signe est révélé.
 * Source : "Introduction à une poétique du Fa" (Mahougnon Kakpo) et corpus
 * traditionnel Fon/Yoruba.
 */
const FaPrimer = () => (
  <motion.aside
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="rounded-lg p-4 mb-5"
    style={{
      background: "rgba(0, 105, 62, 0.04)",
      border: "1px solid rgba(0, 105, 62, 0.15)",
      borderLeft: "3px solid #00693e",
    }}
  >
    <p
      className="font-label text-[9px] font-bold uppercase tracking-[0.3em] mb-2"
      style={{ color: "#00693e" }}
    >
      L'essentiel du Fâ
    </p>
    <p
      className="text-[12.5px] leading-relaxed"
      style={{ color: "rgba(45, 47, 47, 0.88)" }}
    >
      Le <strong>Fâ</strong> (ou <em>Ifá</em>) est la géomancie sacrée née dans
      l'aire culturelle Fon-Yoruba du Bénin et du Nigéria, héritée de l'antique
      civilisation béninoise. Il s'organise autour de <strong>256 signes</strong>
      {" "}(ou <em>du</em>) issus de la combinaison de <strong>16 signes mères</strong>,
      chacun traversé par quatre voies de révélation : le <em>nom</em>, la{" "}
      <em>devise</em>, la <em>légende initiatique</em> et le <em>chant</em>. Plus
      qu'une divination, le Fâ est une <strong>poésie totale</strong> qui relie
      le temps des origines au temps présent : à travers ses mythes et ses
      proverbes, il offre à celui qui consulte des modèles de pensée et de
      conduite pour habiter dignement un monde désaccordé. Le <em>bokônon</em>{" "}
      — gardien de cette parole — n'impose rien : il met en lumière la dynamique
      à l'œuvre et invite chacun à reconnaître, dans le signe tiré, ce qui en
      lui cherche déjà à s'accorder.
    </p>
  </motion.aside>
);

export default FaPrimer;

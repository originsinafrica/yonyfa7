import { motion } from "framer-motion";

interface Props {
  /** valeur 0-100 */
  value: number;
  /** nombre total de segments (par défaut 12) */
  segments?: number;
  /** label affiché à gauche */
  label: string;
  /** nb d'avis */
  count?: number;
}

/**
 * Barre segmentée 3 zones (vert / jaune / rouge) sans curseur.
 * Les segments allumés vont de gauche à droite, leur couleur dépend de leur
 * position : 1ᵉʳ tiers vert, 2ᵉ tiers jaune, 3ᵉ tiers rouge.
 * Sert à représenter une moyenne d'évaluation reçue par un bokônon.
 */
const SegmentedTrack = ({ value, segments = 12, label, count }: Props) => {
  const filled = Math.max(0, Math.min(segments, Math.round((value / 100) * segments)));

  const colorFor = (i: number) => {
    const ratio = i / segments;
    if (ratio < 1 / 3) return "#008751"; // vert Bénin
    if (ratio < 2 / 3) return "#fcd116"; // jaune Bénin
    return "#e8112d"; // rouge Bénin
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="font-headline text-sm font-medium"
          style={{ color: "#2d2f2f" }}
        >
          {label}
        </span>
        <span
          className="font-headline text-sm font-bold tabular-nums"
          style={{ color: "#2d2f2f" }}
        >
          {value}
          <span
            className="text-[10px] font-normal ml-1"
            style={{ color: "#5a5c5c" }}
          >
            /100
          </span>
        </span>
      </div>
      <div
        className="flex gap-[3px] p-[3px] rounded-md"
        style={{ background: "#f0f1f1" }}
        role="img"
        aria-label={`${label}: ${value} sur 100${count ? `, ${count} avis` : ""}`}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const isOn = i < filled;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0.2, scaleY: 0.6 }}
              animate={{ opacity: isOn ? 1 : 0.18, scaleY: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
              className="flex-1 rounded-[2px]"
              style={{
                height: 14,
                background: isOn ? colorFor(i) : "#cfd1d1",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SegmentedTrack;

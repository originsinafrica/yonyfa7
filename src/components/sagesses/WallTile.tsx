import { memo } from "react";
import { motion } from "framer-motion";
import { PROFILE_PHOTOS } from "@/assets/profiles";
import type { Consultation } from "@/data/consultations";

interface Props {
  consultation: Consultation;
  index: number;
  isSelected?: boolean;
  onClick: (c: Consultation) => void;
}

const BENIN_ACCENTS = [
  "hsl(var(--benin-green))",
  "hsl(var(--benin-yellow))",
  "hsl(var(--benin-red))",
];

/**
 * Variety of background tones to make the wall feel like a diverse community
 * portrait gallery — mixing deep night, warm earth, ochre clay, raw terra-cotta,
 * Benin green & a few neutrals so each profile stands out individually.
 */
const TILE_BACKGROUNDS = [
  "#0d0d0d", // noir profond
  "#f7f1e6", // beige clair
  "#3a2a1c", // terre brûlée
  "#c97b3a", // ocre
  "#1a3a2a", // vert sombre
  "#e8d5b7", // sable
  "#7a1f1a", // bordeaux
  "#2d2f2f", // gris anthracite
  "#d4a574", // miel
  "#0a2540", // bleu nuit
  "#a8501f", // brique
  "#f0e6d2", // ivoire
];

const WallTile = memo(({ consultation, index, isSelected, onClick }: Props) => {
  const photo = PROFILE_PHOTOS[consultation.videoSeed % PROFILE_PHOTOS.length];
  const accent = BENIN_ACCENTS[index % BENIN_ACCENTS.length];
  // Stable background per consultation (not per slot) so swaps don't reshuffle colors
  const tileBg =
    TILE_BACKGROUNDS[consultation.videoSeed % TILE_BACKGROUNDS.length];

  // Subtle organic floating per tile
  const driftDelay = (index % 7) * 0.35;
  const driftDuration = 7 + (index % 5);

  // Tiny "breath" on photos to simulate liveness
  const breathDelay = (index % 9) * 0.4;
  const breathDuration = 5 + (index % 4);

  return (
    <motion.button
      layout
      onClick={() => onClick(consultation)}
      className="relative aspect-square overflow-hidden rounded-[4px] cursor-pointer group bg-muted select-none"
      animate={{
        y: [0, -1.5, 0, 1.5, 0],
        opacity: [0.92, 1, 0.92],
      }}
      transition={{
        duration: driftDuration,
        delay: driftDelay,
        repeat: Infinity,
        ease: "easeInOut",
        layout: { type: "spring", stiffness: 110, damping: 18 },
      }}
      whileHover={{ scale: 1.35, zIndex: 20, opacity: 1 }}
      style={{
        boxShadow: isSelected
          ? "inset 0 0 0 3px #00693e"
          : "inset 0 0 0 1px hsl(var(--border))",
        background: tileBg,
      }}
      aria-label={`Consultation de ${consultation.author}`}
    >
      {/* Profile photo with gentle breathing zoom for "liveness" */}
      <motion.img
        src={photo}
        alt=""
        loading="lazy"
        width={512}
        height={512}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          // Slight blend so the diverse backgrounds peek through edges/portraits
          mixBlendMode: "normal",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{
          duration: breathDuration,
          delay: breathDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Green wash on selected tiles */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,135,81,0.55) 0%, rgba(0,105,62,0.65) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Hover: thin Benin accent ring */}
      {!isSelected && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[4px]"
          style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
        />
      )}

      {/* Hover overlay: prénom + âge — révèle l'identité du profil */}
      <div
        className="absolute inset-x-0 bottom-0 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p
          className="text-white text-[9px] leading-tight font-headline italic truncate"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          {consultation.author}
          {!consultation.isAnonymous && consultation.age
            ? ` · ${consultation.age}`
            : ""}
        </p>
      </div>
    </motion.button>
  );
});

WallTile.displayName = "WallTile";
export default WallTile;

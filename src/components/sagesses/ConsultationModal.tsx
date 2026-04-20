import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CombinedTrace from "./CombinedTrace";
import SegmentedTrack from "./SegmentedTrack";
import { PROFILE_PHOTOS, PROFILES } from "@/assets/profiles";
import { type Consultation } from "@/data/consultations";

interface Props {
  consultation: Consultation | null;
  onClose: () => void;
}

type View = "case" | "bokonon";

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 350;

const ConsultationModal = ({ consultation, onClose }: Props) => {
  const [view, setView] = useState<View>("case");
  const [relevance, setRelevance] = useState([50]);
  const [clarity, setClarity] = useState([50]);
  const [depth, setDepth] = useState([50]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRelevance([50]);
      setClarity([50]);
      setDepth([50]);
      onClose();
      setView("case");
    }, 1800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView("case");
      setSubmitted(false);
      setRelevance([50]);
      setClarity([50]);
      setDepth([50]);
    }, 300);
  };

  const bokononPhoto = consultation
    ? PROFILE_PHOTOS[consultation.videoSeed % PROFILE_PHOTOS.length]
    : null;
  const casePhoto = consultation?.lifeCase.image ?? null;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -SWIPE_THRESHOLD || velocity < -SWIPE_VELOCITY) {
      setView("bokonon");
    } else if (offset > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
      setView("case");
    }
  };

  return (
    <AnimatePresence>
      {consultation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          style={{ background: "rgba(45, 47, 47, 0.55)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl flex flex-col"
            style={{
              background: "#ffffff",
              boxShadow: "0 30px 80px rgba(45, 47, 47, 0.25)",
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-5 pt-4 pb-3"
              style={{ borderBottom: "1px solid #ececec", background: "#ffffff" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#008751" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#fcd116" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e8112d" }} />
                <span
                  className="ml-3 font-label text-[10px] uppercase tracking-[0.2em] font-bold"
                  style={{ color: "#5a5c5c" }}
                >
                  {view === "case" ? "Le cas tiré" : "La parole du bokônon"}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full transition-colors hover:bg-[#f0f1f1]"
                style={{ color: "#5a5c5c" }}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Swipe indicator */}
            <div
              className="flex items-center justify-center gap-2 py-2"
              style={{ background: "#fafafa" }}
            >
              <button
                onClick={() => setView("case")}
                className="p-1 rounded-full transition-colors hover:bg-[#ececec]"
                aria-label="Vue précédente"
                disabled={view === "case"}
                style={{ opacity: view === "case" ? 0.3 : 1, color: "#5a5c5c" }}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full transition-all"
                  style={{
                    background: view === "case" ? "#00693e" : "#cfd1d1",
                    width: view === "case" ? 16 : 6,
                    height: 6,
                  }}
                />
                <span
                  className="rounded-full transition-all"
                  style={{
                    background: view === "bokonon" ? "#00693e" : "#cfd1d1",
                    width: view === "bokonon" ? 16 : 6,
                    height: 6,
                  }}
                />
              </div>
              <button
                onClick={() => setView("bokonon")}
                className="p-1 rounded-full transition-colors hover:bg-[#ececec]"
                aria-label="Vue suivante"
                disabled={view === "bokonon"}
                style={{ opacity: view === "bokonon" ? 0.3 : 1, color: "#5a5c5c" }}
              >
                <ChevronRight size={16} />
              </button>
              <span
                className="ml-2 font-label text-[9px] uppercase tracking-[0.2em] hidden sm:inline"
                style={{ color: "#5a5c5c" }}
              >
                Swipe
              </span>
            </div>

            {/* Swipeable content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: view === "bokonon" ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: view === "bokonon" ? -80 : 80 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  className="touch-pan-y cursor-grab active:cursor-grabbing"
                >
                  {view === "case" ? (
                    <CaseView photo={casePhoto} consultation={consultation} />
                  ) : (
                    <BokononView
                      photo={bokononPhoto}
                      consultation={consultation}
                      submitted={submitted}
                      onSubmit={handleSubmit}
                      relevance={relevance}
                      setRelevance={setRelevance}
                      clarity={clarity}
                      setClarity={setClarity}
                      depth={depth}
                      setDepth={setDepth}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* --- Photo panel reused on both views --- */
const PhotoPanel = ({
  photo,
  caption,
  ariaLabel,
  animate = false,
}: {
  photo: string | null;
  caption: string;
  ariaLabel: string;
  animate?: boolean;
}) => (
  <div
    className="p-5 md:p-7 flex items-center justify-center"
    style={{ background: "#f7f1e6" }}
  >
    <div
      className="relative aspect-[4/5] w-full rounded-xl overflow-hidden select-none"
      style={{ background: "#ececec" }}
    >
      {photo &&
        (animate ? (
          <motion.img
            src={photo}
            alt={caption}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            initial={{ scale: 1.05 }}
            animate={{ scale: [1.05, 1.08, 1.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <img
            src={photo}
            alt={caption}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
        ))}
      <div
        className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.45)" }}
      >
        <span className="font-headline italic text-[12px] text-white">{caption}</span>
      </div>
      <button
        type="button"
        aria-label={ariaLabel}
        className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      >
        <Play size={16} fill="currentColor" className="ml-0.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center gap-1 pb-3 px-6 z-10 pointer-events-none">
        {[3, 6, 8, 4, 7, 5, 9, 4].map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full"
            style={{
              background: "#D4AF37",
              height: `${h * 3}px`,
              opacity: 0.75,
              animation: `waveform ${0.8 + (i % 4) * 0.15}s ease-in-out ${i * 0.1}s infinite`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* --- View 1: Le cas tiré --- */
const CaseView = ({
  photo,
  consultation,
}: {
  photo: string | null;
  consultation: Consultation;
}) => (
  <div className="grid md:grid-cols-2 gap-0">
    <PhotoPanel
      photo={photo}
      caption={consultation.lifeCase.persona}
      ariaLabel="Écouter le cas"
    />

    <div className="p-5 md:p-7 flex flex-col" style={{ background: "#ffffff" }}>
      <span
        className="font-label text-[10px] uppercase tracking-[0.2em] font-bold"
        style={{ color: "#5a5c5c" }}
      >
        {consultation.lifeCase.label}
      </span>
      <h3
        className="font-headline text-2xl md:text-3xl leading-tight mt-2 mb-3"
        style={{ color: "#00693e" }}
      >
        {consultation.lifeCase.title}
      </h3>
      <blockquote
        className="italic text-sm leading-relaxed pl-3 mb-5"
        style={{ borderLeft: "3px solid #fbd115", color: "rgba(45, 47, 47, 0.85)" }}
      >
        "{consultation.lifeCase.quote}"
      </blockquote>

      <div
        className="flex items-center gap-3 mb-3 pt-4"
        style={{ borderTop: "1px solid #ececec" }}
      >
        <div
          className="rounded-md flex items-center justify-center p-1.5"
          style={{ background: "#f0f1f1" }}
        >
          <CombinedTrace
            leftCode={consultation.signY.code}
            rightCode={consultation.signX.code}
            size={48}
            color="#00693e"
          />
        </div>
        <div>
          <p
            className="font-label text-[10px] uppercase tracking-[0.2em] font-bold"
            style={{ color: "#5a5c5c" }}
          >
            Signe révélé
          </p>
          <p className="font-display text-xl" style={{ color: "#00693e" }}>
            {consultation.signY.name} · {consultation.signX.name}
          </p>
        </div>
      </div>

      <div className="rounded-lg p-3 mt-2" style={{ background: "#f0f1f1" }}>
        <p
          className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
          style={{ color: "#6e5a00" }}
        >
          Résonances à explorer
        </p>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span style={{ color: "#00693e" }}>{consultation.signY.value}</span>
          <span style={{ color: "#fcd116" }}>×</span>
          <span style={{ color: "#fbd115" }}>{consultation.signX.value}</span>
          <span style={{ color: "#5a5c5c" }}>=</span>
          <span className="font-bold" style={{ color: "#e8112d" }}>
            {consultation.dynamicWord}
          </span>
        </div>
      </div>

      <p className="mt-5 text-[11px] italic text-center" style={{ color: "#5a5c5c" }}>
        Swipez pour découvrir le bokônon et évaluer sa parole →
      </p>
    </div>
  </div>
);

/* --- View 2: Le bokônon --- */
const BokononView = ({
  photo,
  consultation,
  submitted,
  onSubmit,
  relevance,
  setRelevance,
  clarity,
  setClarity,
  depth,
  setDepth,
}: {
  photo: string | null;
  consultation: Consultation;
  submitted: boolean;
  onSubmit: () => void;
  relevance: number[];
  setRelevance: (v: number[]) => void;
  clarity: number[];
  setClarity: (v: number[]) => void;
  depth: number[];
  setDepth: (v: number[]) => void;
}) => (
  <div className="grid md:grid-cols-2 gap-0">
    <PhotoPanel
      photo={photo}
      caption={consultation.author}
      ariaLabel="Écouter la parole"
      animate
    />

    <div className="p-5 md:p-7 flex flex-col" style={{ background: "#ffffff" }}>
      <p
        className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2"
        style={{ color: "#5a5c5c" }}
      >
        Sa parole
      </p>
      <blockquote
        className="font-headline italic text-base md:text-lg leading-relaxed pl-4 mb-5"
        style={{ borderLeft: "3px solid #fbd115", color: "rgba(45, 47, 47, 0.9)" }}
      >
        "{consultation.reflection}"
      </blockquote>

      {!submitted ? (
        <div className="space-y-4 pt-4" style={{ borderTop: "1px solid #ececec" }}>
          <p
            className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-center"
            style={{ color: "#5a5c5c" }}
          >
            Votre évaluation
          </p>

          {[
            {
              label: "Pertinence",
              question: "Cette réponse résonne-t-elle en vous ?",
              value: relevance,
              set: setRelevance,
              color: "#008751", // vert Bénin
            },
            {
              label: "Clarté",
              question: "Le conseil est-il adapté à la situation ?",
              value: clarity,
              set: setClarity,
              color: "#fcd116", // jaune Bénin
            },
            {
              label: "Profondeur",
              question: "Le message est-il clair et bien exprimé ?",
              value: depth,
              set: setDepth,
              color: "#e8112d", // rouge Bénin
            },
          ].map((c) => (
            <div key={c.label}>
              <div className="flex items-baseline justify-between mb-1.5 gap-2">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span
                    className="font-headline text-sm font-medium shrink-0"
                    style={{ color: "#2d2f2f" }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-[11px] italic truncate hidden sm:inline"
                    style={{ color: "#5a5c5c" }}
                  >
                    {c.question}
                  </span>
                </div>
                <span
                  className="font-headline text-base font-bold tabular-nums"
                  style={{ color: "#2d2f2f" }}
                >
                  {c.value[0]}
                </span>
              </div>
              <Slider
                value={c.value}
                onValueChange={c.set}
                max={100}
                step={1}
                trackColor={c.color}
              />
            </div>
          ))}

          <div className="pt-4">
            <button
              onClick={onSubmit}
              className="w-full py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: "#00693e",
                boxShadow: "0 8px 20px rgba(0, 105, 62, 0.25)",
              }}
            >
              Valider l'évaluation
            </button>
          </div>
        </div>
      ) : (
        <BokononCard
          photo={photo}
          consultation={consultation}
          relevance={relevance[0]}
          clarity={clarity[0]}
          depth={depth[0]}
        />
      )}
    </div>
  </div>
);

/* --- View 3 : fiche bokônon après évaluation --- */
const BokononCard = ({
  photo,
  consultation,
  relevance,
  clarity,
  depth,
}: {
  photo: string | null;
  consultation: Consultation;
  relevance: number;
  clarity: number;
  depth: number;
}) => {
  // Le profil "réel" attaché à la photo
  const profile = PROFILES[consultation.videoSeed % PROFILES.length];
  const reviewsCount = consultation.scores.count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-5"
      style={{ borderTop: "1px solid #ececec" }}
    >
      <p
        className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-center mb-4"
        style={{ color: "#00693e" }}
      >
        ✦ Fiche du bokônon
      </p>

      <div className="flex items-center gap-3 mb-5">
        {photo && (
          <img
            src={photo}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-14 h-14 rounded-full object-cover shrink-0"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            draggable={false}
          />
        )}
        <div className="min-w-0 flex-1">
          <p
            className="font-headline text-base font-bold truncate"
            style={{ color: "#2d2f2f" }}
          >
            {profile.firstName} {profile.lastName}
          </p>
          <p
            className="text-[11px] italic truncate"
            style={{ color: "#5a5c5c" }}
          >
            {profile.activity} · {profile.location}
          </p>
          <p
            className="font-label text-[10px] uppercase tracking-[0.15em] mt-0.5"
            style={{ color: "#00693e" }}
          >
            {reviewsCount} avis reçus
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <SegmentedTrack label="Pertinence" value={relevance} count={reviewsCount} />
        <SegmentedTrack label="Clarté" value={clarity} count={reviewsCount} />
        <SegmentedTrack label="Profondeur" value={depth} count={reviewsCount} />
      </div>

      <Link
        to={`/profil/${profile.id}`}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:scale-[1.01]"
        style={{
          background: "#00693e",
          boxShadow: "0 8px 20px rgba(0, 105, 62, 0.25)",
        }}
      >
        Voir le profil complet
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};


export default ConsultationModal;

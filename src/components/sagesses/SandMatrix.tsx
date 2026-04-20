import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SIGNS, shuffle, valueToMatrixIndex, type FongbeSign } from "@/data/fongbe";
import { DYNAMICS_MATRIX, DYNAMICS_AXIS } from "@/data/dynamics";
import { LIFE_CASES, type LifeCase } from "@/data/cases";
import DotIdeogram from "./DotIdeogram";
import BeninFrame from "./BeninFrame";
import SignDisplay from "./SignDisplay";
import SwipeableCaseDeck from "./SwipeableCaseDeck";
import AudioRecorder from "./AudioRecorder";
import EthnicDots from "./EthnicDots";
import FaPrimer from "./FaPrimer";
import { useLivingOrder } from "@/hooks/useLivingOrder";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Phase = "case" | "matrix" | "revealed";

interface RevealedCell {
  row: number;
  col: number;
  signX: FongbeSign;
  signY: FongbeSign;
  dynamicWord: string;
  axisXWord: string;
  axisYWord: string;
}

const SandMatrix = () => {
  const [phase, setPhase] = useState<Phase>("case");
  const [lifeCase, setLifeCase] = useState<LifeCase | null>(null);
  const [intuitiveChoice, setIntuitiveChoice] = useState<number | null>(null);
  const [shuffledX, setShuffledX] = useState(() => shuffle(SIGNS));
  const [shuffledY, setShuffledY] = useState(() => shuffle(SIGNS));
  const [revealed, setRevealed] = useState<RevealedCell | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [wisdomPhrase, setWisdomPhrase] = useState("");
  const WISDOM_MAX = 100;

  const restart = useCallback(() => {
    setLifeCase(null);
    setIntuitiveChoice(null);
    setShuffledX(shuffle(SIGNS));
    setShuffledY(shuffle(SIGNS));
    setRevealed(null);
    setFinalChoice(null);
    setWisdomPhrase("");
    setPhase("case");
  }, []);

  const handlePickCase = useCallback(
    (picked: LifeCase, selectedOption: number | null) => {
      setLifeCase(picked);
      setIntuitiveChoice(selectedOption);
      setPhase("matrix");
    },
    [],
  );

  /** Triggered by the close button on the revealed card */
  const requestCloseRevealed = useCallback(() => {
    setConfirmCloseOpen(true);
  }, []);

  /** Confirmed: discard the reveal and go back to the swipeable case deck */
  const confirmCloseRevealed = useCallback(() => {
    setConfirmCloseOpen(false);
    setRevealed(null);
    setIntuitiveChoice(null);
    setFinalChoice(null);
    setWisdomPhrase("");
    setShuffledX(shuffle(SIGNS));
    setShuffledY(shuffle(SIGNS));
    setLifeCase(null);
    setPhase("case");
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const signX = shuffledX[col];
      const signY = shuffledY[row];
      const matrixRow = signY.valueIndex;
      const matrixCol = valueToMatrixIndex(signX.value);
      const dynamicWord = DYNAMICS_MATRIX[matrixRow]?.[matrixCol] ?? "";
      const axisXWord = DYNAMICS_AXIS[matrixCol] ?? "";
      const axisYWord = DYNAMICS_AXIS[matrixRow] ?? "";
      setRevealed({ row, col, signX, signY, dynamicWord, axisXWord, axisYWord });
      setPhase("revealed");
    },
    [shuffledX, shuffledY]
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {/* PHASE 1 — Case card */}
        {phase === "case" && (
          <motion.div
            key="case"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <SwipeableCaseDeck
              initialCaseId={lifeCase?.id}
              onPickCase={handlePickCase}
            />
          </motion.div>
        )}

        {/* PHASE 2 — Matrix */}
        {phase === "matrix" && lifeCase && (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-6" />
            <div className="text-center mb-5">
              <p className="font-label text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                La Matrice des Choix
              </p>
              <p className="font-headline italic text-sm text-muted-foreground mt-2">
                Touchez une case — un signe du Fâ se révèlera.
              </p>
            </div>
            <div className="overflow-x-auto">
              <BeninFrame
                className="mx-auto max-w-[640px] md:max-w-[820px] lg:max-w-[920px]"
                inset={12}
                thickness={6}
              >
                <LivingChoiceGrid onCellClick={handleCellClick} />
              </BeninFrame>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setPhase("case")}
                className="text-xs underline"
                style={{ color: "hsl(30, 8%, 45%)" }}
              >
                ← Revenir à la situation
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3 — Revealed sign (new editorial layout, "enregistrement-2" mockup) */}
        {phase === "revealed" && revealed && lifeCase && (
          <motion.div
            key={`revealed-${revealed.row}-${revealed.col}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative font-body rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(45, 47, 47, 0.10)",
              color: "#2d2f2f",
              border: "1px solid rgba(118, 119, 119, 0.08)",
            }}
          >
            {/* Close — orange accent, floating top-right */}
            <button
              onClick={requestCloseRevealed}
              aria-label="Fermer"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-30"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#e87a1d",
                border: "1px solid rgba(232, 122, 29, 0.25)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* LEFT — Case visual (top) + Rappel & Options (bottom) */}
              <div className="w-full md:w-1/2 flex flex-col">
                {/* TOP-LEFT: Case photo with audio overlay & persona badge */}
                <div className="relative w-full aspect-square bg-black overflow-hidden">
                  <img
                    alt={lifeCase.persona}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    src={lifeCase.image}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />

                  {/* Gradient overlay for readability */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />

                  {/* Persona badge (prénom + âge) */}
                  <div
                    className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg backdrop-blur-md z-20"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                  >
                    <p className="font-headline italic text-base text-white">
                      {lifeCase.persona}
                    </p>
                  </div>

                  {/* Listen-again button */}
                  <button
                    type="button"
                    aria-label="Réécouter le cas"
                    className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <span
                      className="block w-0 h-0 ml-1"
                      style={{
                        borderLeft: "10px solid currentColor",
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                      }}
                    />
                  </button>

                  {/* Golden waveform */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center gap-1 pb-3 px-6 z-10 pointer-events-none">
                    {[3, 6, 8, 4, 7, 5, 9, 4, 6, 3].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full"
                        style={{
                          background: "#D4AF37",
                          height: `${h * 3}px`,
                          opacity: 0.55,
                          animation: `waveform ${0.8 + (i % 4) * 0.15}s ease-in-out ${i * 0.1}s infinite`,
                          transformOrigin: "bottom",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* BOTTOM-LEFT: Transcription du cas + 4 options (intuition + définitif) */}
                <div
                  className="p-6 md:px-8 md:py-7 flex-1 flex flex-col"
                  style={{ background: "#fafafa" }}
                >
                  {/* Transcription directe du cas */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-base">{lifeCase.emoji}</span>
                      <span
                        className="font-label text-[9px] uppercase tracking-[0.2em] font-bold"
                        style={{ color: "#5a5c5c" }}
                      >
                        Transcription du cas
                      </span>
                      <span
                        className="font-headline italic text-xs"
                        style={{ color: "#a07d00" }}
                      >
                        — {lifeCase.label}
                      </span>
                    </div>
                    <blockquote
                      className="italic text-[13px] leading-relaxed pl-3"
                      style={{
                        borderLeft: "2px solid #fbd115",
                        color: "rgba(45, 47, 47, 0.85)",
                      }}
                    >
                      {lifeCase.narrative[0]}
                    </blockquote>
                  </div>

                  {/* Final choice — 4 options */}
                  <div>
                    <p
                      className="font-label text-[9px] font-bold uppercase tracking-[0.3em] mb-1"
                      style={{ color: "#00693e" }}
                    >
                      Ton choix définitif
                    </p>
                    <p
                      className="text-[11px] italic mb-3"
                      style={{ color: "#5a5c5c" }}
                    >
                      Le bokônon doit confirmer son choix avant de s'enregistrer.
                    </p>
                    <ul className="space-y-1.5">
                      {lifeCase.options.map((opt, i) => {
                        const isFinal = finalChoice === i;
                        const wasIntuition = intuitiveChoice === i;
                        return (
                          <li key={i}>
                            <button
                              onClick={() => setFinalChoice(i)}
                              className="w-full text-left p-2.5 rounded-lg text-[13px] transition-all flex gap-3 items-start relative"
                              style={{
                                background: isFinal
                                  ? "rgba(0, 105, 62, 0.06)"
                                  : "transparent",
                                border: isFinal
                                  ? "1px solid rgba(0, 105, 62, 0.2)"
                                  : "1px solid transparent",
                                color: isFinal
                                  ? "#2d2f2f"
                                  : "rgba(45, 47, 47, 0.75)",
                                fontWeight: isFinal ? 500 : 400,
                              }}
                            >
                              <span
                                className="font-bold shrink-0"
                                style={{
                                  color: wasIntuition ? "#a07d00" : "#00693e",
                                }}
                              >
                                {wasIntuition
                                  ? "Intuition"
                                  : `${String.fromCharCode(65 + i)}.`}
                              </span>
                              <span
                                className="flex-1 leading-snug"
                              >
                                {opt}
                              </span>
                              {isFinal && (
                                <span
                                  className="absolute right-2 top-1/2 -translate-y-1/2 font-label text-[8px] uppercase font-bold tracking-tighter px-1.5 py-0.5 rounded"
                                  style={{
                                    background: "#00693e",
                                    color: "#cbffda",
                                  }}
                                >
                                  Définitif
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT — Signe révélé + audio recorder + wisdom phrase */}
              <div className="w-full md:w-1/2 flex flex-col">
                {/* Signe révélé block */}
                <div
                  className="p-6 md:px-10 md:pt-10 md:pb-7"
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "1px solid rgba(118, 119, 119, 0.08)",
                  }}
                >
                  {/* Domain label + ethnic glyphs (vert/jaune/rouge) */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-label text-[10px] tracking-[0.2em] uppercase font-bold"
                      style={{ color: "#5a5c5c" }}
                    >
                      Signe révélé
                    </span>
                    <div className="mr-12">
                      <EthnicDots size={16} gap={8} />
                    </div>
                  </div>

                  {/* Unified header: ideogram + sign name */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-4 mb-5"
                  >
                    <div
                      className="shrink-0 flex items-center justify-center p-2 rounded"
                      style={{ background: "rgba(0, 105, 62, 0.06)" }}
                    >
                      <DotIdeogram
                        leftCode={revealed.signX.code}
                        rightCode={revealed.signY.code}
                        size={56}
                        color="#00693e"
                      />
                    </div>
                    <h3
                      className="font-headline text-3xl md:text-4xl tracking-tight"
                      style={{ color: "#00693e", fontWeight: 400 }}
                    >
                      {revealed.signX.name} {revealed.signY.name}
                    </h3>
                  </motion.div>

                  {/* L'essentiel du Fâ — primer */}
                  <FaPrimer />

                  {/* Description */}
                  <div
                    className="mb-5 pt-4"
                    style={{ borderTop: "1px solid rgba(118, 119, 119, 0.08)" }}
                  >
                    <SignDisplay
                      signXIdx={revealed.signX.index}
                      signYIdx={revealed.signY.index}
                      signXName={revealed.signX.name}
                      signYName={revealed.signY.name}
                      dynamicWord={revealed.dynamicWord}
                      compact
                    />
                  </div>

                  {/* Resonances */}
                  <div>
                    <p
                      className="font-label text-[9px] font-bold uppercase tracking-[0.3em] mb-2"
                      style={{ color: "#6e5a00" }}
                    >
                      Résonances à explorer
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base font-headline">
                      <span style={{ color: "#00693e" }}>{revealed.axisYWord}</span>
                      <span className="text-[10px]" style={{ color: "#fcd116" }}>✕</span>
                      <span style={{ color: "#5a5c5c" }}>{revealed.axisXWord}</span>
                      <span className="text-[10px]" style={{ color: "#e8112d" }}>=</span>
                      <span className="font-bold" style={{ color: "#2d2f2f" }}>
                        {revealed.dynamicWord}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audio recorder + wisdom phrase (below) + CTA */}
                <div className="p-6 md:px-10 md:pt-7 md:pb-10 flex-1 flex flex-col">
                  {/* Recording — disabled until a final choice is made */}
                  <div
                    className="mb-5 relative"
                    aria-disabled={finalChoice === null}
                  >
                    {finalChoice === null && (
                      <div
                        className="absolute inset-0 z-10 flex items-center justify-center rounded-xl backdrop-blur-[2px]"
                        style={{ background: "rgba(255,255,255,0.7)" }}
                      >
                        <p
                          className="font-headline italic text-sm text-center px-6 py-3 rounded-lg"
                          style={{
                            background: "rgba(232, 17, 45, 0.08)",
                            color: "#a02018",
                            border: "1px dashed rgba(232, 17, 45, 0.35)",
                          }}
                        >
                          Confirme d'abord ton choix définitif (à gauche) avant
                          de t'enregistrer.
                        </p>
                      </div>
                    )}
                    <AudioRecorder />
                  </div>

                  {/* Wisdom phrase textarea — UNDER the recorder */}
                  <div className="mb-5">
                    <div className="flex items-baseline justify-between mb-2">
                      <label
                        htmlFor="wisdom-phrase"
                        className="font-label text-[9px] font-bold uppercase tracking-[0.3em]"
                        style={{ color: "#00693e" }}
                      >
                        Ta phrase de sagesse
                      </label>
                      <span
                        className="font-mono tabular-nums text-[10px]"
                        style={{
                          color:
                            wisdomPhrase.length >= WISDOM_MAX
                              ? "#e8112d"
                              : "#5a5c5c",
                        }}
                      >
                        {wisdomPhrase.length} / {WISDOM_MAX}
                      </span>
                    </div>
                    <textarea
                      id="wisdom-phrase"
                      value={wisdomPhrase}
                      onChange={(e) =>
                        setWisdomPhrase(e.target.value.slice(0, WISDOM_MAX))
                      }
                      maxLength={WISDOM_MAX}
                      rows={3}
                      placeholder="Une phrase courte qui accompagne ton enregistrement…"
                      className="w-full p-3 rounded-lg text-sm font-headline italic resize-none transition-colors focus:outline-none"
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e0e1e1",
                        color: "#2d2f2f",
                        borderLeft: "3px solid #fbd115",
                      }}
                    />
                  </div>

                  {/* CTA — slightly lowered */}
                  <div className="flex justify-center md:justify-start mt-auto pt-4">
                    <button
                      onClick={restart}
                      className="w-full md:w-auto px-10 py-3.5 rounded-md font-bold text-[10px] uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "#00693e",
                        boxShadow: "0 12px 30px rgba(0, 105, 62, 0.25)",
                      }}
                    >
                      Transmettre ma sagesse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={confirmCloseOpen} onOpenChange={setConfirmCloseOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Fermer ce signe ?</AlertDialogTitle>
            <AlertDialogDescription>
              Tu vas revenir au défilement des cas de vie. Le signe révélé et
              ton choix seront perdus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Rester sur le signe</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCloseRevealed}>
              Revenir aux cas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
 * LivingChoiceGrid — 16×16 sand matrix that subtly shuffles cells
 * over time to feel "alive". Each cell keeps its (row, col) identity
 * so clicks always reveal the correct sign; only its visual position
 * drifts via framer-motion's `layout` animation.
 * ──────────────────────────────────────────────────────────────── */
const TOTAL_CELLS = 16 * 16;

// Living color palette — Benin tricolor + neutrals, used sparingly
const CELL_COLORS = [
  "#ececec",
  "#f4f4f4",
  "#ececec",
  "#f4f4f4",
  "rgba(0, 135, 81, 0.55)",   // Benin green
  "#ececec",
  "rgba(252, 209, 22, 0.65)", // Benin yellow
  "#f4f4f4",
  "#ececec",
  "rgba(232, 17, 45, 0.55)",  // Benin red
  "#f4f4f4",
  "#ececec",
];

const LivingChoiceGrid = ({
  onCellClick,
}: {
  onCellClick: (row: number, col: number) => void;
}) => {
  const cells = useMemo(
    () =>
      Array.from({ length: TOTAL_CELLS }, (_, i) => ({
        id: i,
        row: Math.floor(i / 16),
        col: i % 16,
      })),
    [],
  );
  const order = useLivingOrder(TOTAL_CELLS, 8, 1800);

  // Colour pulse — periodically rotate which cells get a coloured tint
  const [colorTick, setColorTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setColorTick((t) => t + 1), 1600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="grid gap-[2px] min-w-[360px] bg-white"
      style={{ gridTemplateColumns: `repeat(16, 1fr)` }}
    >
      {order.map((cellId, slot) => {
        const cell = cells[cellId];
        const slotRow = Math.floor(slot / 16);
        const slotCol = slot % 16;
        const colorIdx =
          (cell.id * 7 + colorTick * 13 + slot * 3) % CELL_COLORS.length;
        const bg = CELL_COLORS[colorIdx];
        return (
          <motion.button
            key={cell.id}
            layout
            onClick={() => onCellClick(cell.row, cell.col)}
            className="aspect-square rounded-[2px] cursor-pointer"
            animate={{ backgroundColor: bg }}
            whileHover={{ scale: 1.18, backgroundColor: "#fbd115", zIndex: 10 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              layout: { type: "spring", stiffness: 120, damping: 18 },
              backgroundColor: { duration: 1.2, ease: "easeInOut" },
              default: { type: "spring", stiffness: 400, damping: 25 },
            }}
            aria-label={`Case ${slotRow + 1}-${slotCol + 1}`}
          />
        );
      })}
    </div>
  );
};

export default SandMatrix;

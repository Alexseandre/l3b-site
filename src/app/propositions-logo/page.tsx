"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const DRAFT_COLOR = "#475569";
const DRAFT_OPACITY = 0.4;

interface LogoVariant {
  id: number;
  name: string;
  description: string;
}

const VARIANTS: LogoVariant[] = [
  { id: 1, name: "Stroke Draw", description: "Dessin progressif trait par trait" },
  { id: 2, name: "Bounce Draw", description: "Dessin avec rebond elastique" },
  { id: 3, name: "Scale Fade", description: "Zoom + apparition douce" },
  { id: 4, name: "Neon Pulse", description: "Glow bleu continu apres apparition" },
  { id: 5, name: "Split & Merge", description: "Les brackets arrivent du haut et du bas" },
  { id: 6, name: "Rotate Reveal", description: "Rotation 180° avec apparition" },
  { id: 7, name: "Elastic Spring", description: "Effet ressort horizontal" },
  { id: 8, name: "Blur to Sharp", description: "Part flou, devient net" },
  { id: 9, name: "Segment par Segment", description: "Construction piece par piece" },
  { id: 10, name: "Heartbeat", description: "Battement de coeur continu" },
  { id: 11, name: "Float / Levitate", description: "Logo qui levite avec ombre" },
  { id: 12, name: "Blueprint Reveal", description: "Grille technique puis dessin" },
  { id: 13, name: "Glitch", description: "Effet digital / glitch" },
  { id: 14, name: "Draw Reverse", description: "Dessin inverse (exterieur vers interieur)" },
  { id: 15, name: "Levitate + Texte", description: "Logo flotte, texte L3B fixe en dessous" },
];

function DraftLines() {
  return (
    <>
      <line x1="10" y1="60" x2="110" y2="60" stroke={DRAFT_COLOR} strokeWidth="1" opacity={DRAFT_OPACITY} />
      <line x1="60" y1="10" x2="60" y2="110" stroke={DRAFT_COLOR} strokeWidth="1" opacity={DRAFT_OPACITY} />
      <line x1="25" y1="95" x2="95" y2="25" stroke={DRAFT_COLOR} strokeWidth="1" opacity={DRAFT_OPACITY} />
    </>
  );
}

function BracketMark({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <>
      <polyline points="35,55 35,25 85,25 85,55" fill="none" strokeWidth="10" strokeLinejoin="miter" stroke={topColor} />
      <polyline points="35,65 35,95 85,95 85,65" fill="none" strokeWidth="10" strokeLinejoin="miter" stroke={bottomColor} />
    </>
  );
}

function LogoText({ x, light }: { x: number; light: boolean }) {
  const textColor = light ? "#F8FAFC" : "#1F2937";
  const accent = light ? "#3B82F6" : "#1D5D9B";
  const muted = light ? "#94A3B8" : "#9CA3AF";
  return (
    <>
      <text x={x} y="55" fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif" fontSize="28" letterSpacing="2" fill={textColor} fontWeight="400">
        <tspan>L</tspan><tspan fill={accent} fontWeight="600">3</tspan><tspan>B</tspan>
      </text>
      <text x={x} y="80" fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif" fontSize="12" letterSpacing="3" fill={muted} fontWeight="300">
        CONSTRUCTION
      </text>
    </>
  );
}

function LogoCard({ variant, onSelect, isSelected, light }: {
  variant: LogoVariant;
  onSelect: (id: number) => void;
  isSelected: boolean;
  light: boolean;
}) {
  const [key, setKey] = useState(0);
  const topColor = light ? "#3B82F6" : "#1D5D9B";
  const bottomColor = light ? "#CBD5E1" : "#9CA3AF";

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer",
        light ? "bg-[#0F172A]" : "bg-white",
        isSelected
          ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]"
          : light
            ? "border-slate-700 hover:border-slate-500"
            : "border-gray-200 hover:border-gray-400",
      )}
      onClick={() => onSelect(variant.id)}
    >
      {/* Number badge */}
      <div className={cn(
        "absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
        isSelected
          ? "bg-blue-500 text-white"
          : light ? "bg-slate-800 text-slate-400" : "bg-gray-100 text-gray-500",
      )}>
        {String(variant.id).padStart(2, "0")}
      </div>

      {/* Replay button */}
      <button
        type="button"
        className={cn(
          "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
          light
            ? "bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white"
            : "bg-gray-100 text-gray-500 hover:bg-blue-500 hover:text-white",
        )}
        onClick={(e) => { e.stopPropagation(); setKey((k) => k + 1); }}
        aria-label="Rejouer l'animation"
      >
        &#8635;
      </button>

      {/* SVG Logo */}
      <div className="flex items-center justify-center py-8" key={key}>
        <svg viewBox="0 0 420 120" className="w-full max-w-[360px] h-auto">
          <DraftLines />
          <g>
            <BracketMark topColor={topColor} bottomColor={bottomColor} />
          </g>
          <LogoText x={130} light={light} />
        </svg>
      </div>

      {/* Label */}
      <div className="mt-2">
        <h3 className={cn(
          "text-sm font-semibold",
          light ? "text-slate-200" : "text-gray-800",
        )}>
          {variant.name}
        </h3>
        <p className={cn(
          "text-xs mt-0.5",
          light ? "text-slate-500" : "text-gray-500",
        )}>
          {variant.description}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-white" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function PropositionsLogoPage() {
  const [selected, setSelected] = useState<number>(15);
  const [bgMode, setBgMode] = useState<"dark" | "light">("dark");
  const light = bgMode === "dark";

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-16 transition-colors duration-500",
      light ? "bg-[#0B1120]" : "bg-gray-50",
    )}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={cn(
            "text-4xl font-bold tracking-tight mb-3",
            light ? "text-white" : "text-gray-900",
          )}>
            Propositions Logo
          </h1>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            light ? "text-slate-400" : "text-gray-600",
          )}>
            L3B Construction &mdash; 15 variantes d&apos;animation pour le logo du site.
            <br />
            Cliquez sur une carte pour la selectionner, ou sur &#8635; pour rejouer l&apos;animation.
          </p>

          {/* Background toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={cn("text-sm", light ? "text-slate-500" : "text-gray-500")}>
              Fond :
            </span>
            <button
              type="button"
              onClick={() => setBgMode("dark")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                bgMode === "dark"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300",
              )}
            >
              Sombre
            </button>
            <button
              type="button"
              onClick={() => setBgMode("light")}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                bgMode === "light"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : light ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-gray-200 text-gray-600 hover:bg-gray-300",
              )}
            >
              Clair
            </button>
          </div>
        </div>

        {/* Selected preview - BIG */}
        {selected && (
          <div className={cn(
            "mb-12 rounded-3xl border-2 p-10 flex flex-col items-center",
            light
              ? "bg-[#131C2E] border-blue-500/30"
              : "bg-white border-blue-200 shadow-xl",
          )}>
            <p className={cn("text-xs font-medium uppercase tracking-widest mb-6",
              light ? "text-blue-400" : "text-blue-600",
            )}>
              Selection actuelle — #{String(selected).padStart(2, "0")} {VARIANTS.find((v) => v.id === selected)?.name}
            </p>
            <svg viewBox="0 0 520 130" className="w-full max-w-2xl h-auto">
              <line x1="10" y1="60" x2="110" y2="60" stroke={DRAFT_COLOR} strokeWidth="1.2" opacity={0.3} />
              <line x1="60" y1="10" x2="60" y2="110" stroke={DRAFT_COLOR} strokeWidth="1.2" opacity={0.3} />
              <line x1="25" y1="95" x2="95" y2="25" stroke={DRAFT_COLOR} strokeWidth="1.2" opacity={0.3} />
              <BracketMark
                topColor={light ? "#3B82F6" : "#1D5D9B"}
                bottomColor={light ? "#CBD5E1" : "#9CA3AF"}
              />
              <LogoText x={135} light={light} />
            </svg>
            <p className={cn("mt-6 text-sm", light ? "text-slate-500" : "text-gray-500")}>
              Taille reelle dans le header du site
            </p>
            {/* Simulated header bar */}
            <div className={cn(
              "mt-4 w-full max-w-3xl rounded-xl px-6 py-3 flex items-center justify-between",
              light ? "bg-[#0B1120] border border-slate-800" : "bg-white border border-gray-200 shadow-sm",
            )}>
              <svg viewBox="0 0 420 100" className="h-10 w-auto">
                <line x1="8" y1="48" x2="88" y2="48" stroke={DRAFT_COLOR} strokeWidth="0.8" opacity={0.3} />
                <line x1="48" y1="8" x2="48" y2="88" stroke={DRAFT_COLOR} strokeWidth="0.8" opacity={0.3} />
                <line x1="20" y1="78" x2="76" y2="18" stroke={DRAFT_COLOR} strokeWidth="0.8" opacity={0.3} />
                <polyline points="28,44 28,18 68,18 68,44" fill="none" strokeWidth="8" strokeLinejoin="miter" stroke={light ? "#3B82F6" : "#1D5D9B"} />
                <polyline points="28,52 28,78 68,78 68,52" fill="none" strokeWidth="8" strokeLinejoin="miter" stroke={light ? "#CBD5E1" : "#9CA3AF"} />
                <text x="105" y="44" fontFamily="'Outfit', sans-serif" fontSize="22" letterSpacing="1.5" fill={light ? "#F8FAFC" : "#1F2937"} fontWeight="400">
                  <tspan>L</tspan><tspan fill={light ? "#3B82F6" : "#1D5D9B"} fontWeight="600">3</tspan><tspan>B</tspan>
                </text>
                <text x="105" y="66" fontFamily="'Outfit', sans-serif" fontSize="10" letterSpacing="2.5" fill={light ? "#94A3B8" : "#9CA3AF"} fontWeight="300">
                  CONSTRUCTION
                </text>
              </svg>
              <div className="flex gap-5">
                {["Accueil", "Construction", "Contact"].map((label) => (
                  <span key={label} className={cn("text-sm", light ? "text-slate-400" : "text-gray-500")}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid of all variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {VARIANTS.map((variant) => (
            <LogoCard
              key={variant.id}
              variant={variant}
              onSelect={setSelected}
              isSelected={selected === variant.id}
              light={light}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className={cn(
          "text-center text-xs mt-10",
          light ? "text-slate-600" : "text-gray-400",
        )}>
          L3B Construction &amp; Renovation &mdash; Propositions de logo anime
        </p>
      </div>
    </div>
  );
}

"use client";

interface AmbientBackgroundProps {
  theme?: "light" | "dark";
}

/**
 * Fixed, non-interactive ambient layer with continuous soothing motion.
 * Lives at z-0 so all UI remains clickable above it.
 * Day mode uses a soft sky palette; night mode uses the cinematic crimson wash.
 */
export default function AmbientBackground({
  theme = "dark",
}: AmbientBackgroundProps) {
  return (
    <div
      className={`ambient-root pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        theme === "light" ? "ambient-day" : "ambient-night"
      }`}
      aria-hidden="true"
    >
      <div className="ambient-base absolute inset-0" />
      <div className="ambient-aurora ambient-aurora-a absolute inset-[-20%]" />
      <div className="ambient-aurora ambient-aurora-b absolute inset-[-20%]" />
      <div className="ambient-mesh absolute inset-0" />

      <div className="ambient-orb ambient-orb-a absolute -left-[12%] top-[-8%] h-[58vmin] w-[58vmin] rounded-full" />
      <div className="ambient-orb ambient-orb-b absolute -right-[10%] top-[18%] h-[50vmin] w-[50vmin] rounded-full" />
      <div className="ambient-orb ambient-orb-c absolute bottom-[-18%] left-[28%] h-[62vmin] w-[62vmin] rounded-full" />
      <div className="ambient-orb ambient-orb-d absolute left-[42%] top-[40%] h-[36vmin] w-[36vmin] rounded-full" />

      <div className="ambient-sweep ambient-sweep-a absolute -left-1/4 top-0 h-full w-[55%] -skew-x-12" />
      <div className="ambient-sweep ambient-sweep-b absolute -right-1/4 top-0 h-full w-[45%] skew-x-6" />

      <div className="ambient-beam ambient-beam-a absolute inset-y-[-10%] left-[16%] w-px" />
      <div className="ambient-beam ambient-beam-b absolute inset-y-[-10%] right-[28%] w-px" />
      <div className="ambient-beam ambient-beam-c absolute inset-y-[-10%] left-[62%] w-px" />

      <div className="ambient-motes absolute inset-0">
        <span className="ambient-mote ambient-mote-1" />
        <span className="ambient-mote ambient-mote-2" />
        <span className="ambient-mote ambient-mote-3" />
        <span className="ambient-mote ambient-mote-4" />
        <span className="ambient-mote ambient-mote-5" />
        <span className="ambient-mote ambient-mote-6" />
      </div>

      <div className="ambient-vignette absolute inset-0" />
      <div className="ambient-grain absolute inset-0 opacity-[0.04]" />
    </div>
  );
}

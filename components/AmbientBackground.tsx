"use client";

/**
 * Organic animated mesh / floating blob layer.
 * Fixed at z-0 with pointer-events-none so UI stays fully interactive.
 * Palette auto-adapts via Tailwind `dark:` variants (html.dark).
 */
export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[#eef5fb] transition-colors duration-700 dark:bg-[#0a0a0c]" />

      {/* Soft gradient mesh */}
      <div className="absolute inset-0 opacity-70 transition-opacity duration-700 dark:opacity-90 ambient-mesh-layer" />

      {/* Floating color blobs */}
      <div
        className="absolute -left-[12%] -top-[14%] h-[58vmax] w-[58vmax] rounded-full
          bg-sky-400/40 blur-3xl dark:bg-[#E50914]/20
          animate-blob-drift-a"
      />
      <div
        className="absolute -right-[16%] top-[8%] h-[48vmax] w-[48vmax] rounded-full
          bg-cyan-300/40 blur-3xl dark:bg-rose-700/20
          animate-blob-drift-b"
      />
      <div
        className="absolute bottom-[-22%] left-[18%] h-[62vmax] w-[62vmax] rounded-full
          bg-amber-200/40 blur-3xl dark:bg-red-950/30
          animate-blob-drift-c"
      />
      <div
        className="absolute left-[38%] top-[36%] h-[34vmax] w-[34vmax] rounded-full
          bg-indigo-300/30 blur-3xl dark:bg-[#E50914]/15
          animate-blob-pulse"
      />
      <div
        className="absolute right-[22%] bottom-[12%] h-[28vmax] w-[28vmax] rounded-full
          bg-teal-300/35 blur-3xl dark:bg-orange-900/20
          animate-blob-drift-d"
      />

      {/* Light beams / sweeps */}
      <div className="ambient-sweep ambient-sweep-a absolute -left-1/4 top-0 h-full w-[55%] -skew-x-12 opacity-60 dark:opacity-40" />
      <div className="ambient-sweep ambient-sweep-b absolute -right-1/4 top-0 h-full w-[45%] skew-x-6 opacity-50 dark:opacity-30" />

      {/* Rising motes */}
      <div className="ambient-motes absolute inset-0">
        <span className="ambient-mote ambient-mote-1" />
        <span className="ambient-mote ambient-mote-2" />
        <span className="ambient-mote ambient-mote-3" />
        <span className="ambient-mote ambient-mote-4" />
        <span className="ambient-mote ambient-mote-5" />
        <span className="ambient-mote ambient-mote-6" />
      </div>

      {/* Vignette + film grain */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(226,239,247,0.55)_100%)]
          transition-opacity duration-700 dark:bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(10,10,12,0.78)_100%)]"
      />
      <div className="ambient-grain absolute inset-0 opacity-[0.035] dark:opacity-[0.045]" />
    </div>
  );
}

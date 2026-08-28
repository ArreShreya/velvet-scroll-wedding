import monogram from "@/assets/monogram-ps.png.asset.json";

/** P&S monogram, mirroring the language toggle in the opposite corner. */
export function Monogram() {
  return (
    <a
      href="#top"
      aria-label="Prabhav & Shreya"
      className="press pointer-events-auto block"
    >
      <img
        src={monogram.url}
        alt="Prabhav and Shreya monogram"
        width={718}
        height={980}
        className="h-9 w-auto select-none drop-shadow-[0_4px_10px_rgba(120,60,70,0.25)] md:h-11"
      />
    </a>
  );
}

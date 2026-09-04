import monogram from "../assets/monogram-ps.png";

/** P&S monogram, mirroring the language toggle in the opposite corner. */
export function Monogram() {
  return (
    <a
      href="#top"
      aria-label="Prabhav & Shreya"
      className="press pointer-events-auto block"
    >
      <img
        src={monogram}
        alt="Prabhav and Shreya monogram"
        width={718}
        height={980}
        className="h-7 w-auto select-none drop-shadow-[0_4px_10px_rgba(120,60,70,0.25)] md:h-8"
      />
    </a>
  );
}

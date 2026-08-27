import corner from "@/assets/gold-corner.png";
import divider from "@/assets/gold-divider.png";

/** Subtle gold/blush filigree corners framing a non-event page. */
export function PageOrnaments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -left-4 -top-2 w-28 -scale-x-100 opacity-55 sm:w-40 md:w-48"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -right-4 -top-2 w-28 opacity-55 sm:w-40 md:w-48"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -bottom-2 -left-4 w-24 -scale-100 opacity-40 sm:w-32 md:w-40"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -bottom-2 -right-4 w-24 -scale-y-100 opacity-40 sm:w-32 md:w-40"
      />
    </div>
  );
}

/** Small gold flourish used as a divider between blocks of copy. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <img
      src={divider}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={1024}
      height={512}
      className={`pointer-events-none mx-auto w-40 opacity-80 sm:w-56 ${className}`}
    />
  );
}

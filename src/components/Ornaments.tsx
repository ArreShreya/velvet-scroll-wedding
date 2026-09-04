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
        className="absolute -left-4 -top-2 w-48 -scale-x-100 opacity-55 sm:w-48 md:w-72 animate-float-left"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -right-4 -top-2 w-48 opacity-55 sm:w-48 md:w-72 animate-float-right"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -bottom-2 -left-4 w-48 -scale-100 opacity-40 sm:w-48 md:w-72 animate-float-left"
      />
      <img
        src={corner}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="absolute -bottom-2 -right-4 w-48 -scale-y-100 opacity-40 sm:w-48 md:w-72 animate-float-right"
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
      className={`pointer-events-none mx-auto w-56 opacity-80 sm:w-72 md:w-72 ${className}`}
    />
  );
}

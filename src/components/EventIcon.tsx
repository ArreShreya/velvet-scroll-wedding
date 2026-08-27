type Props = { id: string; className?: string };

/** Small pastel line-art scenes, one per event. */
export function EventIcon({ id, className = "h-9 w-9" }: Props) {
  const stroke = "currentColor";
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "mehandi": // henna hand
      return (
        <svg {...common}>
          <path d="M16 42V26l-3-6a2 2 0 013-2l3 5V10a2 2 0 014 0v10m0 0V8a2 2 0 014 0v12m0 0v-8a2 2 0 014 0v18c0 6-4 12-10 12h-5" />
          <circle cx="24" cy="30" r="2.5" />
        </svg>
      );
    case "engagement-sangeet": // ring + notes
      return (
        <svg {...common}>
          <circle cx="18" cy="32" r="8" />
          <path d="M14 22l4-6 4 6M32 34V16l8-3v18" />
          <circle cx="30" cy="34" r="2.5" />
          <circle cx="38" cy="31" r="2.5" />
        </svg>
      );
    case "masquerade": // mask
      return (
        <svg {...common}>
          <path d="M6 18c8-4 28-4 36 0 0 10-6 16-12 16-3 0-5-2-6-4-1 2-3 4-6 4C12 34 6 28 6 18z" />
          <path d="M14 20c2-1 5-1 7 0M27 20c2-1 5-1 7 0M24 8v6" />
        </svg>
      );
    case "haldi": // turmeric bowl + droplets
      return (
        <svg {...common}>
          <path d="M8 26h32c0 8-7 14-16 14S8 34 8 26z" />
          <path d="M18 20c0-3 2-4 2-7M28 20c0-4 3-4 3-8M24 18c0-2 1-3 1-5" />
        </svg>
      );
    case "baarat": // dhol
      return (
        <svg {...common}>
          <rect x="10" y="16" width="28" height="18" rx="4" />
          <path d="M10 20h28M10 30h28M18 16v18M30 16v18M6 25h4M38 25h4" />
        </svg>
      );
    case "varmala": // garland
      return (
        <svg {...common}>
          <path d="M12 12c-6 10-4 24 12 28 16-4 18-18 12-28" />
          <circle cx="16" cy="24" r="2" />
          <circle cx="20" cy="32" r="2" />
          <circle cx="28" cy="32" r="2" />
          <circle cx="32" cy="24" r="2" />
        </svg>
      );
    case "fera": // fire + stars
      return (
        <svg {...common}>
          <path d="M24 40c-6 0-10-4-10-9 0-6 6-8 6-14 4 2 5 6 5 8 2-1 3-3 3-5 4 3 6 7 6 11 0 5-4 9-10 9z" />
          <path d="M10 12l1.5 3 3 1.5-3 1.5L10 21l-1.5-3-3-1.5 3-1.5zM38 8l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
        </svg>
      );
    default:
      return null;
  }
}

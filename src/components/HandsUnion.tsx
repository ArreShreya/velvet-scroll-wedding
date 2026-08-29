import handLeft from "@/assets/hand-left.png.asset.json";
import handRight from "@/assets/hand-right-natural.png";
import { useInView } from "@/hooks/useInView";

/** Two hands meeting in the centre with rings — they glide in from each side. */
export function HandsUnion() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none relative mt-8 flex w-full max-w-2xl items-center justify-center ${
        inView ? "is-visible" : ""
      }`}
    >
      <img
        src={handLeft.url}
        alt=""
        loading="lazy"
        width={896}
        height={484}
        className="reveal-hand-left w-1/2 max-w-[16rem] select-none sm:max-w-xs"
      />
      <img
        src={handRight}
        alt=""
        loading="lazy"
        width={885}
        height={513}
        className="reveal-hand-right -ml-4 w-1/2 max-w-[16rem] select-none sm:max-w-xs"
      />
    </div>
  );
}

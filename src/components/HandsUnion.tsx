import handLeft from "@/assets/hand-left-v2.png";
import handRight from "@/assets/hand-right-v2.png";
import { useInView } from "@/hooks/useInView";

/** Two hands reaching diagonally toward each other, ring in the groom's hand. */
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
        src={handLeft}
        alt=""
        loading="lazy"
        width={1024}
        height={640}
        className="reveal-hand-left w-1/2 max-w-[16rem] select-none sm:max-w-xs"
      />
      <img
        src={handRight}
        alt=""
        loading="lazy"
        width={1024}
        height={640}
        className="reveal-hand-right -ml-6 w-1/2 max-w-[16rem] select-none sm:max-w-xs"
      />
    </div>
  );
}

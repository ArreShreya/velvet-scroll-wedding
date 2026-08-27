const VIDEO_ID = "hzQqfRM-mtA";

/** Hidden YouTube player: plays the Vakratunda Mahakaya shloka once on scroll open. */
export function ShlokaAudio() {
  return (
    <iframe
      title="Vakratunda Mahakaya shloka"
      src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=0&controls=0&loop=0&playsinline=1&rel=0`}
      allow="autoplay"
      className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

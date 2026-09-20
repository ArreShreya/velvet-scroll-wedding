import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const BGM_SOURCE = new URL("../assets/Stiched_BGM.mp3", import.meta.url).href;

export type BackgroundAudioHandle = { start: () => void };

/**
 * Starts the stitched local BGM on the actual user interaction that opens the invite.
 * Browsers only allow audio to play after a real tap/click/keyboard gesture.
 */
export const BackgroundAudio = forwardRef<BackgroundAudioHandle>((_props, ref) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;

    let audio = bgmRef.current;
    if (!audio) {
      audio = new Audio(BGM_SOURCE);
      audio.loop = true;
      audio.volume = 0.7;
      audio.preload = "auto";
      bgmRef.current = audio;
    }

    startedRef.current = true;
    audio.currentTime = 0;

    void audio.play().catch(() => {
      startedRef.current = false;
    });
  }, []);

  useImperativeHandle(ref, () => ({ start }), [start]);

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0"
      aria-hidden="true"
    />
  );
});

BackgroundAudio.displayName = "BackgroundAudio";
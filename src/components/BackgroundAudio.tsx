import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const SHLOKA_ID = "hzQqfRM-mtA";
const BGM_ID = "eqqn1bPPp1M";
const CONTAINER_ID = "bg-audio-player";

export type BackgroundAudioHandle = { start: () => void };

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
  });
}

/**
 * Plays the Vakratunda Mahakaya shloka once, then automatically switches
 * to the second YouTube track and loops it indefinitely.
 * Call `.start()` the moment the entry reveal video begins playing.
 */
export const BackgroundAudio = forwardRef<BackgroundAudioHandle>((_props, ref) => {
  const playerRef = useRef<any>(null);
  const startedRef = useRef(false);
  const phaseRef = useRef<"shloka" | "bgm">("shloka");

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    loadYouTubeApi().then(() => {
      playerRef.current = new window.YT.Player(CONTAINER_ID, {
        videoId: SHLOKA_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: any) => e.target.playVideo(),
          onStateChange: (e: any) => {
            // 0 === YT.PlayerState.ENDED
            if (e.data !== 0) return;

            if (phaseRef.current === "shloka") {
              phaseRef.current = "bgm";
              e.target.loadVideoById(BGM_ID);
            } else {
              // Manually loop the BGM track forever.
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    });
  }, []);

  useImperativeHandle(ref, () => ({ start }), [start]);

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0"
      aria-hidden="true"
    >
      <div id={CONTAINER_ID} />
    </div>
  );
});

BackgroundAudio.displayName = "BackgroundAudio";
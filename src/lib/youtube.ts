/**
 * Lazily loads the YouTube IFrame Player API exactly once and resolves with the
 * global `YT` namespace. The script is only injected the first time a YouTube
 * reel actually needs to play, so it never affects initial page load.
 */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<any> | null = null;

export function loadYouTubeAPI(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject("no window");
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.body.appendChild(tag);
  });

  return apiPromise;
}

export const youtubePoster = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

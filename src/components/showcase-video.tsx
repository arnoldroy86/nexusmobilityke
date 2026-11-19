import { useEffect, useRef, useState } from "react";

type ShowcaseVideoProps = {
  src: string;
  poster: string;
  label: string;
};

/**
 * Silent, looping showcase clip. Plays only while on screen (saves bandwidth
 * and battery), and falls back to a click-to-play poster for visitors who
 * prefer reduced motion.
 */
export function ShowcaseVideo({ src, poster, label }: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably render the `muted` attribute during SSR.
    video.muted = true;
    video.defaultMuted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="showcase-video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reducedMotion}
      aria-label={label}
    />
  );
}

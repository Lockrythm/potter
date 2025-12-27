import { useRef, useEffect } from 'react';
import libraryVideo from '@/assets/library-intro-video.mp4';

export function LibraryVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = Math.max(0, Math.min(1, scrollTop / docHeight));

          if (video.duration && !isNaN(video.duration)) {
            video.currentTime = scrollProgress * video.duration;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial frame
    video.currentTime = 0;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      >
        <source src={libraryVideo} type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

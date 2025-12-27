import libraryVideo from '@/assets/library-intro-video.mp4';

export function VideoLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={libraryVideo} type="video/mp4" />
        </video>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_20px_hsl(var(--primary)/0.3)]" />
      </div>
      <p className="absolute bottom-8 text-muted-foreground text-sm animate-pulse">
        Loading magical collection...
      </p>
    </div>
  );
}

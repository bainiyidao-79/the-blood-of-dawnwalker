import { siteConfig } from "@/config/site";

export function HeroVideo() {
  const video = siteConfig.heroVideo;
  if (!video?.youtubeId) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title={video.title ?? siteConfig.heroTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

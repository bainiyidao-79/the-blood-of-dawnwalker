import { Play } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * 左侧视频列（原站 Main3 左：宽 350，每卡 195 高、圆角 8）。
 * 高度与右攻略区对齐：整列 items-stretch，卡片 flex-1（最少 195px），
 * 视频条数由 siteConfig.videos 决定（2–4 个正好铺满）。
 *
 * youtubeId 的填写：
 *  - 生产（next build）：未填 youtubeId 的条目自动跳过；全空则整列不渲染，攻略区占满宽度。
 *  - 开发（next dev）：未填时渲染带视频标题的占位框，便于确认列高与攻略区对齐。
 */
export function VideoColumn() {
  const videos = siteConfig.videos;
  if (videos.length === 0) return null;

  const filled = videos.filter((video) => video.youtubeId);
  const showPlaceholders = filled.length === 0 && process.env.NODE_ENV !== "production";
  if (filled.length === 0 && !showPlaceholders) return null;

  const items = filled.length > 0 ? filled : videos;

  return (
    <div className="flex w-full flex-col gap-[25px] lg:w-[350px] lg:flex-none">
      {items.map((video) => (
        <div
          key={video.title}
          className="relative min-h-[195px] flex-1 overflow-hidden rounded-lg bg-black"
        >
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-border text-center text-muted-foreground">
              <Play className="h-7 w-7" aria-hidden />
              <span className="text-xs font-medium text-foreground">{video.title}</span>
              <span className="text-[11px]">fill siteConfig.videos[].youtubeId</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AdFrame } from "@/components/AdFrame";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/60 text-sm text-muted-foreground">
      {/* 页面底部 banner 广告位（页脚上方，每页都有；ads.footerBanner 留空则不渲染不占位）
          用 AdFrame（iframe 重执行模式）：document.write 型广告脚本在客户端导航时不会执行，
          AdFrame 每次路由变化重建 iframe 并写入广告代码，保证 SPA 跳转/back 返回都能重新加载广告 */}
      {siteConfig.ads?.footerBanner && (
        <div className="mx-auto w-full max-w-7xl px-4 pt-6">
          <AdFrame
            code={siteConfig.ads.footerBanner}
            width={728}
            height={90}
            label="Footer banner advertisement"
          />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>
            {siteConfig.name} — Fan-made wiki. Not affiliated with the game
            developer.
          </p>
          {siteConfig.platformUrl && (
            <a
              href={siteConfig.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/70 transition hover:text-foreground"
            >
              Official Store Page ↗
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

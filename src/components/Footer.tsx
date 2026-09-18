import { siteConfig } from "@/config/site";
import { AdFrame } from "@/components/AdFrame";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/60 text-sm text-muted-foreground">
      {/* 页面底部 banner 广告位（页脚上方，每页都有；ads.footerBanner 留空则不渲染不占位）
          用 AdFrame（iframe 重执行模式）：document.write 型广告脚本在客户端导航时不会执行，
          AdFrame 每次路由变化重建 iframe 并写入广告代码，保证 SPA 跳转/back 返回都能重新加载广告 */}
      {siteConfig.ads?.footerBanner && (
        <div className="wrap-1200 pt-6">
          <AdFrame
            code={siteConfig.ads.footerBanner}
            width={728}
            height={90}
            label="Footer banner advertisement"
          />
        </div>
      )}
      <div className="wrap-1200 flex flex-wrap items-center justify-between gap-4 py-8">
        <p>
          {siteConfig.name} — {siteConfig.footer.copyright}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/70">
          {siteConfig.footer.contact && (
            <span>
              {siteConfig.footer.contactLabel}: <span className="text-muted-foreground">{siteConfig.footer.contact}</span>
            </span>
          )}
          {siteConfig.officialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

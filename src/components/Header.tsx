import Link from "next/link";
import { Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Header() {
  // 顶部导航：优先 topNav 配置，否则取 nav 第一组前 4 项
  const links =
    siteConfig.topNav ??
    siteConfig.nav[0]?.children.slice(0, 4) ?? [];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              {siteConfig.shortName}
            </span>
            {siteConfig.eyebrow && (
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.25em] text-primary sm:inline">
                {siteConfig.eyebrow}
              </span>
            )}
          </Link>
          {/* 返回首页按钮：醒目展示（仅点左上角站点名可回首页这一点用户未必知道） */}
          <Link
            href="/"
            aria-label="Back to home"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-muted/60"
          >
            <Home className="size-3.5" />
            Home
          </Link>
        </div>
        <nav className="hidden items-center gap-5 text-[13px] font-medium md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {siteConfig.platformUrl && (
            <a
              href={siteConfig.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Play Now
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

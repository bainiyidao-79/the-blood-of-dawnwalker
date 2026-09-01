import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HeroVideo } from "@/components/HeroVideo";

export function HomeView() {
  return (
    <div className="flex flex-1">
      {/* 主内容区 */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Hero 区（顶部光晕氛围） */}
        <section className="glow-top relative mb-12 rounded-xl border border-border/60 p-6 sm:p-8">
          {siteConfig.eyebrow && (
            <p className="eyebrow mb-3">{siteConfig.eyebrow}</p>
          )}
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {siteConfig.heroSubtitle}
          </p>

          {/* YouTube 视频区 */}
          <div className="mt-6">
            <HeroVideo />
          </div>

          {/* CTA 按钮 */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={siteConfig.primaryCtaHref}
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {siteConfig.primaryCtaLabel}
            </Link>
            {siteConfig.platformUrl && (
              <a
                href={siteConfig.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/60"
              >
                Play Now
              </a>
            )}
          </div>
        </section>

        {/* Trending Now（按配置生成，不填则隐藏） */}
        {siteConfig.trending && siteConfig.trending.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-3xl tracking-tight">
              Trending Now
            </h2>
            <hr className="title-line mt-3 w-40" />
            <div className="mt-6 space-y-3">
              {siteConfig.trending.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-card p-4 transition hover:border-primary/40"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* What is <Game>?（按配置生成，不填则隐藏） */}
        {siteConfig.gameIntro && siteConfig.gameIntro.paragraphs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-3xl tracking-tight">
              {siteConfig.gameIntro.title ?? `What is ${siteConfig.name}?`}
            </h2>
            <hr className="title-line mt-3 w-40" />
            <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              {siteConfig.gameIntro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {siteConfig.gameIntro.facts &&
              siteConfig.gameIntro.facts.length > 0 && (
                <table className="mt-6 w-full max-w-2xl text-sm">
                  <tbody>
                    {siteConfig.gameIntro.facts.map((f, i) => (
                      <tr key={i} className="border-b border-border/70">
                        <td className="w-40 py-2 pr-4 font-medium text-foreground">
                          {f.label}
                        </td>
                        <td className="py-2 text-muted-foreground">
                          {f.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </section>
        )}

        {/* Explore the Wiki（按 nav 自动生成） */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Explore the Wiki
          </h2>
          <hr className="title-line mt-3 w-40" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.nav.map((group) =>
              group.children.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-lg border border-border/70 bg-card p-4 transition hover:border-primary/40 hover:bg-muted/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">
                      {item.label}
                    </div>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {group.title}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* FAQ 区（可选） */}
        {siteConfig.faq && siteConfig.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-3xl tracking-tight">
              Frequently Asked Questions
            </h2>
            <hr className="title-line mt-3 w-40" />
            <div className="mt-6 space-y-3">
              {siteConfig.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/70 bg-card p-4"
                >
                  <div className="text-sm font-medium text-foreground">
                    {item.question}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 底部 CTA 大横幅（光晕容器，按配置生成） */}
        {siteConfig.ctaBanner && (
          <section className="glow-cta mb-6 rounded-2xl border border-border/60 bg-card p-8 text-center sm:p-12">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              {siteConfig.ctaBanner.title}
            </h2>
            {siteConfig.ctaBanner.description && (
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                {siteConfig.ctaBanner.description}
              </p>
            )}
            <Link
              href={siteConfig.ctaBanner.buttonHref}
              className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {siteConfig.ctaBanner.buttonLabel}
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

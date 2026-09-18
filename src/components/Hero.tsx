import { siteConfig } from "@/config/site";

/**
 * Hero 大图区（原站把 keyart 作 body 背景 + ContentWrap 上推 440px）。
 * 本骨架：无顶栏，Hero 直顶；大图高 440px，底部渐隐接入内容区。
 * 文字块（eyebrow / 游戏名 / 副标题）**水平居中**——2026-09-16 扬哥定：Hero 文字居左在明亮配色下会暴露对齐问题。
 * 图片路径 = siteConfig.hero.image（keyart，同一张也用作内容页右栏 banner）。
 */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative w-full" aria-label={hero.title}>
      <div
        className="h-[240px] w-full bg-cover bg-center bg-no-repeat sm:h-[360px] lg:h-[440px]"
        style={{ backgroundImage: `url(${hero.image})` }}
        role="img"
        aria-label={`${hero.title} key art`}
      />
      {/* 压暗遮罩：底部渐隐到背景色，Contents 面板自然压在大图下 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-background" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="wrap-1200 flex flex-col items-center pb-4 text-center">
          {hero.eyebrow && <p className="eyebrow mb-1">{hero.eyebrow}</p>}
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{hero.subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}

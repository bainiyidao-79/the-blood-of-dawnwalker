import { siteConfig } from "@/config/site";

/**
 * 右侧游戏信息卡（原站 Main1 右：395×292，rgba(19,19,19,.8) + blur(4px)）。
 * 结构：居中标题（24px）→ 270×6 装饰线 → 封面(125×166) + 信息列(200×166) → Steam 入口按钮。
 */
export function GameInfoCard() {
  const info = siteConfig.gameInfo;

  return (
    <aside className="glass flex w-full flex-col p-4 lg:h-[292px] lg:w-[395px] lg:flex-none">
      <h2 className="text-center text-[20px] font-bold leading-tight text-foreground sm:text-[24px]">
        {info.title}
      </h2>
      <div className="title-rule mt-2" />

      <div className="mt-3 flex gap-3">
        <div
          className="h-[166px] w-[125px] flex-none rounded-sm bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${info.cover})` }}
          role="img"
          aria-label={`${info.title} cover`}
        />
        <dl className="min-w-0 flex-1 space-y-1">
          {info.fields.map((field) => (
            <div key={field.label} className="flex gap-2 text-[12px] leading-5">
              <dt className="w-[86px] flex-none text-muted-foreground">{field.label}</dt>
              <dd className="min-w-0 flex-1 text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 全站唯一 Steam 入口（文案统一 View on Steam ↗，禁止 Play Now 类暗示） */}
      <div className="mt-auto flex justify-center pt-3">
        <a
          href={info.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary whitespace-nowrap px-3 text-[13px]"
        >
          {info.ctaLabel}
        </a>
      </div>
    </aside>
  );
}

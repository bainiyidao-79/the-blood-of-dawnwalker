import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/config/site";
import type { ArticleMeta } from "@/lib/content";

/**
 * 栏目页 L2（二级页面）：栏目简介 + 该栏目全部攻略入口卡片。
 * 2026-09-16 扬哥反馈后重做：
 *  - 卡片化（标题 + 摘要 + Read guide →），可点性一目了然，不再是黑黢黢的文字行
 *  - 入口文案不截断；描述两行摘要；hover 主色描边 + 上浮
 *  - 只列本栏目真实内容，不做空链/重复链
 */
export function SectionView({
  section,
  sectionLabel,
  articles,
}: {
  section: string;
  sectionLabel: string;
  articles: ArticleMeta[];
}) {
  const intro =
    siteConfig.sectionIntros?.[section] ??
    `${articles.length} guide${articles.length === 1 ? "" : "s"} in this section.`;

  return (
    <div className="wrap-1200 flex-1 py-6">
      <Breadcrumb items={[{ label: sectionLabel }]} />

      <header className="mt-5">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{sectionLabel}</h1>
        <p className="mt-3 max-w-[860px] text-sm leading-relaxed text-muted-foreground">
          {intro} <span className="text-muted-foreground/70">({articles.length} guides)</span>
        </p>
      </header>
      <hr className="divider-accent mt-5" />

      {articles.length > 0 ? (
        <div className="mt-5 grid gap-[15px] sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${section}/${article.slug}`}
              title={article.description}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="text-[15px] font-bold leading-snug text-foreground group-hover:text-primary">
                {article.title}
              </span>
              {article.description && (
                <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {article.description}
                </span>
              )}
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                Read guide <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          No guides in this section yet. Add MDX files under `src/content/en/{section}/`.
        </p>
      )}
    </div>
  );
}

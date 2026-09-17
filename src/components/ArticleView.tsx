import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { NavTree } from "@/components/NavTree";
import { AdFrame } from "@/components/AdFrame";

type ArticleViewProps = {
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  readTime?: string;
  section: string;
  sectionLabel: string;
  content: string; // markdown 渲染后的 HTML
  related?: { title: string; href: string }[];
};

/** 正文切分：在 minChars 之后最近的块级边界切开（不切坏标签） */
function splitAt(html: string, minChars: number): [string, string] {
  const re = /<\/(?:p|ul|ol|table|h2|h3|blockquote)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m.index >= minChars) {
      const cut = m.index + m[0].length;
      return [html.slice(0, cut), html.slice(cut)];
    }
  }
  return [html, ""];
}

/** 正文中广告位数量：约 1 屏 ≈ 1400 字符；3 屏内 1 个、3–6 屏 2 个、6 屏以上 3 个 */
function inlineAdCount(length: number): number {
  if (length < 4500) return 1;
  if (length < 9000) return 2;
  return 3;
}

/** 按广告位数量把正文切成 N+1 段（第一段 = 第一屏，广告不进首屏） */
function segmentContent(html: string, adCount: number): string[] {
  if (adCount <= 0) return [html];
  const parts: string[] = [];
  let rest = html;
  const base = Math.floor(html.length / (adCount + 1));
  for (let i = 0; i < adCount; i += 1) {
    const [head, tail] = splitAt(rest, Math.max(1400, base));
    if (!tail) break;
    parts.push(head);
    rest = tail;
  }
  parts.push(rest);
  return parts;
}

/**
 * 首图前置 + 栏目图池兜底（2026-09-16 扬哥定）：
 *  - 图落在标题/简介正下方（prose 开头，右浮动文字环绕），进页瞬间可见
 *  - 正文前 1/3 已有图则不补
 *  - 兜底图取 siteConfig.sectionFallbackImages[栏目]，**禁止与右栏 keyart 同图同屏**
 */
function ensureEarlyImage(html: string, section: string): string {
  const limit = Math.max(700, Math.floor(html.length * 0.34));
  if (html.slice(0, limit).includes("<img")) return html;
  const src = siteConfig.sectionFallbackImages?.[section] ?? siteConfig.hero.image;
  const alt = `${siteConfig.shortName} guide illustration`;
  const figure = `<div class="art-ph pf-right"><img src="${src}" alt="${alt}" /><figcaption>${alt}</figcaption></div>`;
  return figure + html;
}

/** 首图升级为引导大图（扬哥 2026-09-16：进页瞬间看到一张大图）——正文首个插图浮改为通栏 16:9 */
function promoteLeadImage(html: string): string {
  const i = html.indexOf('class="art-ph');
  if (i === -1) return html;
  return html.slice(0, i) + 'class="art-ph lead' + html.slice(i + 'class="art-ph'.length);
}

/**
 * 内容页 L3：左正文 + 右黏性栏
 *  - 首图前置（扬哥 2026-09-16：让用户进页瞬间看到配图）
 *  - 正文中横幅广告位：第一屏之后出现；长文多坑位；第二坑位可用不同代码（ads.articleInline2，避免同创意）
 *  右侧栏 = 顶部 keyart banner（与首页 Hero 同一张图） + 分组可折叠的全站攻略导航树。
 */

/** 广告位高度：atOptions 类按声明高渲染；容器类（native）给 480 全展示（2026-09-17 文内广告位） */
function adHeightFor(code?: string): number {
  const m = /'height'\s*:\s*(\d+)/.exec(code ?? "");
  return m ? Number(m[1]) : 480;
}

export function ArticleView({
  title,
  description,
  date,
  updated,
  readTime,
  section,
  sectionLabel,
  content,
  related,
}: ArticleViewProps) {
  const adCode = siteConfig.ads?.articleInline;
  const adCode2 = siteConfig.ads?.articleInline2 ?? adCode;
  const adCodes = [adCode, adCode2];
  const withImage = promoteLeadImage(ensureEarlyImage(content, section));
  const segments = adCode ? segmentContent(withImage, inlineAdCount(withImage.length)) : [withImage];

  return (
    <div className="wrap-1200 flex-1 py-6">
      <Breadcrumb items={[{ label: sectionLabel, href: `/${section}` }, { label: title }]} />

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* 左：正文 */}
        <main className="min-w-0 flex-1">
          <article className="panel p-5 lg:p-6">
            <h1 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">{title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {date && <span>Published {date}</span>}
              {updated && updated !== date && <span>Updated {updated}</span>}
              {readTime && <span>{readTime}</span>}
            </p>
            {description && (
              <p className="mt-3 border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            {segments.map((segment, index) => (
              <div key={index}>
                <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: segment }} />
                {adCode && index < segments.length - 1 && (
                  <AdFrame
                    code={adCodes[index % adCodes.length]}
                    width={728}
                    height={adHeightFor(adCodes[index % adCodes.length])}
                    label="In-article banner advertisement"
                    className="my-7"
                  />
                )}
              </div>
            ))}
          </article>

          {related && related.length > 0 && (
            <section className="mt-6">
              <h2 className="sec-title">Related Guides</h2>
              <hr className="divider-accent" />
              <div className="flex flex-wrap gap-x-[15px] gap-y-[22px]">
                {related.map((item) => (
                  <Link key={item.href} href={item.href} className="btn-sq w-full sm:w-[179px]">
                    <span className="truncate">{item.title}</span>
                    <ChevronRight className="ml-1 h-3 w-3 shrink-0" aria-hidden />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* 右：黏性栏（keyart banner + 全站攻略导航树） */}
        <aside className="w-full lg:sticky lg:top-4 lg:w-[320px] lg:flex-none">
          <div className="glass overflow-hidden">
            <div
              className="h-[130px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${siteConfig.hero.image})` }}
              role="img"
              aria-label={`${siteConfig.name} key art`}
            />
            <div className="p-3">
              <NavTree groups={siteConfig.nav} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

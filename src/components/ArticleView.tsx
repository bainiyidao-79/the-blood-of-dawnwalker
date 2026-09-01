import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

type ArticleViewProps = {
  title: string;
  description?: string;
  section: string;
  sectionLabel: string;
  content: string; // MDX 渲染后的 HTML
  related?: { title: string; href: string }[];
};

export function ArticleView({
  title,
  description,
  section,
  sectionLabel,
  content,
  related,
}: ArticleViewProps) {
  return (
    <div className="flex flex-1">
      {/* 主内容区 */}
      <main className="flex-1 p-6 lg:p-8">
        <Breadcrumb
          items={[
            { label: sectionLabel, href: `/${section}` },
            { label: title },
          ]}
        />

        <article className="mt-6">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}

          {/* 文章正文（支持图文混排） */}
          <div
            className="prose prose-neutral dark:prose-invert mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {/* 相关推荐 */}
        {related && related.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Related Guides
            </h2>
            <div className="space-y-2">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  <ChevronRight className="h-3 w-3" />
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

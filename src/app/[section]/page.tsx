import Link from "next/link";
import { notFound } from "next/navigation";
import { listArticles, listSections, getSectionLabel } from "@/lib/content";

// 栏目列表页：展示该栏目下所有文章（内容自动跟随 content 目录）
// Next.js 15+: params 是 Promise，必须 await
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  const validSections = listSections();
  if (!validSections.includes(section)) notFound();

  const sectionLabel = getSectionLabel(section);
  const articles = listArticles(section);

  return (
    <div className="flex flex-1">
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-foreground">{sectionLabel}</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all guides in this category.
        </p>

        <div className="mt-6 space-y-3">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${section}/${article.slug}`}
                className="block rounded-lg border p-4 transition hover:bg-muted/50"
              >
                <div className="text-sm font-medium text-foreground">
                  {article.title}
                </div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {article.description}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No guides yet. Add MDX files under `src/content/en/{section}/`.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return listSections().map((section) => ({ section }));
}

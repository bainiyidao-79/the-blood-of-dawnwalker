import { notFound } from "next/navigation";
import { marked } from "marked";
import { ArticleView } from "@/components/ArticleView";
import {
  getArticle,
  listAllArticlePaths,
  listArticles,
  getSectionLabel,
} from "@/lib/content";

// 文章详情页（图文混排 MDX → markdown 渲染）
// Next.js 15+: params 是 Promise，必须 await
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;

  const article = getArticle(section, slug);
  if (!article) notFound();

  const html = marked.parse(article.content, { async: false });

  // 相关推荐：同栏目下的其他文章
  const related = listArticles(section)
    .filter((a) => a.slug !== slug)
    .map((a) => ({ title: a.title, href: `/${section}/${a.slug}` }));

  return (
    <ArticleView
      title={article.meta.title}
      description={article.meta.description}
      section={section}
      sectionLabel={getSectionLabel(section)}
      content={html}
      related={related}
    />
  );
}

export function generateStaticParams() {
  return listAllArticlePaths();
}

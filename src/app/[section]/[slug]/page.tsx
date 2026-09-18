import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import { siteConfig, siteUrl } from "@/config/site";
import { ArticleView } from "@/components/ArticleView";
import {
  getArticle,
  listAllArticlePaths,
  listArticles,
  getSectionLabel,
} from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const canonical = `${siteUrl}/${section}/${slug}`;
  const article = getArticle(section, slug);
  if (!article) return { alternates: { canonical } };
  return {
    title: `${article.meta.title} | ${siteConfig.name}`,
    description: article.meta.description,
    alternates: { canonical },
  };
}

// 内容页 L3：左正文 + 右黏性栏（图文混排 MDX → markdown 渲染）
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

  // 同栏目其他文章（无则整块隐藏，不做空链接）
  const related = listArticles(section)
    .filter((item) => item.slug !== slug)
    .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` }));

  return (
    <ArticleView
      title={article.meta.title}
      description={article.meta.description}
      date={article.meta.date}
      updated={article.meta.updated}
      readTime={article.meta.readTime}
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

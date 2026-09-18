import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionView } from "@/components/SectionView";
import { listArticles, listSections, getSectionLabel } from "@/lib/content";
import { siteConfig, siteUrl } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  return {
    title: `${siteConfig.name} — ${getSectionLabel(section)}`,
    description: siteConfig.seo.description,
    alternates: { canonical: `${siteUrl}/${section}` },
  };
}

// 栏目页 L2：该栏目攻略按钮列表（内容自动跟随 content 目录）
// Next.js 15+: params 是 Promise，必须 await
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  const validSections = listSections();
  if (!validSections.includes(section)) notFound();

  return (
    <SectionView
      section={section}
      sectionLabel={getSectionLabel(section)}
      articles={listArticles(section)}
    />
  );
}

export function generateStaticParams() {
  return listSections().map((section) => ({ section }));
}

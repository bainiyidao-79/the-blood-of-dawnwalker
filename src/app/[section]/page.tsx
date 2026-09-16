import { notFound } from "next/navigation";
import { SectionView } from "@/components/SectionView";
import { listArticles, listSections, getSectionLabel } from "@/lib/content";

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

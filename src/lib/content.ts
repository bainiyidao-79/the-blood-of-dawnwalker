import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  keywords: string[];
  readTime?: string;
};

export type Article = {
  slug: string;
  meta: ArticleMeta;
  content: string; // markdown body (frontmatter stripped)
};

const contentRoot = path.join(process.cwd(), "src", "content", "en");

function toMeta(slug: string, data: Record<string, unknown>, fallback: string): ArticleMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: String(data.updated ?? data.date ?? ""),
    category: String(data.category ?? fallback),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readTime: String(data.readTime ?? ""),
  };
}

export function listSections(): string[] {
  if (!fs.existsSync(contentRoot)) return [];
  return fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function listArticles(section: string): ArticleMeta[] {
  const dir = path.join(contentRoot, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return toMeta(slug, data, section);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(section: string, slug: string): Article | null {
  const file = path.join(contentRoot, section, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { slug, meta: toMeta(slug, data, section), content };
}

// 栏目显示名（新增栏目时在此补一条）
const sectionLabels: Record<string, string> = {
  walkthrough: "Walkthrough",
  endings: "Endings",
  locations: "Locations",
  achievements: "Achievements",
  "side-quests": "Side Quests",
  characters: "Characters",
  systems: "Systems",
};

export function getSectionLabel(section: string): string {
  return sectionLabels[section] ?? section;
}

// 所有 (section, slug) 组合，用于 generateStaticParams
export function listAllArticlePaths(): { section: string; slug: string }[] {
  const paths: { section: string; slug: string }[] = [];
  for (const section of listSections()) {
    for (const meta of listArticles(section)) {
      paths.push({ section, slug: meta.slug });
    }
  }
  return paths;
}

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  /** Hero 区顶部小徽章文字（如 "WIKI GUIDE"），空串则不显示 */
  eyebrow?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  // 官方链接
  platformUrl?: string;
  discordUrl?: string;
  youtubeChannelUrl?: string;

  // 顶部导航（Header 用的平铺链接；不填则取 nav 第一组前 4 项）
  topNav?: NavLink[];

  // 侧边栏目录树（按实际内容增减，不做死链接）
  nav: NavGroup[];

  // 首页 YouTube 视频（官方频道代表作 > 播放量最高热门视频）
  heroVideo?: {
    youtubeId: string;
    title?: string;
    description?: string;
  };

  // 首页「Trending Now」：精选文章（不填则整块隐藏）
  trending?: { label: string; href: string; description?: string }[];

  // 首页「What is <Game>?」介绍区（不填则整块隐藏）
  gameIntro?: {
    title?: string;
    paragraphs: string[];
    facts?: { label: string; value: string }[];
  };

  // 底部 CTA 大横幅（光晕容器，不填则整块隐藏）
  ctaBanner?: {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
  };

  // 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位
  ads?: {
    /** 侧边栏底部广告位（菜单栏下方） */
    sidebar?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
  };

  // 可选：FAQ
  faq?: { question: string; answer: string }[];
};

export const siteConfig: SiteConfig = {
  name: "The Blood of Dawnwalker Wiki",
  shortName: "Dawnwalker Wiki",
  description:
    "The Blood of Dawnwalker wiki — Rebel Wolves' open-world dark fantasy action RPG releasing September 3, 2026 on PS5, Xbox Series X|S and PC. Vampire mechanics, story and setting (Coen), system requirements, gameplay length, editions and everything we know.",
  heroTitle: "The Blood of Dawnwalker Wiki",
  heroSubtitle:
    "Guides and answers for Rebel Wolves' vampire action RPG — story, vampire mechanics, release info, requirements, and more",
  eyebrow: "Wiki Guide",
  primaryCtaLabel: "What is The Blood of Dawnwalker?",
  primaryCtaHref: "/intro/what-is-the-blood-of-dawnwalker",

  ads: {
    sidebar: `<script async="async" data-cfasync="false" src="https://pl31264315.profitableratecpmnetwork.com/f556ed975d3a9bff36ad2df1eabb8341/invoke.js"></script> <div id="container-f556ed975d3a9bff36ad2df1eabb8341"></div>`,
    footerBanner: `<script> atOptions = { 'key' : 'e99505012d4fd7e3c275f58797a768e1', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} }; </script> <script src="https://www.highrevenueformat.com/e99505012d4fd7e3c275f58797a768e1/invoke.js"></script>`,
  },
  platformUrl: "https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/",

  // 顶部导航（全部指向真实内容，无死链）
  topNav: [
    { label: "What is The Blood of Dawnwalker?", href: "/intro/what-is-the-blood-of-dawnwalker" },
    { label: "Release Date & Platforms", href: "/release/release-date-and-platforms" },
    { label: "Vampire Mechanics", href: "/guide/vampire-mechanics" },
    { label: "FAQ", href: "/guide/faq-everything-we-know" },
  ],

  // 侧边栏目录树（8 篇真实文章，随内容增补同步登记）
  nav: [
    {
      title: "Game Info",
      children: [
        { label: "What is The Blood of Dawnwalker?", href: "/intro/what-is-the-blood-of-dawnwalker" },
        { label: "Story & Setting", href: "/intro/story-and-setting" },
      ],
    },
    {
      title: "Guides & FAQ",
      children: [
        { label: "Vampire Mechanics", href: "/guide/vampire-mechanics" },
        { label: "How Long to Beat", href: "/guide/how-long-to-beat" },
        { label: "PC System Requirements", href: "/guide/system-requirements" },
        { label: "FAQ: Everything We Know", href: "/guide/faq-everything-we-know" },
      ],
    },
    {
      title: "Release & Buy",
      children: [
        { label: "Release Date & Platforms", href: "/release/release-date-and-platforms" },
        { label: "Price & Editions", href: "/release/price-and-editions" },
      ],
    },
  ],

  // 首页嵌入：官方 Dawnwalker 频道代表作（Everything You Need to Know, 210k+ views）
  heroVideo: {
    youtubeId: "Lyqm6Y5pBms",
    title: "The Blood of Dawnwalker — Everything You Need to Know",
    description:
      "The official overview from the Dawnwalker channel — the dark fantasy world of 14th-century Europe, Coen's curse, and how the day-night cycle shapes the game.",
  },

  // Trending Now：精选文章
  trending: [
    {
      label: "What is The Blood of Dawnwalker?",
      href: "/intro/what-is-the-blood-of-dawnwalker",
      description:
        "Rebel Wolves' open-world dark fantasy action RPG — play as Coen, human by day and vampire by night, in 14th-century Europe.",
    },
    {
      label: "Release Date & Platforms",
      href: "/release/release-date-and-platforms",
      description:
        "Launching September 2, 2026 on PS5 and PC (Steam, Epic). Regional unlock times and platform details.",
    },
    {
      label: "Vampire Mechanics",
      href: "/guide/vampire-mechanics",
      description:
        "Human by day, vampire by night — how the blood-thirst system, vampire powers, and the skill tree work.",
    },
    {
      label: "How Long to Beat",
      href: "/guide/how-long-to-beat",
      description:
        "Campaign length, side content, and how the day-night structure affects a full playthrough.",
    },
  ],

  // What is 区块：基于官方 Steam 资料与已验证素材
  gameIntro: {
    title: "What is The Blood of Dawnwalker?",
    paragraphs: [
      "The Blood of Dawnwalker is an open-world dark fantasy action RPG developed by Rebel Wolves — a studio founded by veteran CD Projekt Red developers — and published by Bandai Namco Entertainment. It launches on September 3, 2026 for PlayStation 5, Xbox Series X|S and PC (Steam and GOG).",
      "Set in 14th-century Europe, the game puts you in the shoes of Coen, a young man turned vampire who is human by day and a creature of the night after dark. Racing against time to save his family, Coen must master both sides of his nature — because every choice, and every hour of daylight spent, shapes how his story unfolds.",
    ],
    facts: [
      { label: "Developer", value: "Rebel Wolves" },
      { label: "Publisher", value: "Bandai Namco Entertainment" },
      { label: "Genre", value: "Open-world dark fantasy action RPG" },
      { label: "Platforms", value: "PS5, Xbox Series X|S & PC (Steam, GOG)" },
      { label: "Release date", value: "September 3, 2026" },
      { label: "Price", value: "$69.99" },
    ],
  },

  // 底部 CTA 大横幅
  ctaBanner: {
    title: "Preparing for The Blood of Dawnwalker?",
    description:
      "Start with the vampire mechanics — the day-night loop that changes how every quest and fight works.",
    buttonLabel: "Read the Vampire Mechanics Guide",
    buttonHref: "/guide/vampire-mechanics",
  },

  faq: [
    {
      question: "What is The Blood of Dawnwalker?",
      answer:
        "The Blood of Dawnwalker is an open-world dark fantasy action RPG by Rebel Wolves and Bandai Namco. You play as Coen, human by day and vampire by night, fighting to save his family in 14th-century Europe.",
    },
    {
      question: "When does The Blood of Dawnwalker come out?",
      answer:
        "The Blood of Dawnwalker launches on September 3, 2026 for PlayStation 5, Xbox Series X|S and PC (Steam and GOG). Some regional store listings show a September 2 unlock — that's a time-zone artifact of the same launch moment.",
    },
    {
      question: "How much does The Blood of Dawnwalker cost?",
      answer:
        "The Blood of Dawnwalker costs $69.99 on both PS5 and PC, with a Collector's Edition available.",
    },
    {
      question: "Do you play as a vampire in The Blood of Dawnwalker?",
      answer:
        "Yes — Coen is a dawnwalker: human by day and vampire by night. The day-night cycle is central to both the story and the gameplay, with vampire powers unlocked at night.",
    },
  ],

  // 广告位：待扬哥创建 Adsterra 单元后填入
};

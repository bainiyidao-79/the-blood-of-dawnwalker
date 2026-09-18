export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

/** 首页轮播页（固定 3 篇；少于 3 篇时轮播按实际条数渲染） */
export type CarouselSlide = {
  /** 轮播配图（放 public/images/，宽高比按 790:292 裁切） */
  image: string;
  title: string;
  href: string;
};

/** 右侧游戏信息卡的字段行（原站字段：制作公司/发行公司/发售日期/游戏平台/游戏类型） */
export type GameInfoField = { label: string; value: string };

/** 左视频列的 YouTube 条目（官方频道代表作优先；2–4 个） */
export type VideoItem = { youtubeId: string; title: string };

/**
 * 主题色 token 名（供组件以 var() 引用）。
 * ⚠️ 色值唯一来源 = src/app/globals.css 的 @theme 块，本文件不重复定义色值。
 * 每站正式配色由 g-art-design 从游戏官方素材提取后覆盖 globals.css 的三个主槽位。
 */
export const themeTokens = {
  primary: "--color-primary",
  accent: "--color-accent",
  auxiliary: "--color-auxiliary",
} as const;

export type SiteConfig = {
  /** 游戏名（全站唯一来源） */
  name: string;
  shortName: string;

  /** SEO 三件套 */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  /** Hero 大图区（无顶栏，Hero 直顶） */
  hero: {
    /** keyart 大图路径；同时用作内容页右栏 banner */
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };

  /** 首页横向轮播：3 篇，5s 自动换页 */
  carousel: {
    autoPlayMs: number;
    slides: CarouselSlide[];
  };

  /** 右侧游戏信息卡 */
  gameInfo: {
    title: string;
    /** 封面图路径（125×166 比例） */
    cover: string;
    fields: GameInfoField[];
    /** Steam 入口按钮（文案统一 View on Steam ↗） */
    ctaLabel: string;
    ctaHref: string;
  };

  /** 左视频列 YouTube id 列表（2–4 个，数量由右攻略区高度反推） */
  videos: VideoItem[];

  /** 官方链接（页脚展示；建议至少 1 条，其余留空则不渲染） */
  officialLinks: NavLink[];

  /** 全站攻略导航分组（首页攻略区 / 内容页右栏导航树共用；每站按真实内容增减） */
  nav: NavGroup[];

  /** 栏目简介（栏目页 L2 顶部一段话，key=section 目录名；缺省回退到「N guides…」） */
  sectionIntros?: Record<string, string>;

  /** 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏（扬哥 2026-09-16） */
  sectionFallbackImages?: Record<string, string>;

  /** 页脚 */
  footer: {
    copyright: string;
    contactLabel: string;
    /** 联系方式（邮箱/表单链接文本）；不填则页脚不显示联系位 */
    contact?: string;
  };

  /** 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位 */
  ads?: {
    /** 首页攻略区顶部 banner（内容区宽度） */
    contentBanner?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
    /** 正文中横幅广告位（728×90）：位置在第一屏之后，长文自动多插一个位（同一份代码可多处复用） */
    articleInline?: string;
    /** 正文第二坑位代码（扬哥 2026-09-16：长文双广告位时用不同代码/创意，避免同屏重复）；缺省回退 articleInline */
    articleInline2?: string;
    /** 左右浮动竖幅 160×600 旧写法：只填此字段=左右共用同一单元（同屏创意相同） */
    sideRail?: string;
    /** 左侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailLeft?: string;
    /** 右侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailRight?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "The Blood of Dawnwalker Wiki",
  shortName: "Dawnwalker",

  seo: {
    title: "The Blood of Dawnwalker Wiki — Guides, Endings & Gear",
    description:
      "Fan-made The Blood of Dawnwalker wiki: prologue walkthrough, all seven endings, legendary equipment locations, every character, and the 30-day time system explained.",
    keywords:
      "the blood of dawnwalker, dawnwalker wiki, dawnwalker guide, dawnwalker walkthrough, dawnwalker endings",
  },

  hero: {
    image: "/images/hero-keyart.jpg",
    eyebrow: "Wiki Guide",
    title: "The Blood of Dawnwalker",
    subtitle: "Walkthrough · Endings · Legendary Gear · Characters · Systems",
  },

  carousel: {
    autoPlayMs: 5000,
    slides: [
      {
        image: "/images/slide-walkthrough.jpg",
        title: "Prologue Walkthrough: All Good Things & Withering Away",
        href: "/walkthrough/prologue-and-opening-quests",
      },
      {
        image: "/images/slide-endings.jpg",
        title: "All 7 Endings Explained",
        href: "/endings/all-endings-explained",
      },
      {
        image: "/images/slide-locations.jpg",
        title: "Legendary Equipment Locations — Full Checklist",
        href: "/locations/legendary-equipment-locations",
      },
    ],
  },

  gameInfo: {
    title: "The Blood of Dawnwalker",
    cover: "/images/cover.jpg",
    fields: [
      { label: "Developer", value: "Rebel Wolves" },
      { label: "Publisher", value: "Bandai Namco Entertainment" },
      { label: "Release Date", value: "September 3, 2026" },
      { label: "Platforms", value: "PC, PS5, Xbox Series X|S" },
      { label: "Genre", value: "Dark Fantasy Action RPG" },
    ],
    ctaLabel: "View on Steam ↗",
    ctaHref: "https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/",
  },

  videos: [
    { youtubeId: "MWsyV7yQIBQ", title: "The Blood of Dawnwalker — Cinematic Trailer (Bandai Namco)" },
    { youtubeId: "FC_bDk-I7F4", title: "Launch Trailer (PlayStation)" },
    { youtubeId: "Fn7aYRVyRMM", title: "Story Trailer (Bandai Namco)" },
  ],

  officialLinks: [
    { label: "Steam", href: "https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/" },
  ],

  nav: [
    {
      title: "Walkthrough",
      children: [
        { label: "Game Overview", href: "/walkthrough/game-overview" },
        { label: "Prologue Walkthrough", href: "/walkthrough/prologue-and-opening-quests" },
        { label: "All Good Things", href: "/walkthrough/all-good-things" },
        { label: "Withering Away", href: "/walkthrough/withering-away" },
        { label: "Page-Turner", href: "/walkthrough/page-turner" },
        { label: "Like Father, Like Son", href: "/walkthrough/like-father-like-son" },
        { label: "Live Bait", href: "/walkthrough/live-bait" },
        { label: "Someone Needs a Lesson", href: "/walkthrough/someone-needs-a-lesson" },
        { label: "Blasphemy", href: "/walkthrough/blasphemy" },
        { label: "On the Run", href: "/walkthrough/on-the-run" },
        { label: "Disturbed", href: "/walkthrough/disturbed" },
        { label: "Sacred Covenant", href: "/walkthrough/sacred-covenant" },
        { label: "Bad Blood", href: "/walkthrough/bad-blood" },
        { label: "Smoke and Ashes", href: "/walkthrough/smoke-and-ashes" },
        { label: "From Above", href: "/walkthrough/from-above" },
        { label: "The Firebrand", href: "/walkthrough/the-firebrand" },
        { label: "Roadside Surprise", href: "/walkthrough/roadside-surprise" },
        { label: "Shadows in the Woods", href: "/walkthrough/shadows-in-the-woods" },
        { label: "Under Watchful Eyes", href: "/walkthrough/under-watchful-eyes" },
        { label: "Evil and Convenience", href: "/walkthrough/evil-and-convenience" },
        { label: "The Cursed Chasm", href: "/walkthrough/the-cursed-chasm" },
        { label: "Fate's Mercy", href: "/walkthrough/fates-mercy" },
        { label: "Bounty of the Mire", href: "/walkthrough/bounty-of-the-mire" },
        { label: "Good Home", href: "/walkthrough/good-home" },
        { label: "Following the Sound", href: "/walkthrough/following-the-sound" },
        { label: "Where Old Demons Sleep", href: "/walkthrough/where-old-demons-sleep" },
        { label: "Beyond Achilles", href: "/walkthrough/beyond-achilles" },
      ],
    },
    {
      title: "Endings",
      children: [{ label: "All Endings Explained", href: "/endings/all-endings-explained" }],
    },
    {
      title: "Locations",
      children: [{ label: "Legendary Equipment Locations", href: "/locations/legendary-equipment-locations" }],
    },
    {
      title: "Characters",
      children: [{ label: "Characters & Cast Guide", href: "/characters/characters-and-cast" }],
    },
    {
      title: "Systems",
      children: [
        { label: "Extending the 30-Day Timer", href: "/systems/extending-the-30-day-timer" },
        { label: "Shapeshift & Wolf Form", href: "/systems/transformation-system" },
        { label: "Fast Money", href: "/systems/fast-money" },
        { label: "Leveling Fast", href: "/systems/leveling-fast" },
        { label: "DLSS 5 Setup", href: "/systems/dlss5-guide" },
      ],
    },
  ],

  sectionIntros: {
    walkthrough: "Quest-by-quest walkthroughs for The Blood of Dawnwalker: the full prologue, every Day 1 chain, the Ambrus arc, the Sanzhana extra-day tasks and Anca's ruin dives — with the dialogue picks that matter.",
    endings: "Every ending explained: the choices, conditions and story branches that decide how Coen's tale concludes.",
    locations: "Collectible and gear locations across the Vale Sangora region, with map references for every legendary pick.",
    characters: "The cast of The Blood of Dawnwalker: who they are, how to meet them and which bonds matter.",
    systems: "Core systems explained: the 30-day day-night clock, dialogue colors, vampire abilities and progression.",
  },

  sectionFallbackImages: {
    walkthrough: "/images/slide-walkthrough.jpg",
    endings: "/images/slide-endings.jpg",
    locations: "/images/slide-locations.jpg",
    characters: "/images/slide-endings.jpg",
    systems: "/images/slide-locations.jpg",
  },

  footer: {
    copyright:
      "Fan-made wiki. Not affiliated with Rebel Wolves or Bandai Namco Entertainment.",
    contactLabel: "Contact",
  },

  ads: {
    // 2026-09-17 广告四件套（单元代码存根目录 ads/*.txt）
    footerBanner: `<script>
  atOptions = {
    'key' : 'e99505012d4fd7e3c275f58797a768e1',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/e99505012d4fd7e3c275f58797a768e1/invoke.js"></script>`,
    // sideRailLeft 暂停启用：160x300 单元暂无填充（代码存 ads/banner-160x300.txt，恢复时改回本行）
    sideRailRight: `<script>
  atOptions = {
    'key' : '3356df97b722fa9ca698492adec71764',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/3356df97b722fa9ca698492adec71764/invoke.js"></script>`,
    articleInline: `<script async="async" data-cfasync="false" src="https://pl31264315.profitableratecpmnetwork.com/f556ed975d3a9bff36ad2df1eabb8341/invoke.js"></script>
<div id="container-f556ed975d3a9bff36ad2df1eabb8341"></div>`,
  },
};

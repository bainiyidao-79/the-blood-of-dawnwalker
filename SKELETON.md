# SKELETON: youtube-video-wiki

> 归档日期：2026-08-28
> 来源：拆解自 vvultimatum.net（单游戏 Roblox 攻略站）。
> 定位：**带 YouTube 视频 + 侧边栏目录树 + 图文混排**的游戏 Wiki 骨架。

## ⭐ 一句话定位
这是一个**内容+目录双栏**游戏 Wiki 骨架：首页/内页都有**侧边栏目录树**，首页可嵌入 **YouTube 视频**提升停留；内页支持**图文混排**（文字+图片），适合需要地图、路线、图解的攻略。

## 结构特征（索引必填）

| 特征维度 | 识别结果 |
|---------|---------|
| **媒体能力** | YouTube 视频嵌入 + 图文混排（MDX，支持内嵌图片） |
| **页面结构** | 主题式（多栏目）+ 双栏布局（内容区 + 侧边栏目录树） |
| **语言** | 单语言（英文为主；如需多语言需另选骨架） |
| **功能模块** | Hero 视频区 + 侧边栏目录树 + 面包屑 + 文章正文 + 相关推荐 + FAQ（可选） |
| **适合游戏类型** | Roblox/单游戏攻略站；多栏目（Race/Boss/Build/Map/Codes）中大型游戏；需要视频留人+图文攻略的游戏 |

## ⭐ 核心特色
1. **YouTube 视频嵌入**：首页/文章页可嵌入 YouTube 视频，用于提升用户停留时长、降低跳出率。
2. **侧边栏目录树**：内容区+目录双栏，用户可快速跳转到任意攻略章节，提升导航效率。
3. **图文混排**：MDX 正文支持插入图片，适合地图/路线图/图解类攻略。
4. **按需增减栏目**：骨架提供参考栏目，**实际建站必须按素材数量增减**，不做死链接。

## ⭐ 铁律：按实际内容增减栏目/按钮
- 骨架是**参考模板**，不是成品脚手架。
- **有多少素材做多少页面**；栏目/按钮必须与内容一一对应。
- 若只有 3 个栏目有内容，就只保留 3 个栏目按钮；若需要 8 个栏目，就新增到 8 个。
- **严禁空链接/死链接**。

## 三层分离
- **框架层**：Next.js + Tailwind + MDX（路由/布局/SEO/导航自动生成）
- **配置层**：`src/config/site.ts`（游戏名/主题色/官方链接/导航/YouTube 视频）
- **内容层**：`src/content/en/**/*.mdx`（换游戏只替换内容 + 改配置）

## YouTube 视频使用说明（Workflow 调用时）
- 当 Workflow 选择本骨架建站时，需要新增一步：**为该游戏找 YouTube 视频**。
- 优先级：**游戏官方 YouTube 频道**（播放量高/较新） > 该游戏播放量最高的热门视频。
- 视频嵌入格式：
  - `https://www.youtube.com/watch?v={VIDEO_ID}`
  - iframe：`https://www.youtube.com/embed/{VIDEO_ID}`
  - 缩略图：`https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`
- 写入配置：`src/config/site.ts` 的 `heroVideo.youtubeId`。

## 图片使用说明
- 内页支持图片（MDX 中直接写 Markdown 图片语法）。
- 若素材来源网站的攻略含地图/路线图/图解，**必须保留图片**（纯文字无法表达）。
- 注意：
  - 优先使用无水印/无 logo 的图片；
  - 若图片带水印，需在素材收集阶段标记并评估是否可用；
  - 图片路径统一放 `public/images/`。

## 本地验证
```bash
npm install
npm run verify
npm run build
```

## 已知适配点（换游戏时必改）
1. `src/config/site.ts`：游戏名、官方链接、YouTube 视频、导航栏目（按实际内容增减）
2. `src/content/en/**/*.mdx`：替换为真实攻略内容
3. `src/components/Sidebar.tsx`：目录树内容由 content 自动生成（无需手动维护）

## 文件/路径
- 骨架位置：`/home/admin/Documents/skeletons/youtube-video-wiki/`
- 骨架索引：`/home/admin/Documents/skeletons/skeleton-index.md`
- 游戏参数：`/home/admin/Documents/game-sites/<游戏文件夹>/setting.md`

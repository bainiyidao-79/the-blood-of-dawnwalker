# Phantom Blade Zero · 操作日志（v2 新站）

> 第二个用 youtube-video-wiki 工作流完整跑通的站。旧站（basic-wiki 6语言102篇）被新站替代。

---
### 2026-08-29 23:05:00 | Step 01 | 素材盘点
- **操作**: 盘点 phantom-blade-zero/ 文件夹：setting.md（域名/GitHub/Vercel/GA 齐全）、文档/关键词素材.md（真实素材：游戏概览+战斗系统+官方渠道）、热词/（Google 热词 8 组）
- **结果**: ✅ 完成。⚠️ 发现 素材/keywords.json 和 文档/关键词.md 是 Project Zomboid 残留（早期测试数据）
- **异常**: 无
---
### 2026-08-29 23:10:00 | Step 02 | 官方视频选定（开 SS 代理）
- **入参**: 官方频道 UC68f9U_oHyccBBmPYtUHisw
- **操作**: 开 SS 代理 → yt-dlp --flat-playlist 拉取频道全部视频播放量 → 排序
- **结果**: ✅ 最热官方视频 = ayGk_auu5tk「Official Release Date Announcement Trailer」760万播放。次选：S-Party 演示 580万、预购预告 520万
- **异常**: 无（yt-dlp 走 socks5://127.0.0.1:1080 一次成功）
---
### 2026-08-29 23:12:00 | Step 03 | 官方配色提取（开 SS 代理）
- **入参**: Steam 官方头图（APP 4115450，从 Steam 页面 HTML 提取真实 URL）
- **操作**: 代理抓 Steam 页面 → 提取头图 URL → 下载 460x215 → 立即关外网 → 视觉模型提取
- **结果**: ✅ 官方配色：深灰绿黑底 #0E1211 + 古铜金 #C59A4D（主色）+ 亮金光晕 #E3B867 + 深金徽章 + 骨白文字 #E3DFD7
- **异常**: 无
---
### 2026-08-29 23:15:00 | Step 04 | 骨架装配
- **操作**: rsync 骨架 → phantom-blade-zero-v2/ + 拷贝 how-to-fish-v2 的 node_modules；发现骨架库缺 content.ts/修复页/postcss/package.json → 回灌骨架库并复制到 PBZ（**漏了 package.json，埋下后续部署失败**）
- **结果**: ✅ 完成
- **异常**: ⚠️ 回灌不完整（package.json 遗漏）
---
### 2026-08-29 23:16:00 | Step 05 | 配置+内容生成
- **入参**: 官方视频 ayGk_auu5tk；配色注入 @theme；素材=文档/关键词素材.md
- **操作**: site.ts 全量配置（topNav/trending/gameIntro/ctaBanner/faq）+ 5 篇英文内容页：intro/what-is（概览+66天剧情+Kung Fu Punk）、combat/sha-chi（蓝红攻击/然气循环/8槽配装/Boss技巧/Hellwalker）、weapons/weapons-and-phantom-edges（30+武器/20+幻刃）、release/release-date-and-editions（10月29日/标准豪华版/预购奖励）、guide/pc-system-requirements（最低/推荐配置表）
- **结果**: ✅ 全部基于真实素材，无虚构
- **异常**: 无
---
### 2026-08-29 23:17:00 | Step 06 | 本地验证
- **结果**: ✅ 构建 12 路由全过；curl 验证标题/视频嵌入/战斗内容/发行日期全部正常；截图自检深色金主题渲染正常
- **异常**: 无
---
### 2026-08-29 23:19:00 | Step 07 | GitHub 推送（三次才成功）
- **入参**: 仓库 bainiyidao-79/phantom-blade-zero，默认分支 **main**（注意：与 how-to-fish 的 master 不同）
- **操作**: ① 首推失败：remote URL 里 token 复制坏（Invalid username or token）→ 用 .env 真实 token 重建 remote ② 二推失败：pre-receive hook declined — **node_modules 未忽略，136MB SWC 二进制超 GitHub 100MB 限制** → 补 .gitignore 重建 git 历史 ③ 三推成功 2831f26
- **结果**: ✅ 推送成功
- **异常**: 两条重要教训（remote token 必须用 ${GITHUB_TOKEN} 展开；新仓库 git init 前先建 .gitignore）
---
### 2026-08-29 23:19-23:24 | Step 08 | Vercel 部署排障（两次失败）
- **现象**: 部署 2831f26 ERROR：Module not found 'marked'/'gray-matter'
- **排查**: API 拉构建日志 → 发现 npm install 输出 "removed 102 packages"（异常，应为 added）→ 定位 package.json 本身缺依赖
- **根因**: Step 04 回灌骨架时 package.json 只复制给了骨架库，漏了 PBZ 站点；本地能构建是因为 node_modules 是整体拷贝的
- **修复**: ① 推完整 lock（24fef37，仍失败，因 package.json 还缺）② 推 package.json（9c1fffc，+3 行依赖）
- **结果**: ✅ 23:23:58 部署 READY
- **异常**: 教训：骨架回灌必须完整复制 package.json + package-lock.json 成套；Vercel 构建日志的 npm install 增/删包数是排查关键信号
---
### 2026-08-29 23:25:00 | Step 09 | 线上验证
- **结果**: ✅ www.phantomblade-0.wiki 全部通过：html class="dark"、标题正确、官方视频嵌入、Trending Now + What is 区块、发行日期与 RTX 3060 Ti 内容页正常
- **异常**: 无
---
---
### 2026-08-30 00:38:00 | Step 13 | 骨架升级上线（返回首页按钮 + 广告位激活）
- **入参**: 新骨架组件（Header/Sidebar/Footer/AdSlot）+ Adsterra 真实广告代码（.env: AD_NATIVEBANNER_CODE / AD_BANNER728_CODE）
- **操作**: 同步4组件 → site.ts 注入 ads 配置（侧边栏=NativeBanner_1 响应式；底部banner=728x90_1 居中包装）→ 本地构建+HTML验证 → push 19dea55 → Vercel 自动部署
- **结果**: ✅ 00:40:51 部署 READY；线上六项验证全过：①dark主题 ②头部Home按钮 ③侧边栏Back to Home ④侧边栏NativeBanner广告代码 ⑤底部728x90广告代码 ⑥文章页每页带双广告
- **异常**: 无
---
---
### 2026-08-30 00:49-01:08 | Step 14 | 底部banner广告分页缺失修复（扬哥实测反馈）
- **现象（扬哥报告）**: ①分页下方无广告（只有首页有）②整页刷新首页有广告，但点进分页再 Back 回首页后广告消失
- **诊断（playwright 线上实测）**: footer 原始代码在 DOM 中（footerRawDiv=true）但无 iframe 渲染 → 根因：Adsterra 固定 Banner 是 document.write 型脚本，只在初始 HTML 解析期执行；dangerouslySetInnerHTML 注入的脚本在 Next.js 客户端导航（Link 跳转/back 返回）时不会重新执行
- **修复**: 骨架新建 AdFrame 客户端组件（每次路由变化重建 iframe 并通过 srcdoc 写入广告代码，iframe 文档解析期脚本必定执行）；Footer 的底部 banner 从 AdSlot 切换到 AdFrame；侧边栏保持 AdSlot（Native Banner 自管理容器，跨页正常）
- **提交**: 1efb63b（AdFrame 初版 doc.write）→ fdf058a（改为 srcdoc 无竞态方案——实测发现动态 iframe 的 doc.write 有 about:blank 异步加载竞态，contentDocument 为空）
- **结果**: ✅ 部署 READY（01:04:40）后 playwright 三场景实测全过：①首页整页加载 iframeFilled=2 ②客户端跳转分页 iframeFilled=2 ③Back回首页 iframeFilled=2（iframe 存在 + srcdoc 含广告代码 + 广告内容已填充）
- **异常**: 中途发现并修复 doc.write 竞态；text= 定位器子串歧义需用 aside >> text= 限定
---
---
### 2026-08-30 13:20 | favicon/logo 修复（扬哥 GSC 截图反馈驱动）
- **入参**: 扬哥发现新站缺 logo（GSC/收藏栏显示默认灰图标）
- **排查**: 三站盘点——big-walk-v2 完好（此前已配）；PBZ-v2 public/ 空+layout 无 icons 配置（旧站 favicon 迁移时遗漏）；how-to-fish-v2 同样缺失
- **操作**: 旧 PBZ public/ 的 7 件套 favicon（黑金 P logo）迁移至 PBZ-v2/public/ + layout.tsx 补 icons/manifest metadata → 提交 5922251 → Vercel READY
- **结果**: ✅ https://www.phantomblade-0.wiki/favicon.ico = 200 (15406B, image/vnd.microsoft.icon)，head 标签齐全
- **异常**: 无
---

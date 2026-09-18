import { siteConfig } from "@/config/site";
import { Hero } from "@/components/Hero";
import { TopicCarousel } from "@/components/TopicCarousel";
import { GameInfoCard } from "@/components/GameInfoCard";
import { VideoColumn } from "@/components/VideoColumn";
import { GuideArea } from "@/components/GuideArea";
import { AdFrame } from "@/components/AdFrame";

/**
 * 首页（专题轮播型）：Hero 大图直顶（无顶栏）
 *   → Main1：横向轮播（790×292） + 右侧游戏信息卡（395×292）
 *   → Main3：左视频列（350） + 右攻略区（约 820，高 920）
 * 已剔除：顶栏/搜索/资讯聚合/评论/下载/补丁/MOD/硬件模块。
 */
export function HomeView() {
  return (
    <>
      <Hero />

      <div className="wrap-1200 pb-10 pt-5">
        {/* Main1：轮播 + 游戏信息卡 */}
        <div className="flex flex-col gap-[15px] lg:flex-row lg:items-stretch">
          <TopicCarousel />
          <GameInfoCard />
        </div>

        {/* Main3：视频列 + 攻略区 */}
        <div className="mt-[25px] flex flex-col gap-[25px] lg:flex-row lg:items-stretch">
          <VideoColumn />
          <div className="panel min-w-0 flex-1 p-4 lg:min-h-[920px]">
            <GuideArea groups={siteConfig.nav} />
          </div>
        </div>

        {/* 攻略区下方内容 banner 广告位（ads.contentBanner 留空则不渲染不占位） */}
        <AdFrame
          code={siteConfig.ads?.contentBanner}
          width={728}
          height={90}
          label="Content banner advertisement"
          className="mt-6"
        />
      </div>
    </>
  );
}

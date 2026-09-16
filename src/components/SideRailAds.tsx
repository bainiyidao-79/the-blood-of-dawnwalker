import { siteConfig } from "@/config/site";
import { AdFrame } from "@/components/AdFrame";

/**
 * 左右浮动竖幅广告位（大屏可见，窄屏隐藏不挤内容）。
 * 左右各自独立广告单元（独立 key=独立竞价/创意/统计）；
 * 旧写法只填 sideRail 时左右共用同单元（同屏创意会相同）。
 * 全部留空 = 完全不渲染，用户零感知（无广告时不显示空框）。
 */
export function SideRailAds() {
  const ads = siteConfig.ads;
  const left = ads?.sideRailLeft ?? ads?.sideRail;
  const right = ads?.sideRailRight ?? ads?.sideRail;
  if (!left && !right) return null;
  return (
    <>
      {left && (
        <div className="pointer-events-auto fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
          <AdFrame code={left} width={160} height={300} label="Side rail advertisement (left)" />
        </div>
      )}
      {right && (
        <div className="pointer-events-auto fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
          <AdFrame code={right} width={160} height={600} label="Side rail advertisement (right)" />
        </div>
      )}
    </>
  );
}

type AdSlotProps = {
  /** 广告代码（HTML/JS 片段）。留空则整个广告位不渲染，不占任何空间 */
  code?: string;
  /** 无障碍标签 */
  label?: string;
  /** 额外样式类（控制外边距等） */
  className?: string;
};

/**
 * 通用广告位组件（骨架预制）。
 * 用法：在 site.ts 的 ads 配置里填入广告代码即可，无需改组件。
 * - ads.sidebar       → 侧边栏底部广告位（菜单栏下方）
 * - ads.footerBanner  → 页面底部 banner 广告位（每页页脚上方）
 */
export function AdSlot({ code, label, className }: AdSlotProps) {
  if (!code) return null;
  return (
    <div
      role="complementary"
      aria-label={label ?? "Advertisement"}
      className={className}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

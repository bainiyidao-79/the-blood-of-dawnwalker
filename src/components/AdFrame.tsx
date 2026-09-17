"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type AdFrameProps = {
  /** 广告代码（HTML/JS 片段，支持 document.write 型广告脚本） */
  code?: string;
  /** 广告尺寸（决定 iframe 尺寸与占位高度） */
  width?: number;
  height?: number;
  /** 无障碍标签 */
  label?: string;
  className?: string;
};

/** atOptions 类（固定尺寸 iframe banner）识别：有 'height' 声明即为固定 Banner */
function isFixedBanner(code: string): boolean {
  return /'height'\s*:/.test(code);
}

/**
 * iframe 式广告位（骨架预制）。
 *
 * 解决的问题：dangerouslySetInnerHTML 注入的 <script> 在 Next.js 客户端
 * 导航（<Link> 跳转、浏览器返回）时不会重新执行，document.write 型广告
 * 脚本（如 Adsterra 固定 Banner）只在初始 HTML 解析期有效，导致 SPA 跳转
 * 后广告消失。
 *
 * 方案：每次路由变化（usePathname）重建 iframe，并通过 srcdoc 把广告代码
 * 写入 iframe 文档——srcdoc 文档解析期写入的脚本一定会执行（无竞态）。
 *
 * 滚动条修复：srcdoc 文档默认带 body margin 8px，包裹完整 HTML 骨架并
 * 强制 margin:0 + scrolling=no，广告精确贴合容器。
 *
 * 高度自适应（2026-09-17 扬哥定）：容器类广告（Native Banner 等，无
 * atOptions 固定高声明）→ iframe 高度按内容实测自动调整（同源 srcdoc
 * 可测内容高，异步渲染轮询至稳定），宽度随容器、高随内容——不截断、
 * 不留白；srcdoc 背景透明，深色站点不出现白块。atOptions 固定 Banner
 * 仍按声明尺寸渲染并预留等高占位。
 */
export function AdFrame({ code, width, height, label, className }: AdFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const adaptive = !!code && !isFixedBanner(code);
  const [measured, setMeasured] = useState<number | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !code) return;
    host.innerHTML = "";
    const iframe = document.createElement("iframe");
    if (width) iframe.width = String(width);
    iframe.height = String(adaptive ? 90 : height ?? 90);
    iframe.title = label ?? "Advertisement";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.margin = "0 auto";
    iframe.setAttribute("scrolling", "no");
    host.appendChild(iframe);

    let timer: ReturnType<typeof setInterval> | null = null;
    const sync = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) return;
        const h = Math.max(
          doc.body.scrollHeight,
          doc.documentElement?.scrollHeight ?? 0
        );
        if (h > 20) {
          iframe.height = String(h + 2);
          setMeasured(h + 2);
        }
      } catch {
        /* srcdoc 同源，正常不可达此处 */
      }
    };
    if (adaptive) {
      iframe.addEventListener("load", sync);
      timer = setInterval(sync, 400);
      const stop = setTimeout(() => {
        if (timer) clearInterval(timer);
        sync();
      }, 12000);
      void stop;
    }
    iframe.srcdoc =
      `<!DOCTYPE html><html><head><meta charset="utf-8">` +
      `<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>` +
      `</head><body>${code}</body></html>`;
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [code, pathname, adaptive]);

  if (!code) return null;
  return (
    <div
      ref={hostRef}
      role="complementary"
      aria-label={label ?? "Advertisement"}
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: adaptive ? (measured ?? undefined) : height ?? undefined,
      }}
    />
  );
}

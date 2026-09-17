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

/** atOptions 类（固定尺寸 iframe banner）识别：含 'height' 声明即为固定 Banner */
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
 * srcdoc 同源 → 内置上报脚本用 postMessage 把内容高度报给父页。
 *
 * 高度策略（2026-09-17 扬哥反馈两次迭代后定稿）：
 * - 固定 Banner（atOptions）：按声明尺寸渲染，占位等高。
 * - 容器类（Native Banner 等无固定高声明）：**高度自适应内容**——测量期
 *   容器锁定 90px+溢出裁切+iframe 透明（增长过程完全不可见），iframe 内
 *   置上报脚本经 postMessage 报告内容高（load/定时/ResizeObserver 多次），
 *   父页一次设定并显现。杜绝"测出的永远是设定值"的反馈污染（前两版用
 *   documentElement.scrollHeight 测量，它镜像 iframe 视口高，导致缓慢
 *   生长卡顿——已废弃该测量方式）。
 * - 禁接 Popunder/Social Bar 类跳窗广告（体验差，扬哥定）。
 */
export function AdFrame({ code, width, height, label, className }: AdFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const pathname = usePathname();
  const adaptive = !!code && !isFixedBanner(code);
  const [boxH, setBoxH] = useState<number | null>(null);
  const initialH = height ?? 90;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !code) return;
    host.innerHTML = "";
    const iframe = document.createElement("iframe");
    frameRef.current = iframe;
    if (width) iframe.width = String(width);
    iframe.height = String(adaptive ? 800 : initialH);
    iframe.title = label ?? "Advertisement";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.margin = "0 auto";
    iframe.setAttribute("scrolling", "no");
    if (adaptive) {
      // 测量期：容器锁定 90px + 溢出裁切，iframe 透明（增长过程完全不可见）
      host.style.height = "90px";
      host.style.overflow = "hidden";
      host.style.transition = "height .3s ease";
      iframe.style.opacity = "0";
    }
    host.appendChild(iframe);
    iframe.srcdoc =
      `<!DOCTYPE html><html><head><meta charset="utf-8">` +
      `<style>html,body{margin:0;padding:0;background:transparent}</style></head><body>${code}` +
      `<scr` +
      `ipt>(function(){var r=function(){try{parent.postMessage(JSON.stringify({t:"adh",h:document.body.scrollHeight}),"*")}catch(e){}};window.addEventListener("load",r);setTimeout(r,200);setTimeout(r,800);setTimeout(r,2000);setTimeout(r,4000);if(window.ResizeObserver){try{new ResizeObserver(r).observe(document.body)}catch(e){}}})();</` +
      `script></body></html>`;

    const onMsg = (e: MessageEvent) => {
      if (!adaptive || e.source !== frameRef.current?.contentWindow) return;
      try {
        const d = JSON.parse(e.data);
        if (d && d.t === "adh" && d.h > 20) {
          iframe.height = String(d.h);
          iframe.style.opacity = "1";
          host.style.height = d.h + "px";
          setBoxH(d.h);
        }
      } catch {
        /* 非本 iframe 的消息，忽略 */
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [code, pathname, adaptive, initialH]);

  if (!code) return null;
  if (!boxH) {
    // 测量期占位：固定 Banner 保留声明高；容器类锁 90px 裁切（内部渲染不可见）
    return (
      <div
        ref={hostRef}
        role="complementary"
        aria-label={label ?? "Advertisement"}
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          height: (adaptive ? 90 : initialH) + "px",
          overflow: "hidden",
        }}
      />
    );
  }
  return (
    <div
      ref={hostRef}
      role="complementary"
      aria-label={label ?? "Advertisement"}
      className={className}
      style={{ display: "flex", justifyContent: "center" }}
    />
  );
}

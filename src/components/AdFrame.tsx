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
 * srcdoc 同源 → 父页可实测内容高度。
 *
 * 高度策略（2026-09-17 扬哥反馈迭代）：
 * - 固定 Banner（atOptions）：按声明尺寸渲染，占位等高。
 * - 容器类（Native Banner 等无固定高声明）：**测量期完全隐藏**（容器锁定
 *   初始高+溢出裁切+iframe 透明，渲染增长过程不可见、无反复回流），内容
 *   高度连续两次实测一致（稳定）后，**一次平滑展开到实测高**——不截断、
 *   不留白、无逐步生长的抖动；9 秒未稳定则按当前实测值定稿。
 * - 无填充自收起（固定 Banner）：12 秒内容近空（<20px）→ 整槽收起，
 *   未获填充的单元不再常年挂白块。
 */
export function AdFrame({ code, width, height, label, className }: AdFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const adaptive = !!code && !isFixedBanner(code);
  const [boxH, setBoxH] = useState<number | null>(null);
  const initialH = height ?? 90;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !code) return;
    host.innerHTML = "";
    const iframe = document.createElement("iframe");
    if (width) iframe.width = String(width);
    iframe.height = String(adaptive ? 800 : initialH);
    iframe.title = label ?? "Advertisement";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.margin = "0 auto";
    iframe.setAttribute("scrolling", "no");
    if (adaptive) {
      // 测量期：容器锁定初始高 + 溢出裁切，iframe 透明（增长过程不可见、无回流抖动）
      host.style.height = initialH + "px";
      host.style.overflow = "hidden";
      host.style.transition = "height .3s ease";
      iframe.style.opacity = "0";
    }
    host.appendChild(iframe);
    iframe.srcdoc =
      `<!DOCTYPE html><html><head><meta charset="utf-8">` +
      `<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>` +
      `</head><body>${code}</body></html>`;

    const measure = (): number | null => {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) return null;
        // 只测内容高：documentElement.scrollHeight 会镜像 iframe 视口高
        // （外层设多高它就多高），混入会导致“测出的永远是设定值”
        const container = doc.querySelector<HTMLElement>('[id^="container-"]');
        const ch = container
          ? Math.max(container.offsetHeight, container.scrollHeight)
          : 0;
        return Math.max(ch, doc.body.scrollHeight);
      } catch {
        return null;
      }
    };

    let timer: ReturnType<typeof setInterval> | null = null;
    let ticks = 0;
    let last = -1;
    const finish = (h: number) => {
      if (timer) clearInterval(timer);
      iframe.height = String(h);
      iframe.style.opacity = "1";
      host.style.height = h + "px";
      setBoxH(h);
    };
    const tickFn = () => {
      ticks += 1;
      const h = measure();
      if (adaptive) {
        // 连续两次测得同高 → 渲染稳定，一次定稿
        if (h && h > 20 && h === last) return finish(h);
        last = h ?? -1;
        if (ticks >= 30 && h) return finish(h);
        return;
      }
      // 固定 Banner：12s 内容近空 → 无填充，整槽收起
      if (ticks >= 40 && (h ?? 0) < 20) {
        if (timer) clearInterval(timer);
        host.style.display = "none";
      }
    };
    timer = setInterval(tickFn, 300);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [code, pathname, adaptive, initialH]);

  if (!code) return null;
  if (!boxH) {
    // 测量期占位：固定 Banner 保留声明高；容器类锁初始高裁切（内部不可见）
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

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * 首页横向轮播（原站 Main1 左：790×292）。
 * 纯 React + CSS 实现，无第三方轮播依赖：
 *  - N 秒自动换页（siteConfig.carousel.autoPlayMs，默认 5000）
 *  - 鼠标悬停暂停
 *  - 点击右下分页点切换（8×8 小方块，当前项横向拉长到 14×8）
 *  - 标题在左下（bottom 20 / left 30，18px 粗体白字）+ 底部压暗遮罩
 */
export function TopicCarousel() {
  const slides = siteConfig.carousel.slides;
  const count = slides.length;
  const delay = siteConfig.carousel.autoPlayMs > 0 ? siteConfig.carousel.autoPlayMs : 5000;

  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % count);
    }, delay);
    return () => clearInterval(timer);
  }, [count, delay]);

  if (count === 0) return null;
  const current = slides[index];

  return (
    <div
      className="relative h-[220px] w-full overflow-hidden bg-card sm:h-[292px] lg:w-[790px] lg:flex-none"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      aria-roledescription="carousel"
      aria-label="Featured guides"
    >
      {slides.map((slide, i) => (
        <div
          key={`${slide.href}-${i}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="scrim-bottom absolute inset-0" />
        </div>
      ))}

      {/* 当前页标题（点击进正文） */}
      <Link
        href={current.href}
        className="absolute bottom-[20px] left-4 w-[calc(100%-2rem)] text-[16px] font-bold leading-snug text-white transition hover:text-accent sm:left-[30px] sm:w-[730px] sm:text-[18px]"
      >
        {current.title}
      </Link>

      {/* 分页点：右下角小方块 */}
      {count > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}: ${slide.title}`}
              aria-current={i === index}
              className={`dot ${i === index ? "dot-active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

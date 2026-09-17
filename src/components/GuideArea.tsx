"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, Square } from "lucide-react";
import type { NavGroup } from "@/config/site";

/**
 * 首页右侧攻略区（原站 Main3 右：820×920）。
 * 结构 = 栏目块重复：栏目标题（16px + 前置图标）→ 小方按钮网格（179×28，每行 4 个）
 *        → 组尾「更多 ▼」展开 → 组间橙色 1px 分隔线。
 * 展开为纯前端状态切换，不刷新、不跳转。
 */
export function GuideArea({ groups, limit = 8 }: { groups: NavGroup[]; limit?: number }) {
  const [expanded, setExpanded] = useState<string[]>([]);

  if (groups.length === 0) return null;

  return (
    <div>
      {groups.map((group, gi) => {
        const isOpen = expanded.includes(group.title);
        const shown = isOpen ? group.children : group.children.slice(0, limit);
        const hiddenCount = group.children.length - shown.length;

        return (
          <section key={group.title} className="mb-[22px]">
            <h3 className="sec-title flex items-center gap-2">
              <Square className="h-3 w-3 shrink-0 fill-primary text-primary" aria-hidden />
              {group.title}
            </h3>

            {/* 纵向间距 22（原站 15 偏挤，2026-09-16 扬哥定：上下别太挤）；横向保持 15 */}
            <div className="mt-[15px] flex flex-wrap gap-x-[15px] gap-y-[22px]">
              {shown.map((item) => (
                <Link key={item.href} href={item.href} className="btn-sq w-full sm:w-[179px]" title={item.label}>
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>

            {hiddenCount > 0 && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="more-link"
                  onClick={() => setExpanded((prev) => [...prev, group.title])}
                >
                  More <ChevronDown className="h-3 w-3" aria-hidden />
                </button>
              </div>
            )}
            {isOpen && group.children.length > limit && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="more-link"
                  onClick={() => setExpanded((prev) => prev.filter((t) => t !== group.title))}
                >
                  Less <ChevronUp className="h-3 w-3" aria-hidden />
                </button>
              </div>
            )}

            {gi < groups.length - 1 && <hr className="divider-accent" />}
          </section>
        );
      })}
    </div>
  );
}

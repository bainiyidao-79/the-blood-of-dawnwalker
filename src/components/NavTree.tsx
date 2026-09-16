"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { NavGroup } from "@/config/site";

/**
 * 全站攻略导航树（内容页 L3 右栏）。
 * 分组可折叠（默认全部展开，当前所在组高亮标题）；组内两列小方按钮；组尾「更多 ▼」展开。
 * 「更多」显示条数由 limit 控制；展开为纯前端状态，不刷新。
 */
export function NavTree({ groups, limit = 6 }: { groups: NavGroup[]; limit?: number }) {
  const pathname = usePathname();
  const activeGroup = groups.find((group) =>
    group.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))
  )?.title;

  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  if (groups.length === 0) return null;

  return (
    <nav aria-label="Wiki navigation">
      {groups.map((group) => {
        const isOpen = !collapsed.includes(group.title);
        const showAll = expanded.includes(group.title);
        const shown = showAll ? group.children : group.children.slice(0, limit);
        const hiddenCount = group.children.length - shown.length;

        return (
          <div key={group.title} className="mb-4">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() =>
                setCollapsed((prev) =>
                  prev.includes(group.title)
                    ? prev.filter((t) => t !== group.title)
                    : [...prev, group.title]
                )
              }
              className={`sec-title flex w-full items-center justify-between gap-2 border-b border-border/60 pb-1 text-left ${
                group.title === activeGroup ? "text-primary" : "text-foreground"
              }`}
            >
              <span className="truncate text-[13px]">{group.title}</span>
              {isOpen ? (
                <ChevronUp className="h-3 w-3 shrink-0" aria-hidden />
              ) : (
                <ChevronDown className="h-3 w-3 shrink-0" aria-hidden />
              )}
            </button>

            {isOpen && (
              <>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {shown.map((item) => (
                    <Link key={item.href} href={item.href} className="btn-sq w-full text-[12px]">
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      className="more-link"
                      onClick={() => setExpanded((prev) => [...prev, group.title])}
                    >
                      More <ChevronDown className="h-3 w-3" aria-hidden />
                    </button>
                  </div>
                )}
                {showAll && group.children.length > limit && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      className="more-link"
                      onClick={() => setExpanded((prev) => prev.filter((t) => t !== group.title))}
                    >
                      Less <ChevronUp className="h-3 w-3" aria-hidden />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}

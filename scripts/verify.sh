#!/usr/bin/env bash
# 本地验证脚本（骨架自带）：类型检查 + 静态导出产物检查
# 用法：bash scripts/verify.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== 1/3 tsc --noEmit =="
npm run verify

echo "== 2/3 next build (NEXT_PUBLIC_SITE_URL=https://example.com) =="
NEXT_PUBLIC_SITE_URL="https://example.com" npm run build

echo "== 3/3 产物检查 (out/) =="
test -f out/index.html || { echo "FAIL: out/index.html 缺失"; exit 1; }
test -f out/sitemap.xml || { echo "FAIL: out/sitemap.xml 缺失"; exit 1; }
test -f out/robots.txt || { echo "FAIL: out/robots.txt 缺失"; exit 1; }

if grep -q "localhost" out/sitemap.xml; then
  echo "FAIL: sitemap.xml 含 localhost（NEXT_PUBLIC_SITE_URL 未生效）"
  exit 1
fi

echo "内容页产物："
SECTIONS="walkthrough endings locations achievements side-quests characters systems"
COUNT=0
for s in $SECTIONS; do
  find out/$s -name "*.html" 2>/dev/null | sort
  COUNT=$(( COUNT + $(find out/$s -name "*.html" 2>/dev/null | wc -l) ))
done
if [ "$COUNT" -eq 0 ]; then
  echo "FAIL: out/ 下没有内容页 html"
  exit 1
fi

if ! grep -q "btn-sq" out/index.html; then
  echo "FAIL: 首页未渲染攻略按钮网格（btn-sq）"
  exit 1
fi

echo "OK: 类型检查 + 构建 + 产物检查全部通过"

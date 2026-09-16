import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { SideRailAds } from "@/components/SideRailAds";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 深色主题默认开启（游戏站标配）；配色 token 见 globals.css @theme 注入点
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        {/* 本骨架无顶栏：首页由 Hero 大图直顶，内页由面包屑起头 */}
        {children}
        <Footer />
        <SideRailAds />
        <Analytics />
      </body>
    </html>
  );
}

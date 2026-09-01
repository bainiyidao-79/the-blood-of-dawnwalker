import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.heroSubtitle}`,
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 深色主题默认开启（游戏站标配）；配色 token 见 globals.css @theme 注入点
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <div className="mx-auto flex max-w-7xl">
          <Sidebar />
          <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
            {children}
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

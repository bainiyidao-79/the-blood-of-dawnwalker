import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { siteUrl } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/` },
};

export default function HomePage() {
  return <HomeView />;
}

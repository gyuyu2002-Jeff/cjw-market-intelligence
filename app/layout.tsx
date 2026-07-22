import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const serif = Noto_Serif_TC({ variable: "--font-serif", subsets: ["latin"], weight: ["600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "齋之味｜市場情報中樞",
    description: "彙整台灣、美國、澳洲與歐洲植物性食品市場情報，轉化為齋之味每日可執行的決策。",
    openGraph: { title: "齋之味｜市場情報中樞", description: "把每日產業訊號，變成下一步行動。", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "齋之味｜市場情報中樞", description: "把每日產業訊號，變成下一步行動。", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}

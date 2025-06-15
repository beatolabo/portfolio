import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "beatolabo's Music Portfolio",
  description: "音楽制作ポートフォリオ。 今まで作成した楽曲や、自己紹介などを掲載しております",
  keywords: "音楽制作, DTM, 作曲, リミックス, ポートフォリオ",
  authors: [{ name: "beatolabo" }],
  creator: "beatolabo",
  openGraph: {
    title: "beatolabo Music Portfolio",
    description: "音楽制作ポートフォリオ - 今まで作成した楽曲や、自己紹介などを掲載しております",
    type: "website",
    locale: "ja_JP",
    siteName: "beatolabo's Music Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "beatolabo's Music Portfolio",
    description: "音楽制作ポートフォリオ - 今まで作成した楽曲や、自己紹介などを掲載しております",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}

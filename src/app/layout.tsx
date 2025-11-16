import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YAMI DAO",
  description: "Mental Health Tech Collective - Privacy-focused DAO building open-source mental health technology",
  icons: {
    icon: [
      {
        url: "https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo-192x192.png",
    shortcut: "https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo.svg",
  },
  openGraph: {
    title: "YAMI DAO",
    description: "Mental Health Tech Collective - Privacy-focused DAO building open-source mental health technology",
    url: "https://yamidao.yami.ski",
    siteName: "YAMI DAO",
    images: [
      {
        url: "https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo.png",
        width: 1200,
        height: 1200,
        alt: "YAMI DAO",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YAMI DAO",
    description: "Mental Health Tech Collective - Privacy-focused DAO building open-source mental health technology",
    images: ["https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="yamidao-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

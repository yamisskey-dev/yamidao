import type { Metadata } from "next";
import { Nunito, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";

// やみはぶと同じ Nunito（欧文）＋ M PLUS Rounded 1c（和文）
const nunito = Nunito({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const mplus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mplus",
});

export const metadata: Metadata = {
  title: "YAMI DAO",
  description: "Open Mental Health - Privacy-focused DAO building open-source mental health technology",
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
    description: "Open Mental Health - Privacy-focused DAO building open-source mental health technology",
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
    description: "Open Mental Health - Privacy-focused DAO building open-source mental health technology",
    images: ["https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami.ski/yami-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} ${mplus.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="yamidao-theme"
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

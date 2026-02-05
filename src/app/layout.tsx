import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import "../styles/themes.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Subodh's Portfolio",
  description: "Subodh's Portfolio",
  icons: {
    icon: [
      { url: "/portfolio_18526710.png", type: "image/png", sizes: "any" },
    ],
    shortcut: [
      { url: "/portfolio_18526710.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/portfolio_18526710.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

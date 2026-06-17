import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider, themeInitScript } from "@/components/theme-provider";

// Inter — a clean, modern, SF-Pro-like UI typeface for all body and interface text.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono retained for code blocks, inline code, and kbd elements.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://nova-ai-chat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nova — A streaming AI assistant",
    template: "%s · Nova",
  },
  description:
    "Nova is a streaming AI assistant that answers in rich Markdown — code, tables, and lists, rendered live as it types. Built with Next.js, the Vercel AI SDK, and Streamdown.",
  applicationName: "Nova",
  keywords: [
    "AI chat",
    "streaming",
    "Markdown",
    "Next.js",
    "Vercel AI SDK",
    "Streamdown",
  ],
  authors: [{ name: "Nova" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Nova — A streaming AI assistant",
    description:
      "A streaming AI assistant that answers in rich Markdown, rendered live as it types.",
    siteName: "Nova",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova — A streaming AI assistant",
    description:
      "A streaming AI assistant that answers in rich Markdown, rendered live as it types.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the persisted theme before hydration to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

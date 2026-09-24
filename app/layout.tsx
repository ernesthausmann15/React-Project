import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MovieGrab — Film Index",
  description:
    "Search a living catalogue of cinema, then follow the threads from one film to the next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark font-sans antialiased", geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-transparent text-[var(--text)] antialiased transition-colors duration-700">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

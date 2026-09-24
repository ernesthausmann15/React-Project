import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import "./globals.css";

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
    <html lang="en" className="bg-obsidian">
      <body className="bg-obsidian text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

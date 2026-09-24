"use client";

import { useEffect, useState, type ReactNode } from "react";
import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Theme = "light" | "dark";

export default function AppShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("moviegrab-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme: Theme = current === "light" ? "dark" : "light";
      window.localStorage.setItem("moviegrab-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <div className={`app-shell theme-${theme} relative isolate min-h-screen`}>
      <AmbientBackground theme={theme} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

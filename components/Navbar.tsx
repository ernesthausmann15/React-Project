"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    pathname === href ? "nav-links active-link" : "nav-links";

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${
        theme === "light" ? "header-day" : "header-night"
      }`}
    >
      <div className="nav-ambient" aria-hidden="true">
        <span className="nav-sheen" />
        <span className="nav-glow nav-glow-a" />
        <span className="nav-glow nav-glow-b" />
        <span className="nav-scanline" />
      </div>

      <nav className="navbar" aria-label="Primary navigation">
        <Link href="/" className="navbar-logo" onClick={closeMenu}>
          <span className="brand-mark">
            <span className="brand-mark-core">MG</span>
            <span className="brand-mark-ring" aria-hidden="true" />
          </span>
          <span className="navbar-wordmark">
            Movie<span className="logo-accent">Grab</span>
          </span>
          <small className="navbar-tag">FILM INDEX</small>
        </Link>

        <button
          className={`menu-icon ${isOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={isOpen ? "nav-menu active" : "nav-menu"}>
          <Link href="/" className={linkClass("/")} onClick={closeMenu}>
            <span>01</span> Home
          </Link>
          <Link
            href="/movies"
            className={linkClass("/movies")}
            onClick={closeMenu}
          >
            <span>02</span> Browse
          </Link>
          <button
            className={`theme-toggle ${theme === "dark" ? "is-dark" : "is-light"}`}
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-orb" />
            </span>
            <span className="toggle-label">
              {theme === "dark" ? "NIGHT" : "DAY"}
            </span>
          </button>
        </div>
      </nav>

      <div className="nav-edge" aria-hidden="true" />
    </header>
  );
}

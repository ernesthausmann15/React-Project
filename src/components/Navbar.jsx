import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  // useState owns the mobile drawer. The callback closes it after navigation so
  // a route change never leaves an overlay floating above the new page.
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((current) => !current);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="brand-mark">
            <span>MG</span>
          </span>
          <span>
            Movie<span className="logo-accent">Grab</span>
          </span>
          <small>FILM INDEX</small>
        </NavLink>
        <button
          className="menu-icon"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span /> <span /> <span />
        </button>
        <div className={isOpen ? "nav-menu active" : "nav-menu"}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-links active-link" : "nav-links"
            }
            onClick={closeMenu}
          >
            <span>01</span> Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "nav-links active-link" : "nav-links"
            }
            onClick={closeMenu}
          >
            <span>02</span> Browse
          </NavLink>
          <button
            className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <span className="toggle-orb" />
            <span>{theme === "dark" ? "NIGHT" : "DAY"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

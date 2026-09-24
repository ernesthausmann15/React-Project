import Link from "next/link";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Browse archive", to: "/movies" },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <span className="brand-mark">MG</span>
            <span>MovieGrab</span>
          </Link>
          <p>A cinematic indexing interface for curious minds.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Navigate</span>
          {footerLinks.map((link) => (
            <Link key={link.to} href={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <span className="footer-label">Connect</span>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            Repository ↗
          </a>
          <a href="https://www.imdb.com" target="_blank" rel="noreferrer">
            IMDb ↗
          </a>
        </div>
        <div className="system-status">
          <span className="footer-label">System status</span>
          <span>
            <i className="status-dot" /> OMDb API: Connected
          </span>
          <span className="secure-status">⚡ Secure Protocol</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>MG / FILM INDEX // 2026</span>
        <span>Built for the next watchlist</span>
      </div>
    </footer>
  );
}

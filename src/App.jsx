import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";

// The root owns theme state so every route and shared component sees the same preference.
export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("moviegrab-theme") || "dark",
  );

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("moviegrab-theme", nextTheme);
  };

  return (
    <div className={`app-shell theme-${theme}`}>
      <BrowserRouter>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          {/* The detail route is intentionally singular: one movie, one stable URL. */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

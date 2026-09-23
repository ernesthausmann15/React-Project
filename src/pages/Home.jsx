import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { searchMovies } from "../api";
import { SkeletonGrid } from "../components/SkeletonCard";

export default function Home() {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    if (!term.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const data = await searchMovies(term.trim());
      setMovies(data.Search || []);
      setStatus("success");
    } catch (requestError) {
      setMovies([]);
      setError(requestError.message);
      setStatus("error");
    }
  }

  return (
    <main className="home-page page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Your personal film index</span>
          <h1>Find the next story worth your time.</h1>
          <p>
            Search a living catalogue of cinema, then follow the threads from
            one film to the next.
          </p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search titles, genres, or stars"
              aria-label="Search movies"
            />
            <button className="primary-button" type="submit">
              Search <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
        <div className="hero-stat">
          <strong>01</strong>
          <span>
            Search
            <br />
            discover
            <br />
            repeat
          </span>
        </div>
      </section>
      <section
        className="results-section"
        aria-live="polite"
        aria-busy={status === "loading"}
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">Instant discovery</span>
            <h2>
              {status === "success"
                ? `Results for “${term}”`
                : "Start with a classic"}
            </h2>
          </div>
          {status === "success" && (
            <button
              className="text-button"
              type="button"
              onClick={() => navigate("/movies", { state: { movies, term } })}
            >
              Open full browser →
            </button>
          )}
        </div>
        {status === "loading" && (
          <SkeletonGrid count={6} label="Searching movie results" />
        )}
        {error && <p className="status-message error-text">{error}</p>}
        {status === "idle" && (
          <div className="empty-state">
            <p>
              Try{" "}
              <button
                className="inline-button"
                type="button"
                onClick={() => setTerm("Arrival")}
              >
                Arrival
              </button>
              ,{" "}
              <button
                className="inline-button"
                type="button"
                onClick={() => setTerm("The Godfather")}
              >
                The Godfather
              </button>
              , or any title you cannot stop thinking about.
            </p>
          </div>
        )}
        <div
          className={
            status === "loading" ? "movie-grid results-hidden" : "movie-grid"
          }
        >
          {movies.slice(0, 6).map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={setSelectedMovie}
            />
          ))}
        </div>
      </section>
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}

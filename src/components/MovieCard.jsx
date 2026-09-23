import { Link } from "react-router-dom";

const FALLBACK_POSTER =
  "https://placehold.co/600x900/17202a/e8f0f2?text=No+Poster";

// Cards are deliberately presentational: pages own fetching and state changes.
export default function MovieCard({ movie, onSelect }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;
  // `onSelect` is a callback prop supplied by a page. Keeping it optional lets
  // the same card render related films without requiring modal state everywhere.
  return (
    <article className="movie-card">
      <Link
        to={`/movie/${movie.imdbID}`}
        className="movie-card-link"
        onClick={() => onSelect?.(movie)}
      >
        <div className="poster-wrap">
          <img src={poster} alt={`${movie.Title} poster`} loading="lazy" />
          <span className="poster-badge">{movie.Type || "film"}</span>
        </div>
        <div className="movie-card-copy">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
      <button
        className="card-action"
        type="button"
        onClick={() => onSelect?.(movie)}
      >
        Quick view
      </button>
    </article>
  );
}

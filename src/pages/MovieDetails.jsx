import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getMovie, searchByDirector } from "../api";
import { DetailSkeleton, SkeletonGrid } from "../components/SkeletonCard";

const FALLBACK_POSTER =
  "https://placehold.co/600x900/1f1f1f/ffffff?text=No+Poster";

export default function MovieDetails() {
  // useParams reads the `:id` segment from the address bar. React Router
  // re-renders this component when that segment changes, which makes the
  // effect below automatically load the newly requested movie.
  const { id } = useParams();
  // Each state hook owns one concern: primary data, dependent results, and
  // the request lifecycle exposed to the loading/error UI.
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    async function loadMovie() {
      setStatus("loading");
      setError("");
      setMovie(null);
      setRelated([]);
      try {
        const movieData = await getMovie(id, controller.signal);
        if (!active) return;
        setMovie(movieData);
        // OMDB's search parameter matches titles, not people. A director name
        // often comes back as "Movie not found!". That miss is optional context,
        // so it must not replace the movie the user just opened from search.
        if (movieData.Director && movieData.Director !== "N/A") {
          try {
            const relatedData = await searchByDirector(
              movieData.Director.split(",")[0],
              controller.signal,
            );
            if (active)
              setRelated(
                (relatedData.Search || [])
                  .filter((item) => item.imdbID !== id)
                  .slice(0, 4),
              );
          } catch (relatedError) {
            if (relatedError.name === "AbortError") throw relatedError;
          }
        }
        if (active) setStatus("success");
      } catch (requestError) {
        if (active && requestError.name !== "AbortError") {
          setError(requestError.message);
          setStatus("error");
        }
      }
    }
    loadMovie();
    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  if (status === "loading")
    return (
      <main className="page-shell details-page">
        <Link className="back-link" to="/movies">
          ← Back to browse
        </Link>
        <DetailSkeleton />
        <section className="related-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Continue the thread</span>
              <h2>Finding related titles</h2>
            </div>
          </div>
          <SkeletonGrid count={4} />
        </section>
      </main>
    );
  if (status === "error" || !movie)
    return (
      <main className="page-shell state-page">
        <span className="eyebrow">404 / unavailable</span>
        <h1>That title went missing.</h1>
        <p className="status-message error-text">
          {error || "Movie not found."}
        </p>
        <Link className="primary-button inline-link" to="/movies">
          Back to browse
        </Link>
      </main>
    );

  return (
    <main className="page-shell details-page">
      <Link className="back-link" to="/movies">
        ← Back to browse
      </Link>
      <section className="details-hero">
        <img
          className="details-poster"
          src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER}
          alt={`${movie.Title} poster`}
        />
        <div className="details-copy">
          <span className="eyebrow">Full record</span>
          <h1>{movie.Title}</h1>
          <p className="details-meta">
            {movie.Year} · {movie.Runtime} · {movie.Genre}
          </p>
          <p className="plot">{movie.Plot}</p>
          <dl className="details-facts">
            <div>
              <dt>Director</dt>
              <dd>{movie.Director}</dd>
            </div>
            <div>
              <dt>IMDb rating</dt>
              <dd>{movie.imdbRating} / 10</dd>
            </div>
            <div>
              <dt>Cast</dt>
              <dd>{movie.Actors}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Continue the thread</span>
            <h2>More by {movie.Director}</h2>
          </div>
        </div>
        <div className="movie-grid">
          {related.length ? (
            related.map((item) => <MovieCard key={item.imdbID} movie={item} />)
          ) : (
            <p className="status-message">No related titles found.</p>
          )}
        </div>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { searchMovies } from "../api";
import { SkeletonGrid } from "../components/SkeletonCard";

export default function Movies() {
  const location = useLocation();
  const [movies, setMovies] = useState(location.state?.movies || []);
  const [term] = useState(location.state?.term || "Batman");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("relevance");
  const [status, setStatus] = useState(movies.length ? "success" : "loading");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (status !== "loading") return;
    searchMovies(term)
      .then((data) => {
        setMovies(data.Search || []);
        setStatus("success");
      })
      .catch((requestError) => {
        setError(requestError.message);
        setStatus("error");
      });
  }, [status, term]);

  const visibleMovies = useMemo(() => {
    const filtered = movies.filter((movie) =>
      `${movie.Title} ${movie.Year}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );
    return [...filtered].sort((a, b) =>
      sort === "title"
        ? a.Title.localeCompare(b.Title)
        : sort === "newest"
          ? Number(b.Year) - Number(a.Year)
          : sort === "oldest"
            ? Number(a.Year) - Number(b.Year)
            : 0,
    );
  }, [filter, movies, sort]);

  return (
    <main className="page-shell browse-page" aria-busy={status === "loading"}>
      <div className="page-intro">
        <span className="eyebrow">The catalogue</span>
        <h1>Browse movies</h1>
        <p>
          Search results become a collection you can scan, sort, and open at
          your own pace.
        </p>
      </div>
      <FilterBar
        query={filter}
        onQueryChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        resultCount={visibleMovies.length}
      />
      {status === "loading" && (
        <SkeletonGrid count={8} label="Loading movie catalogue" />
      )}
      {error && <p className="status-message error-text">{error}</p>}
      <div
        className={
          status === "loading"
            ? "movie-grid browse-grid results-hidden"
            : "movie-grid browse-grid"
        }
      >
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={setSelectedMovie}
          />
        ))}
      </div>
      {status === "success" && !visibleMovies.length && (
        <div className="empty-state">
          <span className="empty-number">—</span>
          <p>No titles match that filter.</p>
        </div>
      )}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}

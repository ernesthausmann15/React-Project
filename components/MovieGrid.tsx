"use client";

import { useState } from "react";
import type { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";

interface MovieGridProps {
  movies: Movie[];
  className?: string;
  enableQuickView?: boolean;
}

export default function MovieGrid({
  movies,
  className = "movie-grid",
  enableQuickView = true,
}: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-container" aria-label="Movie results">
      <div className={className}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={enableQuickView ? setSelectedMovie : undefined}
          />
        ))}
      </div>
      {enableQuickView ? (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      ) : null}
    </section>
  );
}

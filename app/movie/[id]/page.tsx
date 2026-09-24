"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { DetailSkeleton, SkeletonGrid } from "@/components/SkeletonCard";
import { getMovie, searchByDirector } from "@/lib/api";
import { getErrorMessage, isAbortError } from "@/lib/errors";
import type { Movie, MovieDetails } from "@/types/movie";

const FALLBACK_POSTER =
  "https://placehold.co/600x900/121216/e8e8ec?text=No+Poster";

type DetailStatus = "loading" | "success" | "error";

function parseMovieId(value: string | string[] | undefined): string | null {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (Array.isArray(value) && typeof value[0] === "string" && value[0].trim()) {
    return value[0].trim();
  }
  return null;
}

export default function MoviePage() {
  const params = useParams();
  const id = parseMovieId(params.id);

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [related, setRelated] = useState<Movie[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [status, setStatus] = useState<DetailStatus>("loading");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setError("Missing movie id in the URL.");
      setMovie(null);
      setRelated([]);
      return;
    }

    let active = true;
    const controller = new AbortController();

    async function loadMovie(movieId: string) {
      setStatus("loading");
      setError("");
      setMovie(null);
      setRelated([]);
      setRelatedLoading(false);

      try {
        const movieData = await getMovie(movieId, controller.signal);
        if (!active) return;

        setMovie(movieData);
        setStatus("success");

        if (movieData.Director && movieData.Director !== "N/A") {
          const director = movieData.Director.split(",")[0]?.trim();
          if (director) {
            setRelatedLoading(true);
            try {
              const relatedData = await searchByDirector(
                director,
                controller.signal,
              );
              if (!active) return;
              const relatedMovies: Movie[] = (relatedData.Search ?? [])
                .filter((item) => item.imdbID !== movieId)
                .slice(0, 4);
              setRelated(relatedMovies);
            } catch (relatedError: unknown) {
              if (!active || isAbortError(relatedError)) return;
              // Primary record succeeded; related titles are optional.
              setRelated([]);
            } finally {
              if (active) setRelatedLoading(false);
            }
          }
        }
      } catch (requestError: unknown) {
        if (!active || isAbortError(requestError)) return;
        setMovie(null);
        setRelated([]);
        setError(
          getErrorMessage(requestError, "Movie not found. Please try again."),
        );
        setStatus("error");
      }
    }

    void loadMovie(id);

    return () => {
      active = false;
      controller.abort();
    };
  }, [id, reloadKey]);

  if (status === "loading") {
    return (
      <main className="page-shell details-page" aria-busy="true">
        <Link className="back-link" href="/movies">
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
          <SkeletonGrid count={4} label="Loading related titles" />
        </section>
      </main>
    );
  }

  if (status === "error" || !movie) {
    return (
      <main className="page-shell state-page">
        <span className="eyebrow">404 / unavailable</span>
        <h1>That title went missing.</h1>
        <p className="status-message error-text" role="alert">
          {error || "Movie not found."}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="primary-button" type="button" onClick={retry}>
            Try again
          </button>
          <Link className="text-button inline-link" href="/movies">
            Back to browse →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell details-page">
      <Link className="back-link" href="/movies">
        ← Back to browse
      </Link>
      <section className="details-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <section className="related-section" aria-busy={relatedLoading}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Continue the thread</span>
            <h2>More by {movie.Director}</h2>
          </div>
        </div>
        {relatedLoading ? (
          <SkeletonGrid count={4} label="Loading related titles" />
        ) : related.length > 0 ? (
          <div className="movie-grid">
            {related.map((item) => (
              <MovieCard key={item.imdbID} movie={item} />
            ))}
          </div>
        ) : (
          <p className="status-message">No related titles found.</p>
        )}
      </section>
    </main>
  );
}

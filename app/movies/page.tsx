"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import MovieGrid from "@/components/MovieGrid";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { searchMovies } from "@/lib/api";
import { getErrorMessage, isAbortError } from "@/lib/errors";
import type { Movie } from "@/types/movie";

type BrowseStatus = "loading" | "success" | "error";

interface BrowsePayload {
  movies: Movie[];
  term: string;
}

function isMovie(value: unknown): value is Movie {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.Title === "string" &&
    typeof candidate.Year === "string" &&
    typeof candidate.imdbID === "string" &&
    typeof candidate.Poster === "string"
  );
}

function readBrowsePayload(): BrowsePayload | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("moviegrab-browse");
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;

    const record = parsed as Record<string, unknown>;
    if (!Array.isArray(record.movies) || typeof record.term !== "string") {
      return null;
    }

    const movies = record.movies.filter(isMovie);
    if (!movies.length) return null;

    return { movies, term: record.term };
  } catch {
    return null;
  }
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("relevance");
  const [status, setStatus] = useState<BrowseStatus>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const payload = readBrowsePayload();
    if (payload?.movies.length) {
      setMovies(payload.movies);
      setStatus("success");
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function loadCatalogue() {
      setStatus("loading");
      setError("");
      try {
        const data = await searchMovies("Batman", 1, controller.signal);
        if (!active) return;
        setMovies(data.Search ?? []);
        setStatus("success");
      } catch (requestError: unknown) {
        if (!active || isAbortError(requestError)) return;
        setError(
          getErrorMessage(
            requestError,
            "Failed to load catalogue. Please try again.",
          ),
        );
        setStatus("error");
      }
    }

    void loadCatalogue();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const visibleMovies = useMemo(() => {
    const filtered = movies.filter((movie) =>
      `${movie.Title} ${movie.Year}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      if (sort === "title") return a.Title.localeCompare(b.Title);
      if (sort === "newest") return Number(b.Year) - Number(a.Year);
      if (sort === "oldest") return Number(a.Year) - Number(b.Year);
      return 0;
    });
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
      {status === "loading" ? (
        <SkeletonGrid count={8} label="Loading movie catalogue" />
      ) : null}
      {status === "error" ? (
        <div className="empty-state" role="alert">
          <span className="empty-number">!</span>
          <p className="status-message error-text">{error}</p>
        </div>
      ) : null}
      {status === "success" ? (
        <MovieGrid movies={visibleMovies} className="movie-grid browse-grid" />
      ) : null}
      {status === "success" && !visibleMovies.length ? (
        <div className="empty-state">
          <span className="empty-number">—</span>
          <p>No titles match that filter.</p>
        </div>
      ) : null}
    </main>
  );
}

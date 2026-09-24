/** Shared movie media types returned by OMDb search and detail endpoints. */
export type MovieType = "movie" | "series" | "episode" | "game";

/**
 * Lightweight movie summary from OMDb search (`s=`).
 * Used for grids, cards, and related-title lists.
 */
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType | string;
  Poster: string;
}

/**
 * Full movie record from OMDb by IMDb id (`i=`).
 * Extends the search summary with plot, cast, and ratings.
 */
export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface MovieRating {
  Source: string;
  Value: string;
}

import type { Movie, MovieDetails } from "@/types/movie";

/** OMDb always returns Response as the string "True" or "False". */
export type OmdbResponseFlag = "True" | "False";

/** Successful search payload (`s=` query). */
export interface OmdbSearchSuccess {
  Search: Movie[];
  totalResults: string;
  Response: "True";
}

/** Successful detail payload (`i=` query). */
export interface OmdbDetailSuccess extends MovieDetails {
  Response: "True";
}

/** Error payload returned when OMDb cannot fulfill the request. */
export interface OmdbErrorResponse {
  Response: "False";
  Error: string;
}

export type OmdbSearchResponse = OmdbSearchSuccess | OmdbErrorResponse;
export type OmdbDetailResponse = OmdbDetailSuccess | OmdbErrorResponse;

export type OmdbResponse = OmdbSearchResponse | OmdbDetailResponse;

/** Query parameters accepted by the OMDb HTTP API. */
export interface OmdbSearchParams {
  s: string;
  page?: number | string;
  type?: "movie" | "series" | "episode";
  y?: string;
}

export interface OmdbDetailParams {
  i: string;
  plot?: "short" | "full";
}

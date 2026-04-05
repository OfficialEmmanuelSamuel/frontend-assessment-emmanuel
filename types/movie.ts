// Core movie model used by listing and detail pages.
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date: string;
  overview?: string;
};

// Shape of paginated TMDB movie list responses.
export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

import { Movie, MoviesResponse } from "@/types/movie";

const API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = process.env.TMDB_BASE_URL!;

export async function getMovies(
  page = 1,
  search?: string,
  year?: string
): Promise<MoviesResponse> {
  if (search) {
    const searchUrl = new URL(`${BASE_URL}/search/movie`);
    searchUrl.searchParams.set("api_key", API_KEY);
    searchUrl.searchParams.set("query", search);
    searchUrl.searchParams.set("page", String(page));

    if (year) {
      searchUrl.searchParams.set("year", year);
    }

    const res = await fetch(searchUrl.toString(), { next: { revalidate: 60 } });

    if (!res.ok) throw new Error("Failed to fetch search results");
    return res.json();
  }

  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("page", String(page));

  if (year) {
    url.searchParams.set("primary_release_year", year);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}

export async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch movie");

  return res.json();
}

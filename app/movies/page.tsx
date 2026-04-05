import { getMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import EmptyState from "@/components/EmptyState";

type Props = {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    year?: string | string[];
  }>;
};

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams;
  const readParam = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

  const pageValue = Number(readParam(params.page));
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  const search = readParam(params.search)?.trim();
  const year = readParam(params.year)?.trim();

  const data = await getMovies(page, search, year);
  const resultCount = data.results.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white px-4 py-8 text-slate-800 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <header className="rounded-3xl bg-white/90 p-6 shadow-xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white rounded-lg py-2 px-6 bg-blue-950 w-60">
            Emanel MovieRoom
          </p>
          <h1 className="mt-3 text-3xl font-quicksand font-bold leading-tight text-slate-900 sm:text-4xl">
            Discover your next favorite movie
          </h1>
          <p className="mt-3 max-w-2xl font-quicksand font-semibold text-sm text-slate-600 sm:text-base">
            Search through TMDB, filter by release year, and explore rich movie
            details in a fast and shareable browsing experience.
          </p>
        </header>

        <section className="rounded-2xl  bg-white/90 p-4 shadow-lg sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-xl">
              <SearchBar />
            </div>
            <Filters />
          </div>
          <p className="mt-4 text-sm text-rose-700 font-medium">
            Showing {resultCount} result{resultCount === 1 ? "" : "s"}
            {search ? ` for "${search}"` : ""}.
          </p>
        </section>

      {data.results.length ? (
        <>
          <MovieGrid movies={data.results} />
          <Pagination
            page={page}
            totalPages={data.total_pages}
            search={search}
            year={year}
          />
        </>
      ) : (
        <EmptyState />
      )}
      </div>
    </div>
  );
}

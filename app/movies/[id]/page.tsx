import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMovie } from "@/lib/tmdb";

type Props = {
  // In this Next.js version, route params are provided as a Promise in page props.
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Resolve the dynamic segment and fetch movie data for SEO metadata.
  const { id } = await params;
  const movie = await getMovie(id);

  // Provide sensible fallbacks when overview or poster is missing.
  const description =
    movie.overview || `Read details for ${movie.title} on Emanel MovieRoom.`;
  const image = movie.poster_path
    ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
    : undefined;

  return {
    title: movie.title,
    description,
    openGraph: {
      title: movie.title,
      description,
      images: image,
    },
  };
}

export default async function MovieDetail({ params }: Props) {
  // Fetch the movie once for page rendering.
  const { id } = await params;
  const movie = await getMovie(id);

  // Build image URLs with graceful fallback from backdrop to poster.
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : posterUrl;

  // Extract the display year while guarding against empty release dates.
  const releaseYear = movie.release_date?.slice(0, 4) || "Unknown";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-10 via-white to-sky-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <nav className="text-sm">
          <Link
            className="rounded-lg font-quicksand bg-blue-950 px-3 py-2 text-white transition hover:border-sky-400 hover:text-white-600"
            href="/movies"
          >
            Back to Emanel MovieRoom
          </Link>
        </nav>

        <article className="overflow-hidden rounded-3xl bg-white/95 shadow-2xl">
          <div className="relative h-64 w-full bg-sky-100 sm:h-80 lg:h-96">
            {backdropUrl ? (
              <Image
                src={backdropUrl}
                alt={`${movie.title} backdrop`}
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-80"
              />
            ) : (
              // Keep structure stable when no backdrop exists.
              <div className="h-full w-full bg-sky-100" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-transparent" />
          </div>

          <div className="-mt-24 grid gap-6 p-6 sm:p-8 lg:grid-cols-[260px_1fr] lg:items-end">
            <div className="relative mx-auto h-[360px] w-[240px] overflow-hidden rounded-2xl bg-slate-100 shadow-2xl lg:mx-0">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              ) : (
                // Friendly empty-state when poster art is unavailable.
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  No poster available
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white rounded-lg py-2 px-6 bg-blue-950 w-max">
                Emanel MovieRoom
              </p>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-medium">
                  Rating {movie.vote_average.toFixed(1)}
                </span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-medium">
                  Released {releaseYear}
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-relaxed font-medium text-slate-600 sm:text-base">
                {movie.overview || "No overview available for this movie yet."}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

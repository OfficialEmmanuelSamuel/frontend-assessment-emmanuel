import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const releaseYear = movie.release_date?.slice(0, 4) || "N/A";

  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <article className="overflow-hidden rounded-2xl shadow-sm shadow-gray-600 bg-white/95 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950">
        <div className="relative w-full overflow-hidden bg-slate-100 aspect-[4/5] sm:aspect-[5/6]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover object-center transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
              No poster available
            </div>
          )}
        </div>

        <div className="space-y-2 p-4">
          <h2 className="line-clamp-1 text-base font-semibold text-slate-900">
            {movie.title}
          </h2>
          <div className="flex items-center font-medium justify-between text-sm text-slate-600">
            <p>Rating: {movie.vote_average.toFixed(1)}</p>
            <p>{releaseYear}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  search?: string;
  year?: string;
};

export default function Pagination({ page, totalPages, search, year }: Props) {
  const createHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));

    if (search) {
      params.set("search", search);
    }

    if (year) {
      params.set("year", year);
    }

    return `/movies?${params.toString()}`;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {page > 1 && (
        <Link
          className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white transition hover:border-sky-400 hover:text-white"
          href={createHref(page - 1)}
        >
          Prev
        </Link>
      )}
      <span className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      {page < totalPages && (
        <Link
          className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white transition hover:border-sky-400 hover:text-white"
          href={createHref(page + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
}

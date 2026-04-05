"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState<string>(params.get("search") ?? "");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    const currentSearch = params.get("search") ?? "";

    if (trimmedQuery === currentSearch) {
      return;
    }

    const newParams = new URLSearchParams(params.toString());

    if (trimmedQuery) newParams.set("search", trimmedQuery);
    else newParams.delete("search");

    newParams.set("page", "1");
    const queryString = newParams.toString();
    router.replace(`/movies${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [debouncedQuery, params, router]);

  return (
    <input
      placeholder="Search movies..."
      className="w-full rounded-xl font-quicksand shadow-sm shadow-gray-600 bg-white px-4 py-3 text-base text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

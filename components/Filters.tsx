"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const handleYear = (year: string) => {
    // Clone current params so search text stays intact while year filter changes.
    const newParams = new URLSearchParams(params.toString());

    if (year) newParams.set("year", year);
    else newParams.delete("year");

    // Always restart from page 1 when filters change to avoid invalid page states.
    newParams.set("page", "1");

    const queryString = newParams.toString();
    router.push(`/movies${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <select
      className="rounded-xl font-quicksand shadow-sm shadow-gray-600 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-400 focus:outline-none"
      value={params.get("year") ?? ""}
      onChange={(e) => handleYear(e.target.value)}
    >
      <option value="">All Years</option>
      <option value="2026">2026</option>
      <option value="2025">2025</option>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
    </select>
  );
}

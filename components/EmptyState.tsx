export default function EmptyState() {
  return (
    <div className="mt-8 rounded-2xl font-quicksand bg-white/95 p-8 text-center shadow-lg">
      <h2 className="text-xl font-semibold text-slate-900">No movies found</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Try a different search term or change the year filter.
      </p>
    </div>
  );
}

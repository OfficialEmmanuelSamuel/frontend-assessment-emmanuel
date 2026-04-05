export default function Loading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-10 w-full rounded bg-gray-200" />
      <div className="h-10 w-40 rounded bg-gray-200" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-80 rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

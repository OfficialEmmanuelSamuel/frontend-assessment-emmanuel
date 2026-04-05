"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="p-6 space-y-3">
      <h2 className="text-xl font-semibold">Unable to load movies right now</h2>
      <p className="text-sm text-gray-600">
        Please try again in a moment. If this keeps happening, check your API
        key and network connection.
      </p>
      <p className="text-xs text-gray-500">{error.message}</p>
      <button
        type="button"
        className="rounded bg-black px-4 py-2 text-white"
        onClick={reset}
      >
        Retry
      </button>
    </div>
  );
}

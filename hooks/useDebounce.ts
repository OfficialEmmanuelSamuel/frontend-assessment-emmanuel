import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Delay propagating value changes until input has settled for `delay` ms.
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel stale timers whenever value/delay changes or component unmounts.
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

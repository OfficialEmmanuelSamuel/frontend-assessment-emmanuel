import { act, fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

const navigationMocks = vi.hoisted(() => ({
  replace: vi.fn(),
  queryString: "",
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: navigationMocks.replace,
  }),
  useSearchParams: () => ({
    toString: () => navigationMocks.queryString,
    get: (key: string) => new URLSearchParams(navigationMocks.queryString).get(key),
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigationMocks.replace.mockReset();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  it("updates the URL with debounce and resets page to 1", () => {
    navigationMocks.queryString = "year=2024&page=3";
    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText("Search movies..."), {
      target: { value: "dune" },
    });

    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(navigationMocks.replace).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(navigationMocks.replace).toHaveBeenCalledWith(
      "/movies?year=2024&page=1&search=dune",
      { scroll: false }
    );
  });

  it("does not navigate when input equals the current URL search value", () => {
    navigationMocks.queryString = "search=matrix&page=2";
    render(<SearchBar />);

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(navigationMocks.replace).not.toHaveBeenCalled();
  });
});

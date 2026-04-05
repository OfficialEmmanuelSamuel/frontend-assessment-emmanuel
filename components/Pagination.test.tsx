import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import type { ReactNode } from "react";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("Pagination", () => {
  it("preserves existing search and filter params in navigation links", () => {
    render(<Pagination page={2} totalPages={5} search="dune" year="2024" />);

    const prev = screen.getByRole("link", { name: "Prev" });
    const next = screen.getByRole("link", { name: "Next" });

    expect(prev).toHaveAttribute("href", "/movies?page=1&search=dune&year=2024");
    expect(next).toHaveAttribute("href", "/movies?page=3&search=dune&year=2024");
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("hides unavailable controls at boundaries", () => {
    const { rerender } = render(<Pagination page={1} totalPages={1} />);

    expect(screen.queryByRole("link", { name: "Prev" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Next" })).not.toBeInTheDocument();

    rerender(<Pagination page={3} totalPages={3} />);

    expect(screen.getByRole("link", { name: "Prev" })).toHaveAttribute(
      "href",
      "/movies?page=2"
    );
    expect(screen.queryByRole("link", { name: "Next" })).not.toBeInTheDocument();
  });
});

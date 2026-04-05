import type { Metadata } from "next";
import { Lato, Quicksand } from "next/font/google";
import "./globals.css";

// Brand fonts are loaded once in the root layout and exposed as CSS variables.
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

// Global metadata used as defaults for all routes.
export const metadata: Metadata = {
  title: {
    default: "Emanel MovieRoom",
    template: "%s | Emanel MovieRoom",
  },
  description:
    "Emanel MovieRoom helps you discover trending films, search by title, and explore detailed movie insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables are attached to html so utility classes can consume them project-wide.
    <html
      lang="en"
      className={`${quicksand.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

import { redirect } from "next/navigation";

export default function Home() {
  // Keep the root route focused by sending users to the movie listing page.
  redirect("/movies");
}

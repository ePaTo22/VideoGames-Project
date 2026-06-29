import { CatalogExperience } from "@/components/catalog-experience";
import { getGames } from "@/lib/free-to-game";

export default async function Home() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(79,209,197,0.18),transparent_32rem),linear-gradient(135deg,#101114_0%,#171a1f_48%,#221d18_100%)] px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <CatalogExperience games={games} />
    </main>
  );
}

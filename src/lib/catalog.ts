import type { CatalogFilters, GameSummary } from "@/lib/types";

export const ALL_VALUE = "all";
export const PAGE_SIZE = 12;

export function getUniqueOptions(
  games: GameSummary[],
  field: "genre" | "platform",
): string[] {
  return Array.from(new Set(games.map((game) => game[field]).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function filterAndSortGames(
  games: GameSummary[],
  filters: CatalogFilters,
): GameSummary[] {
  const query = filters.query.trim().toLocaleLowerCase();

  const filtered = games.filter((game) => {
    const matchesQuery =
      query.length === 0 ||
      game.title.toLocaleLowerCase().includes(query) ||
      game.shortDescription.toLocaleLowerCase().includes(query) ||
      game.publisher.toLocaleLowerCase().includes(query);

    const matchesGenre = filters.genre === ALL_VALUE || game.genre === filters.genre;
    const matchesPlatform =
      filters.platform === ALL_VALUE || game.platform === filters.platform;

    return matchesQuery && matchesGenre && matchesPlatform;
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return dateValue(b.releaseDate) - dateValue(a.releaseDate);
      case "oldest":
        return dateValue(a.releaseDate) - dateValue(b.releaseDate);
      default:
        return 0;
    }
  });
}

export function paginateGames(games: GameSummary[], page: number): GameSummary[] {
  return games.slice(0, page * PAGE_SIZE);
}

function dateValue(value: string): number {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

import { describe, expect, it } from "vitest";

import {
  ALL_VALUE,
  filterAndSortGames,
  getUniqueOptions,
  paginateGames,
} from "./catalog";
import { sampleGames } from "../test/fixtures";

describe("catalog utilities", () => {
  it("filters by search text, genre, and platform", () => {
    const result = filterAndSortGames(sampleGames, {
      query: "arena",
      genre: "Shooter",
      platform: "PC (Windows)",
      sort: "relevance",
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Neon Arena");
  });

  it("sorts by newest release date", () => {
    const result = filterAndSortGames(sampleGames, {
      query: "",
      genre: ALL_VALUE,
      platform: ALL_VALUE,
      sort: "newest",
    });

    expect(result.map((game) => game.title)).toEqual([
      "Neon Arena",
      "Aether Cards",
      "Tactical Bloom",
    ]);
  });

  it("returns sorted unique filter options", () => {
    expect(getUniqueOptions(sampleGames, "genre")).toEqual([
      "Card Game",
      "Shooter",
      "Strategy",
    ]);
  });

  it("paginates by page size multiplier", () => {
    expect(paginateGames(sampleGames, 1)).toHaveLength(3);
  });
});

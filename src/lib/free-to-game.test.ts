import { describe, expect, it } from "vitest";

import { normalizeGame, normalizeGameDetail } from "./free-to-game";

describe("FreeToGame normalization", () => {
  it("maps API summary fields to the app contract", () => {
    const game = normalizeGame({
      id: 540,
      title: "Overwatch 2",
      thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
      short_description: "A hero-focused team shooter.",
      game_url: "https://www.freetogame.com/open/overwatch-2",
      genre: "Shooter",
      platform: "PC (Windows)",
      publisher: "Activision Blizzard",
      developer: "Blizzard Entertainment",
      release_date: "2022-10-04",
      freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
    });

    expect(game).toEqual({
      id: 540,
      title: "Overwatch 2",
      thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
      shortDescription: "A hero-focused team shooter.",
      genre: "Shooter",
      platform: "PC (Windows)",
      publisher: "Activision Blizzard",
      developer: "Blizzard Entertainment",
      releaseDate: "2022-10-04",
      profileUrl: "https://www.freetogame.com/overwatch-2",
    });
  });

  it("normalizes detail fields with safe fallbacks", () => {
    const game = normalizeGameDetail({
      id: 1,
      title: "Fallback Quest",
      thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg",
      short_description: "Short text.",
      description: "",
      game_url: "https://www.freetogame.com/open/fallback-quest",
      genre: "MMORPG",
      platform: "PC (Windows)",
      publisher: "Studio",
      developer: "Studio",
      release_date: "2021-01-01",
      freetogame_profile_url: "",
    });

    expect(game.description).toBe("Short text.");
    expect(game.screenshots).toEqual([]);
    expect(game.profileUrl).toBe(
      "https://www.freetogame.com/open/fallback-quest",
    );
  });
});

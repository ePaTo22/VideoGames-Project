import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

describe("GET /api/games", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns normalized games from FreeToGame", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
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
          },
        ],
      }),
    );

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.games[0].shortDescription).toBe(
      "A hero-focused team shooter.",
    );
  });

  it("returns a 502 response when the source fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }),
    );

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(502);
    expect(payload.message).toBe("FreeToGame request failed with 503");
  });
});

import type { GameDetail, GameSummary } from "@/lib/types";

const API_BASE_URL = "https://www.freetogame.com/api";
const REVALIDATE_SECONDS = 60 * 60 * 6;

type FreeToGameSummary = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

type FreeToGameDetail = FreeToGameSummary & {
  description: string;
  minimum_system_requirements?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
  screenshots?: {
    id: number;
    image: string;
  }[];
};

export function normalizeGame(raw: FreeToGameSummary): GameSummary {
  return {
    id: raw.id,
    title: raw.title,
    thumbnail: raw.thumbnail,
    shortDescription: raw.short_description,
    genre: raw.genre,
    platform: raw.platform,
    publisher: raw.publisher,
    developer: raw.developer,
    releaseDate: raw.release_date,
    profileUrl: raw.freetogame_profile_url || raw.game_url,
  };
}

export function normalizeGameDetail(raw: FreeToGameDetail): GameDetail {
  return {
    ...normalizeGame(raw),
    description: raw.description || raw.short_description,
    minimumSystemRequirements: raw.minimum_system_requirements,
    screenshots: raw.screenshots ?? [],
  };
}

async function fetchFreeToGame<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`FreeToGame request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getGames(): Promise<GameSummary[]> {
  const games = await fetchFreeToGame<FreeToGameSummary[]>("/games");
  return games.map(normalizeGame);
}

export async function getGameDetail(id: string): Promise<GameDetail> {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    throw new Error("Invalid game id");
  }

  const game = await fetchFreeToGame<FreeToGameDetail>(`/game?id=${numericId}`);
  return normalizeGameDetail(game);
}

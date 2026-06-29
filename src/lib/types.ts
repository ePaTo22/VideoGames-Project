export type GameSummary = {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  releaseDate: string;
  profileUrl: string;
};

export type GameDetail = GameSummary & {
  description: string;
  minimumSystemRequirements?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
  screenshots: {
    id: number;
    image: string;
  }[];
};

export type SortKey =
  | "relevance"
  | "title-asc"
  | "title-desc"
  | "newest"
  | "oldest";

export type CatalogFilters = {
  query: string;
  genre: string;
  platform: string;
  sort: SortKey;
};

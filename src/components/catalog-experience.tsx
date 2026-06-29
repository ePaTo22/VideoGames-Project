"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { FavoriteButton } from "@/components/favorite-button";
import {
  ALL_VALUE,
  PAGE_SIZE,
  filterAndSortGames,
  getUniqueOptions,
  paginateGames,
} from "@/lib/catalog";
import type { CatalogFilters, GameSummary, SortKey } from "@/lib/types";

type CatalogExperienceProps = {
  games: GameSummary[];
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Featured" },
  { value: "title-asc", label: "A-Z" },
  { value: "title-desc", label: "Z-A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export function CatalogExperience({ games }: CatalogExperienceProps) {
  const [filters, setFilters] = useState<CatalogFilters>({
    query: "",
    genre: ALL_VALUE,
    platform: ALL_VALUE,
    sort: "relevance",
  });
  const [page, setPage] = useState(1);

  const genres = useMemo(() => getUniqueOptions(games, "genre"), [games]);
  const platforms = useMemo(() => getUniqueOptions(games, "platform"), [games]);
  const filteredGames = useMemo(
    () => filterAndSortGames(games, filters),
    [filters, games],
  );
  const visibleGames = paginateGames(filteredGames, page);
  const canLoadMore = visibleGames.length < filteredGames.length;

  function updateFilter<Key extends keyof CatalogFilters>(
    key: Key,
    value: CatalogFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters({
      query: "",
      genre: ALL_VALUE,
      platform: ALL_VALUE,
      sort: "relevance",
    });
    setPage(1);
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <header className="grid gap-6 py-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div className="space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#4fd1c5]">
            Free-to-play discovery
          </p>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              PlayIndex
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#c7ced8] sm:text-lg">
              A fast, searchable catalog of free videogames, built with Next.js
              and powered by FreeToGame.
            </p>
          </div>
        </div>
        <div className="rounded-md border border-white/12 bg-[#181b20]/80 p-5 shadow-2xl shadow-black/25">
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Games" value={games.length.toString()} />
            <Stat label="Genres" value={genres.length.toString()} />
            <Stat label="Platforms" value={platforms.length.toString()} />
          </div>
        </div>
      </header>

      <section className="rounded-md border border-white/12 bg-[#181b20]/85 p-4 shadow-xl shadow-black/20">
        <div className="grid gap-3 md:grid-cols-[minmax(16rem,1fr)_12rem_12rem_10rem_auto]">
          <label className="flex flex-col gap-2 text-sm font-medium text-[#c7ced8]">
            Search
            <input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Try shooter, anime, tactical..."
              className="h-11 rounded-md border border-white/12 bg-[#101114] px-3 text-white outline-none transition placeholder:text-[#788391] focus:border-[#4fd1c5]"
            />
          </label>

          <FilterSelect
            label="Genre"
            value={filters.genre}
            onChange={(value) => updateFilter("genre", value)}
            options={genres}
          />

          <FilterSelect
            label="Platform"
            value={filters.platform}
            onChange={(value) => updateFilter("platform", value)}
            options={platforms}
          />

          <label className="flex flex-col gap-2 text-sm font-medium text-[#c7ced8]">
            Sort
            <select
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value as SortKey)
              }
              className="h-11 rounded-md border border-white/12 bg-[#101114] px-3 text-white outline-none transition focus:border-[#4fd1c5]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="h-11 self-end rounded-md border border-white/12 bg-white/8 px-4 text-sm font-semibold text-white transition hover:border-[#f7b955]/70 hover:bg-[#f7b955]/15"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#a7b0bd]">
            Showing {visibleGames.length} of {filteredGames.length} matches
          </p>
          <a
            href="https://www.freetogame.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[#4fd1c5] hover:text-[#f7b955]"
          >
            Data by FreeToGame
          </a>
        </div>

        {visibleGames.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleGames.map((game) => (
              <article
                key={game.id}
                className="group overflow-hidden rounded-md border border-white/12 bg-[#181b20] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-[#4fd1c5]/45"
              >
                <Link href={`/games/${game.id}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#101114]">
                    <Image
                      src={game.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/games/${game.id}`}
                        className="line-clamp-2 text-lg font-bold text-white hover:text-[#4fd1c5]"
                      >
                        {game.title}
                      </Link>
                      <p className="mt-1 text-sm text-[#a7b0bd]">
                        {game.publisher}
                      </p>
                    </div>
                    <FavoriteButton gameId={game.id} title={game.title} compact />
                  </div>

                  <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#c7ced8]">
                    {game.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-md bg-[#4fd1c5]/15 px-2.5 py-1 text-[#9ff0e8]">
                      {game.genre}
                    </span>
                    <span className="rounded-md bg-[#f7b955]/15 px-2.5 py-1 text-[#ffd98a]">
                      {game.platform}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-white/20 bg-[#181b20]/80 p-10 text-center">
            <h2 className="text-2xl font-bold text-white">No games found</h2>
            <p className="mx-auto mt-2 max-w-md text-[#a7b0bd]">
              Try a broader search or clear a filter to get the catalog moving
              again.
            </p>
          </div>
        )}

        {canLoadMore ? (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              className="h-12 rounded-md bg-[#4fd1c5] px-6 text-sm font-black text-[#101114] transition hover:bg-[#f7b955]"
            >
              Load{" "}
              {Math.min(PAGE_SIZE, filteredGames.length - visibleGames.length)}{" "}
              more
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[#101114] px-3 py-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#a7b0bd]">
        {label}
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#c7ced8]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-white/12 bg-[#101114] px-3 text-white outline-none transition focus:border-[#4fd1c5]"
      >
        <option value={ALL_VALUE}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

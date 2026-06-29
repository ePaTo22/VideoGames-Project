"use client";

import { useState } from "react";

const STORAGE_KEY = "playindex:saved-games";

type FavoriteButtonProps = {
  gameId: number;
  title: string;
  compact?: boolean;
};

export function FavoriteButton({
  gameId,
  title,
  compact = false,
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState<number[]>(readSavedGames);
  const isSaved = saved.includes(gameId);

  function toggleSaved() {
    const next = isSaved
      ? saved.filter((id) => id !== gameId)
      : [...saved, gameId];

    setSaved(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      aria-pressed={isSaved}
      aria-label={`${isSaved ? "Remove" : "Save"} ${title}`}
      title={`${isSaved ? "Remove" : "Save"} ${title}`}
      className={`inline-flex h-10 items-center justify-center border border-white/15 bg-white/8 text-sm font-semibold text-white transition hover:border-[#4fd1c5]/70 hover:bg-[#4fd1c5]/15 ${
        compact ? "aspect-square rounded-md px-0" : "rounded-md px-4"
      }`}
    >
      {isSaved ? "Saved" : compact ? "+" : "Save"}
    </button>
  );
}

function readSavedGames(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

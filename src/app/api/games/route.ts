import { NextResponse } from "next/server";

import { getGames } from "@/lib/free-to-game";

export async function GET() {
  try {
    const games = await getGames();
    return NextResponse.json({ games });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch games";

    return NextResponse.json({ message }, { status: 502 });
  }
}

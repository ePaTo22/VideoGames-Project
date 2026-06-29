import { NextResponse } from "next/server";

import { getGameDetail } from "@/lib/free-to-game";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const game = await getGameDetail(id);
    return NextResponse.json({ game });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch game detail";
    const status = message === "Invalid game id" ? 400 : 502;

    return NextResponse.json({ message }, { status });
  }
}

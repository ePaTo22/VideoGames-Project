import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/favorite-button";
import { getGameDetail } from "@/lib/free-to-game";

type GameDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const game = await getGameDetail(id).catch(() => null);

  if (!game) {
    notFound();
  }

  const heroImage = game.screenshots[0]?.image || game.thumbnail;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(247,185,85,0.16),transparent_30rem),linear-gradient(135deg,#101114_0%,#181b20_52%,#13211f_100%)] px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <nav className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-md border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#4fd1c5]/70 hover:bg-[#4fd1c5]/15"
          >
            Back
          </Link>
          <FavoriteButton gameId={game.id} title={game.title} />
        </nav>

        <section className="grid overflow-hidden rounded-md border border-white/12 bg-[#181b20] shadow-2xl shadow-black/30 lg:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
          <div className="relative min-h-[18rem] bg-[#101114] sm:min-h-[26rem] lg:min-h-full">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="space-y-6 p-5 sm:p-8">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-md bg-[#4fd1c5]/15 px-2.5 py-1 text-[#9ff0e8]">
                  {game.genre}
                </span>
                <span className="rounded-md bg-[#f7b955]/15 px-2.5 py-1 text-[#ffd98a]">
                  {game.platform}
                </span>
              </div>
              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                {game.title}
              </h1>
              <p className="text-base leading-7 text-[#c7ced8]">
                {game.description}
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              <Meta label="Publisher" value={game.publisher} />
              <Meta label="Developer" value={game.developer} />
              <Meta label="Release" value={game.releaseDate} />
              <Meta label="Platform" value={game.platform} />
            </dl>

            <a
              href={game.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-md bg-[#4fd1c5] px-5 text-sm font-black text-[#101114] transition hover:bg-[#f7b955]"
            >
              View on FreeToGame
            </a>
          </div>
        </section>

        {game.screenshots.length > 1 ? (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {game.screenshots.slice(1, 4).map((screenshot) => (
              <div
                key={screenshot.id}
                className="relative aspect-[16/9] overflow-hidden rounded-md border border-white/12 bg-[#181b20]"
              >
                <Image
                  src={screenshot.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </section>
        ) : null}

        {game.minimumSystemRequirements ? (
          <section className="rounded-md border border-white/12 bg-[#181b20] p-5 sm:p-6">
            <h2 className="text-xl font-black text-white">
              System Requirements
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(game.minimumSystemRequirements).map(([key, value]) =>
                value ? <Meta key={key} label={key} value={value} /> : null,
              )}
            </dl>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#101114] p-3">
      <dt className="text-xs uppercase tracking-[0.18em] text-[#a7b0bd]">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

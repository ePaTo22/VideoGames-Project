import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#101114] px-4 text-white">
      <div className="w-full max-w-lg rounded-md border border-white/12 bg-[#181b20] p-8 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#f7b955]">
          Not found
        </p>
        <h1 className="mt-3 text-3xl font-black">
          That game is not in the catalog
        </h1>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#4fd1c5] px-5 text-sm font-black text-[#101114] transition hover:bg-[#f7b955]"
        >
          Browse games
        </Link>
      </div>
    </main>
  );
}

"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#101114] px-4 text-white">
      <div className="w-full max-w-lg rounded-md border border-white/12 bg-[#181b20] p-8 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#ff7a7a]">
          Catalog unavailable
        </p>
        <h1 className="mt-3 text-3xl font-black">Could not load games</h1>
        <p className="mt-3 text-[#a7b0bd]">
          The data source did not respond correctly. Try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 h-11 rounded-md bg-[#4fd1c5] px-5 text-sm font-black text-[#101114] transition hover:bg-[#f7b955]"
        >
          Retry
        </button>
      </div>
    </main>
  );
}

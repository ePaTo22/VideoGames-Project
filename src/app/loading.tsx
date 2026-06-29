export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#101114] px-4 text-white">
      <div className="w-full max-w-md rounded-md border border-white/12 bg-[#181b20] p-6 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#4fd1c5]">
          Loading catalog
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#4fd1c5]" />
        </div>
      </div>
    </main>
  );
}

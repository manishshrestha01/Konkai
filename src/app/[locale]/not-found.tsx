import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-paper px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.5rem)] leading-tight text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-ink-mute">
          This page doesn&apos;t exist. Try the restaurant homepage.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex min-h-12 items-center border border-ink bg-ink px-7 text-[0.75rem] font-medium tracking-[0.14em] text-paper uppercase transition-colors hover:border-accent hover:bg-accent"
        >
          Konkai Sushi House
        </Link>
      </div>
    </main>
  );
}

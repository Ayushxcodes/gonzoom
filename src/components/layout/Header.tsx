import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 p-4">
        <Link href="/" className="text-lg font-bold">
          Gonzoom
        </Link>

        <nav className="hidden gap-4 md:flex">
          <Link href="/stories" className="text-sm font-medium">
            Politics
          </Link>
          <Link href="/region" className="text-sm font-medium">
            Region
          </Link>
          <Link href="/campaigns" className="text-sm font-medium">
            Campaigns
          </Link>
          <Link href="/podcasts" className="text-sm font-medium">
            Podcasts
          </Link>
          <Link href="/contribute" className="ml-4 rounded-md bg-slate-900 px-3 py-1 text-sm text-white">
            Contribute
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <input
            aria-label="Search"
            placeholder="Search"
            className="hidden rounded-md border px-3 py-1 text-sm md:block"
          />
        </div>
      </div>
    </header>
  );
}

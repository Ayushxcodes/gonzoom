import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white/90">
      <div className="mx-auto max-w-6xl space-y-6 p-6 text-sm text-slate-600">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <div>
            <div className="text-lg font-semibold">Gonzoom</div>
            <div className="text-xs">Documentary • Podcasts • Citizen reporting</div>
          </div>

          <div className="flex gap-4">
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>

        <div className="text-xs text-slate-500">© {new Date().getFullYear()} Gonzoom</div>
      </div>
    </footer>
  );
}

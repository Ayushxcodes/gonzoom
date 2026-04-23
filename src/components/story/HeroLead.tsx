import Link from "next/link";

type Props = {
  title?: string;
  summary?: string;
  podcastSlug?: string;
  videoSlug?: string;
  storySlug?: string;
};

export default function HeroLead({
  title = "Investigative Lead: The Story That Matters",
  summary = "A concise one-line standfirst introducing the investigation and why it matters.",
  podcastSlug = "sample-episode",
  videoSlug = "sample-video",
  storySlug = "important-story",
}: Props) {
  return (
    <section aria-labelledby="hero" className="grid gap-6 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <h1 id="hero" className="mb-3 text-4xl font-bold leading-tight">
          {title}
        </h1>
        <p className="mb-6 max-w-xl text-lg text-slate-700">{summary}</p>

        <div className="flex gap-3">
          <Link href={`/podcasts/${podcastSlug}`} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
            Listen
          </Link>
          <Link href={`/watch/${videoSlug}`} className="rounded border px-4 py-2 text-sm">
            Watch
          </Link>
          <Link href={`/stories/${storySlug}`} className="rounded border px-4 py-2 text-sm">
            Read analysis
          </Link>
        </div>
      </div>

      <div className="order-1 aspect-video w-full overflow-hidden rounded bg-zinc-100 lg:order-2">
        <div className="flex h-full items-center justify-center text-sm text-slate-500">Large visual</div>
      </div>
    </section>
  );
}

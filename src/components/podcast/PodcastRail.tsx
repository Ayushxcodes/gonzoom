import PodcastCard from "@/components/podcast/podcast-card";
import { getPodcasts } from "@/features/podcasts/queries";

export default async function PodcastRail() {
  const podcasts = await getPodcasts()

  return (
    <section aria-labelledby="podcasts">
      <h2 id="podcasts" className="mb-6 text-2xl font-semibold">
        Latest Voices
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {podcasts.map((p: any) => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
    </section>
  );
}

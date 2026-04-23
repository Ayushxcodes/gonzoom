import PodcastCard from "@/components/podcast/podcast-card";

const sample = [
  {
    id: "1",
    title: "Voices: Episode One",
    slug: "voices-1",
    summary: "Short dispatch from the field.",
    audioUrl: "/sample-audio-1.mp3",
    durationSec: 900,
  },
  {
    id: "2",
    title: "Voices: Episode Two",
    slug: "voices-2",
    summary: "Conversation with a local reporter.",
    audioUrl: "/sample-audio-2.mp3",
    durationSec: 840,
  },
  {
    id: "3",
    title: "Voices: Episode Three",
    slug: "voices-3",
    summary: "A 15-minute documentary audio piece.",
    audioUrl: "/sample-audio-3.mp3",
    durationSec: 920,
  },
];

export default function PodcastRail() {
  return (
    <section aria-labelledby="podcasts">
      <h2 id="podcasts" className="mb-6 text-2xl font-semibold">
        Latest Voices
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {sample.map((p) => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
    </section>
  );
}

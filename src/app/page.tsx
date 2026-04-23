import HeroLead from "@/components/story/HeroLead";
import PodcastRail from "@/components/podcast/PodcastRail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryRail from "@/components/layout/CategoryRail";
import CitizenVoices from "@/components/layout/CitizenVoices";
import CampaignCard from "@/components/campaign/CampaignCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-12">
        <HeroLead />

        <PodcastRail />

        <section aria-labelledby="multimedia">
          <h2 id="multimedia" className="mb-6 text-2xl font-semibold">
            Multimedia Dispatches
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="h-48 rounded bg-zinc-100" />
            <div className="h-48 rounded bg-zinc-100" />
            <div className="h-48 rounded bg-zinc-100" />
          </div>
        </section>

        <CategoryRail />

        <section aria-labelledby="region-focus">
          <h2 id="region-focus" className="mb-6 text-2xl font-semibold">
            Look East / South
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-40 rounded bg-zinc-100" />
            <div className="h-40 rounded bg-zinc-100" />
            <div className="h-40 rounded bg-zinc-100" />
            <div className="h-40 rounded bg-zinc-100" />
          </div>
        </section>

        <CitizenVoices />

        <section aria-labelledby="anonymous">
          <h2 id="anonymous" className="mb-2 text-2xl font-semibold">
            Anonymous Dispatches
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Stories that could not be told openly.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="h-36 rounded bg-zinc-50" />
            <div className="h-36 rounded bg-zinc-50" />
            <div className="h-36 rounded bg-zinc-50" />
          </div>
        </section>

        <section aria-labelledby="campaigns">
          <h2 id="campaigns" className="mb-6 text-2xl font-semibold">
            Campaigns in Motion
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CampaignCard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

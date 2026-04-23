import Link from "next/link";

export default function CitizenVoices() {
  return (
    <section aria-labelledby="citizen-voices" className="rounded-lg border p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div>
          <h2 id="citizen-voices" className="text-2xl font-semibold">
            Citizen Voices
          </h2>
          <p className="text-sm text-slate-600">
            Recent community reporting and submissions from readers.
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Link href="/contribute" className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
            Submit a Story
          </Link>
        </div>
      </div>
    </section>
  );
}

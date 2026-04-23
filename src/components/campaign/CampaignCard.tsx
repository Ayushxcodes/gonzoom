import Link from "next/link";

export default function CampaignCard() {
  return (
    <article className="rounded border p-4">
      <h3 className="mb-2 text-lg font-semibold">Campaign: Hold Officials Accountable</h3>
      <p className="mb-4 text-sm text-slate-600">Short description of the campaign and current action items.</p>
      <Link href="/campaigns" className="rounded bg-slate-900 px-3 py-1 text-sm text-white">
        View campaign
      </Link>
    </article>
  );
}

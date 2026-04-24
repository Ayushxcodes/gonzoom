import Link from "next/link";

type Props = {
  id?: string;
  title?: string;
  summary?: string | null;
  slug?: string;
}

export default function CampaignCard({ id, title = "Campaign: Hold Officials Accountable", summary = "Short description of the campaign and current action items.", slug }: Props) {
  return (
    <article className="rounded border p-4">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-slate-600">{summary}</p>
      <Link href={slug ? `/campaign/${slug}` : "/campaigns"} className="rounded bg-slate-900 px-3 py-1 text-sm text-white">
        View campaign
      </Link>
    </article>
  );
}

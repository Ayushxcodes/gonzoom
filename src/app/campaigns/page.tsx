import { prisma } from '@/lib/prisma'

export default async function CampaignsPage(){
  const campaigns = await prisma.campaign.findMany({ where: { active: true }, orderBy: { title: 'asc' } })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      <div className="space-y-4">
        {campaigns.length === 0 && <p>No active campaigns right now.</p>}
        {campaigns.map(c => (
          <article key={c.id} className="border rounded p-4">
            <h2 className="text-lg font-semibold">{c.title}</h2>
            {c.summary && <p className="text-sm mt-2">{c.summary}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}

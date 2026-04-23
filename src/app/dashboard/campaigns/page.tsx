import { prisma } from '@/lib/prisma'
import "server-only"

export default async function DashboardCampaignsPage(){
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } as any })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Campaigns (Admin)</h1>

      <section className="mb-6">
        <form action="/api/dashboard/campaigns" method="post" className="space-y-2 max-w-xl">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input name="title" required className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input name="slug" required className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Summary</label>
            <textarea name="summary" rows={3} className="w-full rounded border p-2" />
          </div>
          <div>
            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Existing campaigns</h2>
        <div className="space-y-3">
          {campaigns.map(c => (
            <div key={c.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-gray-600">{c.slug}</div>
                </div>
                <div className="text-sm">{c.active ? 'active' : 'inactive'}</div>
              </div>
              {c.summary && <p className="mt-2 text-sm">{c.summary}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

import { prisma } from '@/lib/prisma'

export default async function MediaLibrary(){
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Media Library</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Filename</th>
            <th className="p-2 text-left">Linked</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(a => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.type}</td>
              <td className="p-2">{a.filename || a.url}</td>
              <td className="p-2">{a.storyId || a.submissionId || '-'}</td>
              <td className="p-2">{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

import Link from 'next/link'

type Item = { id: string, title: string, slug?: string }

export default function RelatedContent({ title = 'Related', items = [] }: { title?: string, items?: Item[] }){
  if(!items || items.length === 0) return null
  return (
    <aside className="border rounded p-4 bg-white">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id}>
            {i.slug ? <Link href={`/stories/${i.slug}`} className="text-sm text-blue-600">{i.title}</Link> : <span className="text-sm">{i.title}</span>}
          </li>
        ))}
      </ul>
    </aside>
  )
}

import React from "react"
import Link from "next/link"

type Props = {
  title: string
  summary?: string | null
  category?: { id: string; name: string } | null
  publishedAt?: string | Date | null
}

export default function StoryHeader({ title, summary, category, publishedAt }: Props){
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {category ? (
          <Link href={`/category/${encodeURIComponent(category.name.toLowerCase())}`} className="inline-block px-3 py-1 text-sm font-medium rounded bg-gray-100 text-gray-800">
            {category.name}
          </Link>
        ) : null}
        {publishedAt ? (
          <time className="text-sm text-gray-500">{new Date(publishedAt as any).toLocaleDateString()}</time>
        ) : null}
      </div>

      <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-4">{title}</h1>

      {summary ? (
        <p className="text-xl text-gray-700 max-w-3xl">{summary}</p>
      ) : null}
    </header>
  )
}

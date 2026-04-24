import React from "react"

type Props = {
  title: string
  durationSec?: number | null
  publishedAt?: string | Date | null
  summary?: string | null
}

export default function PodcastHeader({ title, durationSec, publishedAt, summary }: Props){
  const minutes = durationSec ? Math.floor(durationSec / 60) : null
  return (
    <header className="mb-6">
      <h1 className="text-4xl font-bold leading-tight mb-2">{title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        {minutes !== null ? <div>{minutes} min</div> : null}
        {publishedAt ? <time>{new Date(publishedAt as any).toLocaleDateString()}</time> : null}
      </div>
      {summary ? <p className="text-lg text-gray-800">{summary}</p> : null}
    </header>
  )
}

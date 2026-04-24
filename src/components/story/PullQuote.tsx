import React from "react"

type Props = {
  quote: string
  credit?: string
}

export default function PullQuote({ quote, credit }: Props){
  return (
    <aside className="my-12 bg-gray-50 border-l-4 border-gray-200 pl-6 py-8">
      <blockquote className="text-2xl font-semibold text-gray-900 leading-relaxed">“{quote}”</blockquote>
      {credit ? <div className="mt-3 text-sm text-gray-600">— {credit}</div> : null}
    </aside>
  )
}

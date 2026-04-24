import React from "react"

type Chapter = { time: string; title: string }

const DEFAULT_CHAPTERS: Chapter[] = [
  { time: "00:00", title: "Introduction" },
  { time: "03:10", title: "Interview" },
  { time: "08:45", title: "Analysis" },
  { time: "13:30", title: "Closing" },
]

export default function ChapterList({ chapters }: { chapters?: Chapter[] }){
  const list = chapters && chapters.length > 0 ? chapters : DEFAULT_CHAPTERS
  return (
    <section className="mt-6 border rounded-2xl p-4">
      <h3 className="text-lg font-semibold mb-3">Chapters</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {list.map((c, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <span className="font-medium">{c.title}</span>
            <span className="text-gray-500">{c.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

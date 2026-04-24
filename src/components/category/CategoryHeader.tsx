import React from "react"

type Props = {
  name: string
  intro?: string
}

const DEFAULT_INTROS: Record<string, string> = {
  politics: "Power, institutions and the public.",
  identity: "Stories of belonging, exclusion and selfhood.",
  region: "Reporting from our priority regions.",
  crime: "Investigations into wrongdoing and accountability.",
  people: "Profiles and voices at the center of events.",
  anonymous: "Anonymous tips and testimony shaping reporting.",
}

export default function CategoryHeader({ name, intro }: Props){
  const key = name.toLowerCase()
  return (
    <header className="mb-6">
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <p className="text-lg text-gray-700">{intro || DEFAULT_INTROS[key] || "A collection of reporting on this topic."}</p>
    </header>
  )
}

import React from "react"
import Link from "next/link"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Podcast = {
  id: string
  title: string
  slug: string
  summary?: string | null
  audioUrl: string
  durationSec?: number | null
}

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{podcast.title}</CardTitle>
        {podcast.summary ? (
          <CardDescription>{podcast.summary}</CardDescription>
        ) : null}
      </CardHeader>

      <CardContent>
        <audio controls className="w-full mt-2">
          <source src={podcast.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Link href={`/podcasts/${podcast.slug}`}>
          <Button variant="outline" size="sm">Listen</Button>
        </Link>
        {podcast.durationSec ? (
          <div className="text-xs text-muted-foreground">{Math.round(podcast.durationSec / 60)}m</div>
        ) : null}
      </CardFooter>
    </Card>
  )
}

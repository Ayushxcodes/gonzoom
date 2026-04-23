import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const title = form.get('title')?.toString()
    const slug = form.get('slug')?.toString()
    const summary = form.get('summary')?.toString()

    if (!title || !slug) return new Response('Missing fields', { status: 400 })

    await prisma.campaign.create({ data: { title, slug, summary } })
    return new Response(null, { status: 303, headers: { Location: '/dashboard/campaigns' } })
  } catch (err) {
    console.error(err)
    return new Response('Server error', { status: 500 })
  }
}

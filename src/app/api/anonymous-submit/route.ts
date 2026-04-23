import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body?.message
    if (!message || typeof message !== "string")
      return new Response(JSON.stringify({ error: "Missing message" }), { status: 400, headers: { 'Content-Type': 'application/json' } })

    await prisma.submission.create({ data: { text: message } })
    return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

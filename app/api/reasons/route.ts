import { PrismaClient, Author } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const url = new URL(req.url)
  const author = url.searchParams.get("author")

  const reasons = await prisma.reason.findMany({
    where: author ? { author: author as Author } : {},
    orderBy: { createdAt: 'desc' },
  })

  return Response.json({ reasons })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { message, author } = body

  if (!message || typeof message !== 'string' || !author || !["Akash", "Sukh"].includes(author)) {
    return new Response("Invalid input", { status: 400 })
  }

  await prisma.reason.create({
    data: {
      content: message,
      author: author as Author,
    },
  })

  return new Response("Reason added", { status: 201 })
}

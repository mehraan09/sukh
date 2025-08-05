import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const notifications = await prisma.notification.findMany({
    orderBy: { timestamp: 'desc' },
  })

  return Response.json({
    notifications: notifications.map(n => n.message),
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { message } = body

  if (!message || typeof message !== 'string') {
    return new Response("Message is required", { status: 400 })
  }

  await prisma.notification.create({
    data: {
      message,
      timestamp: BigInt(Date.now()),
    },
  })

  return new Response("Notification added", { status: 201 })
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(req: Request) {
  const body = await req.json()
  const { message } = body

  console.log("message : " ,  message)

  await prisma.ifshe.create({
    data: {
      message : message,
      
    },
  })

  return new Response("Reason added", { status: 201 })
}
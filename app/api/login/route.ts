import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password === process.env.PASSWORD_AKASH) {
    return NextResponse.json({ success: true, author: 'Akash' })
  }

  if (password === process.env.PASSWORD_CHANGE) {
    return NextResponse.json({ success: false, prev: 'Previous Password' })
  }


  if (password === process.env.PASSWORD_SUKH) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ifshe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "Thank you" }),
    }).catch(() => {})
    return NextResponse.json({ success: true, author: 'Sukh' })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type User = 'Akash' | 'Sukh'

type Reason = {
  id: string
  content: string
  author: User
  createdAt: string
}

const PASSWORDS: Record<string, User> = {
  akash123: 'Akash',
  sukh456: 'Sukh',
}

export default function Home() {
  const [reasons, setReasons] = useState<Reason[]>([])
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState<User | null>(null)

  // Check auth on first load
  useEffect(() => {
    const data = localStorage.getItem('authData')
    if (!data) return

    try {
      const parsed = JSON.parse(data)
      const { author, expiresAt } = parsed
      const now = Date.now()
      if (now < expiresAt && (author === 'Akash' || author === 'Sukh')) {
        setAuthor(author)
        setIsAuthenticated(true)
      }
    } catch {
      // Invalid data, ignore
    }
  }, [])

  // Fetch reasons after auth
  useEffect(() => {
    if (isAuthenticated) fetchReasons()
  }, [isAuthenticated])

  const fetchReasons = async () => {
    try {
      const res = await fetch('/api/reasons')
      const data = await res.json()
      setReasons(data.reasons)
    } catch (err) {
      console.error('Fetch failed:', err)
    }
  }

  const handleSend = async () => {
    if (!message.trim() || !author) return
    setSending(true)
    const res = await fetch('/api/reasons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, author }),
    })

    if (res.ok) {
      setMessage('')
      fetchReasons()
    } else {
      alert('Failed to send message.')
    }
    setSending(false)
  }

  const handleLogin = () => {
    const foundAuthor = PASSWORDS[password]
    if (foundAuthor) {
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem('authData', JSON.stringify({ author: foundAuthor, expiresAt }))
      setAuthor(foundAuthor)
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-32 border p-6 rounded-xl shadow bg-white space-y-4 text-center">
        <h2 className="text-xl font-semibold">Enter Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </div>
    )
  }

  // Main chat UI
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Chat Input */}
<div className="flex flex-col gap-2 p-4 border rounded-2xl shadow bg-white ring-2 ring-pink-200">
  <textarea
    rows={3}
    placeholder="Write your lovely message..."
    className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <div className="flex justify-between items-center">
    <span className="text-sm text-pink-600 font-medium">Logged in as: {author}</span>
    <button
      onClick={handleSend}
      disabled={sending}
      className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 disabled:opacity-50"
    >
      {sending ? 'Sending...' : 'Send 💖'}
    </button>
  </div>
</div>


      {/* Message List */}
{reasons.map((r) => (
  <div key={r.id} className="border p-4 rounded-2xl shadow-lg bg-pink-50">
    <p className="text-lg italic">💌 {r.content}</p>
    <div className="text-sm text-pink-600 mt-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 relative">
          <Image
            src={`/${r.author.toLowerCase()}.png`}
            alt={r.author}
            layout="fill"
            className="rounded-full object-cover border-2 border-pink-300"
          />
        </div>
        <span className="text-sm font-semibold">{r.author}</span>
      </div>
      <span>🕒 {formatTime(r.createdAt)}</span>
    </div>
  </div>
))}


    </div>
  )
}

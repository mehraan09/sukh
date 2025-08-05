'use client'

import { useState } from "react"

export default function SenderPage() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  const send = async () => {
    if (!message.trim()) return

    try {
      const res = await fetch("/api/reasons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      })

      if (res.ok) {
        setStatus("Reason added successfully.")
        setMessage("")
      } else {
        setStatus("Failed to add reason.")
      }
    } catch (err) {
      setStatus("Error sending request.")
    }

    // Clear status after 3 seconds
    setTimeout(() => setStatus(""), 3000)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a Reason</h2>
      
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter reason..."
        className="border border-gray-300 px-3 py-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={send}
        disabled={!message.trim()}
        className={`w-full py-2 rounded font-semibold transition-colors cursor-pointer ${
          message.trim()
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Add Reason
      </button>

      {status && (
        <p className="mt-3 text-sm text-center text-gray-600">{status}</p>
      )}
    </div>
  )
}

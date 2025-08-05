'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch('/api/reasons');
        const data = await res.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Error fetching reasons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl bg-white/70 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="mb-6 text-center font-serif text-3xl font-extrabold text-pink-600 drop-shadow-md">
          Out of Million Reasons we love eather other. Here are Some !!
        </h1>

        {loading ? (
          <div className="animate-pulse text-center font-medium text-gray-500">
            Loading reasons...
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center font-medium text-gray-500">
            No reasons found.
          </div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((msg, index) => (
              <li
                key={index}
                className="rounded-xl bg-pink-50 border-2 border-pink-200 px-6 py-4 text-pink-800 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

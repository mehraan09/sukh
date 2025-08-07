'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function DayPlanner() {
  const tasks = [
    {
      title: 'Practicals',
      items: ['Botany', 'Zoology', 'Physics'],
      color: 'bg-[#F8C8DC]'
    },
    {
      title: 'Projects',
      items: ['Zoology - Paramecium Project (10-15 pages)', 'Botany - Herbarium'],
      color: 'bg-[#FFDAB9]'
    },
    {
      title: 'Notebooks',
      items: ['Botany', 'Zoology', 'Physics', 'Chemistry'],
      color: 'bg-[#E0B0FF]'
    },
    {
      title: 'Extra Work',
      items: ['Extra classes work as well'],
      color: 'bg-[#F7CAC9]'
    }
  ]

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-pink-700">💖 Saturday Planner</h1>
      <p className="text-center text-sm text-gray-500 mb-6">🗓️ July 26, 21:28</p>
      <div className="grid gap-4">
        {tasks.map((task, index) => (
          <Card key={index} className={`${task.color} text-black shadow-lg`}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <ul className="list-disc list-inside space-y-1">
                {task.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

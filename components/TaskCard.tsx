"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Task = {
  id: string
  title: string
  startTime: string
  endTime: string
  done: boolean
  onToggle: () => void
  onDelete: () => void
}

export default function TaskCard({ title, startTime, endTime, done, onToggle, onDelete }: Task) {
  const bgColor = done ? "bg-green-100" : "bg-blue-100"

  return (
    <Card className={`${bgColor} border-2 border-purple-300 mb-3`}>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className={`text-lg font-semibold ${done ? "line-through text-gray-400" : "text-gray-800"}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{startTime} → {endTime}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onToggle}>
            {done ? "Undo" : "Done"}
          </Button>
          <Button variant="destructive" onClick={onDelete} className="text-gray-400">Delete</Button>
        </div>
      </CardContent>
    </Card>
  )
}

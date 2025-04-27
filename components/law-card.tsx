"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Law } from "@/lib/types"
import { BookOpen } from "lucide-react"

interface LawCardProps {
  law: Law
  isSelected: boolean
  onSelect: () => void
  compact?: boolean
}

export default function LawCard({ law, isSelected, onSelect, compact = false }: LawCardProps) {
  if (compact) {
    return (
      <div className={`p-2 flex items-center space-x-2 ${isSelected ? "bg-red-50" : "bg-white"}`} onClick={onSelect}>
        <div className="bg-gray-200 rounded-full p-1 flex-shrink-0">
          <BookOpen className="h-4 w-4 text-gray-700" />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm truncate">{law.name}</h3>
        </div>
      </div>
    )
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-[#8b0000] bg-red-50" : "bg-white"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="bg-gray-200 rounded-full p-2 flex-shrink-0">
          <BookOpen className="h-8 w-8 text-gray-700" />
        </div>
        <div>
          <h3 className="font-bold">{law.name}</h3>
          <p className="text-sm text-gray-600">{law.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}


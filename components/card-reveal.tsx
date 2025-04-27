"use client"

import { Button } from "@/components/ui/button"
import type { Player, Card as GameCard } from "@/lib/types"
import SuspectCard from "@/components/suspect-card"
import LocationCard from "@/components/location-card"
import LawCard from "@/components/law-card"

interface CardRevealProps {
  card: GameCard | null
  revealingPlayer: Player | null
  currentPlayer: Player
  onClose: () => void
}

export default function CardReveal({ card, revealingPlayer, currentPlayer, onClose }: CardRevealProps) {
  if (!card || !revealingPlayer) return null

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="mb-2">
          <span className={`text-${revealingPlayer.color}-600 font-medium`}>{revealingPlayer.name}</span> is showing you
          a card:
        </p>
      </div>

      <div className="border rounded-md overflow-hidden">
        {card.type === "suspect" && <SuspectCard suspect={card.item} isSelected={false} onSelect={() => {}} />}
        {card.type === "location" && <LocationCard location={card.item} isSelected={false} onSelect={() => {}} />}
        {card.type === "law" && <LawCard law={card.item} isSelected={false} onSelect={() => {}} />}
      </div>

      <div className="flex justify-center">
        <Button onClick={onClose}>Acknowledge</Button>
      </div>
    </div>
  )
}


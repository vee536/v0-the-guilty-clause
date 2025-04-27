"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/types"
import SuspectCard from "@/components/suspect-card"
import LocationCard from "@/components/location-card"
import LawCard from "@/components/law-card"

interface PlayerHandProps {
  player: Player
  showCards: boolean
}

export default function PlayerHand({ player, showCards }: PlayerHandProps) {
  if (!player) return null

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <div className={`w-4 h-4 rounded-full bg-${player.color}-600 mr-2`}></div>
          {player.name}'s Cards
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showCards ? (
          <div className="space-y-2">
            {player.cards.map((card, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                {card.type === "suspect" && (
                  <SuspectCard suspect={card.item} isSelected={false} onSelect={() => {}} compact={true} />
                )}
                {card.type === "location" && (
                  <LocationCard location={card.item} isSelected={false} onSelect={() => {}} compact={true} />
                )}
                {card.type === "law" && (
                  <LawCard law={card.item} isSelected={false} onSelect={() => {}} compact={true} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {player.cards.map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-md h-16 flex items-center justify-center">
                <span className="text-gray-500">?</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


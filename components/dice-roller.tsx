"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

interface DiceRollerProps {
  onRoll: (value: number) => void
}

export default function DiceRoller({ onRoll }: DiceRollerProps) {
  const [rolling, setRolling] = useState(false)
  const [dice1Value, setDice1Value] = useState<number | null>(null)
  const [dice2Value, setDice2Value] = useState<number | null>(null)

  const diceIcons = [
    <Dice1 key={1} className="h-8 w-8" />,
    <Dice2 key={2} className="h-8 w-8" />,
    <Dice3 key={3} className="h-8 w-8" />,
    <Dice4 key={4} className="h-8 w-8" />,
    <Dice5 key={5} className="h-8 w-8" />,
    <Dice6 key={6} className="h-8 w-8" />,
  ]

  const rollDice = () => {
    setRolling(true)

    // Animate dice rolling
    let rollCount = 0
    const maxRolls = 10
    const rollInterval = setInterval(() => {
      const randomValue1 = Math.floor(Math.random() * 6) + 1
      const randomValue2 = Math.floor(Math.random() * 6) + 1
      setDice1Value(randomValue1)
      setDice2Value(randomValue2)

      rollCount++
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval)
        setRolling(false)
        // Return the sum of both dice
        onRoll(randomValue1 + randomValue2)
      }
    }, 100)
  }

  return (
    <div className="flex items-center gap-4">
      <Button onClick={rollDice} disabled={rolling} className="bg-[#8b0000] hover:bg-[#6d0000]">
        Roll Dice
      </Button>

      {dice1Value !== null && dice2Value !== null && (
        <div className="flex gap-2">
          <div className="bg-white p-2 rounded-md border border-gray-300">{diceIcons[dice1Value - 1]}</div>
          <div className="bg-white p-2 rounded-md border border-gray-300">{diceIcons[dice2Value - 1]}</div>
          <div className="flex items-center ml-2">
            <span className="font-bold text-lg">=</span>
            <span className="font-bold text-lg ml-2">{dice1Value + dice2Value}</span>
          </div>
        </div>
      )}
    </div>
  )
}


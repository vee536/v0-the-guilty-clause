"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Room, Player, Position } from "@/lib/types"
import { calculateValidMoves } from "@/lib/game-logic"

interface BoardGridProps {
  players: Player[]
  currentPlayerIndex: number
  diceRoll: number | null
  hasMoved: boolean
  rooms: Room[]
  onPlayerMove: (position: Position, roomId: string | null) => void
}

export default function BoardGrid({
  players,
  currentPlayerIndex,
  diceRoll,
  hasMoved,
  rooms,
  onPlayerMove,
}: BoardGridProps) {
  const [validMoves, setValidMoves] = useState<Position[]>([])
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null)

  // Calculate valid moves when dice is rolled
  useEffect(() => {
    if (diceRoll && !hasMoved && players.length > 0) {
      const currentPlayer = players[currentPlayerIndex]
      const moves = calculateValidMoves(currentPlayer.position, diceRoll, rooms)
      setValidMoves(moves)
    } else {
      setValidMoves([])
    }
  }, [diceRoll, hasMoved, currentPlayerIndex, players, rooms])

  // Grid dimensions
  const gridSize = 11

  // Generate the grid
  const renderGrid = () => {
    const grid = []

    for (let y = 0; y < gridSize; y++) {
      const row = []

      for (let x = 0; x < gridSize; x++) {
        const position = { x, y }
        const room = getRoomAtPosition(position)
        const playersAtPosition = getPlayersAtPosition(position)
        const isValidMove = validMoves.some((move) => move.x === x && move.y === y)
        const isHovered = hoveredCell?.x === x && hoveredCell?.y === y
        const isDoor = room?.doors.some((door) => door.x === x && door.y === y)

        // Check if this is the top-left corner of a room (for image placement)
        const isRoomTopLeft = room && position.x === room.topLeft.x && position.y === room.topLeft.y

        row.push(
          <div
            key={`${x}-${y}`}
            className={`
              relative w-full h-full min-h-[40px] border border-gray-300
              ${room && !isDoor ? "bg-gray-100" : "bg-white"}
              ${isValidMove ? "cursor-pointer ring-2 ring-blue-400 ring-opacity-50" : ""}
              ${isHovered && isValidMove ? "bg-blue-100" : ""}
            `}
            onClick={() => {
              if (isValidMove) {
                onPlayerMove(position, room?.id || null)
              }
            }}
            onMouseEnter={() => setHoveredCell(position)}
            onMouseLeave={() => setHoveredCell(null)}
          >
            {/* Room image (only at top-left position) */}
            {isRoomTopLeft && room.imageUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
                <Image src={room.imageUrl || "/placeholder.svg"} alt={room.name} fill style={{ objectFit: "cover" }} />
              </div>
            )}

            {/* Room label */}
            {room &&
              !isDoor &&
              position.x === Math.floor((room.topLeft.x + room.bottomRight.x) / 2) &&
              position.y === Math.floor((room.topLeft.y + room.bottomRight.y) / 2) && (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 p-1 text-center z-10">
                  {room.name}
                </div>
              )}

            {/* Players */}
            {playersAtPosition.length > 0 && (
              <div className="absolute bottom-0 right-0 flex flex-wrap justify-end p-1 max-w-full z-20">
                {playersAtPosition.map((player) => (
                  <div
                    key={player.id}
                    className={`
                      w-3 h-3 rounded-full m-0.5
                      bg-${player.color}-600
                      ${player.id === currentPlayerIndex ? "ring-2 ring-white" : ""}
                    `}
                  ></div>
                ))}
              </div>
            )}

            {/* Door indicator */}
            {isDoor && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              </div>
            )}
          </div>,
        )
      }

      grid.push(
        <div key={y} className="grid grid-cols-11 gap-0">
          {row}
        </div>,
      )
    }

    return grid
  }

  // Helper to get room at position
  const getRoomAtPosition = (position: Position): Room | null => {
    for (const room of rooms) {
      if (
        position.x >= room.topLeft.x &&
        position.x <= room.bottomRight.x &&
        position.y >= room.topLeft.y &&
        position.y <= room.bottomRight.y
      ) {
        return room
      }
    }
    return null
  }

  // Helper to get players at position
  const getPlayersAtPosition = (position: Position): Player[] => {
    return players.filter((player) => player.position.x === position.x && player.position.y === position.y)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="w-full aspect-square">{renderGrid()}</div>
    </div>
  )
}


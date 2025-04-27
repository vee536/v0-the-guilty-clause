import type { Suspect, Location, Law, Player, Card, Position, Room } from "./types"

export function generateMystery(
  suspects: Suspect[],
  locations: Location[],
  laws: Law[],
): { guilty: Suspect; scene: Location; violation: Law } {
  // Randomly select a suspect, location, and law
  const guilty = suspects[Math.floor(Math.random() * suspects.length)]
  const scene = locations[Math.floor(Math.random() * locations.length)]
  const violation = laws[Math.floor(Math.random() * laws.length)]

  return {
    guilty,
    scene,
    violation,
  }
}

export function dealCards(cards: Card[], players: Player[]): Card[][] {
  // Shuffle the cards
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

  // Distribute cards evenly
  const dealtCards: Card[][] = Array(players.length)
    .fill(null)
    .map(() => [])

  for (let i = 0; i < shuffledCards.length; i++) {
    const playerIndex = i % players.length
    dealtCards[playerIndex].push(shuffledCards[i])
  }

  return dealtCards
}

export function canEnterRoom(position: Position, room: Room): boolean {
  // Check if the position is a door to the room
  return room.doors.some((door) => door.x === position.x && door.y === position.y)
}

export function getRoomAtPosition(position: Position, rooms: Room[]): Room | null {
  for (const room of rooms) {
    // Check if position is within room boundaries
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

export function calculateValidMoves(startPosition: Position, diceRoll: number, rooms: Room[]): Position[] {
  const validMoves: Position[] = []
  const visited = new Set<string>()

  function explore(position: Position, movesLeft: number) {
    // Skip if out of bounds or already visited
    if (
      position.x < 0 ||
      position.x > 10 ||
      position.y < 0 ||
      position.y > 10 ||
      visited.has(`${position.x},${position.y}`)
    ) {
      return
    }

    // Check if position is inside a room (not a door)
    const room = getRoomAtPosition(position, rooms)
    if (room) {
      const isDoor = room.doors.some((door) => door.x === position.x && door.y === position.y)
      if (!isDoor) {
        // Can't move through rooms except via doors
        return
      }
    }

    // Mark as visited
    visited.add(`${position.x},${position.y}`)

    // If we've used all moves, this is a valid destination
    if (movesLeft === 0) {
      validMoves.push({ ...position })
      return
    }

    // Explore in all four directions
    explore({ x: position.x + 1, y: position.y }, movesLeft - 1)
    explore({ x: position.x - 1, y: position.y }, movesLeft - 1)
    explore({ x: position.x, y: position.y + 1 }, movesLeft - 1)
    explore({ x: position.x, y: position.y - 1 }, movesLeft - 1)
  }

  // Start exploration from the current position
  explore(startPosition, diceRoll)

  // Remove the starting position from valid moves
  return validMoves.filter((move) => !(move.x === startPosition.x && move.y === startPosition.y))
}


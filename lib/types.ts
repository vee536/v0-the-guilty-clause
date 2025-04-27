export interface Position {
  x: number
  y: number
}

export interface Suspect {
  id: string
  name: string
  description: string
}

export interface Location {
  id: string
  name: string
  description: string
}

export interface Law {
  id: string
  name: string
  description: string
}

export interface Room {
  id: string
  name: string
  topLeft: Position
  bottomRight: Position
  doors: Position[]
  imageUrl?: string
}

export interface Player {
  id: number
  name: string
  color: string
  position: Position
  cards: Card[]
  isOut: boolean
}

export interface Card {
  type: "suspect" | "location" | "law"
  item: Suspect | Location | Law
}

export interface GameState {
  envelopeCards: {
    suspect: Suspect | null
    location: Location | null
    law: Law | null
  }
  currentRoom: string | null
  showAccusationDialog: boolean
  showCardRevealDialog: boolean
  cardToReveal: Card | null
  revealingPlayerIndex: number | null
  accusation: {
    suspect: Suspect | null
    location: Location | null
    law: Law | null
  }
  gameOver: boolean
  winner: number | null
}

export interface Mystery {
  guilty: Suspect
  scene: Location
  violation: Law
}


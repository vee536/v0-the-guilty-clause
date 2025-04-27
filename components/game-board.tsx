"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BoardGrid from "@/components/board-grid"
import DiceRoller from "@/components/dice-roller"
import PlayerHand from "@/components/player-hand"
import AccusationForm from "@/components/accusation-form"
import CardReveal from "@/components/card-reveal"
import GameRules from "@/components/game-rules"
import { generateMystery, dealCards } from "@/lib/game-logic"
import type { Suspect, Location, Law, Player, GameState, Card, Position } from "@/lib/types"
import { suspects, locations, laws, rooms, initialPositions } from "@/lib/game-data"

const PLAYER_COLORS = ["red", "yellow", "blue", "green", "purple", "orange"]

export default function GameBoard() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerCount, setPlayerCount] = useState(3)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [diceRoll, setDiceRoll] = useState<number | null>(null)
  const [hasMoved, setHasMoved] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    envelopeCards: {
      suspect: null,
      location: null,
      law: null,
    },
    currentRoom: null,
    showAccusationDialog: false,
    showCardRevealDialog: false,
    cardToReveal: null,
    revealingPlayerIndex: null,
    accusation: {
      suspect: null,
      location: null,
      law: null,
    },
    gameOver: false,
    winner: null,
  })

  // Initialize game
  useEffect(() => {
    if (gameStarted && players.length === 0) {
      initializeGame()
    }
  }, [gameStarted, players])

  const initializeGame = () => {
    // Generate the mystery (cards in the envelope)
    const mystery = generateMystery(suspects, locations, laws)

    // Create players
    const newPlayers: Player[] = []
    for (let i = 0; i < playerCount; i++) {
      newPlayers.push({
        id: i,
        name: `Player ${i + 1}`,
        color: PLAYER_COLORS[i],
        position: { ...initialPositions[i] },
        cards: [],
        isOut: false,
      })
    }

    // Deal remaining cards to players
    const remainingCards: Card[] = [
      ...suspects.filter((s) => s.id !== mystery.guilty.id).map((s) => ({ type: "suspect", item: s })),
      ...locations.filter((l) => l.id !== mystery.scene.id).map((l) => ({ type: "location", item: l })),
      ...laws.filter((l) => l.id !== mystery.violation.id).map((l) => ({ type: "law", item: l })),
    ]

    const dealtCards = dealCards(remainingCards, newPlayers)

    // Update players with their cards
    for (let i = 0; i < newPlayers.length; i++) {
      newPlayers[i].cards = dealtCards[i]
    }

    setPlayers(newPlayers)
    setCurrentPlayerIndex(0)
    setGameState({
      ...gameState,
      envelopeCards: {
        suspect: mystery.guilty,
        location: mystery.scene,
        law: mystery.violation,
      },
    })
  }

  const handleDiceRoll = (value: number) => {
    setDiceRoll(value)
    setHasMoved(false)
  }

  const handlePlayerMove = (position: Position, roomId: string | null) => {
    if (diceRoll === null || hasMoved) return

    const currentPlayer = players[currentPlayerIndex]
    const updatedPlayers = [...players]

    // Update player position
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      position: position,
    }

    setPlayers(updatedPlayers)
    setHasMoved(true)

    // Check if player entered a room
    if (roomId && roomId !== gameState.currentRoom) {
      setGameState({
        ...gameState,
        currentRoom: roomId,
        showAccusationDialog: true,
      })
    }
  }

  const handleAccusation = (suspect: Suspect | null, location: Location | null, law: Law | null) => {
    // Close accusation dialog
    setGameState({
      ...gameState,
      showAccusationDialog: false,
      accusation: {
        suspect,
        location,
        law,
      },
    })

    // Check if any other player has any of the accused cards
    const accusedCards = [
      suspect ? { type: "suspect", item: suspect } : null,
      location ? { type: "location", item: location } : null,
      law ? { type: "law", item: law } : null,
    ].filter((card) => card !== null) as Card[]

    let nextPlayerToReveal = -1
    let cardToReveal: Card | null = null

    // Start checking with the next player
    for (let i = 1; i <= players.length - 1; i++) {
      const playerIndex = (currentPlayerIndex + i) % players.length
      const player = players[playerIndex]

      if (player.isOut) continue

      // Check if this player has any of the accused cards
      for (const accusedCard of accusedCards) {
        const hasCard = player.cards.some(
          (card) => card.type === accusedCard.type && card.item.id === accusedCard.item.id,
        )

        if (hasCard) {
          // Find all matching cards this player has
          const matchingCards = player.cards.filter((card) =>
            accusedCards.some((ac) => ac.type === card.type && ac.item.id === card.item.id),
          )

          // Randomly select one card to reveal
          cardToReveal = matchingCards[Math.floor(Math.random() * matchingCards.length)]
          nextPlayerToReveal = playerIndex
          break
        }
      }

      if (cardToReveal) break
    }

    if (cardToReveal) {
      // Someone has a card to reveal
      setGameState({
        ...gameState,
        showAccusationDialog: false,
        showCardRevealDialog: true,
        cardToReveal,
        revealingPlayerIndex: nextPlayerToReveal,
      })
    } else {
      // No one has any of the accused cards
      endTurn()
    }
  }

  const handleFinalAccusation = (suspect: Suspect, location: Location, law: Law) => {
    const { envelopeCards } = gameState

    // Check if accusation is correct
    const isCorrect =
      suspect.id === envelopeCards.suspect?.id &&
      location.id === envelopeCards.location?.id &&
      law.id === envelopeCards.law?.id

    if (isCorrect) {
      // Player wins!
      setGameState({
        ...gameState,
        gameOver: true,
        winner: currentPlayerIndex,
      })
    } else {
      // Player is out
      const updatedPlayers = [...players]
      updatedPlayers[currentPlayerIndex].isOut = true
      setPlayers(updatedPlayers)

      // Check if all players are out
      const allOut = updatedPlayers.every((player) => player.isOut)
      if (allOut) {
        setGameState({
          ...gameState,
          gameOver: true,
          winner: null,
        })
      } else {
        endTurn()
      }
    }
  }

  const handleCardRevealed = () => {
    setGameState({
      ...gameState,
      showCardRevealDialog: false,
      cardToReveal: null,
      revealingPlayerIndex: null,
    })
    endTurn()
  }

  const endTurn = () => {
    // Find next player who isn't out
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length
    while (players[nextPlayerIndex].isOut) {
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length
    }

    setCurrentPlayerIndex(nextPlayerIndex)
    setDiceRoll(null)
    setHasMoved(false)
    setGameState({
      ...gameState,
      currentRoom: null,
    })
  }

  const startGame = (numPlayers: number) => {
    setPlayerCount(numPlayers)
    setGameStarted(true)
  }

  const resetGame = () => {
    setGameStarted(false)
    setPlayers([])
    setCurrentPlayerIndex(0)
    setDiceRoll(null)
    setHasMoved(false)
    setGameState({
      envelopeCards: {
        suspect: null,
        location: null,
        law: null,
      },
      currentRoom: null,
      showAccusationDialog: false,
      showCardRevealDialog: false,
      cardToReveal: null,
      revealingPlayerIndex: null,
      accusation: {
        suspect: null,
        location: null,
        law: null,
      },
      gameOver: false,
      winner: null,
    })
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center mb-6">The Guilty Clause</h2>
          <p className="mb-6 text-center">
            A judge has disappeared. You must uncover the suspect, crime scene, and broken law!
          </p>

          <GameRules />

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Select Number of Players</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {[2, 3, 4, 5, 6].map((num) => (
                <Button
                  key={num}
                  onClick={() => startGame(num)}
                  className={`w-16 h-16 text-xl ${num === 3 ? "bg-[#8b0000]" : "bg-gray-700"}`}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentPlayer = players[currentPlayerIndex]

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              <span className={`text-${currentPlayer?.color}-600`}>{currentPlayer?.name}'s Turn</span>
            </h2>
            <p className="text-sm text-gray-600">
              {!diceRoll
                ? "Roll the dice to move"
                : hasMoved
                  ? "End your turn or make an accusation"
                  : `Move ${diceRoll} spaces`}
            </p>
          </div>

          <div className="flex gap-4">
            {!diceRoll && <DiceRoller onRoll={handleDiceRoll} />}

            {hasMoved && (
              <>
                <Button onClick={endTurn} variant="outline">
                  End Turn
                </Button>

                <Button
                  onClick={() => setGameState({ ...gameState, showAccusationDialog: true })}
                  className="bg-[#8b0000] hover:bg-[#6d0000]"
                >
                  Make Final Accusation
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BoardGrid
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            diceRoll={diceRoll}
            hasMoved={hasMoved}
            rooms={rooms}
            onPlayerMove={handlePlayerMove}
          />
        </div>

        <div>
          <PlayerHand player={currentPlayer} showCards={true} />

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Other Players</h3>
            {players.map(
              (player, index) =>
                index !== currentPlayerIndex && (
                  <div
                    key={player.id}
                    className={`p-3 rounded-md ${player.isOut ? "bg-gray-200" : "bg-white"} shadow-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full bg-${player.color}-600 mr-2`}></div>
                        <span className={player.isOut ? "line-through text-gray-500" : ""}>{player.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{player.cards.length} cards</span>
                    </div>
                  </div>
                ),
            )}
          </div>

          <Button onClick={resetGame} variant="outline" className="w-full mt-6">
            Reset Game
          </Button>
        </div>
      </div>

      {/* Accusation Dialog */}
      <Dialog
        open={gameState.showAccusationDialog}
        onOpenChange={(open) => {
          if (!open) setGameState({ ...gameState, showAccusationDialog: false })
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Make an Accusation</DialogTitle>
          </DialogHeader>
          <AccusationForm
            suspects={suspects}
            locations={locations}
            laws={laws}
            currentRoom={gameState.currentRoom}
            isFinalAccusation={!gameState.currentRoom}
            onAccuse={gameState.currentRoom ? handleAccusation : handleFinalAccusation}
            onCancel={() => setGameState({ ...gameState, showAccusationDialog: false })}
          />
        </DialogContent>
      </Dialog>

      {/* Card Reveal Dialog */}
      <Dialog
        open={gameState.showCardRevealDialog}
        onOpenChange={(open) => {
          if (!open) handleCardRevealed()
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Card Revealed</DialogTitle>
          </DialogHeader>
          <CardReveal
            card={gameState.cardToReveal}
            revealingPlayer={gameState.revealingPlayerIndex !== null ? players[gameState.revealingPlayerIndex] : null}
            currentPlayer={currentPlayer}
            onClose={handleCardRevealed}
          />
        </DialogContent>
      </Dialog>

      {/* Game Over Dialog */}
      <Dialog
        open={gameState.gameOver}
        onOpenChange={(open) => {
          if (!open) resetGame()
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{gameState.winner !== null ? "Case Solved!" : "Game Over"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {gameState.winner !== null ? (
              <div className="text-center">
                <p className="text-xl mb-4">
                  <span className={`text-${players[gameState.winner].color}-600 font-bold`}>
                    {players[gameState.winner].name}
                  </span>{" "}
                  has solved the case!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl mb-4">All players have been eliminated. The case remains unsolved.</p>
              </div>
            )}

            <div className="bg-[#f8f0e8] p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">The Solution</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="font-medium">The Guilty Party:</p>
                  <p className="text-[#8b0000]">{gameState.envelopeCards.suspect?.name}</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="font-medium">The Crime Scene:</p>
                  <p className="text-[#8b0000]">{gameState.envelopeCards.location?.name}</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="font-medium">The Violated Law:</p>
                  <p className="text-[#8b0000]">{gameState.envelopeCards.law?.name}</p>
                </div>
              </div>
            </div>

            <Button onClick={resetGame} className="w-full mt-4">
              Play Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


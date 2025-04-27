import GameBoard from "@/components/game-board"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f0e6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#8b0000] mb-2">The Guilty Clause</h1>
          <p className="text-xl text-gray-700">A Constitutional Mystery Board Game</p>
        </header>

        <Suspense fallback={<Loading />}>
          <GameBoard />
        </Suspense>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Solve the mystery: Who violated which constitutional article and where?</p>
        </footer>
      </div>
    </main>
  )
}


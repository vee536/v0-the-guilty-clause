import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Mystery } from "@/lib/types"
import { CheckCircle, XCircle } from "lucide-react"

interface MysteryRevealProps {
  isCorrect: boolean
  mystery: Mystery
  accusation: {
    suspect: { name: string; description: string }
    location: { name: string; description: string }
    law: { name: string; description: string }
  }
}

export default function MysteryReveal({ isCorrect, mystery, accusation }: MysteryRevealProps) {
  return (
    <Card className={isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          {isCorrect ? (
            <>
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-green-800">Correct! Case Solved!</span>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6 text-red-600 mr-2" />
              <span className="text-red-800">Incorrect! Here's What Happened:</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-semibold text-gray-800">The Guilty Party</h4>
              <p className="text-[#8b0000] font-medium">{mystery.guilty.name}</p>
              <p className="text-sm text-gray-600 mt-1">{mystery.guilty.description}</p>
              {!isCorrect && accusation.suspect.name !== mystery.guilty.name && (
                <p className="text-sm text-red-600 mt-1">You accused: {accusation.suspect.name}</p>
              )}
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-semibold text-gray-800">The Crime Scene</h4>
              <p className="text-[#8b0000] font-medium">{mystery.scene.name}</p>
              <p className="text-sm text-gray-600 mt-1">{mystery.scene.description}</p>
              {!isCorrect && accusation.location.name !== mystery.scene.name && (
                <p className="text-sm text-red-600 mt-1">You accused: {accusation.location.name}</p>
              )}
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-semibold text-gray-800">The Violated Law</h4>
              <p className="text-[#8b0000] font-medium">{mystery.violation.name}</p>
              <p className="text-sm text-gray-600 mt-1">{mystery.violation.description}</p>
              {!isCorrect && accusation.law.name !== mystery.violation.name && (
                <p className="text-sm text-red-600 mt-1">You accused: {accusation.law.name}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">The Full Story</h4>
            <p className="text-gray-700">
              {mystery.guilty.name} violated {mystery.violation.name} at {mystery.scene.name}.{generateStory(mystery)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function generateStory(mystery: Mystery): string {
  return ` The violation occurred when ${mystery.guilty.name} used their position to interfere with the judicial process. 
  Evidence was found at ${mystery.scene.name} linking them directly to the disappearance of the judge. 
  This action clearly violated ${mystery.violation.name}, undermining the constitutional framework of India.`
}


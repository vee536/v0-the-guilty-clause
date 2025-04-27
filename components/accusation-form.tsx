"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Suspect, Location, Law } from "@/lib/types"
import SuspectCard from "@/components/suspect-card"
import LocationCard from "@/components/location-card"
import LawCard from "@/components/law-card"

interface AccusationFormProps {
  suspects: Suspect[]
  locations: Location[]
  laws: Law[]
  currentRoom: string | null
  isFinalAccusation: boolean
  onAccuse: (suspect: any, location: any, law: any) => void
  onCancel: () => void
}

export default function AccusationForm({
  suspects,
  locations,
  laws,
  currentRoom,
  isFinalAccusation,
  onAccuse,
  onCancel,
}: AccusationFormProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    currentRoom ? locations.find((loc) => loc.id === currentRoom) || null : null,
  )
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null)

  const handleAccuse = () => {
    if (isFinalAccusation) {
      if (selectedSuspect && selectedLocation && selectedLaw) {
        onAccuse(selectedSuspect, selectedLocation, selectedLaw)
      }
    } else {
      onAccuse(selectedSuspect, selectedLocation, selectedLaw)
    }
  }

  const isFormValid = isFinalAccusation ? selectedSuspect && selectedLocation && selectedLaw : true

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-3 rounded-md mb-4">
        {isFinalAccusation ? (
          <p>
            This is your <strong>final accusation</strong>. If you're wrong, you'll be eliminated from the game. Choose
            carefully!
          </p>
        ) : (
          <p>
            You've entered <strong>{selectedLocation?.name}</strong>. Make an accusation to see if other players have
            any of these cards.
          </p>
        )}
      </div>

      <Tabs defaultValue="suspects">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="suspects">Suspects</TabsTrigger>
          <TabsTrigger value="locations" disabled={!isFinalAccusation && currentRoom !== null}>
            Locations
          </TabsTrigger>
          <TabsTrigger value="laws">Constitutional Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="suspects" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {suspects.map((suspect) => (
              <SuspectCard
                key={suspect.id}
                suspect={suspect}
                isSelected={selectedSuspect?.id === suspect.id}
                onSelect={() => setSelectedSuspect(suspect)}
                compact={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                onSelect={() => setSelectedLocation(location)}
                compact={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="laws" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {laws.map((law) => (
              <LawCard
                key={law.id}
                law={law}
                isSelected={selectedLaw?.id === law.id}
                onSelect={() => setSelectedLaw(law)}
                compact={true}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-100 p-3 rounded-md">
        <h3 className="font-medium mb-2">Your Accusation</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2 rounded-md">
            <p className="text-sm font-medium">Suspect:</p>
            <p className="text-sm">{selectedSuspect ? selectedSuspect.name : "Not selected"}</p>
          </div>
          <div className="bg-white p-2 rounded-md">
            <p className="text-sm font-medium">Location:</p>
            <p className="text-sm">{selectedLocation ? selectedLocation.name : "Not selected"}</p>
          </div>
          <div className="bg-white p-2 rounded-md">
            <p className="text-sm font-medium">Violated Law:</p>
            <p className="text-sm">{selectedLaw ? selectedLaw.name : "Not selected"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleAccuse}
          disabled={isFinalAccusation && !isFormValid}
          className="bg-[#8b0000] hover:bg-[#6d0000]"
        >
          Make Accusation
        </Button>
      </div>
    </div>
  )
}


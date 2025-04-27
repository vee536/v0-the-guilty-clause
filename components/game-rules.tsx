import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function GameRules() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="rules">
        <AccordionTrigger>Game Rules</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>The Guilty Clause</strong> is a constitutional mystery board game where you must solve who
              violated which article of the Indian Constitution and where it happened.
            </p>

            <h4 className="font-semibold mt-2">Setup</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                One suspect, one location, and one constitutional article card are randomly selected and placed in the
                "case file" envelope.
              </li>
              <li>The remaining cards are dealt evenly to all players.</li>
              <li>Players start at their designated colored starting positions on the board.</li>
            </ol>

            <h4 className="font-semibold mt-2">Gameplay</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>On your turn, roll the dice and move your pawn the corresponding number of spaces.</li>
              <li>When you enter a room (through a door), you can make a suggestion about the crime.</li>
              <li>Your suggestion must include the room you're in, a suspect, and a constitutional article.</li>
              <li>Other players, in clockwise order, must show you ONE card from your suggestion if they have it.</li>
              <li>Once a player shows you a card, your turn ends.</li>
            </ol>

            <h4 className="font-semibold mt-2">Making a Final Accusation</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>At any point during your turn, you can make a final accusation.</li>
              <li>If your accusation matches all three cards in the case file, you win!</li>
              <li>If your accusation is wrong, you're out of the game.</li>
            </ol>

            <p className="italic mt-2">
              This game is designed to help you learn about the Indian Constitution in an engaging way.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


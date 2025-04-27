import type { Suspect, Location, Law, Room, Position } from "./types"

export const suspects: Suspect[] = [
  {
    id: "sarosh",
    name: "Advocate Sarosh",
    description: "The idealist lawyer known for taking on controversial cases.",
  },
  {
    id: "sourajit",
    name: "Sourajit Mitra",
    description: "The investigative journalist who uncovers political scandals.",
  },
  {
    id: "athul",
    name: "Commissioner Athul",
    description: "The no-nonsense cop with a reputation for bending rules.",
  },
  {
    id: "mrinmayee",
    name: "Mrinmayee",
    description: "The social activist fighting for marginalized communities.",
  },
  {
    id: "derrick",
    name: "Derrick Rozario",
    description: "The hacker with access to sensitive government systems.",
  },
  {
    id: "sanay",
    name: "MLA Sanay",
    description: "The politician with connections in all the right places.",
  },
]

export const locations: Location[] = [
  {
    id: "vidhana-soudha",
    name: "Vidhana Soudha",
    description: "The judge's case files went missing from this government building.",
  },
  {
    id: "bbmp",
    name: "BBMP Headquarters",
    description: "Corruption leaks originated from this municipal office.",
  },
  {
    id: "high-court",
    name: "Karnataka High Court",
    description: "Last known location of the missing judge.",
  },
  {
    id: "cubbon-park",
    name: "Cubbon Park",
    description: "A secret late-night meeting was witnessed here.",
  },
  {
    id: "press-club",
    name: "Press Club",
    description: "Media manipulation and censorship occurred here.",
  },
  {
    id: "university",
    name: "Law Department",
    description: "Law students here hold key evidence in the case.",
  },
  {
    id: "electronic-city",
    name: "Tech Hub",
    description: "Confidential emails were hacked from servers here.",
  },
  {
    id: "mg-road",
    name: "MG Road",
    description: "Political unrest and protests were suppressed here.",
  },
  {
    id: "jail",
    name: "Central Jail",
    description: "A whistleblower with the final clue is detained here.",
  },
]

export const laws: Law[] = [
  {
    id: "article-21",
    name: "Article 21",
    description:
      "Right to Life & Liberty - No person shall be deprived of his life or personal liberty except according to procedure established by law.",
  },
  {
    id: "article-32",
    name: "Article 32",
    description:
      "Right to Constitutional Remedies - Guarantees the right to move the Supreme Court for enforcement of fundamental rights.",
  },
  {
    id: "article-19",
    name: "Article 19",
    description: "Freedom of Speech & Expression - Protects the right to express one's opinions freely.",
  },
  {
    id: "article-14",
    name: "Article 14",
    description:
      "Right to Equality - The State shall not deny to any person equality before the law or equal protection of the laws.",
  },
  {
    id: "article-50",
    name: "Article 50",
    description:
      "Separation of Judiciary & Executive - The State shall take steps to separate the judiciary from the executive.",
  },
]

// Define rooms on the board with images
export const rooms: Room[] = [
  {
    id: "jail",
    name: "Central Jail",
    topLeft: { x: 0, y: 0 },
    bottomRight: { x: 3, y: 3 },
    doors: [{ x: 3, y: 2 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "electronic-city",
    name: "Tech Hub",
    topLeft: { x: 5, y: 0 },
    bottomRight: { x: 8, y: 3 },
    doors: [{ x: 6, y: 3 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "mg-road",
    name: "MG Road",
    topLeft: { x: 10, y: 0 },
    bottomRight: { x: 10, y: 3 },
    doors: [{ x: 9, y: 2 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "university",
    name: "Law Department",
    topLeft: { x: 0, y: 5 },
    bottomRight: { x: 3, y: 8 },
    doors: [{ x: 3, y: 6 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "vidhana-soudha",
    name: "Vidhan Soudha",
    topLeft: { x: 7, y: 5 },
    bottomRight: { x: 10, y: 8 }, // Expanded size
    doors: [{ x: 7, y: 6 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "high-court",
    name: "High Court",
    topLeft: { x: 0, y: 9 },
    bottomRight: { x: 4, y: 10 }, // Expanded size
    doors: [{ x: 2, y: 9 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "press-club",
    name: "Press Club",
    topLeft: { x: 5, y: 9 },
    bottomRight: { x: 8, y: 10 },
    doors: [{ x: 6, y: 8 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "bbmp",
    name: "BBMP HQ",
    topLeft: { x: 9, y: 9 },
    bottomRight: { x: 10, y: 10 }, // Expanded size
    doors: [{ x: 9, y: 9 }],
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

// Starting positions for players
export const initialPositions: Position[] = [
  { x: 0, y: 4 }, // Red
  { x: 0, y: 9 }, // Yellow
  { x: 5, y: 10 }, // Blue
  { x: 10, y: 4 }, // Green
  { x: 10, y: 5 }, // Purple
  { x: 5, y: 0 }, // Orange
]


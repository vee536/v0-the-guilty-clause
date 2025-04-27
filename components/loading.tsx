import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-16 w-16 animate-spin text-[#8b0000]" />
      <p className="mt-4 text-lg">Loading the constitutional mystery...</p>
    </div>
  )
}


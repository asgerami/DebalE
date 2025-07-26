import { Coffee } from "lucide-react"

export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-[#FFFEF7] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#F6CB5A] to-[#E6B84A] rounded-xl flex items-center justify-center mx-auto animate-pulse">
          <Coffee className="w-8 h-8 text-[#3C2A1E]" />
        </div>
        <div className="space-y-2">
          <div className="text-xl font-bold text-[#3C2A1E]">Loading Help Center...</div>
          <div className="text-[#7F8C8D]">Getting your support resources ready</div>
        </div>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#F6CB5A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

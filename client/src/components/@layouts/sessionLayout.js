import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { geistSans, geistMono, poppins } from "../@shared-components/importFonts"

export default function SessionLayout({ children, classNames }) {
  return (
    <div className={`grid min-h-screen lg:grid-cols-2 p-4 md:p-8 bg-[white] ${poppins.variable}`}>
      <div className="relative bg-[#002B5B] p-8 md:px-32 md:py-16 text-white rounded-3xl flex flex-col justify-center h-full">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8FB5A]">
            <span className="text-sm font-bold text-black">PESA</span>
          </div>
          <div>
            <div className="text-sm font-semibold">Peer to peer</div>
            <div className="text-sm font-semibold">Lending</div>
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <h1 className="text-2xl font-bold">Transact in Local currency</h1>
          <p className="text-sm">We connect you with borrowers and lenders in the same country as you are.</p>
          <div className="flex items-center gap-8">
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-[#E8FB5A]" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <Button className="bg-[#E8FB5A] text-black hover:bg-[#E8FB5A]/90">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 md:p-8">
        { children }
      </div>
    </div>
  )
}
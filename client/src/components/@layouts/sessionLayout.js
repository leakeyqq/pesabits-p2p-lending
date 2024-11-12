import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { geistSans, geistMono, poppins } from "../@shared-components/importFonts";

export default function SessionLayout({ children, classNames }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Transact in Local currency",
      text: "We connect you with borrowers and lenders in the same country as you are."
    },
    {
      title: "Secured Loans",
      text: "A borrower must deposit enough crypto asset on Pesabits as collateral before getting a loan"
    },
    {
      title: "Lenders are protected",
      text: "In case a borrower defaults for 30 days. Pesabits will reimburse the lender from the borrower’s collateral."
    },
    {
      title: "Competitive rates",
      text: "Borrowers get to choose from many lenders."
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`grid min-h-screen lg:grid-cols-3 p-12 bg-[white] ${poppins.variable}`}>
      <div className="flex items-center justify-center lg:col-span-1 col-span-2">
        <div className="relative bg-[#002B5B] p-8 md:px-16 md:py-16 text-white rounded-3xl flex flex-col justify-center h-full w-full max-w-md">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8FB5A]">
              <span className="text-sm font-bold text-black">PESA</span>
            </div>
            <div>
              <div className="text-sm font-semibold">Peer to peer</div>
              <div className="text-sm font-semibold">Lending</div>
            </div>
          </div>
          <div className="mt-auto space-y-4 animate-slide">
            <h1 className="text-2xl font-bold">{slides[currentSlide].title}</h1>
            <p className="text-sm">{slides[currentSlide].text}</p>
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? "bg-[#E8FB5A]" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="bg-[#E8FB5A] text-black hover:bg-[#E8FB5A]/90"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-2 p-4 md:p-8">
        <div className="w-full max-w-md">
          { children }
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide {
          animation: slideIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}

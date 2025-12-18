"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const cocktails = [
  {
    name: "PEWNEGO RAZU NA DZIKIM ZACHODZIE",
    price: "42 PLN",
    ingredients: ["WHISKEY", "BOCZEK", "DYM", "SYROP KLONOWY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-7.jpg-Sf939CbKrXdeW0B6VsHascYBpbsULE.jpeg",
    theme: "Western",
  },
  {
    name: "JOKER",
    price: "35 PLN",
    ingredients: ["LILLET", "RICOTTA", "GIN", "SHRUB RABARBAROWY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-9.jpg-bc3gCyoHYdmoy5nDdMqpdYWS80YnQd.jpeg",
    theme: "Movie",
  },
  {
    name: "NEKTAR NAVI",
    price: "36 PLN",
    ingredients: ["TEQUILA", "WERBENA", "CHININA", "GREJPFRUT", "CYTRUSY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-2.jpg-wp99fCXCxGNf8r7dOSKXIgroVXG3WY.jpeg",
    theme: "Sci-Fi",
  },
  {
    name: "PACHNIDŁO",
    price: "36 PLN",
    ingredients: ["WÓDKA", "HIBISKUS", "RÓŻA", "LIKIER POMARAŃCZOWY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-4.jpg-RdBi1UYYAHu97xv3wvL3Hzh4lf0Gxd.jpeg",
    theme: "Elegant",
  },
  {
    name: "MISTRZ MOCY",
    price: "39 PLN",
    ingredients: ["RUM", "MATCHA", "KOKOS", "LIMONKA", "MIĘTA", "PORTO", "HERBATA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-0.jpg-DAJFXCzm9c4dPldEXCRJUsW3j1YPEW.jpeg",
    theme: "Star Wars",
  },
  {
    name: "CZARA OGNIA",
    price: "39 PLN",
    ingredients: ["GIN", "TRUSKAWKA", "SOUR", "PIEPRZ", "BAZYLIA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-1.jpg-cn5cKYRvKkuusJQchhwXgOiwZKxyz1.jpeg",
    theme: "Harry Potter",
  },
  {
    name: "SEN MORFEUSZA",
    price: "37 PLN",
    ingredients: ["GIN", "AMARO", "WERMUT", "TARNINA", "GORZKIE ZIOŁA", "PIOŁUN"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-8.jpg-YEeUJkAnh4a33CPUa5nskPC6MsZCfF.jpeg",
    theme: "Matrix",
  },
  {
    name: "Capo di tutti Capi",
    price: "41 PLN",
    ingredients: ["GIN", "PARMEZAN", "LIKIER", "WERMUT"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-6.jpg-DFvYjzJsolyIppnnH772zNeljE28EX.jpeg",
    theme: "Godfather",
  },
  {
    name: "KOKTAJL SPORLADY",
    price: "42 PLN",
    ingredients: ["RUM", "SEZAM", "LIKIER", "MIGDAŁY", "CZEKOLADA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-3.jpg-22d1ROVLNYHLUyyXP8gn4YhEN7MBV4.jpeg",
    theme: "Scarface",
  },
  {
    name: "NOCNY ŁOWCA",
    price: "39 PLN",
    ingredients: ["RUM", "WANILIA", "BURAK", "MARAKUJA", "KAKAO"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-5.jpg-cFq5HseUmbfDnBnFKLSehkFo71JOIX.jpeg",
    theme: "Cyberpunk",
  },
  {
    name: "MAMMA MIA!",
    price: "31 PLN",
    ingredients: ["TONIC", "SOUR", "RABARBAR", "LIMONCINO", "FRESH BLOOM"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-13.jpg-jbY4a40vCWAPXPjRwFraqGkIBFXioK.jpeg",
    theme: "Italian",
    nonAlcoholic: true,
  },
  {
    name: "MARGARITA",
    price: "33 PLN",
    ingredients: ["TEQUILA", "LIKIER TRIPLE SEC", "SOK Z LIMONKI"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
    theme: "Classic",
  },
  {
    name: "MAI TAI",
    price: "34 PLN",
    ingredients: ["RUM", "LIKIER MIGDAŁOWY", "LIKIER POMARAŃCZOWY", "SOK Z LIMONKI"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
    theme: "Tropical",
  },
  {
    name: "MANHATTAN",
    price: "45 PLN",
    ingredients: ["WHISKY", "CZERWONY WERMUT", "KILKU KROPLI ANGOSTURY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
    theme: "Classic",
  },
  {
    name: "CLOVER CLUB",
    price: "34 PLN",
    ingredients: ["GIN", "MALIN", "CYTRYNY", "BIAŁKA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
    theme: "Classic",
  },
  {
    name: "OLD CUBAN",
    price: "42 PLN",
    ingredients: ["RUM", "MIĘTA", "SOK Z LIMONKI", "CUKRU TRZCINOWEGO", "WINO MUSUJĄCE"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-18.jpg-Y8gRSHRMvkWZbtKMT6iAg2SxQ0Zojx.jpeg",
    theme: "Classic",
    variants: [
      { name: "Wersja klasyczna", price: "42 PLN" },
      { name: "Odsłona koneserska", price: "49 PLN" },
    ],
  },
  {
    name: "NEGRONI",
    price: "32 PLN",
    ingredients: ["GIN", "CAMPARI", "WERMUT"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-18.jpg-Y8gRSHRMvkWZbtKMT6iAg2SxQ0Zojx.jpeg",
    theme: "Classic",
    variants: [
      { name: "Wersja klasyczna", price: "32 PLN" },
      { name: "Odsłona koneserska", price: "41 PLN" },
    ],
  },
  {
    name: "OLD FASHIONED",
    price: "34 PLN",
    ingredients: ["WHISKY", "KOSTKI CUKRU", "WODA", "ANGOSTURA", "SKÓRKI POMARAŃCZY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-18.jpg-Y8gRSHRMvkWZbtKMT6iAg2SxQ0Zojx.jpeg",
    theme: "Classic",
    variants: [
      { name: "Wersja klasyczna", price: "34 PLN" },
      { name: "Odsłona koneserska", price: "48 PLN" },
    ],
  },
  {
    name: "SZKLANA PUŁAPKA",
    price: "38 PLN",
    ingredients: ["WHISKY", "MACADAMIA", "CZEKOLADA", "CYTRUSY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-11.jpg-gSdhNJXCNba9YVAyRzsEifzNFuxdll.jpeg",
    theme: "Action Movie",
  },
  {
    name: "WŁOSKA ROBOTA",
    price: "29 PLN",
    ingredients: ["AMARO LUCANO", "MARTINI", "BITTER", "POMARAŃCZA", "ROZMARYN"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-14.jpg-W2pAXlrGuxzon6MqLf5vmAwbfhoRQt.jpeg",
    theme: "Italian",
    nonAlcoholic: true,
  },
  {
    name: "COSMOPOLITAN",
    price: "33 PLN",
    ingredients: ["WÓDKA", "LIKIER TRIPLE SEC", "SOK Z ŻURAWINY", "LIMONKI"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
    theme: "Classic",
  },
  {
    name: "PAPA DOBLE",
    price: "34 PLN",
    ingredients: ["RUM", "SOK Z GREJPFRUTA", "LIMONKI", "LIKIER WIŚNIOWY"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
    theme: "Classic",
  },
  {
    name: "LONG ISLAND",
    price: "45 PLN",
    ingredients: ["WÓDKA", "GIN", "RUM", "TEQUILA", "TRIPLE SEC", "SOK Z CYTRYNY", "COLA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
    theme: "Strong",
  },
  {
    name: "PENICILINA",
    price: "34 PLN",
    ingredients: ["WHISKY", "MIÓD", "IMBIR", "CYTRYNA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
    theme: "Modern Classic",
  },
  {
    name: "PRETTY WOMAN",
    price: "29 PLN",
    ingredients: ["MANGO", "MARAKUJA", "LICZI", "BITTER", "LIMONKA"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-12.jpg-7yZ109dm5MH8lKca3wtsn0HzTatBix.jpeg",
    theme: "Movie",
    nonAlcoholic: true,
  },
]

export function CocktailSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const minSwipeDistance = 50

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cocktails.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
  }

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const getVisibleCocktails = () => {
    const prevIndex = (currentIndex - 1 + cocktails.length) % cocktails.length
    const nextIndex = (currentIndex + 1) % cocktails.length

    return [
      { ...cocktails[prevIndex], originalIndex: prevIndex, position: "left" },
      { ...cocktails[currentIndex], originalIndex: currentIndex, position: "center" },
      { ...cocktails[nextIndex], originalIndex: nextIndex, position: "right" },
    ]
  }

  return (
    <div className="relative w-full py-10">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-500 animate-pulse">
          Nasze Koktajle
        </h2>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-white/20 hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 backdrop-blur-md bg-black/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border-white/20 hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 backdrop-blur-md bg-black/20"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div
        className="relative h-[550px] md:h-[600px] overflow-visible flex items-center justify-center touch-pan-x perspective-1000"
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-center justify-center w-full max-w-6xl mx-auto relative perspective-1000">
          {getVisibleCocktails().map((cocktail, i) => (
            <div
              key={`${cocktail.originalIndex}-${currentIndex}`} // Unique key to force re-render for clean animation
              className={`absolute transition-all duration-700 ease-in-out cursor-pointer group preserve-3d ${cocktail.position === "center"
                  ? "z-30 scale-100 opacity-100 translate-x-0 rotate-y-0"
                  : cocktail.position === "left"
                    ? "z-20 scale-85 opacity-40 -translate-x-full rotate-y-12 hover:opacity-60 blur-[1px]"
                    : "z-20 scale-85 opacity-40 translate-x-full -rotate-y-12 hover:opacity-60 blur-[1px]"
                }`}
              style={{
                perspective: "1000px"
              }}
              onClick={() => {
                if (cocktail.position === "left") prevSlide()
                if (cocktail.position === "right") nextSlide()
              }}
            >
              {/* Card Container */}
              <div
                className={`w-[300px] h-[450px] md:w-[360px] md:h-[500px] relative rounded-3xl overflow-hidden transition-all duration-500 ${cocktail.position === "center" ? "shadow-[0_0_50px_-12px_rgba(245,158,11,0.5)]" : ""
                  }`}
              >

                {/* Neon Border Effect (Active Only) */}
                {cocktail.position === "center" && (
                  <div className="absolute inset-0 p-[2px] rounded-3xl bg-gradient-to-br from-amber-400 via-transparent to-purple-500 animate-border-spin overflow-hidden z-0">
                    <div className="absolute inset-0 bg-black/80 rounded-3xl"></div>
                  </div>
                )}

                {/* Glass Card Content */}
                <div className="absolute inset-[2px] bg-black/40 backdrop-blur-xl rounded-[22px] overflow-hidden z-10 border border-white/10 flex flex-col h-full">

                  {/* Image Section */}
                  <div className="relative h-3/5 overflow-hidden group-hover:h-1/2 transition-all duration-700 ease-in-out">
                    <img
                      src={cocktail.image || "/placeholder.svg"}
                      alt={cocktail.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-1">
                      <span className="text-amber-400 font-bold font-mono text-lg">{cocktail.price}</span>
                    </div>

                    {cocktail.nonAlcoholic && (
                      <div className="absolute top-4 left-4 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full px-3 py-1">
                        <span className="text-green-400 font-bold text-xs uppercase tracking-wider">0% Alko</span>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="relative h-2/5 p-6 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/60 group-hover:h-1/2 transition-all duration-700">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {cocktail.theme && <span className="text-xs font-light text-white/40 uppercase tracking-widest">{cocktail.theme}</span>}
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                        {cocktail.name}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {cocktail.ingredients.map((ing, i) => (
                          <span key={i} className="text-xs text-white/70 bg-white/5 border border-white/5 rounded-full px-3 py-1">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-amber-500/60 text-xs mt-4 group-hover:text-amber-400 transition-colors">
                      <Sparkles size={12} />
                      <span className="uppercase tracking-widest font-semibold">Polecany Wybór</span>
                    </div>
                  </div>

                  {/* Animated Overlay Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {cocktails.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-1 rounded-full transition-all duration-300 ${index === currentIndex
                ? "w-8 bg-amber-500 shadow-lg shadow-amber-500/30"
                : "bg-white/10 hover:bg-white/30"
              }`}
          />
        ))}
      </div>
    </div>
  )
}

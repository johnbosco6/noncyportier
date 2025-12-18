"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Wine,
  Heart,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
  Info,
  Candy,
  Citrus,
  Flame,
  Droplets,
  Zap,
  Ban,
  GlassWater,
} from "lucide-react"

interface CocktailPreference {
  sweetness: number
  strength: number
  fruitiness: number
  bitterness: number
  preferredSpirits: string[]
  avoidIngredients: string[]
}

interface RecommendedCocktail {
  name: string
  description: string
  image: string
  matchScore: number
  reasons: string[]
  price: string
}

export function CocktailCurator() {
  const [step, setStep] = useState<"preferences" | "results">("preferences")
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps] = useState(4)
  const [preferences, setPreferences] = useState<CocktailPreference>({
    sweetness: 3,
    strength: 3,
    fruitiness: 3,
    bitterness: 2,
    preferredSpirits: [],
    avoidIngredients: [],
  })
  const [recommendations, setRecommendations] = useState<RecommendedCocktail[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const spirits = ["Whisky", "Gin", "Rum", "Wódka", "Tequila", "Brandy", "Likier"]
  const commonIngredients = ["Cytrusy", "Mięta", "Imbir", "Cynamon", "Wanilia", "Czekolada", "Owoce tropikalne"]

  const cocktailDatabase = [
    {
      name: "Mamma Mia!",
      description: "Orzeźwiający meksykański koktajl z tequili, likieru triple sec i soku z limonki",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-13.jpg-jbY4a40vCWAPXPjRwFraqGkIBFXioK.jpeg",
      spirits: ["Tequila"],
      ingredients: ["Cytrusy", "Owoce tropikalne"],
      sweetness: 4,
      strength: 2,
      fruitiness: 5,
      bitterness: 1,
      price: "31 PLN",
    },
    {
      name: "Manhattan",
      description: "Klasyczny, wytrawny koktajl z whisky, czerwonego wermutu i kilku kropli angostury",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
      spirits: ["Whisky"],
      ingredients: ["Cynamon"],
      sweetness: 2,
      strength: 5,
      fruitiness: 1,
      bitterness: 4,
      price: "45 PLN",
    },
    {
      name: "Mai Tai",
      description: "Egzotyczny i zaskakujący, na bazie rumu, likieru migdałowego i pomarańczowego oraz soku z limonki",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
      spirits: ["Rum"],
      ingredients: ["Cytrusy", "Owoce tropikalne"],
      sweetness: 4,
      strength: 3,
      fruitiness: 5,
      bitterness: 1,
      price: "34 PLN",
    },
    {
      name: "Negroni",
      description: "Wyrazisty i zbalansowany klasyk na bazie ginu, Campari i wermutu",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-18.jpg-Y8gRSHRMvkWZbtKMT6iAg2SxQ0Zojx.jpeg",
      spirits: ["Gin"],
      ingredients: ["Cytrusy"],
      sweetness: 1,
      strength: 4,
      fruitiness: 2,
      bitterness: 5,
      price: "32 PLN",
    },
    {
      name: "Old Fashioned",
      description:
        "Ojciec założyciel świata koktajli, składający się z whisky, kostki cukru, wody, angostury i skórki pomarańczy",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-18.jpg-Y8gRSHRMvkWZbtKMT6iAg2SxQ0Zojx.jpeg",
      spirits: ["Whisky"],
      ingredients: ["Cytrusy", "Cynamon"],
      sweetness: 3,
      strength: 5,
      fruitiness: 2,
      bitterness: 3,
      price: "34 PLN",
    },
    {
      name: "Cosmopolitan",
      description: "Elegancki koktajl z wódki, likieru triple sec, soku z żurawiny i limonki",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
      spirits: ["Wódka"],
      ingredients: ["Cytrusy", "Owoce tropikalne"],
      sweetness: 3,
      strength: 3,
      fruitiness: 4,
      bitterness: 2,
      price: "33 PLN",
    },
    {
      name: "Włoska Robota",
      description: "Amaro Lucano, Martini, Bitter, Pomarańcza, Rozmaryn",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-14.jpg-W2pAXlrGuxzon6MqLf5vmAwbfhoRQt.jpeg",
      spirits: ["Likier"],
      ingredients: ["Cytrusy"],
      sweetness: 2,
      strength: 2,
      fruitiness: 3,
      bitterness: 4,
      price: "29 PLN",
    },
    {
      name: "Pretty Woman",
      description: "Mango, Marakuja, Liczi, Bitter, Limonka",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-12.jpg-7yZ109dm5MH8lKca3wtsn0HzTatBix.jpeg",
      spirits: [],
      ingredients: ["Owoce tropikalne", "Cytrusy"],
      sweetness: 5,
      strength: 1,
      fruitiness: 5,
      bitterness: 1,
      price: "29 PLN",
    },
  ]

  const calculateMatch = (cocktail: any): number => {
    let score = 0

    score += (5 - Math.abs(cocktail.sweetness - preferences.sweetness)) * 8
    score += (5 - Math.abs(cocktail.strength - preferences.strength)) * 8
    score += (5 - Math.abs(cocktail.fruitiness - preferences.fruitiness)) * 8
    score += (5 - Math.abs(cocktail.bitterness - preferences.bitterness)) * 8

    if (preferences.preferredSpirits.length > 0) {
      const hasPreferredSpirit = cocktail.spirits.some((spirit: string) =>
        preferences.preferredSpirits.includes(spirit),
      )
      score += hasPreferredSpirit ? 30 : 0
    } else {
      score += 15
    }

    const hasAvoidedIngredient = cocktail.ingredients.some((ingredient: string) =>
      preferences.avoidIngredients.includes(ingredient),
    )
    score += hasAvoidedIngredient ? 0 : 30

    return Math.min(100, Math.max(0, score))
  }

  const generateRecommendations = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const scored = cocktailDatabase.map((cocktail) => ({
      ...cocktail,
      matchScore: calculateMatch(cocktail),
      reasons: getMatchReasons(cocktail),
    }))

    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)
    setRecommendations(sorted)
    setIsLoading(false)
    setStep("results")
  }

  const getMatchReasons = (cocktail: any): string[] => {
    const reasons = []

    if (Math.abs(cocktail.sweetness - preferences.sweetness) <= 1) {
      reasons.push("Idealna słodycz")
    }
    if (Math.abs(cocktail.strength - preferences.strength) <= 1) {
      reasons.push("Odpowiednia moc")
    }
    if (cocktail.spirits.some((spirit: string) => preferences.preferredSpirits.includes(spirit))) {
      reasons.push("Twój ulubiony alkohol")
    }
    if (Math.abs(cocktail.fruitiness - preferences.fruitiness) <= 1) {
      reasons.push("Owocowy profil")
    }

    return reasons
  }

  const SliderInput = ({
    label,
    value,
    onChange,
    min = 1,
    max = 5,
    leftLabel,
    rightLabel,
    icon,
    colorClass,
  }: {
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    leftLabel: string
    rightLabel: string
    icon?: React.ReactNode
    colorClass: string
  }) => (
    <div className="p-6 glass-strong rounded-3xl backdrop-blur-md transition-all duration-300 hover:bg-white/5 border border-white/5 group">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-lg text-white">{label}</h4>
          <div className="text-xs text-white/50 font-mono tracking-wider">POZIOM: {value}/5</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-12 flex items-center">
          {/* Custom Range Track */}
          <div className="absolute w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-300`}
              style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            />
          </div>

          {/* Custom Thumb (simulated via standard input for interaction) */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number.parseInt(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />

          {/* Visual Thumb */}
          <div
            className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-white/50 transition-all duration-300 pointer-events-none"
            style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 12px)` }}
          >
            <div className={`w-full h-full rounded-full opacity-50 bg-gradient-to-br ${colorClass} animate-pulse`} />
          </div>
        </div>

        <div className="flex justify-between text-xs font-semibold text-white/60 uppercase tracking-widest">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                Profil Smakowy
              </h3>
              <p className="text-white/60 text-lg">Zacznijmy od podstaw Twojego gustu</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <SliderInput
                label="Słodycz"
                value={preferences.sweetness}
                onChange={(value) => setPreferences((prev) => ({ ...prev, sweetness: value }))}
                leftLabel="Wytrawne"
                rightLabel="Słodkie"
                icon={<Candy className="w-6 h-6 text-white" />}
                colorClass="from-pink-500 to-rose-500"
              />
              <SliderInput
                label="Moc alkoholu"
                value={preferences.strength}
                onChange={(value) => setPreferences((prev) => ({ ...prev, strength: value }))}
                leftLabel="Łagodne"
                rightLabel="Mocne"
                icon={<Flame className="w-6 h-6 text-white" />}
                colorClass="from-orange-500 to-red-600"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-500">
                Charakter Koktajlu
              </h3>
              <p className="text-white/60 text-lg">Jakie nuty dominujące preferujesz?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <SliderInput
                label="Owocowość"
                value={preferences.fruitiness}
                onChange={(value) => setPreferences((prev) => ({ ...prev, fruitiness: value }))}
                leftLabel="Subtelna"
                rightLabel="Soczysta"
                icon={<Citrus className="w-6 h-6 text-white" />}
                colorClass="from-yellow-400 to-lime-500"
              />
              <SliderInput
                label="Gorycz"
                value={preferences.bitterness}
                onChange={(value) => setPreferences((prev) => ({ ...prev, bitterness: value }))}
                leftLabel="Brak"
                rightLabel="Wyraźna"
                icon={<Droplets className="w-6 h-6 text-white" />}
                colorClass="from-emerald-500 to-teal-600"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-500">
                Baza Alkoholowa
              </h3>
              <p className="text-white/60 text-lg">Wybierz swoje ulubione (możesz zaznaczyć kilka)</p>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {spirits.map((spirit) => (
                  <button
                    key={spirit}
                    onClick={() => {
                      setPreferences((prev) => ({
                        ...prev,
                        preferredSpirits: prev.preferredSpirits.includes(spirit)
                          ? prev.preferredSpirits.filter((s) => s !== spirit)
                          : [...prev.preferredSpirits, spirit],
                      }))
                    }}
                    className={`relative p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 group overflow-hidden ${preferences.preferredSpirits.includes(spirit)
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105 ring-2 ring-indigo-400"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:scale-105"
                      }`}
                  >
                    <GlassWater className={`w-6 h-6 ${preferences.preferredSpirits.includes(spirit) ? "animate-bounce" : ""}`} />
                    <span className="font-semibold">{spirit}</span>

                    {preferences.preferredSpirits.includes(spirit) && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-500">
                Czego Unikać?
              </h3>
              <p className="text-white/60 text-lg">Wyklucz składniki, za którymi nie przepadasz</p>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {commonIngredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => {
                      setPreferences((prev) => ({
                        ...prev,
                        avoidIngredients: prev.avoidIngredients.includes(ingredient)
                          ? prev.avoidIngredients.filter((i) => i !== ingredient)
                          : [...prev.avoidIngredients, ingredient],
                      }))
                    }}
                    className={`relative p-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 ${preferences.avoidIngredients.includes(ingredient)
                        ? "bg-red-900/40 border-red-500/50 text-red-200 shadow-lg ring-1 ring-red-500/50"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                  >
                    {preferences.avoidIngredients.includes(ingredient) ? (
                      <Ban className="w-4 h-4 text-red-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/30" />
                    )}
                    <span className="font-medium">{ingredient}</span>
                  </button>
                ))}
              </div>
              {preferences.avoidIngredients.length === 0 && (
                <div className="mt-6 flex justify-center">
                  <Badge variant="outline" className="text-green-400 border-green-500/30 px-4 py-2 bg-green-900/10">
                    <Zap className="w-4 h-4 mr-2" />
                    Jesteś otwarty na wszystko!
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // --- Main Render with Unified Container ---
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden min-h-[1000px]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header - Always Visible */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Wine className="w-8 h-8 text-amber-400 mr-3" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 tracking-tight">
              AI Bartender
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Odkryj Swój <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 animate-gradient-x">Idealny Smak</span>
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Nasz inteligentny kurator przeanalizuje Twoje preferencje i dobierze koktajle, które pokochasz od pierwszego łyku.
          </p>
        </div>

        {/* Content Area - Min Height enforced */}
        <div className="min-h-[600px] transition-all duration-500">

          {/* LOADING STATE */}
          {isLoading && (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
              <Card className="glass-strong rounded-[3rem] p-16 relative overflow-hidden min-h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-amber-900/20 animate-pulse"></div>
                <div className="relative text-center space-y-8">
                  <div className="w-24 h-24 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-full animate-spin blur-md opacity-70"></div>
                    <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center border border-white/10">
                      <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Mieszamy Smaki...</h3>
                    <p className="text-white/60 text-lg">Algorytm dobiera najlepsze kompozycje</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* RESULTS STATE */}
          {!isLoading && step === "results" && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-200 font-semibold tracking-wide uppercase text-sm">Twoja Personalizacja</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 mb-4">
                    Czekają na Ciebie
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
                  {recommendations.map((cocktail, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {index === 0 && (
                        <div className="absolute -inset-[2px] bg-gradient-to-b from-amber-400 via-purple-500 to-indigo-500 rounded-[2rem] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                      )}

                      <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 group-hover:-translate-y-2 transition-transform duration-500 flex flex-col">
                        {/* Card Content ... Same as before ... */}
                        <div className="relative h-72 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                          <img
                            src={cocktail.image || "/placeholder.svg"}
                            alt={cocktail.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 z-20">
                            <div className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-lg backdrop-blur-md border ${index === 0
                                ? "bg-amber-500/80 text-white border-amber-400/50"
                                : "bg-white/10 text-white border-white/20"
                              }`}>
                              {cocktail.matchScore}%
                            </div>
                          </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{cocktail.name}</h3>
                            <div className="p-2 bg-white/5 rounded-full">
                              <Heart className="w-5 h-5 text-white/50 group-hover:text-red-500 transition-colors" />
                            </div>
                          </div>
                          <div className="text-amber-500 font-mono text-lg font-bold mb-4">{cocktail.price}</div>
                          <p className="text-white/70 leading-relaxed mb-6 flex-grow">{cocktail.description}</p>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {cocktail.reasons.map((reason, idx) => (
                                <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => {
                      setStep("preferences")
                      setCurrentStep(1)
                    }}
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/20 hover:bg-white/10 hover:border-white/40 text-white px-8 h-14 backdrop-blur-md"
                  >
                    <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-700" />
                    Zacznij od nowa
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ STATE */}
          {!isLoading && step === "preferences" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-12 max-w-md mx-auto">
                <div className="flex justify-between items-center relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full -z-10"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-purple-600 -translate-y-1/2 rounded-full -z-10 transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                  ></div>

                  {[...Array(totalSteps)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 relative group">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${i + 1 <= currentStep
                            ? "bg-black border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110"
                            : "bg-black border-white/10 text-white/30"
                          }`}
                      >
                        {i < currentStep ? <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> : i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="glass-strong rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500 min-h-[500px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-white/5 to-transparent rounded-bl-[100%] pointer-events-none"></div>

                <div className="relative z-10 flex-grow flex flex-col justify-center">
                  {renderStepContent()}
                </div>

                <div className="flex justify-between items-center pt-10 mt-10 border-t border-white/10">
                  <Button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Wstecz
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                      className="rounded-full bg-white text-black hover:bg-amber-400 hover:scale-105 transition-all duration-300 font-bold px-8 h-12"
                    >
                      Dalej
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={generateRecommendations}
                      className="rounded-full bg-gradient-to-r from-amber-500 to-purple-600 hover:scale-105 transition-all duration-300 font-bold px-8 h-12 text-white shadow-lg shadow-amber-900/20"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Pokaż Wyniki
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

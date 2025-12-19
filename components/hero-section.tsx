"use client"
import { Wine, Sparkles, Users, MapPin, Phone, X, ChevronRight, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { Dancing_Script } from "next/font/google"

const dancing = Dancing_Script({ subsets: ["latin"] })

export function HeroSection() {
  const [activeDetail, setActiveDetail] = useState<string | null>(null)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const openingHours = {
    monday: { open: "18:00", close: "02:00", closed: false },
    tuesday: { open: "18:00", close: "02:00", closed: false },
    wednesday: { open: "18:00", close: "02:00", closed: false },
    thursday: { open: "18:00", close: "02:00", closed: false },
    friday: { open: "18:00", close: "03:00", closed: false },
    saturday: { open: "18:00", close: "03:00", closed: false },
    sunday: { open: "", close: "", closed: true },
  }

  const isCurrentlyOpen = () => {
    const now = currentTime
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = dayNames[now.getDay()]
    const todayHours = openingHours[today as keyof typeof openingHours]

    if (todayHours.closed) return false

    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeMinutes = currentHour * 60 + currentMinute

    const [openHour, openMinute] = todayHours.open.split(":").map(Number)
    const openTimeMinutes = openHour * 60 + openMinute

    const [closeHour, closeMinute] = todayHours.close.split(":").map(Number)
    let closeTimeMinutes = closeHour * 60 + closeMinute

    if (closeTimeMinutes < openTimeMinutes) {
      closeTimeMinutes += 24 * 60
      if (currentTimeMinutes < 12 * 60) {
        // Before noon, add 24 hours
        return currentTimeMinutes + 24 * 60 >= openTimeMinutes && currentTimeMinutes + 24 * 60 <= closeTimeMinutes
      }
    }

    return currentTimeMinutes >= openTimeMinutes && currentTimeMinutes <= closeTimeMinutes
  }

  const getTodayHours = () => {
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const today = dayNames[currentTime.getDay()]
    const todayHours = openingHours[today as keyof typeof openingHours]

    if (todayHours.closed) return "Zamknięte"
    return `${todayHours.open} - ${todayHours.close}`
  }

  const details = {
    wine: {
      title: "Nasze Koktajle",
      content:
        "Odkryj naszą kolekcję unikalnych koktajli inspirowanych filmami i popkulturą. Od klasycznych drinków po autorskie kreacje - każdy koktajl to opowieść w szklance.",
    },
    sparkles: {
      title: "Atmosfera",
      content:
        "Zanurz się w magicznej atmosferze naszego baru. Klimatyczne oświetlenie, filmowa scenografia i niepowtarzalny design tworzą idealne miejsce na niezapomniane wieczory.",
    },
    users: {
      title: "Wydarzenia",
      content:
        "Organizujemy tematyczne wieczory, degustacje koktajli i prywatne imprezy. Dołącz do naszej społeczności miłośników dobrego drinka i wyjątkowych doświadczeń.",
    },
    location: {
      title: "Lokalizacja",
      content:
        "Znajdziesz nas w sercu Lublina. Nocny Portier to miejsce, gdzie tradycja spotyka się z nowoczesnością, a każda wizyta to podróż przez świat smaków.",
    },
    phone: {
      title: "Kontakt",
      content:
        "Zarezerwuj stolik lub zamów koktajle na wynos. Skontaktuj się z nami, aby umówić prywatne wydarzenie lub dowiedzieć się więcej o naszej ofercie.",
    },
  }

  const sidebarItems = [
    { id: "wine", icon: Wine, label: "Koktajle" },
    { id: "sparkles", icon: Sparkles, label: "Atmosfera" },
    { id: "users", icon: Users, label: "Wydarzenia" },
    { id: "location", icon: MapPin, label: "Lokalizacja" },
    { id: "phone", icon: Phone, label: "Kontakt" },
  ]

  const toggleExpanded = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-new.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Decorative Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className={`${dancing.className} text-[15vw] md:text-[12rem] italic leading-none select-none tracking-tighter`}
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245, 158, 11, 0.8)', // Amber-500 equivalent
              textShadow: '0 0 20px rgba(245, 158, 11, 0.3), 0 0 10px rgba(124, 58, 237, 0.3)' // Amber + Purple glow
            }}
          >
            Zapraszam
          </span>
        </div>
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="glass-strong rounded-xl px-4 py-2 shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isCurrentlyOpen() ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">{isCurrentlyOpen() ? "Otwarte" : "Zamknięte"}</span>
          </div>
        </div>
      </div>

      {activeDetail && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8">
          <div
            className="glass-strong rounded-3xl p-6 md:p-8 w-full max-w-[90vw] md:max-w-md mx-auto transform transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in max-h-[80vh] overflow-y-auto"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-foreground">
                {details[activeDetail as keyof typeof details]?.title}
              </h3>
              <button
                onClick={() => setActiveDetail(null)}
                className="glass rounded-full p-2 hover:glass-strong transition-all duration-300"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              {details[activeDetail as keyof typeof details]?.content}
            </p>
          </div>
        </div>
      )}

      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              const isExpanded = expandedItem === item.id

              return (
                <div key={item.id} className="relative group">
                  <div
                    className={`absolute left-6 top-6 h-px bg-primary/30 transition-all duration-500 ${isExpanded ? "w-8" : "w-4"
                      }`}
                  />

                  <div
                    className={`relative glass rounded-2xl p-3 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isExpanded ? "glass-strong scale-110" : "hover:glass-strong"
                      }`}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.01)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <Icon
                      className={`w-6 h-6 text-primary transition-all duration-300 ${isExpanded ? "rotate-12" : ""}`}
                    />
                  </div>

                  <div
                    className={`absolute right-16 top-0 transition-all duration-500 ease-out ${isExpanded
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                      }`}
                  >
                    <div
                      className="glass-strong rounded-2xl p-4 min-w-[280px] shadow-xl"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-foreground">
                          {details[item.id as keyof typeof details]?.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedItem(null)
                          }}
                          className="glass rounded-full p-1 hover:glass-strong transition-all duration-200"
                        >
                          <X className="w-4 h-4 text-foreground/70" />
                        </button>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {details[item.id as keyof typeof details]?.content}
                      </p>

                      <button
                        onClick={() => setActiveDetail(item.id)}
                        className="mt-3 glass rounded-lg px-3 py-2 text-xs text-primary hover:glass-strong transition-all duration-200 flex items-center gap-2"
                      >
                        Dowiedz się więcej
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <div className="glass rounded-xl px-3 py-1 text-sm text-foreground/90">Koktajle Tematyczne</div>
        <div className="glass rounded-xl px-3 py-1 text-sm text-foreground/90">Atmosfera Filmowa</div>
        <div className="glass rounded-xl px-3 py-1 text-sm text-foreground/90">Craft Bartending</div>
      </div>
    </section>
  )
}

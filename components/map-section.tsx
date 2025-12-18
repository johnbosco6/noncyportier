"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Clock, Phone } from "lucide-react"

export function MapSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const address = "Boczna Krakowskie Przedmieście 10, Lublin, Poland"
  const encodedAddress = encodeURIComponent(address)

  return (
    <section id="location" className="py-20 px-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
            <MapPin className="w-8 h-8 text-primary animate-bounce" />
            <h2 className="text-5xl font-bold text-glow">Znajdź Nas</h2>
            <MapPin className="w-8 h-8 text-primary animate-bounce delay-300" />
          </div>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in-up">
            Odwiedź nas w sercu Lublina i doświadcz magii naszych koktajli
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Container */}
          <div className="relative group">
            <div className="glass-nav rounded-3xl p-2 overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
              {/* Loading Animation */}
              {!isLoaded && (
                <div className="aspect-[4/3] bg-gradient-to-br from-background/50 to-background/20 rounded-2xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <p className="text-foreground/60 animate-pulse">Ładowanie mapy...</p>
                  </div>
                </div>
              )}

              {/* OpenStreetMap Embed */}
              {isLoaded && (
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=22.5640%2C51.2460%2C22.5740%2C51.2520&layer=mapnik&marker=51.2490%2C22.5690"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "grayscale(100%) contrast(1.3) brightness(0.8) invert(0.1)",
                      transition: "all 0.5s ease",
                    }}
                    allowFullScreen
                    loading="lazy"
                    className="hover:filter-none transition-all duration-700"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setMapError(true)}
                  />

                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Interactive Pin */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative animate-bounce">
                      <MapPin className="w-10 h-10 text-primary drop-shadow-2xl" fill="currentColor" />
                      <div className="absolute -inset-3 bg-primary/30 rounded-full animate-ping"></div>
                      <div className="absolute -inset-1 bg-primary/50 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Location Label */}
                  <div className="absolute bottom-4 left-4 glass-nav rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-sm font-medium text-primary">Nocny Portier</p>
                    <p className="text-xs text-foreground/70">Lublin, Poland</p>
                  </div>
                </div>
              )}

              {/* Map Error Fallback */}
              {mapError && (
                <div className="aspect-[4/3] bg-gradient-to-br from-background/50 to-background/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-foreground/40 mx-auto mb-4" />
                    <p className="text-foreground/60">Nie można załadować mapy</p>
                    <a
                      href={`https://maps.google.com/?q=${encodedAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Otwórz w Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Animated Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-gradient-x"></div>
          </div>

          {/* Location Info */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="glass-nav rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-fade-in-right">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-glow">Adres</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Boczna Krakowskie Przedmieście 10
                    <br />
                    Lublin, Poland
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodedAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:text-primary/80 transition-colors group"
                  >
                    <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Nawiguj
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="glass-nav rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-fade-in-right delay-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-glow">Kontakt</h3>
                  <a
                    href="tel:+48452836820"
                    className="text-foreground/80 hover:text-primary transition-colors text-lg"
                  >
                    +48 452 836 820
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="glass-nav rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-fade-in-right delay-400">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-glow">Godziny Otwarcia</h3>
                  <div className="space-y-2 text-foreground/80">
                    <div className="flex justify-between">
                      <span>Pon - Czw</span>
                      <span>18:00 - 02:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pią - Sob</span>
                      <span>18:00 - 04:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niedziela</span>
                      <span>19:00 - 01:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 animate-fade-in-right delay-600">
              <a
                href={`https://maps.google.com/?q=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass-nav rounded-xl p-4 text-center hover:bg-primary/10 transition-all duration-300 group"
              >
                <Navigation className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Nawigacja</span>
              </a>
              <a
                href="tel:+48452836820"
                className="flex-1 glass-nav rounded-xl p-4 text-center hover:bg-accent/10 transition-all duration-300 group"
              >
                <Phone className="w-6 h-6 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Zadzwoń</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

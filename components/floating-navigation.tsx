"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wine, Users, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Koktajle", href: "#cocktails", icon: Wine },
    { name: "O Nas", href: "#about", icon: Users },
    { name: "Lokalizacja", href: "#location", icon: MapPin },
    { name: "Kontakt", href: "#contact", icon: Phone },
  ]

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "glass"
      } rounded-2xl px-6 py-3`}
    >
      <div className="flex items-center justify-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center mr-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped-Nocny-Portier-logo_-png.png-VhnpeZbbGwHifzPPWkeJZISQW1Rsnz.webp"
              alt="Nocny Portier Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-200 hover:text-glow"
            >
              <item.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped-Nocny-Portier-logo_-png.png-VhnpeZbbGwHifzPPWkeJZISQW1Rsnz.webp"
              alt="Nocny Portier Logo"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
          </div>

          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-border">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex justify-center text-foreground/80 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

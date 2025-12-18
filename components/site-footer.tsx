"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden mt-20">
      {/* Background with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/footer-bg.png"
          alt="Bar ambiance"
          fill
          className="object-cover object-center brightness-50 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="border border-white/10 rounded-3xl p-10 backdrop-blur-md bg-white/5 shadow-2xl relative overflow-hidden group">
          
          {/* Glass Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/0 to-white/5 pointer-events-none" />
          
          {/* Gradient Border Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white/80">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
                  Nocny Portier
                </h3>
                <p className="text-sm tracking-widest uppercase text-white/50">Cocktail Bar</p>
              </div>
              <p className="text-white/60 leading-relaxed text-sm">
                Odkryj świat wyjątkowych smaków w miejscu, gdzie każda noc pisze swoją własną historię.
              </p>
              <div className="flex gap-4 pt-2">
                <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 transition-all border border-white/10 hover:border-amber-500/50">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 transition-all border border-white/10 hover:border-amber-500/50">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 transition-all border border-white/10 hover:border-amber-500/50">
                  <Twitter size={20} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-amber-500">Nawigacja</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="block hover:text-amber-400 transition-colors hover:translate-x-1 duration-300">
                    Strona Główna
                  </Link>
                </li>
                <li>
                  <Link href="#cocktails" className="block hover:text-amber-400 transition-colors hover:translate-x-1 duration-300">
                    Menu Koktajli
                  </Link>
                </li>
                <li>
                  <Link href="#events" className="block hover:text-amber-400 transition-colors hover:translate-x-1 duration-300">
                    Wydarzenia
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="block hover:text-amber-400 transition-colors hover:translate-x-1 duration-300">
                    O Nas
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="block hover:text-amber-400 transition-colors hover:translate-x-1 duration-300">
                    Rezerwacje
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-amber-500">Kontakt</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-amber-500 shrink-0 mt-1" size={18} />
                  <span className="text-white/60 hover:text-white transition-colors">
                    Boczna Krakowskie<br /> Przedmieście 10<br />Lublin, Poland
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-amber-500 shrink-0" size={18} />
                  <span className="text-white/60 hover:text-white transition-colors">+48 452 836 820</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-amber-500 shrink-0" size={18} />
                  <span className="text-white/60 hover:text-white transition-colors">kontakt@nocnyportier.pl</span>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-amber-500">Godziny Otwarcia</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center text-white/60 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-2"><Clock size={14} /> Pon - Czw</span>
                  <span>18:00 - 02:00</span>
                </li>
                <li className="flex justify-between items-center text-white/60 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-2"><Clock size={14} /> Pt - Sob</span>
                  <span className="text-amber-400">18:00 - 04:00</span>
                </li>
                <li className="flex justify-between items-center text-white/60 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-2"><Clock size={14} /> Niedziela</span>
                  <span>Zamknięte</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Nocny Portier. Wszystkie prawa zastrzeżone.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-amber-400 transition-colors">Polityka Prywatności</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Regulamin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

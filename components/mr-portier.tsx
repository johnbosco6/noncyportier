"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    MapPin,
    Phone,
    Calendar,
    FileText,
    HelpCircle,
    X,
    ChevronRight,
    Navigation,
    Clock,
    Instagram,
    Facebook,
    Bot,
    Sparkles
} from "lucide-react"

export function MrPortier() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<"home" | "faq" | "location">("home")

    const faqs = [
        {
            question: "Jaki jest dress code?",
            answer: "Obowiązuje styl smart casual. Cenimy elegancję, ale najważniejszy jest Twój komfort.",
        },
        {
            question: "Czy wymagana jest rezerwacja?",
            answer: "W weekendy rekomendujemy rezerwację. W tygodniu zazwyczaj znajdziemy wolny stolik, ale warto zadzwonić.",
        },
        {
            question: "Czy organizujecie imprezy zamknięte?",
            answer: "Tak! Oferujemy wynajem Dolnej Sali lub całego lokalu na wyłączność. Skontaktuj się z nami po szczegóły.",
        },
    ]

    return (
        <>
            {/* Floating Trigger Button */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="relative w-16 h-16 rounded-full bg-black border border-amber-500/50 shadow-2xl flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-300"
                    >
                        {/* Using the monkey image as requested/implied by previous context or fallback to a classy icon */}
                        <img
                            src="/images/ai-bartender-monkey.jpg"
                            alt="Mr Portier"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-black">
                            <Bot className="w-8 h-8 text-amber-400" />
                        </div>
                    </Button>
                    <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        Potrzebujesz pomocy?
                    </div>
                </div>
            )}

            {/* Main Widget Interface */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[380px] h-[600px] max-h-[80vh] glass-strong rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-white/10">

                    {/* Header */}
                    <div className="relative h-32 bg-gradient-to-br from-indigo-900 to-black p-6 flex items-start justify-between shrink-0">
                        <div className="absolute inset-0 bg-[url('/footer-bg.png')] bg-cover opacity-30 mix-blend-overlay"></div>

                        <div className="relative z-10 flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 shadow-xl overflow-hidden relative bg-black">
                                <img src="/images/ai-bartender-monkey.jpg" alt="Mr Portier" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-white">Mr. Portier</h3>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] uppercase font-bold text-green-400 tracking-wider">Do usług</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="ghost"
                            className="relative z-10 text-white/50 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex p-2 gap-2 border-b border-white/5 bg-black/20 shrink-0">
                        {[
                            { id: 'home', label: 'Start', icon: <Bot className="w-4 h-4" /> },
                            { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
                            { id: 'location', label: 'Dojazd', icon: <MapPin className="w-4 h-4" /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === tab.id
                                    ? "bg-amber-500 text-black shadow-lg shadow-amber-900/20"
                                    : "text-white/50 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-black/40 to-transparent relative">

                        {/* HOME TAB */}
                        {activeTab === 'home' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="glass rounded-2xl p-4 border-l-4 border-amber-500">
                                    <p className="text-sm text-white/80 leading-relaxed">
                                        Witaj! Jak mogę Ci dzisiaj pomóc? Wybierz jedną z szybkich akcji poniżej.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setShowReservation(true)}
                                        className="flex flex-col items-center justify-center gap-2 p-4 glass rounded-2xl hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-300 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Calendar className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <span className="text-xs font-bold text-white">Rezerwacja</span>
                                    </button>

                                    <a href="#menu" className="flex flex-col items-center justify-center gap-2 p-4 glass rounded-2xl hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-xs font-bold text-white">Menu</span>
                                    </a>

                                    <a href="tel:+48452836820" className="flex flex-col items-center justify-center gap-2 p-4 glass rounded-2xl hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span className="text-xs font-bold text-white">Zadzwoń</span>
                                    </a>

                                    <button onClick={() => setActiveTab('location')} className="flex flex-col items-center justify-center gap-2 p-4 glass rounded-2xl hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Navigation className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="text-xs font-bold text-white">Dojazd</span>
                                    </button>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Dzisiaj otwarte</h4>
                                    <div className="glass rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-amber-400" />
                                            <span className="text-sm font-semibold">Czwartek</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">18:00 - 02:00</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQ TAB */}
                        {activeTab === 'faq' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-lg font-bold text-white mb-2">Częste Pytania</h3>
                                {faqs.map((faq, i) => (
                                    <div key={i} className="glass rounded-2xl overflow-hidden group">
                                        <div className="p-4 cursor-help hover:bg-white/5 transition-colors">
                                            <h4 className="text-sm font-bold text-amber-200 mb-2 flex items-start gap-2">
                                                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                                {faq.question}
                                            </h4>
                                            <p className="text-sm text-white/70 leading-relaxed pl-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-8 p-4 glass rounded-2xl text-center">
                                    <p className="text-sm text-white/60 mb-3">Masz inne pytanie?</p>
                                    <a href="tel:+48452836820" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors">
                                        <Phone className="w-4 h-4" />
                                        Zadzwoń do nas
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* LOCATION TAB */}
                        {activeTab === 'location' && (
                            <div className="space-y-6 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 group">
                                    {/* Using location image or map placeholder */}
                                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                        <MapPin className="w-12 h-12 text-white/20" />
                                    </div>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2497.643886568285!2d22.5640!3d51.2460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDE0JzQ1LjYiTiAyMsKwMzMnNTAuNCJF!5e0!3m2!1spl!2spl!4v1635760000000!5m2!1spl!2spl"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                        loading="lazy"
                                        className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    ></iframe>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-amber-400 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-white">Nocny Portier</h4>
                                            <p className="text-sm text-white/60">Boczna Krakowskie Przedmieście 10</p>
                                            <p className="text-sm text-white/60">20-002 Lublin</p>
                                        </div>
                                    </div>

                                    <a
                                        href="https://maps.google.com/?q=Nocny+Portier+Lublin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Navigation className="w-4 h-4" />
                                        Nawiguj
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer Socials */}
                    <div className="p-4 border-t border-white/10 bg-black/40 flex justify-center gap-4 shrink-0">
                        <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-pink-500 transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-blue-500 transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}

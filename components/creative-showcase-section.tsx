"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Playfair_Display, Dancing_Script } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })
const dancing = Dancing_Script({ subsets: ["latin"] })

export function CreativeShowcaseSection() {
    return (
        <section className="py-32 px-6 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-900 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="relative order-2 lg:order-1">
                        <div className={`space-y-8 ${playfair.className} italic`}>
                            {/* Floating handwritten elements */}
                            <div className="absolute -top-20 -left-10 opacity-20 pointer-events-none select-none">
                                <span className={`${dancing.className} text-9xl text-white/5`}>Art</span>
                            </div>

                            <div className="glass-nav rounded-[2rem] p-10 backdrop-blur-md border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-10 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-[2rem]">
                                    <Sparkles className="w-8 h-8 text-amber-400/50 animate-pulse" />
                                </div>

                                <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-white to-amber-200 mb-6 leading-tight">
                                    <span className="block hover:translate-x-4 transition-transform duration-500">Poczuj</span>
                                    <span className="block ml-12 text-amber-500/90 hover:translate-x-4 transition-transform duration-500 delay-100">Magię</span>
                                    <span className="block hover:translate-x-4 transition-transform duration-500 delay-200">Detalu</span>
                                </h2>

                                <p className="text-xl text-white/70 font-light leading-relaxed mb-8 max-w-md">
                                    W Nocnym Portierze każdy koktajl jest dziełem sztuki.
                                    <span className={`${dancing.className} text-2xl text-amber-400 mx-2`}>
                                        Zanurz się
                                    </span>
                                    w świecie, gdzie smak spotyka się z wyobraźnią, a chwile stają się wspomnieniami.
                                </p>

                                <div className="flex gap-4 items-center">
                                    <div className="h-[1px] w-20 bg-gradient-to-r from-amber-500 to-transparent"></div>
                                    <span className={`${dancing.className} text-2xl text-white/50 tracking-widest`}>Est. 2025</span>
                                </div>
                            </div>

                            {/* Animated Floating Words */}
                            <div className="absolute -bottom-12 right-0">
                                <span className={`${dancing.className} text-3xl text-white/30 animate-bounce delay-700 block rotate-[-6deg]`}>
                                    Czysta Ekstaza
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Image Art Showcase */}
                    <div className="relative order-1 lg:order-2 flex justify-center items-center">

                        {/* Orbiting Elements */}
                        <div className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-30 pointer-events-none">
                            <div className="absolute top-0 left-1/2 w-4 h-4 bg-amber-400 rounded-full blur-[2px] shadow-[0_0_20px_rgba(251,191,36,0.8)]"></div>
                            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full blur-[1px]"></div>
                        </div>

                        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                            {/* Glass Sphere Effect Container */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full animate-pulse blur-3xl"></div>

                            {/* Main Image */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-amber-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>

                                <Image
                                    src="/bubble-detail.png"
                                    alt="Artistic Bubble Detail"
                                    fill
                                    className="object-cover scale-110 group-hover:scale-125 transition-transform duration-[20s] ease-linear rotate-0 group-hover:rotate-12"
                                />

                                {/* Embelishments */}
                                <div className="absolute inset-0 border-[1px] border-white/20 rounded-full scale-95 opacity-50"></div>
                                <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-105 opacity-30 animate-pulse"></div>

                                {/* Glare/Shine */}
                                <div className="absolute top-[20%] right-[20%] w-24 h-24 bg-white/20 blur-[40px] rounded-full"></div>
                            </div>

                            {/* Decorative Text Around */}
                            <div className="absolute -right-12 top-12 md:-right-20 md:top-20 glass px-6 py-3 rounded-xl rotate-12 hover:rotate-0 transition-transform duration-500 cursor-default">
                                <p className={`${dancing.className} text-xl md:text-2xl text-amber-200`}>Unikalny Charakter</p>
                            </div>
                            <div className="absolute -left-8 bottom-20 md:-left-16 glass px-6 py-3 rounded-xl -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-default">
                                <p className={`${dancing.className} text-xl md:text-2xl text-purple-200`}>Sztuka Smaku</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

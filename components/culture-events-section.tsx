"use client"

import Image from "next/image"
import { Mail } from "lucide-react"

export function CultureEventsSection() {
    return (
        <section className="py-24 px-6 relative overflow-hidden" id="events">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-20">

                {/* Intro Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20">
                            <Image
                                src="/bartender-pouring.jpg"
                                alt="Bartender preparing premium cocktail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                            Exclusive cocktail bar!
                        </h2>
                        <div className="space-y-4 text-white/80 leading-relaxed font-light">
                            <p className="text-lg">
                                Planning a corporate team-building event, birthday party, or other special event?
                            </p>
                            <p className="border-l-2 border-amber-500/50 pl-6 py-2 bg-white/5 rounded-r-lg backdrop-blur-sm">
                                <span className="font-semibold text-amber-400">Night Portier</span> is the perfect venue for your special occasion!
                                Our atmospheric space in the heart of the city guarantees an unforgettable atmosphere and excellent service.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing & Halls */}
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Lower Hall Card */}
                    <div className="lg:col-span-4 relative group">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-colors"></div>
                        <div className="relative h-full p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md hover:border-amber-500/30 transition-colors flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">Lower hall</h3>
                            <p className="text-white/50 text-sm mb-8 uppercase tracking-wider">(max. 30 people)</p>

                            <ul className="space-y-4 flex-grow">
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Sunday - Wednesday</span>
                                    <span className="font-mono text-amber-400 font-bold">3,000 PLN</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Thursday</span>
                                    <span className="font-mono text-amber-400 font-bold">5,000 PLN</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Friday, Saturday</span>
                                    <span className="font-mono text-amber-400 font-bold">6,000 PLN</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Image Divider */}
                    <div className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-white/20 min-h-[300px]">
                        <Image
                            src="/bar-interior.png"
                            alt="Atmospheric bar interior"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white/90 italic text-center font-light">
                                "Where every detail matters"
                            </p>
                        </div>
                    </div>

                    {/* Entire Premises Card */}
                    <div className="lg:col-span-4 relative group">
                        <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-colors"></div>
                        <div className="relative h-full p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md hover:border-purple-500/30 transition-colors flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">The entire premises</h3>
                            <p className="text-white/50 text-sm mb-8 uppercase tracking-wider">(max. 60 people)</p>

                            <ul className="space-y-4 flex-grow">
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Sunday - Wednesday</span>
                                    <span className="font-mono text-purple-400 font-bold">10,000 PLN</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Thursday</span>
                                    <span className="font-mono text-purple-400 font-bold">15,000 PLN</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-white/70">Friday, Saturday</span>
                                    <span className="font-mono text-purple-400 font-bold">25,000 PLN</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Info & Contact */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/5 to-white/0 p-8 md:p-12 backdrop-blur-md">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-xl font-semibold text-white">Event Details</h4>
                            <p className="text-white/70 leading-relaxed font-light">
                                The entire reservation amount is for the event participants to use at the bar. We guarantee an appropriate number of bartenders for the number of guests, ensuring everyone can enjoy professional service.
                            </p>
                            <p className="text-white/70 leading-relaxed font-light">
                                We also offer catering options. The menu and details are individually tailored to perfectly suit the nature of your event.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center items-start md:items-end space-y-6">
                            <div className="text-left md:text-right">
                                <h4 className="text-xl font-semibold text-white mb-2">Reservations & Details</h4>
                                <p className="text-white/60 text-sm">Contact us to book a date and arrange event details</p>
                            </div>

                            <a
                                href="mailto:Biuro@spektrumbar.com"
                                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                <div className="p-2 bg-amber-500 rounded-full text-white shadow-lg group-hover:rotate-12 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <span className="text-lg font-medium text-white tracking-wide">Biuro@spektrumbar.com</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

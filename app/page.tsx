import { FloatingNavigation } from "@/components/floating-navigation"
import { HeroSection } from "@/components/hero-section"
import { CocktailSlider } from "@/components/cocktail-slider"
import { CocktailCurator } from "@/components/cocktail-curator"
import { AboutSection } from "@/components/about-section"
// import { MapSection } from "@/components/map-section"
import { CreativeShowcaseSection } from "@/components/creative-showcase-section"
// import { ContactSection } from "@/components/contact-section"
import { CultureEventsSection } from "@/components/culture-events-section"
import { MrPortier } from "@/components/mr-portier"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="relative">
      <FloatingNavigation />

      <HeroSection />

      <section id="cocktails" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <CocktailSlider />
        </div>
      </section>

      <CocktailCurator />

      <AboutSection />

      <CreativeShowcaseSection />

      <CultureEventsSection />

      <MrPortier />

      <PWAInstallPrompt />

      <SiteFooter />
    </main>
  )
}

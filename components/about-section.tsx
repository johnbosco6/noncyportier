export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nocny-Portier-recenzja-Moj-Bar-Lublin-732x1024%20%281%29.jpg-3Lw6UcabfdF3rcMx8qvEHyNlVbxgkT.jpeg)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="glass-strong rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="grid gap-6">
            <div className="bg-white/[0.01] backdrop-blur-sm rounded-xl p-4 border border-white/5 text-center">
              <h2 className="text-2xl font-bold mb-3 text-glow opacity-90">O Nocnym Portierze</h2>
              <p className="text-sm text-foreground/60 mb-3 leading-relaxed">
                Nocny Portier to miejsce, gdzie koktajle stają się sztuką, a każdy drink opowiada własną historię.
              </p>

              <div className="flex justify-center gap-8 mt-4">
                <div>
                  <div className="text-2xl font-bold text-primary/80">10+</div>
                  <div className="text-xs text-foreground/60">Koktajli</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary/80">5★</div>
                  <div className="text-xs text-foreground/60">Ocena</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary/80">100%</div>
                  <div className="text-xs text-foreground/60">Autorskie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-6 relative"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OVR_3913.png-UZCUnOqtS3LjLMWEjomM0NVEJ2iXU6.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cropped-Nocny-Portier-logo_-png.png-QNtzwJ1RwqDkcd5dHgTDi4uY2mo9bc.webp"
            alt="Nocny Portier Logo"
            className="h-20 w-auto"
          />
        </div>

        <h2 className="text-4xl font-bold text-center mb-12 text-glow">Kontakt & Lokalizacja</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Informacje Kontaktowe</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="glass rounded-full p-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Adres</div>
                  <div className="text-foreground/80">Boczna Krakowskie Przedmieście 10, Lublin Poland</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="glass rounded-full p-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Telefon</div>
                  <div className="text-foreground/80">+48 452 836 820</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="glass rounded-full p-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-foreground/80">info@nocnyportier.pl</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="glass rounded-full p-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Godziny Otwarcia</div>
                  <div className="text-foreground/80">
                    Wt-Cz: 18:00-02:00
                    <br />
                    Pt-Sb: 18:00-03:00
                    <br />
                    Nd: 18:00-01:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sparkles,
  Heart,
  Coffee,
  Sun,
  Moon,
  CloudRain,
  Zap,
  Wine,
  Send,
  RotateCcw,
  User,
  Mail,
  CheckCircle,
  Brain,
  BookOpen,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bartender"
  content: string
  timestamp: Date
  cocktailSuggestion?: {
    name: string
    price: string
    image: string
    reason: string
  }
  showHistory?: boolean
  showSubscription?: boolean
}

interface MoodOption {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  description: string
}

interface TimeOfDay {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

export function AIBartender() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStep, setConversationStep] = useState<"greeting" | "mood" | "time" | "chat">("greeting")
  const [userEmail, setUserEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)

  const moods: MoodOption[] = [
    {
      id: "happy",
      label: "Szczęśliwy",
      icon: <Heart className="w-4 h-4" />,
      color: "text-pink-400",
      description: "Chcę świętować!",
    },
    {
      id: "relaxed",
      label: "Zrelaksowany",
      icon: <Coffee className="w-4 h-4" />,
      color: "text-blue-400",
      description: "Potrzebuję odpoczynku",
    },
    {
      id: "energetic",
      label: "Energiczny",
      icon: <Zap className="w-4 h-4" />,
      color: "text-yellow-400",
      description: "Pełen energii!",
    },
    {
      id: "romantic",
      label: "Romantyczny",
      icon: <Sparkles className="w-4 h-4" />,
      color: "text-purple-400",
      description: "Wieczór we dwoje",
    },
    {
      id: "adventurous",
      label: "Poszukujący przygód",
      icon: <Wine className="w-4 h-4" />,
      color: "text-orange-400",
      description: "Chcę spróbować czegoś nowego",
    },
    {
      id: "melancholic",
      label: "Melancholijny",
      icon: <CloudRain className="w-4 h-4" />,
      color: "text-gray-400",
      description: "Zamyślony nastrój",
    },
  ]

  const timeOptions: TimeOfDay[] = [
    { id: "morning", label: "Rano", icon: <Sun className="w-4 h-4" />, description: "Początek dnia" },
    { id: "afternoon", label: "Popołudnie", icon: <Coffee className="w-4 h-4" />, description: "Środek dnia" },
    { id: "evening", label: "Wieczór", icon: <Moon className="w-4 h-4" />, description: "Czas na relaks" },
    { id: "night", label: "Noc", icon: <Sparkles className="w-4 h-4" />, description: "Nocne życie" },
  ]

  const cocktailDatabase = [
    {
      name: "JOKER",
      price: "35 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-9.jpg-bc3gCyoHYdmoy5nDdMqpdYWS80YnQd.jpeg",
      moods: ["happy", "energetic", "adventurous"],
      times: ["evening", "night"],
      personality: "Szalony i nieprzewidywalny, idealny dla odważnych dusz",
      strength: "mocny",
      flavor: "słodko-kwaśny",
      temperature: "zimny",
      glassware: "coupe",
      garnish: "skórka pomarańczowa",
      difficulty: "średni",
      history: {
        origin: "Współczesna kreacja",
        year: "2020s",
        story:
          "Joker to nowoczesny koktajl stworzony specjalnie dla Nocny Portier. Inspirowany postacią Jokera z komiksów, ten drink łączy w sobie nieprzewidywalność smaków - od słodkich nut po pikantne akcenty. Jego charakterystyczny kolor i prezentacja sprawiają, że każdy łyk to niespodzianka. Bartenderzy tworzyli go przez miesiące, eksperymentując z różnymi kombinacjami, aż osiągnęli idealną równowagę między szaleństwem a harmonią smaków.",
        ingredients: "Wódka premium, likier malinowy, sok z limonki, syrop cukrowy, bitter pomarańczowy",
        funFact: "Każdy Joker jest podawany z innym garniturem - nigdy nie wiesz, co dostaniesz!",
      },
    },
    {
      name: "PACHNIDŁO",
      price: "36 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-4.jpg-RdBi1UYYAHu97xv3wvL3Hzh4lf0Gxd.jpeg",
      moods: ["romantic", "relaxed"],
      times: ["evening", "night"],
      personality: "Elegancki i zmysłowy, jak perfumy w płynnej formie",
      strength: "średni",
      flavor: "kwiatowo-cytrusowy",
      temperature: "schłodzony",
      glassware: "kieliszek koktajlowy",
      garnish: "płatki róży",
      difficulty: "łatwy",
      history: {
        origin: "Inspirowany francuską perfumerią",
        year: "2019",
        story:
          "Pachnidło powstało z fascynacji światem perfum i ich wpływem na zmysły. Nasz head bartender, podróżując po Prowansji, odkrył, jak aromaty mogą opowiadać historie. Ten koktajl to hołd dla sztuki perfumeryjnej - każdy składnik został wybrany nie tylko ze względu na smak, ale także na aromat. Kwiatowe nuty lawendy, cytrusowe akcenty bergamotki i delikatna wanilia tworzą kompozycję, która dosłownie 'pachnie' elegancją.",
        ingredients: "Gin botaniczny, likier lawendowy, sok z bergamotki, syrop waniliowy, białko jajka",
        funFact:
          "Koktajl jest podawany w kieliszku spryskiwanym wodą różaną - aromat czuć jeszcze przed pierwszym łykiem!",
      },
    },
    {
      name: "MANHATTAN",
      price: "45 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
      moods: ["melancholic", "relaxed"],
      times: ["evening", "night"],
      personality: "Klasyczny dżentelmen, poważny i wyrafinowany",
      strength: "mocny",
      flavor: "korzenno-słodki",
      temperature: "schłodzony",
      glassware: "kieliszek koktajlowy",
      garnish: "wiśnia marasca",
      difficulty: "średni",
      history: {
        origin: "Nowy Jork, USA",
        year: "1874",
        story:
          "Manhattan to jeden z najstarszych koktajli świata, stworzony w Manhattan Club w Nowym Jorku na cześć Lady Randolph Churchill (matki Winstona Churchilla). Legenda głosi, że koktajl powstał na bankiecie politycznym zorganizowanym przez tę wpływową kobietę. Przez ponad 150 lat Manhattan pozostaje symbolem wyrafinowania i klasy. W czasach prohibicji był jednym z niewielu koktajli, które przetrwały w niezmienionej formie, ukrywane w speakeasy całego kraju.",
        ingredients: "Whiskey rye, słodki wermut, bitter Angostura, wiśnia marasca",
        funFact: "Manhattan był ulubionym drinkiem Franka Sinatry, który zawsze prosił o podanie go 'on the rocks'!",
      },
    },
    {
      name: "MAI TAI",
      price: "34 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-17.jpg-0cDmu1xuihu69kGtDvvB54FcDyzHJh.jpeg",
      moods: ["happy", "energetic", "adventurous"],
      times: ["afternoon", "evening"],
      personality: "Tropikalny podróżnik, pełen słońca i egzotyki",
      strength: "średni",
      flavor: "słodko-kwaśny, owocowy",
      temperature: "zimny",
      glassware: "tiki mug",
      garnish: "miętka, limonka, wiśnia",
      difficulty: "łatwy",
      history: {
        origin: "Oakland, Kalifornia",
        year: "1944",
        story:
          "Mai Tai został stworzony przez Victora 'Tradera Vica' Bergeron w jego restauracji w Oakland. Nazwa pochodzi z tahitańskiego 'mai tai roa ae', co oznacza 'bardzo dobry'. Koktajl powstał, gdy Vic eksperymentował z 17-letnim rumem jamajskim. Gdy jego tahitańscy przyjaciele spróbowali drinka, wykrzyknęli właśnie te słowa. Mai Tai stał się symbolem kultury tiki i kalifornijskiego stylu życia lat 50. i 60., reprezentując marzenia o tropikalnym raju.",
        ingredients: "Rum ciemny, rum jasny, likier pomarańczowy, sok z limonki, syrop migdałowy, sok ananasowy",
        funFact: "Oryginalny Mai Tai nie zawierał soku ananasowego - został dodany później przez naśladowców!",
      },
    },
    {
      name: "COSMOPOLITAN",
      price: "33 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-16.jpg-EuKdP9Ut1JEVo4wL3yhUbqbZw0D4sz.jpeg",
      moods: ["romantic", "happy"],
      times: ["evening", "night"],
      personality: "Elegancka i stylowa, jak z wielkiego miasta",
      strength: "średni",
      flavor: "kwaśno-słodki, żurawinowy",
      temperature: "schłodzony",
      glassware: "kieliszek koktajlowy",
      garnish: "skórka z limonki",
      difficulty: "łatwy",
      history: {
        origin: "Nowy Jork / Miami",
        year: "1980s",
        story:
          "Cosmopolitan to koktajl, który definiował lata 90. i początek XXI wieku, głównie dzięki serialowi 'Seks w wielkim mieście'. Choć jego dokładne pochodzenie jest sporne, najprawdopodobniej został stworzony przez Toby'ego Cecchini w Nowym Jorku lub Cheryl Cook w Miami. Cosmo stał się symbolem niezależnych, miejskich kobiet - elegancki, różowy i pewny siebie. Jego popularność eksplodowała w latach 90., gdy stał się must-have'em w każdym modnym barze od Manhattanu po Los Angeles.",
        ingredients: "Wódka cytrusowa, likier pomarańczowy, sok żurawinowy, sok z limonki",
        funFact: "Serial 'Seks w wielkim mieście' sprawił, że sprzedaż Cosmopolitana wzrosła o 300% w latach 90.!",
      },
    },
    {
      name: "PRETTY WOMAN",
      price: "29 PLN",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92f7ff2e-e49b-4a35-b0f7-4e9329495a07-12.jpg-7yZ109dm5MH8lKca3wtsn0HzTatBix.jpeg",
      moods: ["happy", "romantic"],
      times: ["afternoon", "evening"],
      personality: "Słodka i urocza, bezalkoholowa księżniczka",
      strength: "bezalkoholowy",
      flavor: "słodki, owocowy",
      temperature: "zimny",
      glassware: "kieliszek do martini",
      garnish: "truskawka, listek mięty",
      difficulty: "bardzo łatwy",
      history: {
        origin: "Inspirowany filmem 'Pretty Woman'",
        year: "1990s",
        story:
          "Pretty Woman to bezalkoholowy koktajl stworzony w hołdzie kultowemu filmowi z Julią Roberts i Richardem Gere. Powstał w latach 90. jako odpowiedź na rosnące zapotrzebowanie na eleganckie drinki bezalkoholowe. Jego różowy kolor i słodki smak miały odzwierciedlać transformację głównej bohaterki filmu - od zwykłej dziewczyny do prawdziwej damy. Koktajl szybko zyskał popularność wśród osób, które chciały cieszyć się eleganckim drinkiem bez alkoholu.",
        ingredients: "Sok truskawkowy, sok ananasowy, sprite, syrop grenadyna, śmietanka",
        funFact:
          "Pretty Woman jest często wybierany na baby shower i wieczory panieńskie jako elegancka alternatywa dla alkoholowych koktajli!",
      },
    },
  ]

  const getSmartBartenderResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Cocktail knowledge base
    if (message.includes("składnik") || message.includes("ingredient")) {
      return "Jestem ekspertem od składników! 🧪 Każdy koktajl to precyzyjna chemia smaków. Czy chcesz poznać tajniki konkretnego drinka? Mogę opowiedzieć o technikach mieszania, proporcjach, a nawet o tym, dlaczego niektóre składniki nie lubią się ze sobą!"
    }

    if (message.includes("technik") || message.includes("jak robi")) {
      return "Ah, pytasz o sztukę bartenderingu! 🎯 Każda technika ma swoje zastosowanie: shake dla koktajli z sokami, stir dla spirit-forward drinków, build dla prostych mieszanek. Chcesz poznać sekrety konkretnej techniki? Mogę nauczyć Cię wszystkiego - od temperatury lodu po kąt nachylenia shakera!"
    }

    if (message.includes("alkohol") || message.includes("procent") || message.includes("mocny")) {
      return "Siła alkoholu to kluczowa sprawa! 💪 Nasze koktajle mają różną zawartość - od bezalkoholowych po mocne klasyki jak Manhattan (około 30% ABV). Zawsze dostosowuję propozycje do Twojej tolerancji. Wolisz coś delikatnego czy z charakterem?"
    }

    if (message.includes("kalori") || message.includes("dieta") || message.includes("zdrowy")) {
      return "Dbasz o linię? Szanuję to! 🥗 Mogę zaproponować koktajle niskokaloryczne - Pretty Woman (bezalkoholowy, ~80 kcal) lub wersje light naszych klasycznych drinków. Znam też składniki keto-friendly i opcje dla diabetyków!"
    }

    if (message.includes("pogoda") || message.includes("deszcz") || message.includes("słońce")) {
      return "Pogoda wpływa na nasze kubki smakowe! ☀️🌧️ W słoneczne dni polecam coś orzeźwiającego jak Mai Tai, w deszczowe - coś rozgrzewającego. A wiesz, że ciśnienie atmosferyczne wpływa na percepcję smaku? Fascynujące, prawda?"
    }

    if (message.includes("historia") || message.includes("pochodzenie") || message.includes("kto wymyślił")) {
      return "Historia koktajli to moja pasja! 📚 Każdy drink ma swoją opowieść - od Manhattan serwowanego na bankietach politycznych po Cosmopolitan, który zawojował świat dzięki 'Seks w wielkim mieście'. O którym koktajlu chcesz usłyszeć fascynującą historię?"
    }

    if (message.includes("muzyka") || message.includes("klimat") || message.includes("atmosfera")) {
      return "Muzyka i koktajle to idealne połączenie! 🎵 Jazz pasuje do Manhattan, elektronika do nowoczesnych kreacji jak Joker. Wiesz, że niektóre bary dobierają koktajle do playlist? To wpływa na całe doświadczenie smakowe!"
    }

    if (message.includes("kolor") || message.includes("wygląd") || message.includes("prezentacja")) {
      return "Oko też pije! 👁️ Kolor koktajlu wpływa na nasze oczekiwania smakowe. Czerwony sugeruje słodycz, zielony - świeżość. Nasze koktajle to prawdziwe dzieła sztuki - każdy garnitur ma znaczenie!"
    }

    if (message.includes("temperatura") || message.includes("lód") || message.includes("zimny")) {
      return "Temperatura to fundament dobrego koktajlu! 🧊 Używamy różnych rodzajów lodu - kostki do stirowania, crushed ice do tropikalnych drinków. Wiesz, że temperatura podania zmienia profil smakowy o 30%?"
    }

    if (message.includes("szkło") || message.includes("kieliszek") || message.includes("szklanka")) {
      return "Właściwe szkło to połowa sukcesu! 🥃 Coupe dla klasycznych koktajli, highball dla długich drinków, rocks glass dla spirit-forward. Każdy kształt wpływa na aromaty i temperaturę. To nie tylko estetyka - to nauka!"
    }

    // Seasonal recommendations
    const currentMonth = new Date().getMonth()
    if (message.includes("sezon") || message.includes("pora roku")) {
      if (currentMonth >= 2 && currentMonth <= 4) {
        return "Wiosna budzi się! 🌸 To czas na świeże, kwiatowe koktajle. Polecam coś z nutami lawendy lub elderflower. Pachnidło będzie idealny - jego aromaty harmonizują z wiosenną aurą!"
      } else if (currentMonth >= 5 && currentMonth <= 7) {
        return "Lato w pełni! ☀️ Czas na orzeźwiające, tropikalne smaki. Mai Tai z jego ananasowymi nutami to strzał w dziesiątkę. Albo może coś bezalkoholowego jak Pretty Woman?"
      } else if (currentMonth >= 8 && currentMonth <= 10) {
        return "Jesień to czas na głębsze smaki! 🍂 Polecam coś z whiskey lub rumem. Manhattan z jego bogactwem smaków idealnie pasuje do jesiennych wieczorów."
      } else {
        return "Zima wymaga czegoś rozgrzewającego! ❄️ Choć nasze koktajle są zimne, ich smaki mogą rozgrzać duszę. Joker z jego intensywnością to dobry wybór na zimowe wieczory."
      }
    }

    // Default smart response
    return "Fascynujące pytanie! 🤔 Jako AI bartender znam tysiące faktów o koktajlach, technikach mieszania i historii barmanstwa. Czy chcesz poznać jakąś konkretną ciekawostkę? Mogę opowiedzieć o składnikach, technikach, historii, a nawet o wpływie muzyki na smak koktajli!"
  }

  const getBartenderResponse = (mood: string, time: string): { message: string; cocktail: any } => {
    const matchingCocktails = cocktailDatabase.filter(
      (cocktail) => cocktail.moods.includes(mood) && cocktail.times.includes(time),
    )

    const selectedCocktail =
      matchingCocktails[Math.floor(Math.random() * matchingCocktails.length)] || cocktailDatabase[0]

    const moodResponses = {
      happy: "Widzę, że masz świetny nastrój! ✨ Energia pozytywna to najlepszy składnik każdego koktajlu!",
      relaxed: "Czas na chwilę wytchnienia... 🌙 Relaks to sztuka, a ja znam idealne drinki do medytacji smakowej.",
      energetic: "Energia bije od Ciebie! ⚡ Potrzebujesz czegoś, co dorówna Twojemu temperamentowi!",
      romantic: "Romantyczny wieczór? Idealnie! 💕 Miłość i koktajle to połączenie stare jak świat.",
      adventurous: "Gotowy na przygodę smakową? 🚀 Uwielbiam odważnych eksploratorów smaków!",
      melancholic: "Czasem potrzebujemy chwili zadumy... 🌧️ Najlepsze koktajle rodzą się z emocji.",
    }

    const timeResponses = {
      morning: "Poranek to czas na delikatne początki - jak pierwsza nuta w symfonii smaków",
      afternoon: "Popołudnie to idealna pora na coś orzeźwiającego - słońce wymaga odpowiedzi",
      evening: "Wieczór to czas na prawdziwe skarby - gdy dzień spotyka się z nocą",
      night: "Noc to czas na magię... gdy koktajle stają się eliksirami marzeń",
    }

    const message = `${moodResponses[mood as keyof typeof moodResponses]} ${timeResponses[time as keyof typeof timeResponses]} 

Mam dla Ciebie coś wyjątkowego - **${selectedCocktail.name}**! ${selectedCocktail.personality}

🎯 **Dlaczego to idealny wybór:**
• Siła: ${selectedCocktail.strength || "średnia"}
• Smak: ${selectedCocktail.flavor || "zbalansowany"}
• Podawany w: ${selectedCocktail.glassware || "eleganckim kieliszku"}

To idealny wybór na Twój obecny nastrój. Czy chciałbyś poznać więcej szczegółów o tym koktajlu?`

    return { message, cocktail: selectedCocktail }
  }

  const addMessage = (
    type: "user" | "bartender",
    content: string,
    cocktailSuggestion?: any,
    showHistory?: boolean,
    showSubscription?: boolean,
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      cocktailSuggestion,
      showHistory,
      showSubscription,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = async (callback: () => void) => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))
    setIsTyping(false)
    callback()
  }

  const handleMoodSelection = (moodId: string) => {
    setSelectedMood(moodId)
    const mood = moods.find((m) => m.id === moodId)
    addMessage("user", `Czuję się ${mood?.label.toLowerCase()}`)

    simulateTyping(() => {
      addMessage(
        "bartender",
        `Rozumiem! ${mood?.description} A teraz powiedz mi, jaka jest pora dnia? To pomoże mi dobrać idealną temperaturę i intensywność smaku.`,
      )
      setConversationStep("time")
    })
  }

  const handleTimeSelection = (timeId: string) => {
    setSelectedTime(timeId)
    const time = timeOptions.find((t) => t.id === timeId)
    addMessage("user", `Jest ${time?.label.toLowerCase()}`)

    if (selectedMood) {
      simulateTyping(() => {
        const { message, cocktail } = getBartenderResponse(selectedMood, timeId)
        addMessage("bartender", message, {
          name: cocktail.name,
          price: cocktail.price,
          image: cocktail.image,
          reason: cocktail.personality,
        })
        setConversationStep("chat")
        setConversationCount((prev) => prev + 1)
      })
    }
  }

  const getCocktailHistory = (cocktailName: string) => {
    const cocktail = cocktailDatabase.find((c) => c.name === cocktailName)
    if (!cocktail?.history) return null

    return `🍸 **Historia ${cocktailName}**

**Pochodzenie:** ${cocktail.history.origin} (${cocktail.history.year})

**Historia:**
${cocktail.history.story}

**Składniki:** ${cocktail.history.ingredients}

**Ciekawostka:** ${cocktail.history.funFact}

Czy chciałbyś poznać historię innego koktajlu z naszego menu?`
  }

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    addMessage("user", currentInput)
    const userMessage = currentInput.toLowerCase()
    setCurrentInput("")

    simulateTyping(() => {
      let response = ""

      // Check for subscription-related messages
      if (userMessage.includes("newsletter") || userMessage.includes("subskrypcja") || userMessage.includes("ofert")) {
        response =
          "Świetnie! 📧 Nasz newsletter to prawdziwa skarbnica wiedzy bartenderskiej! Otrzymasz:\n\n• Ekskluzywne przepisy na koktajle\n• Sezonowe rekomendacje\n• Pierwsze informacje o nowych drinkach\n• Specjalne promocje tylko dla subskrybentów\n\nPodaj swój email, a dołączysz do grona prawdziwych koneserów!"
        addMessage("bartender", response, undefined, false, true)
        return
      }

      // Smart knowledge responses
      if (userMessage.includes("historia") || userMessage.includes("więcej") || userMessage.includes("opowiedz")) {
        const cocktailNames = cocktailDatabase.map((c) => c.name.toLowerCase())
        const mentionedCocktail = cocktailNames.find((name) => userMessage.includes(name.toLowerCase()))

        if (mentionedCocktail) {
          const cocktail = cocktailDatabase.find((c) => c.name.toLowerCase() === mentionedCocktail)
          if (cocktail) {
            const history = getCocktailHistory(cocktail.name)
            if (history) {
              addMessage("bartender", history, undefined, true)
              return
            }
          }
        }

        response =
          "O którym koktajlu chciałbyś usłyszeć więcej? 📚 Mam fascynujące historie o Manhattan, Cosmopolitan, Mai Tai i innych! Każdy ma swoją unikalną opowieść pełną ciekawostek i tajemnic."
      } else if (userMessage.includes("tak") || userMessage.includes("yes") || userMessage.includes("chcę")) {
        const lastBartenderMessage = messages.filter((m) => m.type === "bartender" && m.cocktailSuggestion).pop()
        if (lastBartenderMessage?.cocktailSuggestion) {
          const history = getCocktailHistory(lastBartenderMessage.cocktailSuggestion.name)
          if (history) {
            addMessage("bartender", history, undefined, true)
            return
          }
        }
        response = "Świetnie! O którym koktajlu chciałbyś usłyszeć więcej? 🎯"
      } else if (
        userMessage.includes("dostosuj") ||
        userMessage.includes("zmień") ||
        userMessage.includes("mocniejszy") ||
        userMessage.includes("słabszy") ||
        userMessage.includes("słodszy")
      ) {
        response =
          "Świetnie! 🎨 Personalizacja to moja specjalność! Mogę dostosować:\n\n🧊 **Temperaturę** - na lodzie, schłodzony, pokojowy\n💪 **Siłę alkoholu** - mocniejszy, słabszy, bezalkoholowy\n🍯 **Słodycz** - słodszy, mniej słodki, gorzki\n🍋 **Kwasowość** - bardziej kwaśny, łagodniejszy\n🌿 **Aromaty** - miętka, cynamon, wanilia, chili\n\nCo konkretnie chciałbyś zmienić w swoim koktajlu?"
      } else if (
        userMessage.includes("podobne") ||
        userMessage.includes("inne") ||
        userMessage.includes("rekomenduj") ||
        userMessage.includes("curator")
      ) {
        const randomCocktails = cocktailDatabase.sort(() => 0.5 - Math.random()).slice(0, 4)
        response = `🎯 **Cocktail Curator - Moje Rekomendacje**\n\nNa podstawie Twoich preferencji polecam:\n\n${randomCocktails.map((c) => `🍸 **${c.name}** (${c.price})\n   ${c.personality}\n   Siła: ${c.strength} | Smak: ${c.flavor}`).join("\n\n")}\n\nO którym chciałbyś usłyszeć więcej?`
      } else {
        // Use smart response system
        response = getSmartBartenderResponse(userMessage)
      }

      addMessage("bartender", response)

      if (conversationCount >= 2 && !isSubscribed && Math.random() > 0.6) {
        setTimeout(() => {
          simulateTyping(() => {
            addMessage(
              "bartender",
              "Widzę, że jesteś prawdziwym entuzjastą koktajli! 🍸 Czy chciałbyś dołączyć do naszego ekskluzywnego newslettera? Będziesz pierwszy dowiadywać się o nowych koktajlach, sezonowych promocjach i tajnikach bartenderingu!",
              undefined,
              false,
              true,
            )
          })
        }, 2000)
      }
    })
  }

  const handleEmailSubscription = () => {
    if (!userEmail.trim() || !userEmail.includes("@")) {
      addMessage("bartender", "Hmm, ten email wygląda podejrzanie... 🤔 Sprawdź, czy wszystko jest w porządku!")
      return
    }

    setIsSubscribed(true)
    addMessage(
      "bartender",
      `Fantastycznie! 🎉 Twój email ${userEmail} został dodany do naszej ekskluzywnej listy. Już wkrótce otrzymasz pierwszą porcję bartenderskich sekretów!\n\nDziękuję za zaufanie i witaj w rodzinie Nocny Portier! 🍸✨`,
    )
    setUserEmail("")
  }

  const resetConversation = () => {
    setMessages([])
    setSelectedMood(null)
    setSelectedTime(null)
    setConversationStep("greeting")
    setCurrentInput("")
    setConversationCount(0)
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      simulateTyping(() => {
        addMessage(
          "bartender",
          "Witaj w Nocny Portier! 🍸 Jestem Twoim osobistym AI bartenderem - znam tysiące przepisów, historie koktajli i sekrety mieszania. Pomogę Ci znaleźć idealny drink na każdy nastrój i okazję.\n\n🧠 **Moja wiedza obejmuje:**\n• Historie i pochodzenie koktajli\n• Techniki bartenderingu\n• Składniki i ich właściwości\n• Sezonowe rekomendacje\n• Dopasowanie do nastroju i pory dnia\n\nJak się dziś czujesz?",
        )
        setConversationStep("mood")
      })
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Bartender Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full glass-strong hover:glass transition-all duration-300 hover:scale-110 shadow-2xl relative overflow-hidden"
        >
          <img
            src="/images/ai-bartender-monkey.jpg"
            alt="AI Bartender Monkey"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Brain className="w-3 h-3 text-primary-foreground" />
          </div>
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] glass-strong rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl border border-white/10">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center relative overflow-hidden">
                <img
                  src="/images/ai-bartender-monkey.jpg"
                  alt="AI Bartender Monkey"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Brain className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Bartender Pro</h3>
                <p className="text-xs text-foreground/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Super Smart • Nocny Portier
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetConversation} variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-white/10"
              >
                ×
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.type === "user" ? "bg-primary text-primary-foreground ml-2" : "glass mr-2"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>

                  {message.cocktailSuggestion && (
                    <Card className="mt-2 glass rounded-2xl overflow-hidden mr-2">
                      <div className="flex">
                        <img
                          src={message.cocktailSuggestion.image || "/placeholder.svg"}
                          alt={message.cocktailSuggestion.name}
                          className="w-16 h-16 object-cover"
                        />
                        <div className="p-3 flex-1">
                          <h4 className="font-bold text-sm">{message.cocktailSuggestion.name}</h4>
                          <p className="text-primary font-semibold text-sm">{message.cocktailSuggestion.price}</p>
                          <p className="text-xs text-foreground/60 mt-1">{message.cocktailSuggestion.reason}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Button
                              onClick={() => {
                                const history = getCocktailHistory(message.cocktailSuggestion!.name)
                                if (history) {
                                  addMessage("bartender", history, undefined, true)
                                }
                              }}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-white/10"
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              Historia
                            </Button>
                            <Button
                              onClick={() => {
                                const cocktail = cocktailDatabase.find(
                                  (c) => c.name === message.cocktailSuggestion!.name,
                                )
                                if (cocktail) {
                                  const customizationOptions = `🎨 **Personalizacja ${cocktail.name}**\n\n**Możliwe modyfikacje:**\n• 🧊 Temperatura: Na lodzie / Schłodzony / Pokojowa\n• 💪 Siła: Mocniejszy / Słabszy / Bezalkoholowy\n• 🍯 Słodycz: Słodszy / Mniej słodki / Gorzki\n• 🍋 Kwasowość: Bardziej kwaśny / Łagodniejszy\n• 🌿 Dodatki: Miętka / Cynamon / Wanilia / Chili\n\nPowiedz mi, co chciałbyś zmienić, a stworzę dla Ciebie idealną wersję!`
                                  addMessage("bartender", customizationOptions)
                                }
                              }}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-white/10"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              Dostosuj
                            </Button>
                            <Button
                              onClick={() => {
                                const curatorSuggestions = `🎯 **Cocktail Curator - Podobne Smaki**\n\nJeśli podoba Ci się ${message.cocktailSuggestion!.name}, polecam również:\n\n${cocktailDatabase
                                  .filter((c) => c.name !== message.cocktailSuggestion!.name)
                                  .slice(0, 3)
                                  .map((c) => `• **${c.name}** (${c.price}) - ${c.personality}`)
                                  .join("\n")}\n\nChcesz poznać więcej szczegółów o którymś z tych koktajli?`
                                addMessage("bartender", curatorSuggestions)
                              }}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-white/10"
                            >
                              <Wine className="w-3 h-3 mr-1" />
                              Podobne
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {message.showHistory && (
                    <Card className="mt-2 glass rounded-2xl p-3 mr-2">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Dziękujemy za subskrypcję!</span>
                      </div>
                    </Card>
                  )}

                  {message.showSubscription && !isSubscribed && (
                    <Card className="mt-2 glass rounded-2xl p-3 mr-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">Newsletter Nocny Portier</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="twoj@email.com"
                          className="flex-1 glass rounded-lg px-3 py-2 text-sm bg-transparent border border-white/10 focus:border-primary/50 focus:outline-none"
                        />
                        <Button onClick={handleEmailSubscription} size="sm" className="px-3 py-2 text-xs">
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  )}

                  {isSubscribed && message.showSubscription && (
                    <Card className="mt-2 glass rounded-2xl p-3 mr-2">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Dziękujemy za subskrypcję!</span>
                      </div>
                    </Card>
                  )}
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    message.type === "user" ? "order-1 glass ml-2" : "order-2 glass mr-2"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    /* Replaced Bot icon with monkey bartender image in message avatars */
                    <img
                      src="/images/ai-bartender-monkey.jpg"
                      alt="AI Bartender Monkey"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl p-3 mr-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mood Selection */}
          {conversationStep === "mood" && !isTyping && (
            <div className="p-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {moods.map((mood) => (
                  <Button
                    key={mood.id}
                    onClick={() => handleMoodSelection(mood.id)}
                    variant="outline"
                    className="glass-nav hover:glass-strong transition-all duration-200 p-3 h-auto flex flex-col items-center gap-1"
                  >
                    <div className={mood.color}>{mood.icon}</div>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Time Selection */}
          {conversationStep === "time" && !isTyping && (
            <div className="p-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {timeOptions.map((time) => (
                  <Button
                    key={time.id}
                    onClick={() => handleTimeSelection(time.id)}
                    variant="outline"
                    className="glass-nav hover:glass-strong transition-all duration-200 p-3 h-auto flex flex-col items-center gap-1"
                  >
                    {time.icon}
                    <span className="text-xs">{time.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          {conversationStep === "chat" && (
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Zapytaj o cokolwiek..."
                  className="flex-1 glass rounded-full px-4 py-2 text-sm bg-transparent border border-white/10 focus:border-primary/50 focus:outline-none"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="w-10 h-10 rounded-full p-0 glass-nav hover:glass-strong"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

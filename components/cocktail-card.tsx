"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CocktailCardProps {
  name: string
  price: string
  ingredients: string[]
  image: string
  theme: string
}

export function CocktailCard({ name, price, ingredients, image, theme }: CocktailCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`glass-strong rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer ${
        isHovered ? "glass-strong" : "glass"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="glass text-primary font-bold text-lg px-3 py-1">{price}</Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="glass-strong">
            {theme}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 text-glow">{name}</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="text-sm text-white/80 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

"use client"
import { Card } from "@/components/ui/card"
import { portfolioContent } from "@/lib/content"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"

export function Footer() {
  const { hero, ui } = portfolioContent
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.lordicon.com/lordicon.js"
    if (!document.head.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]')) {
      document.head.appendChild(script)
    }
  }, [])

  return (
    <footer 
    style={{
      backgroundImage: `
          linear-gradient(#C2E8D6 2px, transparent 2px),
          linear-gradient(90deg, #C2E8D6 2px, transparent 2px)
        `,
      backgroundSize: '60px 60px',
    }}
    className="overflow-hidden relative z-0 px-4 py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute z-10 top-12 left-12 w-48 h-48 bg-primary/20 rounded-[2rem] opacity-60 rotate-12 animate-float shadow-brutal" />
        <div className="absolute z-10 bottom-12 right-12 w-56 h-56 bg-secondary/20 rounded-[2rem] opacity-50 animate-pulse shadow-brutal" />
        <div className="absolute z-10 top-1/2 left-1/3 w-32 h-32 bg-accent/20 rounded-[2rem] rotate-45 animate-morphing shadow-brutal" />

        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-[1rem] shadow-brutal" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Card
          className="p-12 rounded-[2rem] shadow-brutal border-4 border-foreground bg-card relative overflow-hidden group hover:shadow-xl transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-br-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary rounded-tl-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal" />
          <div className="relative z-10">
            <div className="space-y-8">
              <Button
                size="lg"
                className="rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 font-black shadow-brutal hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-rotate-1 border-3 border-foreground text-base">
                {ui.footer.title}
                <lord-icon
                  src="https://cdn.lordicon.com/ohfmmfhn.json"
                  trigger="loop"
                  colors="primary:#dc2626,secondary:#ef4444"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </Button>
              <h2 className="text-4xl font-black leading-tight md:text-5xl text-secondary-foreground/80">
              Sẵn sàng hợp tác với mình chứ.
              </h2>
              <Image
                quality={100}
                draggable={false}
                src="/a-mountainous-landscape-with-a-lake.webp" alt="Hero Section" width={1500} height={1500} className="object-contain w-[300px] h-auto mx-auto" />
            </div>
          </div>

          <div
            className={`absolute bottom-1/3 left-10 w-4 h-4 bg-chart-2 rounded-[2rem] transition-all duration-500 shadow-brutal border-4 border-foreground ${isHovered ? "animate-ping" : "animate-pulse"
              }`}
            style={{ animationDelay: "0.5s" }}
          />
        </Card>
      </div>
    </footer>
  )
}

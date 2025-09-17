"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, Heart, Zap, Target, Brain } from "lucide-react"
import { portfolioContent } from "@/lib/content"
import { useState } from "react"

export function AboutSection() {
  const { about } = portfolioContent
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const statIcons = [Target, Zap, Heart, Brain]
  const statColors = ["primary", "secondary", "accent", "chart-3"]

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/20 rounded-[2rem] -translate-x-40 -translate-y-40 animate-morphing shadow-brutal" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/30 rounded-[2rem] translate-x-32 translate-y-32 rotate-45 animate-float shadow-brutal" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/25 rounded-[2rem] rotate-12 animate-pulse shadow-brutal" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center px-8 py-4 bg-muted rounded-[2rem] text-muted-foreground font-black mb-8 border-4 border-foreground shadow-brutal">
                <Heart className="w-6 h-6 mr-3 animate-pulse text-accent" />
                {about.title}
              </div>

              <h2 className="text-6xl md:text-7xl font-black text-foreground mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
                {about.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl">{about.description}</p>
            </div>

            <div className="space-y-8">
              {about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 group hover:scale-105 transition-transform duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-[2rem] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-brutal border-4 border-foreground">
                    <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-bold text-lg group-hover:text-primary transition-colors duration-500 leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Card className="p-12 rounded-[2rem] shadow-brutal border-4 border-foreground bg-card relative overflow-hidden group hover:shadow-xl transition-all duration-500 neo-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-bl-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-secondary rounded-tr-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal" />

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="w-40 h-40 bg-gradient-to-br from-primary via-accent to-secondary rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-brutal group-hover:scale-110 transition-transform duration-500 border-4 border-foreground">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                  <h3 className="text-4xl font-black text-foreground mb-4">{about.cta}</h3>
                  <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-brutal" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {about.stats.map((stat, index) => {
                    const Icon = statIcons[index]
                    const color = statColors[index]
                    return (
                      <div
                        key={index}
                        className="relative group/stat cursor-pointer"
                        onMouseEnter={() => setHoveredStat(index)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className="p-8 bg-muted rounded-[2rem] transition-all duration-500 group-hover/stat:scale-110 group-hover/stat:-rotate-2 shadow-brutal hover:shadow-xl border-4 border-foreground hover:border-primary">
                          <div className="text-center">
                            <div
                              className={`inline-flex items-center justify-center w-16 h-16 rounded-[2rem] mb-4 transition-transform duration-500 shadow-brutal border-4 border-foreground ${
                                hoveredStat === index ? "scale-125 rotate-12" : ""
                              } ${
                                color === "primary"
                                  ? "bg-primary"
                                  : color === "secondary"
                                    ? "bg-secondary"
                                    : color === "accent"
                                      ? "bg-accent"
                                      : "bg-chart-3"
                              }`}
                            >
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-4xl font-black mb-2 text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground font-bold">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="absolute top-1/4 right-10 w-4 h-4 bg-accent rounded-[1rem] animate-ping shadow-brutal" />
              <div
                className="absolute bottom-1/3 left-10 w-3 h-3 bg-chart-2 rounded-[1rem] animate-ping shadow-brutal"
                style={{ animationDelay: "1s" }}
              />
            </Card>

            <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary rounded-[2rem] rotate-12 opacity-80 animate-float shadow-brutal border-4 border-foreground" />
            <div
              className="absolute -bottom-10 -right-10 w-16 h-16 bg-secondary rounded-[2rem] -rotate-12 opacity-90 animate-float shadow-brutal border-4 border-foreground"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

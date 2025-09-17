"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { portfolioContent } from "@/lib/content"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { hero } = portfolioContent
  const [nameAnimation, setNameAnimation] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.lordicon.com/lordicon.js"
    document.head.appendChild(script)

    let index = 0
    const fullName = hero.name
    const interval = setInterval(() => {
      if (index <= fullName.length) {
        setNameAnimation(fullName.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [hero.name])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="flex overflow-hidden relative justify-center items-center p-4 min-h-screen">
      {/* Grid Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(#C2E8D6 2px, transparent 2px),
            linear-gradient(90deg, #C2E8D6 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute inset-0 -z-10">
        <div
          className="absolute w-32 h-32 bg-primary rounded-[1.8rem] opacity-70 transition-all duration-500 ease-out shadow-brutal"
          style={{
            top: `${15 + mousePosition.y * 0.02}%`,
            left: `${8 + mousePosition.x * 0.01}%`,
            transform: `rotate(${mousePosition.x * 0.1}deg) scale(${1 + Math.sin(Date.now() * 0.001) * 0.2})`,
          }}
        />
        <div
          className="absolute w-24 h-24 bg-secondary rounded-[1.5rem] opacity-60 transition-all duration-500 shadow-brutal"
          style={{
            top: `${35 - mousePosition.y * 0.01}%`,
            right: `${15 - mousePosition.x * 0.01}%`,
            transform: `rotate(${-mousePosition.x * 0.05}deg)`,
          }}
        />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-accent rounded-[1.8rem] opacity-40 animate-morphing shadow-brutal" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-chart-2 rounded-[1.5rem] rotate-45 opacity-50 hover:scale-110 transition-transform duration-500 shadow-brutal" />

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60 animate-ping bg-primary shadow-brutal"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Card className="max-w-6xl w-full p-6 md:p-10 rounded-[2rem] shadow-brutal border-4 border-foreground bg-card relative overflow-hidden group hover:shadow-xl transition-all duration-500 neo-hover">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-bl-[1.8rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal z-50" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary rounded-tr-[1.5rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal z-50" />
        <div className="absolute top-1/2 right-6 w-5 h-5 bg-accent rounded-[0.8rem] animate-pulse shadow-brutal" />
        <div
          className="absolute bottom-1/3 left-6 w-3 h-3 bg-chart-3 rounded-[0.6rem] animate-pulse shadow-brutal"
          style={{ animationDelay: "1s" }}
        />
        <div className="relative z-10">
          <div className="flex items-center">
            <div className="flex flex-col flex-1 gap-6 text-center lg:text-left">
              <div className="inline-flex items-center px-6 py-3 bg-muted rounded-[1.5rem] text-muted-foreground font-bold border-3 border-foreground shadow-brutal w-fit">
                <lord-icon
                  src="https://cdn.lordicon.com/surcxhka.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginRight: "8px" }}
                />
                {hero.location}
              </div>
              <h1 className="text-3xl font-black tracking-tight leading-tight md:text-[45px] text-foreground">
                <span className="text-secondary-foreground/80">
                  {nameAnimation}
                </span>
                <span className="animate-pulse text-accent">|</span>
              </h1>
            </div>
            <div className="relative group w-lg">
              <Image
                quality={100}
                draggable={false}
                src="/a-mountainous-landscape-with-a-lake.png" alt="Hero Section" width={1500} height={1500} className="object-contain w-full h-auto" />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center my-10 lg:justify-center">
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-[1.5rem] bg-secondary hover:bg-secondary/90 text-secondary-foreground/80 px-6 py-5 font-black shadow-brutal hover:shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1 border-3 border-foreground text-base"
            >
              <Link href="https://kidiezyllex.netlify.app" target="_blank" rel="noopener noreferrer">
                Trang chi tiết về mình
                <lord-icon
                  src="https://cdn.lordicon.com/bushiqea.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 font-black shadow-brutal hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-rotate-1 border-3 border-foreground text-base"
            >
              <a href="tel:0336735283">
                {portfolioContent.ui.buttons.getInTouch}
                <lord-icon
                  src="https://cdn.lordicon.com/wtywrnoz.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </a>
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="accent"
              size="lg"
              className="rounded-[1.5rem] border-3 border-foreground text-foreground px-6 py-5 font-black transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-brutal hover:shadow-xl text-base"
            >
              Xem nhanh các dự án
              <lord-icon
                src="https://cdn.lordicon.com/gqfozvrp.json"
                trigger="loop"
                colors="primary:#0f172a,secondary:#0f172a"
                style={{ width: "28px", height: "28px", marginLeft: "8px" }}
              />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

type Project = {
  id: string | number
  title: string
  description: string
  image: string
  techs?: string[]
  tech?: string[]
  live: string
  order?: number
  createdAt?: string
}

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch projects')
        const data: Project[] = await res.json()
        const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setProjects(sorted)
      } catch (e: any) {
        setError(e?.message || 'Load projects failed')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.lordicon.com/lordicon.js"
    if (!document.head.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]')) {
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section
      style={{
        backgroundImage: `
            linear-gradient(#C2E8D6 2px, transparent 2px),
            linear-gradient(90deg, #C2E8D6 2px, transparent 2px)
          `,
        backgroundSize: '60px 60px',
      }}
      id="projects" className="overflow-hidden relative z-50 px-4 py-32">
      <div className="absolute inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full opacity-20 ${i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-secondary" : "bg-accent"
                }`}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative mb-20 space-y-8 text-center">
          <h2 className="mb-8 text-6xl font-black text-secondary-foreground/80 md:text-8xl">
            All Projects
          </h2>
        </div>
        {loading && (
          <div className="mb-20 text-center text-muted-foreground">Đang tải dự án...</div>
        )}
        {error && (
          <div className="mb-20 text-center text-red-600">{error}</div>
        )}
        <div className="grid gap-6 items-stretch mb-20 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden relative flex-col border-4 transition-all duration-700 group border-foreground bg-card hover:-translate-y-4 hover:rotate-1"
              style={{ boxShadow: "var(--shadow-xl)" }}
              onMouseEnter={() => setHoveredProject(project.id as number)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className="absolute top-6 left-6 z-20 w-12 h-12 bg-primary rounded-[1.5rem] flex items-center justify-center border-4 border-foreground"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <span className="text-lg font-black text-primary-foreground">0{index + 1}</span>
              </div>

              <div className="overflow-hidden relative h-80">
              <h3 className="absolute top-3 left-1/2 mb-4 text-2xl font-black transition-all duration-300 transform -translate-x-1/2 text-foreground group-hover:-translate-y-10">
                  {project.title}
                </h3>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 from-black/90 group-hover:opacity-100" />
              </div>

              <div className="relative flex-1 p-4">
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent rounded-bl-[1.5rem] border-l-4 border-b-4 border-foreground" />
            
                <ul className="mb-4 space-y-1 text-lg leading-relaxed text-muted-foreground">
                  {project.description.split('-').filter(item => item.trim()).map((item, index) => (
                    <li key={index} className="flex items-start line-clamp-1">
                      <span className="mt-2 mr-2 text-black" style={{ fontSize: '8px' }}>●</span>
                      <span className="flex-1">{item.trim()}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mb-4">
                  {(project.tech ?? project.techs ?? []).map((tech, i) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded-[1.5rem] text-xs font-bold border-2 border-foreground transition-all duration-300 hover:scale-110 ${i % 3 === 0
                        ? "bg-primary text-primary-foreground"
                        : i % 3 === 1
                          ? "bg-secondary text-secondary-foreground/80"
                          : "bg-accent text-accent-foreground"
                        }`}
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-1 justify-center items-center pt-2 mx-auto w-full">
                  <Button
                    size="lg"
                    className="rounded-[1.5rem] bg-secondary hover:bg-secondary/90 text-secondary-foreground/80 px-6 py-5 font-black shadow-brutal hover:shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1 border-3 border-foreground text-base"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <lord-icon
                        src="https://cdn.lordicon.com/lqxfrxad.json"
                        trigger="loop"
                        colors="primary:#0f172a,secondary:#0f172a"
                        style={{ width: "28px", height: "28px", marginRight: "8px" }}
                      />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

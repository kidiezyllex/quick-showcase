"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

type Project = {
  id: string | number
  title: string
  description: string
  images: string[]
  type?: string
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([])

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

  const openLightbox = (images: string[], index: number) => {
    setCurrentProjectImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section
      style={{
        backgroundImage: ` 
            linear-gradient(#C2E8D6 2px, transparent 2px),
            linear-gradient(90deg, #C2E8D6 2px, transparent 2px)
          `,
        backgroundSize: '60px 60px',
      }}
      id="projects" className="overflow-hidden relative z-50 px-4 py-10">
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
          <h2 className="mb-8 text-6xl font-black text-secondary-foreground/90 md:text-8xl">
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
              className="overflow-hidden relative flex-col border-4 transition-all duration-700 group border-foreground bg-accent hover:-translate-y-4 hover:rotate-1"
              style={{ boxShadow: "var(--shadow-xl)" }}
              onMouseEnter={() => setHoveredProject(project.id as number)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex absolute top-4 left-4 z-50 gap-3 items-center bg-accent">
                <Button
                  variant="mint"
                  size="sm"
                  className="!w-8 !h-8 rounded-full"
                >
                  <span className="text-sm font-black text-primary-foreground">0{index + 1}</span>
                </Button>
                <Button
                  variant="mint"
                  size="sm"
                >
                  <span className="text-sm font-black text-primary-foreground">{project.type || 'Web App'}</span>
                </Button>
                <Button
                    size="sm"
                    variant="mint"
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Demo
                      <lord-icon
                        src="https://cdn.lordicon.com/excswhey.json"
                        trigger="loop"
                        colors="primary:#0f172a,secondary:#0f172a"
                        style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                      />
                    </a>
                  </Button>
              </div>
              <div className="flex overflow-hidden relative flex-col justify-between h-fit bg-accent">
                <div className="relative w-full h-72">
                  <Image
                    src={project.images?.[0] || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-contain object-bottom transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="relative flex-1 p-4 bg-accent">
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent rounded-bl-[1.5rem] border-l-2 border-b-2 border-foreground" />
                <h3 className="mb-4 text-lg font-black text-center text-emerald-700">{project.title}</h3>
                {/* Image Gallery - Show up to 5 images */}
                {project.images && project.images.length > 1 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.images.slice(0, 5).map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="overflow-hidden relative w-16 h-16 rounded-[8px] border-2 transition-all duration-300 cursor-pointer border-foreground/20 hover:border-primary hover:scale-105"
                          onClick={() => openLightbox(project.images, imgIndex)}
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - Image ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                          {imgIndex === 4 && project.images.length > 5 && (
                            <div className="flex absolute inset-0 justify-center items-center bg-black/50">
                              <span className="text-xs font-bold text-white">+{project.images.length - 5}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs italic text-muted-foreground">(Click để xem ảnh)</p>
                  </div>
                )}

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
                          ? "bg-secondary text-secondary-foreground/90"
                          : "bg-accent text-accent-foreground"
                        }`}
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
         
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox for image gallery */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={currentProjectImages.map(image => ({ src: image }))}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </section>
  )
}

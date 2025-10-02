"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
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
      <Card className="max-w-6xl w-full p-6 md:p-12 rounded-[2rem] shadow-brutal border-4 border-foreground bg-accent relative overflow-hidden group hover:shadow-xl transition-all duration-500 rotate-2">
        <div className="absolute top-0 right-0 bg-primary w-24 h-24 rounded-bl-[1.8rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal z-50 flex justify-center items-center">
          <lord-icon
            src="https://cdn.lordicon.com/laducuyh.json"
            trigger="loop"
            colors="primary:#0f172a,secondary:#0f172a"
            style={{ width: "32px", height: "32px" }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary rounded-tr-[1.5rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal z-50 flex justify-center items-center">
          <lord-icon
            src="https://cdn.lordicon.com/laducuyh.json"
            trigger="loop"
            colors="primary:#0f172a,secondary:#0f172a"
            style={{ width: "32px", height: "32px" }}
          />
        </div>
        <div className="absolute top-1/2 right-6 w-5 h-5 bg-accent rounded-[0.8rem] animate-pulse shadow-brutal" />
        <div
          className="absolute bottom-1/3 left-6 w-3 h-3 bg-chart-3 rounded-[0.6rem] animate-pulse shadow-brutal"
          style={{ animationDelay: "1s" }}
        />
        <div className="relative z-10">
          <div className="flex items-start">
            <div className="flex flex-col flex-1 gap-6 text-center lg:text-left">
              {/* Các button */}
              <Button
                variant="white"
                size="lg"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/asyunleq.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginRight: "8px" }}
                />
                <p> Xin chào, mình là 1 <span className="ml-1 text-lg text-emerald-600">  Full Stack Developer</span></p>

              </Button>
              <h1 className="text-[43px] font-extrabold tracking-tight leading-relaxed text-foreground">
                <span className="text-secondary-foreground/80">
                  <span className="bg-[#FCD69A]">Đây là quick showcase</span> về các <span className="bg-emerald-200">Dự án/Sản phẩm</span> <span className="bg-[#EAB185]">mình đã</span> thực hiện!
                </span>
              </h1>
            </div>
            <div className="relative group w-lg">
              <Image
                height={1500}
                width={1500}
                quality={100}
                draggable={false}
                src="/a-mountainous-landscape-with-a-lake.png" alt="Hero Section" className="object-contain w-[90%] h-auto" />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-10 lg:justify-center">
            <Button
              asChild
              variant="mint"
              size="lg"
            >
              <Link href="https://kidiezyllex.netlify.app" target="_blank" rel="noopener noreferrer">
                Trang chi tiết về mình
                <lord-icon
                  src="https://cdn.lordicon.com/excswhey.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </Link>
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="white"
              size="lg"
            >
              Xem nhanh các dự án
              <lord-icon
                src="https://cdn.lordicon.com/gqfozvrp.json"
                trigger="loop"
                colors="primary:#0f172a,secondary:#0f172a"
                style={{ width: "28px", height: "28px", marginLeft: "8px" }}
              />
            </Button>
            <Button
              asChild
              size="lg"
              variant="apricot"
            >
              <Link href="https://zalo.me/0336735283" target="_blank" rel="noopener noreferrer">
                Zalo: 033 673 5283
                <lord-icon
                  src="https://cdn.lordicon.com/wtywrnoz.json"
                  trigger="loop"
                  colors="primary:#0f172a,secondary:#0f172a"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}

"use client"
import { Card } from "@/components/ui/card"
import { portfolioContent } from "@/lib/content"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const { ui } = portfolioContent
  const [isHovered, setIsHovered] = useState(false)
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
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Card
          className="p-12 rounded-[2rem] shadow-brutal border-4 border-foreground bg-card relative overflow-hidden group hover:shadow-xl transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-0 left-0 w-28 h-28 bg-primary rounded-br-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/laducuyh.json"
              trigger="loop"
              colors="primary:#0f172a,secondary:#0f172a"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-secondary rounded-tl-[2rem] group-hover:scale-110 transition-transform duration-500 shadow-brutal flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/laducuyh.json"
              trigger="loop"
              colors="primary:#0f172a,secondary:#0f172a"
              style={{ width: "36px", height: "36px" }}
            />
          </div>
          <div className="relative z-10">
            <div className="space-y-8">
              <Button
                size="lg"
                variant="white"
              >
                {ui.footer.title}
                <lord-icon
                  src="https://cdn.lordicon.com/ohfmmfhn.json"
                  trigger="loop"
                  colors="primary:#dc2626,secondary:#ef4444"
                  style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                />
              </Button>
              <h2 className="text-4xl font-black leading-tight md:text-5xl text-secondary-foreground/90">
                Sẵn sàng hợp tác với mình chứ.
              </h2>
              <Image
                quality={100}
                draggable={false}
                src="/a-mountainous-landscape-with-a-lake.png" alt="Hero Section" width={1500} height={1500} className="object-contain w-[400px] h-auto mx-auto" />
              <div className="flex flex-wrap gap-6 justify-center mt-10 lg:justify-center">
                <Button
                  asChild
                  variant="mint"
                  size="lg"
                >
                  <Link href="https://www.facebook.com/zyllusc/" target="_blank" rel="noopener noreferrer">
                    Facebook: Bùi Trần Thiên Ân
                    <lord-icon
                      src="https://cdn.lordicon.com/excswhey.json"
                      trigger="loop"
                      colors="primary:#0f172a,secondary:#0f172a"
                      style={{ width: "28px", height: "28px", marginLeft: "8px" }}
                    />
                  </Link>
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
          </div>
        </Card>
      </div>
    </footer>
  )
}

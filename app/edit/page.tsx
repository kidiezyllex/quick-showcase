"use client"

import { ProjectsEditSection } from "@/components/projects-edit-section"
export default function EditPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Quản lý dự án</h1>
          <p className="text-muted-foreground">Kéo thả để sắp xếp và chỉnh sửa thông tin dự án</p>
        </div>
        <ProjectsEditSection />
      </div>
    </div>
  )
}

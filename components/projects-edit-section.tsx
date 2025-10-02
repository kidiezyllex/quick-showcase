"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Edit, Save, X, Trash2, Plus, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  type?: string
  techs: string[]
  live: string
  order: number
  createdAt: string
}

// Form state: dùng chuỗi cho techs, order và images để dễ nhập liệu
type ProjectForm = Omit<Project, 'techs' | 'order' | 'images'> & { techs: string; order: string; images: string }

interface SortableItemProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

function SortableItem({ project, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card className="p-4 border-2 transition-colors border-foreground/20 hover:border-foreground/40">
        <div className="flex gap-4 items-center">
          <div
            {...attributes}
            {...listeners}
            className="p-2 rounded cursor-grab hover:cursor-grabbing hover:bg-muted"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex flex-1 gap-4 items-center">
            <div className="overflow-hidden relative w-16 h-16 rounded-[8px]">
              <Image
                src={project.images?.[0] || '/placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.techs.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Thứ tự: {project.order}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project)}
              className="flex gap-2 items-center bg-secondary"
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(project)}
              className="flex gap-2 items-center bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
              Xoá
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function ProjectsEditSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<ProjectForm>>({})
  const [isAddingNew, setIsAddingNew] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Fetch projects from API
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects')
      const data = await response.json()
      setProjects(data.sort((a: Project, b: Project) => a.order - b.order))
    } catch (error) {
      console.error('Lỗi khi tải dự án:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = projects.findIndex((project) => project.id === active.id)
      const newIndex = projects.findIndex((project) => project.id === over.id)

      const newProjects = arrayMove(projects, oldIndex, newIndex)
      setProjects(newProjects)

      // Update order in API
      const updatedProjects = newProjects.map((project, index) => ({
        ...project,
        order: index + 1
      }))

      // Update each project's order
      for (const project of updatedProjects) {
        try {
          await fetch(`https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects/${project.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order: project.order }),
          })
        } catch (error) {
          console.error('Lỗi khi cập nhật thứ tự:', error)
        }
      }
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsAddingNew(false)
    setFormData({
      ...project,
      techs: project.techs?.join(', ') ?? '',
      images: project.images?.join('\n') ?? '',
      order: String(project.order),
    })
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setIsAddingNew(true)
    setFormData({
      title: '',
      description: '',
      images: '',
      type: '',
      techs: '',
      live: '',
      order: String(projects.length + 1),
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const projectData = {
        ...formData,
        techs: (formData.techs || '').split(',').map(tech => tech.trim()).filter(Boolean),
        images: (formData.images || '').split('\n').map(img => img.trim()).filter(Boolean),
        order: formData.order ? Number(formData.order) : (projects.length + 1),
        createdAt: new Date().toISOString(),
      }

      if (isAddingNew) {
        // Tạo dự án mới
        const response = await fetch('https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        })

        if (response.ok) {
          const newProject = await response.json()
          setProjects([...projects, newProject])
          setIsDialogOpen(false)
          setIsAddingNew(false)
          setFormData({})
        }
      } else if (editingProject) {
        // Cập nhật dự án hiện có
        const updatedProject = {
          ...editingProject,
          ...projectData,
        }

        const response = await fetch(`https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProject),
        })

        if (response.ok) {
          setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p))
          setIsDialogOpen(false)
          setEditingProject(null)
          setFormData({})
        }
      }
    } catch (error) {
      console.error('Lỗi khi lưu dự án:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Bạn có chắc muốn xóa dự án "${project.title}"?`)) return

    try {
      const response = await fetch(`https://62c1218ceff7f7856f0990a7.mockapi.io/api/projects/${project.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== project.id))
      }
    } catch (error) {
      console.error('Lỗi khi xóa dự án:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 w-8 h-8 rounded-full border-b-2 animate-spin border-primary"></div>
          <p className="text-muted-foreground">Đang tải dự án...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <Button
          size="lg"
          variant="mint"
          onClick={handleAddNew}
          className="flex gap-2 items-center"
        >
          <Plus className="w-4 h-4" />
          Thêm dự án mới
        </Button>
        <Link href="/">
          <Button
            size="lg"
            variant="mint"
            onClick={handleAddNew}
            className="flex gap-2 items-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay về trang chủ
          </Button></Link>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {projects.map((project) => (
            <SortableItem
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full md:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isAddingNew ? 'Thêm dự án mới' : 'Chỉnh sửa dự án'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Nhập tiêu đề dự án"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Nhập mô tả dự án, bắt đầu bằng dấu gạch ngang mỗi tính năng một dòng"
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="images">URL hình ảnh (mỗi URL một dòng)</Label>
              <Textarea
                id="images"
                value={formData.images || ''}
                onChange={(e) => handleInputChange('images', e.target.value)}
                placeholder="Nhập URL hình ảnh, mỗi URL một dòng&#10;Ví dụ:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows={4}
              />
              {formData.images && (
                <div className="mt-2">
                  <Label className="text-sm text-muted-foreground">Preview hình ảnh:</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.images.split('\n').filter(img => img.trim()).map((img, index) => (
                      <div key={index} className="overflow-hidden relative w-16 h-16 rounded-[8px] border">
                        <Image
                          src={img.trim()}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.jpg';
                          }}
                        />
                        {index === 0 && (
                          <div className="absolute top-0 left-0 px-1 text-xs rounded-br bg-primary text-primary-foreground">
                            Thumbnail
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="type">Loại dự án</Label>
              <Input
                id="type"
                value={formData.type || ''}
                onChange={(e) => handleInputChange('type', e.target.value)}
                placeholder="Ví dụ: Web App, Mobile App, Desktop App"
              />
            </div>

            <div>
              <Label htmlFor="techs">Công nghệ (cách nhau bằng dấu phẩy)</Label>
              <Input
                id="techs"
                value={formData.techs || ''}
                onChange={(e) => handleInputChange('techs', e.target.value)}
                placeholder="Ví dụ: Next.js, React, TypeScript"
              />
            </div>
            <div>
              <Label htmlFor="live">Link demo</Label>
              <Input
                id="live"
                value={formData.live || ''}
                onChange={(e) => handleInputChange('live', e.target.value)}
                placeholder="Nhập link demo"
              />
            </div>
            <div>
              <Label htmlFor="order">Thứ tự</Label>
              <Input
                id="order"
                type="number"
                value={formData.order || ''}
                onChange={(e) => handleInputChange('order', e.target.value)}
                placeholder="Nhập thứ tự hiển thị"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="flex gap-2 items-center"
            >
              <X className="w-4 h-4" />
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              className="flex gap-2 items-center"
            >
              <Save className="w-4 h-4" />
              {isAddingNew ? 'Thêm' : 'Lưu'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Card from '@/components/admin/Card'
import ConfirmModal from '@/components/admin/ConfirmModal'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  images: string[]  // Changed from imageUrl to images array
  liveUrl?: string
  githubUrl?: string
  tags: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (id: string) => {
    setProjectToDelete(id)
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (!projectToDelete) return

    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete project')
      
      toast.success('Project deleted successfully')
      fetchProjects()
      router.refresh()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
    } finally {
      setIsModalOpen(false)
      setProjectToDelete(null)
    }
  }

  const cancelDelete = () => {
    setIsModalOpen(false)
    setProjectToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Projects</h1>
        <Link 
          href="/dashboard/projects/new" 
          className="bg-[var(--color-subtitle)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
        >
          Add New Project
        </Link>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-gray-500">No projects found. Add your first project!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <img
                src={project.images[0] || '/placeholder-image.jpg'} // Display first image or placeholder
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-black">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(project.tags) && project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => confirmDelete(project.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}
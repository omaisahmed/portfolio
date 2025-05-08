'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    description: string
    imageUrl: string
    liveUrl?: string
    githubUrl?: string
    tags: string[]
  }
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl'),
      liveUrl: formData.get('liveUrl'),
      githubUrl: formData.get('githubUrl'),
      tags
    }

    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects'
      const method = project ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save project')
      
      router.push('/dashboard/projects')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={project?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          defaultValue={project?.imageUrl}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Live URL</label>
        <input
          type="url"
          name="liveUrl"
          defaultValue={project?.liveUrl}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
        <input
          type="url"
          name="githubUrl"
          defaultValue={project?.githubUrl}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="flex gap-2 mb-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-red-500 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-gray-200 px-4 rounded-md hover:bg-gray-300"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TestimonialFormProps {
  testimonial?: {
    id: string
    name: string
    location: string
    content: string
    rating: number
  }
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(testimonial?.rating || 5)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      location: formData.get('location'),
      content: formData.get('content'),
      rating
    }

    try {
      const url = testimonial ? `/api/testimonials/${testimonial.id}` : '/api/testimonials'
      const method = testimonial ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save testimonial')
      
      router.push('/dashboard/testimonials')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={testimonial?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          defaultValue={testimonial?.location}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="content"
          defaultValue={testimonial?.content}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dashboard-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors cursor-pointer"
          style={{
            background: 'var(--color-primary)',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Save Testimonial'}
        </button>
      </div>
    </form>
  )
}
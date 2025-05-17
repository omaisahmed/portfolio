'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Card from '@/components/admin/Card'
import ConfirmModal from '@/components/admin/ConfirmModal'

interface Testimonial {
  id: string
  name: string
  location: string
  content: string
  rating: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) throw new Error('Failed to fetch testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (id: string) => {
    setTestimonialToDelete(id)
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    if (!testimonialToDelete) return

    try {
      const response = await fetch(`/api/testimonials/${testimonialToDelete}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete testimonial')
      
      toast.success('Testimonial deleted successfully')
      fetchTestimonials()
      router.refresh()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast.error('Failed to delete testimonial')
    } finally {
      setIsModalOpen(false)
      setTestimonialToDelete(null)
    }
  }

  const cancelDelete = () => {
    setIsModalOpen(false)
    setTestimonialToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Testimonials</h1>
        <Link 
          href="/dashboard/testimonials/new" 
          className="bg-[var(--color-subtitle)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
        >
          Add New Testimonial
        </Link>
      </div>

      {loading ? (
        <p>Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-gray-500">No testimonials found. Add your first testimonial!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/dashboard/testimonials/${testimonial.id}`}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => confirmDelete(testimonial.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}
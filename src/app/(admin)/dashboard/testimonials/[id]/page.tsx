'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import TestimonialForm from '@/components/admin/Forms/TestimonialForm'
import Card from '@/components/admin/Card'
import { toast } from 'react-toastify'

interface Testimonial {
  id: string
  name: string
  location: string
  content: string
  rating: number
}

export default function EditTestimonialPage() {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/testimonials/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Testimonial not found')
            router.push('/dashboard/testimonials')
            return
          }
          throw new Error('Failed to fetch testimonial')
        }
        
        const data = await response.json()
        setTestimonial(data)
      } catch (error) {
        console.error('Error fetching testimonial:', error)
        toast.error('Failed to load testimonial')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonial()
  }, [id, router])

  if (loading) {
    return <p>Loading testimonial...</p>
  }

  if (!testimonial) {
    return <p>Testimonial not found</p>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Edit Testimonial</h1>
      </div>
      
      <Card>
        <TestimonialForm testimonial={testimonial} />
      </Card>
    </div>
  )
}
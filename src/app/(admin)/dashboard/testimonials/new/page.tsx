'use client'

import TestimonialForm from '@/components/admin/Forms/TestimonialForm'
import Card from '@/components/admin/Card'

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">New Testimonial</h1>
      </div>
      
      <Card>
        <TestimonialForm />
      </Card>
    </div>
  )
}
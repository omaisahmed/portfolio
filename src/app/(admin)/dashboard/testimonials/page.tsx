import { prisma } from '@/lib/db'

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <a
          href="/dashboard/testimonials/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Testimonial
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="title-area flex justify-between items-center mb-4">
              <div className="title-info">
                <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                <span className="text-sm text-gray-600">{testimonial.location}</span>
              </div>
              <div className="rating flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <div className="h-px w-full mb-4 bg-gray-200"></div>
            <p className="text-gray-600">{testimonial.content}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <a
                href={`/dashboard/testimonials/${testimonial.id}/edit`}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </a>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
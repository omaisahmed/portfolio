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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{testimonial.name}</h2>
            <p className="text-gray-600 mb-2">{testimonial.location}</p>
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">{testimonial.content}</p>
            <div className="flex justify-end space-x-2">
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
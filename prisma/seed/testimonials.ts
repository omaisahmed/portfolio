import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testimonialData = [
  {
    name: "John Smith",
    location: "United States",
    content: "Working with this developer was an absolute pleasure. Their attention to detail and technical expertise resulted in a perfect implementation of our project requirements.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    content: "Exceptional work! The developer demonstrated great communication skills and delivered the project ahead of schedule. Would definitely work with them again.",
    rating: 5
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    content: "Very professional and skilled developer. They took our complex requirements and turned them into a beautifully functioning application.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    location: "Australia",
    content: "Outstanding service and technical expertise. The developer went above and beyond to ensure our project was perfect.",
    rating: 5
  }
]

async function seedTestimonials() {
  console.log('Seeding testimonials...')
  
  for (const testimonial of testimonialData) {
    await prisma.testimonial.create({
      data: testimonial
    })
  }

  console.log('Testimonials seeding completed.')
}

export { seedTestimonials }
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        location: data.location,
        content: data.content,
        rating: data.rating
      }
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
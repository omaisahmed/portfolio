import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, images, liveUrl, githubUrl, tags } = body

    if (!title || !description || !Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid data format' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        images,
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        tags: Array.isArray(tags) ? tags : []
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        images: true, // Changed from imageUrl to images
        liveUrl: true,
        githubUrl: true,
        tags: true,
        createdAt: true
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
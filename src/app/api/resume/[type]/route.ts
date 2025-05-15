import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    let data
    switch (params.type) {
      case 'education':
        data = await prisma.education.findMany({
          orderBy: { startDate: 'desc' }
        })
        break
      case 'certification':
        data = await prisma.certification.findMany({
          orderBy: { issueDate: 'desc' }
        })
        break
      case 'skill':
        data = await prisma.skill.findMany({
          orderBy: { category: 'asc' }
        })
        break
      case 'experience':
        data = await prisma.experience.findMany({
          orderBy: { startDate: 'desc' }
        })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const body = await request.json()

    let data
    switch (params.type) {
      case 'education':
        data = await prisma.education.create({ data: body })
        break
      case 'certification':
        data = await prisma.certification.create({ data: body })
        break
      case 'skill':
        data = await prisma.skill.create({ data: body })
        break
      case 'experience':
        data = await prisma.experience.create({ data: body })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
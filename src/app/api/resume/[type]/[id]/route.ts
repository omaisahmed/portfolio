import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    const body = await request.json()

    let data
    switch (params.type) {
      case 'education':
        data = await prisma.education.update({
          where: { id: params.id },
          data: body
        })
        break
      case 'certification':
        data = await prisma.certification.update({
          where: { id: params.id },
          data: body
        })
        break
      case 'skill':
        data = await prisma.skill.update({
          where: { id: params.id },
          data: body
        })
        break
      case 'experience':
        data = await prisma.experience.update({
          where: { id: params.id },
          data: body
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

export async function DELETE(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    let data
    switch (params.type) {
      case 'education':
        data = await prisma.education.delete({
          where: { id: params.id }
        })
        break
      case 'certification':
        data = await prisma.certification.delete({
          where: { id: params.id }
        })
        break
      case 'skill':
        data = await prisma.skill.delete({
          where: { id: params.id }
        })
        break
      case 'experience':
        data = await prisma.experience.delete({
          where: { id: params.id }
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
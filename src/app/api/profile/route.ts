// Remove duplicate prisma import since we're using PrismaClient directly
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const profile = await prisma.profile.create({ data })
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json()
    const profile = await prisma.profile.update({
      where: { id: data.id },
      data
    })
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const profile = await prisma.profile.upsert({
      where: { id: data.id || 'default' },
      update: data,
      create: data,
    })
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
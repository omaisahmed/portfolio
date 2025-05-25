import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const settings = await prisma.settings.create({
      data: {
        logo_image: body.logo_image,
        copyright: body.copyright
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error creating settings:', error)
    return NextResponse.json({ error: 'Failed to create settings' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const settings = await prisma.settings.update({
      where: { id: params.id },
      data: {
        logo_image: body.logo_image,
        copyright: body.copyright
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.settings.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Settings deleted successfully' })
  } catch (error) {
    console.error('Error deleting settings:', error)
    return NextResponse.json({ error: 'Failed to delete settings' }, { status: 500 })
  }
}
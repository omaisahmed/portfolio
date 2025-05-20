import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma }from '@/lib/db'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const contact = await prisma.contact.findFirst()
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact information' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const contact = await prisma.contact.create({ data })
    
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact information' },
      { status: 500 }
    )
  }
}
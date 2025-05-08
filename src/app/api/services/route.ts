import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const service = await prisma.service.create({ data })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
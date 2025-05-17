import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Add more detailed logging
    console.log('Fetching profile data...')
    
    const profile = await prisma.profile.findFirst()
    
    // Log the result
    console.log('Profile data result:', profile)
    
    // If no profile exists, return a 404 with a clear message
    if (!profile) {
      console.log('No profile found in database')
      return NextResponse.json({ message: 'No profile found' }, { status: 404 })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    // More detailed error logging
    console.error('Error details when fetching profile:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch profile', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Creating/updating profile with data:', data)
    
    // Check if a profile already exists
    const existingProfile = await prisma.profile.findFirst()
    
    let profile
    
    if (existingProfile) {
      // Update the existing profile
      profile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data
      })
      console.log('Updated existing profile:', profile)
    } else {
      // Create a new profile
      profile = await prisma.profile.create({ data })
      console.log('Created new profile:', profile)
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error details when creating/updating profile:', error)
    return NextResponse.json({ 
      error: 'Failed to save profile', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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
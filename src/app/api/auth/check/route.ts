import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith('admin-token='))?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || '91abaaf49d263fba514f0368fb8b5bb81305263dea75ad54248d858e9c907f4773b56717a8edd274576ef29fabe417ad7beeb8d6b429f66377f3aee98daf727b')

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
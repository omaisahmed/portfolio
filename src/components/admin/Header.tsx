'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              Portfolio Admin
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/Header'
import AdminSidebar from '@/components/admin/Sidebar'
import LoadingSpinner from '@/components/admin/LoadingSpinner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Redirect if no session
  if (!session) {
    router.replace('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader handleMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
      <div className="flex">
      <AdminSidebar 
        isSidebarOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
        <main className="flex-1 p-8 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
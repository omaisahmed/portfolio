'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isSidebarOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Services', href: '/dashboard/services' },
    { name: 'Projects', href: '/dashboard/projects' },
    { name: 'Testimonials', href: '/dashboard/testimonials' },
    { name: 'Resume', href: '/dashboard/resume' },
    { name: 'Contact', href: '/dashboard/contact' },
    { name: 'Messages', href: '/dashboard/messages' },
    { name: 'Site Settings', href: '/dashboard/settings' }
  ]

  return (
    <aside
      className={`bg-white shadow-md fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold px-4 text-black">Admin Panel</h2>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-2"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.href === '/dashboard' 
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[var(--color-subtitle)] text-white font-medium'
                        : 'text-gray-600 hover:text-white hover:bg-[var(--color-subtitle)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
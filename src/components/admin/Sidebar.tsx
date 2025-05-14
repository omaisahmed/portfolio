import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminSidebarProps {
  isSidebarOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isSidebarOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/projects', label: 'Projects' },
    { href: '/dashboard/services', label: 'Services' },
    { href: '/dashboard/testimonials', label: 'Testimonials' },
    { href: '/dashboard/profile', label: 'Profile' },
  ]

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 transform 
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 transition-transform duration-300 ease-in-out
      w-64 bg-white shadow-md min-h-screen p-4 z-30
    `}>
      <div className="flex justify-end lg:hidden">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
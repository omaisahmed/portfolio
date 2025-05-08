import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/projects', label: 'Projects' },
    { href: '/dashboard/services', label: 'Services' },
    { href: '/dashboard/testimonials', label: 'Testimonials' },
    { href: '/dashboard/profile', label: 'Profile' },
  ]

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
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
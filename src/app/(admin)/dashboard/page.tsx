import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const stats = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.profile.findFirst(),
    prisma.testimonial.count(),
    prisma.experience.count(),
    prisma.contactMessage.count(),
  ])

  const dashboardItems = [
    {
      title: "Total Projects",
      count: stats[0],
      link: "/dashboard/projects",
      icon: "📁"
    },
    {
      title: "Total Services",
      count: stats[1],
      link: "/dashboard/services",
      icon: "⚡"
    },
    {
      title: "Profile Status",
      count: stats[2] ? "Complete" : "Incomplete",
      link: "/dashboard/profile",
      icon: "👤"
    },
    {
      title: "Total Testimonials",
      count: stats[3],
      link: "/dashboard/testimonials",
      icon: "💬"
    },
    {
      title: "Resume Items",
      count: stats[4],
      link: "/dashboard/resume",
      icon: "📄"
    },
    {
      title: "Messages",
      count: stats[5],
      link: "/dashboard/messages",
      icon: "✉️"
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-black">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link 
            href={item.link} 
            key={index}
            className="group block bg-gray-300 hover:bg-[var(--color-subtitle)] rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white">
                  {item.title}
                </h2>
                <span className="text-3xl">{item.icon}</span>
              </div>
              <p className="text-4xl font-bold text-gray-800 group-hover:text-white">
                {typeof item.count === 'number' ? item.count : item.count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
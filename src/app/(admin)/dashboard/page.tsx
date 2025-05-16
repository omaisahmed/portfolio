import { prisma } from '@/lib/db'

export default async function DashboardPage() {
  const stats = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.profile.findFirst(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-black">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-black">Total Projects</h2>
          <p className="text-3xl font-bold text-black">{stats[0]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-black">Total Services</h2>
          <p className="text-3xl font-bold text-black">{stats[1]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-black">Profile Status</h2>
          <p className="text-lg text-black">{stats[2] ? 'Complete' : 'Incomplete'}</p>
        </div>
      </div>
    </div>
  )
}
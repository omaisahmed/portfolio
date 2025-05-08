import { prisma } from '@/lib/db'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <a
          href="/dashboard/services/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Service
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: { id: string; icon: string; title: string; description: string }) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-end space-x-2">
              <a
                href={`/dashboard/services/${service.id}/edit`}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </a>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}